/**
 * Deterministic score / tier from criterion verdicts. Shared by the live
 * engine, the heuristic fallback and the demo fixtures. Pure functions.
 */
import type {
  Criterion,
  CriterionCategory,
  CriterionVerdict,
  MatchCounts,
  MatchTier,
  Trial,
  TrialMatch,
} from "@/lib/types";

/** Categories whose unknowns weigh on the score (they decide routing, not paperwork). */
const KEY_CATEGORIES: ReadonlySet<CriterionCategory> = new Set<CriterionCategory>([
  "diagnosis",
  "stage",
  "biomarker",
  "prior-therapy",
  "cns",
  "measurable-disease",
]);

const TIER_ORDER: Record<MatchTier, number> = { strong: 0, possible: 1, unlikely: 2, ineligible: 3 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** First verdict per criterion id. */
function indexVerdicts(verdicts: CriterionVerdict[]): Map<string, CriterionVerdict> {
  const byId = new Map<string, CriterionVerdict>();
  for (const verdict of verdicts) {
    if (!byId.has(verdict.criterionId)) byId.set(verdict.criterionId, verdict);
  }
  return byId;
}

/** Verdicts paired with their criteria, in trial order; a criterion without a verdict counts as unknown. */
function pairVerdicts(trial: Trial, verdicts: CriterionVerdict[]): Array<{ criterion: Criterion; verdict: CriterionVerdict }> {
  const byId = indexVerdicts(verdicts);
  return trial.criteria.map((criterion) => ({
    criterion,
    verdict: byId.get(criterion.id) ?? {
      criterionId: criterion.id,
      status: "unknown",
      rationale: "Not evaluated.",
      evidence: [],
      confidence: "low",
    },
  }));
}

export function computeCounts(trial: Trial, verdicts: CriterionVerdict[]): MatchCounts {
  const counts: MatchCounts = { pass: 0, fail: 0, unknown: 0, notApplicable: 0, inclusionTotal: 0, exclusionTotal: 0 };
  for (const { criterion, verdict } of pairVerdicts(trial, verdicts)) {
    if (criterion.type === "inclusion") counts.inclusionTotal++;
    else counts.exclusionTotal++;
    switch (verdict.status) {
      case "pass":
        counts.pass++;
        break;
      case "fail":
        counts.fail++;
        break;
      case "not-applicable":
        counts.notApplicable++;
        break;
      default:
        counts.unknown++;
    }
  }
  return counts;
}

export interface ScoreResult {
  score: number;
  tier: MatchTier;
  blockers: string[];
  confirmations: string[];
  counts: MatchCounts;
}

export function scoreVerdicts(trial: Trial, verdicts: CriterionVerdict[]): ScoreResult {
  const pairs = pairVerdicts(trial, verdicts);
  const counts = computeCounts(trial, verdicts);
  const blockers = pairs.filter((p) => p.verdict.status === "fail").map((p) => p.criterion.id);
  const confirmations = pairs.filter((p) => p.verdict.status === "unknown").map((p) => p.criterion.id);

  if (pairs.length === 0) {
    return { score: 50, tier: "possible", blockers, confirmations, counts };
  }

  const highConfidenceFails = pairs.filter((p) => p.verdict.status === "fail" && p.verdict.confidence === "high").length;
  if (highConfidenceFails > 0) {
    return { score: clamp(15 - 4 * (highConfidenceFails - 1), 0, 15), tier: "ineligible", blockers, confirmations, counts };
  }

  if (counts.fail > 0) {
    return { score: clamp(38 - 6 * counts.fail - 2 * counts.unknown, 16, 38), tier: "unlikely", blockers, confirmations, counts };
  }

  const applicable = counts.pass + counts.unknown;
  const base = applicable > 0 ? counts.pass / applicable : 1;
  const keyUnknowns = pairs.filter(
    (p) => p.verdict.status === "unknown" && p.criterion.category !== undefined && KEY_CATEGORIES.has(p.criterion.category),
  ).length;
  const score = clamp(Math.round(40 + 60 * base) - Math.min(20, 4 * keyUnknowns), 40, 100);
  const tier: MatchTier = score >= 80 && counts.unknown <= 3 ? "strong" : score >= 55 ? "possible" : "unlikely";
  return { score, tier, blockers, confirmations, counts };
}

export function finalizeMatch(
  trial: Trial,
  verdicts: CriterionVerdict[],
  headline: string,
  reasoning: string,
  source: TrialMatch["source"],
  modelId?: string,
): TrialMatch {
  const { score, tier, blockers, confirmations, counts } = scoreVerdicts(trial, verdicts);
  return {
    nctId: trial.nctId,
    verdicts,
    score,
    tier,
    counts,
    headline,
    reasoning,
    blockers,
    confirmations,
    evaluatedAt: new Date().toISOString(),
    source,
    ...(modelId ? { modelId } : {}),
  };
}

/** Tier (strong > possible > unlikely > ineligible), then score desc, then fewer unknowns. Returns a new array. */
export function rankMatches(matches: TrialMatch[]): TrialMatch[] {
  return [...matches].sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || b.score - a.score || a.counts.unknown - b.counts.unknown,
  );
}
