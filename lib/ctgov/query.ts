import type { BiomarkerResult, DiseaseSetting, PatientProfile, Trial } from "@/lib/types";
import type { CtgovSearchParams } from "./client";

/**
 * Patient profile → ClinicalTrials.gov query, plus client-side age filtering
 * and relevance ranking of the candidates that come back.
 *
 * Query strategy (verified against the live API, see client.ts):
 *   query.cond        "breast cancer" for any breast carcinoma, else the diagnosis text
 *   query.term        <subtype clause> AND <setting clause>   (Essie; omitted parts drop out)
 *   filter.overallStatus  RECRUITING
 *   filter.advanced   AREA[StudyType]INTERVENTIONAL AND AREA[Sex](ALL OR FEMALE)   (sex clause per patient)
 * Key biomarkers are searched with a second, targeted query (`biomarkerParams`)
 * rather than ANDed into the main one, so a PIK3CA/ESR1/BRCA-specific trial
 * is never crowded out but the main query stays broad (typically 100–500
 * registry hits, of which one page of 40–100 is fetched and re-ranked here).
 * Age is not filterable server-side in a reliable way, so it is applied
 * client-side with filterByAge().
 */

export const DEFAULT_LIMIT = 24;
export const MIN_CANDIDATE_PAGE = 40;
export const MAX_CANDIDATE_PAGE = 100;

export type QueryBreadth = "focused" | "broad" | "widest";

export interface BuildQueryOptions {
  /** Trials to return after ranking (default 24). Drives the page size requested from the registry. */
  limit?: number;
  /** "focused" = subtype AND setting; "broad" = subtype only; "widest" = condition only. */
  breadth?: QueryBreadth;
}

export interface TrialQuery {
  /** The main search. */
  params: CtgovSearchParams;
  /** Optional second search targeting the patient's actionable biomarkers; merge results with the main search. */
  biomarkerParams?: CtgovSearchParams;
  /** Human-readable summary, e.g. "Recruiting · Interventional · breast cancer · HER2-positive · metastatic". */
  description: string;
  breadth: QueryBreadth;
}

// ---------------------------------------------------------------------------
// Profile facets
// ---------------------------------------------------------------------------

export type SubtypeFamily = "her2-positive" | "triple-negative" | "hr-positive" | "unknown";

export interface ProfileFacets {
  /** True when the primary diagnosis is a breast carcinoma. */
  breast: boolean;
  /** Condition text for query.cond. */
  condition: string;
  family: SubtypeFamily;
  her2Low: boolean;
  setting: DiseaseSetting;
  /** Residual disease after neoadjuvant therapy (post-neoadjuvant trials). */
  residualDisease: boolean;
  sex: "female" | "male" | "unknown";
  age?: number;
  biomarkers: KeyBiomarker[];
  /** Lower-cased agent/regimen names from the treatment history. */
  agents: string[];
  cns: boolean;
}

export interface KeyBiomarker {
  /** Display label, e.g. "PIK3CA", "BRCA", "HER2-low". */
  label: string;
  /** Essie clause for query.term. */
  clause: string;
  /** Pattern used to spot the biomarker in trial text when ranking. */
  pattern: RegExp;
}

const BREAST_RE = /\bbreast\b|\bmammary\b|\btnbc\b|\bibc\b|\b(?:invasive |infiltrating )?(?:ductal|lobular) carcinoma\b|\bdcis\b/i;
const NOT_BREAST_RE = /pancrea|salivary|prostat|thyroid|lung|colon|gastric|ovarian|endometri/i;

export function isBreastCancer(diagnosis: string, histology?: string): boolean {
  const text = `${diagnosis} ${histology ?? ""}`;
  if (/\bbreast\b|\bmammary\b|\btnbc\b|\bibc\b/i.test(text)) return true;
  return BREAST_RE.test(text) && !NOT_BREAST_RE.test(text);
}

/** "Invasive ductal carcinoma, left breast" → "breast cancer"; "Non-small cell lung cancer, stage IV" → "Non-small cell lung cancer". */
export function conditionTerm(diagnosis: string, histology?: string): string {
  const text = (diagnosis ?? "").trim();
  if (!text) return "";
  if (isBreastCancer(text, histology)) return "breast cancer";
  const first = text.split(/[,;(]/)[0] ?? text;
  const cleaned = first
    .replace(/^\s*(?:metastatic|recurrent|advanced|locally advanced|invasive|infiltrating|stage\s+[ivx0-4abc]+)\s+/i, "")
    .replace(/\s+(?:stage\s+[ivx0-4abc]+|metastatic|recurrent)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || text;
}

function normaliseName(name: string): string {
  return name.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function biomarkerStatus(profile: PatientProfile, ...names: string[]): BiomarkerResult["status"] | undefined {
  const wanted = names.map(normaliseName);
  const hit = (profile.biomarkers ?? []).find((b) => wanted.includes(normaliseName(b.name ?? "")));
  return hit?.status;
}

export function deriveSubtype(profile: PatientProfile): { family: SubtypeFamily; her2Low: boolean } {
  const s = (profile.diagnosis?.subtype?.value ?? "").toLowerCase();
  const her2 = biomarkerStatus(profile, "HER2", "ERBB2");
  const er = biomarkerStatus(profile, "ER");
  const pr = biomarkerStatus(profile, "PR", "PgR");

  const her2Low = /her2[- ]?(?:low|ultralow)/.test(s) || her2 === "low";
  const her2PosText = /her2\s*\+|her2[- ]?pos/.test(s);
  const her2NegText = /her2[- ]?neg|her2-(?!low)|her2\s*-\s*(?:$|[/,)])/.test(s);
  const tnbcText = /\btnbc\b|triple[- ]?neg/.test(s);
  const hrPosText = /\bhr\s*\+|\ber\s*\+|\bpr\s*\+|hr[- ]?pos|er[- ]?pos|hormone[- ]receptor[- ]?pos|luminal/.test(s);

  let family: SubtypeFamily = "unknown";
  if (her2PosText || (!her2NegText && !her2Low && (her2 === "positive" || her2 === "amplified"))) {
    family = "her2-positive";
  } else if (tnbcText || (er === "negative" && pr === "negative" && (her2 === "negative" || her2 === "low"))) {
    family = "triple-negative";
  } else if (hrPosText || er === "positive" || pr === "positive") {
    family = "hr-positive";
  }
  return { family, her2Low };
}

const ACTIONABLE: Array<{ names: string[]; statuses: BiomarkerResult["status"][]; label: string; clause: string; pattern: RegExp }> = [
  { names: ["PIK3CA"], statuses: ["mutated", "positive"], label: "PIK3CA", clause: "PIK3CA", pattern: /pik3ca|pi3k/i },
  { names: ["ESR1"], statuses: ["mutated", "positive"], label: "ESR1", clause: "ESR1", pattern: /esr1/i },
  { names: ["AKT1"], statuses: ["mutated", "positive"], label: "AKT1", clause: "(AKT1 OR AKT OR capivasertib)", pattern: /\bakt1?\b|capivasertib/i },
  { names: ["PTEN"], statuses: ["mutated", "negative", "low"], label: "PTEN", clause: "(PTEN OR AKT OR capivasertib)", pattern: /\bpten\b|capivasertib/i },
  { names: ["BRCA1", "BRCA2", "gBRCA", "BRCA"], statuses: ["mutated", "positive"], label: "BRCA", clause: "(BRCA OR BRCA1 OR BRCA2 OR gBRCA OR PARP)", pattern: /brca|parp/i },
  { names: ["PALB2"], statuses: ["mutated", "positive"], label: "PALB2", clause: "(PALB2 OR PARP)", pattern: /palb2|parp/i },
  { names: ["PD-L1", "PDL1"], statuses: ["positive", "high"], label: "PD-L1", clause: "(PD-L1 OR PD-1 OR pembrolizumab)", pattern: /pd-?l1|pd-?1|pembrolizumab|checkpoint/i },
  { names: ["MSI", "MMR", "dMMR"], statuses: ["high", "positive", "mutated"], label: "MSI-H", clause: '(MSI-H OR "microsatellite instability" OR dMMR)', pattern: /msi|microsatellite|dmmr|mismatch repair/i },
  { names: ["TMB"], statuses: ["high"], label: "TMB-high", clause: '(TMB OR "tumor mutational burden")', pattern: /\btmb\b|mutational burden/i },
  { names: ["NTRK", "NTRK1", "NTRK2", "NTRK3"], statuses: ["positive", "mutated", "amplified"], label: "NTRK", clause: "(NTRK OR larotrectinib OR entrectinib)", pattern: /ntrk|larotrectinib|entrectinib/i },
  { names: ["HRD"], statuses: ["positive", "high"], label: "HRD", clause: '(HRD OR "homologous recombination" OR PARP)', pattern: /\bhrd\b|homologous recombination|parp/i },
  { names: ["ERBB2"], statuses: ["mutated"], label: "ERBB2 mutation", clause: '(ERBB2 OR "HER2 mutation" OR neratinib)', pattern: /erbb2|her2[- ]mutat|neratinib/i },
];

export function keyBiomarkers(profile: PatientProfile, her2Low: boolean): KeyBiomarker[] {
  const out: KeyBiomarker[] = [];
  const seen = new Set<string>();
  for (const b of profile.biomarkers ?? []) {
    const key = normaliseName(b.name ?? "");
    for (const spec of ACTIONABLE) {
      if (!spec.names.map(normaliseName).includes(key) || !spec.statuses.includes(b.status)) continue;
      if (seen.has(spec.label)) continue;
      seen.add(spec.label);
      out.push({ label: spec.label, clause: spec.clause, pattern: spec.pattern });
    }
  }
  if (her2Low && !seen.has("HER2-low")) {
    out.push({ label: "HER2-low", clause: '(HER2-low OR "HER2 low" OR HER2-ultralow)', pattern: /her2[- ]?(?:low|ultralow)/i });
  }
  return out;
}

const RESIDUAL_RE = /residual|\brcb\b|non-?pcr|no pcr|without pcr|incomplete (?:pathologic|response)/i;

export function profileFacets(profile: PatientProfile): ProfileFacets {
  const diagnosis = profile.diagnosis?.primary?.value ?? "";
  const histology = profile.diagnosis?.histology?.value;
  const { family, her2Low } = deriveSubtype(profile);
  const setting = profile.diagnosis?.setting?.value ?? "unknown";
  const treatments = profile.treatments ?? [];
  const residualDisease =
    treatments.some((t) => t.intent === "neoadjuvant" && RESIDUAL_RE.test(t.bestResponse ?? "")) ||
    (setting !== "metastatic" && setting !== "recurrent" && /residual disease|\brcb\b|non-?pcr|no pcr/i.test(profile.summary ?? ""));
  const sexValue = profile.demographics?.sex?.value;
  const ageValue = profile.demographics?.age?.value;
  const cnsValue = profile.diagnosis?.cnsStatus?.value;
  return {
    breast: isBreastCancer(diagnosis, histology),
    condition: conditionTerm(diagnosis, histology),
    family,
    her2Low,
    setting,
    residualDisease,
    sex: sexValue === "female" || sexValue === "male" ? sexValue : "unknown",
    age: typeof ageValue === "number" && Number.isFinite(ageValue) ? ageValue : undefined,
    biomarkers: keyBiomarkers(profile, her2Low),
    agents: treatments.flatMap((t) => [...(t.agents ?? []), t.name ?? ""]).map((a) => a.toLowerCase()).filter(Boolean),
    cns: cnsValue === "present-untreated" || cnsValue === "treated-stable",
  };
}

// ---------------------------------------------------------------------------
// Query construction
// ---------------------------------------------------------------------------

export function subtypeClause(family: SubtypeFamily, her2Low: boolean): string | undefined {
  switch (family) {
    case "her2-positive":
      return '(HER2-positive OR "HER2 positive")';
    case "triple-negative":
      return her2Low
        ? '("triple negative" OR triple-negative OR TNBC OR HER2-low)'
        : '("triple negative" OR triple-negative OR TNBC)';
    case "hr-positive":
      return her2Low
        ? '(HR-positive OR ER-positive OR "hormone receptor positive" OR "estrogen receptor positive" OR HER2-low)'
        : '(HR-positive OR ER-positive OR "hormone receptor positive" OR "estrogen receptor positive")';
    default:
      return undefined;
  }
}

export function settingClause(setting: DiseaseSetting, residualDisease: boolean): string | undefined {
  switch (setting) {
    case "metastatic":
      return '(metastatic OR advanced OR "stage IV")';
    case "recurrent":
      return "(recurrent OR metastatic OR advanced)";
    case "locally-advanced":
      return '("locally advanced" OR unresectable OR advanced OR neoadjuvant)';
    case "early":
      return residualDisease
        ? '("residual disease" OR "non-pCR" OR "achieve pCR" OR "without pCR" OR adjuvant OR "post-neoadjuvant" OR early)'
        : '(early OR "early-stage" OR adjuvant OR neoadjuvant OR "high risk")';
    default:
      return undefined;
  }
}

export function sexClause(sex: ProfileFacets["sex"]): string | undefined {
  if (sex === "female") return "AREA[Sex](ALL OR FEMALE)";
  if (sex === "male") return "AREA[Sex](ALL OR MALE)";
  return undefined;
}

export function subtypeLabel(family: SubtypeFamily, her2Low: boolean): string | undefined {
  switch (family) {
    case "her2-positive":
      return "HER2-positive";
    case "triple-negative":
      return her2Low ? "triple-negative (HER2-low)" : "triple-negative";
    case "hr-positive":
      return her2Low ? "HR-positive/HER2-low" : "HR-positive/HER2-negative";
    default:
      return undefined;
  }
}

export function settingLabel(setting: DiseaseSetting, residualDisease: boolean): string | undefined {
  switch (setting) {
    case "metastatic":
      return "metastatic";
    case "recurrent":
      return "recurrent";
    case "locally-advanced":
      return "locally advanced";
    case "early":
      return residualDisease ? "early-stage, residual disease" : "early-stage";
    default:
      return undefined;
  }
}

export function candidatePageSize(limit: number): number {
  return Math.min(MAX_CANDIDATE_PAGE, Math.max(MIN_CANDIDATE_PAGE, Math.floor(limit) * 3));
}

export function buildTrialQuery(profile: PatientProfile, opts: BuildQueryOptions = {}): TrialQuery {
  const limit = Math.max(1, Math.floor(opts.limit ?? DEFAULT_LIMIT));
  const breadth: QueryBreadth = opts.breadth ?? "focused";
  const f = profileFacets(profile);

  const subtype = breadth === "widest" ? undefined : subtypeClause(f.family, f.her2Low);
  const setting = breadth === "focused" ? settingClause(f.setting, f.residualDisease) : undefined;
  const termParts = [subtype, setting].filter((p): p is string => Boolean(p));

  const advanced = ["AREA[StudyType]INTERVENTIONAL", sexClause(f.sex)].filter(Boolean).join(" AND ");
  const base: CtgovSearchParams = {
    cond: f.condition || undefined,
    overallStatus: ["RECRUITING"],
    advanced,
    pageSize: candidatePageSize(limit),
    countTotal: true,
  };
  const params: CtgovSearchParams = { ...base, term: termParts.length ? termParts.join(" AND ") : undefined };

  let biomarkerParams: CtgovSearchParams | undefined;
  if (f.biomarkers.length && breadth !== "widest") {
    const clause = f.biomarkers.length === 1 ? f.biomarkers[0].clause : `(${f.biomarkers.map((b) => b.clause).join(" OR ")})`;
    biomarkerParams = {
      ...base,
      term: [clause, setting].filter(Boolean).join(" AND "),
      pageSize: Math.min(MAX_CANDIDATE_PAGE, Math.max(20, limit)),
    };
  }

  const descriptionParts = [
    "Recruiting",
    "Interventional",
    f.condition || "any condition",
    breadth !== "widest" ? subtypeLabel(f.family, f.her2Low) : undefined,
    breadth === "focused" ? settingLabel(f.setting, f.residualDisease) : undefined,
    biomarkerParams ? f.biomarkers.map((b) => b.label).join(", ") : undefined,
  ].filter((p): p is string => Boolean(p));

  return { params, biomarkerParams, description: descriptionParts.join(" · "), breadth };
}

// ---------------------------------------------------------------------------
// Age filter (client-side)
// ---------------------------------------------------------------------------

/** "18 Years" → 18; "6 Months" → 0.5; "N/A" → undefined. */
export function parseAgeYears(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const m = /^\s*(\d+(?:\.\d+)?)\s*(year|month|week|day|hour|minute)s?\b/i.exec(raw);
  if (!m) return undefined;
  const n = parseFloat(m[1]);
  switch (m[2].toLowerCase()) {
    case "year":
      return n;
    case "month":
      return n / 12;
    case "week":
      return n / 52;
    case "day":
      return n / 365;
    default:
      return 0;
  }
}

export function trialAcceptsAge(trial: Pick<Trial, "minimumAge" | "maximumAge">, age: number): boolean {
  const min = parseAgeYears(trial.minimumAge);
  const max = parseAgeYears(trial.maximumAge);
  return (min === undefined || age >= min) && (max === undefined || age <= max);
}

/** Drop trials whose age window excludes the patient. Unknown age → unchanged. */
export function filterByAge(trials: Trial[], age: number | undefined): Trial[] {
  if (age === undefined || !Number.isFinite(age)) return trials;
  return trials.filter((t) => trialAcceptsAge(t, age));
}

// ---------------------------------------------------------------------------
// Relevance ranking (simple, deterministic)
// ---------------------------------------------------------------------------

export interface RelevanceScore {
  nctId: string;
  score: number;
  reasons: string[];
}

const HER2POS_RE = /her2[- ]?positive|her2\s*\+|her2[- ]?pos\b|her2[- ]?(?:directed|targeted|expressing)|anti[- ]?her2|erbb2[- ]?positive|her2[- ]?amplif/;
const TNBC_RE = /triple[- ]?negative|\btnbc\b/;
const HRPOS_RE = /\bhr[- ]?positive|\ber[- ]?positive|hormone[- ]receptor[- ]?positive|estrogen[- ]receptor[- ]?positive|\bhr\s*\+|\ber\s*\+|luminal|endocrine/;
const HER2NEG_RE = /her2[- ]?negative|her2\s*-(?!\s*low)(?![a-z])|her2[- ]?neg\b/;
const HER2LOW_RE = /her2[- ]?(?:low|ultralow)/;
const METASTATIC_RE = /metasta|advanced|stage iv\b|unresectable|\bmbc\b|\babc\b/;
const EARLY_RE = /\bearly\b|adjuvant|neoadjuvant|residual|high[- ]risk|operable|stage i{1,3}\b|\bebc\b|post-neoadjuvant/;
const BRAIN_RE = /brain metasta|cns metasta|intracranial|leptomeningeal|central nervous system/;
/** Trials for residual disease after neoadjuvant therapy ("did not achieve pCR", "post-neoadjuvant", "RCB"). */
const RESIDUAL_TRIAL_RE = /residual|non-?pcr|\bno pcr\b|not achieve[ds]? (?:a )?pcr|without (?:a )?pcr|post-?neoadjuvant|after neoadjuvant|following neoadjuvant|\brcb\b/;

const AGENT_CLASSES: Array<{ label: string; patient: RegExp; trial: RegExp }> = [
  { label: "CDK4/6 inhibitor", patient: /palbociclib|ribociclib|abemaciclib|cdk4/, trial: /cdk4\/6|cdk 4\/6|palbociclib|ribociclib|abemaciclib/ },
  { label: "T-DXd", patient: /deruxtecan|t-dxd|enhertu/, trial: /t-dxd|deruxtecan|enhertu/ },
  { label: "sacituzumab", patient: /sacituzumab|trodelvy/, trial: /sacituzumab|trodelvy/ },
  { label: "checkpoint inhibitor", patient: /pembrolizumab|atezolizumab|nivolumab|durvalumab|keytruda/, trial: /pembrolizumab|keytruda|atezolizumab|nivolumab|durvalumab|checkpoint|immunotherapy|pd-?1|pd-?l1/ },
  { label: "tucatinib", patient: /tucatinib|tukysa/, trial: /tucatinib|tukysa/ },
  { label: "pertuzumab", patient: /pertuzumab|perjeta|phesgo/, trial: /pertuzumab|perjeta|phesgo/ },
  { label: "T-DM1", patient: /emtansine|t-dm1|kadcyla/, trial: /t-dm1|emtansine|kadcyla/ },
  { label: "trastuzumab", patient: /trastuzumab|herceptin/, trial: /trastuzumab|herceptin|her2/ },
  { label: "SERD/fulvestrant", patient: /fulvestrant|elacestrant|camizestrant|imlunestrant|vepdegestrant|giredestrant/, trial: /fulvestrant|\bserd\b|elacestrant|camizestrant|imlunestrant|vepdegestrant|giredestrant/ },
  { label: "aromatase inhibitor", patient: /letrozole|anastrozole|exemestane|aromatase/, trial: /aromatase|letrozole|anastrozole|exemestane|endocrine/ },
  { label: "tamoxifen", patient: /tamoxifen/, trial: /tamoxifen|endocrine/ },
  { label: "capecitabine", patient: /capecitabine|xeloda/, trial: /capecitabine|xeloda/ },
  { label: "PARP inhibitor", patient: /olaparib|talazoparib|parp/, trial: /parp|olaparib|talazoparib/ },
  { label: "PI3K/AKT/mTOR", patient: /alpelisib|inavolisib|capivasertib|everolimus/, trial: /pi3k|\bakt\b|alpelisib|inavolisib|capivasertib|everolimus|mtor/ },
  { label: "platinum", patient: /carboplatin|cisplatin|platinum/, trial: /platinum|carboplatin|cisplatin/ },
  { label: "taxane", patient: /paclitaxel|docetaxel|taxane|abraxane/, trial: /taxane|paclitaxel|docetaxel/ },
  { label: "anthracycline", patient: /doxorubicin|epirubicin|anthracycline/, trial: /anthracycline|doxorubicin|epirubicin/ },
];

const PRIOR_CONTEXT = "(?:prior|previous(?:ly)?|after|following|post[- ]?|pretreated|progress(?:ed|ion|ing) (?:on|after|during|while on)|refractory to|intolerant (?:to|of)|resistant to|received|exposed to|treated with)";
const priorContextCache = new Map<string, RegExp>();

/** "prior … <agent>" within one clause, e.g. "after CDK4/6 inhibitor", "previously treated with T-DXd". */
function priorContext(cls: { label: string; trial: RegExp }): RegExp {
  let re = priorContextCache.get(cls.label);
  if (!re) {
    re = new RegExp(`${PRIOR_CONTEXT}[^.;:]{0,80}?(?:${cls.trial.source})`, "i");
    priorContextCache.set(cls.label, re);
  }
  return re;
}

export function scoreTrialRelevance(profile: PatientProfile, trial: Trial): RelevanceScore {
  const f = profileFacets(profile);
  return scoreWithFacets(f, trial);
}

function scoreWithFacets(f: ProfileFacets, trial: Trial): RelevanceScore {
  const reasons: string[] = [];
  let score = 0;
  const head = [trial.title, trial.officialTitle ?? "", ...(trial.conditions ?? []), ...(trial.keywords ?? [])].join(" | ").toLowerCase();
  const body = (trial.summary ?? "").toLowerCase();
  const elig = (trial.eligibilityText ?? "").slice(0, 6000).toLowerCase();
  const any = `${head} ${body}`;

  // Subtype
  const headHer2Pos = HER2POS_RE.test(head);
  const headTnbc = TNBC_RE.test(head);
  const headHrPos = HRPOS_RE.test(head);
  const headHer2Neg = HER2NEG_RE.test(head) || HER2LOW_RE.test(head);
  if (f.family === "her2-positive") {
    if (headHer2Pos) { score += 4; reasons.push("HER2-positive in title/conditions"); }
    else if (HER2POS_RE.test(body)) { score += 1; reasons.push("HER2-positive in summary"); }
    if (!headHer2Pos && (headTnbc || (headHrPos && headHer2Neg) || headHer2Neg)) { score -= 3; reasons.push("subtype conflict (not HER2-positive)"); }
  } else if (f.family === "triple-negative") {
    if (headTnbc) { score += 4; reasons.push("triple-negative in title/conditions"); }
    else if (TNBC_RE.test(body)) { score += 1; reasons.push("triple-negative in summary"); }
    if (!headTnbc && (headHer2Pos || headHrPos)) { score -= 3; reasons.push("subtype conflict (not triple-negative)"); }
  } else if (f.family === "hr-positive") {
    if (headHrPos || headHer2Neg) { score += 4; reasons.push("HR-positive/HER2-negative in title/conditions"); }
    else if (HRPOS_RE.test(body) || HER2NEG_RE.test(body)) { score += 1; reasons.push("HR-positive/HER2-negative in summary"); }
    if (!headHrPos && !headHer2Neg && (headHer2Pos || headTnbc)) { score -= 3; reasons.push("subtype conflict (not HR-positive/HER2-negative)"); }
  }
  if (f.her2Low && HER2LOW_RE.test(any)) { score += 2; reasons.push("HER2-low mentioned"); }

  // Setting
  const headMeta = METASTATIC_RE.test(head);
  const headEarly = EARLY_RE.test(head);
  if (f.setting === "metastatic" || f.setting === "recurrent") {
    if (headMeta) { score += 2; reasons.push("advanced/metastatic setting"); }
    if (!headMeta && headEarly) { score -= 3; reasons.push("setting conflict (early-stage trial)"); }
  } else if (f.setting === "early") {
    if (headEarly) { score += 2; reasons.push("early-stage setting"); }
    if (f.residualDisease) {
      const headResidual = RESIDUAL_TRIAL_RE.test(head);
      if (headResidual) { score += 3; reasons.push("residual disease after neoadjuvant therapy"); }
      else if (RESIDUAL_TRIAL_RE.test(body)) { score += 1; reasons.push("residual disease mentioned in summary"); }
      if (!headResidual && /neoadjuvant|preoperative|pre-operative/.test(head)) { score -= 2; reasons.push("pre-operative trial (neoadjuvant therapy already completed)"); }
    }
    if (!headEarly && headMeta) { score -= 3; reasons.push("setting conflict (advanced/metastatic trial)"); }
  } else if (f.setting === "locally-advanced") {
    if (/locally advanced|unresectable|neoadjuvant/.test(head)) { score += 2; reasons.push("locally advanced setting"); }
  }

  // Biomarkers
  for (const b of f.biomarkers) {
    if (b.pattern.test(any)) { score += 2; reasons.push(`${b.label} mentioned`); }
    else if (b.pattern.test(elig)) { score += 1; reasons.push(`${b.label} in eligibility text`); }
  }

  // Prior therapy: the trial must talk about the agent as *prior* treatment
  // ("after CDK4/6 inhibitor", "previously treated with T-DXd"), otherwise a
  // trial that merely uses the same drug would be rewarded.
  let therapyBonus = 0;
  const therapyText = `${any} ${elig}`;
  for (const cls of AGENT_CLASSES) {
    if (!f.agents.some((a) => cls.patient.test(a))) continue;
    if (priorContext(cls).test(therapyText)) { therapyBonus += 1; reasons.push(`prior ${cls.label} relevant`); }
  }
  score += Math.min(2, therapyBonus);

  // CNS
  const brainTrial = BRAIN_RE.test(head);
  if (f.cns && BRAIN_RE.test(any)) { score += 2; reasons.push("CNS metastases addressed"); }
  if (!f.cns && brainTrial) { score -= 2; reasons.push("brain-metastasis-specific trial"); }

  return { nctId: trial.nctId, score, reasons };
}

/** Rank trials by simple relevance to the profile (highest first). Does not mutate the input. */
export function prioritizeTrials(profile: PatientProfile, trials: Trial[]): Trial[] {
  const f = profileFacets(profile);
  const scored = trials.map((trial, index) => ({ trial, index, score: scoreWithFacets(f, trial).score }));
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const ua = a.trial.lastUpdated ?? "";
    const ub = b.trial.lastUpdated ?? "";
    if (ua !== ub) return ub.localeCompare(ua);
    return a.index - b.index;
  });
  return scored.map((s) => s.trial);
}
