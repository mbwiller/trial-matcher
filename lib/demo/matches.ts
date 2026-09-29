import type { TrialMatch } from "@/lib/types";

/**
 * Precomputed criterion-level matches for demo mode:
 *   DEMO_MATCHES[patientId][nctId] → TrialMatch
 * Overwritten by the clinical verdict pass — keep the exported shape stable.
 */
export const DEMO_MATCHES: Record<string, Record<string, TrialMatch>> = {};
