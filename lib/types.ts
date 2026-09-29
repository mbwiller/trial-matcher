/**
 * Shared domain types for Trial Matcher.
 *
 * This file is the contract between the ingestion layer (ClinicalTrials.gov),
 * the LLM engine (record structuring + criteria matching), the demo fixtures,
 * and the UI. Keep it dependency-free.
 *
 * Verdict semantics (important):
 *   A CriterionVerdict.status is always expressed relative to ELIGIBILITY,
 *   never relative to the literal wording of the criterion.
 *     - "pass"    → this criterion does not block eligibility
 *                   (inclusion criterion satisfied / exclusion criterion NOT triggered)
 *     - "fail"    → this criterion blocks eligibility
 *                   (inclusion criterion not satisfied / exclusion criterion triggered)
 *     - "unknown" → the record does not contain enough information to decide
 *     - "not-applicable" → criterion cannot apply to this patient (e.g. a male-only rule)
 *   The UI translates these into human labels per criterion type:
 *     inclusion: pass → "Met", fail → "Not met"
 *     exclusion: pass → "Clear", fail → "Excludes"
 *     both:      unknown → "Needs review", not-applicable → "N/A"
 */

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export type Confidence = "high" | "medium" | "low";

export type Sex = "female" | "male" | "unknown";

/** A verbatim quote from the source record that supports an extracted value or verdict. */
export interface Evidence {
  /** Exact substring of the record text. Must be copied verbatim (case and punctuation preserved). */
  quote: string;
  /** Optional human label of the section it came from, e.g. "Pathology 2024-11-02". */
  source?: string;
  /** Optional character offsets of `quote` in the record text, for highlighting. */
  start?: number;
  end?: number;
}

/** A single extracted value with provenance. */
export interface Extracted<T> {
  value: T;
  confidence: Confidence;
  evidence: Evidence[];
  /** Short caveat from the extractor, e.g. "Inferred from 'postmenopausal' in HPI". */
  note?: string;
}

// ---------------------------------------------------------------------------
// Patient profile (output of record structuring)
// ---------------------------------------------------------------------------

export type DiseaseSetting =
  | "early"
  | "locally-advanced"
  | "metastatic"
  | "recurrent"
  | "unknown";

export type MenopausalStatus =
  | "premenopausal"
  | "perimenopausal"
  | "postmenopausal"
  | "unknown";

export type CnsStatus = "none" | "present-untreated" | "treated-stable" | "unknown";

export type BiomarkerStatus =
  | "positive"
  | "negative"
  | "low" // e.g. HER2-low (IHC 1+ or 2+/ISH-)
  | "equivocal"
  | "mutated"
  | "wild-type"
  | "amplified"
  | "high"
  | "unknown";

export interface BiomarkerResult {
  /** Canonical short name: "ER", "PR", "HER2", "Ki-67", "PIK3CA", "BRCA1", "BRCA2", "ESR1", "PD-L1", "AKT1", "PTEN", "gBRCA", "MSI", "TMB". */
  name: string;
  status: BiomarkerStatus;
  /** Free-text detail exactly as useful to a clinician: "95%, strong", "IHC 1+ (HER2-low)", "H1047R", "CPS 12". */
  detail?: string;
  /** Assay type: "IHC", "FISH", "ISH", "NGS", "PCR", "germline", "ctDNA". */
  method?: string;
  /** ISO date (YYYY-MM-DD or YYYY-MM) of the result, if documented. */
  date?: string;
  /** Specimen or timepoint: "primary 2019", "liver biopsy 2025-06", "ctDNA". */
  specimen?: string;
  evidence: Evidence[];
  confidence: Confidence;
}

export type TreatmentCategory =
  | "surgery"
  | "chemotherapy"
  | "endocrine"
  | "targeted"
  | "immunotherapy"
  | "antibody-drug-conjugate"
  | "radiation"
  | "other";

export type TreatmentIntent =
  | "neoadjuvant"
  | "adjuvant"
  | "metastatic"
  | "palliative"
  | "unknown";

export type TreatmentStatus =
  | "completed"
  | "ongoing"
  | "discontinued"
  | "planned"
  | "unknown";

export interface TreatmentEvent {
  /** Regimen or procedure name, e.g. "Doxorubicin + cyclophosphamide → paclitaxel (AC-T)". */
  name: string;
  /** Individual agents if known (lowercase generic names), e.g. ["doxorubicin","cyclophosphamide","paclitaxel"]. */
  agents?: string[];
  category: TreatmentCategory;
  intent: TreatmentIntent;
  /** Line of therapy in the metastatic setting (1 = first line). */
  line?: number;
  /** ISO date or partial ISO (YYYY-MM). */
  startDate?: string;
  endDate?: string;
  status: TreatmentStatus;
  /** Best response if documented: "CR", "PR", "SD", "PD", "pCR", "residual disease (RCB-II)". */
  bestResponse?: string;
  /** Why it stopped: "progression", "toxicity", "completed planned course", "patient preference". */
  reasonStopped?: string;
  evidence: Evidence[];
  confidence: Confidence;
}

export interface LabResult {
  /** "ANC", "Hemoglobin", "Platelets", "Creatinine", "eGFR", "AST", "ALT", "Total bilirubin", "LVEF", "HbA1c". */
  name: string;
  value: string;
  unit?: string;
  date?: string;
  flag?: "normal" | "abnormal" | "unknown";
  evidence: Evidence[];
}

export interface KeyDate {
  /** "Initial diagnosis", "Surgery", "Metastatic recurrence", "Last imaging", "Last dose of chemotherapy". */
  label: string;
  /** ISO date or partial ISO. */
  date: string;
  evidence: Evidence[];
}

export interface PatientProfile {
  /** Stable id. Demo patients use their fixture id; live extractions use a random id. */
  id: string;
  /** Display label for the workspace header, e.g. "Margaret H." — never a real identifier. */
  label?: string;

  demographics: {
    age?: Extracted<number>;
    sex?: Extracted<Sex>;
    menopausalStatus?: Extracted<MenopausalStatus>;
  };

  diagnosis: {
    /** Primary diagnosis in clinician language, e.g. "Invasive ductal carcinoma, left breast". */
    primary: Extracted<string>;
    histology?: Extracted<string>;
    grade?: Extracted<string>;
    /** Laterality if relevant. */
    laterality?: Extracted<"left" | "right" | "bilateral" | "unknown">;
    diagnosisDate?: Extracted<string>;
    /** Stage at initial diagnosis, e.g. "IIB". */
    stageAtDiagnosis?: Extracted<string>;
    /** TNM at initial diagnosis, e.g. "cT2 cN1 M0" or "pT2 pN1a". */
    tnm?: Extracted<string>;
    /** Current stage, e.g. "IV". */
    currentStage?: Extracted<string>;
    /** Current disease setting — the single most important field for trial routing. */
    setting: Extracted<DiseaseSetting>;
    /** Clinical subtype shorthand derived from receptors: "HR+/HER2-", "HR+/HER2-low", "HER2+", "TNBC". */
    subtype?: Extracted<string>;
    metastaticSites?: Extracted<string[]>;
    /** Whether measurable disease per RECIST 1.1 is documented. */
    measurableDisease?: Extracted<boolean>;
    cnsStatus?: Extracted<CnsStatus>;
  };

  biomarkers: BiomarkerResult[];
  /** Chronological (oldest first). */
  treatments: TreatmentEvent[];

  performance: {
    ecog?: Extracted<number>;
    karnofsky?: Extracted<number>;
  };

  labs: LabResult[];
  comorbidities: Extracted<string>[];
  allergies?: Extracted<string>[];
  /** Concurrent medications relevant to eligibility (anticoagulants, strong CYP3A4 inhibitors, steroids…). */
  medications?: Extracted<string>[];
  keyDates: KeyDate[];

  /**
   * Things the record does not answer but trials commonly ask about.
   * Surfaced to the clinician as "Open questions", e.g. "LVEF not documented in the last 12 months".
   */
  openQuestions: string[];

  /** Two to three sentence clinician-facing synopsis. */
  summary: string;

  extractedAt: string;
  source: "llm" | "demo" | "heuristic";
  modelId?: string;
}

// ---------------------------------------------------------------------------
// Trials (normalised from ClinicalTrials.gov API v2)
// ---------------------------------------------------------------------------

export type CriterionType = "inclusion" | "exclusion";

export type CriterionCategory =
  | "diagnosis"
  | "stage"
  | "biomarker"
  | "prior-therapy"
  | "washout"
  | "performance"
  | "organ-function"
  | "demographics"
  | "comorbidity"
  | "cns"
  | "measurable-disease"
  | "reproductive"
  | "consent"
  | "other";

export interface Criterion {
  /** `${nctId}-${"inc"|"exc"}-${n}` e.g. "NCT05563220-inc-3". Stable within a fixture. */
  id: string;
  type: CriterionType;
  /** The criterion as written (bullet/numbering stripped, whitespace normalised). */
  text: string;
  /** Best-effort category assigned by the parser (heuristic) or the LLM. */
  category?: CriterionCategory;
}

export type TrialStatus =
  | "RECRUITING"
  | "NOT_YET_RECRUITING"
  | "ACTIVE_NOT_RECRUITING"
  | "ENROLLING_BY_INVITATION"
  | "COMPLETED"
  | "SUSPENDED"
  | "TERMINATED"
  | "WITHDRAWN"
  | "UNKNOWN";

export interface TrialLocation {
  facility?: string;
  city?: string;
  state?: string;
  country?: string;
  status?: string;
}

export interface Trial {
  nctId: string;
  /** Brief title. */
  title: string;
  officialTitle?: string;
  /** Brief summary (plain text). */
  summary: string;
  /** Raw phase codes from CT.gov, e.g. ["PHASE2"], ["PHASE1","PHASE2"], ["NA"]. Use formatPhase() for display. */
  phases: string[];
  status: TrialStatus;
  studyType: string;
  conditions: string[];
  interventions: Array<{ type: string; name: string }>;
  sponsor: string;
  sex: "ALL" | "FEMALE" | "MALE";
  /** As given by CT.gov, e.g. "18 Years". */
  minimumAge?: string;
  maximumAge?: string;
  startDate?: string;
  primaryCompletionDate?: string;
  enrollment?: number;
  /** Up to ~12 representative sites; `locationCount` is the true total. */
  locations: TrialLocation[];
  locationCount: number;
  /** Raw eligibility text from CT.gov. */
  eligibilityText: string;
  /** Parsed criteria. Inclusion first, then exclusion, in document order. */
  criteria: Criterion[];
  keywords?: string[];
  url: string;
  lastUpdated?: string;
}

// ---------------------------------------------------------------------------
// Matching (output of the criteria engine)
// ---------------------------------------------------------------------------

export type VerdictStatus = "pass" | "fail" | "unknown" | "not-applicable";

export interface CriterionVerdict {
  criterionId: string;
  status: VerdictStatus;
  /** One or two sentences in clinician language that reference the patient's facts. */
  rationale: string;
  /** Verbatim quotes from the record that support the verdict (may be empty for "unknown"). */
  evidence: Evidence[];
  confidence: Confidence;
  /** For "unknown" (and low-confidence) verdicts: the concrete thing to check, e.g. "Obtain echocardiogram; LVEF ≥ 50% required". */
  actionNeeded?: string;
}

export type MatchTier = "strong" | "possible" | "unlikely" | "ineligible";

export interface MatchCounts {
  pass: number;
  fail: number;
  unknown: number;
  notApplicable: number;
  inclusionTotal: number;
  exclusionTotal: number;
}

export interface TrialMatch {
  nctId: string;
  verdicts: CriterionVerdict[];
  /** 0–100, computed deterministically from verdicts by lib/scoring.ts. */
  score: number;
  tier: MatchTier;
  counts: MatchCounts;
  /** One line for the card, e.g. "Meets all 9 inclusion criteria · LVEF not documented". */
  headline: string;
  /** Short paragraph explaining the overall fit, written for the reviewing clinician. */
  reasoning: string;
  /** Criterion ids that block eligibility (status "fail"). */
  blockers: string[];
  /** Criterion ids the clinician must confirm (status "unknown"). */
  confirmations: string[];
  evaluatedAt: string;
  source: "llm" | "demo" | "heuristic";
  modelId?: string;
}

// ---------------------------------------------------------------------------
// Clinician review (in-app state only)
// ---------------------------------------------------------------------------

export type ReviewDecision = "none" | "shortlisted" | "dismissed" | "flagged";

export interface ReviewState {
  decision: ReviewDecision;
  note?: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// API contracts
// ---------------------------------------------------------------------------

export interface EngineStatus {
  /** True when an Anthropic API key is configured on the server. */
  llm: boolean;
  /** Model id the server will use for live extraction/matching. */
  modelId: string;
  /** True when the server will query ClinicalTrials.gov live rather than the bundled fixture. */
  liveRegistry: boolean;
}

export interface ExtractRequest {
  text: string;
  /** If the text is a bundled demo record, pass its id so demo mode can return the curated profile. */
  demoPatientId?: string;
}

export interface ExtractResponse {
  profile: PatientProfile;
  /** Which engine produced the profile. */
  source: PatientProfile["source"];
}

export interface TrialSearchRequest {
  profile: PatientProfile;
  /** Max trials to return (default 25). */
  limit?: number;
}

export interface TrialSearchResponse {
  trials: Trial[];
  /** Human-readable description of the query that was run, for the UI ("Recruiting · Interventional · breast cancer · HER2-positive"). */
  queryDescription: string;
  source: "registry" | "fixture";
  totalAvailable?: number;
}

export interface MatchRequest {
  profile: PatientProfile;
  trial: Trial;
}

export interface MatchResponse {
  match: TrialMatch;
}
