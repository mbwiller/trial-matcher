import { describe, expect, it } from "vitest";
import type { TrialMatch } from "@/lib/types";
import { DEMO_MATCH_PROBLEMS } from "./match-helpers";
import { DEMO_PATIENTS } from "./patients";

/**
 * Validates a single authored verdict file in isolation:
 *   DEMO_PART=margaret-h-a DEMO_PART_TRIALS=NCT0…,NCT0… npx vitest run lib/demo/matches-part.test.ts
 * Skipped when DEMO_PART is unset (the full-fixture check lives in matches.test.ts).
 */
const part = process.env.DEMO_PART;
const expectedTrials = (process.env.DEMO_PART_TRIALS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

describe.skipIf(!part)(`demo verdict part ${part ?? ""}`, () => {
  it("is well-formed", async () => {
    const mod = (await import(`./matches/${part}.ts`)) as { MATCHES: Record<string, TrialMatch> };
    const matches = mod.MATCHES;
    const patientId = (part ?? "").replace(/-[ab]$/, "");
    const record = DEMO_PATIENTS.find((p) => p.id === patientId)?.record;
    expect(record, `record for ${patientId}`).toBeTruthy();

    expect(DEMO_MATCH_PROBLEMS, "structural problems reported by demoMatch()").toEqual([]);

    if (expectedTrials.length) {
      expect(Object.keys(matches).sort()).toEqual([...expectedTrials].sort());
    }

    for (const m of Object.values(matches)) {
      expect(m.headline.length, `${m.nctId} headline`).toBeGreaterThan(10);
      expect(m.headline.length, `${m.nctId} headline ≤ 120`).toBeLessThanOrEqual(120);
      expect(m.reasoning.length, `${m.nctId} reasoning`).toBeGreaterThan(60);
      for (const v of m.verdicts) {
        expect(v.rationale.length, `${v.criterionId} rationale`).toBeGreaterThan(8);
        if (v.status === "unknown") expect(v.actionNeeded, `${v.criterionId} actionNeeded`).toBeTruthy();
        for (const e of v.evidence) {
          expect(e.quote.length, `${v.criterionId} quote ≤ 200`).toBeLessThanOrEqual(200);
          expect(record!.includes(e.quote), `${m.nctId} ${v.criterionId}: quote not in record: "${e.quote}"`).toBe(true);
        }
      }
    }
  });
});
