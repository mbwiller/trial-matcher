import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Trial } from "@/lib/types";
import { parseCriteria } from "@/lib/ctgov/criteria";

/**
 * The offline registry snapshot: every recruiting, interventional breast-cancer
 * study on ClinicalTrials.gov at the time `npm run fixture` last ran (see
 * ./harvest.json for the manifest). Server-only: read from disk once, and each
 * study's eligibility text is parsed into criteria at load, exactly as the live
 * path does in normalizeStudy().
 */

let cache: Trial[] | undefined;
let index: Map<string, Trial> | undefined;

export function demoTrials(): Trial[] {
  if (!cache) {
    const raw = JSON.parse(readFileSync(join(process.cwd(), "lib/demo/trials.json"), "utf8")) as Array<Omit<Trial, "criteria">>;
    cache = raw.map((t) => ({ ...t, criteria: parseCriteria(t.nctId, t.eligibilityText) }));
  }
  return cache;
}

export function getDemoTrial(nctId: string): Trial | undefined {
  index ??= new Map(demoTrials().map((t) => [t.nctId, t]));
  return index.get(nctId);
}
