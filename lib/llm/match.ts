/**
 * Criteria matching: PatientProfile × Trial → TrialMatch, via Claude structured
 * outputs. One call per trial; the system prompt and the profile block are
 * cache-marked so the ~20 per-patient calls share their prefix.
 */
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { CriterionVerdict, PatientProfile, Trial, TrialMatch } from "@/lib/types";
import { MatchOutputSchema, stripNulls, type MatchOutput } from "@/lib/schemas";
import { EngineError, MATCH_EFFORT, MODEL_ID, getClient, refusalError, toEngineError } from "@/lib/llm/client";
import { alignEvidenceToProfile } from "@/lib/llm/evidence";
import { finalizeMatch } from "@/lib/scoring";
import { formatAgeRange, formatPhase, formatSex, formatStatus, truncate } from "@/lib/ctgov/format";

const HEADLINE_MAX = 110;
const SUMMARY_MAX = 1200;

/** Stable across calls; marked with cache_control at the call site. */
export const MATCH_SYSTEM_PROMPT = `You are an oncology trial-eligibility reviewer. You receive a structured patient profile (extracted from the record, with verbatim quotes as evidence) and one clinical trial with its numbered eligibility criteria. For each criterion you return a verdict; then a one-line headline and a short overall reasoning for the treating clinician.

Verdict semantics — always relative to ELIGIBILITY, never to the literal wording of the criterion:
- "pass": this criterion does not block eligibility (inclusion criterion satisfied / exclusion criterion NOT triggered).
- "fail": this criterion blocks eligibility (inclusion criterion not satisfied / exclusion criterion triggered).
- "unknown": the record does not contain enough information to decide.
- "not-applicable": the criterion cannot apply to this patient (e.g. a male-only rule for a female patient).

How to judge
- Judge each criterion independently on the facts in the profile. Return exactly one verdict per criterion, using the criterion ids exactly as given.
- Evidence quotes must be copied verbatim from the profile's evidence quotes (they are exact substrings of the record). Never invent a quote; leave evidence empty when nothing in the record bears on the criterion.
- Exclusion criteria about conditions the record never mentions call for clinical judgement. If a thorough record — imaging, labs, problem list — would normally document the condition (uncontrolled cardiovascular disease, a second malignancy, an active infection, prior anti-cancer therapy), mark "pass" with medium confidence and say the record does not mention it. If it would not (HbA1c, hepatitis or HIV serology, a pregnancy test, QTc, a specific hypersensitivity), mark "unknown" with a concrete actionNeeded.
- Organ-function criteria "as defined in the protocol": when the profile has the labs, evaluate against standard thresholds — ANC ≥ 1.5 × 10⁹/L, platelets ≥ 100 × 10⁹/L, hemoglobin ≥ 9 g/dL, total bilirubin ≤ 1.5 × ULN, AST/ALT ≤ 2.5 × ULN (≤ 5 × ULN with liver metastases), creatinine clearance ≥ 50–60 mL/min, LVEF ≥ 50% — and name the values used. Note when results are stale (labs older than about 4 weeks, LVEF older than 12 months).
- Consent, contraception, ability to swallow tablets and other logistics: "pass" with low confidence noting they are confirmed at screening, or "not-applicable" when they cannot apply (male-only contraception rules for a female patient; pregnancy or premenopausal-only rules for a postmenopausal patient).
- Lines of therapy count in the metastatic setting. A (neo)adjuvant regimen counts as a line when recurrence occurred during it or within the window the criterion specifies (commonly 12 months of completion). Evaluate prior CDK4/6 inhibitor, endocrine, chemotherapy and antibody-drug-conjugate exposure separately.
- HER2-low (IHC 1+ or IHC 2+/ISH-negative) counts as HER2-negative for HR+/HER2- eligibility unless the criterion demands IHC 0; HER2-low-specific criteria require it.
- CNS metastases: treated, stable, asymptomatic lesions off steroids for the required interval satisfy "treated / clinically inactive CNS metastases" criteria and fail "no CNS metastases" criteria; untreated or symptomatic lesions fail both.
- For "unknown", give a concrete actionNeeded: the test or document to obtain and the threshold that matters (e.g. "Obtain echocardiogram; LVEF ≥ 50% required").
- Confidence: "high" when the profile states the deciding fact explicitly, "medium" when inferred, "low" when assumed.

Output
- rationale: one or two sentences in clinician language naming the patient facts used.
- headline: at most 110 characters summarising fit, e.g. "Meets all 9 inclusion criteria · LVEF not documented".
- reasoning: two to four sentences on overall fit and what would change the answer.`;

// ---------------------------------------------------------------------------
// Prompt assembly (pure)
// ---------------------------------------------------------------------------

function compactNode(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(compactNode);
  if (node && typeof node === "object") {
    const record = node as Record<string, unknown>;
    if (typeof record.quote === "string") {
      return typeof record.source === "string" ? { quote: record.quote, source: record.source } : { quote: record.quote };
    }
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(record)) {
      if (value !== undefined) out[key] = compactNode(value);
    }
    return out;
  }
  return node;
}

/** The profile as sent to the model: identifiers/provenance and evidence offsets dropped, quotes kept. Key order is fixed so the block is byte-stable for caching. */
export function compactProfile(profile: PatientProfile): Record<string, unknown> {
  return compactNode({
    demographics: profile.demographics,
    diagnosis: profile.diagnosis,
    biomarkers: profile.biomarkers,
    treatments: profile.treatments,
    performance: profile.performance,
    labs: profile.labs,
    comorbidities: profile.comorbidities,
    allergies: profile.allergies ?? [],
    medications: profile.medications ?? [],
    keyDates: profile.keyDates,
    openQuestions: profile.openQuestions,
    summary: profile.summary,
  }) as Record<string, unknown>;
}

export function buildProfileBlock(profile: PatientProfile): string {
  return `<patient_profile>\n${JSON.stringify(compactProfile(profile))}\n</patient_profile>`;
}

export function buildTrialBlock(trial: Trial): string {
  const interventions = trial.interventions.map((i) => `${i.name} (${i.type.toLowerCase()})`).join("; ");
  const lines: Array<string | null> = [
    "<trial>",
    `NCT id: ${trial.nctId}`,
    `Title: ${trial.title}`,
    trial.officialTitle && trial.officialTitle !== trial.title ? `Official title: ${trial.officialTitle}` : null,
    `Phase: ${formatPhase(trial.phases)} · Status: ${formatStatus(trial.status)} · ${trial.studyType}`,
    `Conditions: ${trial.conditions.join("; ") || "—"}`,
    `Interventions: ${interventions || "—"}`,
    `Sex: ${formatSex(trial.sex)} · Age: ${formatAgeRange(trial.minimumAge, trial.maximumAge)}`,
    `Summary: ${truncate(trial.summary, SUMMARY_MAX) || "—"}`,
    "",
    "Eligibility criteria — return exactly one verdict per id:",
    ...trial.criteria.map((c) => `[${c.id}] (${c.type}) ${c.text}`),
    "</trial>",
    "",
    "Evaluate this patient against each criterion of this trial.",
  ];
  return lines.filter((line): line is string => line !== null).join("\n");
}

// ---------------------------------------------------------------------------
// Post-processing (pure)
// ---------------------------------------------------------------------------

const NOT_EVALUATED: Omit<CriterionVerdict, "criterionId"> = {
  status: "unknown",
  rationale: "Not evaluated by the engine.",
  evidence: [],
  confidence: "low",
  actionNeeded: "Review manually",
};

/**
 * One verdict per trial criterion, in trial order: duplicates collapse to the
 * first, verdicts for ids not in the trial are dropped, missing ones become
 * "unknown", and nulls become undefined.
 */
export function normalizeVerdicts(trial: Trial, raw: MatchOutput["verdicts"]): CriterionVerdict[] {
  const byId = new Map<string, MatchOutput["verdicts"][number]>();
  for (const verdict of raw) {
    const key = verdict.criterionId.trim().toLowerCase();
    if (!byId.has(key)) byId.set(key, verdict);
  }
  return trial.criteria.map((criterion) => {
    const found = byId.get(criterion.id.toLowerCase());
    if (!found) return { criterionId: criterion.id, ...NOT_EVALUATED };
    const cleaned = stripNulls(found);
    const actionNeeded = cleaned.actionNeeded?.trim() || (cleaned.status === "unknown" ? "Review against the record" : undefined);
    return {
      criterionId: criterion.id,
      status: cleaned.status,
      rationale: cleaned.rationale.trim() || "No rationale was given.",
      evidence: cleaned.evidence,
      confidence: cleaned.confidence,
      ...(actionNeeded ? { actionNeeded } : {}),
    };
  });
}

function fallbackHeadline(verdicts: CriterionVerdict[]): string {
  const pass = verdicts.filter((v) => v.status === "pass").length;
  const fail = verdicts.filter((v) => v.status === "fail").length;
  const unknown = verdicts.filter((v) => v.status === "unknown").length;
  return `${pass} criteria met · ${fail} not met · ${unknown} need review`;
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

/**
 * Evaluate one trial for one profile. Uses `client.beta.messages.parse` with
 * the server-side refusal fallback; no `thinking` parameter (always on for
 * Claude Opus 5.5 — effort is the control).
 */
export async function matchTrial(profile: PatientProfile, trial: Trial): Promise<TrialMatch> {
  if (trial.criteria.length === 0) {
    return finalizeMatch(
      trial,
      [],
      "No eligibility criteria could be parsed for this trial",
      "The registry entry has no parsable inclusion or exclusion criteria, so the engine could not evaluate fit. Review the eligibility text on ClinicalTrials.gov directly.",
      "heuristic",
    );
  }

  const activity = `evaluating ${trial.nctId}`;
  try {
    const message = await getClient().beta.messages.parse({
      model: MODEL_ID,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: MATCH_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: [
            // Shared per-patient prefix: cached across the trials evaluated for this profile.
            { type: "text", text: buildProfileBlock(profile), cache_control: { type: "ephemeral" } },
            // Varies per trial: after the last breakpoint.
            { type: "text", text: buildTrialBlock(trial) },
          ],
        },
      ],
      output_config: { format: zodOutputFormat(MatchOutputSchema), effort: MATCH_EFFORT },
    });

    if (message.stop_reason === "refusal") {
      throw refusalError(message.stop_details?.category, activity);
    }
    if (message.stop_reason === "max_tokens") {
      throw new EngineError(`The evaluation of ${trial.nctId} was cut off by the output limit. Try again.`, 502);
    }
    const parsed = message.parsed_output;
    if (!parsed) {
      throw new EngineError(`The model returned no verdicts for ${trial.nctId}. Try again.`, 502);
    }

    const verdicts = alignEvidenceToProfile(normalizeVerdicts(trial, parsed.verdicts), profile);
    const headline = truncate(parsed.headline.trim(), HEADLINE_MAX - 1) || fallbackHeadline(verdicts);
    const reasoning = parsed.reasoning.trim() || "No overall reasoning was returned by the engine.";
    return finalizeMatch(trial, verdicts, headline, reasoning, "llm", message.model || MODEL_ID);
  } catch (error) {
    throw toEngineError(error, activity);
  }
}

export type MatchTrialsResult =
  | { nctId: string; match: TrialMatch; error?: undefined }
  | { nctId: string; match?: undefined; error: EngineError };

export interface MatchTrialsOptions {
  /** Parallel calls (default 4). */
  concurrency?: number;
  /** Called as each trial completes (success or failure), with the trial's index in the input. */
  onResult?: (result: MatchTrialsResult, index: number) => void;
  /**
   * Evaluate the first trial alone before fanning out (default true), so the
   * shared prompt prefix (system + profile) is in the cache before the
   * parallel calls start; N parallel requests with an identical cold prefix
   * would each pay the full input price.
   */
  warmCache?: boolean;
}

/** Evaluate many trials for one profile with a concurrency limit. Results are in input order; one failure does not abort the rest. */
export async function matchTrials(
  profile: PatientProfile,
  trials: Trial[],
  options: MatchTrialsOptions = {},
): Promise<MatchTrialsResult[]> {
  const concurrency = Math.max(1, Math.floor(options.concurrency ?? 4));
  const warmCache = options.warmCache ?? true;
  const results: MatchTrialsResult[] = new Array(trials.length);

  const run = async (index: number): Promise<void> => {
    const trial = trials[index];
    try {
      results[index] = { nctId: trial.nctId, match: await matchTrial(profile, trial) };
    } catch (error) {
      results[index] = { nctId: trial.nctId, error: toEngineError(error, `evaluating ${trial.nctId}`) };
    }
    options.onResult?.(results[index], index);
  };

  if (trials.length === 0) return results;
  let next = 0;
  if (warmCache) {
    await run(0);
    next = 1;
  }
  const workers = Array.from({ length: Math.min(concurrency, trials.length - next) }, async () => {
    while (next < trials.length) {
      const index = next++;
      await run(index);
    }
  });
  await Promise.all(workers);
  return results;
}
