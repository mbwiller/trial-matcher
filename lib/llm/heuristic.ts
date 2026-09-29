/**
 * Offline fallbacks, used when no API key is configured and the record is not
 * a bundled demo patient.
 *
 * `heuristicExtract` is a regex keyword screen with verbatim evidence quotes;
 * `heuristicMatch` is a rule-based screen over a handful of criterion types.
 * Both say so in their outputs and never claim more than medium confidence.
 */
import type {
  BiomarkerResult,
  BiomarkerStatus,
  CnsStatus,
  Confidence,
  Criterion,
  CriterionVerdict,
  DiseaseSetting,
  Evidence,
  Extracted,
  KeyDate,
  LabResult,
  MenopausalStatus,
  PatientProfile,
  Sex,
  TreatmentCategory,
  TreatmentEvent,
  TreatmentIntent,
  TreatmentStatus,
  Trial,
  TrialMatch,
  VerdictStatus,
} from "@/lib/types";
import { alignEvidence } from "@/lib/llm/evidence";
import { finalizeMatch } from "@/lib/scoring";

// ---------------------------------------------------------------------------
// Text utilities
// ---------------------------------------------------------------------------

const MAX_QUOTE = 200;

function matchAll(text: string, re: RegExp): RegExpExecArray[] {
  const flags = re.flags.includes("g") ? re.flags : `${re.flags}g`;
  const scanner = new RegExp(re.source, flags);
  const out: RegExpExecArray[] = [];
  let m: RegExpExecArray | null;
  while ((m = scanner.exec(text)) !== null) {
    if (m[0] === "") {
      scanner.lastIndex++;
      continue;
    }
    out.push(m);
  }
  return out;
}

function first(text: string, re: RegExp): RegExpExecArray | null {
  return matchAll(text, re)[0] ?? null;
}

function last(text: string, re: RegExp): RegExpExecArray | null {
  const all = matchAll(text, re);
  return all.length ? all[all.length - 1] : null;
}

/** Verbatim evidence for text[start, end), trimmed and capped at 200 characters. */
function evidenceAt(text: string, start: number, end: number): Evidence {
  const raw = text.slice(start, end);
  const leading = raw.length - raw.trimStart().length;
  const quote = raw.trim().slice(0, MAX_QUOTE);
  const from = start + leading;
  const evidence: Evidence = { quote, start: from, end: from + quote.length };
  const source = sectionLabel(text, from);
  if (source) evidence.source = source;
  return evidence;
}

function evidenceOf(text: string, m: RegExpExecArray): Evidence {
  return evidenceAt(text, m.index, m.index + m[0].length);
}

function lineStart(text: string, index: number): number {
  return text.lastIndexOf("\n", index - 1) + 1;
}

function lineEnd(text: string, index: number): number {
  const at = text.indexOf("\n", index);
  return at < 0 ? text.length : at;
}

/** Text around [start, end) within the same line. */
function windowAround(text: string, start: number, end: number, before: number, after: number): string {
  return text.slice(Math.max(lineStart(text, start), start - before), Math.min(lineEnd(text, end), end + after));
}

const NEGATION = /\b(?:no|not|without|denies|denied|deny|negative for|r\/o|rule out|ruled out|free of|absence of|absent|never|neg)\b\s*(?:evidence of\s*|evidence for\s*|known\s*|history of\s*|hx of\s*|significant\s*|distant\s*|new\s*|active\s*|current\s*|prior\s*|clinical\s*)?(?:[\w-]+\s+){0,2}$/i;

/** True when the words just before `index` (same line) negate a mention. */
function isNegated(text: string, index: number): boolean {
  const before = text.slice(Math.max(lineStart(text, index), index - 48), index);
  if (/(?:^|\W)non-?$/i.test(before)) return true;
  return NEGATION.test(before);
}

const HEADER_HINT = /\b(?:note|pathology|path|imaging|radiology|CT|MRI|PET|echo|labs?|laboratory|medications?|meds|history|assessment|plan|oncology|consult|report|summary|problem list|allerg\w*|biopsy|surgery|operative|genomic|molecular|discharge|progress|HPI|PMH|ROS|exam)\b/i;

/** A short header-like line above `index`, used as the evidence `source` label. */
function sectionLabel(text: string, index: number): string | undefined {
  let end = lineStart(text, index) - 1;
  for (let lines = 0; end > 0 && lines < 60; lines++) {
    const start = lineStart(text, end);
    const line = text.slice(start, end).trim();
    end = start - 1;
    if (!line) continue;
    const headerLike = line.length <= 70 && !/[.;,]$/.test(line) && HEADER_HINT.test(line) && (line === line.toUpperCase() || /:$/.test(line) || /^[#=\-*\s]*[A-Z]/.test(line));
    if (headerLike) return line.replace(/^[#=\-*\s]+|[:\s]+$/g, "").slice(0, 60);
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

const MONTH_INDEX: Record<string, number> = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const MONTHS = "jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec";
const DATE_RE = new RegExp(
  `\\b(\\d{4})-(\\d{2})(?:-(\\d{2}))?\\b|\\b(\\d{1,2})\\/(\\d{1,2})\\/(\\d{2}|\\d{4})\\b|\\b(\\d{1,2})\\/(\\d{4})\\b|\\b(${MONTHS})[a-z]*\\.?\\s+(?:(\\d{1,2})(?:st|nd|rd|th)?,?\\s+)?(\\d{4})\\b|\\b(\\d{1,2})\\s+(${MONTHS})[a-z]*\\.?,?\\s+(\\d{4})\\b`,
  "gi",
);

interface FoundDate {
  iso: string;
  start: number;
  end: number;
}

const pad2 = (n: number | string) => String(n).padStart(2, "0");
const validYear = (y: string) => +y >= 1900 && +y <= 2100;

export function findDates(text: string): FoundDate[] {
  const out: FoundDate[] = [];
  for (const m of matchAll(text, DATE_RE)) {
    let iso: string | null = null;
    if (m[1]) {
      const month = +m[2];
      if (validYear(m[1]) && month >= 1 && month <= 12 && (!m[3] || (+m[3] >= 1 && +m[3] <= 31))) {
        iso = m[3] ? `${m[1]}-${m[2]}-${m[3]}` : `${m[1]}-${m[2]}`;
      }
    } else if (m[4]) {
      const month = +m[4];
      const day = +m[5];
      const year = m[6].length === 2 ? `20${m[6]}` : m[6];
      if (validYear(year) && month >= 1 && month <= 12 && day >= 1 && day <= 31) iso = `${year}-${pad2(month)}-${pad2(day)}`;
    } else if (m[7]) {
      const month = +m[7];
      if (validYear(m[8]) && month >= 1 && month <= 12) iso = `${m[8]}-${pad2(month)}`;
    } else if (m[9]) {
      const month = MONTH_INDEX[m[9].slice(0, 3).toLowerCase()];
      if (validYear(m[11]) && month) iso = m[10] ? `${m[11]}-${pad2(month)}-${pad2(+m[10])}` : `${m[11]}-${pad2(month)}`;
    } else if (m[12]) {
      const month = MONTH_INDEX[m[13].slice(0, 3).toLowerCase()];
      if (validYear(m[14]) && month) iso = `${m[14]}-${pad2(month)}-${pad2(+m[12])}`;
    }
    if (iso) out.push({ iso, start: m.index, end: m.index + m[0].length });
  }
  return out;
}

/** The date closest to [start, end) within `radius` characters on the same line. */
function dateNear(text: string, start: number, end: number, radius = 80): FoundDate | undefined {
  const from = Math.max(lineStart(text, start), start - radius);
  const to = Math.min(lineEnd(text, end), end + radius);
  let best: FoundDate | undefined;
  let bestDistance = Infinity;
  for (const d of findDates(text.slice(from, to))) {
    const abs = { ...d, start: d.start + from, end: d.end + from };
    const distance = abs.end <= start ? start - abs.end : abs.start >= end ? abs.start - end : 0;
    if (distance < bestDistance) {
      best = abs;
      bestDistance = distance;
    }
  }
  return best;
}

/** A date on the same line before `index`, else a dated short header on the previous line. */
function dateBefore(text: string, index: number): string | undefined {
  const start = lineStart(text, index);
  const onLine = findDates(text.slice(start, index));
  if (onLine.length) return onLine[onLine.length - 1].iso;
  const prevEnd = start - 1;
  if (prevEnd > 0) {
    const prevStart = lineStart(text, prevEnd);
    const prev = text.slice(prevStart, prevEnd);
    if (prev.trim().length <= 80) {
      const dates = findDates(prev);
      if (dates.length) return dates[dates.length - 1].iso;
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Extracted<T> helpers
// ---------------------------------------------------------------------------

function ex<T>(value: T, confidence: Confidence, evidence: Evidence[], note?: string): Extracted<T> {
  return note ? { value, confidence, evidence, note } : { value, confidence, evidence };
}

// ---------------------------------------------------------------------------
// Demographics
// ---------------------------------------------------------------------------

const AGE_WITH_SEX = /\b(\d{1,3})\s*-?\s*(?:yo|y\/o|y\.o\.?|yr[- ]old|yrs[- ]old|years?[- ]old|year[- ]old)\b(?:\s*,?\s*(F|M|female|male|woman|man|gentleman|lady)\b)?/i;
const AGE_SEX_COMPACT = /(?<![\d.])(\d{2,3})\s?(F|M)\b(?![/\-\d])/;
const AGE_LABEL = /\bage\s*(?:[:=]|of|is)?\s*(\d{1,3})\b/i;
const SEX_LABEL = /\bsex\s*[:=]?\s*(F|M|female|male)\b/i;
const SEX_WORD = /\b(female|woman|male|man|gentleman)\b/i;
const MENOPAUSE = /\b(post|pre|peri)[- ]?menopausal\b/i;

function sexFromToken(token: string): Sex {
  const t = token.toLowerCase();
  if (t === "f" || t === "female" || t === "woman" || t === "lady") return "female";
  if (t === "m" || t === "male" || t === "man" || t === "gentleman") return "male";
  return "unknown";
}

function extractDemographics(text: string): PatientProfile["demographics"] {
  const out: PatientProfile["demographics"] = {};
  const withSex = first(text, AGE_WITH_SEX);
  if (withSex && +withSex[1] >= 1 && +withSex[1] <= 110) {
    out.age = ex(+withSex[1], "medium", [evidenceOf(text, withSex)]);
    if (withSex[2]) out.sex = ex(sexFromToken(withSex[2]), "medium", [evidenceOf(text, withSex)]);
  }
  if (!out.age) {
    const labelled = first(text, AGE_LABEL);
    if (labelled && +labelled[1] >= 1 && +labelled[1] <= 110) out.age = ex(+labelled[1], "medium", [evidenceOf(text, labelled)]);
  }
  if (!out.age) {
    const compact = first(text, AGE_SEX_COMPACT);
    if (compact && +compact[1] >= 18 && +compact[1] <= 110) {
      out.age = ex(+compact[1], "low", [evidenceOf(text, compact)], "Read from a compact age/sex token");
      out.sex = ex(sexFromToken(compact[2]), "low", [evidenceOf(text, compact)]);
    }
  }
  if (!out.sex) {
    const labelled = first(text, SEX_LABEL) ?? first(text, SEX_WORD);
    if (labelled) out.sex = ex(sexFromToken(labelled[1]), "medium", [evidenceOf(text, labelled)]);
  }
  const menopause = first(text, MENOPAUSE);
  if (menopause) {
    const status = `${menopause[1].toLowerCase()}menopausal` as MenopausalStatus;
    out.menopausalStatus = ex(status, "medium", [evidenceOf(text, menopause)]);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Receptors and biomarkers
// ---------------------------------------------------------------------------

interface Mention {
  status: BiomarkerStatus;
  detail?: string;
  evidence: Evidence;
  index: number;
}

function statusFromToken(token: string): BiomarkerStatus {
  const t = token.toLowerCase().replace(/\s+/g, "");
  if (t === "+" || t.startsWith("pos") || t === "amplified" || t.startsWith("overexpress")) return "positive";
  if (t === "-" || t.startsWith("neg") || t === "non-amplified" || t === "nonamplified" || t === "notamplified") return "negative";
  if (t === "low" || t === "ultra-low" || t === "ultralow") return "low";
  if (t === "equivocal") return "equivocal";
  const pct = /^<?(\d{1,3})%$/.exec(t);
  if (pct) return t.startsWith("<") || +pct[1] < 1 ? "negative" : "positive";
  return "unknown";
}

/** Mentions of a hormone receptor ("ER 95%", "ER-positive", "ER+", "ER/PR positive"). */
function receptorMentions(text: string, name: "ER" | "PR"): Mention[] {
  const words = name === "ER" ? "ER|o?estrogen receptor" : "PR|progesterone receptor";
  const patterns = [
    new RegExp(`\\b(?:${words})\\b\\s*(?:[-:=]|is|was|of)?\\s*(positive|negative|pos|neg)\\b(?:\\s*\\(([^)]{1,40})\\))?`, "gi"),
    new RegExp(`\\b(?:${words})\\b\\s*[:=(]?\\s*(<\\s*1\\s*%|\\d{1,3}\\s*%)`, "gi"),
    new RegExp(`\\b${name}\\s*(\\+|-)(?![A-Za-z0-9])`, "g"),
    /\bER\s*\/\s*PR\s*(?:[-:=]|is|was|are)?\s*(positive|negative|pos|neg|\+|-)(?![A-Za-z0-9])/gi,
  ];
  const mentions: Mention[] = [];
  for (const re of patterns) {
    for (const m of matchAll(text, re)) {
      const status = statusFromToken(m[1]);
      if (status === "unknown") continue;
      const detail = /\d/.test(m[1]) ? m[1].replace(/\s+/g, "") : m[2]?.trim();
      mentions.push({ status, detail, evidence: evidenceOf(text, m), index: m.index });
    }
  }
  return mentions.sort((a, b) => a.index - b.index);
}

function chooseMention(mentions: Mention[]): { chosen: Mention; note?: string } | undefined {
  if (!mentions.length) return undefined;
  const chosen = mentions[mentions.length - 1];
  const differs = mentions.some((m) => m.status !== chosen.status);
  return { chosen, note: differs ? "Multiple results documented; the last mention in the record was used" : undefined };
}

const HER2_WORD = /\bHER-?2(?:\/neu)?\b\s*(?:[-:=]|is|was)?\s*(positive|negative|pos|neg|low|ultra-?low|equivocal|amplified|non-?amplified|not amplified|overexpress(?:ed|ing|ion))\b/gi;
const HER2_SCORE = /\bHER-?2(?:\/neu)?\b[^.\n;]{0,30}?\b(?:IHC\s*)?(0|1\+|2\+|3\+)(?![\d%+])/gi;
const HER2_SYMBOL = /\bHER-?2\s*(\+|-)(?![A-Za-z0-9])/g;
const ISH_RESULT = /\b(?:FISH|ISH|DISH|SISH|CISH)\b\s*(?:[-:=]|is|was|shows?|showed)?\s*(positive|negative|pos|neg|amplified|non-?amplified|not amplified|equivocal|\+|-(?![A-Za-z0-9]))/gi;
const ISH_RATIO = /\b(?:HER2\s*[/:]\s*CEP17\s*)?ratio\s*(?:of|:|=)?\s*(\d+(?:\.\d+)?)/gi;

function her2Result(text: string): BiomarkerResult | undefined {
  const score = last(text, HER2_SCORE);
  const ish = last(text, ISH_RESULT);
  const ratio = last(text, ISH_RATIO);
  const word = last(text, HER2_WORD);
  const symbol = last(text, HER2_SYMBOL);
  if (!score && !ish && !word && !symbol) return undefined;

  const ishStatus = ish ? statusFromToken(ish[1]) : ratio ? (+ratio[1] >= 2 ? "positive" : "negative") : undefined;
  const evidence: Evidence[] = [];
  let status: BiomarkerStatus = "unknown";
  let detail: string | undefined;
  let method: string | undefined;

  if (score) {
    evidence.push(evidenceOf(text, score));
    method = "IHC";
    const ihc = score[1];
    if (ihc === "3+") [status, detail] = ["positive", "IHC 3+"];
    else if (ihc === "0") [status, detail] = ["negative", "IHC 0"];
    else if (ihc === "1+") [status, detail] = ["low", "IHC 1+ (HER2-low)"];
    else if (ishStatus === "positive") [status, detail] = ["positive", "IHC 2+, ISH amplified"];
    else if (ishStatus === "negative") [status, detail] = ["low", "IHC 2+, ISH non-amplified (HER2-low)"];
    else [status, detail] = ["equivocal", "IHC 2+, ISH not documented"];
    if (ish && ihc === "2+") {
      evidence.push(evidenceOf(text, ish));
      method = "IHC/ISH";
    } else if (ratio && ihc === "2+") {
      evidence.push(evidenceOf(text, ratio));
      method = "IHC/ISH";
    }
  } else if (word) {
    evidence.push(evidenceOf(text, word));
    status = statusFromToken(word[1]);
    detail = word[1];
  } else if (ish && ishStatus) {
    evidence.push(evidenceOf(text, ish));
    status = ishStatus;
    method = "ISH";
    detail = `ISH ${ish[1]}`;
  } else if (symbol) {
    evidence.push(evidenceOf(text, symbol));
    status = statusFromToken(symbol[1]);
  }
  return { name: "HER2", status, detail, method, evidence, confidence: score ? "medium" : "low" };
}

const KI67 = /\bKi-?67\b\s*(?:proliferation index|index|PI)?\s*(?:of|:|=|is|was)?\s*(?:~|approximately|approx\.?|about)?\s*(\d{1,3})\s*%/gi;
const HR_SYMBOL = /\bHR\s*(\+|-|positive|negative)(?![A-Za-z0-9])/gi;

function extractReceptors(text: string): BiomarkerResult[] {
  const out: BiomarkerResult[] = [];
  for (const name of ["ER", "PR"] as const) {
    const pick = chooseMention(receptorMentions(text, name));
    if (pick) {
      out.push({
        name,
        status: pick.chosen.status,
        detail: pick.chosen.detail,
        method: "IHC",
        evidence: [pick.chosen.evidence],
        confidence: pick.note ? "low" : "medium",
      });
    }
  }
  const her2 = her2Result(text);
  if (her2) out.push(her2);
  if (!out.some((b) => b.name === "ER" || b.name === "PR")) {
    const hr = last(text, HR_SYMBOL);
    if (hr) {
      out.push({ name: "HR", status: statusFromToken(hr[1]), detail: "Hormone receptor status not itemised by receptor", evidence: [evidenceOf(text, hr)], confidence: "low" });
    }
  }
  const ki67 = last(text, KI67);
  if (ki67) {
    out.push({ name: "Ki-67", status: +ki67[1] >= 20 ? "high" : "low", detail: `${ki67[1]}%`, method: "IHC", evidence: [evidenceOf(text, ki67)], confidence: "medium" });
  }
  return out;
}

interface GeneRule {
  name: string;
  re: RegExp;
}

const GENE_RULES: GeneRule[] = [
  { name: "PIK3CA", re: /\bPIK3CA\b/g },
  { name: "ESR1", re: /\bESR1\b/g },
  { name: "BRCA1", re: /\bBRCA1\b/g },
  { name: "BRCA2", re: /\bBRCA2\b/g },
  { name: "gBRCA", re: /\bgBRCA(?:1\/2|1|2)?\b|\bgermline BRCA(?:1\/2)?\b/gi },
  { name: "BRCA1/2", re: /(?<!germline )(?<!g)\bBRCA(?:1\/2)?\b(?![12])/g },
  { name: "AKT1", re: /\bAKT1\b/g },
  { name: "PTEN", re: /\bPTEN\b/g },
  { name: "PD-L1", re: /\bPD-?L1\b/gi },
];

const WILD_TYPE = /\b(?:wild[- ]?type|WT|not detected|negative|no (?:known |detectable |pathogenic |actionable |somatic |germline )?(?:mutation|variant|alteration)s?|absent|none detected|non-?mutated|unmutated|intact)\b/i;
const MUTATED = /\b(?:mutation|mutant|mutated|alteration|variant|pathogenic|positive|detected|amplification|amplified|loss|deletion)\b/i;
const VARIANT = /\b(?:p\.)?([A-Z]\d{2,4}(?:[A-Z*]|del|ins|fs)[A-Za-z0-9*]*)\b/;
const PENDING = /\b(?:pending|ordered|sent|awaiting|in process)\b/i;
const CPS = /\bCPS\s*(?:of|:|=|≥|>=|<|≤)?\s*(\d+)/i;

function extractGenes(text: string): BiomarkerResult[] {
  const out: BiomarkerResult[] = [];
  for (const rule of GENE_RULES) {
    const mentions = matchAll(text, rule.re);
    if (!mentions.length) continue;
    const m = mentions[mentions.length - 1];
    const windowEnd = Math.min(lineEnd(text, m.index), m.index + 120);
    let window = text.slice(m.index, windowEnd);
    const cut = window.search(/;|\.\s/);
    if (cut > 0) window = window.slice(0, cut);
    const before = text.slice(Math.max(lineStart(text, m.index), m.index - 60), m.index);

    let status: BiomarkerStatus = "unknown";
    let detail: string | undefined;
    if (rule.name === "PD-L1") {
      const cps = CPS.exec(window);
      const word = /\b(positive|negative)\b/i.exec(window);
      if (word) status = statusFromToken(word[1]);
      else if (cps) status = +cps[1] >= 10 ? "positive" : "negative";
      detail = cps ? `CPS ${cps[1]}` : word?.[1];
    } else if (PENDING.test(window)) {
      detail = "pending";
    } else if (isNegated(text, m.index) || WILD_TYPE.test(window)) {
      status = "wild-type";
    } else if (MUTATED.test(window)) {
      status = "mutated";
      const variant = VARIANT.exec(window.slice(rule.name.length));
      if (variant) detail = variant[1];
    }

    const scope = `${before} ${window}`;
    const method = rule.name === "PD-L1" ? "IHC" : /\bctDNA\b|\bplasma\b|\bliquid biopsy\b/i.test(scope) ? "ctDNA" : /\bgermline\b|\bgBRCA/i.test(scope) ? "germline" : /\bNGS\b|FoundationOne|Foundation One|Guardant|Tempus|Caris|sequencing|panel/i.test(scope) ? "NGS" : undefined;
    const specimenMatch = /\b(liver|bone|lung|lymph node|skin|primary|metastatic|breast)\s+(?:biopsy|tumou?r|tissue|specimen|lesion)\b|\bctDNA\b/i.exec(scope);
    const date = dateNear(text, m.index, m.index + window.length, 60)?.iso;

    let end = m.index + window.length;
    const classifier = new RegExp(`${WILD_TYPE.source}|${MUTATED.source}|${CPS.source}`, "i").exec(window);
    if (classifier) end = m.index + classifier.index + classifier[0].length;
    const variantHit = VARIANT.exec(window.slice(rule.name.length));
    if (variantHit) end = Math.max(end, m.index + rule.name.length + variantHit.index + variantHit[0].length);

    out.push({
      name: rule.name,
      status,
      detail,
      method,
      date,
      specimen: specimenMatch?.[0],
      evidence: [evidenceAt(text, m.index, end)],
      confidence: status === "unknown" ? "low" : "medium",
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Diagnosis
// ---------------------------------------------------------------------------

const HISTOLOGY: Array<{ re: RegExp; label: string }> = [
  { re: /\b(?:invasive|infiltrating) ductal carcinoma\b|\bIDC\b/, label: "Invasive ductal carcinoma (IDC)" },
  { re: /\b(?:invasive|infiltrating) lobular carcinoma\b|\bILC\b/, label: "Invasive lobular carcinoma (ILC)" },
  { re: /\bmixed ductal and lobular\b/i, label: "Mixed ductal and lobular carcinoma" },
  { re: /\binvasive (?:mammary )?carcinoma(?: of)? no special type\b|\bNST\b/, label: "Invasive carcinoma of no special type (NST)" },
  { re: /\binvasive mammary carcinoma\b/i, label: "Invasive mammary carcinoma" },
  { re: /\binflammatory breast (?:cancer|carcinoma)\b/i, label: "Inflammatory breast carcinoma" },
  { re: /\bmetaplastic (?:breast )?carcinoma\b/i, label: "Metaplastic carcinoma" },
  { re: /\bductal carcinoma in situ\b|\bDCIS\b/, label: "Ductal carcinoma in situ (DCIS)" },
];
const LATERALITY = /\b(left|right|bilateral)\b[- ](?:sided )?(?:breast|mastectomy|lumpectomy|axilla)\b|\b(L|R)\s+breast\b/i;
const GRADE = /\b(?:nottingham|histologic(?:al)?|tumou?r|nuclear)?\s*grade\s*(?:of\s*)?([1-3]|I{1,3})\b(?!\s*(?:neuropathy|toxicity|fatigue|nausea|rash|diarrh|AE|adverse|hand))/i;
const STAGE = /\b(?:clinical|pathologic(?:al)?|anatomic)?\s*stage\s*(0|IV|III|II|I|[1-4])\s*([ABC])?\b(?![\w-])/gi;
const TNM = /\b([cpy]{0,3}T(?:is|[0-4][a-d]?|X))\s*[,/]?\s*([cpy]{0,3}N[0-3X][a-c]?)(?:\s*[,/]?\s*([cpy]{0,3}M[01X]))?\b/g;
const METASTATIC = /\b(?:metastatic|metastases|metastasis|mets|stage IV|stage 4|M1|de novo|MBC)\b/gi;
const LOCALLY_ADVANCED = /\b(?:locally advanced|unresectable|inflammatory breast)\b/gi;
const RECURRENT = /\b(?:recurrence|recurrent|recurred|relapse[d]?)\b/gi;
const EARLY = /\b(?:stage (?:I{1,3}|[1-3])[ABC]?\b|early[- ]stage|adjuvant|neoadjuvant|lumpectomy|mastectomy|curative)\b/gi;
const SITE_WORD = /\b(liver|hepatic|lung|pulmonary|bone|osseous|skeletal|brain|intracranial|leptomeningeal|lymph nodes?|nodal|pleura|pleural|peritoneal|peritoneum|skin|chest wall|adrenal|ovar(?:y|ian))\b/gi;
const MET_WORD = /\b(?:mets?|metasta\w+|lesions?|involvement|deposits?)\b/gi;
const CNS_MENTION = /\b(?:brain|CNS|intracranial|leptomeningeal|cerebral|cerebellar)\b[^.\n;]{0,40}?\b(?:mets?|metasta\w+|lesions?|disease|involvement|deposits?)\b/gi;
const CNS_TREATED = /\b(?:treated|SRS|radiosurgery|gamma knife|GK|WBRT|resect\w*|stable|asymptomatic|s\/p)\b/i;
const CNS_NEGATIVE_IMAGING = /\b(?:MRI brain|brain MRI|MRI of the brain|head CT|CT head)\b[^.\n]{0,60}?\b(?:negative|unremarkable|no acute|no evidence|without evidence|no (?:new )?(?:lesions?|mets?|metastases))\b/gi;
const MEASURABLE = /\b(non-?\s?measurable|not\s+measurable|measurable disease|RECIST[- ]measurable|bone[- ]only disease|evaluable(?:,| but)? not measurable)\b/gi;

const SITE_CANON: Record<string, string> = {
  hepatic: "liver",
  pulmonary: "lung",
  osseous: "bone",
  skeletal: "bone",
  intracranial: "brain",
  nodal: "lymph node",
  "lymph nodes": "lymph node",
  pleura: "pleural",
  peritoneum: "peritoneal",
  ovary: "ovarian",
};

function romanStage(token: string): string {
  const arabic: Record<string, string> = { "1": "I", "2": "II", "3": "III", "4": "IV" };
  return (arabic[token] ?? token).toUpperCase();
}

function firstNonNegated(text: string, re: RegExp): RegExpExecArray | undefined {
  return matchAll(text, re).find((m) => !isNegated(text, m.index));
}

function extractSetting(text: string): Extracted<DiseaseSetting> {
  const metastatic = firstNonNegated(text, METASTATIC);
  if (metastatic) return ex("metastatic", "medium", [evidenceOf(text, metastatic)]);
  const locallyAdvanced = firstNonNegated(text, LOCALLY_ADVANCED);
  if (locallyAdvanced) return ex("locally-advanced", "medium", [evidenceOf(text, locallyAdvanced)]);
  const recurrent = firstNonNegated(text, RECURRENT);
  if (recurrent) return ex("recurrent", "low", [evidenceOf(text, recurrent)], "Recurrence mentioned without documented distant disease");
  const early = firstNonNegated(text, EARLY);
  if (early) return ex("early", "low", [evidenceOf(text, early)], "No metastatic disease mentioned; early-stage context found");
  return ex("unknown", "low", [], "Keyword screen found no statement of disease setting");
}

function extractMetastaticSites(text: string): Extracted<string[]> | undefined {
  const sites = new Map<string, Evidence>();
  for (const met of matchAll(text, MET_WORD)) {
    if (isNegated(text, met.index)) continue;
    const before = text.slice(Math.max(lineStart(text, met.index), met.index - 70), met.index);
    const beforeSites = matchAll(before, SITE_WORD);
    if (beforeSites.length) {
      const start = met.index - before.length + beforeSites[0].index;
      const evidence = evidenceAt(text, start, met.index + met[0].length);
      for (const s of beforeSites) {
        const canon = SITE_CANON[s[1].toLowerCase()] ?? s[1].toLowerCase();
        if (!sites.has(canon)) sites.set(canon, evidence);
      }
      continue;
    }
    const afterEnd = Math.min(lineEnd(text, met.index), met.index + met[0].length + 60);
    const after = text.slice(met.index + met[0].length, afterEnd);
    if (!/^\s*(?:to|in|involving)\b/i.test(after)) continue;
    const afterSites = matchAll(after, SITE_WORD);
    if (!afterSites.length) continue;
    const lastSite = afterSites[afterSites.length - 1];
    const evidence = evidenceAt(text, met.index, met.index + met[0].length + lastSite.index + lastSite[0].length);
    for (const s of afterSites) {
      const canon = SITE_CANON[s[1].toLowerCase()] ?? s[1].toLowerCase();
      if (!sites.has(canon)) sites.set(canon, evidence);
    }
  }
  if (!sites.size) return undefined;
  const evidence: Evidence[] = [];
  for (const e of sites.values()) if (!evidence.some((x) => x.start === e.start)) evidence.push(e);
  return ex([...sites.keys()], "medium", evidence.slice(0, 4));
}

function extractCnsStatus(text: string): Extracted<CnsStatus> | undefined {
  const mentions = matchAll(text, CNS_MENTION);
  const present = mentions.filter((m) => !isNegated(text, m.index));
  if (present.length) {
    const m = present[present.length - 1];
    const window = windowAround(text, m.index, m.index + m[0].length, 80, 100);
    const treated = CNS_TREATED.test(window);
    return ex(treated ? "treated-stable" : "present-untreated", "low", [evidenceOf(text, m)], treated ? "Treatment/stability keywords found near the CNS mention; confirm dates and steroid use" : "No treatment keywords found near the CNS mention");
  }
  if (mentions.length) {
    const m = mentions[mentions.length - 1];
    const start = Math.max(lineStart(text, m.index), m.index - 48);
    return ex("none", "medium", [evidenceAt(text, start, m.index + m[0].length)]);
  }
  const negativeImaging = first(text, CNS_NEGATIVE_IMAGING);
  if (negativeImaging) return ex("none", "medium", [evidenceOf(text, negativeImaging)]);
  return undefined;
}

function extractMeasurable(text: string): Extracted<boolean> | undefined {
  const m = last(text, MEASURABLE);
  if (!m) return undefined;
  const token = m[1].toLowerCase();
  const negative = /^non|^not|bone|evaluable/.test(token) || isNegated(text, m.index);
  return ex(!negative, "medium", [evidenceOf(text, m)]);
}

function deriveSubtype(text: string, biomarkers: BiomarkerResult[]): Extracted<string> | undefined {
  const find = (name: string) => biomarkers.find((b) => b.name === name);
  const er = find("ER");
  const pr = find("PR");
  const hr = find("HR");
  const her2 = find("HER2");
  const evidence = [er, pr, hr, her2].flatMap((b) => b?.evidence ?? []);
  const hrPositive = er?.status === "positive" || pr?.status === "positive" || hr?.status === "positive";
  const hrNegative = !hrPositive && ((er?.status === "negative" && pr?.status === "negative") || hr?.status === "negative");

  const tnbcMention = firstNonNegated(text, /\b(?:triple[- ]negative|TNBC)\b/gi);
  if (her2?.status === "positive") return ex("HER2+", "medium", her2.evidence);
  if (hrNegative && (her2?.status === "negative" || her2?.status === "low")) return ex("TNBC", "medium", evidence);
  if (tnbcMention) return ex("TNBC", "medium", [evidenceOf(text, tnbcMention)]);
  if (hrPositive && her2?.status === "low") return ex("HR+/HER2-low", "medium", evidence);
  if (hrPositive && her2?.status === "negative") return ex("HR+/HER2-", "medium", evidence);
  const textual = firstNonNegated(text, /\bHR\+\s*\/\s*HER2-(?:low|neg(?:ative)?)?|\bHR-positive\s*\/\s*HER2-negative\b|\bER\+\s*\/\s*HER2-(?![A-Za-z])|\bHER2-positive\b|\bHER2\+(?![A-Za-z0-9])/gi);
  if (textual) {
    const t = textual[0].replace(/\s+/g, "").toLowerCase();
    const value = t.includes("her2-low") ? "HR+/HER2-low" : t.includes("her2-positive") || t.endsWith("her2+") ? "HER2+" : "HR+/HER2-";
    return ex(value, "low", [evidenceOf(text, textual)], "Read from a subtype shorthand in the text");
  }
  if (hrPositive) return ex("HR+ (HER2 not documented)", "low", evidence, "HER2 status was not found by the keyword screen");
  return undefined;
}

function extractDiagnosis(text: string, biomarkers: BiomarkerResult[]): PatientProfile["diagnosis"] {
  let histologyMatch: RegExpExecArray | null = null;
  let histologyLabel: string | undefined;
  for (const rule of HISTOLOGY) {
    const m = first(text, rule.re);
    if (m && (!histologyMatch || m.index < histologyMatch.index)) {
      histologyMatch = m;
      histologyLabel = rule.label;
    }
  }
  const lateralityMatch = first(text, LATERALITY);
  const lateralityValue = lateralityMatch ? ((lateralityMatch[1] ?? lateralityMatch[2]).toLowerCase() === "l" ? "left" : (lateralityMatch[1] ?? lateralityMatch[2]).toLowerCase() === "r" ? "right" : (lateralityMatch[1].toLowerCase() as "left" | "right" | "bilateral")) : undefined;

  let primary: Extracted<string>;
  if (histologyMatch && histologyLabel) {
    const evidence = [evidenceOf(text, histologyMatch)];
    if (lateralityMatch) evidence.push(evidenceOf(text, lateralityMatch));
    primary = ex(`${histologyLabel.replace(/ \([A-Z]+\)$/, "")}${lateralityValue ? `, ${lateralityValue} breast` : ""}`, "medium", evidence);
  } else {
    const generic = first(text, /\bbreast (?:cancer|carcinoma|malignancy)\b/i);
    primary = generic
      ? ex(`Breast cancer${lateralityValue ? `, ${lateralityValue} breast` : ""}`, "low", [evidenceOf(text, generic)], "Histology not identified by the keyword screen")
      : ex("Primary diagnosis not identified by the keyword screen", "low", []);
  }

  const diagnosis: PatientProfile["diagnosis"] = {
    primary,
    setting: extractSetting(text),
  };
  if (histologyMatch && histologyLabel) diagnosis.histology = ex(histologyLabel, "medium", [evidenceOf(text, histologyMatch)]);
  if (lateralityMatch && lateralityValue) diagnosis.laterality = ex(lateralityValue, "medium", [evidenceOf(text, lateralityMatch)]);

  const grade = first(text, GRADE);
  if (grade) diagnosis.grade = ex(`Grade ${grade[1].toUpperCase() === "I" ? "1" : grade[1].toUpperCase() === "II" ? "2" : grade[1].toUpperCase() === "III" ? "3" : grade[1]}`, "medium", [evidenceOf(text, grade)]);

  const stages = matchAll(text, STAGE).filter((m) => !isNegated(text, m.index));
  const initial = stages.find((m) => romanStage(m[1]) !== "IV");
  if (initial) diagnosis.stageAtDiagnosis = ex(`${romanStage(initial[1])}${(initial[2] ?? "").toUpperCase()}`, "medium", [evidenceOf(text, initial)]);
  const stageIV = stages.find((m) => romanStage(m[1]) === "IV");
  if (stageIV) diagnosis.currentStage = ex("IV", "medium", [evidenceOf(text, stageIV)]);
  else if (diagnosis.setting.value === "metastatic") diagnosis.currentStage = ex("IV", "low", diagnosis.setting.evidence, "Inferred from metastatic disease");
  if (!initial && stageIV && /\bde novo\b/i.test(text)) diagnosis.stageAtDiagnosis = ex("IV", "low", [evidenceOf(text, stageIV)], "De novo metastatic disease");

  const tnm = first(text, TNM);
  if (tnm) diagnosis.tnm = ex(tnm[0].replace(/\s+/g, " ").trim(), "medium", [evidenceOf(text, tnm)]);

  const dx = matchAll(text, /\b(?:diagnos(?:ed|is)|dx)\b/gi);
  for (const m of dx) {
    const date = dateNear(text, m.index, m.index + m[0].length, 60);
    if (date) {
      diagnosis.diagnosisDate = ex(date.iso, "low", [evidenceAt(text, Math.min(m.index, date.start), Math.max(m.index + m[0].length, date.end))], "Date found next to a diagnosis mention");
      break;
    }
  }

  const subtype = deriveSubtype(text, biomarkers);
  if (subtype) diagnosis.subtype = subtype;
  const sites = extractMetastaticSites(text);
  if (sites) diagnosis.metastaticSites = sites;
  const measurable = extractMeasurable(text);
  if (measurable) diagnosis.measurableDisease = measurable;
  const cns = extractCnsStatus(text);
  if (cns) diagnosis.cnsStatus = cns;
  return diagnosis;
}

// ---------------------------------------------------------------------------
// Treatments
// ---------------------------------------------------------------------------

interface DrugRule {
  re: RegExp;
  name: string;
  agents: string[];
  category: TreatmentCategory;
}

const DRUG_RULES: DrugRule[] = [
  // Antibody-drug conjugates and combination products first, so plain "trastuzumab" does not swallow them.
  { re: /\btrastuzumab[- ]deruxtecan\b|\bT-?DXd\b|\bEnhertu\b|\bDS-8201a?\b/i, name: "Trastuzumab deruxtecan (T-DXd)", agents: ["trastuzumab deruxtecan"], category: "antibody-drug-conjugate" },
  { re: /\btrastuzumab[- ]emtansine\b|\bT-?DM1\b|\bKadcyla\b/i, name: "Trastuzumab emtansine (T-DM1)", agents: ["trastuzumab emtansine"], category: "antibody-drug-conjugate" },
  { re: /\bsacituzumab(?:[- ]govitecan)?\b|\bTrodelvy\b/i, name: "Sacituzumab govitecan", agents: ["sacituzumab govitecan"], category: "antibody-drug-conjugate" },
  { re: /\bdatopotamab(?:[- ]deruxtecan)?\b|\bDato-?DXd\b/i, name: "Datopotamab deruxtecan (Dato-DXd)", agents: ["datopotamab deruxtecan"], category: "antibody-drug-conjugate" },
  // Named regimens.
  { re: /\bKN-?522\b|\bKEYNOTE-?522\b/i, name: "KEYNOTE-522 regimen (pembrolizumab + carboplatin/paclitaxel → AC)", agents: ["pembrolizumab", "carboplatin", "paclitaxel", "doxorubicin", "cyclophosphamide"], category: "immunotherapy" },
  { re: /\b(?:dd)?AC\s*(?:[-–→>]+|followed by|then)\s*(?:T\b|paclitaxel|taxol|docetaxel|taxane)/i, name: "AC-T (doxorubicin/cyclophosphamide → taxane)", agents: ["doxorubicin", "cyclophosphamide", "paclitaxel"], category: "chemotherapy" },
  { re: /\bddAC\b/, name: "Dose-dense AC (doxorubicin/cyclophosphamide)", agents: ["doxorubicin", "cyclophosphamide"], category: "chemotherapy" },
  { re: /\bAC\b(?!\s*(?:joint|-T))/, name: "AC (doxorubicin/cyclophosphamide)", agents: ["doxorubicin", "cyclophosphamide"], category: "chemotherapy" },
  { re: /\bTCb?HP\b|\bTCbP\b/, name: "TCHP (docetaxel/carboplatin/trastuzumab/pertuzumab)", agents: ["docetaxel", "carboplatin", "trastuzumab", "pertuzumab"], category: "chemotherapy" },
  { re: /\bTHP\b/, name: "THP (docetaxel/trastuzumab/pertuzumab)", agents: ["docetaxel", "trastuzumab", "pertuzumab"], category: "chemotherapy" },
  { re: /\bTC\b(?![-/]?[A-Z])/, name: "TC (docetaxel/cyclophosphamide)", agents: ["docetaxel", "cyclophosphamide"], category: "chemotherapy" },
  { re: /\bCMF\b/, name: "CMF (cyclophosphamide/methotrexate/fluorouracil)", agents: ["cyclophosphamide", "methotrexate", "fluorouracil"], category: "chemotherapy" },
  // Endocrine.
  { re: /\bletrozole\b|\bFemara\b/i, name: "Letrozole", agents: ["letrozole"], category: "endocrine" },
  { re: /\banastrozole\b|\bArimidex\b/i, name: "Anastrozole", agents: ["anastrozole"], category: "endocrine" },
  { re: /\bexemestane\b|\bAromasin\b/i, name: "Exemestane", agents: ["exemestane"], category: "endocrine" },
  { re: /\btamoxifen\b|\bNolvadex\b|\btam\b/i, name: "Tamoxifen", agents: ["tamoxifen"], category: "endocrine" },
  { re: /\bfulvestrant\b|\bFaslodex\b/i, name: "Fulvestrant", agents: ["fulvestrant"], category: "endocrine" },
  { re: /\belacestrant\b|\bOrserdu\b/i, name: "Elacestrant", agents: ["elacestrant"], category: "endocrine" },
  { re: /\bgoserelin\b|\bZoladex\b|\bleuprolide\b|\bleuprorelin\b|\bLupron\b|\bOFS\b|\bovarian (?:function )?suppression\b/i, name: "Ovarian function suppression (GnRH agonist)", agents: ["goserelin"], category: "endocrine" },
  { re: /\baromatase inhibitor\b/i, name: "Aromatase inhibitor (unspecified)", agents: [], category: "endocrine" },
  // Targeted.
  { re: /\bpalbociclib\b|\bIbrance\b/i, name: "Palbociclib", agents: ["palbociclib"], category: "targeted" },
  { re: /\bribociclib\b|\bKisqali\b/i, name: "Ribociclib", agents: ["ribociclib"], category: "targeted" },
  { re: /\babemaciclib\b|\bVerzenio\b/i, name: "Abemaciclib", agents: ["abemaciclib"], category: "targeted" },
  { re: /\bcapivasertib\b|\bTruqap\b/i, name: "Capivasertib", agents: ["capivasertib"], category: "targeted" },
  { re: /\balpelisib\b|\bPiqray\b/i, name: "Alpelisib", agents: ["alpelisib"], category: "targeted" },
  { re: /\binavolisib\b|\bItovebi\b/i, name: "Inavolisib", agents: ["inavolisib"], category: "targeted" },
  { re: /\beverolimus\b|\bAfinitor\b/i, name: "Everolimus", agents: ["everolimus"], category: "targeted" },
  { re: /\btucatinib\b|\bTukysa\b/i, name: "Tucatinib", agents: ["tucatinib"], category: "targeted" },
  { re: /\blapatinib\b|\bTykerb\b/i, name: "Lapatinib", agents: ["lapatinib"], category: "targeted" },
  { re: /\bneratinib\b|\bNerlynx\b/i, name: "Neratinib", agents: ["neratinib"], category: "targeted" },
  { re: /\bolaparib\b|\bLynparza\b/i, name: "Olaparib", agents: ["olaparib"], category: "targeted" },
  { re: /\btalazoparib\b|\bTalzenna\b/i, name: "Talazoparib", agents: ["talazoparib"], category: "targeted" },
  { re: /\bPhesgo\b/i, name: "Pertuzumab/trastuzumab (Phesgo)", agents: ["pertuzumab", "trastuzumab"], category: "targeted" },
  { re: /\btrastuzumab\b(?![- ](?:deruxtecan|emtansine))|\bHerceptin\b/i, name: "Trastuzumab", agents: ["trastuzumab"], category: "targeted" },
  { re: /\bpertuzumab\b|\bPerjeta\b/i, name: "Pertuzumab", agents: ["pertuzumab"], category: "targeted" },
  { re: /\bCDK4\/6\s?(?:inhibitor|i)\b/i, name: "CDK4/6 inhibitor (unspecified)", agents: [], category: "targeted" },
  // Immunotherapy.
  { re: /\bpembrolizumab\b|\bKeytruda\b/i, name: "Pembrolizumab", agents: ["pembrolizumab"], category: "immunotherapy" },
  { re: /\batezolizumab\b|\bTecentriq\b/i, name: "Atezolizumab", agents: ["atezolizumab"], category: "immunotherapy" },
  { re: /\bnivolumab\b|\bOpdivo\b/i, name: "Nivolumab", agents: ["nivolumab"], category: "immunotherapy" },
  { re: /\bdurvalumab\b|\bImfinzi\b/i, name: "Durvalumab", agents: ["durvalumab"], category: "immunotherapy" },
  // Chemotherapy.
  { re: /\bnab-?paclitaxel\b|\bAbraxane\b/i, name: "Nab-paclitaxel", agents: ["nab-paclitaxel"], category: "chemotherapy" },
  { re: /\bpaclitaxel\b|\bTaxol\b/i, name: "Paclitaxel", agents: ["paclitaxel"], category: "chemotherapy" },
  { re: /\bdocetaxel\b|\bTaxotere\b/i, name: "Docetaxel", agents: ["docetaxel"], category: "chemotherapy" },
  { re: /\bcarboplatin\b|\bcarbo\b/i, name: "Carboplatin", agents: ["carboplatin"], category: "chemotherapy" },
  { re: /\bcisplatin\b/i, name: "Cisplatin", agents: ["cisplatin"], category: "chemotherapy" },
  { re: /\bliposomal doxorubicin\b|\bDoxil\b/i, name: "Liposomal doxorubicin", agents: ["liposomal doxorubicin"], category: "chemotherapy" },
  { re: /\bdoxorubicin\b|\bAdriamycin\b/i, name: "Doxorubicin", agents: ["doxorubicin"], category: "chemotherapy" },
  { re: /\bepirubicin\b/i, name: "Epirubicin", agents: ["epirubicin"], category: "chemotherapy" },
  { re: /\bcyclophosphamide\b|\bCytoxan\b/i, name: "Cyclophosphamide", agents: ["cyclophosphamide"], category: "chemotherapy" },
  { re: /\bcapecitabine\b|\bXeloda\b/i, name: "Capecitabine", agents: ["capecitabine"], category: "chemotherapy" },
  { re: /\beribulin\b|\bHalaven\b/i, name: "Eribulin", agents: ["eribulin"], category: "chemotherapy" },
  { re: /\bgemcitabine\b|\bGemzar\b/i, name: "Gemcitabine", agents: ["gemcitabine"], category: "chemotherapy" },
  { re: /\bvinorelbine\b|\bNavelbine\b/i, name: "Vinorelbine", agents: ["vinorelbine"], category: "chemotherapy" },
  // Radiation and surgery.
  { re: /\b(?:SRS|stereotactic radiosurgery|gamma knife|GK|stereotactic radiotherapy|SBRT)\b/i, name: "Stereotactic radiosurgery / radiotherapy", agents: [], category: "radiation" },
  { re: /\bWBRT\b|\bwhole[- ]brain (?:radiation|radiotherapy|RT)\b/i, name: "Whole-brain radiotherapy", agents: [], category: "radiation" },
  { re: /\bPMRT\b|\bpost-?mastectomy (?:radiation|radiotherapy)\b/i, name: "Post-mastectomy radiotherapy (PMRT)", agents: [], category: "radiation" },
  { re: /\bXRT\b|\bradiation(?: therapy)?\b|\bradiotherapy\b|\bRT to\b|\bwhole[- ]breast (?:irradiation|radiation)\b/i, name: "Radiation therapy", agents: [], category: "radiation" },
  { re: /\b(?:bilateral |left |right )?(?:total |simple |modified radical |skin-sparing |nipple-sparing )?mastectomy\b/i, name: "Mastectomy", agents: [], category: "surgery" },
  { re: /\blumpectomy\b|\bpartial mastectomy\b|\bbreast[- ]conserving surgery\b|\bBCS\b/i, name: "Lumpectomy", agents: [], category: "surgery" },
  { re: /\bSLNB\b|\bsentinel (?:lymph )?node biopsy\b/i, name: "Sentinel lymph node biopsy (SLNB)", agents: [], category: "surgery" },
  { re: /\bALND\b|\baxillary (?:lymph node )?dissection\b/i, name: "Axillary lymph node dissection (ALND)", agents: [], category: "surgery" },
  // Supportive bone agents.
  { re: /\bdenosumab\b|\bXgeva\b|\bProlia\b/i, name: "Denosumab", agents: ["denosumab"], category: "other" },
  { re: /\bzoledronic acid\b|\bzoledronate\b|\bZometa\b/i, name: "Zoledronic acid", agents: ["zoledronic acid"], category: "other" },
];

const CATEGORY_PRECEDENCE: TreatmentCategory[] = ["antibody-drug-conjugate", "immunotherapy", "targeted", "chemotherapy", "endocrine", "radiation", "surgery", "other"];

interface DrugHit {
  rule: DrugRule;
  start: number;
  end: number;
}

interface TreatmentGroup {
  hits: DrugHit[];
  start: number;
  end: number;
}

function findDrugHits(text: string): DrugHit[] {
  const hits: DrugHit[] = [];
  for (const rule of DRUG_RULES) {
    for (const m of matchAll(text, rule.re)) {
      const start = m.index;
      const end = m.index + m[0].length;
      if (hits.some((h) => start < h.end && end > h.start)) continue;
      hits.push({ rule, start, end });
    }
  }
  return hits.sort((a, b) => a.start - b.start);
}

/** Adjacent agents joined by "+", "/", "and", "with" form one regimen. */
function groupHits(text: string, hits: DrugHit[]): TreatmentGroup[] {
  const groups: TreatmentGroup[] = [];
  for (const hit of hits) {
    const current = groups[groups.length - 1];
    if (current) {
      const between = text.slice(current.end, hit.start);
      if (between.length <= 12 && /^\s*(?:\+|\/|,|and|with|plus|&)\s*$/i.test(between) && hit.rule.category !== "surgery" && hit.rule.category !== "radiation") {
        current.hits.push(hit);
        current.end = hit.end;
        continue;
      }
    }
    groups.push({ hits: [hit], start: hit.start, end: hit.end });
  }
  return groups;
}

const INTENT_NEOADJUVANT = /\b(?:neo-?adjuvant|NAC|pre-?operative|pre-?op)\b/i;
const INTENT_ADJUVANT = /\badjuvant\b/i;
const INTENT_PALLIATIVE = /\bpalliative\b/i;
const INTENT_METASTATIC = /\b(?:metastatic|first[- ]line|second[- ]line|third[- ]line|[1-4]L\b|\d(?:st|nd|rd|th)[- ]line|line of therapy|advanced)\b/i;
const STATUS_DISCONTINUED = /\b(?:discontinued|stopped|held|progress(?:ed|ion) (?:on|while on|during)|PD on|switched|due to (?:toxicity|intolerance)|intolerance|came off)\b/i;
const STATUS_ONGOING = /\b(?:currently|ongoing|continues?|continuing|on cycle|cycle \d+|C\d+D\d+|tolerating|remains on|since)\b/i;
const STATUS_PLANNED = /\b(?:plan(?:ned|ning)? (?:to|for)|to start|will start|recommend(?:ed)?|consider(?:ing)?|scheduled)\b/i;
const STATUS_COMPLETED = /\b(?:completed|s\/p|received|finished|prior|previous(?:ly)?|history of|treated with|underwent|status post)\b/i;
const LINE = /\b(?:(\d)(?:st|nd|rd|th)[- ]line|(\d)L\b|(first|second|third|fourth)[- ]line)\b/i;
const RESPONSE_LONG = /\b(pathologic(?:al)? complete response|complete response|partial response|stable disease|progressive disease|pCR|RCB-?(?:0|I{1,3}|[0-3]))\b/i;
const RESPONSE_SHORT = /\b(CR|PR|SD|PD)\b/;

function lineNumber(window: string): number | undefined {
  const m = LINE.exec(window);
  if (!m) return undefined;
  if (m[1]) return +m[1];
  if (m[2]) return +m[2];
  return { first: 1, second: 2, third: 3, fourth: 4 }[m[3].toLowerCase()];
}

function bestResponse(window: string): string | undefined {
  const long = RESPONSE_LONG.exec(window);
  if (long) {
    const t = long[1].toLowerCase();
    if (t.startsWith("pathologic")) return "pCR";
    if (t === "complete response") return "CR";
    if (t === "partial response") return "PR";
    if (t === "stable disease") return "SD";
    if (t === "progressive disease") return "PD";
    return long[1];
  }
  if (/\bresponse\b|\bRECIST\b|\bbest\b/i.test(window)) {
    const short = RESPONSE_SHORT.exec(window);
    if (short) return short[1];
  }
  return undefined;
}

function buildTreatment(text: string, group: TreatmentGroup): TreatmentEvent {
  const names = group.hits.map((h) => h.rule.name);
  const agents = [...new Set(group.hits.flatMap((h) => h.rule.agents))];
  const category = CATEGORY_PRECEDENCE.find((c) => group.hits.some((h) => h.rule.category === c)) ?? "other";
  const name = names.length === 1 ? names[0] : names.map((n) => n.replace(/ \(.*\)$/, "")).join(" + ");

  const window = windowAround(text, group.start, group.end, 140, 160);
  const after = text.slice(group.end, Math.min(lineEnd(text, group.end), group.end + 160));

  let intent: TreatmentIntent = "unknown";
  if (INTENT_NEOADJUVANT.test(window)) intent = "neoadjuvant";
  else if (INTENT_ADJUVANT.test(window)) intent = "adjuvant";
  else if (INTENT_PALLIATIVE.test(window)) intent = "palliative";
  else if (INTENT_METASTATIC.test(window)) intent = "metastatic";

  let status: TreatmentStatus = "unknown";
  let reasonStopped: string | undefined;
  if (STATUS_DISCONTINUED.test(window)) {
    status = "discontinued";
    reasonStopped = /\bprogress|\bPD\b/i.test(window) ? "progression" : /toxicity|intoleran|side effect|neuropathy|\bILD\b|cardiotox/i.test(window) ? "toxicity" : undefined;
  } else if (STATUS_ONGOING.test(window)) status = "ongoing";
  else if (STATUS_PLANNED.test(after)) status = "planned";
  else if (STATUS_COMPLETED.test(window)) status = "completed";

  const dates = findDates(after);
  const startDate = dates[0]?.iso ?? dateBefore(text, group.start);
  const endDate = dates[1]?.iso;
  const line = intent === "metastatic" || intent === "palliative" ? lineNumber(window) : undefined;
  const response = bestResponse(after);

  const event: TreatmentEvent = {
    name,
    category,
    intent,
    status,
    evidence: [evidenceAt(text, group.start, group.end)],
    confidence: "medium",
  };
  if (agents.length) event.agents = agents;
  if (line !== undefined) event.line = line;
  if (startDate) event.startDate = startDate;
  if (endDate && endDate >= (startDate ?? "")) event.endDate = endDate;
  if (response) event.bestResponse = response;
  if (reasonStopped) event.reasonStopped = reasonStopped;
  return event;
}

function extractTreatments(text: string): TreatmentEvent[] {
  const groups = groupHits(text, findDrugHits(text));
  const byName = new Map<string, TreatmentEvent>();
  const order: string[] = [];
  for (const group of groups) {
    const event = buildTreatment(text, group);
    const key = event.name.toLowerCase();
    const existing = byName.get(key);
    if (!existing) {
      byName.set(key, event);
      order.push(key);
      continue;
    }
    if (existing.evidence.length < 3) existing.evidence.push(...event.evidence);
    if (existing.intent === "unknown") existing.intent = event.intent;
    if (existing.status === "unknown") existing.status = event.status;
    if (existing.line === undefined && event.line !== undefined) existing.line = event.line;
    if (!existing.startDate && event.startDate) existing.startDate = event.startDate;
    if (!existing.endDate && event.endDate) existing.endDate = event.endDate;
    if (!existing.bestResponse && event.bestResponse) existing.bestResponse = event.bestResponse;
    if (!existing.reasonStopped && event.reasonStopped) existing.reasonStopped = event.reasonStopped;
  }
  let events = order.map((key) => byName.get(key)!);
  const hasSpecificCdk = events.some((e) => e.agents?.some((a) => /ciclib$/.test(a)));
  if (hasSpecificCdk) events = events.filter((e) => e.name !== "CDK4/6 inhibitor (unspecified)");
  if (events.length > 1 && events.every((e) => e.startDate)) {
    events = [...events].sort((a, b) => (a.startDate! < b.startDate! ? -1 : a.startDate! > b.startDate! ? 1 : 0));
  }
  return events;
}

// ---------------------------------------------------------------------------
// Performance status and labs
// ---------------------------------------------------------------------------

const ECOG = /\bECOG\b(?:\s*(?:PS|performance status))?\s*(?:of|is|was|:|=|-)?\s*([0-4])\b/gi;
const KARNOFSKY = /\b(?:KPS|Karnofsky)\b(?:\s*(?:performance status|score))?\s*(?:of|is|was|:|=)?\s*(\d{2,3})\s*%?/gi;

function extractPerformance(text: string): PatientProfile["performance"] {
  const out: PatientProfile["performance"] = {};
  const ecog = last(text, ECOG);
  if (ecog) out.ecog = ex(+ecog[1], "medium", [evidenceOf(text, ecog)]);
  const kps = last(text, KARNOFSKY);
  if (kps && +kps[1] >= 10 && +kps[1] <= 100) out.karnofsky = ex(+kps[1], "medium", [evidenceOf(text, kps)]);
  return out;
}

interface LabRule {
  name: string;
  re: RegExp;
  defaultUnit?: string;
  /** Convert a raw value (and unit text) to the canonical unit used by `abnormal`. */
  canonical: (value: number, unit: string) => number;
  abnormal: (value: number) => boolean;
}

const LAB_RULES: LabRule[] = [
  {
    name: "ANC",
    re: /\bANC\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:[.,]\d+)?)\s*(K\/[µu]L|x\s?10\^?[39]\/L|\/[µu]L|\/mm3|cells\/[µu]L|K)?/gi,
    defaultUnit: "K/µL",
    canonical: (v, u) => (/\/[µu]l|\/mm3|cells/i.test(u) || v > 100 ? v / 1000 : v),
    abnormal: (v) => v < 1.5,
  },
  {
    name: "Hemoglobin",
    re: /\b(?:Hgb|Hb|hemoglobin|haemoglobin)\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(g\/dL|g\/L|gm\/dL)?/gi,
    defaultUnit: "g/dL",
    canonical: (v, u) => (/g\/l/i.test(u) || v > 30 ? v / 10 : v),
    abnormal: (v) => v < 10 || v > 17,
  },
  {
    name: "Platelets",
    re: /\b(?:Plt|Plts|platelets?|platelet count)\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(K\/[µu]L|x\s?10\^?[39]\/L|\/[µu]L|K)?/gi,
    defaultUnit: "K/µL",
    canonical: (v, u) => (/\/[µu]l/i.test(u) || v > 2000 ? v / 1000 : v),
    abnormal: (v) => v < 100,
  },
  {
    name: "Creatinine",
    re: /\b(?:Cr|creatinine|SCr)\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(mg\/dL|[µu]mol\/L)?/gi,
    defaultUnit: "mg/dL",
    canonical: (v, u) => (/mol/i.test(u) || v > 30 ? v / 88.4 : v),
    abnormal: (v) => v > 1.3,
  },
  {
    name: "CrCl",
    re: /\b(?:CrCl|creatinine clearance|Cockcroft[- ]Gault)\b\s*(?:[:=]|of|is|was|~)?\s*(\d+(?:\.\d+)?)\s*(mL\/min(?:\/1\.73\s?m2)?)?/gi,
    defaultUnit: "mL/min",
    canonical: (v) => v,
    abnormal: (v) => v < 60,
  },
  {
    name: "eGFR",
    re: /\beGFR\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(mL\/min(?:\/1\.73\s?m2)?)?/gi,
    defaultUnit: "mL/min/1.73m2",
    canonical: (v) => v,
    abnormal: (v) => v < 60,
  },
  { name: "AST", re: /\bAST\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(U\/L|IU\/L)?/gi, defaultUnit: "U/L", canonical: (v) => v, abnormal: (v) => v > 40 },
  { name: "ALT", re: /\bALT\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(U\/L|IU\/L)?/gi, defaultUnit: "U/L", canonical: (v) => v, abnormal: (v) => v > 40 },
  {
    name: "Total bilirubin",
    re: /\b(?:T\.?\s?bili(?:rubin)?|total bilirubin|bilirubin,? total|bilirubin|bili)\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(mg\/dL|[µu]mol\/L)?/gi,
    defaultUnit: "mg/dL",
    canonical: (v, u) => (/mol/i.test(u) || v > 20 ? v / 17.1 : v),
    abnormal: (v) => v > 1.2,
  },
  {
    name: "LVEF",
    re: /\b(?:LVEF|EF|ejection fraction)\b\s*(?:[:=]|of|is|was|at|~)?\s*(\d{2}(?:\.\d)?)\s*(?:-\s*\d{2})?\s*(%)?/gi,
    defaultUnit: "%",
    canonical: (v) => v,
    abnormal: (v) => v < 50,
  },
  {
    name: "HbA1c",
    re: /\b(?:HbA1c|A1c|hemoglobin A1c|glycated hemoglobin)\b\s*(?:[:=]|of|is|was)?\s*(\d+(?:\.\d+)?)\s*(%)?/gi,
    defaultUnit: "%",
    canonical: (v) => v,
    abnormal: (v) => v >= 6.5,
  },
];

function extractLabs(text: string): LabResult[] {
  const out: LabResult[] = [];
  for (const rule of LAB_RULES) {
    const candidates = matchAll(text, rule.re).map((m) => ({ m, date: dateBefore(text, m.index) }));
    if (!candidates.length) continue;
    const dated = candidates.filter((c) => c.date);
    const pick = dated.length ? dated.reduce((a, b) => (b.date! > a.date! ? b : a)) : candidates[candidates.length - 1];
    const raw = pick.m[1].replace(",", ".");
    const value = Number(raw);
    const unit = pick.m[2] ?? rule.defaultUnit;
    const lab: LabResult = { name: rule.name, value: raw, evidence: [evidenceOf(text, pick.m)] };
    if (unit) lab.unit = unit;
    if (pick.date) lab.date = pick.date;
    lab.flag = Number.isFinite(value) ? (rule.abnormal(rule.canonical(value, pick.m[2] ?? "")) ? "abnormal" : "normal") : "unknown";
    out.push(lab);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Comorbidities, medications, allergies, key dates
// ---------------------------------------------------------------------------

interface LabelRule {
  re: RegExp;
  label: string;
}

const COMORBIDITY_RULES: LabelRule[] = [
  { re: /\b(?:type 1 diabetes(?: mellitus)?|T1DM|DM1|DM type 1)\b/i, label: "Type 1 diabetes mellitus" },
  { re: /\b(?:type 2 diabetes(?: mellitus)?|T2DM|DM2|DM II|DM type 2|diabetes mellitus|diabetes|diabetic)\b/i, label: "Type 2 diabetes mellitus" },
  { re: /\b(?:hypertension|HTN)\b/i, label: "Hypertension" },
  { re: /\b(?:hyperlipidemia|hyperlipidaemia|dyslipidemia|HLD)\b/i, label: "Hyperlipidemia" },
  { re: /\b(?:coronary artery disease|CAD|myocardial infarction|NSTEMI|STEMI|MI)\b/, label: "Coronary artery disease / myocardial infarction" },
  { re: /\b(?:congestive heart failure|CHF|heart failure|cardiomyopathy|HFrEF|HFpEF)\b/i, label: "Heart failure / cardiomyopathy" },
  { re: /\b(?:atrial fibrillation|a-?fib)\b/i, label: "Atrial fibrillation" },
  { re: /\bQTc?\s*prolongation\b|\blong QT\b/i, label: "QT prolongation" },
  { re: /\b(?:COPD|chronic obstructive pulmonary disease|emphysema)\b/i, label: "COPD" },
  { re: /\basthma\b/i, label: "Asthma" },
  { re: /\b(?:interstitial lung disease|ILD|pneumonitis)\b/, label: "Interstitial lung disease / pneumonitis" },
  { re: /\b(?:chronic kidney disease|CKD|renal insufficiency|renal impairment)\b/i, label: "Chronic kidney disease" },
  { re: /\b(?:hepatitis B|HBV)\b/i, label: "Hepatitis B" },
  { re: /\b(?:hepatitis C|HCV)\b/i, label: "Hepatitis C" },
  { re: /\bHIV\b/, label: "HIV" },
  { re: /\b(?:deep vein thrombosis|DVT|pulmonary embol(?:ism|us)|venous thromboembolism|VTE)\b/i, label: "Venous thromboembolism" },
  { re: /\b(?:stroke|CVA|cerebrovascular accident|TIA|transient ischemic attack)\b/, label: "Stroke / TIA" },
  { re: /\bhypothyroid(?:ism)?\b/i, label: "Hypothyroidism" },
  { re: /\b(?:osteoporosis|osteopenia)\b/i, label: "Osteoporosis / osteopenia" },
  { re: /\b(?:depression|anxiety|MDD)\b/i, label: "Depression / anxiety" },
  { re: /\b(?:peripheral neuropathy|neuropathy|PN)\b/, label: "Peripheral neuropathy" },
  { re: /\b(?:autoimmune|rheumatoid arthritis|lupus|SLE|Crohn'?s?|ulcerative colitis)\b/i, label: "Autoimmune disease" },
  { re: /\b(?:second (?:primary )?malignancy|prior malignancy|history of (?!breast)(?:\w+ )?(?:cancer|carcinoma|melanoma|lymphoma))\b/i, label: "Prior or second malignancy" },
];

const MEDICATION_RULES: LabelRule[] = [
  { re: /\b(?:warfarin|Coumadin|apixaban|Eliquis|rivaroxaban|Xarelto|enoxaparin|Lovenox|dabigatran|Pradaxa|edoxaban|heparin)\b/i, label: "Anticoagulant" },
  { re: /\b(?:clopidogrel|Plavix|aspirin|ASA)\b/, label: "Antiplatelet" },
  { re: /\b(?:prednisone|prednisolone|dexamethasone|methylprednisolone|hydrocortisone)\b/i, label: "Systemic corticosteroid" },
  { re: /\b(?:ketoconazole|itraconazole|voriconazole|posaconazole|clarithromycin|ritonavir|cobicistat|diltiazem|verapamil)\b/i, label: "CYP3A4 inhibitor" },
  { re: /\b(?:rifampin|rifampicin|carbamazepine|phenytoin|phenobarbital|St\.? John'?s wort)\b/i, label: "CYP3A4 inducer" },
  { re: /\b(?:ondansetron|amiodarone|sotalol|citalopram|escitalopram|haloperidol|methadone|domperidone)\b/i, label: "QT-prolonging drug" },
  { re: /\b(?:metformin|insulin|glipizide|glimepiride|semaglutide|Ozempic|empagliflozin|Jardiance|sitagliptin|pioglitazone)\b/i, label: "Antidiabetic" },
  { re: /\b(?:omeprazole|pantoprazole|esomeprazole|lansoprazole)\b/i, label: "Proton-pump inhibitor" },
  { re: /\blevothyroxine\b/i, label: "Levothyroxine" },
];

const FAMILY_HISTORY = /\b(?:family history|FH|FHx|mother|father|sister|brother|daughter|son|aunt|uncle|grandmother|grandfather)\b[^.\n]{0,60}$/i;

function extractLabelled(text: string, rules: LabelRule[], withValue: boolean): Extracted<string>[] {
  const out: Extracted<string>[] = [];
  const seen = new Set<string>();
  for (const rule of rules) {
    for (const m of matchAll(text, rule.re)) {
      if (isNegated(text, m.index)) continue;
      const before = text.slice(Math.max(lineStart(text, m.index), m.index - 60), m.index);
      if (FAMILY_HISTORY.test(before)) continue;
      const value = withValue ? `${rule.label}: ${m[0]}` : rule.label;
      if (seen.has(rule.label)) continue;
      seen.add(rule.label);
      out.push(ex(value, "medium", [evidenceOf(text, m)]));
      break;
    }
  }
  return out;
}

function extractComorbidities(text: string): Extracted<string>[] {
  const all = extractLabelled(text, COMORBIDITY_RULES, false);
  return all.some((c) => c.value === "Type 1 diabetes mellitus") ? all.filter((c) => c.value !== "Type 2 diabetes mellitus") : all;
}

function extractMedications(text: string): Extracted<string>[] {
  return extractLabelled(text, MEDICATION_RULES, true);
}

const ALLERGY = /\b(?:NKDA|no known (?:drug )?allergies)\b|\b(?:allerg(?:y|ies|ic to))\b\s*[:\-–]?\s*([^\n.;]{1,80})/gi;

function extractAllergies(text: string): Extracted<string>[] {
  const out: Extracted<string>[] = [];
  for (const m of matchAll(text, ALLERGY)) {
    if (/^(?:NKDA|no known)/i.test(m[0])) {
      out.push(ex("No known drug allergies", "medium", [evidenceOf(text, m)]));
      continue;
    }
    const value = (m[1] ?? "").trim().replace(/^(?:to|include|includes)\s+/i, "");
    if (!value || /^(?:none|no|denies|nkda)\b/i.test(value)) {
      out.push(ex("No known drug allergies", "low", [evidenceOf(text, m)]));
      continue;
    }
    out.push(ex(value, "medium", [evidenceOf(text, m)]));
  }
  const seen = new Set<string>();
  return out.filter((a) => (seen.has(a.value.toLowerCase()) ? false : (seen.add(a.value.toLowerCase()), true)));
}

interface KeyDateRule {
  label: string;
  re: RegExp;
  pick: "earliest" | "latest";
}

const KEY_DATE_RULES: KeyDateRule[] = [
  { label: "Initial diagnosis", re: /\b(?:diagnos(?:ed|is)|dx)\b/gi, pick: "earliest" },
  { label: "Surgery", re: /\b(?:mastectomy|lumpectomy|surgery|resection|SLNB|ALND)\b/gi, pick: "earliest" },
  { label: "Metastatic recurrence", re: /\b(?:metastatic recurrence|recurrence|recurred|relapse|metastatic disease (?:diagnosed|found|identified)|de novo)\b/gi, pick: "earliest" },
  { label: "Last imaging", re: /\b(?:CT|PET(?:\/CT)?|MRI|bone scan|imaging|scan)\b/g, pick: "latest" },
];

function extractKeyDates(text: string): KeyDate[] {
  const out: KeyDate[] = [];
  for (const rule of KEY_DATE_RULES) {
    let best: { date: FoundDate; start: number; end: number } | undefined;
    for (const m of matchAll(text, rule.re)) {
      if (isNegated(text, m.index)) continue;
      const date = dateNear(text, m.index, m.index + m[0].length, 70);
      if (!date) continue;
      const better = !best || (rule.pick === "earliest" ? date.iso < best.date.iso : date.iso > best.date.iso);
      if (better) best = { date, start: Math.min(m.index, date.start), end: Math.max(m.index + m[0].length, date.end) };
    }
    if (best) out.push({ label: rule.label, date: best.date.iso, evidence: [evidenceAt(text, best.start, best.end)] });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Open questions and summary
// ---------------------------------------------------------------------------

function monthsBetween(iso: string, now: Date): number {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return 0;
  return (now.getUTCFullYear() - y) * 12 + (now.getUTCMonth() + 1 - m);
}

function buildOpenQuestions(profile: Omit<PatientProfile, "openQuestions" | "summary">, text: string, now: Date): string[] {
  const questions: string[] = [];
  const lab = (name: string) => profile.labs.find((l) => l.name === name);
  const biomarker = (name: string) => profile.biomarkers.find((b) => b.name === name);

  const lvef = lab("LVEF");
  if (!lvef) questions.push("LVEF not documented (an echocardiogram within 12 months is commonly required)");
  else if (lvef.date && monthsBetween(lvef.date, now) > 12) questions.push(`LVEF last documented ${lvef.date}, older than 12 months`);
  if (!lab("HbA1c")) questions.push("HbA1c not documented (required by PI3K/AKT-pathway trials)");
  if (!biomarker("ESR1")) questions.push("ESR1 / ctDNA mutation status not documented");
  if (!biomarker("PIK3CA") && profile.diagnosis.subtype?.value.startsWith("HR+")) questions.push("PIK3CA / AKT1 / PTEN tumour testing not documented");
  if (!profile.diagnosis.cnsStatus) questions.push("Brain imaging / CNS status not documented");
  if (profile.diagnosis.measurableDisease === undefined) questions.push("RECIST 1.1 measurable disease not documented");
  if (!/\b(?:hepatitis|HBV|HCV|HIV)\b/i.test(text)) questions.push("Hepatitis B/C and HIV serology not documented");
  if (!profile.performance.ecog) questions.push("ECOG performance status not documented");
  if (!lab("ANC") || !lab("Hemoglobin") || !lab("Platelets")) questions.push("Recent complete blood count not documented");
  if (!lab("Creatinine") && !lab("CrCl") && !lab("eGFR")) questions.push("Renal function (creatinine / CrCl) not documented");
  if (!lab("AST") || !lab("ALT") || !lab("Total bilirubin")) questions.push("Liver function tests not documented");
  const sex = profile.demographics.sex?.value;
  const menopause = profile.demographics.menopausalStatus?.value;
  const age = profile.demographics.age?.value;
  if (sex !== "male" && menopause !== "postmenopausal" && (age === undefined || age < 55)) {
    questions.push("Pregnancy status / contraception not documented");
  }
  return questions;
}

function buildSummary(profile: Omit<PatientProfile, "summary">): string {
  const d = profile.demographics;
  const parts: string[] = [];
  const who = [
    d.age ? `${d.age.value}-year-old` : undefined,
    d.menopausalStatus ? d.menopausalStatus.value : undefined,
    d.sex ? (d.sex.value === "female" ? "woman" : d.sex.value === "male" ? "man" : "patient") : "patient",
  ]
    .filter(Boolean)
    .join(" ");
  const setting = profile.diagnosis.setting.value;
  const settingText = setting === "unknown" ? "" : `, ${setting.replace("-", " ")} setting`;
  const sites = profile.diagnosis.metastaticSites?.value.length ? ` (${profile.diagnosis.metastaticSites.value.join(", ")})` : "";
  parts.push(`${who.charAt(0).toUpperCase()}${who.slice(1)} with ${profile.diagnosis.subtype?.value ?? "breast cancer"}${settingText}${sites}.`);
  if (profile.treatments.length) {
    parts.push(`Treatments identified: ${profile.treatments.map((t) => t.name).slice(0, 6).join("; ")}${profile.treatments.length > 6 ? "; …" : ""}.`);
  } else {
    parts.push("No treatments were identified by keyword.");
  }
  if (profile.performance.ecog) parts.push(`ECOG ${profile.performance.ecog.value}.`);
  parts.push("Generated by the offline keyword screen (no API key configured) — verify every value against the record.");
  return parts.join(" ");
}

// ---------------------------------------------------------------------------
// heuristicExtract
// ---------------------------------------------------------------------------

/** Regex keyword screen of a record. Every value carries verbatim evidence; nothing is more than medium confidence. */
export function heuristicExtract(text: string, now: Date = new Date()): PatientProfile {
  const biomarkers = [...extractReceptors(text), ...extractGenes(text)];
  const base: Omit<PatientProfile, "openQuestions" | "summary"> = {
    id: crypto.randomUUID(),
    demographics: extractDemographics(text),
    diagnosis: extractDiagnosis(text, biomarkers),
    biomarkers,
    treatments: extractTreatments(text),
    performance: extractPerformance(text),
    labs: extractLabs(text),
    comorbidities: extractComorbidities(text),
    allergies: extractAllergies(text),
    medications: extractMedications(text),
    keyDates: extractKeyDates(text),
    extractedAt: now.toISOString(),
    source: "heuristic",
  };
  const openQuestions = buildOpenQuestions(base, text, now);
  const summary = buildSummary({ ...base, openQuestions });
  return alignEvidence({ ...base, openQuestions, summary }, text);
}

// ---------------------------------------------------------------------------
// heuristicMatch
// ---------------------------------------------------------------------------

interface Facts {
  age?: number;
  sex?: Sex;
  menopause?: MenopausalStatus;
  er?: BiomarkerResult;
  pr?: BiomarkerResult;
  hr?: BiomarkerResult;
  her2?: BiomarkerResult;
  subtype?: string;
  setting: DiseaseSetting;
  ecog?: number;
  cns?: CnsStatus;
  measurable?: boolean;
  profile: PatientProfile;
}

interface RuleOutcome {
  /** Whether the patient satisfies the condition the criterion describes; undefined = cannot tell. */
  cond?: boolean;
  /** Direct status override (e.g. not-applicable). */
  status?: VerdictStatus;
  rationale: string;
  evidence: Evidence[];
  confidence: Confidence;
  actionNeeded?: string;
}

const SCREEN = "Keyword screen:";

function facts(profile: PatientProfile): Facts {
  const find = (name: string) => profile.biomarkers.find((b) => b.name.toUpperCase() === name);
  return {
    age: profile.demographics.age?.value,
    sex: profile.demographics.sex?.value,
    menopause: profile.demographics.menopausalStatus?.value,
    er: find("ER"),
    pr: find("PR"),
    hr: find("HR"),
    her2: find("HER2"),
    subtype: profile.diagnosis.subtype?.value,
    setting: profile.diagnosis.setting.value,
    ecog: profile.performance.ecog?.value,
    cns: profile.diagnosis.cnsStatus?.value,
    measurable: profile.diagnosis.measurableDisease?.value,
    profile,
  };
}

function parseAgeYears(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const m = /^(\d+)\s*(year|month|week|day)s?/i.exec(value);
  if (!m) return undefined;
  const n = +m[1];
  const unit = m[2].toLowerCase();
  return unit === "year" ? n : unit === "month" ? n / 12 : unit === "week" ? n / 52 : n / 365;
}

function hrPositivity(f: Facts): { value: boolean | undefined; evidence: Evidence[] } {
  const evidence = [f.er, f.pr, f.hr].flatMap((b) => b?.evidence ?? []);
  if (f.er?.status === "positive" || f.pr?.status === "positive" || f.hr?.status === "positive") return { value: true, evidence };
  if ((f.er?.status === "negative" && f.pr?.status === "negative") || f.hr?.status === "negative") return { value: false, evidence };
  return { value: undefined, evidence };
}

const MENTIONS_FEMALE = /\b(?:female|females|women|woman)\b/i;
const MENTIONS_MALE = /\b(?:male|males|men|man)\b/i;

function ruleReproductive(c: Criterion, f: Facts): RuleOutcome | undefined {
  const t = c.text;
  const reproductive = c.category === "reproductive" || /\b(?:pregnan|breast[- ]?feed|lactat|contracept|childbearing|WOCBP|pregnancy test)\b/i.test(t);
  if (!reproductive) return undefined;
  const femaleOnly = MENTIONS_FEMALE.test(t) && !MENTIONS_MALE.test(t);
  const maleOnly = MENTIONS_MALE.test(t) && !MENTIONS_FEMALE.test(t) && !/\bpregnan|breast[- ]?feed|lactat/i.test(t);
  if (f.sex === "male" && (femaleOnly || /\bpregnan|breast[- ]?feed|lactat|WOCBP\b/i.test(t))) {
    return { status: "not-applicable", rationale: `${SCREEN} the criterion concerns pregnancy, breastfeeding or female contraception and the patient is male.`, evidence: f.profile.demographics.sex?.evidence ?? [], confidence: "medium" };
  }
  if (f.sex === "female" && maleOnly) {
    return { status: "not-applicable", rationale: `${SCREEN} the criterion is a male-only rule and the patient is female.`, evidence: f.profile.demographics.sex?.evidence ?? [], confidence: "medium" };
  }
  if (f.menopause === "postmenopausal" && /\bpregnan|childbearing|WOCBP|contracept/i.test(t)) {
    return { status: "not-applicable", rationale: `${SCREEN} the patient is documented as postmenopausal, so pregnancy and contraception rules cannot apply.`, evidence: f.profile.demographics.menopausalStatus?.evidence ?? [], confidence: "medium" };
  }
  if (c.type === "exclusion" && /\bpregnan|breast[- ]?feed|lactat/i.test(t)) {
    return { cond: undefined, rationale: `${SCREEN} pregnancy or breastfeeding status is not documented in the record.`, evidence: [], confidence: "low", actionNeeded: "Pregnancy test at screening (women of childbearing potential)" };
  }
  return { status: "pass", rationale: `${SCREEN} contraception and pregnancy-testing requirements are confirmed at screening.`, evidence: [], confidence: "low", actionNeeded: "Confirm at screening" };
}

function ruleConsent(c: Criterion): RuleOutcome | undefined {
  if (c.category !== "consent" && !/\binformed consent\b|\bcomply with\b|\bswallow\b|\bable to (?:understand|attend|complete)\b|\bwilling(?:ness)? (?:and able )?to\b/i.test(c.text)) return undefined;
  return { status: "pass", rationale: `${SCREEN} consent, adherence and logistics criteria are confirmed at screening.`, evidence: [], confidence: "low", actionNeeded: "Confirm at screening" };
}

function ruleAgeSex(c: Criterion, f: Facts, trial: Trial): RuleOutcome | undefined {
  const t = c.text;
  const demographic = c.category === "demographics" || (t.length <= 90 && /\b(?:age|aged|years of age|years old|adult|female|male|women|men)\b/i.test(t));
  if (!demographic) return undefined;
  const evidence: Evidence[] = [];
  let cond: boolean | undefined;
  const reasons: string[] = [];

  const ageMatch = /(?:≥|>=|at least|older than|over|minimum age(?: of)?|aged?)\s*(\d{2})\b|\b(\d{2})\s*(?:years|yrs)?\s*(?:of age|or older|and older|and above|\+)/i.exec(t);
  const minAge = ageMatch ? +(ageMatch[1] ?? ageMatch[2]) : /\badult/i.test(t) ? (parseAgeYears(trial.minimumAge) ?? 18) : undefined;
  const maxAgeMatch = /(?:≤|<=|up to|younger than|no older than|maximum age(?: of)?)\s*(\d{2,3})\b/i.exec(t);
  const maxAge = maxAgeMatch ? +maxAgeMatch[1] : parseAgeYears(trial.maximumAge);
  if (minAge !== undefined || maxAgeMatch) {
    if (f.age === undefined) {
      return { cond: undefined, rationale: `${SCREEN} the criterion sets an age limit but the patient's age is not documented.`, evidence: [], confidence: "low", actionNeeded: "Document the patient's age" };
    }
    evidence.push(...(f.profile.demographics.age?.evidence ?? []));
    const okMin = minAge === undefined || f.age >= minAge;
    const okMax = maxAge === undefined || f.age <= maxAge;
    cond = okMin && okMax;
    reasons.push(`age ${f.age} vs limit ${minAge !== undefined ? `≥ ${minAge}` : ""}${maxAge !== undefined ? ` ≤ ${maxAge}` : ""}`.trim());
  }

  const femaleOnly = MENTIONS_FEMALE.test(t) && !MENTIONS_MALE.test(t);
  const maleOnly = MENTIONS_MALE.test(t) && !MENTIONS_FEMALE.test(t);
  if (femaleOnly || maleOnly || trial.sex !== "ALL") {
    const required: Sex = femaleOnly || trial.sex === "FEMALE" ? "female" : maleOnly || trial.sex === "MALE" ? "male" : "unknown";
    if (!f.sex || f.sex === "unknown") {
      return { cond: undefined, rationale: `${SCREEN} the criterion or trial is restricted by sex but the patient's sex is not documented.`, evidence: [], confidence: "low", actionNeeded: "Document the patient's sex" };
    }
    evidence.push(...(f.profile.demographics.sex?.evidence ?? []));
    const matches = required === "unknown" || f.sex === required;
    if (!matches && (maleOnly || femaleOnly) && c.type === "inclusion" && cond !== false && !/\bmust\b|\bonly\b/i.test(t)) {
      return { status: "not-applicable", rationale: `${SCREEN} this is a ${required}-only rule and the patient is ${f.sex}.`, evidence, confidence: "medium" };
    }
    cond = cond === undefined ? matches : cond && matches;
    reasons.push(`sex ${f.sex} vs ${required}`);
  }

  if (cond === undefined) return undefined;
  return { cond, rationale: `${SCREEN} ${reasons.join("; ")}.`, evidence, confidence: "medium" };
}

function ruleHer2(c: Criterion, f: Facts): RuleOutcome | undefined {
  const t = c.text;
  if (!/\bHER-?2\b/i.test(t)) return undefined;
  const her2 = f.her2;
  const wantsPositive = /HER-?2[- ]?(?:positive|\+|overexpress|amplif)/i.test(t) && !/HER-?2[- ]?(?:negative|-\b|low|non-?amplified)/i.test(t);
  const wantsLow = /HER-?2[- ]?(?:low|ultra-?low)/i.test(t);
  const wantsNegative = /HER-?2[- ]?(?:negative|non-?amplified|-\s|-\)|-$)|HER-?2-\b|not HER-?2[- ]positive/i.test(t) || /\bHR\+\s*\/\s*HER2-/i.test(t);
  if (!wantsPositive && !wantsLow && !wantsNegative) return undefined;
  if (!her2 || her2.status === "unknown") {
    return { cond: undefined, rationale: `${SCREEN} the criterion depends on HER2 status, which was not found in the record.`, evidence: [], confidence: "low", actionNeeded: "Obtain HER2 IHC/ISH result" };
  }
  const describe = `HER2 ${her2.status}${her2.detail ? ` (${her2.detail})` : ""}`;
  if (wantsPositive) {
    return { cond: her2.status === "positive" ? true : her2.status === "equivocal" ? undefined : false, rationale: `${SCREEN} profile shows ${describe}; the criterion asks for HER2-positive disease.`, evidence: her2.evidence, confidence: "medium", actionNeeded: her2.status === "equivocal" ? "Reflex ISH testing to resolve HER2 IHC 2+" : undefined };
  }
  if (wantsLow && !wantsNegative) {
    const cond = her2.status === "low" ? true : her2.status === "positive" ? false : her2.status === "negative" ? (her2.detail?.includes("IHC 0") ? false : undefined) : undefined;
    return { cond, rationale: `${SCREEN} profile shows ${describe}; the criterion asks for HER2-low disease (IHC 1+ or 2+/ISH-negative).`, evidence: her2.evidence, confidence: "medium", actionNeeded: cond === undefined ? "Confirm HER2 IHC score (0 vs 1+/2+) and ISH" : undefined };
  }
  const demandsIhc0 = /\bIHC\s*0\b/i.test(t) && !/1\+/.test(t);
  const cond = her2.status === "positive" ? false : her2.status === "negative" ? true : her2.status === "low" ? !demandsIhc0 : undefined;
  return { cond, rationale: `${SCREEN} profile shows ${describe}; the criterion asks for HER2-negative disease${her2.status === "low" ? (demandsIhc0 ? " with IHC 0, which HER2-low does not satisfy" : "; HER2-low counts as HER2-negative") : ""}.`, evidence: her2.evidence, confidence: "medium", actionNeeded: cond === undefined ? "Reflex ISH testing to resolve HER2 IHC 2+" : undefined };
}

function ruleTnbc(c: Criterion, f: Facts): RuleOutcome | undefined {
  if (!/\btriple[- ]negative\b|\bTNBC\b/i.test(c.text)) return undefined;
  const hr = hrPositivity(f);
  const isTnbc = f.subtype === "TNBC" ? true : hr.value === true || f.her2?.status === "positive" ? false : hr.value === false && (f.her2?.status === "negative" || f.her2?.status === "low") ? true : undefined;
  if (isTnbc === undefined) {
    return { cond: undefined, rationale: `${SCREEN} receptor status is incomplete, so triple-negative status cannot be confirmed.`, evidence: [...hr.evidence, ...(f.her2?.evidence ?? [])], confidence: "low", actionNeeded: "Confirm ER, PR and HER2 results" };
  }
  return { cond: isTnbc, rationale: `${SCREEN} profile subtype is ${f.subtype ?? "derived from receptors"}; the criterion concerns triple-negative disease.`, evidence: [...hr.evidence, ...(f.her2?.evidence ?? [])], confidence: "medium" };
}

function ruleHormoneReceptor(c: Criterion, f: Facts): RuleOutcome | undefined {
  const t = c.text;
  const wantsPositive = /\b(?:ER|HR|hormone[- ]receptor|o?estrogen[- ]receptor|ER\s*and\/or\s*PR)[- ]?(?:positive|\+)/i.test(t) || /\bHR\+/.test(t);
  const wantsNegative = /\b(?:ER|HR|hormone[- ]receptor|o?estrogen[- ]receptor)[- ]?(?:negative|-(?![A-Za-z0-9]))/i.test(t) || /\bHR-(?![A-Za-z0-9])/.test(t);
  if (!wantsPositive && !wantsNegative) return undefined;
  const hr = hrPositivity(f);
  if (hr.value === undefined) {
    return { cond: undefined, rationale: `${SCREEN} the criterion depends on hormone-receptor status, which was not found in the record.`, evidence: [], confidence: "low", actionNeeded: "Obtain ER/PR IHC results" };
  }
  const cond = wantsPositive && !wantsNegative ? hr.value : wantsNegative && !wantsPositive ? !hr.value : undefined;
  return { cond, rationale: `${SCREEN} profile hormone-receptor status is ${hr.value ? "positive" : "negative"}; the criterion asks for ${wantsPositive && !wantsNegative ? "HR-positive" : wantsNegative && !wantsPositive ? "HR-negative" : "a mixed receptor definition"} disease.`, evidence: hr.evidence, confidence: cond === undefined ? "low" : "medium", actionNeeded: cond === undefined ? "Review against the record" : undefined };
}

function ruleSetting(c: Criterion, f: Facts): RuleOutcome | undefined {
  const t = c.text;
  const wantsAdvanced = /\b(?:metastatic|advanced|locally advanced|unresectable|stage IV|not amenable to (?:curative|resection|surgery))\b/i.test(t);
  const wantsEarly = /\b(?:early[- ]stage|early breast cancer|operable|resectable|stage I{1,3}\b|neoadjuvant|adjuvant setting|non-?metastatic)\b/i.test(t) && !wantsAdvanced;
  if (!wantsAdvanced && !wantsEarly) return undefined;
  const settingEvidence = f.profile.diagnosis.setting.evidence;
  if (f.setting === "unknown") {
    return { cond: undefined, rationale: `${SCREEN} the disease setting could not be determined from the record.`, evidence: [], confidence: "low", actionNeeded: "Document current disease setting (early vs metastatic)" };
  }
  const advanced = f.setting === "metastatic" || f.setting === "locally-advanced";
  if (wantsAdvanced) {
    const cond = advanced ? true : f.setting === "early" ? false : undefined;
    return { cond, rationale: `${SCREEN} profile setting is ${f.setting}; the criterion concerns advanced or metastatic disease.`, evidence: settingEvidence, confidence: cond === undefined ? "low" : "medium", actionNeeded: cond === undefined ? "Confirm whether recurrence is locoregional or distant" : undefined };
  }
  const cond = f.setting === "early" ? true : f.setting === "metastatic" ? false : undefined;
  return { cond, rationale: `${SCREEN} profile setting is ${f.setting}; the criterion concerns early-stage disease.`, evidence: settingEvidence, confidence: cond === undefined ? "low" : "medium", actionNeeded: cond === undefined ? "Confirm disease extent" : undefined };
}

const GENE_CRITERION: Array<{ re: RegExp; names: string[]; label: string }> = [
  { re: /\bPIK3CA\b/i, names: ["PIK3CA"], label: "PIK3CA" },
  { re: /\bESR1\b/i, names: ["ESR1"], label: "ESR1" },
  { re: /\b(?:g?BRCA(?:1\/2|1|2)?|germline BRCA)\b/i, names: ["BRCA1", "BRCA2", "gBRCA", "BRCA1/2"], label: "BRCA" },
  { re: /\bAKT1?\b/i, names: ["AKT1"], label: "AKT1" },
  { re: /\bPTEN\b/i, names: ["PTEN"], label: "PTEN" },
  { re: /\bPD-?L1\b/i, names: ["PD-L1"], label: "PD-L1" },
];

function ruleGene(c: Criterion, f: Facts): RuleOutcome | undefined {
  const t = c.text;
  for (const gene of GENE_CRITERION) {
    if (!gene.re.test(t)) continue;
    const results = f.profile.biomarkers.filter((b) => gene.names.includes(b.name));
    const wantsWildType = /\b(?:wild[- ]?type|lack of|absence of|no (?:known )?(?:mutation|alteration)|negative for)\b/i.test(t) && !/\bknown (?:activating )?(?:mutation|alteration)/i.test(t);
    const altered = results.find((b) => b.status === "mutated" || b.status === "positive" || b.status === "amplified" || b.status === "high");
    const wildType = results.find((b) => b.status === "wild-type" || b.status === "negative");
    if (!altered && !wildType) {
      return { cond: undefined, rationale: `${SCREEN} the criterion depends on ${gene.label} status, which was not found in the record.`, evidence: [], confidence: "low", actionNeeded: `Obtain ${gene.label} testing (tissue or ctDNA)` };
    }
    const found = altered ?? wildType!;
    const isAltered = Boolean(altered);
    const cond = wantsWildType ? !isAltered : isAltered;
    return { cond, rationale: `${SCREEN} profile shows ${gene.label} ${found.status}${found.detail ? ` (${found.detail})` : ""}; the criterion ${wantsWildType ? "requires the absence of an alteration" : "concerns a documented alteration"}.`, evidence: found.evidence, confidence: "medium" };
  }
  return undefined;
}

function ruleEcog(c: Criterion, f: Facts): RuleOutcome | undefined {
  const t = c.text;
  if (!/\bECOG\b|\bperformance status\b/i.test(t)) return undefined;
  const range = /([0-4])\s*(?:-|–|to|or)\s*([0-4])/.exec(t);
  const single = /(?:≤|<=|of|:|=|\bPS\b)?\s*([0-4])\b/.exec(t.replace(/ECOG/gi, "ECOG"));
  const max = range ? Math.max(+range[1], +range[2]) : single && /\b(?:≤|<=|or (?:less|better)|\b0\b)/.test(t) ? +single[1] : single ? +single[1] : undefined;
  if (max === undefined) return undefined;
  if (f.ecog === undefined) {
    return { cond: undefined, rationale: `${SCREEN} the criterion requires ECOG ≤ ${max} but no ECOG score was found in the record.`, evidence: [], confidence: "low", actionNeeded: `Document ECOG performance status (≤ ${max} required)` };
  }
  return { cond: f.ecog <= max, rationale: `${SCREEN} profile ECOG is ${f.ecog}; the criterion allows ECOG ≤ ${max}.`, evidence: f.profile.performance.ecog?.evidence ?? [], confidence: "medium" };
}

function ruleCns(c: Criterion, f: Facts): RuleOutcome | undefined {
  const t = c.text;
  if (!/\bbrain\b|\bCNS\b|central nervous|leptomeningeal|intracranial/i.test(t)) return undefined;
  const allowsTreated = /\b(?:treated|stable|asymptomatic|history of|previously treated|controlled|clinically inactive)\b/i.test(t);
  if (f.cns === undefined || f.cns === "unknown") {
    return { cond: undefined, rationale: `${SCREEN} CNS status is not documented in the record.`, evidence: [], confidence: "low", actionNeeded: "Brain MRI to document CNS status" };
  }
  const evidence = f.profile.diagnosis.cnsStatus?.evidence ?? [];
  // `cond` = the patient has CNS disease that this criterion is concerned with.
  if (f.cns === "none") return { cond: c.type === "exclusion" ? false : false, rationale: `${SCREEN} no CNS metastases are documented; the criterion concerns CNS disease.`, evidence, confidence: "medium" };
  if (f.cns === "treated-stable") {
    const excluded = c.type === "exclusion" && !allowsTreated;
    return { cond: c.type === "exclusion" ? excluded : allowsTreated, rationale: `${SCREEN} treated/stable CNS metastases are documented; the criterion ${allowsTreated ? "allows treated, stable disease" : "does not mention an allowance for treated disease"}.`, evidence, confidence: "low", actionNeeded: "Confirm CNS stability interval, steroid use and symptoms" };
  }
  return { cond: c.type === "exclusion" ? true : false, rationale: `${SCREEN} untreated or active CNS metastases are documented.`, evidence, confidence: "medium" };
}

function ruleMeasurable(c: Criterion, f: Facts): RuleOutcome | undefined {
  if (!/\bmeasurable\b|\bRECIST\b/i.test(c.text)) return undefined;
  if (f.measurable === undefined) {
    return { cond: undefined, rationale: `${SCREEN} the record does not state whether there is RECIST 1.1 measurable disease.`, evidence: [], confidence: "low", actionNeeded: "Confirm RECIST 1.1 measurable disease on recent imaging" };
  }
  const evaluableOk = /\b(?:evaluable|bone[- ]only|non-?measurable)\b/i.test(c.text);
  return { cond: f.measurable || evaluableOk, rationale: `${SCREEN} profile documents ${f.measurable ? "measurable" : "non-measurable"} disease${!f.measurable && evaluableOk ? "; the criterion also accepts evaluable disease" : ""}.`, evidence: f.profile.diagnosis.measurableDisease?.evidence ?? [], confidence: "medium" };
}

function outcomeToVerdict(c: Criterion, outcome: RuleOutcome | undefined): CriterionVerdict {
  if (!outcome) {
    return { criterionId: c.id, status: "unknown", rationale: `${SCREEN} this criterion is outside the offline rule set and needs clinician review.`, evidence: [], confidence: "low", actionNeeded: "Review against the record" };
  }
  let status: VerdictStatus;
  if (outcome.status) status = outcome.status;
  else if (outcome.cond === undefined) status = "unknown";
  else if (c.type === "inclusion") status = outcome.cond ? "pass" : "fail";
  else status = outcome.cond ? "fail" : "pass";
  const verdict: CriterionVerdict = { criterionId: c.id, status, rationale: outcome.rationale, evidence: outcome.evidence.map((e) => ({ ...e })), confidence: outcome.confidence };
  if (outcome.actionNeeded) verdict.actionNeeded = outcome.actionNeeded;
  else if (status === "unknown") verdict.actionNeeded = "Review against the record";
  return verdict;
}

/** Rule-based screen of a trial's criteria against a profile. Never claims high confidence, so it never marks a trial ineligible. */
export function heuristicMatch(profile: PatientProfile, trial: Trial): TrialMatch {
  const f = facts(profile);
  const verdicts = trial.criteria.map((c) => {
    const outcome =
      ruleReproductive(c, f) ??
      ruleConsent(c) ??
      ruleAgeSex(c, f, trial) ??
      ruleHer2(c, f) ??
      ruleTnbc(c, f) ??
      ruleHormoneReceptor(c, f) ??
      ruleGene(c, f) ??
      ruleSetting(c, f) ??
      ruleEcog(c, f) ??
      ruleCns(c, f) ??
      ruleMeasurable(c, f);
    return outcomeToVerdict(c, outcome);
  });

  const pass = verdicts.filter((v) => v.status === "pass").length;
  const fail = verdicts.filter((v) => v.status === "fail").length;
  const unknown = verdicts.filter((v) => v.status === "unknown").length;
  const headline = `Keyword screen: ${pass} met · ${fail} not met · ${unknown} need review`;
  const reasoning = `Offline keyword screen (no API key configured): ${pass} of ${verdicts.length} criteria matched by simple rules on receptor status, setting, biomarkers, ECOG, CNS status, measurable disease and demographics; ${fail} conflict with the profile and ${unknown} need clinician review. Configure ANTHROPIC_API_KEY for a criterion-level evaluation of the full record.`;
  return finalizeMatch(trial, verdicts, headline, reasoning, "heuristic");
}
