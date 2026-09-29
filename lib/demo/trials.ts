import type { Trial } from "@/lib/types";
import fixture from "./trials.json";

/** Curated, real ClinicalTrials.gov studies bundled for offline demo mode. */
export const DEMO_TRIALS: Trial[] = fixture as unknown as Trial[];

export function getDemoTrial(nctId: string): Trial | undefined {
  return DEMO_TRIALS.find((t) => t.nctId === nctId);
}
