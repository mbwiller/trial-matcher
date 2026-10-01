import { describe, expect, it } from "vitest";
import { prescreenTrials } from "@/lib/ctgov/prescreen";
import { DEFAULT_LIMIT } from "@/lib/ctgov/query";
import { explainScore } from "@/lib/scoring";
import { checkMatch } from "./match-check";
import { DEMO_MATCHES } from "./matches";
import { DEMO_MATCH_PROBLEMS } from "./match-helpers";
import { DEMO_PATIENTS } from "./patients";
import { DEMO_PROFILES } from "./profiles";
import { demoTrials, getDemoTrial } from "./trials";

/**
 * Integrity of the precomputed demo verdicts. The app serves a curated match
 * only for the trials the pre-screen selects, so the two must line up exactly:
 * every selected trial has a match, and no match is left over for a trial the
 * pre-screen no longer selects.
 */
describe("demo matches", () => {
  it("were authored without structural problems", () => {
    expect(DEMO_MATCH_PROBLEMS).toEqual([]);
  });

  it("exist for every demo patient", () => {
    expect(Object.keys(DEMO_MATCHES).sort()).toEqual(DEMO_PATIENTS.map((p) => p.id).sort());
  });

  it.each(DEMO_PATIENTS.map((p) => [p.id, p] as const))("%s: cover exactly the trials the pre-screen selects", (id) => {
    const { selected } = prescreenTrials(DEMO_PROFILES[id], demoTrials(), { limit: DEFAULT_LIMIT, country: "United States" });
    expect(selected).toHaveLength(DEFAULT_LIMIT);
    expect(Object.keys(DEMO_MATCHES[id] ?? {}).sort()).toEqual(selected.map((t) => t.nctId).sort());
  });

  it.each(DEMO_PATIENTS.map((p) => [p.id, p] as const))("%s: verdicts are complete and quote the record verbatim", (id, patient) => {
    const problems: string[] = [];
    for (const [nctId, match] of Object.entries(DEMO_MATCHES[id] ?? {})) {
      if (match.nctId !== nctId) problems.push(`${nctId}: keyed under the wrong trial (${match.nctId})`);
      if (match.source !== "demo") problems.push(`${nctId}: source must be "demo"`);
      problems.push(...checkMatch(match, patient.record));
    }
    expect(problems).toEqual([]);
  });

  it("explains every score with the same arithmetic that produced it", () => {
    for (const byTrial of Object.values(DEMO_MATCHES)) {
      for (const match of Object.values(byTrial)) {
        const trial = getDemoTrial(match.nctId);
        expect(trial, match.nctId).toBeDefined();
        if (trial) expect(explainScore(trial, match.verdicts).score, match.nctId).toBe(match.score);
      }
    }
  });

  it("gives every patient at least one trial worth pursuing", () => {
    for (const patient of DEMO_PATIENTS) {
      const tiers = Object.values(DEMO_MATCHES[patient.id] ?? {}).map((m) => m.tier);
      expect(tiers.filter((t) => t === "strong" || t === "possible").length, patient.id).toBeGreaterThanOrEqual(1);
    }
  });
});
