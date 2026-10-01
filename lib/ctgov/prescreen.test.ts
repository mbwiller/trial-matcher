import { describe, expect, it } from "vitest";
import type { Extracted, PatientProfile, Trial } from "@/lib/types";
import { prescreenTrials, summarizePrescreen } from "./prescreen";

function ex<T>(value: T): Extracted<T> {
  return { value, confidence: "high", evidence: [] };
}

function makeProfile(overrides: Partial<PatientProfile> = {}): PatientProfile {
  return {
    id: "p-test",
    demographics: { age: ex(58), sex: ex<"female">("female") },
    diagnosis: { primary: ex("Invasive ductal carcinoma, left breast"), setting: ex<"metastatic">("metastatic"), subtype: ex("HR+/HER2-") },
    biomarkers: [{ name: "PIK3CA", status: "mutated", evidence: [], confidence: "high" }],
    treatments: [],
    performance: {},
    labs: [],
    comorbidities: [],
    keyDates: [],
    openQuestions: [],
    summary: "",
    extractedAt: "2026-09-29T00:00:00Z",
    source: "llm",
    ...overrides,
  };
}

function makeTrial(nctId: string, title: string, extra: Partial<Trial> = {}): Trial {
  return {
    nctId,
    title,
    summary: "",
    phases: ["PHASE2"],
    status: "RECRUITING",
    studyType: "INTERVENTIONAL",
    primaryPurpose: "TREATMENT",
    conditions: ["Breast Cancer"],
    interventions: [{ type: "DRUG", name: "Drug" }],
    sponsor: "Sponsor",
    sex: "ALL",
    minimumAge: "18 Years",
    locations: [],
    locationCount: 1,
    countries: ["United States"],
    eligibilityText: "",
    criteria: [],
    url: `https://clinicaltrials.gov/study/${nctId}`,
    ...extra,
  };
}

const HR_MET = "in HR-positive HER2-negative metastatic breast cancer";

describe("prescreenTrials", () => {
  it("gives every study exactly one outcome, in input order, with the gate that stopped it", () => {
    const trials = [
      makeTrial("NCT00000001", `PI3K inhibitor ${HR_MET} with a PIK3CA mutation`),
      makeTrial("NCT00000002", `Abroad ${HR_MET}`, { countries: ["China"] }),
      makeTrial("NCT00000003", `Men only ${HR_MET}`, { sex: "MALE" }),
      makeTrial("NCT00000004", `Young adults ${HR_MET}`, { maximumAge: "40 Years" }),
      makeTrial("NCT00000005", `Exercise program ${HR_MET}`, { primaryPurpose: "SUPPORTIVE_CARE" }),
      makeTrial("NCT00000006", "Sacituzumab in metastatic triple-negative breast cancer"),
      makeTrial("NCT00000007", "Adjuvant endocrine therapy in HR-positive HER2-negative early breast cancer"),
      makeTrial("NCT00000008", "A study of a new tablet formulation"),
      makeTrial("NCT00000009", `Scalp cooling ${HR_MET}`, { primaryPurpose: undefined, interventions: [{ type: "DEVICE", name: "Cap" }] }),
    ];
    const { entries, selected } = prescreenTrials(makeProfile(), trials, { country: "United States" });

    expect(entries.map((e) => e.nctId)).toEqual(trials.map((t) => t.nctId));
    expect(entries.map((e) => e.reason ?? e.outcome)).toEqual([
      "selected",
      "location",
      "sex",
      "age",
      "study-type",
      "subtype",
      "setting",
      "relevance",
      "study-type",
    ]);
    expect(selected.map((t) => t.nctId)).toEqual(["NCT00000001"]);
    for (const e of entries) expect(e.signals.length, e.nctId).toBeGreaterThan(0);
    expect(entries[1].signals[0]).toBe("No site in United States (sites in China)");
    expect(entries[3].signals[0]).toBe("Age window 18–40 y; patient is 58");

    expect(summarizePrescreen(entries)).toEqual({
      harvested: 9,
      relevant: 1,
      selected: 1,
      setAside: { location: 1, sex: 1, age: 1, "study-type": 2, subtype: 1, setting: 1, relevance: 1 },
    });
  });

  it("selects the best-scoring studies up to the limit and keeps the rest as relevant", () => {
    const trials = [
      makeTrial("NCT00000010", `Endocrine therapy ${HR_MET}`),
      makeTrial("NCT00000011", `PI3K inhibitor ${HR_MET} with a PIK3CA mutation`),
      makeTrial("NCT00000012", `Chemotherapy ${HR_MET}`, { phases: ["PHASE3"] }),
    ];
    const { entries, selected } = prescreenTrials(makeProfile(), trials, { limit: 2 });
    // Biomarker match first; ties go to the later phase.
    expect(selected.map((t) => t.nctId)).toEqual(["NCT00000011", "NCT00000012"]);
    expect(entries.map((e) => e.outcome)).toEqual(["relevant", "selected", "selected"]);
  });

  it("applies no location gate when no country is configured", () => {
    const trial = makeTrial("NCT00000020", `Endocrine therapy ${HR_MET}`, { countries: ["China"] });
    expect(prescreenTrials(makeProfile(), [trial]).selected).toHaveLength(1);
    expect(prescreenTrials(makeProfile(), [trial], { country: "United States" }).selected).toHaveLength(0);
  });
});
