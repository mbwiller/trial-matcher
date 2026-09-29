import type {
  BiomarkerResult,
  BiomarkerStatus,
  CnsStatus,
  DiseaseSetting,
  MatchTier,
  MenopausalStatus,
  PatientProfile,
  Sex,
  Trial,
  TreatmentCategory,
  TreatmentIntent,
  TreatmentStatus,
} from "@/lib/types";
import type { BadgeTone } from "@/components/ui";
import { formatDate } from "@/lib/ctgov/format";

/* ---------------------------------------------------------------------------
   Human labels for enum-like profile values
   --------------------------------------------------------------------------- */

export const SETTING_LABEL: Record<DiseaseSetting, string> = {
  early: "Early",
  "locally-advanced": "Locally advanced",
  metastatic: "Metastatic",
  recurrent: "Recurrent",
  unknown: "Not documented",
};

export const MENOPAUSAL_LABEL: Record<MenopausalStatus, string> = {
  premenopausal: "Premenopausal",
  perimenopausal: "Perimenopausal",
  postmenopausal: "Postmenopausal",
  unknown: "Not documented",
};

export const CNS_LABEL: Record<CnsStatus, string> = {
  none: "No CNS disease",
  "present-untreated": "Present, untreated",
  "treated-stable": "Treated, stable",
  unknown: "Not documented",
};

export const SEX_LABEL: Record<Sex, string> = {
  female: "Female",
  male: "Male",
  unknown: "Sex not documented",
};

export function sexLetter(sex: Sex | undefined): string {
  return sex === "female" ? "F" : sex === "male" ? "M" : "";
}

export const BIOMARKER_STATUS_LABEL: Record<BiomarkerStatus, string> = {
  positive: "Positive",
  negative: "Negative",
  low: "Low",
  equivocal: "Equivocal",
  mutated: "Mutated",
  "wild-type": "Wild-type",
  amplified: "Amplified",
  high: "High",
  unknown: "Unknown",
};

/** Semantic colour is earned: biomarkers only use neutral / accent / info. */
export function biomarkerTone(status: BiomarkerStatus): BadgeTone {
  switch (status) {
    case "positive":
    case "mutated":
    case "amplified":
    case "high":
      return "accent";
    case "low":
    case "equivocal":
      return "info";
    default:
      return "neutral";
  }
}

/** Compact chip text for the patient summary, e.g. "ER+", "HER2-low", "PIK3CA mut". */
export function biomarkerShort(b: BiomarkerResult): string {
  switch (b.status) {
    case "positive":
      return `${b.name}+`;
    case "negative":
      return `${b.name}−`;
    case "low":
      return `${b.name}-low`;
    case "mutated":
      return `${b.name} mut`;
    case "wild-type":
      return `${b.name} wt`;
    case "amplified":
      return `${b.name} amp`;
    case "high":
      return `${b.name} high`;
    case "equivocal":
      return `${b.name} equivocal`;
    default:
      return b.name;
  }
}

export const TREATMENT_CATEGORY_LABEL: Record<TreatmentCategory, string> = {
  surgery: "Surgery",
  chemotherapy: "Chemotherapy",
  endocrine: "Endocrine",
  targeted: "Targeted",
  immunotherapy: "Immunotherapy",
  "antibody-drug-conjugate": "Antibody-drug conjugate",
  radiation: "Radiation",
  other: "Other",
};

export const TREATMENT_INTENT_LABEL: Record<TreatmentIntent, string> = {
  neoadjuvant: "Neoadjuvant",
  adjuvant: "Adjuvant",
  metastatic: "Metastatic",
  palliative: "Palliative",
  unknown: "",
};

export const TREATMENT_STATUS_LABEL: Record<TreatmentStatus, string> = {
  completed: "Completed",
  ongoing: "Ongoing",
  discontinued: "Discontinued",
  planned: "Planned",
  unknown: "",
};

/** "Mar 2025 – Aug 2026", "Mar 2025 – ongoing", "Apr 2019". */
export function treatmentDates(start?: string, end?: string, status?: TreatmentStatus): string {
  const s = start ? formatDate(start) : undefined;
  const e = end ? formatDate(end) : undefined;
  if (s && e) return s === e ? s : `${s} – ${e}`;
  if (s && status === "ongoing") return `${s} – ongoing`;
  if (s) return s;
  if (e) return `– ${e}`;
  return "Date unknown";
}

/* ---------------------------------------------------------------------------
   Tiers
   --------------------------------------------------------------------------- */

export const TIER_ORDER: Record<MatchTier, number> = {
  strong: 0,
  possible: 1,
  unlikely: 2,
  ineligible: 3,
};

export const TIERS: MatchTier[] = ["strong", "possible", "unlikely", "ineligible"];

export const TIER_SHORT: Record<MatchTier, string> = {
  strong: "Strong",
  possible: "Possible",
  unlikely: "Unlikely",
  ineligible: "Ineligible",
};

export function tierTone(tier: MatchTier): BadgeTone {
  switch (tier) {
    case "strong":
      return "accent";
    case "possible":
      return "warn";
    case "unlikely":
      return "neutral";
    case "ineligible":
      return "fail";
  }
}

/** Mirrors ScoreRing's arc colours. */
export const TIER_DOT: Record<MatchTier, string> = {
  strong: "bg-accent-500",
  possible: "bg-warn-500",
  unlikely: "bg-ink-300",
  ineligible: "bg-fail-500",
};

/* ---------------------------------------------------------------------------
   Trials
   --------------------------------------------------------------------------- */

/** Numeric rank for phase sorting: 3 > 2/3 > 2 > 1/2 > 1 > early 1 > n/a. */
export function phaseRank(phases: string[] | undefined): number {
  if (!phases || phases.length === 0) return -1;
  let best = -1;
  for (const raw of phases) {
    const p = raw.toUpperCase();
    const n = p === "EARLY_PHASE1" ? 0.5 : p === "NA" ? 0 : Number(p.replace("PHASE", ""));
    if (!Number.isNaN(n)) best = Math.max(best, n);
  }
  return best;
}

/** "231 sites", "23 sites · 12 US" (only when every site is listed), "1 site · Chapel Hill". */
export function formatSites(trial: Trial): string {
  const n = trial.locationCount;
  if (n <= 0) return "Sites not listed";
  if (n === 1) {
    const loc = trial.locations[0];
    const place = loc?.city ?? loc?.facility;
    return place ? `1 site · ${place}` : "1 site";
  }
  const label = `${n.toLocaleString("en-US")} sites`;
  if (trial.locations.length === n) {
    const us = trial.locations.filter((l) => /^(united states|usa?)$/i.test(l.country ?? "")).length;
    if (us > 0 && us < n) return `${label} · ${us} US`;
  }
  return label;
}

/* ---------------------------------------------------------------------------
   Patient
   --------------------------------------------------------------------------- */

export interface PatientDisplay {
  label: string;
  /** "58 F", "58", "F" or "". */
  ageSex: string;
}

export function patientDisplay(profile: PatientProfile | undefined, fallbackLabel?: string): PatientDisplay {
  const label = profile?.label ?? fallbackLabel ?? "Patient";
  const age = profile?.demographics.age?.value;
  const sex = sexLetter(profile?.demographics.sex?.value);
  const ageSex = [age !== undefined ? String(age) : "", sex].filter(Boolean).join(" ");
  return { label, ageSex };
}

/* ---------------------------------------------------------------------------
   Record text
   --------------------------------------------------------------------------- */

/**
 * Best-effort count of the documents concatenated into a pasted record.
 * A document header is an all-caps line without a colon (e.g. "PATHOLOGY REPORT - FINAL",
 * "LABS 2026-09-15"); inline section labels like "IMPRESSION:" are ignored.
 */
export function countDocuments(text: string): number {
  let n = 0;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.length > 90 || line.includes(":")) continue;
    if (/[a-z]/.test(line)) continue;
    if ((line.match(/[A-Z]/g) ?? []).length < 3) continue;
    n++;
  }
  return Math.max(1, n);
}

export function formatInt(n: number): string {
  return n.toLocaleString("en-US");
}

export function plural(n: number, singular: string, pluralForm = `${singular}s`): string {
  return `${formatInt(n)} ${n === 1 ? singular : pluralForm}`;
}
