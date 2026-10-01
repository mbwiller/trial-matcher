import type { Criterion, CriterionCategory, CriterionVerdict, Trial, TrialMatch, VerdictStatus } from "@/lib/types";
import type { RankedEntry } from "./store";

/* ---------------------------------------------------------------------------
   Eligibility matrix: where each reviewed trial stands, domain by domain
   --------------------------------------------------------------------------- */

export type MatrixGroup =
  | "disease"
  | "biomarker"
  | "prior-therapy"
  | "performance"
  | "organ-function"
  | "cns"
  | "measurable"
  | "comorbidity"
  | "other";

export const MATRIX_GROUPS: Array<{ key: MatrixGroup; label: string; short: string; categories: CriterionCategory[] }> = [
  { key: "disease", label: "Diagnosis and stage", short: "Disease", categories: ["diagnosis", "stage"] },
  { key: "biomarker", label: "Biomarkers", short: "Biomarkers", categories: ["biomarker"] },
  { key: "prior-therapy", label: "Prior therapy and washout", short: "Prior therapy", categories: ["prior-therapy", "washout"] },
  { key: "performance", label: "Performance status", short: "Performance", categories: ["performance"] },
  { key: "organ-function", label: "Organ function", short: "Organ function", categories: ["organ-function"] },
  { key: "cns", label: "CNS disease", short: "CNS", categories: ["cns"] },
  { key: "measurable", label: "Measurable disease", short: "Measurable", categories: ["measurable-disease"] },
  { key: "comorbidity", label: "Comorbidities", short: "Comorbidity", categories: ["comorbidity"] },
  { key: "other", label: "Demographics, consent and other", short: "Other", categories: ["demographics", "reproductive", "consent", "other"] },
];

const GROUP_OF = new Map<CriterionCategory, MatrixGroup>(
  MATRIX_GROUPS.flatMap((g) => g.categories.map((c) => [c, g.key] as const)),
);

export function groupOf(criterion: Criterion): MatrixGroup {
  return GROUP_OF.get(criterion.category ?? "other") ?? "other";
}

export interface MatrixCell {
  /** Worst verdict in the group (fail > unknown > pass > not-applicable); "none" when the trial has no such criteria. */
  status: VerdictStatus | "none";
  total: number;
  pass: number;
  fail: number;
  unknown: number;
}

const SEVERITY: Record<VerdictStatus, number> = { fail: 3, unknown: 2, pass: 1, "not-applicable": 0 };

export function matrixRow(trial: Trial, match: TrialMatch): Record<MatrixGroup, MatrixCell> {
  const byId = new Map(match.verdicts.map((v) => [v.criterionId, v] as const));
  const row = Object.fromEntries(
    MATRIX_GROUPS.map((g) => [g.key, { status: "none", total: 0, pass: 0, fail: 0, unknown: 0 } as MatrixCell]),
  ) as Record<MatrixGroup, MatrixCell>;
  for (const criterion of trial.criteria) {
    const cell = row[groupOf(criterion)];
    const status = byId.get(criterion.id)?.status ?? "unknown";
    cell.total++;
    if (status === "pass") cell.pass++;
    else if (status === "fail") cell.fail++;
    else if (status === "unknown") cell.unknown++;
    if (cell.status === "none" || SEVERITY[status] > SEVERITY[cell.status]) cell.status = status;
  }
  return row;
}

/* ---------------------------------------------------------------------------
   Workup: open items grouped by the test or document that would close them
   --------------------------------------------------------------------------- */

interface WorkupRule {
  key: string;
  label: string;
  re: RegExp;
}

/** First match wins, so the specific tests come before the catch-alls. */
const WORKUP_RULES: WorkupRule[] = [
  { key: "hba1c", label: "HbA1c / fasting glucose", re: /hba1c|\ba1c\b|fasting (?:plasma )?glucose/i },
  { key: "echo", label: "Echocardiogram (LVEF)", re: /lvef|echocardiogra|\becho\b|ejection fraction|muga/i },
  { key: "ecg", label: "ECG (QTc)", re: /\bqtc?f?\b|\becg\b|\bekg\b|electrocardiogra/i },
  { key: "brain", label: "Brain MRI", re: /brain (?:mri|imaging|ct)|mri (?:of the )?brain|cns imaging|cranial (?:mri|imaging)/i },
  { key: "serology", label: "Hepatitis B/C and HIV serology", re: /hepatitis|\bhbv\b|\bhcv\b|\bhiv\b|serolog/i },
  { key: "pregnancy", label: "Pregnancy test", re: /pregnan|\bhcg\b/i },
  { key: "genotype", label: "Pharmacogenomic genotype", re: /ugt1a1|\bdpyd?\b|genotyp/i },
  { key: "biomarker", label: "Tumor biomarker testing", re: /biops|tissue|archival|\bngs\b|ctdna|esr1|pik3ca|her2|\bihc\b|\bish\b|germline|pd-?l1|brca|sequenc|mutation/i },
  { key: "imaging", label: "Imaging review (measurable disease)", re: /recist|measurable|target lesion|\bct\b|\bpet\b|imaging|radiolog/i },
  { key: "labs", label: "Repeat laboratory tests", re: /\banc\b|neutrophil|platelet|hemoglobin|haemoglobin|creatinine|bilirubin|\bast\b|\balt\b|\blabs?\b|\bcbc\b|\bcmp\b|\binr\b|coagul|urinalysis|albumin|clearance|egfr|potassium|magnesium|thyroid|\btsh\b|lipase|amylase/i },
  { key: "medication", label: "Medication review", re: /concomitant|cyp3a|medication|steroid|anticoag|supplement|drug interaction/i },
];

export interface WorkupItem {
  key: string;
  label: string;
  /** One entry per open criterion this workup item would close. */
  open: Array<{ nctId: string; criterionId: string; action: string }>;
  /** Distinct trials affected, in rank order. */
  trials: Array<{ nctId: string; rank: number; title: string }>;
}

function classify(verdict: CriterionVerdict, criterion: Criterion | undefined): WorkupRule | undefined {
  const action = verdict.actionNeeded ?? "";
  return WORKUP_RULES.find((r) => r.re.test(action)) ?? WORKUP_RULES.find((r) => r.re.test(criterion?.text ?? ""));
}

/**
 * Open ("unknown") criteria across the trials still in play (strong or
 * possible), grouped by what the clinician would order to close them. Sorted by
 * how many trials each item touches.
 */
export function workupItems(entries: RankedEntry[]): WorkupItem[] {
  const items = new Map<string, WorkupItem>();
  for (const entry of entries) {
    const match = entry.match;
    if (!match || entry.review === "dismissed") continue;
    if (match.tier !== "strong" && match.tier !== "possible") continue;
    const criteria = new Map(entry.trial.criteria.map((c) => [c.id, c] as const));
    for (const verdict of match.verdicts) {
      if (verdict.status !== "unknown") continue;
      const rule = classify(verdict, criteria.get(verdict.criterionId));
      const key = rule?.key ?? "other";
      let item = items.get(key);
      if (!item) {
        item = { key, label: rule?.label ?? "Other items to confirm", open: [], trials: [] };
        items.set(key, item);
      }
      item.open.push({ nctId: match.nctId, criterionId: verdict.criterionId, action: verdict.actionNeeded ?? "Review against the record" });
      if (!item.trials.some((t) => t.nctId === match.nctId)) {
        item.trials.push({ nctId: match.nctId, rank: entry.rank, title: entry.trial.title });
      }
    }
  }
  return [...items.values()].sort(
    (a, b) => Number(a.key === "other") - Number(b.key === "other") || b.trials.length - a.trials.length || b.open.length - a.open.length,
  );
}

/* ---------------------------------------------------------------------------
   Small helpers shared by the run view and the dashboard
   --------------------------------------------------------------------------- */

/** Verdicts in trial order, each paired with its criterion. */
export function pairedVerdicts(trial: Trial, match: TrialMatch): Array<{ criterion: Criterion; verdict?: CriterionVerdict }> {
  const byId = new Map(match.verdicts.map((v) => [v.criterionId, v] as const));
  return trial.criteria.map((criterion) => ({ criterion, verdict: byId.get(criterion.id) }));
}

export interface SplitCounts {
  met: number;
  open: number;
  /** Inclusion criteria not met. */
  notMet: number;
  /** Exclusion criteria triggered. */
  excludes: number;
  notApplicable: number;
  total: number;
}

export function splitCounts(trial: Trial, match: TrialMatch): SplitCounts {
  const out: SplitCounts = { met: 0, open: 0, notMet: 0, excludes: 0, notApplicable: 0, total: trial.criteria.length };
  for (const { criterion, verdict } of pairedVerdicts(trial, match)) {
    switch (verdict?.status ?? "unknown") {
      case "pass":
        out.met++;
        break;
      case "fail":
        if (criterion.type === "exclusion") out.excludes++;
        else out.notMet++;
        break;
      case "not-applicable":
        out.notApplicable++;
        break;
      default:
        out.open++;
    }
  }
  return out;
}
