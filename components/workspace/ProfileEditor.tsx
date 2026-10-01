"use client";

import { useState, type Dispatch, type KeyboardEvent, type ReactNode, type SetStateAction } from "react";
import { Plus, X } from "lucide-react";
import type {
  BiomarkerResult,
  BiomarkerStatus,
  CnsStatus,
  DiseaseSetting,
  Extracted,
  LabResult,
  MenopausalStatus,
  PatientProfile,
  Sex,
  TreatmentCategory,
  TreatmentEvent,
  TreatmentIntent,
  TreatmentStatus,
} from "@/lib/types";
import { Button, Eyebrow, GlassPanel, IconButton, Input, Select, Textarea, cn } from "@/components/ui";
import { editedField, editedRow, text } from "./profileEdits";
import {
  BIOMARKER_STATUS_LABEL,
  CNS_LABEL,
  MENOPAUSAL_LABEL,
  SETTING_LABEL,
  TREATMENT_CATEGORY_LABEL,
} from "./labels";

/* ---------------------------------------------------------------------------
   Small form pieces
   --------------------------------------------------------------------------- */

function Control({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block min-w-0", className)}>
      <span className="mb-1 block text-[11.5px] font-medium tracking-[0.02em] text-ink-400">{label}</span>
      {children}
    </label>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <GlassPanel as="section" aria-label={`Edit ${title.toLowerCase()}`}>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <Eyebrow>{title}</Eyebrow>
        {hint && <span className="text-[12px] text-ink-400">{hint}</span>}
      </div>
      {children}
    </GlassPanel>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <Button variant="ghost" size="sm" icon={<Plus />} onClick={onClick} className="-ml-3 mt-2">
      {children}
    </Button>
  );
}

/** Comma-separated list with its own text state, so typing ", " is not eaten by re-parsing. */
function ListInput({ value, onChange, placeholder }: { value: string[]; onChange: (value: string[]) => void; placeholder?: string }) {
  const [raw, setRaw] = useState(() => value.join(", "));
  return (
    <Input
      value={raw}
      placeholder={placeholder}
      onChange={(e) => {
        setRaw(e.target.value);
        onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean));
      }}
    />
  );
}

function ChipEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: Extracted<string>[];
  onChange: (items: Extracted<string>[]) => void;
  placeholder: string;
}) {
  const [entry, setEntry] = useState("");
  const add = () => {
    const value = entry.trim();
    if (!value) return;
    onChange([...items, { value, confidence: "high", evidence: [], edited: true }]);
    setEntry("");
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };
  return (
    <div>
      <div className="text-[11.5px] font-medium tracking-[0.02em] text-ink-400">{label}</div>
      {items.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <li key={`${item.value}-${i}`} className="inline-flex h-8 max-w-full items-center gap-0.5 rounded-chip glass-soft pl-3 pr-1 text-[13px] text-ink-800">
              <span className="truncate">{item.value}</span>
              <button
                type="button"
                aria-label={`Remove ${item.value}`}
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-900/[0.06] hover:text-ink-900"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex max-w-[420px] items-center gap-2">
        <Input value={entry} placeholder={placeholder} onChange={(e) => setEntry(e.target.value)} onKeyDown={onKeyDown} aria-label={`Add to ${label.toLowerCase()}`} />
        <Button variant="secondary" size="sm" onClick={add} disabled={!entry.trim()} className="h-9 shrink-0">
          Add
        </Button>
      </div>
    </div>
  );
}

const SUBTYPES = ["HR+/HER2-", "HR+/HER2-low", "HER2+", "HR+/HER2+", "TNBC"];
const SETTINGS: DiseaseSetting[] = ["early", "locally-advanced", "metastatic", "recurrent", "unknown"];
const CNS: CnsStatus[] = ["none", "treated-stable", "present-untreated", "unknown"];
const MENOPAUSE: MenopausalStatus[] = ["premenopausal", "perimenopausal", "postmenopausal", "unknown"];
const BIOMARKER_STATUSES = Object.keys(BIOMARKER_STATUS_LABEL) as BiomarkerStatus[];
const CATEGORIES = Object.keys(TREATMENT_CATEGORY_LABEL) as TreatmentCategory[];
const INTENTS: Array<{ value: TreatmentIntent; label: string }> = [
  { value: "neoadjuvant", label: "Neoadjuvant" },
  { value: "adjuvant", label: "Adjuvant" },
  { value: "metastatic", label: "Metastatic" },
  { value: "palliative", label: "Palliative" },
  { value: "unknown", label: "Not stated" },
];
const STATUSES: Array<{ value: TreatmentStatus; label: string }> = [
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "Ongoing" },
  { value: "discontinued", label: "Discontinued" },
  { value: "planned", label: "Planned" },
  { value: "unknown", label: "Not stated" },
];

/* ---------------------------------------------------------------------------
   Editor
   --------------------------------------------------------------------------- */

export interface ProfileEditorProps {
  /** The profile as it was when editing started (provenance is restored against this). */
  base: PatientProfile;
  draft: PatientProfile;
  setDraft: Dispatch<SetStateAction<PatientProfile | null>>;
}

export function ProfileEditor({ base, draft, setDraft }: ProfileEditorProps) {
  const update = (recipe: (d: PatientProfile) => PatientProfile) => setDraft((d) => (d ? recipe(d) : d));
  const dx = draft.diagnosis;
  const demo = draft.demographics;

  const setDx = <K extends keyof PatientProfile["diagnosis"]>(key: K, field: PatientProfile["diagnosis"][K]) =>
    update((d) => ({ ...d, diagnosis: { ...d.diagnosis, [key]: field } }));
  const setDemo = <K extends keyof PatientProfile["demographics"]>(key: K, field: PatientProfile["demographics"][K]) =>
    update((d) => ({ ...d, demographics: { ...d.demographics, [key]: field } }));

  const setBiomarker = (i: number, patch: Partial<BiomarkerResult>) =>
    update((d) => ({ ...d, biomarkers: d.biomarkers.map((b, j) => (j === i ? editedRow(b, patch) : b)) }));
  const setTreatment = (i: number, patch: Partial<TreatmentEvent>) =>
    update((d) => ({ ...d, treatments: d.treatments.map((t, j) => (j === i ? editedRow(t, patch) : t)) }));
  const setLab = (i: number, patch: Partial<LabResult>) =>
    update((d) => ({ ...d, labs: d.labs.map((l, j) => (j === i ? editedRow(l, patch) : l)) }));

  const subtypeValue = dx.subtype?.value ?? "";
  const subtypeOptions = subtypeValue && !SUBTYPES.includes(subtypeValue) ? [...SUBTYPES, subtypeValue] : SUBTYPES;

  return (
    <>
      <Section title="Summary">
        <Textarea
          aria-label="Summary"
          rows={5}
          value={draft.summary}
          onChange={(e) => update((d) => ({ ...d, summary: e.target.value }))}
        />
      </Section>

      <Section title="Diagnosis">
        <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
          <Control label="Primary diagnosis" className="sm:col-span-2">
            <Input
              value={dx.primary.value}
              onChange={(e) => setDx("primary", editedField(base.diagnosis.primary, e.target.value) ?? { ...base.diagnosis.primary, value: "" })}
            />
          </Control>
          <Control label="Histology">
            <Input value={dx.histology?.value ?? ""} onChange={(e) => setDx("histology", editedField(base.diagnosis.histology, text(e.target.value)))} />
          </Control>
          <Control label="Grade">
            <Input value={dx.grade?.value ?? ""} onChange={(e) => setDx("grade", editedField(base.diagnosis.grade, text(e.target.value)))} />
          </Control>
          <Control label="Subtype">
            <Select value={subtypeValue} onChange={(e) => setDx("subtype", editedField(base.diagnosis.subtype, text(e.target.value)))}>
              <option value="">Not documented</option>
              {subtypeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Control>
          <Control label="Setting">
            <Select
              value={dx.setting.value}
              onChange={(e) => setDx("setting", editedField(base.diagnosis.setting, e.target.value as DiseaseSetting) ?? base.diagnosis.setting)}
            >
              {SETTINGS.map((s) => (
                <option key={s} value={s}>
                  {SETTING_LABEL[s]}
                </option>
              ))}
            </Select>
          </Control>
          <Control label="Stage at diagnosis">
            <Input
              value={dx.stageAtDiagnosis?.value ?? ""}
              placeholder="e.g. IIB"
              onChange={(e) => setDx("stageAtDiagnosis", editedField(base.diagnosis.stageAtDiagnosis, text(e.target.value)))}
            />
          </Control>
          <Control label="TNM at diagnosis">
            <Input mono value={dx.tnm?.value ?? ""} placeholder="e.g. pT2 pN1a M0" onChange={(e) => setDx("tnm", editedField(base.diagnosis.tnm, text(e.target.value)))} />
          </Control>
          <Control label="Current stage">
            <Input
              value={dx.currentStage?.value ?? ""}
              placeholder="e.g. IV"
              onChange={(e) => setDx("currentStage", editedField(base.diagnosis.currentStage, text(e.target.value)))}
            />
          </Control>
          <Control label="Measurable disease (RECIST 1.1)">
            <Select
              value={dx.measurableDisease === undefined ? "" : dx.measurableDisease.value ? "yes" : "no"}
              onChange={(e) =>
                setDx("measurableDisease", editedField(base.diagnosis.measurableDisease, e.target.value === "" ? undefined : e.target.value === "yes"))
              }
            >
              <option value="">Not documented</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </Control>
          <Control label="Metastatic sites" className="sm:col-span-2">
            <ListInput
              value={dx.metastaticSites?.value ?? []}
              placeholder="Comma-separated, e.g. bone, liver"
              onChange={(sites) => setDx("metastaticSites", editedField(base.diagnosis.metastaticSites, sites.length ? sites : undefined))}
            />
          </Control>
          <Control label="CNS status">
            <Select
              value={dx.cnsStatus?.value ?? ""}
              onChange={(e) => setDx("cnsStatus", editedField(base.diagnosis.cnsStatus, (e.target.value || undefined) as CnsStatus | undefined))}
            >
              <option value="">Not documented</option>
              {CNS.filter((c) => c !== "unknown").map((c) => (
                <option key={c} value={c}>
                  {CNS_LABEL[c]}
                </option>
              ))}
            </Select>
          </Control>
          <Control label="Menopausal status">
            <Select
              value={demo.menopausalStatus?.value ?? ""}
              onChange={(e) =>
                setDemo("menopausalStatus", editedField(base.demographics.menopausalStatus, (e.target.value || undefined) as MenopausalStatus | undefined))
              }
            >
              <option value="">Not documented</option>
              {MENOPAUSE.filter((m) => m !== "unknown").map((m) => (
                <option key={m} value={m}>
                  {MENOPAUSAL_LABEL[m]}
                </option>
              ))}
            </Select>
          </Control>
          <Control label="Age">
            <Input
              mono
              type="number"
              min={0}
              max={120}
              value={demo.age?.value ?? ""}
              onChange={(e) => setDemo("age", editedField(base.demographics.age, e.target.value === "" ? undefined : Number(e.target.value)))}
            />
          </Control>
          <Control label="Sex">
            <Select value={demo.sex?.value ?? ""} onChange={(e) => setDemo("sex", editedField(base.demographics.sex, (e.target.value || undefined) as Sex | undefined))}>
              <option value="">Not documented</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </Control>
        </div>
      </Section>

      <Section title="Biomarkers" hint="Name, status and result detail">
        <ul className="flex flex-col gap-2">
          {draft.biomarkers.map((b, i) => (
            <li key={i} className="grid grid-cols-[minmax(0,1fr)_32px] items-start gap-2 sm:grid-cols-[120px_150px_minmax(0,1fr)_32px]">
              <Input aria-label="Biomarker name" value={b.name} placeholder="Name" onChange={(e) => setBiomarker(i, { name: e.target.value })} className="col-start-1" />
              <Select aria-label={`${b.name || "Biomarker"} status`} value={b.status} onChange={(e) => setBiomarker(i, { status: e.target.value as BiomarkerStatus })} className="col-start-1 sm:col-start-auto">
                {BIOMARKER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {BIOMARKER_STATUS_LABEL[s]}
                  </option>
                ))}
              </Select>
              <Input
                aria-label={`${b.name || "Biomarker"} detail`}
                value={b.detail ?? ""}
                placeholder="Detail, e.g. IHC 1+ or H1047R"
                onChange={(e) => setBiomarker(i, { detail: e.target.value })}
                className="col-start-1 sm:col-start-auto"
              />
              <IconButton
                label={`Remove ${b.name || "biomarker"}`}
                size="sm"
                className="col-start-2 row-start-1 mt-0.5 sm:col-start-auto sm:row-start-auto"
                onClick={() => update((d) => ({ ...d, biomarkers: d.biomarkers.filter((_, j) => j !== i) }))}
              >
                <X />
              </IconButton>
            </li>
          ))}
        </ul>
        <AddButton
          onClick={() =>
            update((d) => ({ ...d, biomarkers: [...d.biomarkers, { name: "", status: "positive", evidence: [], confidence: "high", edited: true }] }))
          }
        >
          Add biomarker
        </AddButton>
      </Section>

      <Section title="Treatment history" hint="Dates as YYYY-MM or YYYY-MM-DD">
        <ul className="flex flex-col gap-3">
          {draft.treatments.map((t, i) => (
            <li key={i} className="rounded-field glass-soft p-3">
              <div className="flex items-start gap-2">
                <Input
                  aria-label="Regimen or procedure"
                  value={t.name}
                  placeholder="Regimen or procedure"
                  // The agent list was derived from the old name; drop it so it cannot contradict the new one.
                  onChange={(e) => setTreatment(i, { name: e.target.value, agents: undefined })}
                />
                <IconButton
                  label={`Remove ${t.name || "treatment"}`}
                  size="sm"
                  className="mt-0.5"
                  onClick={() => update((d) => ({ ...d, treatments: d.treatments.filter((_, j) => j !== i) }))}
                >
                  <X />
                </IconButton>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Control label="Category">
                  <Select value={t.category} onChange={(e) => setTreatment(i, { category: e.target.value as TreatmentCategory })}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {TREATMENT_CATEGORY_LABEL[c]}
                      </option>
                    ))}
                  </Select>
                </Control>
                <Control label="Intent">
                  <Select value={t.intent} onChange={(e) => setTreatment(i, { intent: e.target.value as TreatmentIntent })}>
                    {INTENTS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </Control>
                <Control label="Status">
                  <Select value={t.status} onChange={(e) => setTreatment(i, { status: e.target.value as TreatmentStatus })}>
                    {STATUSES.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </Control>
                <Control label="Metastatic line">
                  <Input
                    mono
                    type="number"
                    min={1}
                    max={20}
                    value={t.line ?? ""}
                    placeholder="—"
                    onChange={(e) => setTreatment(i, { line: e.target.value === "" ? undefined : Number(e.target.value) })}
                  />
                </Control>
                <Control label="Start">
                  <Input mono value={t.startDate ?? ""} placeholder="YYYY-MM" onChange={(e) => setTreatment(i, { startDate: text(e.target.value) })} />
                </Control>
                <Control label="End">
                  <Input mono value={t.endDate ?? ""} placeholder="YYYY-MM" onChange={(e) => setTreatment(i, { endDate: text(e.target.value) })} />
                </Control>
                <Control label="Best response" className="col-span-2">
                  <Input value={t.bestResponse ?? ""} placeholder="e.g. PR, PD, pCR" onChange={(e) => setTreatment(i, { bestResponse: text(e.target.value) })} />
                </Control>
              </div>
            </li>
          ))}
        </ul>
        <AddButton
          onClick={() =>
            update((d) => ({
              ...d,
              treatments: [
                ...d.treatments,
                { name: "", category: "chemotherapy", intent: "unknown", status: "unknown", evidence: [], confidence: "high", edited: true },
              ],
            }))
          }
        >
          Add treatment
        </AddButton>
      </Section>

      <Section title="Performance & labs">
        <Control label="ECOG" className="max-w-[180px]">
          <Select
            value={draft.performance.ecog?.value ?? ""}
            onChange={(e) =>
              update((d) => ({
                ...d,
                performance: { ...d.performance, ecog: editedField(base.performance.ecog, e.target.value === "" ? undefined : Number(e.target.value)) },
              }))
            }
          >
            <option value="">Not documented</option>
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </Control>
        <ul className="mt-4 flex flex-col gap-2">
          {draft.labs.map((lab, i) => (
            <li key={i} className="grid grid-cols-[minmax(0,1fr)_32px] items-start gap-2 sm:grid-cols-[minmax(0,1.3fr)_88px_88px_124px_120px_32px]">
              <Input aria-label="Lab name" value={lab.name} placeholder="Lab" onChange={(e) => setLab(i, { name: e.target.value })} className="col-start-1" />
              <Input mono aria-label={`${lab.name || "Lab"} value`} value={lab.value} placeholder="Value" onChange={(e) => setLab(i, { value: e.target.value })} className="col-start-1 sm:col-start-auto" />
              <Input mono aria-label={`${lab.name || "Lab"} unit`} value={lab.unit ?? ""} placeholder="Unit" onChange={(e) => setLab(i, { unit: text(e.target.value) })} className="col-start-1 sm:col-start-auto" />
              <Input mono aria-label={`${lab.name || "Lab"} date`} value={lab.date ?? ""} placeholder="YYYY-MM-DD" onChange={(e) => setLab(i, { date: text(e.target.value) })} className="col-start-1 sm:col-start-auto" />
              <Select
                aria-label={`${lab.name || "Lab"} flag`}
                value={lab.flag ?? "unknown"}
                onChange={(e) => setLab(i, { flag: e.target.value as LabResult["flag"] })}
                className="col-start-1 sm:col-start-auto"
              >
                <option value="normal">Normal</option>
                <option value="abnormal">Abnormal</option>
                <option value="unknown">Not flagged</option>
              </Select>
              <IconButton
                label={`Remove ${lab.name || "lab"}`}
                size="sm"
                className="col-start-2 row-start-1 mt-0.5 sm:col-start-auto sm:row-start-auto"
                onClick={() => update((d) => ({ ...d, labs: d.labs.filter((_, j) => j !== i) }))}
              >
                <X />
              </IconButton>
            </li>
          ))}
        </ul>
        <AddButton onClick={() => update((d) => ({ ...d, labs: [...d.labs, { name: "", value: "", evidence: [], edited: true }] }))}>Add lab</AddButton>
      </Section>

      <Section title="Comorbidities & medications">
        <div className="flex flex-col gap-5">
          <ChipEditor
            label="Comorbidities"
            items={draft.comorbidities}
            placeholder="Add a comorbidity"
            onChange={(items) => update((d) => ({ ...d, comorbidities: items }))}
          />
          <ChipEditor
            label="Medications"
            items={draft.medications ?? []}
            placeholder="Add a medication"
            onChange={(items) => update((d) => ({ ...d, medications: items }))}
          />
          <ChipEditor label="Allergies" items={draft.allergies ?? []} placeholder="Add an allergy" onChange={(items) => update((d) => ({ ...d, allergies: items }))} />
        </div>
      </Section>

      <Section title="Open questions" hint="What trials will ask that the record does not answer">
        <ul className="flex flex-col gap-2">
          {draft.openQuestions.map((q, i) => (
            <li key={i} className="flex items-start gap-2">
              <Input
                aria-label={`Open question ${i + 1}`}
                value={q}
                onChange={(e) => update((d) => ({ ...d, openQuestions: d.openQuestions.map((x, j) => (j === i ? e.target.value : x)) }))}
              />
              <IconButton
                label="Remove open question"
                size="sm"
                className="mt-0.5"
                onClick={() => update((d) => ({ ...d, openQuestions: d.openQuestions.filter((_, j) => j !== i) }))}
              >
                <X />
              </IconButton>
            </li>
          ))}
        </ul>
        <AddButton onClick={() => update((d) => ({ ...d, openQuestions: [...d.openQuestions, ""] }))}>Add open question</AddButton>
      </Section>
    </>
  );
}
