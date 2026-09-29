/**
 * Zod mirrors of lib/types.ts.
 *
 * Two audiences:
 *
 * 1. LLM structured output (`zodOutputFormat(ProfileOutputSchema)` etc.).
 *    The structured-outputs JSON-schema subset wants every object property
 *    listed and `additionalProperties: false`, so fields that are optional in
 *    lib/types.ts are expressed as `.nullable()` here (always present, may be
 *    null) and converted back to `undefined` by `stripNulls()` after parsing.
 *    Evidence offsets (`start`/`end`) are never requested from the model; they
 *    are computed by lib/llm/evidence.ts.
 *
 * 2. Loose request validation for the route handlers (`*RequestSchema`).
 *
 * The canonical TypeScript types stay in lib/types.ts. The `*Output` types
 * exported here describe the LLM wire shape before post-processing.
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export const ConfidenceSchema = z.enum(["high", "medium", "low"]);
export const SexSchema = z.enum(["female", "male", "unknown"]);
export const DiseaseSettingSchema = z.enum(["early", "locally-advanced", "metastatic", "recurrent", "unknown"]);
export const MenopausalStatusSchema = z.enum(["premenopausal", "perimenopausal", "postmenopausal", "unknown"]);
export const CnsStatusSchema = z.enum(["none", "present-untreated", "treated-stable", "unknown"]);
export const LateralitySchema = z.enum(["left", "right", "bilateral", "unknown"]);
export const BiomarkerStatusSchema = z.enum([
  "positive",
  "negative",
  "low",
  "equivocal",
  "mutated",
  "wild-type",
  "amplified",
  "high",
  "unknown",
]);
export const TreatmentCategorySchema = z.enum([
  "surgery",
  "chemotherapy",
  "endocrine",
  "targeted",
  "immunotherapy",
  "antibody-drug-conjugate",
  "radiation",
  "other",
]);
export const TreatmentIntentSchema = z.enum(["neoadjuvant", "adjuvant", "metastatic", "palliative", "unknown"]);
export const TreatmentStatusSchema = z.enum(["completed", "ongoing", "discontinued", "planned", "unknown"]);
export const LabFlagSchema = z.enum(["normal", "abnormal", "unknown"]);
export const VerdictStatusSchema = z.enum(["pass", "fail", "unknown", "not-applicable"]);

/** LLM-facing Evidence: verbatim quote plus an optional section label. Offsets are added later. */
export const EvidenceSchema = z.object({
  quote: z
    .string()
    .describe(
      "Exact verbatim substring of the record, at most 200 characters. Copy characters exactly (case, punctuation, abbreviations); never paraphrase.",
    ),
  source: z
    .string()
    .nullable()
    .describe('Document or section the quote comes from, e.g. "Pathology 2024-11-02"; null if unclear.'),
});

/** `Extracted<T>` — a value with provenance. */
export function extracted<T extends z.ZodType>(inner: T) {
  return z.object({
    value: inner,
    confidence: ConfidenceSchema.describe(
      "high = stated explicitly in the record; medium = inferred from strong context; low = a guess.",
    ),
    evidence: z.array(EvidenceSchema).describe("Verbatim quotes that support the value."),
    note: z
      .string()
      .nullable()
      .describe("Short caveat or explanation of an inference, e.g. \"Inferred from 'postmenopausal' in HPI\"; null if none."),
  });
}

const ExtractedString = extracted(z.string());
const ExtractedNumber = extracted(z.number());

// ---------------------------------------------------------------------------
// Profile building blocks
// ---------------------------------------------------------------------------

export const BiomarkerResultSchema = z.object({
  name: z
    .string()
    .describe('Canonical short name: "ER", "PR", "HER2", "Ki-67", "PIK3CA", "BRCA1", "BRCA2", "gBRCA", "ESR1", "PD-L1", "AKT1", "PTEN", "MSI", "TMB".'),
  status: BiomarkerStatusSchema.describe('Use "low" for HER2-low (IHC 1+ or IHC 2+/ISH-negative) and "equivocal" for IHC 2+ without ISH.'),
  detail: z
    .string()
    .nullable()
    .describe('Result detail as a clinician would write it: "95%, strong", "IHC 1+ (HER2-low)", "H1047R", "CPS 12"; null if none.'),
  method: z.string().nullable().describe('Assay: "IHC", "FISH", "ISH", "NGS", "PCR", "germline", "ctDNA"; null if not stated.'),
  date: z.string().nullable().describe("ISO date (YYYY-MM-DD or YYYY-MM) of the result; null if not documented."),
  specimen: z.string().nullable().describe('Specimen or timepoint: "primary 2019", "liver biopsy 2025-06", "ctDNA"; null if not stated.'),
  evidence: z.array(EvidenceSchema),
  confidence: ConfidenceSchema,
});

export const TreatmentEventSchema = z.object({
  name: z.string().describe('Regimen or procedure, e.g. "Doxorubicin + cyclophosphamide → paclitaxel (AC-T)".'),
  agents: z
    .array(z.string())
    .nullable()
    .describe('Individual agents as lowercase generic names, e.g. ["doxorubicin","cyclophosphamide","paclitaxel"]; null if not applicable.'),
  category: TreatmentCategorySchema,
  intent: TreatmentIntentSchema,
  line: z
    .number()
    .nullable()
    .describe("Line of therapy in the metastatic setting (1 = first line for metastatic disease); null for (neo)adjuvant therapy or when unknown."),
  startDate: z.string().nullable().describe("ISO date or partial ISO (YYYY-MM); null if not documented."),
  endDate: z.string().nullable().describe("ISO date or partial ISO (YYYY-MM); null if ongoing or not documented."),
  status: TreatmentStatusSchema,
  bestResponse: z
    .string()
    .nullable()
    .describe('Best response if documented: "CR", "PR", "SD", "PD", "pCR", "residual disease (RCB-II)"; null otherwise.'),
  reasonStopped: z
    .string()
    .nullable()
    .describe('Why it stopped: "progression", "toxicity", "completed planned course", "patient preference"; null otherwise.'),
  evidence: z.array(EvidenceSchema),
  confidence: ConfidenceSchema,
});

export const LabResultSchema = z.object({
  name: z
    .string()
    .describe('"ANC", "Hemoglobin", "Platelets", "Creatinine", "CrCl", "eGFR", "AST", "ALT", "Total bilirubin", "LVEF", "HbA1c".'),
  value: z.string().describe("Value as written, without the unit."),
  unit: z.string().nullable(),
  date: z.string().nullable().describe("ISO date of the result; null if not documented."),
  flag: LabFlagSchema.nullable(),
  evidence: z.array(EvidenceSchema),
});

export const KeyDateSchema = z.object({
  label: z
    .string()
    .describe('"Initial diagnosis", "Surgery", "Metastatic recurrence", "Last imaging", "Last dose of chemotherapy", ...'),
  date: z.string().describe("ISO date or partial ISO (YYYY-MM)."),
  evidence: z.array(EvidenceSchema),
});

// ---------------------------------------------------------------------------
// Extraction output (everything in PatientProfile except id/label/extractedAt/source/modelId)
// ---------------------------------------------------------------------------

export const ProfileOutputSchema = z.object({
  demographics: z.object({
    age: ExtractedNumber.nullable().describe("Age in years; null if not documented."),
    sex: extracted(SexSchema).nullable(),
    menopausalStatus: extracted(MenopausalStatusSchema).nullable(),
  }),
  diagnosis: z.object({
    primary: ExtractedString.describe('Primary diagnosis in clinician language, e.g. "Invasive ductal carcinoma, left breast".'),
    histology: ExtractedString.nullable(),
    grade: ExtractedString.nullable(),
    laterality: extracted(LateralitySchema).nullable(),
    diagnosisDate: ExtractedString.nullable().describe("ISO date or partial ISO of the initial diagnosis."),
    stageAtDiagnosis: ExtractedString.nullable().describe('Stage at initial diagnosis, e.g. "IIB".'),
    tnm: ExtractedString.nullable().describe('TNM at initial diagnosis, e.g. "cT2 cN1 M0" or "pT2 pN1a".'),
    currentStage: ExtractedString.nullable().describe('Current stage, e.g. "IV".'),
    setting: extracted(DiseaseSettingSchema).describe("Current disease setting — the single most important field for trial routing."),
    subtype: ExtractedString.nullable().describe('Clinical subtype from the most recent receptors: "HR+/HER2-", "HR+/HER2-low", "HER2+", "TNBC".'),
    metastaticSites: extracted(z.array(z.string())).nullable(),
    measurableDisease: extracted(z.boolean()).nullable().describe("Whether RECIST 1.1 measurable disease is documented."),
    cnsStatus: extracted(CnsStatusSchema).nullable(),
  }),
  biomarkers: z.array(BiomarkerResultSchema),
  treatments: z.array(TreatmentEventSchema).describe("Chronological, oldest first."),
  performance: z.object({
    ecog: ExtractedNumber.nullable(),
    karnofsky: ExtractedNumber.nullable(),
  }),
  labs: z.array(LabResultSchema),
  comorbidities: z.array(ExtractedString),
  allergies: z.array(ExtractedString),
  medications: z.array(ExtractedString).describe("Concurrent medications relevant to eligibility (anticoagulants, steroids, strong CYP3A4 inhibitors, ...)."),
  keyDates: z.array(KeyDateSchema),
  openQuestions: z
    .array(z.string())
    .describe("Things trials commonly require that the record does not answer or that are stale, e.g. \"LVEF not documented in the last 12 months\"."),
  summary: z.string().describe("Two to three sentence clinician-facing synopsis."),
});

export type ProfileOutput = z.infer<typeof ProfileOutputSchema>;

// ---------------------------------------------------------------------------
// Matching output
// ---------------------------------------------------------------------------

export const CriterionVerdictSchema = z.object({
  criterionId: z.string().describe("The criterion id exactly as given in the trial, e.g. \"NCT05563220-inc-3\"."),
  status: VerdictStatusSchema.describe(
    "Relative to eligibility: pass = does not block; fail = blocks; unknown = record insufficient; not-applicable = cannot apply to this patient.",
  ),
  rationale: z.string().describe("One or two sentences in clinician language that name the patient facts used."),
  evidence: z.array(EvidenceSchema).describe("Verbatim quotes copied from the profile's evidence quotes; may be empty."),
  confidence: ConfidenceSchema,
  actionNeeded: z
    .string()
    .nullable()
    .describe('For unknown (and low-confidence) verdicts: the concrete thing to check, e.g. "Obtain echocardiogram; LVEF ≥ 50% required"; null otherwise.'),
});

export const MatchOutputSchema = z.object({
  verdicts: z.array(CriterionVerdictSchema).describe("Exactly one verdict per criterion id."),
  headline: z.string().describe('At most 110 characters summarising fit, e.g. "Meets all 9 inclusion criteria · LVEF not documented".'),
  reasoning: z.string().describe("Two to four sentences on overall fit and what would change the answer."),
});

export type MatchOutput = z.infer<typeof MatchOutputSchema>;

// ---------------------------------------------------------------------------
// Request bodies (loose — the canonical types are in lib/types.ts)
// ---------------------------------------------------------------------------

/** Upper bound on pasted record size (characters). */
export const MAX_RECORD_CHARS = 400_000;

export const ExtractRequestSchema = z.object({
  text: z
    .string()
    .max(MAX_RECORD_CHARS, `Record text must be at most ${MAX_RECORD_CHARS} characters`)
    .refine((s) => s.trim().length > 0, "Record text is required"),
  demoPatientId: z.string().min(1).optional(),
});

const LooseProfileSchema = z.looseObject({ id: z.string().min(1) });

const LooseCriterionSchema = z.looseObject({
  id: z.string().min(1),
  type: z.enum(["inclusion", "exclusion"]),
  text: z.string(),
});

export const MatchRequestSchema = z.object({
  profile: LooseProfileSchema,
  trial: z.looseObject({
    nctId: z.string().min(1),
    criteria: z.array(LooseCriterionSchema),
  }),
});

export const TrialSearchRequestSchema = z.object({
  profile: LooseProfileSchema,
  limit: z.number().int().min(1).max(100).optional(),
});

/** Compact one-line summary of validation issues for a JSON error response. */
export function formatIssues(error: z.ZodError): string {
  return error.issues
    .slice(0, 3)
    .map((issue) => `${issue.path.map(String).join(".") || "body"}: ${issue.message}`)
    .join("; ");
}

// ---------------------------------------------------------------------------
// null → undefined conversion (LLM wire shape → lib/types.ts shape)
// ---------------------------------------------------------------------------

export type NullsToUndefined<T> = T extends null
  ? undefined
  : T extends Array<infer U>
    ? Array<NullsToUndefined<U>>
    : T extends object
      ? { [K in keyof T]: NullsToUndefined<T[K]> }
      : T;

function stripNullsWalk(value: unknown): unknown {
  if (value === null) return undefined;
  if (Array.isArray(value)) {
    return value.map(stripNullsWalk).filter((item) => item !== undefined);
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
      const converted = stripNullsWalk(inner);
      if (converted !== undefined) out[key] = converted;
    }
    return out;
  }
  return value;
}

/**
 * Deep copy in which every `null` becomes `undefined` (object keys are dropped,
 * array elements removed), so an LLM output object satisfies the optional
 * fields of lib/types.ts.
 */
export function stripNulls<T>(value: T): NullsToUndefined<T> {
  return stripNullsWalk(value) as NullsToUndefined<T>;
}
