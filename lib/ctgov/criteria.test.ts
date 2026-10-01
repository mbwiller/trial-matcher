import { describe, expect, it } from "vitest";
import { demoTrials } from "@/lib/demo/trials";
import { categorizeCriterion, parseCriteria, parseEligibilityText } from "./criteria";

const lines = (...ls: string[]) => ls.join("\n");

describe("parseEligibilityText — list styles", () => {
  it("parses asterisk bullets under Inclusion/Exclusion headers", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "* Histologically confirmed breast cancer",
      "* ECOG performance status 0-1",
      "",
      "Exclusion Criteria:",
      "",
      "* Pregnant or breastfeeding",
    );
    expect(parseEligibilityText(text)).toEqual({
      inclusion: ["Histologically confirmed breast cancer", "ECOG performance status 0-1"],
      exclusion: ["Pregnant or breastfeeding"],
    });
  });

  it("parses numbered, lettered, parenthesised and dash markers", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "1. Age ≥ 18 years",
      "2) Measurable disease per RECIST 1.1",
      "(a) Adequate organ function",
      "- Life expectancy of at least 12 weeks",
      "• Signed informed consent",
      "",
      "Exclusion Criteria:",
      "",
      "i. Active infection",
      "ii. Known hypersensitivity",
    );
    expect(parseEligibilityText(text)).toEqual({
      inclusion: [
        "Age ≥ 18 years",
        "Measurable disease per RECIST 1.1",
        "Adequate organ function",
        "Life expectancy of at least 12 weeks",
        "Signed informed consent",
      ],
      exclusion: ["Active infection", "Known hypersensitivity"],
    });
  });

  it("folds sub-bullets into their parent, joined with semicolons", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "* Adequate organ function as defined below:",
      "",
      "  * ANC ≥ 1,500/µL",
      "  * Platelets ≥ 100,000/µL",
      "    * (or ≥ 75,000/µL with bone marrow involvement)",
      "* ECOG 0-1",
    );
    expect(parseEligibilityText(text).inclusion).toEqual([
      "Adequate organ function as defined below: ANC ≥ 1,500/µL; Platelets ≥ 100,000/µL: (or ≥ 75,000/µL with bone marrow involvement)",
      "ECOG 0-1",
    ]);
  });

  it("joins wrapped continuation lines into the item", () => {
    const text = lines("Inclusion Criteria:", "", "* Histologically confirmed", "  breast cancer that is", "  HER2-positive", "* ECOG 0-1");
    expect(parseEligibilityText(text).inclusion).toEqual(["Histologically confirmed breast cancer that is HER2-positive", "ECOG 0-1"]);
  });

  it("distributes a subject stem over the list that follows at the same indent", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "Patients must:",
      "",
      "1. Have metastatic breast cancer, AND",
      "2. Be receiving trastuzumab-based therapy",
      "",
      "* Patients must have a Zubrod performance status of 0-2",
    );
    expect(parseEligibilityText(text).inclusion).toEqual([
      "Patients must have metastatic breast cancer, AND",
      "Patients must be receiving trastuzumab-based therapy",
      "Patients must have a Zubrod performance status of 0-2",
    ]);
  });

  it("drops a stem that only announces the list", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "Subjects must meet all of the following criteria to participate:",
      "",
      "1. Age ≥ 18 years",
      "2. ECOG performance status 0-1",
    );
    expect(parseEligibilityText(text).inclusion).toEqual(["Age ≥ 18 years", "ECOG performance status 0-1"]);
  });

  it("still folds a topical stem with its details into one criterion", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "Adequate organ function:",
      "",
      "* ANC ≥ 1.5 x 10^9/L",
      "* Platelets ≥ 100 x 10^9/L",
    );
    expect(parseEligibilityText(text).inclusion).toEqual(["Adequate organ function: ANC ≥ 1.5 x 10^9/L; Platelets ≥ 100 x 10^9/L"]);
  });
});

describe("parseEligibilityText — markdown escapes", () => {
  it("unescapes comparison operators, brackets and asterisks", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "* LVEF \\>= 50% by echocardiogram",
      "* Age \\< 75 years",
      "* Response (complete response \\[CR\\] or partial response \\[PR\\])",
      "* LVEF 50-54% by local ECHO read\\*",
    );
    expect(parseEligibilityText(text).inclusion).toEqual([
      "LVEF >= 50% by echocardiogram",
      "Age < 75 years",
      "Response (complete response [CR] or partial response [PR])",
      "LVEF 50-54% by local ECHO read*",
    ]);
  });

  it("normalizes CRLF line endings and non-breaking spaces", () => {
    const text = "Inclusion Criteria:\r\n\r\n* Age ≥ 18\r\n\r\nExclusion Criteria:\r\n\r\n* Pregnant\r\n";
    expect(parseEligibilityText(text)).toEqual({ inclusion: ["Age ≥ 18"], exclusion: ["Pregnant"] });
  });
});

describe("parseEligibilityText — headers", () => {
  it("recognises cohort-prefixed headers and scopes the criteria with the cohort label", () => {
    const text = lines(
      "Cohort A Inclusion Criteria:",
      "",
      "* HER2-positive disease",
      "",
      "Cohort A Exclusion Criteria:",
      "",
      "* Prior trastuzumab deruxtecan",
      "",
      "Inclusion Criteria for Cohort B:",
      "",
      "* HER2-low disease",
      "",
      "Key Exclusion Criteria (Cohort B):",
      "",
      "* Active brain metastases",
    );
    expect(parseEligibilityText(text)).toEqual({
      inclusion: ["Cohort A: HER2-positive disease", "Cohort B: HER2-low disease"],
      exclusion: ["Cohort A: Prior trastuzumab deruxtecan", "Cohort B: Active brain metastases"],
    });
  });

  it("does not turn generic qualifiers into labels", () => {
    const text = lines(
      "Key Inclusion Criteria:",
      "",
      "* Age ≥ 18",
      "",
      "The main exclusion criteria include but are not limited to the following:",
      "",
      "* Metastatic disease",
    );
    expect(parseEligibilityText(text)).toEqual({ inclusion: ["Age ≥ 18"], exclusion: ["Metastatic disease"] });
  });

  it("handles a standalone cohort label line inside a section", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "Part 1:",
      "",
      "* Dose escalation participants",
      "",
      "Part 2:",
      "",
      "* Dose expansion participants",
      "",
      "Exclusion Criteria:",
      "",
      "* Pregnant",
    );
    expect(parseEligibilityText(text)).toEqual({
      inclusion: ["Part 1: Dose escalation participants", "Part 2: Dose expansion participants"],
      exclusion: ["Pregnant"],
    });
  });

  it("parses paragraph-style criteria without bullets", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "Patients must be at least 18 years of age.",
      "",
      "Patients must have histologically confirmed breast cancer",
      "with measurable disease.",
      "",
      "Exclusion Criteria:",
      "",
      "Pregnant or lactating women.",
    );
    expect(parseEligibilityText(text)).toEqual({
      inclusion: ["Patients must be at least 18 years of age.", "Patients must have histologically confirmed breast cancer with measurable disease."],
      exclusion: ["Pregnant or lactating women."],
    });
  });

  it("recognises 'eligible to be included … if all of the following criteria apply' and 'excluded … if any of the following' headers", () => {
    const text = lines(
      "Participants are eligible to be included in the study only if all of the following criteria apply:",
      "",
      "1. Is 18 years of age or older.",
      "2. Has measurable disease per RECIST 1.1.",
      "",
      "Participants are excluded from the study if any of the following criteria apply:",
      "",
      "Medical Conditions",
      "",
      "1. Has clinically confirmed leptomeningeal disease.",
      "2. Has active hepatitis B or C infection.",
      "",
      "    Prior/Concomitant Therapy",
      "3. Has a history of solid organ transplantation.",
    );
    expect(parseEligibilityText(text)).toEqual({
      inclusion: ["Is 18 years of age or older.", "Has measurable disease per RECIST 1.1."],
      exclusion: [
        "Has clinically confirmed leptomeningeal disease.",
        "Has active hepatitis B or C infection.",
        "Has a history of solid organ transplantation.",
      ],
    });
  });

  it("recognises other sentence-style gates", () => {
    const text = lines(
      "Patients will be included in the trial only if they meet all the following criteria:",
      "",
      "1. Have given written informed consent",
      "",
      "Patients meeting any of the following criteria are not eligible:",
      "",
      "1. Prior CDK4/6 inhibitor",
    );
    expect(parseEligibilityText(text)).toEqual({ inclusion: ["Have given written informed consent"], exclusion: ["Prior CDK4/6 inhibitor"] });
  });

  it("does not treat nested 'eligible to participate if' clauses or negated mentions as headers", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "1. Has measurable disease.",
      "2. Participant agrees to the following based on sex assigned at birth.",
      "",
      "    1. Male participants:",
      "",
      "       Male participants are eligible to participate if they agree to the following:",
      "       * Refrain from donating semen.",
      "    2. Female participants:",
      "",
      "       * A female participant is eligible to participate if she is not pregnant, and one of the following conditions applies:",
      "",
      "         * Is a woman of nonchildbearing potential OR",
      "         * Is a WOCBP using highly effective contraception.",
      "",
      "Exclusion Criteria:",
      "",
      "1. Has active hepatitis B.",
      "2. Patients who do not meet the inclusion criteria of the parent study.",
    );
    const parsed = parseEligibilityText(text);
    expect(parsed.exclusion).toEqual(["Has active hepatitis B.", "Patients who do not meet the inclusion criteria of the parent study."]);
    expect(parsed.inclusion).toHaveLength(2);
    expect(parsed.inclusion[1]).toContain("Male participants: Male participants are eligible to participate");
    expect(parsed.inclusion[1]).toContain("Female participants: A female participant is eligible");
    expect(parsed.inclusion[1]).toContain("Is a woman of nonchildbearing potential OR; Is a WOCBP");
  });

  it("treats text with no headers as inclusion criteria and empty text as nothing", () => {
    expect(parseEligibilityText("* Age ≥ 18\n* ECOG 0-1")).toEqual({ inclusion: ["Age ≥ 18", "ECOG 0-1"], exclusion: [] });
    expect(parseEligibilityText("")).toEqual({ inclusion: [], exclusion: [] });
  });
});

describe("parseEligibilityText — structure repair", () => {
  it("promotes requirement sentences that the registry mis-nested under an example bullet (S1501 style)", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "* STEP 1 REGISTRATION",
      "",
      "Examples of eligible HER-2 targeted therapy:",
      "",
      "* Trastuzumab",
      "* Fam-trastuzumab deruxtecan (Enhertu)",
      "",
      "  * Patients must be at increased risk for cardiotoxicity defined by at least one of the following:",
      "",
      "    1. Previous anthracycline exposure OR",
      "    2. Age ≥ 65",
      "  * Patients must not be dialysis dependent",
      "* STEP 2 REGISTRATION (Randomization)",
    );
    expect(parseEligibilityText(text).inclusion).toEqual([
      "Examples of eligible HER-2 targeted therapy: Trastuzumab; Fam-trastuzumab deruxtecan (Enhertu)",
      "Patients must be at increased risk for cardiotoxicity defined by at least one of the following: Previous anthracycline exposure OR; Age ≥ 65",
      "Patients must not be dialysis dependent",
    ]);
  });

  it("flattens a list whose folded text would be unreasonably long", () => {
    const children = Array.from({ length: 12 }, (_, i) => `  * Laboratory parameter number ${i + 1} must be within the institutional normal range as measured within 14 days of registration`);
    const text = lines("Inclusion Criteria:", "", "* Adequate organ and marrow function as defined below:", "", ...children, "* ECOG 0-1");
    const { inclusion } = parseEligibilityText(text);
    expect(inclusion[0]).toBe("Adequate organ and marrow function as defined below");
    expect(inclusion).toHaveLength(14);
    expect(inclusion[1]).toBe("Laboratory parameter number 1 must be within the institutional normal range as measured within 14 days of registration");
    expect(inclusion[13]).toBe("ECOG 0-1");
    for (const c of inclusion) expect(c.length).toBeLessThanOrEqual(1200);
  });

  it("splits a single over-long item at sentence boundaries", () => {
    const sentence = "Uncontrolled intercurrent illness including active infection requiring systemic therapy or symptomatic congestive heart failure.";
    const text = lines("Exclusion Criteria:", "", `* ${Array.from({ length: 14 }, () => sentence).join(" ")}`);
    const { exclusion } = parseEligibilityText(text);
    expect(exclusion.length).toBeGreaterThan(1);
    for (const c of exclusion) {
      expect(c.length).toBeLessThanOrEqual(1200);
      expect(c.startsWith("Uncontrolled")).toBe(true);
      expect(c.endsWith("failure.")).toBe(true);
    }
    expect(exclusion.join(" ")).toBe(Array.from({ length: 14 }, () => sentence).join(" "));
  });

  it("drops template sub-headers, registration-step labels and boilerplate notes", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "1. Female or male, must be ≥ 18 years. Type of Participant and Disease Characteristics",
      "2. Adequate organ and marrow function. Sex and Contraceptive/Barrier Requirements",
      "",
      "Exclusion Criteria:",
      "",
      "* STEP 1 REGISTRATION",
      "* Pregnant",
      "",
      "Other Exclusions",
      "",
      "* Note: Other protocol defined Inclusion/Exclusion criteria may apply.",
    );
    expect(parseEligibilityText(text)).toEqual({
      inclusion: ["Female or male, must be ≥ 18 years.", "Adequate organ and marrow function."],
      exclusion: ["Pregnant"],
    });
  });
});

describe("parseCriteria", () => {
  it("assigns stable ids and heuristic categories", () => {
    const text = lines(
      "Inclusion Criteria:",
      "",
      "* ECOG performance status 0-1",
      "* Adequate organ function: ANC ≥ 1500",
      "",
      "Exclusion Criteria:",
      "",
      "* Pregnant or breastfeeding",
      "* Known untreated brain metastases",
    );
    const criteria = parseCriteria("NCT00000001", text);
    expect(criteria.map((c) => c.id)).toEqual(["NCT00000001-inc-1", "NCT00000001-inc-2", "NCT00000001-exc-1", "NCT00000001-exc-2"]);
    expect(criteria.map((c) => c.type)).toEqual(["inclusion", "inclusion", "exclusion", "exclusion"]);
    expect(criteria.map((c) => c.category)).toEqual(["performance", "organ-function", "reproductive", "cns"]);
  });

  it("categorizes common criterion phrasings", () => {
    expect(categorizeCriterion("Signed written informed consent")).toBe("consent");
    expect(categorizeCriterion("Measurable disease per RECIST 1.1")).toBe("measurable-disease");
    expect(categorizeCriterion("Prior treatment with a CDK4/6 inhibitor in the advanced setting")).toBe("prior-therapy");
    expect(categorizeCriterion("HER2-positive by IHC 3+ or ISH amplified")).toBe("biomarker");
    expect(categorizeCriterion("Last dose of chemotherapy within 21 days prior to registration")).toBe("washout");
    expect(categorizeCriterion("Uncontrolled diabetes mellitus")).toBe("comorbidity");
    expect(categorizeCriterion("Women ≥ 18 years of age")).toBe("demographics");
    expect(categorizeCriterion("Histologically confirmed adenocarcinoma of the breast")).toBe("diagnosis");
  });
});

describe("registry snapshot (lib/demo/trials.json)", () => {
  const trials = demoTrials();

  it("holds the full harvest", () => {
    expect(trials.length).toBeGreaterThanOrEqual(1500);
    expect(new Set(trials.map((t) => t.nctId)).size).toBe(trials.length);
  });

  it("parses every study into clean criteria", () => {
    const problems: string[] = [];
    for (const trial of trials) {
      if (trial.criteria.length === 0) problems.push(`${trial.nctId}: no criteria`);
      const ids = new Set<string>();
      for (const c of trial.criteria) {
        if (/\\[<>[\]*_()]/.test(c.text)) problems.push(`${c.id}: markdown escape left in text`);
        if (c.text.length > 1200) problems.push(`${c.id}: ${c.text.length} chars`);
        if (c.text.trim().length <= 2) problems.push(`${c.id}: empty`);
        if (!/^NCT\d{8}-(inc|exc)-\d+$/.test(c.id)) problems.push(`${c.id}: bad id`);
        if (ids.has(c.id)) problems.push(`${c.id}: duplicate id`);
        ids.add(c.id);
      }
    }
    expect(problems).toEqual([]);
  });

  it("splits list-announcing stems into one criterion per item", () => {
    // "Unless otherwise noted, subjects must meet all of the following criteria …:" followed by a numbered list.
    const carT = trials.find((t) => t.nctId === "NCT06347068");
    expect(carT).toBeDefined();
    if (!carT) return;
    const inclusion = carT.criteria.filter((c) => c.type === "inclusion");
    expect(inclusion.length).toBeGreaterThanOrEqual(4);
    expect(inclusion[1].text).toBe("Age ≥ 18 years at the time of consent.");
  });

  it("keeps registry entries without an exclusion section faithful (S1501, ComboMATCH)", () => {
    const s1501 = trials.find((t) => t.nctId === "NCT03418961");
    const combo = trials.find((t) => t.nctId === "NCT05564377");
    expect(s1501).toBeDefined();
    expect(combo).toBeDefined();
    if (!s1501 || !combo) return;
    expect(s1501.eligibilityText).not.toMatch(/exclusion criteria/i);
    expect(combo.eligibilityText).not.toMatch(/exclusion criteria/i);
    const s1501Parsed = parseEligibilityText(s1501.eligibilityText);
    expect(s1501Parsed.exclusion).toEqual([]);
    expect(s1501Parsed.inclusion).toContain("Patients must not be dialysis dependent");
    expect(s1501Parsed.inclusion.some((c) => c.startsWith("Patients must be at increased risk for cardiotoxicity"))).toBe(true);
    expect(s1501Parsed.inclusion.some((c) => /^STEP \d/i.test(c))).toBe(false);
    expect(parseEligibilityText(combo.eligibilityText).exclusion).toEqual([]);
  });
});
