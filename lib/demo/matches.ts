import type { TrialMatch } from "@/lib/types";
import { MATCHES as margaretA } from "./matches/margaret-h-a";
import { MATCHES as margaretB } from "./matches/margaret-h-b";
import { MATCHES as danielleA } from "./matches/danielle-r-a";
import { MATCHES as danielleB } from "./matches/danielle-r-b";
import { MATCHES as rosaA } from "./matches/rosa-v-a";
import { MATCHES as rosaB } from "./matches/rosa-v-b";

/**
 * Precomputed criterion-level matches for demo mode:
 *   DEMO_MATCHES[patientId][nctId] → TrialMatch
 * Authored per patient in ./matches/*.ts via lib/demo/match-helpers.ts.
 */
export const DEMO_MATCHES: Record<string, Record<string, TrialMatch>> = {
  "margaret-h": { ...margaretA, ...margaretB },
  "danielle-r": { ...danielleA, ...danielleB },
  "rosa-v": { ...rosaA, ...rosaB },
};
