import type { TrialMatch } from "@/lib/types";
import { getDemoTrial } from "./trials";

/**
 * Structural checks for one precomputed demo match against the patient's
 * record: verdicts cover the trial's criteria exactly, every quote is a
 * verbatim single-line substring of the record, and the text fields are within
 * the lengths the UI is designed for. Returns a list of problems (empty = ok).
 */
export function checkMatch(match: TrialMatch, record: string): string[] {
  const problems: string[] = [];
  const trial = getDemoTrial(match.nctId);
  if (!trial) return [`${match.nctId}: not in the registry snapshot`];
  const tag = match.nctId;
  if (match.headline.length < 15 || match.headline.length > 110) problems.push(`${tag}: headline must be 15–110 chars (is ${match.headline.length})`);
  if (match.reasoning.length < 120 || match.reasoning.length > 900) problems.push(`${tag}: reasoning must be 120–900 chars (is ${match.reasoning.length})`);
  if (/\bdemo\b|keyword screen/i.test(`${match.headline} ${match.reasoning}`)) problems.push(`${tag}: headline/reasoning must not mention the demo`);
  const ids = trial.criteria.map((c) => c.id).sort();
  const got = match.verdicts.map((v) => v.criterionId).sort();
  if (JSON.stringify(ids) !== JSON.stringify(got)) problems.push(`${tag}: verdict ids do not cover the trial's criteria exactly`);
  for (const v of match.verdicts) {
    if (v.rationale.length < 20 || v.rationale.length > 420) problems.push(`${v.criterionId}: rationale must be 20–420 chars (is ${v.rationale.length})`);
    if (v.status === "unknown" && !v.actionNeeded) problems.push(`${v.criterionId}: unknown without actionNeeded`);
    if (v.actionNeeded && v.actionNeeded.length > 200) problems.push(`${v.criterionId}: actionNeeded over 200 chars`);
    for (const e of v.evidence) {
      if (e.quote.length === 0 || e.quote.length > 200) problems.push(`${v.criterionId}: quote length ${e.quote.length}`);
      if (e.quote !== e.quote.trim() || e.quote.includes("\n")) problems.push(`${v.criterionId}: quote must be trimmed and on one line`);
      if (!record.includes(e.quote)) problems.push(`${v.criterionId}: quote not in record: "${e.quote}"`);
    }
  }
  return problems;
}
