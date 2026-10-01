import { describe, expect, it } from "vitest";
import type { BiomarkerResult, Extracted, PatientProfile, TreatmentEvent, Trial } from "@/lib/types";
import {
  buildTrialQuery,
  candidatePageSize,
  conditionTerm,
  deriveSubtype,
  filterByAge,
  isBreastCancer,
  parseAgeYears,
  prioritizeTrials,
  scoreTrialRelevance,
} from "./query";

function ex<T>(value: T): Extracted<T> {
  return { value, confidence: "high", evidence: [] };
}

function biomarker(name: string, status: BiomarkerResult["status"]): BiomarkerResult {
  return { name, status, evidence: [], confidence: "high" };
}

function treatment(name: string, agents: string[], extra: Partial<TreatmentEvent> = {}): TreatmentEvent {
  return { name, agents, category: "chemotherapy", intent: "metastatic", status: "completed", evidence: [], confidence: "high", ...extra };
}

function makeProfile(overrides: Partial<PatientProfile> = {}, diagnosis: Partial<PatientProfile["diagnosis"]> = {}): PatientProfile {
  return {
    id: "p-test",
    demographics: { age: ex(54), sex: ex<"female">("female") },
    diagnosis: {
      primary: ex("Invasive ductal carcinoma, left breast"),
      setting: ex<"metastatic">("metastatic"),
      subtype: ex("HER2+"),
      ...diagnosis,
    },
    biomarkers: [],
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
    conditions: ["Breast Cancer"],
    interventions: [],
    sponsor: "Sponsor",
    sex: "ALL",
    minimumAge: "18 Years",
    locations: [],
    locationCount: 0,
    eligibilityText: "",
    criteria: [],
    url: `https://clinicaltrials.gov/study/${nctId}`,
    ...extra,
  };
}

describe("condition mapping", () => {
  it("maps breast carcinomas to the 'breast cancer' family term", () => {
    expect(isBreastCancer("Invasive ductal carcinoma, left breast")).toBe(true);
    expect(isBreastCancer("Invasive lobular carcinoma")).toBe(true);
    expect(isBreastCancer("Metastatic TNBC")).toBe(true);
    expect(isBreastCancer("Pancreatic ductal adenocarcinoma")).toBe(false);
    expect(conditionTerm("Invasive ductal carcinoma, left breast")).toBe("breast cancer");
  });

  it("uses cleaned diagnosis text for other cancers", () => {
    expect(conditionTerm("Non-small cell lung cancer, stage IV")).toBe("Non-small cell lung cancer");
    expect(conditionTerm("Metastatic colorectal adenocarcinoma")).toBe("colorectal adenocarcinoma");
    expect(conditionTerm("")).toBe("");
  });
});

describe("deriveSubtype", () => {
  it("reads the subtype shorthand", () => {
    expect(deriveSubtype(makeProfile({}, { subtype: ex("HER2+") }))).toEqual({ family: "her2-positive", her2Low: false });
    expect(deriveSubtype(makeProfile({}, { subtype: ex("TNBC") }))).toEqual({ family: "triple-negative", her2Low: false });
    expect(deriveSubtype(makeProfile({}, { subtype: ex("HR+/HER2-") }))).toEqual({ family: "hr-positive", her2Low: false });
    expect(deriveSubtype(makeProfile({}, { subtype: ex("HR+/HER2-low") }))).toEqual({ family: "hr-positive", her2Low: true });
  });

  it("falls back to receptor biomarkers when the shorthand is missing", () => {
    const tnbc = makeProfile({ biomarkers: [biomarker("ER", "negative"), biomarker("PR", "negative"), biomarker("HER2", "negative")] }, { subtype: undefined });
    expect(deriveSubtype(tnbc).family).toBe("triple-negative");
    const her2 = makeProfile({ biomarkers: [biomarker("ER", "positive"), biomarker("HER2", "amplified")] }, { subtype: undefined });
    expect(deriveSubtype(her2).family).toBe("her2-positive");
    const hr = makeProfile({ biomarkers: [biomarker("ER", "positive"), biomarker("HER2", "low")] }, { subtype: undefined });
    expect(deriveSubtype(hr)).toEqual({ family: "hr-positive", her2Low: true });
    expect(deriveSubtype(makeProfile({}, { subtype: undefined })).family).toBe("unknown");
  });
});

describe("buildTrialQuery", () => {
  it("builds a broad recruiting/interventional query for a HER2-positive metastatic female patient", () => {
    const { params, biomarkerParams, description } = buildTrialQuery(makeProfile());
    expect(params.cond).toBe("breast cancer");
    expect(params.term).toBe('(HER2-positive OR "HER2 positive") AND (metastatic OR advanced OR "stage IV")');
    expect(params.overallStatus).toEqual(["RECRUITING"]);
    expect(params.advanced).toBe("AREA[StudyType]INTERVENTIONAL AND AREA[Sex](ALL OR FEMALE)");
    expect(params.pageSize).toBe(48);
    expect(params.countTotal).toBe(true);
    expect(biomarkerParams).toBeUndefined();
    expect(description).toBe("Recruiting · Interventional · breast cancer · HER2-positive · metastatic");
  });

  it("targets residual disease for an early-stage triple-negative patient without pCR", () => {
    const profile = makeProfile(
      {
        treatments: [
          treatment("Carboplatin + paclitaxel → AC", ["carboplatin", "paclitaxel", "doxorubicin", "cyclophosphamide"], {
            intent: "neoadjuvant",
            bestResponse: "residual disease (RCB-II)",
          }),
        ],
      },
      { subtype: ex("TNBC"), setting: ex<"early">("early") },
    );
    const { params, description } = buildTrialQuery(profile);
    expect(params.term).toContain('("triple negative" OR triple-negative OR TNBC)');
    expect(params.term).toContain('"residual disease"');
    expect(description).toBe("Recruiting · Interventional · breast cancer · triple-negative · early-stage, residual disease");
  });

  it("adds a targeted biomarker query for actionable alterations", () => {
    const profile = makeProfile(
      { biomarkers: [biomarker("ER", "positive"), biomarker("HER2", "low"), biomarker("PIK3CA", "mutated")] },
      { subtype: ex("HR+/HER2-low") },
    );
    const { params, biomarkerParams, description } = buildTrialQuery(profile);
    expect(params.term).toContain("HR-positive");
    expect(params.term).toContain("HER2-low");
    expect(biomarkerParams).toBeDefined();
    expect(biomarkerParams?.term).toContain("PIK3CA");
    expect(biomarkerParams?.term).toContain("HER2-low");
    expect(biomarkerParams?.term).toContain('(metastatic OR advanced OR "stage IV")');
    expect(biomarkerParams?.advanced).toBe(params.advanced);
    expect(description).toBe("Recruiting · Interventional · breast cancer · HR-positive/HER2-low · metastatic · PIK3CA, HER2-low");
  });

  it("uses the diagnosis text for non-breast cancers and constrains sex for male patients", () => {
    const profile = makeProfile(
      { demographics: { age: ex(66), sex: ex<"male">("male") } },
      { primary: ex("Non-small cell lung cancer, stage IV"), subtype: undefined },
    );
    const { params, description } = buildTrialQuery(profile);
    expect(params.cond).toBe("Non-small cell lung cancer");
    expect(params.term).toBe('(metastatic OR advanced OR "stage IV")');
    expect(params.advanced).toBe("AREA[StudyType]INTERVENTIONAL AND AREA[Sex](ALL OR MALE)");
    expect(description).toBe("Recruiting · Interventional · Non-small cell lung cancer · metastatic");
  });

  it("omits the sex clause when sex is unknown and the term when nothing is known", () => {
    const profile = makeProfile({ demographics: {} }, { subtype: undefined, setting: ex<"unknown">("unknown") });
    const { params, description } = buildTrialQuery(profile);
    expect(params.advanced).toBe("AREA[StudyType]INTERVENTIONAL");
    expect(params.term).toBeUndefined();
    expect(description).toBe("Recruiting · Interventional · breast cancer");
  });

  it("widens the term with breadth", () => {
    const profile = makeProfile();
    expect(buildTrialQuery(profile, { breadth: "broad" }).params.term).toBe('(HER2-positive OR "HER2 positive")');
    expect(buildTrialQuery(profile, { breadth: "broad" }).description).toBe("Recruiting · Interventional · breast cancer · HER2-positive");
    expect(buildTrialQuery(profile, { breadth: "widest" }).params.term).toBeUndefined();
    expect(buildTrialQuery(profile, { breadth: "widest" }).description).toBe("Recruiting · Interventional · breast cancer");
  });

  it("scales the candidate page with the limit within bounds", () => {
    expect(candidatePageSize(5)).toBe(40);
    expect(candidatePageSize(24)).toBe(72);
    expect(candidatePageSize(50)).toBe(100);
    expect(buildTrialQuery(makeProfile(), { limit: 10 }).params.pageSize).toBe(40);
  });

  it("tolerates a sparsely populated profile", () => {
    const sparse = { diagnosis: { primary: { value: "Breast cancer" } } } as unknown as PatientProfile;
    const { params, description } = buildTrialQuery(sparse);
    expect(params.cond).toBe("breast cancer");
    expect(params.term).toBeUndefined();
    expect(description).toBe("Recruiting · Interventional · breast cancer");
  });
});

describe("age filtering", () => {
  it("parses CT.gov age strings", () => {
    expect(parseAgeYears("18 Years")).toBe(18);
    expect(parseAgeYears("6 Months")).toBe(0.5);
    expect(parseAgeYears("26 Weeks")).toBe(0.5);
    expect(parseAgeYears("N/A")).toBeUndefined();
    expect(parseAgeYears(undefined)).toBeUndefined();
  });

  it("drops trials whose age window excludes the patient", () => {
    const trials = [
      makeTrial("NCT00000001", "Adults", { minimumAge: "18 Years" }),
      makeTrial("NCT00000002", "Older adults", { minimumAge: "65 Years" }),
      makeTrial("NCT00000003", "Young adults", { minimumAge: "18 Years", maximumAge: "45 Years" }),
      makeTrial("NCT00000004", "Any age", { minimumAge: undefined }),
      makeTrial("NCT00000005", "Pediatric", { minimumAge: "6 Months", maximumAge: "17 Years" }),
    ];
    expect(filterByAge(trials, 54).map((t) => t.nctId)).toEqual(["NCT00000001", "NCT00000004"]);
    expect(filterByAge(trials, 70).map((t) => t.nctId)).toEqual(["NCT00000001", "NCT00000002", "NCT00000004"]);
    expect(filterByAge(trials, undefined)).toBe(trials);
  });
});

describe("prioritizeTrials", () => {
  const her2Meta = makeTrial("NCT00000010", "Zanidatamab vs trastuzumab in previously treated HER2-positive metastatic breast cancer", {
    conditions: ["HER2-positive Breast Cancer"],
    lastUpdated: "2026-05-01",
  });
  const her2Early = makeTrial("NCT00000011", "Neoadjuvant zanidatamab in HER2-positive early breast cancer", { lastUpdated: "2026-06-01" });
  const tnbcMeta = makeTrial("NCT00000012", "Sacituzumab govitecan in metastatic triple-negative breast cancer", { lastUpdated: "2026-07-01" });
  const generic = makeTrial("NCT00000013", "Exercise during chemotherapy for breast cancer", { lastUpdated: "2026-08-01" });

  it("ranks subtype and setting matches first and conflicts last, without mutating the input", () => {
    const input = [generic, tnbcMeta, her2Early, her2Meta];
    const ranked = prioritizeTrials(makeProfile(), input);
    expect(ranked.map((t) => t.nctId)).toEqual(["NCT00000010", "NCT00000011", "NCT00000013", "NCT00000012"]);
    expect(input.map((t) => t.nctId)).toEqual(["NCT00000013", "NCT00000012", "NCT00000011", "NCT00000010"]);
  });

  it("boosts trials that mention the patient's key biomarkers and prior therapies", () => {
    const profile = makeProfile(
      {
        biomarkers: [biomarker("ER", "positive"), biomarker("HER2", "negative"), biomarker("PIK3CA", "mutated")],
        treatments: [treatment("Palbociclib + letrozole", ["palbociclib", "letrozole"], { category: "targeted" })],
      },
      { subtype: ex("HR+/HER2-") },
    );
    const pik3ca = makeTrial("NCT00000020", "Inavolisib + fulvestrant in PIK3CA-mutated HR+/HER2- advanced breast cancer after CDK4/6 inhibitor");
    const plain = makeTrial("NCT00000021", "Endocrine therapy in HR-positive, HER2-negative advanced breast cancer");
    const her2 = makeTrial("NCT00000022", "Tucatinib in HER2-positive metastatic breast cancer");
    const ranked = prioritizeTrials(profile, [her2, plain, pik3ca]);
    expect(ranked.map((t) => t.nctId)).toEqual(["NCT00000020", "NCT00000021", "NCT00000022"]);
    const { score, reasons } = scoreTrialRelevance(profile, pik3ca);
    expect(score).toBeGreaterThan(scoreTrialRelevance(profile, plain).score);
    expect(reasons).toEqual(expect.arrayContaining(["PIK3CA in title/conditions", "prior CDK4/6 inhibitor relevant"]));
  });

  it("prefers post-neoadjuvant residual-disease trials over pre-operative ones for a patient without pCR", () => {
    const profile = makeProfile(
      { treatments: [treatment("KEYNOTE-522 regimen", ["pembrolizumab", "carboplatin", "paclitaxel"], { intent: "neoadjuvant", bestResponse: "residual disease (RCB-II)" })] },
      { subtype: ex("TNBC"), setting: ex<"early">("early") },
    );
    const postNeoadjuvant = makeTrial("NCT00000050", "Sacituzumab tirumotecan plus pembrolizumab versus TPC in TNBC who did not achieve pCR following neoadjuvant therapy");
    const preOperative = makeTrial("NCT00000051", "Neoadjuvant pembrolizumab plus chemotherapy in early-stage triple-negative breast cancer");
    const ranked = prioritizeTrials(profile, [preOperative, postNeoadjuvant]);
    expect(ranked.map((t) => t.nctId)).toEqual(["NCT00000050", "NCT00000051"]);
    expect(scoreTrialRelevance(profile, preOperative).reasons).toContain("pre-operative trial (neoadjuvant therapy already completed)");
  });

  it("weighs brain-metastasis trials by CNS status", () => {
    const brain = makeTrial("NCT00000030", "Tucatinib for HER2-positive breast cancer brain metastases");
    const noBrain = makeTrial("NCT00000031", "Tucatinib for HER2-positive metastatic breast cancer");
    const withCns = makeProfile({}, { cnsStatus: ex<"treated-stable">("treated-stable") });
    const withoutCns = makeProfile({}, { cnsStatus: ex<"none">("none") });
    expect(prioritizeTrials(withCns, [noBrain, brain])[0].nctId).toBe("NCT00000030");
    expect(prioritizeTrials(withoutCns, [brain, noBrain])[0].nctId).toBe("NCT00000031");
  });

  it("breaks ties by most recent update", () => {
    const older = makeTrial("NCT00000040", "Study A in HER2-positive metastatic breast cancer", { lastUpdated: "2025-01-01" });
    const newer = makeTrial("NCT00000041", "Study B in HER2-positive metastatic breast cancer", { lastUpdated: "2026-01-01" });
    expect(prioritizeTrials(makeProfile(), [older, newer]).map((t) => t.nctId)).toEqual(["NCT00000041", "NCT00000040"]);
  });
});
