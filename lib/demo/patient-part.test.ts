import { describe, expect, it } from "vitest";
import type { PatientProfile } from "@/lib/types";
import type { DemoPatient } from "./patients";

/**
 * Validates one authored demo patient (record + curated profile) in isolation:
 *   DEMO_PATIENT=aisha-k npx vitest run lib/demo/patient-part.test.ts
 * Skipped when DEMO_PATIENT is unset (the full check lives in profiles.test.ts).
 */
const id = process.env.DEMO_PATIENT;

function collectQuotes(value: unknown, path: string, out: Array<{ path: string; quote: string }>): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectQuotes(item, `${path}[${i}]`, out));
    return;
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.quote === "string") out.push({ path, quote: obj.quote });
    for (const [key, child] of Object.entries(obj)) {
      if (key !== "quote") collectQuotes(child, `${path}.${key}`, out);
    }
  }
}

describe.skipIf(!id)(`demo patient ${id ?? ""}`, () => {
  it("is well-formed", async () => {
    const { PATIENT: patient } = (await import(`./patients/${id}.ts`)) as { PATIENT: DemoPatient };
    const { PROFILE: profile } = (await import(`./profiles/${id}.ts`)) as { PROFILE: PatientProfile };

    // Record
    expect(patient.id).toBe(id);
    expect(patient.label).toMatch(/^[A-Z][a-z]+ [A-Z]\.$/);
    expect(patient.subtitle.length).toBeGreaterThan(20);
    expect(patient.subtitle.length).toBeLessThanOrEqual(80);
    expect(patient.tags.length).toBeGreaterThanOrEqual(2);
    expect(patient.tags.length).toBeLessThanOrEqual(3);
    expect(patient.record).toMatch(/^MEDICAL ONCOLOGY /);
    expect(patient.record.length, `record is ${patient.record.length} chars`).toBeGreaterThanOrEqual(2800);
    expect(patient.record.length, `record is ${patient.record.length} chars`).toBeLessThanOrEqual(4500);
    const indented = patient.record.split("\n").filter((line) => /^[ \t]+\S/.test(line));
    expect(indented, `indented lines: ${indented.join(" / ")}`).toEqual([]);

    // Profile identity
    expect(profile.id).toBe(id);
    expect(profile.label).toBe(patient.label);
    expect(profile.source).toBe("demo");
    expect(profile.extractedAt).toMatch(/^2026-09-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/);
    expect(profile.demographics.age?.value).toBe(patient.age);
    expect(profile.demographics.sex?.value).toBe(patient.sex === "F" ? "female" : "male");

    // Evidence: verbatim, trimmed, ≤ 200 chars
    const quotes: Array<{ path: string; quote: string }> = [];
    collectQuotes(profile, id!, quotes);
    expect(quotes.length, "evidence quotes").toBeGreaterThan(20);
    expect(quotes.filter((q) => !patient.record.includes(q.quote)), "quotes not found verbatim in the record").toEqual([]);
    expect(quotes.filter((q) => q.quote.length > 200 || q.quote.length === 0 || q.quote.trim() !== q.quote), "quotes with bad length or untrimmed").toEqual([]);

    // Treatments: evidence + chronological
    expect(profile.treatments.length + profile.biomarkers.length).toBeGreaterThanOrEqual(6);
    let previous = "";
    for (const t of profile.treatments) {
      expect(t.evidence.length, `"${t.name}" has no evidence`).toBeGreaterThanOrEqual(1);
      const anchor = t.startDate ?? t.endDate ?? "";
      if (anchor && previous) expect(anchor >= previous, `"${t.name}" (${anchor}) is out of order after ${previous}`).toBe(true);
      if (anchor) previous = anchor;
    }
    for (const b of profile.biomarkers) expect(b.evidence.length, `biomarker ${b.name} has no evidence`).toBeGreaterThanOrEqual(1);

    // Labs, key dates, summary
    expect(profile.summary.trim().length).toBeGreaterThan(80);
    expect(profile.openQuestions.length).toBeGreaterThan(0);
    expect(profile.diagnosis.primary.value.length).toBeGreaterThan(0);
    expect(profile.diagnosis.setting.evidence.length).toBeGreaterThanOrEqual(1);
    expect(profile.diagnosis.subtype?.value, "diagnosis.subtype is required for trial routing").toBeTruthy();
    expect(profile.performance.ecog?.value, "ECOG is required").toBeTypeOf("number");
    expect(profile.labs.length).toBeGreaterThanOrEqual(6);
    for (const lab of profile.labs) expect(lab.evidence.length, `lab ${lab.name} has no evidence`).toBeGreaterThanOrEqual(1);
    for (const kd of profile.keyDates) {
      expect(kd.evidence.length, `key date ${kd.label} has no evidence`).toBeGreaterThanOrEqual(1);
      expect(kd.date).toMatch(/^\d{4}(-\d{2}(-\d{2})?)?$/);
    }
  });
});
