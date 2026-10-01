import { describe, expect, it } from "vitest";
import type { Extracted } from "@/lib/types";
import { DEMO_PROFILES } from "@/lib/demo/profiles";
import { cleanProfile, countEdited, editedField, editedRow } from "./profileEdits";

const profile = DEMO_PROFILES["margaret-h"];

describe("editedField", () => {
  const base: Extracted<number> = { value: 1, confidence: "medium", evidence: [{ quote: "EXAM: ECOG 1." }], note: "from exam" };

  it("marks a changed value as entered by the clinician and drops its evidence", () => {
    expect(editedField(base, 2)).toEqual({ value: 2, confidence: "high", evidence: [], edited: true });
  });

  it("gives a value its provenance back when it is put back", () => {
    expect(editedField(base, 1)).toBe(base);
  });

  it("clears an optional field and creates one that was missing", () => {
    expect(editedField(base, undefined)).toBeUndefined();
    expect(editedField<string>(undefined, "IV")).toEqual({ value: "IV", confidence: "high", evidence: [], edited: true });
  });
});

describe("editedRow", () => {
  it("marks the row edited, at high confidence, without evidence", () => {
    const row = editedRow(profile.biomarkers[0], { detail: "100%" });
    expect(row).toMatchObject({ name: profile.biomarkers[0].name, detail: "100%", edited: true, confidence: "high", evidence: [] });
  });
});

describe("cleanProfile", () => {
  it("leaves an untouched profile exactly as it was", () => {
    expect(JSON.stringify(cleanProfile(profile))).toBe(JSON.stringify(profile));
  });

  it("drops blank rows and blank optional fields, and trims text", () => {
    const cleaned = cleanProfile({
      ...profile,
      diagnosis: { ...profile.diagnosis, grade: { value: "  ", confidence: "high", evidence: [], edited: true } },
      biomarkers: [...profile.biomarkers, { name: " ", status: "positive", evidence: [], confidence: "high", edited: true }],
      labs: [...profile.labs, { name: "HbA1c ", value: " 5.8 ", evidence: [], edited: true }],
      openQuestions: [...profile.openQuestions, "  "],
    });
    expect(cleaned.diagnosis.grade).toBeUndefined();
    expect(cleaned.biomarkers).toHaveLength(profile.biomarkers.length);
    expect(cleaned.labs.at(-1)).toMatchObject({ name: "HbA1c", value: "5.8" });
    expect(cleaned.openQuestions).toHaveLength(profile.openQuestions.length);
  });
});

describe("countEdited", () => {
  it("counts every value carrying the edited mark", () => {
    expect(countEdited(profile)).toBe(0);
    const edited = {
      ...profile,
      performance: { ecog: editedField(profile.performance.ecog, 2) },
      labs: [...profile.labs, editedRow({ name: "HbA1c", value: "5.8", evidence: [] }, {})],
    };
    expect(countEdited(edited)).toBe(2);
  });
});
