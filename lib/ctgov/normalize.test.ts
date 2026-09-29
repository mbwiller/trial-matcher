import { describe, expect, it } from "vitest";
import { normalizeStudy } from "./normalize";

/** A hand-written ClinicalTrials.gov API v2 study object (field-projected shape). */
const study = {
  protocolSection: {
    identificationModule: {
      nctId: "NCT01234567",
      briefTitle: "A Study of Drug X in HER2-positive Breast Cancer",
      officialTitle: "A Phase 1/2 Open-label Study of Drug X",
    },
    statusModule: {
      overallStatus: "RECRUITING",
      startDateStruct: { date: "2025-01-15", type: "ACTUAL" },
      primaryCompletionDateStruct: { date: "2028-06", type: "ESTIMATED" },
      lastUpdatePostDateStruct: { date: "2026-09-01", type: "ACTUAL" },
    },
    sponsorCollaboratorsModule: { leadSponsor: { name: "Acme Oncology", class: "INDUSTRY" } },
    descriptionModule: { briefSummary: "Line one.   \nLine two.  " },
    conditionsModule: { conditions: ["Breast Cancer", "HER2-positive Breast Cancer"], keywords: ["HER2", "ADC"] },
    designModule: { studyType: "INTERVENTIONAL", phases: ["PHASE1", "PHASE2"], enrollmentInfo: { count: 120, type: "ESTIMATED" } },
    armsInterventionsModule: {
      interventions: [{ type: "DRUG", name: "Drug X" }, { type: "DRUG" }, { name: "Placebo" }],
    },
    eligibilityModule: {
      eligibilityCriteria: "Inclusion Criteria:\n\n* Age ≥ 18 years\n* HER2-positive by IHC 3+\n\nExclusion Criteria:\n\n* Pregnant or breastfeeding",
      sex: "FEMALE",
      minimumAge: "18 Years",
      maximumAge: "75 Years",
    },
    contactsLocationsModule: {
      locations: Array.from({ length: 15 }, (_, i) => ({
        facility: `Site ${i + 1}`,
        city: "Boston",
        state: "Massachusetts",
        country: "United States",
        status: "RECRUITING",
        geoPoint: { lat: 42.36, lon: -71.06 },
      })),
    },
  },
  derivedSection: {},
  hasResults: false,
};

describe("normalizeStudy", () => {
  it("maps a v2 study object onto the Trial shape", () => {
    const trial = normalizeStudy(study);
    expect(trial.nctId).toBe("NCT01234567");
    expect(trial.title).toBe("A Study of Drug X in HER2-positive Breast Cancer");
    expect(trial.officialTitle).toBe("A Phase 1/2 Open-label Study of Drug X");
    expect(trial.summary).toBe("Line one.\nLine two.");
    expect(trial.phases).toEqual(["PHASE1", "PHASE2"]);
    expect(trial.status).toBe("RECRUITING");
    expect(trial.studyType).toBe("INTERVENTIONAL");
    expect(trial.conditions).toEqual(["Breast Cancer", "HER2-positive Breast Cancer"]);
    expect(trial.keywords).toEqual(["HER2", "ADC"]);
    expect(trial.interventions).toEqual([
      { type: "DRUG", name: "Drug X" },
      { type: "OTHER", name: "Placebo" },
    ]);
    expect(trial.sponsor).toBe("Acme Oncology");
    expect(trial.sex).toBe("FEMALE");
    expect(trial.minimumAge).toBe("18 Years");
    expect(trial.maximumAge).toBe("75 Years");
    expect(trial.startDate).toBe("2025-01-15");
    expect(trial.primaryCompletionDate).toBe("2028-06");
    expect(trial.lastUpdated).toBe("2026-09-01");
    expect(trial.enrollment).toBe(120);
    expect(trial.url).toBe("https://clinicaltrials.gov/study/NCT01234567");
  });

  it("keeps up to 12 representative sites but reports the true location count", () => {
    const trial = normalizeStudy(study);
    expect(trial.locations).toHaveLength(12);
    expect(trial.locationCount).toBe(15);
    expect(trial.locations[0]).toEqual({ facility: "Site 1", city: "Boston", state: "Massachusetts", country: "United States", status: "RECRUITING" });
  });

  it("parses the eligibility text into criteria with stable ids", () => {
    const trial = normalizeStudy(study);
    expect(trial.eligibilityText).toContain("Inclusion Criteria:");
    expect(trial.criteria).toEqual([
      { id: "NCT01234567-inc-1", type: "inclusion", text: "Age ≥ 18 years", category: "demographics" },
      { id: "NCT01234567-inc-2", type: "inclusion", text: "HER2-positive by IHC 3+", category: "biomarker" },
      { id: "NCT01234567-exc-1", type: "exclusion", text: "Pregnant or breastfeeding", category: "reproductive" },
    ]);
  });

  it("falls back sanely for missing or unexpected values", () => {
    const empty = normalizeStudy({});
    expect(empty.nctId).toBe("UNKNOWN");
    expect(empty.title).toBe("UNKNOWN");
    expect(empty.status).toBe("UNKNOWN");
    expect(empty.studyType).toBe("UNKNOWN");
    expect(empty.sex).toBe("ALL");
    expect(empty.sponsor).toBe("Unknown sponsor");
    expect(empty.phases).toEqual([]);
    expect(empty.conditions).toEqual([]);
    expect(empty.interventions).toEqual([]);
    expect(empty.locations).toEqual([]);
    expect(empty.locationCount).toBe(0);
    expect(empty.criteria).toEqual([]);
    expect(empty.keywords).toBeUndefined();
    expect(empty.enrollment).toBeUndefined();

    const odd = normalizeStudy({
      protocolSection: {
        identificationModule: { nctId: "NCT00000002", officialTitle: "Only an official title" },
        statusModule: { overallStatus: "SOMETHING_NEW" },
        eligibilityModule: { sex: "male" },
      },
    });
    expect(odd.title).toBe("Only an official title");
    expect(odd.status).toBe("UNKNOWN");
    expect(odd.sex).toBe("MALE");
  });
});
