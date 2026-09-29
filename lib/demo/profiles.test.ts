import { describe, expect, it } from "vitest";
import type { PatientProfile } from "@/lib/types";
import { DEMO_PATIENTS, getDemoPatient } from "./patients";
import { DEMO_PROFILES } from "./profiles";

interface FoundQuote {
  path: string;
  quote: string;
}

/** Walk any value and collect every `{ quote: string }` it contains (i.e. every Evidence). */
function collectQuotes(value: unknown, path: string, out: FoundQuote[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectQuotes(item, `${path}[${i}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.quote === "string") out.push({ path, quote: obj.quote });
    for (const [key, child] of Object.entries(obj)) {
      if (key === "quote") continue;
      collectQuotes(child, `${path}.${key}`, out);
    }
  }
}

function profileFor(id: string): PatientProfile {
  const profile = DEMO_PROFILES[id];
  if (!profile) throw new Error(`No demo profile for patient "${id}"`);
  return profile;
}

describe("demo patients", () => {
  it("bundles three fictional records with stable ids", () => {
    expect(DEMO_PATIENTS.map((p) => p.id)).toEqual(["margaret-h", "danielle-r", "rosa-v"]);
    for (const p of DEMO_PATIENTS) {
      expect(getDemoPatient(p.id)).toBe(p);
      expect(p.label.length).toBeGreaterThan(0);
      expect(p.subtitle.length).toBeGreaterThan(0);
      expect(p.record).toMatch(/^MEDICAL ONCOLOGY FOLLOW-UP NOTE/);
    }
    expect(getDemoPatient("nobody")).toBeUndefined();
  });

  it("keeps every record between 2,800 and 4,500 characters", () => {
    for (const p of DEMO_PATIENTS) {
      expect(p.record.length, `${p.id} is ${p.record.length} chars`).toBeGreaterThanOrEqual(2800);
      expect(p.record.length, `${p.id} is ${p.record.length} chars`).toBeLessThanOrEqual(4500);
    }
  });

  it("has no leading indentation inside the pasted records", () => {
    for (const p of DEMO_PATIENTS) {
      const indented = p.record.split("\n").filter((line) => /^[ \t]+\S/.test(line));
      expect(indented, `${p.id}: ${indented.join(" / ")}`).toEqual([]);
    }
  });
});

describe("demo profiles", () => {
  it("has exactly one profile per demo patient, keyed and labelled consistently", () => {
    expect(Object.keys(DEMO_PROFILES).sort()).toEqual(DEMO_PATIENTS.map((p) => p.id).sort());
    for (const patient of DEMO_PATIENTS) {
      const profile = profileFor(patient.id);
      expect(profile.id).toBe(patient.id);
      expect(profile.label).toBe(patient.label);
      expect(profile.source).toBe("demo");
      expect(profile.extractedAt).toMatch(/^2026-09-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/);
    }
  });

  it("only quotes verbatim substrings of the patient's record (≤ 200 chars each)", () => {
    for (const patient of DEMO_PATIENTS) {
      const profile = profileFor(patient.id);
      const quotes: FoundQuote[] = [];
      collectQuotes(profile, patient.id, quotes);
      expect(quotes.length, `${patient.id} has no evidence quotes`).toBeGreaterThan(20);

      const missing = quotes.filter((q) => patient.record.indexOf(q.quote) === -1);
      expect(missing, `${patient.id}: quotes not found verbatim in record`).toEqual([]);

      const tooLong = quotes.filter((q) => q.quote.length > 200 || q.quote.length === 0);
      expect(tooLong, `${patient.id}: quotes with bad length`).toEqual([]);

      // Offsets are aligned by the engine at runtime; the curated fixtures leave them unset.
      for (const q of quotes) {
        expect(q.quote.trim()).toBe(q.quote);
      }
    }
  });

  it("gives every treatment at least one evidence quote and keeps them chronological", () => {
    for (const patient of DEMO_PATIENTS) {
      const { treatments } = profileFor(patient.id);
      expect(treatments.length).toBeGreaterThan(0);
      let previous = "";
      for (const t of treatments) {
        expect(t.evidence.length, `${patient.id}: "${t.name}" has no evidence`).toBeGreaterThanOrEqual(1);
        expect(t.name.length).toBeGreaterThan(0);
        const anchor = t.startDate ?? t.endDate ?? "";
        if (anchor && previous) {
          expect(anchor >= previous, `${patient.id}: "${t.name}" (${anchor}) is out of order after ${previous}`).toBe(true);
        }
        if (anchor) previous = anchor;
      }
    }
  });

  it("captures at least six biomarkers or treatments per profile", () => {
    for (const patient of DEMO_PATIENTS) {
      const profile = profileFor(patient.id);
      expect(profile.biomarkers.length + profile.treatments.length).toBeGreaterThanOrEqual(6);
      for (const b of profile.biomarkers) {
        expect(b.evidence.length, `${patient.id}: biomarker ${b.name} has no evidence`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("backs labs and key dates with evidence and writes a clinician-facing summary", () => {
    for (const patient of DEMO_PATIENTS) {
      const profile = profileFor(patient.id);
      expect(profile.summary.trim().length).toBeGreaterThan(80);
      expect(profile.openQuestions.length).toBeGreaterThan(0);
      expect(profile.diagnosis.primary.value.length).toBeGreaterThan(0);
      expect(profile.diagnosis.setting.evidence.length).toBeGreaterThanOrEqual(1);
      for (const lab of profile.labs) {
        expect(lab.evidence.length, `${patient.id}: lab ${lab.name} has no evidence`).toBeGreaterThanOrEqual(1);
      }
      for (const kd of profile.keyDates) {
        expect(kd.evidence.length, `${patient.id}: key date ${kd.label} has no evidence`).toBeGreaterThanOrEqual(1);
        expect(kd.date).toMatch(/^\d{4}(-\d{2}(-\d{2})?)?$/);
      }
    }
  });
});
