import type { BiomarkerResult, Extracted, LabResult, PatientProfile, TreatmentEvent } from "@/lib/types";

/* ---------------------------------------------------------------------------
   Edit semantics

   The editor works on a draft of the profile. A value the clinician changes
   becomes `edited`: high confidence, no evidence (the quote no longer supports
   it). A value put back to what the extractor produced gets its provenance
   back, so only real changes are marked.
   --------------------------------------------------------------------------- */

function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/** The Extracted field after an edit; `undefined` clears an optional field. */
export function editedField<T>(base: Extracted<T> | undefined, value: T | undefined): Extracted<T> | undefined {
  if (value === undefined) return undefined;
  if (base && same(base.value, value)) return base;
  return { value, confidence: "high", evidence: [], edited: true };
}

type Row = BiomarkerResult | TreatmentEvent | LabResult;

/** A table row after an edit: marked edited, evidence dropped. */
export function editedRow<T extends Row>(row: T, patch: Partial<T>): T {
  const next = { ...row, ...patch, evidence: [], edited: true } as T;
  if ("confidence" in next) (next as BiomarkerResult | TreatmentEvent).confidence = "high";
  return next;
}

/** Empty input → an absent optional value. */
export const text = (value: string): string | undefined => (value === "" ? undefined : value);

/** Tidy a draft before it is saved: trim text, drop empty rows and blank optional fields. */
export function cleanProfile(draft: PatientProfile): PatientProfile {
  const trimField = (f: Extracted<string> | undefined): Extracted<string> | undefined => {
    if (!f) return undefined;
    const value = f.value.trim();
    return value ? (value === f.value ? f : { ...f, value }) : undefined;
  };
  const trimList = (items: Extracted<string>[] | undefined) => (items ?? []).map(trimField).filter((f): f is Extracted<string> => !!f);
  const d = draft.diagnosis;
  return {
    ...draft,
    diagnosis: {
      ...d,
      primary: { ...d.primary, value: d.primary.value.trim() },
      histology: trimField(d.histology),
      grade: trimField(d.grade),
      subtype: trimField(d.subtype),
      stageAtDiagnosis: trimField(d.stageAtDiagnosis),
      tnm: trimField(d.tnm),
      currentStage: trimField(d.currentStage),
      metastaticSites: d.metastaticSites && { ...d.metastaticSites, value: d.metastaticSites.value.map((s) => s.trim()).filter(Boolean) },
    },
    biomarkers: draft.biomarkers.filter((b) => b.name.trim()).map((b) => ({ ...b, name: b.name.trim(), detail: b.detail?.trim() || undefined })),
    treatments: draft.treatments.filter((t) => t.name.trim()).map((t) => ({ ...t, name: t.name.trim() })),
    labs: draft.labs.filter((l) => l.name.trim() && l.value.trim()).map((l) => ({ ...l, name: l.name.trim(), value: l.value.trim() })),
    comorbidities: trimList(draft.comorbidities),
    medications: trimList(draft.medications),
    allergies: trimList(draft.allergies),
    openQuestions: draft.openQuestions.map((q) => q.trim()).filter(Boolean),
    summary: draft.summary.trim(),
  };
}

/** How many values in the profile carry the clinician-edited mark. */
export function countEdited(profile: PatientProfile): number {
  let n = 0;
  const walk = (value: unknown) => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") {
      if ((value as { edited?: boolean }).edited) n++;
      Object.values(value).forEach(walk);
    }
  };
  walk(profile);
  return n;
}
