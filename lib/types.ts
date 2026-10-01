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
  /**
   * True when a clinician entered or corrected this value during profile review.
   * An edited value carries no evidence (the quote no longer supports it) and is
   * treated as a stated fact by the matching engine.
   */
  edited?: boolean;
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
  /** Entered or corrected by a clinician during profile review (see Extracted.edited). */
  edited?: boolean;
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
  /** Entered or corrected by a clinician during profile review (see Extracted.edited). */
  edited?: boolean;
}

export interface LabResult {
  /** "ANC", "Hemoglobin", "Platelets", "Creatinine", "eGFR", "AST", "ALT", "Total bilirubin", "LVEF", "HbA1c". */
  name: string;
  value: string;
  unit?: string;
  date?: string;
  flag?: "normal" | "abnormal" | "unknown";
  evidence: Evidence[];
  /** Entered or corrected by a clinician during profile review (see Extracted.edited). */
  edited?: boolean;
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
  /**
   * ISO timestamp of the last clinician edit in profile review; absent when the
   * profile is exactly what the extractor produced. Precomputed demo reviews
   * only apply to an unedited profile.
   */
  editedAt?: string;
}

// ---------------------------------------------------------------------------
// Trials (normalized from ClinicalTrials.gov API v2)
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
  /** The criterion as written (bullet/numbering stripped, whitespace normalized). */
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
  /** CT.gov primary purpose, e.g. "TREATMENT", "SUPPORTIVE_CARE", "DIAGNOSTIC", "PREVENTION". */
  primaryPurpose?: string;
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
  /** Distinct countries across all sites (not just the representative ones). */
  countries?: string[];
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
  /** Max trials sent to criterion-level review (default 16). */
  limit?: number;
}

export interface TrialSearchResponse {
  /** The trials selected for criterion-level review, best pre-screen fit first. */
  trials: Trial[];
  /** Human-readable description of the query that was run, for the UI ("Recruiting · Interventional · breast cancer · HER2-positive"). */
  queryDescription: string;
  source: "registry" | "fixture";
  totalAvailable?: number;
  /** How the candidate set was produced: every request, every study, every pre-screen decision. */
  trace?: SearchTrace;
}

// ---------------------------------------------------------------------------
// Search trace (the glass box around the registry step)
// ---------------------------------------------------------------------------

/** One request (possibly paginated) made to the ClinicalTrials.gov API. */
export interface RegistryRequestTrace {
  /** What the request was for, e.g. "Registry harvest", "Focused query", "Biomarker query". */
  label: string;
  /** Full URL of the first page. */
  url: string;
  /** `query.cond`. */
  cond?: string;
  /** `query.term` (Essie expression). */
  term?: string;
  /** Human-readable filters, e.g. ["Recruiting", "Interventional", "Sex: all or female"]. */
  filters: string[];
  pages: Array<{ page: number; studies: number; ms: number; bytes?: number }>;
  /** The registry's own count of studies matching this request. */
  total?: number;
}

/**
 * Pre-screen outcome for one harvested study. The pre-screen is deterministic
 * (lib/ctgov/prescreen.ts): hard gates first, then a relevance score.
 *   "selected"  → sent to criterion-level review
 *   "relevant"  → passed every gate but ranked below the review cut-off
 *   "set-aside" → stopped at a gate (see `reason`)
 */
export type PrescreenOutcome = "selected" | "relevant" | "set-aside";

export type PrescreenReason =
  | "location" // no site in the configured country
  | "sex" // enrolls the other sex only
  | "age" // age window excludes the patient
  | "study-type" // supportive-care, behavioral, device or diagnostic study
  | "subtype" // written for a different receptor subtype
  | "setting" // written for a different disease setting
  | "relevance"; // no subtype, setting or biomarker signal

export interface PrescreenEntry {
  nctId: string;
  title: string;
  phases: string[];
  outcome: PrescreenOutcome;
  /** Set when `outcome` is "set-aside". */
  reason?: PrescreenReason;
  /** Relevance score (higher = closer to the profile); meaningful once the hard gates are passed. */
  score: number;
  /** The signals behind the decision, e.g. ["PIK3CA mentioned", "advanced/metastatic setting"]. */
  signals: string[];
}

export interface SearchTrace {
  /** "live": the requests were made for this search. "snapshot": the bundled harvest is replayed. */
  mode: "live" | "snapshot";
  /** When the registry data was fetched. */
  fetchedAt: string;
  /** The registry's data timestamp, when known. */
  dataTimestamp?: string;
  /** Every study registered on ClinicalTrials.gov, when known. */
  registryTotal?: number;
  requests: RegistryRequestTrace[];
  /** Distinct studies harvested across all requests. */
  harvested: number;
  /** Eligibility criteria parsed out of free text across the harvested studies. */
  criteriaParsed: number;
  /** Country required by the location gate, if one is configured. */
  country?: string;
  /** One entry per harvested study, in harvest order. */
  prescreen: PrescreenEntry[];
  /** How many studies the pre-screen may send to criterion-level review. */
  reviewLimit: number;
}

export interface MatchRequest {
  profile: PatientProfile;
  trial: Trial;
}

export interface MatchResponse {
  match: TrialMatch;
}
