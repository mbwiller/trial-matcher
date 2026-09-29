"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import type { Evidence } from "@/lib/types";
import { cn } from "@/components/ui";

export interface TextRange {
  start: number;
  end: number;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function locate(text: string, lower: string, e: Evidence): TextRange | undefined {
  const quote = e.quote.trim();
  if (!quote) return undefined;

  // 1. Offsets, when present and still pointing at the quote.
  if (
    typeof e.start === "number" &&
    typeof e.end === "number" &&
    e.end > e.start &&
    e.end <= text.length &&
    text.slice(e.start, e.end) === e.quote
  ) {
    return { start: e.start, end: e.end };
  }
  // 2. Exact substring.
  let i = text.indexOf(quote);
  if (i >= 0) return { start: i, end: i + quote.length };
  // 3. Case-insensitive.
  i = lower.indexOf(quote.toLowerCase());
  if (i >= 0) return { start: i, end: i + quote.length };
  // 4. Whitespace-tolerant (quotes often collapse line breaks).
  const pattern = quote.split(/\s+/).map(escapeRegExp).join("\\s+");
  try {
    const m = new RegExp(pattern, "i").exec(text);
    if (m) return { start: m.index, end: m.index + m[0].length };
  } catch {
    // Unusable pattern; give up on this quote.
  }
  return undefined;
}

/** Resolves evidence quotes to non-overlapping character ranges in `text`. */
export function locateEvidence(text: string, evidence: Evidence[]): TextRange[] {
  const lower = text.toLowerCase();
  const found = evidence
    .map((e) => locate(text, lower, e))
    .filter((r): r is TextRange => r !== undefined)
    .sort((a, b) => a.start - b.start);
  const merged: TextRange[] = [];
  for (const r of found) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) merged[merged.length - 1] = { start: last.start, end: Math.max(last.end, r.end) };
    else merged.push(r);
  }
  return merged;
}

export interface RecordViewerProps {
  text: string;
  /** Evidence currently hovered/focused elsewhere; its spans are highlighted. */
  activeEvidence?: Evidence[];
  className?: string;
}

/**
 * The source record with evidence spans wrapped in <mark>. Scrolls its own
 * pane (not the window) so the first active span sits in the middle.
 */
export function RecordViewer({ text, activeEvidence, className }: RecordViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const ranges = useMemo(
    () => (activeEvidence && activeEvidence.length > 0 ? locateEvidence(text, activeEvidence) : []),
    [text, activeEvidence],
  );
  const rangeKey = ranges.map((r) => `${r.start}-${r.end}`).join(",");

  useEffect(() => {
    if (!rangeKey) return;
    const container = containerRef.current;
    if (!container) return;
    const mark = container.querySelector<HTMLElement>("mark");
    if (!mark) return;
    const top = mark.offsetTop - container.clientHeight / 2 + mark.offsetHeight / 2;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    container.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
  }, [rangeKey]);

  const segments = useMemo<ReactNode>(() => {
    if (ranges.length === 0) return text;
    const out: ReactNode[] = [];
    let cursor = 0;
    ranges.forEach((r, i) => {
      if (r.start > cursor) out.push(text.slice(cursor, r.start));
      out.push(
        <mark key={i} className="evidence-mark evidence-mark-active">
          {text.slice(r.start, r.end)}
        </mark>,
      );
      cursor = r.end;
    });
    if (cursor < text.length) out.push(text.slice(cursor));
    return out;
  }, [text, ranges]);

  return (
    <div ref={containerRef} className={cn("relative overflow-auto overscroll-contain", className)}>
      <div className="whitespace-pre-wrap break-words font-sans text-[13px] leading-[1.7] text-ink-700">
        {segments}
      </div>
    </div>
  );
}
