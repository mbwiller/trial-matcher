import { describe, expect, it } from "vitest";
import { DEMO_MATCHES } from "./matches";
import { DEMO_MATCH_PROBLEMS } from "./match-helpers";
import { DEMO_PATIENTS } from "./patients";
import { DEMO_PROFILES } from "./profiles";
import { DEMO_TRIALS } from "./trials";

/**
 * Structural integrity of the precomputed demo verdicts:
 * every match references a real fixture trial, covers every criterion exactly
 * once, and only quotes text that exists in the patient's record.
 */
describe("demo matches", () => {
  const patientIds = Object.keys(DEMO_MATCHES);

  it("was authored without structural problems", () => {
    expect(DEMO_MATCH_PROBLEMS).toEqual([]);
  });

  it("only references demo patients that exist", () => {
    for (const id of patientIds) {
      expect(DEMO_PROFILES[id], `profile for ${id}`).toBeDefined();
      expect(DEMO_PATIENTS.find((p) => p.id === id), `patient ${id}`).toBeDefined();
    }
  });

  it("covers every fixture trial for every patient with verdicts", () => {
    for (const id of patientIds) {
      const byTrial = DEMO_MATCHES[id];
      for (const trial of DEMO_TRIALS) {
        const match = byTrial[trial.nctId];
        expect(match, `${id} × ${trial.nctId}`).toBeDefined();
        if (!match) continue;
        expect(match.nctId).toBe(trial.nctId);
        const ids = trial.criteria.map((c) => c.id).sort();
        const got = match.verdicts.map((v) => v.criterionId).sort();
        expect(got, `${id} × ${trial.nctId} verdict ids`).toEqual(ids);
        expect(match.headline.length).toBeGreaterThan(10);
        expect(match.reasoning.length).toBeGreaterThan(40);
        expect(match.score).toBeGreaterThanOrEqual(0);
        expect(match.score).toBeLessThanOrEqual(100);
        expect(match.source).toBe("demo");
        for (const v of match.verdicts) {
          expect(v.rationale.length, `${v.criterionId} rationale`).toBeGreaterThan(8);
          if (v.status === "unknown") {
            expect(v.actionNeeded, `${v.criterionId} actionNeeded`).toBeTruthy();
          }
        }
      }
    }
  });

  it("quotes only text that exists in the record", () => {
    for (const id of patientIds) {
      const record = DEMO_PATIENTS.find((p) => p.id === id)?.record ?? "";
      for (const match of Object.values(DEMO_MATCHES[id])) {
        for (const v of match.verdicts) {
          for (const e of v.evidence) {
            expect(record.includes(e.quote), `${id} × ${match.nctId} ${v.criterionId}: "${e.quote}"`).toBe(true);
          }
        }
      }
    }
  });
});
