import type { Confidence, CriterionVerdict, Evidence, TrialMatch, VerdictStatus } from "@/lib/types";
import { finalizeMatch } from "@/lib/scoring";
import { getDemoTrial } from "./trials";

/**
 * Authoring helper for precomputed demo verdicts.
 *
 * Validates that every criterion of the fixture trial receives exactly one
 * verdict. Problems are collected in DEMO_MATCH_PROBLEMS (asserted empty by
 * lib/demo/matches.test.ts) rather than thrown, so a slip in one fixture never
 * takes the app down; missing verdicts are filled with "unknown".
 */
export interface VerdictInput {
  /** Criterion id, e.g. "NCT06982521-inc-3". */
  id: string;
  status: VerdictStatus;
  /** 1–2 sentences of clinician language naming the patient facts used. */
  rationale: string;
  /** Verbatim quotes from the patient's record. */
  evidence?: Evidence[];
  /** Defaults to "high". */
  confidence?: Confidence;
  /** Required for "unknown": the concrete thing to check. */
  actionNeeded?: string;
}

export const DEMO_MATCH_PROBLEMS: string[] = [];

export function demoMatch(
  nctId: string,
  headline: string,
  reasoning: string,
  verdicts: VerdictInput[],
): TrialMatch {
  const trial = getDemoTrial(nctId);
  if (!trial) {
    DEMO_MATCH_PROBLEMS.push(`${nctId}: not in the fixture`);
    return {
      nctId,
      verdicts: [],
      score: 0,
      tier: "unlikely",
      counts: { pass: 0, fail: 0, unknown: 0, notApplicable: 0, inclusionTotal: 0, exclusionTotal: 0 },
      headline,
      reasoning,
      blockers: [],
      confirmations: [],
      evaluatedAt: new Date(0).toISOString(),
      source: "demo",
    };
  }

  const order = new Map(trial.criteria.map((c, i) => [c.id, i] as const));
  const seen = new Set<string>();
  const out: CriterionVerdict[] = [];

  for (const v of verdicts) {
    if (!order.has(v.id)) {
      DEMO_MATCH_PROBLEMS.push(`${nctId}: verdict for unknown criterion ${v.id}`);
      continue;
    }
    if (seen.has(v.id)) {
      DEMO_MATCH_PROBLEMS.push(`${nctId}: duplicate verdict for ${v.id}`);
      continue;
    }
    if (v.status === "unknown" && !v.actionNeeded) {
      DEMO_MATCH_PROBLEMS.push(`${nctId}: ${v.id} is unknown without actionNeeded`);
    }
    seen.add(v.id);
    out.push({
      criterionId: v.id,
      status: v.status,
      rationale: v.rationale,
      evidence: v.evidence ?? [],
      confidence: v.confidence ?? "high",
      actionNeeded: v.actionNeeded,
    });
  }

  for (const c of trial.criteria) {
    if (!seen.has(c.id)) {
      DEMO_MATCH_PROBLEMS.push(`${nctId}: missing verdict for ${c.id}`);
      out.push({
        criterionId: c.id,
        status: "unknown",
        rationale: "Not evaluated in the demo fixture.",
        evidence: [],
        confidence: "low",
        actionNeeded: "Review against the record",
      });
    }
  }

  out.sort((a, b) => (order.get(a.criterionId) ?? 0) - (order.get(b.criterionId) ?? 0));
  return finalizeMatch(trial, out, headline, reasoning, "demo");
}

/** Build a Record<nctId, TrialMatch> from a list of matches. */
export function byTrial(matches: TrialMatch[]): Record<string, TrialMatch> {
  return Object.fromEntries(matches.map((m) => [m.nctId, m]));
}
