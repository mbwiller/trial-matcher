import { describe, expect, it, vi } from "vitest";
import type { Extracted, PatientProfile, Trial } from "@/lib/types";
import type { CtgovSearchParams, CtgovTrialPage } from "./client";
import { searchTrialsForProfile } from "./search";

function ex<T>(value: T): Extracted<T> {
  return { value, confidence: "high", evidence: [] };
}

function makeProfile(overrides: Partial<PatientProfile> = {}): PatientProfile {
  return {
    id: "p-test",
    demographics: { age: ex(54), sex: ex<"female">("female") },
    diagnosis: { primary: ex("Invasive ductal carcinoma, left breast"), setting: ex<"metastatic">("metastatic"), subtype: ex("HER2+") },
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

const page = (trials: Trial[], totalCount?: number): CtgovTrialPage => ({ trials, totalCount });

describe("searchTrialsForProfile", () => {
  it("merges the main and biomarker searches, filters by age, ranks and truncates", async () => {
    const her2 = makeTrial("NCT00000001", "Zanidatamab in HER2-positive metastatic breast cancer");
    const tooOld = makeTrial("NCT00000002", "Tucatinib in HER2-positive metastatic breast cancer", { maximumAge: "50 Years" });
    const tnbc = makeTrial("NCT00000003", "Sacituzumab in triple-negative breast cancer");
    const pik3ca = makeTrial("NCT00000004", "Inavolisib in PIK3CA-mutated HER2-positive metastatic breast cancer");
    const searchPage = vi.fn(async (params: CtgovSearchParams): Promise<CtgovTrialPage> => {
      if (params.term?.includes("PIK3CA")) return page([pik3ca, her2], 5);
      return page([tnbc, tooOld, her2], 300);
    });
    const profile = makeProfile({ biomarkers: [{ name: "PIK3CA", status: "mutated", evidence: [], confidence: "high" }] });
    const result = await searchTrialsForProfile(profile, { limit: 2, searchPage, minCandidates: 1 });

    expect(searchPage).toHaveBeenCalledTimes(2);
    expect(result.source).toBe("registry");
    expect(result.totalAvailable).toBe(300);
    expect(result.trials.map((t) => t.nctId)).toEqual(["NCT00000004", "NCT00000001"]);
    expect(result.queryDescription).toBe("Recruiting · Interventional · breast cancer · HER2-positive · metastatic · PIK3CA");
  });

  it("widens the query while too few candidates come back", async () => {
    const seen: string[] = [];
    const searchPage = vi.fn(async (params: CtgovSearchParams): Promise<CtgovTrialPage> => {
      seen.push(params.term ?? "<none>");
      if (params.term?.includes("metastatic")) return page([makeTrial("NCT00000001", "Focused hit")], 1);
      if (params.term) return page([makeTrial("NCT00000002", "Broad hit")], 2);
      return page([makeTrial("NCT00000003", "Widest hit"), makeTrial("NCT00000001", "Focused hit")], 900);
    });
    const result = await searchTrialsForProfile(makeProfile(), { limit: 10, searchPage, minCandidates: 3 });
    expect(seen).toEqual(['(HER2-positive OR "HER2 positive") AND (metastatic OR advanced OR "stage IV")', '(HER2-positive OR "HER2 positive")', "<none>"]);
    expect(result.trials.map((t) => t.nctId).sort()).toEqual(["NCT00000001", "NCT00000002", "NCT00000003"]);
    expect(result.queryDescription).toBe("Recruiting · Interventional · breast cancer");
    expect(result.totalAvailable).toBe(900);
  });

  it("stops widening once enough candidates are in hand", async () => {
    const trials = Array.from({ length: 12 }, (_, i) => makeTrial(`NCT0000${String(i).padStart(4, "0")}`, `HER2-positive metastatic trial ${i}`));
    const searchPage = vi.fn(async (): Promise<CtgovTrialPage> => page(trials, 12));
    const result = await searchTrialsForProfile(makeProfile(), { limit: 5, searchPage });
    expect(searchPage).toHaveBeenCalledTimes(1);
    expect(result.trials).toHaveLength(5);
  });

  it("fails when the main search fails, but tolerates a failing biomarker or widening search", async () => {
    const failing = vi.fn(async (): Promise<CtgovTrialPage> => {
      throw new Error("boom");
    });
    await expect(searchTrialsForProfile(makeProfile(), { searchPage: failing })).rejects.toThrow("boom");

    const flaky = vi.fn(async (params: CtgovSearchParams): Promise<CtgovTrialPage> => {
      if (params.term?.includes("PIK3CA") || !params.term?.includes("metastatic")) throw new Error("secondary failure");
      return page([makeTrial("NCT00000001", "HER2-positive metastatic trial")], 1);
    });
    const profile = makeProfile({ biomarkers: [{ name: "PIK3CA", status: "mutated", evidence: [], confidence: "high" }] });
    const result = await searchTrialsForProfile(profile, { searchPage: flaky, minCandidates: 5 });
    expect(result.trials.map((t) => t.nctId)).toEqual(["NCT00000001"]);
    expect(result.queryDescription).toContain("HER2-positive · metastatic");
  });

  it("passes the caller's abort signal through to every request", async () => {
    const controller = new AbortController();
    const searchPage = vi.fn(async (_params: CtgovSearchParams, options: { signal?: AbortSignal }): Promise<CtgovTrialPage> => {
      expect(options.signal).toBe(controller.signal);
      return page([], 0);
    });
    await searchTrialsForProfile(makeProfile(), { searchPage, signal: controller.signal });
    expect(searchPage).toHaveBeenCalled();
  });
});
