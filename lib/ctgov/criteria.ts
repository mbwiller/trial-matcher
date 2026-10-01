import type { Criterion, CriterionCategory, CriterionType } from "@/lib/types";

/**
 * Eligibility-criteria parser for ClinicalTrials.gov free text.
 *
 * CT.gov eligibility blocks are lightly-formatted markdown: an
 * "Inclusion Criteria:" header, bullets (`*`, `•`, `-`) or numbering (`1.`,
 * `a.`, `i.`), sub-bullets indented by two or more spaces, and an
 * "Exclusion Criteria:" header. Escaped characters (`\<`, `\>`) appear
 * because the registry markdown-escapes comparison operators.
 *
 * Strategy: normalize → split into inclusion/exclusion sections (recognizing
 * cohort-prefixed and sentence-style headers) → build an item tree per
 * section (bullets, numbering, sub-bullets, colon-terminated stems followed
 * by a list, continuation paragraphs) → render: sub-items fold into their
 * parent unless the result would be unreasonably long, in which case the
 * list is flattened into one criterion per item; a paragraph that only
 * announces a list ("must meet all of the following:", "Women who:") never
 * becomes a criterion itself → clean → categorize.
 *
 * Fidelity notes:
 *   - A registry entry with no exclusion section (e.g. SWOG S1501, the
 *     ComboMATCH screening trial) yields zero exclusion criteria. "Must not…"
 *     statements listed under the inclusion header stay inclusion criteria:
 *     verdicts are relative to eligibility, so nothing is lost.
 *   - Criterion text is the text as written; the only addition is a
 *     "Cohort A: " style prefix when the source scopes criteria to a cohort.
 */

const ITEM_RE =
  /^(\s*)(?:[*•\-–·]|o(?=\s)|\(?\d{1,3}[.)]|\(?[a-zA-Z][.)]|\(?[ivxIVX]{1,5}[.)])\s+(\S.*)$/;

/** Folded parent + sub-items longer than this are flattened into separate criteria. */
const FOLD_MAX = 1000;
/** Absolute cap per criterion; longer text is split at sentence boundaries. */
const HARD_MAX = 1200;
/** Preferred chunk size when splitting over-long text. */
const CHUNK_TARGET = 800;

function unescapeMarkdown(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/\\([\\`*_{}[\]()#+\-.!|<>~])/g, "$1")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+$/gm, "");
}

// ---------------------------------------------------------------------------
// Section headers
// ---------------------------------------------------------------------------

const EXPLICIT_HEADER_RE =
  /^(.*?)\s*[-–—:]?\s*(?:(?:key|main|general|specific|additional|major|principal|core|study|subject|patient|participant)\s+)*(inclusion|exclusion)\s+criteri(?:a|on)\b\s*(?:for|of|\(|[-–—:])?\s*(.*?)\s*[):]*\s*$/i;

const LABEL_WORD_RE =
  /\b(cohort|part|arm|group|phase|module|expansion|escalation|sub-?study|population|dose level|schedule|regimen)\b/i;

/** Words that make a would-be label generic ("all patients", "the study", "include but are not limited to the following"). */
const GENERIC_LABEL_RE =
  /^(?:(?:the|all|for|of|and|study|trial|key|main|general|specific|additional|overall|protocol|screening|eligibility|major|primary|core|subjects?|patients?|participants?|criteria|following|include|includes|but|are|not|limited|to|only|common|both|each|every)\s*)+$|^(?:all|both|each|every)\s+(?:cohorts?|parts?|arms?|groups?|phases?)$/i;

/** Standalone label lines that scope the criteria that follow: "Cohort A:", "Part 2 (dose expansion)". */
const LABEL_LINE_RE =
  /^(?:cohort|part|arm|group|phase|population|module|expansion|escalation)\s+[\w+-]+(?:\s*\([^)]{0,40}\))?\s*(?:cohort|only|patients|participants)?\s*:?$/i;

const SUBJECT_RE =
  /^(?:a |an |the |all |any |each |every )?(?:patients?|participants?|subjects?|individuals?|persons?|people|women|men|volunteers?|candidates?)\s+(?:are|were|will|would|must|should|is|may|can|cannot|who|that|meeting|presenting|fulfilling|satisfying|have to|need)\b/i;

interface HeaderMatch {
  /** Section type; undefined keeps the current section (label-only header). */
  type?: CriterionType;
  /** Cohort/part label that scopes the criteria that follow. */
  label?: string;
  /** Criterion text found on the header line itself ("Inclusion Criteria: Age ≥ 18 …"). */
  rest?: string;
}

function cleanLabel(raw: string | undefined): string | undefined {
  const label = (raw ?? "")
    .replace(/[()]/g, "")
    .replace(/^[\s:\-–—]+|[\s:\-–—]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!label || label.length > 40) return undefined;
  if (GENERIC_LABEL_RE.test(label)) return undefined;
  if (LABEL_WORD_RE.test(label)) return label;
  // Short code-like labels ("A", "B2", "HER2+") are accepted; prose is not.
  return label.split(" ").length <= 2 && /[A-Z0-9]/.test(label) ? label : undefined;
}

function matchHeader(rawLine: string): HeaderMatch | null {
  const line = rawLine.trim();
  if (!line || line.length > 200) return null;
  const indent = rawLine.length - rawLine.trimStart().length;
  const marker = ITEM_RE.exec(rawLine);
  const body = marker ? marker[2].trim() : line;

  // "Inclusion Criteria:", "Cohort A Inclusion Criteria:", "Key Exclusion Criteria", "Inclusion criteria for Part 2:"
  const mentionsInc = /\binclusion\b/i.test(body);
  const mentionsExc = /\bexclusion\b/i.test(body);
  if (mentionsInc !== mentionsExc && body.length <= 140 && indent <= 4) {
    const type: CriterionType = mentionsInc ? "inclusion" : "exclusion";
    const negated = /\b(not|no|none|without|fail\w*|violat\w*|unless)\b[^.:]*\b(inclusion|exclusion)\b/i.test(body);
    const listIntro = /:$/.test(body) && /\bfollowing\b/i.test(body);
    if (!negated || listIntro) {
      const explicit = EXPLICIT_HEADER_RE.exec(body);
      if (explicit) {
        const label = cleanLabel(explicit[1]) ?? cleanLabel(explicit[3]);
        const trailing = explicit[3].trim();
        const rest = !label && trailing.split(" ").length >= 3 && !/\bfollowing\b/i.test(trailing) ? trailing : undefined;
        return { type, label, rest };
      }
      if (/^(?:(?:key|main|general|specific|additional)\s+)?(inclusion|exclusion)\s*:?$/i.test(body)) return { type };
      if (/\bcriteria for (inclusion|exclusion)\b/i.test(body)) return { type };
    }
  }

  // Standalone cohort/part label: keeps the section, scopes what follows.
  if (indent <= 4 && LABEL_LINE_RE.test(body)) {
    const label = cleanLabel(body.replace(/:$/, ""));
    if (label) return { label };
  }

  // Sentence-style gates, only as top-level paragraphs that introduce a list:
  // "Participants are eligible to be included in the study only if all of the following criteria apply:"
  // "Participants are excluded from the study if any of the following criteria apply:"
  if (marker || indent > 0) return null;
  const introducesList = /:$/.test(body) || /\bfollowing\b/i.test(body);
  if (!introducesList) return null;

  const exclusionWords =
    /\b(excluded|exclude[sd]?|ineligible|not (?:be )?eligible|not be (?:included|enrolled|permitted|allowed)|may not (?:participate|be enrolled)|cannot participate|will not be (?:included|enrolled)|prohibited)\b/i;
  const inclusionWords = /\b(eligible|included|inclusion|enrolled|enrol+ed|enrol+ment|participate|participation)\b/i;
  const subjectLed = SUBJECT_RE.test(body);

  if (exclusionWords.test(body) && /\b(any|following|if)\b/i.test(body)) {
    if (subjectLed || /^(?:any of the following|the presence of any|presence of any|exclusion|criteria|to be excluded)/i.test(body)) {
      return { type: "exclusion" };
    }
    return null;
  }
  if (inclusionWords.test(body) && /\b(all|each|following)\b/i.test(body) && !/\bunless\b/i.test(body)) {
    if (subjectLed || /^(?:to be eligible|eligible|eligibility|inclusion|criteria|in order to be eligible)/i.test(body)) {
      return { type: "inclusion" };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Noise: template sub-headers and section labels that are not criteria
// ---------------------------------------------------------------------------

const TEMPLATE_SUBHEADERS =
  "type of participant and disease characteristics|sex and contraceptive\\/barrier requirements|sex and contraceptive requirements|contraceptive\\/barrier requirements|contraceptive requirements|medical conditions|prior\\/concomitant therapy|prior\\/concurrent clinical study experience|diagnostic assessments?|other exclusions?|other inclusions?|informed consent|demographics?|laboratory values|weight|sex|age|general|other|contraception|prior therapy|concomitant therapy";

const SUBHEADER_RE = new RegExp(`^(?:${TEMPLATE_SUBHEADERS})\\s*:?$`, "i");
const TRAILING_SUBHEADER_RE = new RegExp(`([.;])\\s+(?:${TEMPLATE_SUBHEADERS})\\s*:?$`, "i");

/** Registration-step labels ("STEP 1 REGISTRATION", "Step 2 (Randomization)") carry no criterion. */
const SECTION_LABEL_RE =
  /^(?:step|stage)\s+[\w-]+(?:\s+(?:registration|randomi[sz]ation|enrol+ment|screening|only))*(?:\s*\([^)]*\))?\s*:?$/i;

const NOISE_RE =
  /^(inclusion|exclusion)\s+criteria\s*:?$|^(criteria|eligibility criteria|note|notes|n\/a|none|not applicable)\s*:?$|^(?:note:?\s*)?other protocol[- ]defined (?:inclusion\/exclusion|inclusion and exclusion|eligibility) criteria (?:may|could|will|might) apply\.?$/i;

function isNoise(text: string): boolean {
  return NOISE_RE.test(text) || SUBHEADER_RE.test(text) || SECTION_LABEL_RE.test(text);
}

// ---------------------------------------------------------------------------
// Item tree
// ---------------------------------------------------------------------------

interface Node {
  indent: number;
  text: string;
  children: Node[];
  /** True for a non-bulleted paragraph (can act as a stem for a list at its own indent). */
  paragraph: boolean;
}

/** A complete requirement sentence, e.g. "Patients must not be dialysis dependent". */
const REQUIREMENT_RE =
  /^(?:all\s+)?(?:[\w/+-]+\s+){0,3}?(?:patients?|participants?|subjects?|individuals?|women|men|persons?|people)\s+(?:must|should|need|needs|are required|have to|has to|cannot|can not|may not|will not|shall|are not|is not)\b|^must\b/i;

const endsWithColon = (s: string) => /[:：]\s*$/.test(s);

function buildTree(lines: string[]): Node[] {
  const items: Node[] = [];
  let stack: Node[] = [];
  let lastBlank = true;

  for (const raw of lines) {
    const line = raw.replace(/\t/g, "  ");
    if (!line.trim()) {
      lastBlank = true;
      continue;
    }

    const m = ITEM_RE.exec(line);
    if (m) {
      const indent = m[1].length;
      const text = m[2].trim();
      const node: Node = { indent, text, children: [], paragraph: false };
      // Pop to the nearest ancestor that is less indented. A colon-terminated
      // paragraph stem also accepts a contiguous list at its own indent.
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top.indent < indent) break;
        if (top.indent === indent && top.paragraph && endsWithColon(top.text) && (!lastBlank || top.children.length === 0)) break;
        stack.pop();
      }
      const parent = stack[stack.length - 1];
      // A full requirement sentence only nests under an explicit, less-indented
      // stem; otherwise the registry's indentation is a formatting accident.
      const nests = parent !== undefined && (!REQUIREMENT_RE.test(text) || (endsWithColon(parent.text) && parent.indent < indent));
      if (parent && nests) {
        parent.children.push(node);
        stack.push(node);
      } else {
        items.push(node);
        stack = [node];
      }
      lastBlank = false;
      continue;
    }

    // Non-marker line.
    const indent = line.length - line.trimStart().length;
    const text = line.trim();
    if (lastBlank && (SUBHEADER_RE.test(text) || SECTION_LABEL_RE.test(text))) {
      // Template sub-header ("Medical Conditions", "STEP 2 REGISTRATION"): not a criterion; closes the current item.
      stack = [];
      lastBlank = false;
      continue;
    }
    const deepest = stack[stack.length - 1];
    if (deepest && (!lastBlank || indent > deepest.indent)) {
      // Wrapped continuation of the current item (or an indented paragraph under it).
      deepest.text += " " + text;
    } else {
      const node: Node = { indent, text, children: [], paragraph: true };
      items.push(node);
      stack = [node];
    }
    lastBlank = false;
  }
  return items;
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function tidy(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,;.])/g, "$1")
    .replace(TRAILING_SUBHEADER_RE, "$1")
    .trim();
}

function fold(node: Node): string {
  const own = tidy(node.text);
  if (!node.children.length) return own;
  const kids = node.children.map(fold).filter(Boolean);
  return own.replace(/[:;,]\s*$/, "") + ": " + kids.join("; ");
}

/** A stem that only announces a list: "Subjects must meet all of the following criteria:", "Eligible patients are those with any of the following:". */
const PREAMBLE_STEM_RE =
  /\b(?:all|any|each|one|none) of the following\b|\bthe following (?:criteria|conditions|requirements|characteristics)\b|\bfollowing (?:inclusion|exclusion|eligibility) criteria\b|\bcriteria (?:apply|are met|must be met|below)\b|\b(?:must|should|need to) (?:meet|fulfil+|satisfy)\b/i;
/** A stem that is the grammatical subject of every item in its list: "Women who:", "Patients with:", "Those who have:". */
const SUBJECT_STEM_RE = /\b(?:who|that|with|without|must|should|have|has|having|are|is|if|be)\s*$/i;

function render(node: Node): string[] {
  if (!node.children.length) return [tidy(node.text)];
  if (node.paragraph && node.children.length >= 2) {
    // A paragraph stem over a list is section scaffolding, not a criterion with details:
    // every item is its own criterion.
    const stem = tidy(node.text).replace(/[:;,]\s*$/, "").trim();
    if (PREAMBLE_STEM_RE.test(stem)) return node.children.flatMap(render);
    if (stem.split(" ").length <= 6 && SUBJECT_STEM_RE.test(stem)) {
      // "Patients must:" + "Have metastatic disease" → "Patients must have metastatic disease" (acronyms keep their case).
      return node.children.flatMap(render).map((item) => `${stem} ${/^[A-Z][a-z]/.test(item) ? item[0].toLowerCase() + item.slice(1) : item}`);
    }
  }
  const folded = fold(node);
  if (folded.length <= FOLD_MAX) return [folded];
  // Too long to read as one criterion: flatten into the stem plus one criterion per sub-item.
  const stem = tidy(node.text).replace(/[:;,]\s*$/, "");
  const out: string[] = [];
  if (stem.split(" ").length >= 4) out.push(stem);
  for (const child of node.children) out.push(...render(child));
  return out;
}

const ABBREV_RE = /(?:^|\s)(?:e\.g|i\.e|vs|etc|approx|dr|mr|mrs|ms|no|fig|ref|inc|ltd|st|ca|cf|al|resp)\.$/i;

function sentences(text: string): string[] {
  const out: string[] = [];
  let start = 0;
  for (let i = 0; i < text.length - 2; i++) {
    const ch = text[i];
    if ((ch === "." || ch === ";") && /\s/.test(text[i + 1]) && /[A-Z0-9(]/.test(text[i + 2])) {
      const candidate = text.slice(start, i + 1);
      if (ch === "." && ABBREV_RE.test(candidate)) continue;
      out.push(candidate.trim());
      start = i + 1;
    }
  }
  const tail = text.slice(start).trim();
  if (tail) out.push(tail);
  return out;
}

function hardWrap(text: string, max: number): string[] {
  const out: string[] = [];
  let rest = text;
  while (rest.length > max) {
    const window = rest.slice(0, max);
    const cut = Math.max(window.lastIndexOf(", "), window.lastIndexOf(" "));
    const at = cut > max * 0.5 ? cut : max;
    out.push(rest.slice(0, at).trim());
    rest = rest.slice(at).trim();
  }
  if (rest) out.push(rest);
  return out;
}

/** Split text longer than `max` at sentence boundaries into chunks of roughly `target` characters. */
function splitLong(text: string, max = HARD_MAX, target = CHUNK_TARGET): string[] {
  if (text.length <= max) return [text];
  const chunks: string[] = [];
  let current = "";
  for (const s of sentences(text)) {
    const pieces = s.length > max ? hardWrap(s, target) : [s];
    for (const piece of pieces) {
      if (current && current.length + piece.length + 1 > target) {
        chunks.push(current);
        current = piece;
      } else {
        current = current ? `${current} ${piece}` : piece;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function renderSection(lines: string[]): string[] {
  return buildTree(lines)
    .flatMap(render)
    .flatMap((t) => splitLong(t))
    .map((t) => t.replace(/^[:\-–\s]+/, "").trim())
    .filter((t) => t.length > 2 && !isNoise(t));
}

// ---------------------------------------------------------------------------
// Categorization (heuristic)
// ---------------------------------------------------------------------------

export function categorizeCriterion(text: string): CriterionCategory {
  const t = text;
  if (/informed consent|HIPAA|willing (and|&) able to (comply|participate|provide)|comply with (the )?(study|protocol)|ability to understand|legal(ly)? (adult|age|authorized)|study procedures/i.test(t)) return "consent";
  if (/pregnan|breast[- ]?feed|lactat|contracept|childbearing|WOCBP|semen|sperm|fertil/i.test(t)) return "reproductive";
  if (/ECOG|Karnofsky|performance status|life expectancy/i.test(t)) return "performance";
  if (/\bbrain\b|\bCNS\b|central nervous|leptomeningeal|intracranial|spinal cord compression|carcinomatous meningitis/i.test(t)) return "cns";
  if (/measurable|RECIST|evaluable (disease|lesion)|target lesion/i.test(t)) return "measurable-disease";
  if (/within \d+ (days?|weeks?|months?) (prior|before|of)|washout|last dose|half-lives|at least \d+ (days?|weeks?) (since|after|from|between)|≥\s*\d+ (days?|weeks?) (since|after|from)/i.test(t)) return "washout";
  if (/adequate (organ|hematolog|bone marrow|marrow|renal|hepatic|liver|kidney|cardiac)|\bANC\b|neutrophil|platelet|hemoglobin|haemoglobin|creatinine|bilirubin|\bAST\b|\bALT\b|\bLVEF\b|ejection fraction|QTc|\bINR\b|clearance|transaminase|albumin/i.test(t)) return "organ-function";
  if (/HER2|HER-2|\bER\b|\bPR\b|estrogen|oestrogen|progesterone|hormone receptor|\bHR[+-]|PIK3CA|BRCA|PALB2|ESR1|PD-L1|\bAKT\b|PTEN|mutation|amplif|biomarker|\bIHC\b|FISH|\bISH\b|Ki-?67|germline|somatic|ctDNA|\bNGS\b|TNBC|triple[- ]negative|receptor|\bHRD\b|homologous recombination/i.test(t)) return "biomarker";
  if (/\bstage\b|metasta|locally advanced|unresectable|recurren|residual disease|\bpCR\b|\bRCB\b|early[- ]stage|node[- ]positive|inflammatory breast|de novo|\bT[0-4]\b|\bN[0-3]\b|\bM[01]\b/i.test(t)) return "stage";
  if (/prior (treatment|therapy|therapies|line|systemic|chemotherapy|endocrine|CDK|radiation|radiotherapy|exposure|anti-?cancer|hormonal|immunotherapy)|previous(ly)? (treated|received|therapy|treatment|line)|lines? of (therapy|treatment|chemotherapy|endocrine)|progress(ed|ion|ing) (on|during|after|while)|must have received|received .* (therapy|treatment|regimen)|treated with|refractory|intolerant|pretreated|naive|naïve|rechallenge|history of treatment/i.test(t)) return "prior-therapy";
  if (/diabet|cardiac|cardiovascular|myocardial|heart failure|arrhythm|infection|\bHIV\b|hepatitis|interstitial lung|\bILD\b|pneumonitis|autoimmune|other malignanc|second (primary )?malignanc|prior malignanc|psychiatric|substance|uncontrolled|allerg|hypersensitiv|transplant|\bGI\b|gastrointestinal|bleeding|thrombo|stroke|seizure|surgery within|comorbid|concurrent (disease|illness|condition)|medical condition|corticosteroid|immunosuppress|vaccine|COVID/i.test(t)) return "comorbidity";
  if (/^(age|aged|is|are)\b.*\b(1[0-9]|[2-9]\d)\s*(years|yrs)|\b(≥|>=|at least|older than|over)\s*1[0-9]\s*(years|yrs)|\byears of age\b|^(adult|male|female|women|men)\b|\b(male|female|women|men)\b.*\b(only|participants?|patients?|subjects?)\b/i.test(t)) return "demographics";
  if (/histolog|cytolog|confirmed|diagnos|carcinoma|breast cancer|adenocarcinoma|malignan|tumou?r/i.test(t)) return "diagnosis";
  return "other";
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ParsedEligibility {
  inclusion: string[];
  exclusion: string[];
}

export function parseEligibilityText(raw: string): ParsedEligibility {
  const text = unescapeMarkdown(raw ?? "");
  const lines = text.split("\n");

  const sections: Array<{ type: CriterionType; label?: string; lines: string[] }> = [];
  let mode: CriterionType = "inclusion";
  let label: string | undefined;
  let bucket: string[] = [];
  const flush = () => {
    if (bucket.some((l) => l.trim())) sections.push({ type: mode, label, lines: bucket });
    bucket = [];
  };

  for (const line of lines) {
    const header = matchHeader(line);
    if (header) {
      flush();
      if (header.type) {
        mode = header.type;
        label = header.label;
      } else {
        label = header.label;
      }
      if (header.rest) bucket.push(header.rest);
      continue;
    }
    bucket.push(line);
  }
  flush();

  const out: ParsedEligibility = { inclusion: [], exclusion: [] };
  for (const s of sections) {
    const items = renderSection(s.lines).map((t) => (s.label ? `${s.label}: ${t}` : t));
    out[s.type].push(...items);
  }
  return out;
}

export function parseCriteria(nctId: string, raw: string): Criterion[] {
  const parsed = parseEligibilityText(raw);
  const criteria: Criterion[] = [];
  parsed.inclusion.forEach((text, i) => {
    criteria.push({
      id: `${nctId}-inc-${i + 1}`,
      type: "inclusion",
      text,
      category: categorizeCriterion(text),
    });
  });
  parsed.exclusion.forEach((text, i) => {
    criteria.push({
      id: `${nctId}-exc-${i + 1}`,
      type: "exclusion",
      text,
      category: categorizeCriterion(text),
    });
  });
  return criteria;
}
