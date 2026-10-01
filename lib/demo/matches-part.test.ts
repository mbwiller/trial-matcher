import { describe, expect, it } from "vitest";
import type { TrialMatch } from "@/lib/types";
import { checkMatch } from "./match-check";
import { DEMO_MATCH_PROBLEMS } from "./match-helpers";
import { DEMO_PATIENTS } from "./patients";

/**
 * Validates authored verdict files in isolation:
 *   DEMO_MATCH=margaret-h DEMO_MATCH_TRIALS=NCT0…,NCT0… npx vitest run lib/demo/matches-part.test.ts
 * Each file is lib/demo/matches/<patient>/<nctId>.ts with a default-exported demoMatch(...).
 * Skipped when DEMO_MATCH is unset (the full check lives in matches.test.ts).
 */
const patientId = process.env.DEMO_MATCH;
const trialIds = (process.env.DEMO_MATCH_TRIALS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

describe.skipIf(!patientId)(`demo verdicts for ${patientId ?? ""}`, () => {
  it("are well-formed", async () => {
    const record = DEMO_PATIENTS.find((p) => p.id === patientId)?.record;
    expect(record, `record for ${patientId}`).toBeTruthy();
    expect(trialIds.length, "DEMO_MATCH_TRIALS").toBeGreaterThan(0);

    const problems: string[] = [];
    for (const nctId of trialIds) {
      const mod = (await import(`./matches/${patientId}/${nctId}.ts`)) as { default: TrialMatch };
      const match = mod.default;
      if (match.nctId !== nctId) problems.push(`${nctId}: file exports a match for ${match.nctId}`);
      problems.push(...checkMatch(match, record!));
    }
    expect([...DEMO_MATCH_PROBLEMS, ...problems]).toEqual([]);
  });
});
