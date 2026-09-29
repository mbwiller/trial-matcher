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
 * Strategy: normalise → split into inclusion/exclusion sections → split each
 * section into top-level items, folding sub-bullets and continuation lines
 * into their parent → clean → categorise.
 */

const ITEM_RE =
  /^(\s*)(?:[*•\-–·]|\(?\d{1,3}[.)]|\(?[a-zA-Z][.)]|\(?[ivxIVX]{1,5}[.)])\s+(\S.*)$/;

function unescapeMarkdown(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/\\([<>*_\[\]()#`~])/g, "$1")
    .replace(/ /g, " ")
    .replace(/[ \t]+$/gm, "");
}

function isInclusionHeader(line: string): boolean {
  const t = line.trim();
  if (t.length > 140) return false;
  if (/\binclusion\s+criteria\b/i.test(t) && !/\b(not|no|meet|meets|meeting|fail)\b[^.]*\binclusion/i.test(t)) {
    return true;
  }
  return /\b(eligible (to be included|for inclusion|to participate)|must meet all of the following|all of the following criteria (must )?apply|inclusion:)\b/i.test(t);
}

function isExclusionHeader(line: string): boolean {
  const t = line.trim();
  if (t.length > 140) return false;
  if (/\bexclusion\s+criteria\b/i.test(t) && !/\b(not|no|meet|meets|meeting)\b[^.]*\bexclusion/i.test(t)) {
    return true;
  }
  return /\b(excluded from (the|this) study if|will be excluded if|not eligible if any|must not meet any|any of the following criteria (will|would) exclude|exclusion:)\b/i.test(t);
}

interface RawItem {
  indent: number;
  text: string;
  children: string[];
}

function splitSectionIntoItems(lines: string[]): string[] {
  const items: RawItem[] = [];
  let current: RawItem | null = null;
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
      if (current && indent > current.indent) {
        current.children.push(text);
      } else {
        current = { indent, text, children: [] };
        items.push(current);
      }
      lastBlank = false;
      continue;
    }
    // Non-marker line.
    const indent = line.length - line.trimStart().length;
    const text = line.trim();
    if (current && (!lastBlank || indent > current.indent)) {
      // Continuation of the current item (or of its last child).
      if (current.children.length && indent > current.indent) {
        current.children[current.children.length - 1] += " " + text;
      } else {
        current.text += " " + text;
      }
    } else {
      // Standalone paragraph criterion.
      current = { indent, text, children: [] };
      items.push(current);
    }
    lastBlank = false;
  }

  return items.map((it) => {
    let text = it.text.trim();
    if (it.children.length) {
      const kids = it.children.map((c) => c.replace(/\s+/g, " ").trim()).filter(Boolean);
      text = text.replace(/[:;,]\s*$/, "") + ": " + kids.join("; ");
    }
    return text.replace(/\s+/g, " ").trim();
  });
}

const NOISE_RE =
  /^(inclusion|exclusion)\s+criteria\s*:?$|^(criteria|eligibility criteria|note|notes)\s*:?$/i;

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

export interface ParsedEligibility {
  inclusion: string[];
  exclusion: string[];
}

export function parseEligibilityText(raw: string): ParsedEligibility {
  const text = unescapeMarkdown(raw ?? "");
  const lines = text.split("\n");

  const sections: Array<{ type: CriterionType; lines: string[] }> = [];
  let mode: CriterionType = "inclusion";
  let bucket: string[] = [];
  const flush = () => {
    if (bucket.some((l) => l.trim())) sections.push({ type: mode, lines: bucket });
    bucket = [];
  };

  for (const line of lines) {
    if (isExclusionHeader(line)) {
      flush();
      mode = "exclusion";
      continue;
    }
    if (isInclusionHeader(line)) {
      flush();
      mode = "inclusion";
      continue;
    }
    bucket.push(line);
  }
  flush();

  const out: ParsedEligibility = { inclusion: [], exclusion: [] };
  for (const s of sections) {
    const items = splitSectionIntoItems(s.lines)
      .map((t) => t.replace(/^[:\-–\s]+/, "").trim())
      .filter((t) => t.length > 2 && !NOISE_RE.test(t));
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
