import type { Confidence, Evidence, Extracted } from "@/lib/types";

/** Authoring helpers shared by the curated demo profiles (./profiles.ts, ./profiles/*.ts). */

export const ev = (quote: string, source: string): Evidence => ({ quote, source });

export function x<T>(value: T, confidence: Confidence, evidence: Evidence[], note?: string): Extracted<T> {
  const out: Extracted<T> = { value, confidence, evidence };
  if (note) out.note = note;
  return out;
}

export const EXTRACTED_AT = "2026-09-28T09:00:00.000Z";
