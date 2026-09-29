/**
 * Evidence alignment: makes every evidence quote a verbatim substring of the
 * source record and attaches character offsets for highlighting.
 *
 * Pure functions; inputs are never mutated.
 */
import type { Evidence, PatientProfile } from "@/lib/types";

export const EVIDENCE_NOT_FOUND_NOTE = "Evidence could not be located in the record";

/** Length of the prefix used by the last-resort search. */
const PREFIX_LENGTH = 40;

// ---------------------------------------------------------------------------
// Normalised text index
// ---------------------------------------------------------------------------

interface NormIndex {
  /** Lower-cased text with whitespace runs collapsed to single spaces and quote/dash variants folded. */
  text: string;
  /** map[i] = offset in the original string of text[i]. */
  map: number[];
}

const ZERO_WIDTH = /[​-‍﻿]/;

function foldChar(ch: string): string {
  switch (ch) {
    case "‘":
    case "’":
    case "‚":
    case "′":
      return "'";
    case "“":
    case "”":
    case "„":
    case "″":
      return '"';
    case "‐":
    case "‑":
    case "‒":
    case "–":
    case "—":
    case "−":
      return "-";
    default: {
      const lower = ch.toLowerCase();
      return lower.length === 1 ? lower : ch;
    }
  }
}

function buildIndex(text: string): NormIndex {
  const chars: string[] = [];
  const map: number[] = [];
  let pendingSpaceAt = -1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ZERO_WIDTH.test(ch)) continue;
    if (/\s/.test(ch)) {
      if (chars.length > 0 && pendingSpaceAt < 0) pendingSpaceAt = i;
      continue;
    }
    if (pendingSpaceAt >= 0) {
      chars.push(" ");
      map.push(pendingSpaceAt);
      pendingSpaceAt = -1;
    }
    chars.push(foldChar(ch));
    map.push(i);
  }
  return { text: chars.join(""), map };
}

function normalize(text: string): string {
  return buildIndex(text).text;
}

interface Span {
  start: number;
  end: number;
}

function spanFromIndex(index: NormIndex, at: number, length: number): Span {
  return { start: index.map[at], end: index.map[at + length - 1] + 1 };
}

const WRAPPING_QUOTES = /^["'“”‘’`]+|["'“”‘’`]+$/g;
const EDGE_ELLIPSIS = /^(?:\.{3}|…)\s*|\s*(?:\.{3}|…)$/g;

/**
 * Find `rawQuote` in `record`: verified offsets → exact → exact without
 * wrapping quotes/ellipses → whitespace- and case-insensitive → first 40
 * normalised characters (extended as far as the text keeps matching).
 */
function locateQuote(record: string, index: NormIndex, rawQuote: string, hint?: { start?: number; end?: number }): Span | null {
  const quote = rawQuote.trim();
  if (!quote) return null;

  if (
    typeof hint?.start === "number" &&
    typeof hint?.end === "number" &&
    hint.end > hint.start &&
    record.slice(hint.start, hint.end) === quote
  ) {
    return { start: hint.start, end: hint.end };
  }

  let at = record.indexOf(quote);
  if (at >= 0) return { start: at, end: at + quote.length };

  const stripped = quote.replace(WRAPPING_QUOTES, "").replace(EDGE_ELLIPSIS, "").trim();
  if (stripped && stripped !== quote) {
    at = record.indexOf(stripped);
    if (at >= 0) return { start: at, end: at + stripped.length };
  }

  const needle = normalize(stripped || quote);
  if (!needle) return null;
  at = index.text.indexOf(needle);
  if (at >= 0) return spanFromIndex(index, at, needle.length);

  if (needle.length > PREFIX_LENGTH) {
    at = index.text.indexOf(needle.slice(0, PREFIX_LENGTH));
    if (at >= 0) {
      let length = PREFIX_LENGTH;
      while (length < needle.length && at + length < index.text.length && index.text[at + length] === needle[length]) {
        length++;
      }
      while (length > 0 && index.text[at + length - 1] === " ") length--;
      return spanFromIndex(index, at, length);
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Object walking
// ---------------------------------------------------------------------------

type EvidenceLike = { quote: string } & Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEvidenceLike(value: unknown): value is EvidenceLike {
  return isRecord(value) && typeof value.quote === "string";
}

function isExtractedLike(value: Record<string, unknown>): boolean {
  return "value" in value && typeof value.confidence === "string" && Array.isArray(value.evidence);
}

type Aligner = (evidence: EvidenceLike) => EvidenceLike | null;

/**
 * Rebuild `node` with every evidence-shaped object passed through `align`.
 * Evidence that cannot be aligned is removed. When `downgrade` is set, an
 * Extracted-shaped parent whose evidence was all removed gets confidence
 * "low" and a note.
 */
function transform(node: unknown, align: Aligner, downgrade: boolean): unknown {
  if (Array.isArray(node)) {
    const out: unknown[] = [];
    for (const item of node) {
      if (isEvidenceLike(item)) {
        const aligned = align(item);
        if (aligned) out.push(aligned);
      } else {
        out.push(transform(item, align, downgrade));
      }
    }
    return out;
  }
  if (isRecord(node)) {
    const hadEvidence = isExtractedLike(node) && (node.evidence as unknown[]).length > 0;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node)) {
      if (isEvidenceLike(value)) {
        const aligned = align(value);
        if (aligned) out[key] = aligned;
        continue;
      }
      out[key] = transform(value, align, downgrade);
    }
    if (downgrade && hadEvidence && Array.isArray(out.evidence) && out.evidence.length === 0) {
      out.confidence = "low";
      const existing = typeof out.note === "string" ? out.note.trim() : "";
      out.note = existing ? `${existing} · ${EVIDENCE_NOT_FOUND_NOTE}` : EVIDENCE_NOT_FOUND_NOTE;
    }
    return out;
  }
  return node;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Deep-copies `obj`, locating every evidence quote in `record`. Found quotes
 * are replaced by the exact record substring and get `start`/`end` offsets;
 * quotes that cannot be found are removed. An Extracted-shaped value
 * ({ value, confidence, evidence }) whose evidence was all removed is
 * downgraded to confidence "low" with a note.
 */
export function alignEvidence<T>(obj: T, record: string): T {
  const index = buildIndex(record);
  const align: Aligner = (evidence) => {
    const hint = {
      start: typeof evidence.start === "number" ? evidence.start : undefined,
      end: typeof evidence.end === "number" ? evidence.end : undefined,
    };
    const span = locateQuote(record, index, evidence.quote, hint);
    if (!span) return null;
    return { ...evidence, quote: record.slice(span.start, span.end), start: span.start, end: span.end };
  };
  return transform(obj, align, true) as T;
}

/** All evidence entries found anywhere in `node`, in document order. */
export function collectEvidence(node: unknown, out: Evidence[] = []): Evidence[] {
  if (Array.isArray(node)) {
    for (const item of node) collectEvidence(item, out);
  } else if (isEvidenceLike(node)) {
    out.push(node as unknown as Evidence);
  } else if (isRecord(node)) {
    for (const value of Object.values(node)) collectEvidence(value, out);
  }
  return out;
}

/**
 * Deep-copies `obj` (typically criterion verdicts), keeping only evidence
 * quotes that are verbatim substrings of the profile's own evidence quotes —
 * which are themselves verbatim substrings of the record. Matching entries
 * inherit the profile quote's record offsets (and section label when the
 * verdict gives none); non-matching entries are removed. Confidence is left
 * untouched.
 */
export function alignEvidenceToProfile<T>(obj: T, profile: PatientProfile): T {
  const known = collectEvidence(profile).filter((e) => e.quote.trim().length > 0);
  const SEPARATOR = "\n\n";
  let virtual = "";
  const segments: Array<{ vStart: number; vEnd: number; evidence: Evidence }> = [];
  for (const evidence of known) {
    if (virtual) virtual += SEPARATOR;
    const vStart = virtual.length;
    virtual += evidence.quote;
    segments.push({ vStart, vEnd: virtual.length, evidence });
  }
  const index = buildIndex(virtual);

  const align: Aligner = (evidence) => {
    if (!virtual) return null;
    const span = locateQuote(virtual, index, evidence.quote);
    if (!span) return null;
    const segment = segments.find((s) => span.start >= s.vStart && span.start < s.vEnd);
    if (!segment) return null;
    const end = Math.min(span.end, segment.vEnd);
    const quote = virtual.slice(span.start, end).trim();
    if (!quote) return null;
    const offset = virtual.indexOf(quote, segment.vStart) - segment.vStart;
    const source = segment.evidence;
    const out: EvidenceLike = { ...evidence, quote };
    delete out.start;
    delete out.end;
    if (typeof source.start === "number" && typeof source.end === "number" && source.end - source.start === source.quote.length) {
      out.start = source.start + offset;
      out.end = source.start + offset + quote.length;
    }
    if (typeof out.source !== "string" && typeof source.source === "string") out.source = source.source;
    return out;
  };
  return transform(obj, align, false) as T;
}
