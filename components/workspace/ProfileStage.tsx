"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, FileText, Info, Pencil, RotateCcw, Search } from "lucide-react";
import {
  Badge,
  Button,
  Divider,
  EditedTag,
  EmptyState,
  EvidencePopover,
  Eyebrow,
  Field,
  GlassPanel,
  cn,
} from "@/components/ui";
import { useEngineStatus } from "@/components/shell";
import type { Confidence, Evidence, Extracted, PatientProfile } from "@/lib/types";
import { formatDate } from "@/lib/ctgov/format";
import { useWorkspace } from "./store";
import { RecordViewer } from "./RecordViewer";
import { BiomarkerTable } from "./BiomarkerTable";
import { TreatmentTimeline } from "./TreatmentTimeline";
import { ActionBar } from "./ActionBar";
import { ProfileEditor } from "./ProfileEditor";
import { cleanProfile, countEdited } from "./profileEdits";
import {
  CNS_LABEL,
  MENOPAUSAL_LABEL,
  SETTING_LABEL,
  SEX_LABEL,
  countDocuments,
  formatInt,
  patientDisplay,
  plural,
} from "./labels";

type OnActive = (evidence?: Evidence[]) => void;

const NOT_DOCUMENTED = <span className="font-normal text-ink-400">Not documented</span>;

const CONFIDENCE_RANK: Record<Confidence, number> = { high: 0, medium: 1, low: 2 };

function lowest(...values: Array<Confidence | undefined>): Confidence {
  let out: Confidence = "high";
  for (const v of values) if (v && CONFIDENCE_RANK[v] > CONFIDENCE_RANK[out]) out = v;
  return out;
}

function combine<T>(...fields: Array<Extracted<T> | undefined>): {
  evidence: Evidence[];
  confidence: Confidence;
  edited: boolean;
} {
  const present = fields.filter((f): f is Extracted<T> => f !== undefined);
  return {
    evidence: present.flatMap((f) => f.evidence),
    confidence: lowest(...present.map((f) => f.confidence)),
    edited: present.some((f) => f.edited),
  };
}

interface ExtractedFieldProps<T> {
  label: string;
  field?: Extracted<T>;
  render?: (value: T) => ReactNode;
  mono?: boolean;
  note?: string;
  className?: string;
  onActive: OnActive;
}

/** A `Field` bound to an `Extracted<T>` (confidence dot, evidence popover, highlight hook). */
function ExtractedField<T>({ label, field, render, mono, note, className, onActive }: ExtractedFieldProps<T>) {
  if (!field) return <Field label={label} value={NOT_DOCUMENTED} className={className} />;
  return (
    <Field
      label={label}
      value={render ? render(field.value) : String(field.value)}
      confidence={field.confidence}
      evidence={field.evidence}
      note={note ?? field.note}
      edited={field.edited}
      mono={mono}
      className={className}
      onActiveChange={(active) => onActive(active ? field.evidence : undefined)}
    />
  );
}

function SectionPanel({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <GlassPanel as="section" aria-label={title} className={className}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Eyebrow>{title}</Eyebrow>
        {meta}
      </div>
      {children}
    </GlassPanel>
  );
}

function SourceBadge({ profile }: { profile: PatientProfile }) {
  switch (profile.source) {
    case "demo":
      return <Badge tone="neutral">Structured by demo data</Badge>;
    case "llm":
      return (
        <Badge tone="accent">
          Structured by <span className="font-mono tnum">{profile.modelId ?? "model"}</span>
        </Badge>
      );
    default:
      return <Badge tone="neutral">Keyword screen</Badge>;
  }
}

function ConfidenceDot({ confidence }: { confidence: Confidence }) {
  if (confidence === "high") return null;
  const low = confidence === "low";
  return (
    <span
      className={cn("inline-block size-1.5 shrink-0 rounded-full", low ? "bg-warn-500" : "bg-ink-300")}
      title={low ? "Low confidence — verify against the record" : "Medium confidence — inferred from context"}
      aria-label={low ? "Low confidence" : "Medium confidence"}
    />
  );
}

function ChipList({
  label,
  items,
  onActive,
}: {
  label: string;
  items: Extracted<string>[];
  onActive: OnActive;
}) {
  return (
    <div>
      <div className="text-[11.5px] font-medium tracking-[0.02em] text-ink-400">{label}</div>
      {items.length === 0 ? (
        <div className="mt-1 text-[13.5px] text-ink-400">None documented</div>
      ) : (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <li
              key={`${item.value}-${i}`}
              className={cn(
                "inline-flex h-8 max-w-full items-center gap-1 rounded-chip glass-soft pl-3 text-[13px] text-ink-800",
                item.evidence.length > 0 && !item.edited ? "pr-1" : item.edited ? "pr-1.5" : "pr-3",
              )}
            >
              <span className="truncate">{item.value}</span>
              {item.edited ? (
                <EditedTag />
              ) : (
                <>
                  <ConfidenceDot confidence={item.confidence} />
                  <EvidencePopover
                    evidence={item.evidence}
                    align="left"
                    onActiveChange={(active) => onActive(active ? item.evidence : undefined)}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProfileStage() {
  const profile = useWorkspace((s) => s.profile);
  const recordText = useWorkspace((s) => s.recordText);
  const patientLabel = useWorkspace((s) => s.patientLabel);
  const activeEvidence = useWorkspace((s) => s.activeEvidence);
  const setActiveEvidence = useWorkspace((s) => s.setActiveEvidence);
  const confirmProfile = useWorkspace((s) => s.confirmProfile);
  const saveProfile = useWorkspace((s) => s.saveProfile);
  const resetProfile = useWorkspace((s) => s.resetProfile);
  const engine = useEngineStatus();
  /** The working copy while editing; `null` when the profile is being read. */
  const [draft, setDraft] = useState<PatientProfile | null>(null);
  const searching = useWorkspace((s) => s.searching);
  const searchError = useWorkspace((s) => s.searchError);
  const goToStage = useWorkspace((s) => s.goToStage);

  if (!profile) {
    return (
      <GlassPanel padding="none" className="mx-auto w-full max-w-[640px]">
        <EmptyState
          icon={<FileText />}
          title="No structured profile yet"
          description="Paste a record and structure it; the extracted profile will appear here for review."
          action={
            <Button variant="secondary" icon={<ArrowLeft />} onClick={() => goToStage("record")}>
              Back to record
            </Button>
          }
        />
      </GlassPanel>
    );
  }

  const onActive: OnActive = setActiveEvidence;
  const d = profile.diagnosis;
  const demo = profile.demographics;
  const patient = patientDisplay(profile, patientLabel);
  const histology = combine(d.histology, d.grade);
  const histologyValue = [d.histology?.value, d.grade?.value].filter(Boolean).join(" · ");
  const stage = combine(d.stageAtDiagnosis, d.tnm);
  const ageSex = combine<number | string>(demo.age, demo.sex);
  const ageSexValue = [
    demo.age ? String(demo.age.value) : "",
    demo.sex ? SEX_LABEL[demo.sex.value] : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const abnormalLabs = profile.labs.filter((l) => l.flag === "abnormal").length;

  const editing = draft !== null;
  const editedCount = profile.editedAt ? countEdited(profile) : 0;
  const cleaned = draft ? cleanProfile(draft) : undefined;
  const dirty = cleaned !== undefined && JSON.stringify(cleaned) !== JSON.stringify(profile);
  const valid = cleaned !== undefined && cleaned.diagnosis.primary.value.length > 0;

  const saveDraft = () => {
    if (cleaned && dirty && valid) saveProfile(cleaned);
    setDraft(null);
    setActiveEvidence(undefined);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Source record */}
        <div className="lg:col-span-5">
          <GlassPanel
            padding="none"
            as="aside"
            aria-label="Source record"
            className="flex max-h-[440px] flex-col lg:sticky lg:top-20 lg:max-h-[calc(100vh-10rem)]"
          >
            <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
              <Eyebrow>Source record</Eyebrow>
              <span className="font-mono text-[11.5px] tnum text-ink-400">
                {formatInt(recordText.length)} characters · {plural(countDocuments(recordText), "document")}
              </span>
            </div>
            <RecordViewer
              text={recordText}
              activeEvidence={activeEvidence}
              className="min-h-0 flex-1 px-5 pb-5"
            />
          </GlassPanel>
        </div>

        {/* Structured profile */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <GlassPanel as="section" aria-label="Structured profile">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <Eyebrow>Structured profile</Eyebrow>
                <h1 className="mt-1.5 text-[22px] font-semibold leading-tight tracking-[-0.015em] text-ink-900">
                  {patient.label}
                  {patient.ageSex && (
                    <span className="font-normal text-ink-400"> · {patient.ageSex}</span>
                  )}
                </h1>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                {profile.editedAt && (
                  <Badge tone="accent" dot>
                    {plural(editedCount, "value")} edited by you
                  </Badge>
                )}
                <SourceBadge profile={profile} />
              </div>
            </div>
            {!editing && (
              <GlassPanel variant="soft" size="card" padding="sm" className="mt-4">
                <p className="text-[14.5px] leading-relaxed text-ink-800 text-pretty">{profile.summary}</p>
              </GlassPanel>
            )}
            {editing && (
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-500 text-pretty">
                Correct anything the extraction got wrong, or add what the record leaves out. A value you change is marked as entered by you and
                no longer points at a quote.
              </p>
            )}
            {!editing && profile.editedAt && (
              <div className="mt-3 flex flex-wrap items-start justify-between gap-x-4 gap-y-2 rounded-field bg-accent-50 px-3.5 py-2.5 text-[13px] leading-snug text-accent-900">
                <span className="flex min-w-0 items-start gap-2">
                  <Info className="mt-[2px] size-3.5 shrink-0 text-accent-700" aria-hidden />
                  <span>
                    {profile.source === "demo"
                      ? engine?.llm
                        ? "This sample profile has been edited, so its precomputed reviews no longer apply. Trials will be reviewed again against your version."
                        : "This sample profile has been edited, so its precomputed reviews no longer apply. Without an API key, trials are re-screened by the offline keyword screen, which is far less precise."
                      : "Trials are screened against your edited version of the profile."}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={resetProfile}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md font-medium text-accent-800 transition-colors hover:text-accent-900"
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                  Discard edits
                </button>
              </div>
            )}
          </GlassPanel>

          {draft ? (
            <ProfileEditor base={profile} draft={draft} setDraft={setDraft} />
          ) : (
            <>

          <SectionPanel title="Diagnosis">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <ExtractedField label="Primary diagnosis" field={d.primary} className="sm:col-span-2" onActive={onActive} />
              {histologyValue ? (
                <Field
                  label="Histology / grade"
                  value={histologyValue}
                  confidence={histology.confidence}
                  evidence={histology.evidence}
                  edited={histology.edited}
                  onActiveChange={(a) => onActive(a ? histology.evidence : undefined)}
                />
              ) : (
                <Field label="Histology / grade" value={NOT_DOCUMENTED} />
              )}
              <ExtractedField
                label="Subtype"
                field={d.subtype}
                render={(v) => <Badge tone="accent">{v}</Badge>}
                onActive={onActive}
              />
              <ExtractedField
                label="Setting"
                field={d.setting}
                render={(v) => SETTING_LABEL[v]}
                onActive={onActive}
              />
              {d.stageAtDiagnosis || d.tnm ? (
                <Field
                  label="Stage at diagnosis"
                  value={
                    <span className="block">
                      <span>{d.stageAtDiagnosis?.value ?? NOT_DOCUMENTED}</span>
                      {d.tnm && (
                        <span className="mt-0.5 block font-mono text-[12.5px] font-normal tnum text-ink-500">
                          {d.tnm.value}
                        </span>
                      )}
                    </span>
                  }
                  confidence={stage.confidence}
                  evidence={stage.evidence}
                  edited={stage.edited}
                  note={d.stageAtDiagnosis?.note ?? d.tnm?.note}
                  onActiveChange={(a) => onActive(a ? stage.evidence : undefined)}
                />
              ) : (
                <Field label="Stage at diagnosis" value={NOT_DOCUMENTED} />
              )}
              <ExtractedField label="Current stage" field={d.currentStage} onActive={onActive} />
              <ExtractedField
                label="Metastatic sites"
                field={d.metastaticSites}
                render={(sites) =>
                  sites.length === 0 ? (
                    NOT_DOCUMENTED
                  ) : (
                    <span className="flex flex-wrap gap-1.5 pt-0.5">
                      {sites.map((s) => (
                        <Badge key={s} tone="neutral">
                          {s}
                        </Badge>
                      ))}
                    </span>
                  )
                }
                className="sm:col-span-2"
                onActive={onActive}
              />
              <ExtractedField
                label="Measurable disease"
                field={d.measurableDisease}
                render={(v) => (v ? "Yes, per RECIST 1.1" : "No")}
                onActive={onActive}
              />
              <ExtractedField
                label="CNS status"
                field={d.cnsStatus}
                render={(v) => CNS_LABEL[v]}
                onActive={onActive}
              />
              <ExtractedField
                label="Menopausal status"
                field={demo.menopausalStatus}
                render={(v) => MENOPAUSAL_LABEL[v]}
                onActive={onActive}
              />
              {ageSexValue ? (
                <Field
                  label="Age / sex"
                  value={ageSexValue}
                  confidence={ageSex.confidence}
                  evidence={ageSex.evidence}
                  edited={ageSex.edited}
                  note={demo.age?.note ?? demo.sex?.note}
                  onActiveChange={(a) => onActive(a ? ageSex.evidence : undefined)}
                />
              ) : (
                <Field label="Age / sex" value={NOT_DOCUMENTED} />
              )}
            </div>
          </SectionPanel>

          <SectionPanel
            title="Biomarkers"
            meta={
              profile.biomarkers.length > 0 ? (
                <span className="font-mono text-[11.5px] tnum text-ink-400">
                  {plural(profile.biomarkers.length, "result")}
                </span>
              ) : undefined
            }
          >
            <BiomarkerTable biomarkers={profile.biomarkers} onActiveEvidence={onActive} />
          </SectionPanel>

          <SectionPanel
            title="Treatment history"
            meta={
              profile.treatments.length > 0 ? (
                <span className="font-mono text-[11.5px] tnum text-ink-400">
                  {plural(profile.treatments.length, "event")}
                </span>
              ) : undefined
            }
          >
            <TreatmentTimeline treatments={profile.treatments} onActiveEvidence={onActive} />
            {profile.keyDates.length > 0 && (
              <>
                <Divider className="my-5" />
                <div className="text-[11.5px] font-medium tracking-[0.02em] text-ink-400">Key dates</div>
                <ul className="mt-2 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
                  {profile.keyDates.map((k, i) => (
                    <li key={`${k.label}-${i}`} className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="min-w-0 truncate text-ink-600">{k.label}</span>
                      <span className="flex shrink-0 items-center gap-0.5">
                        <span className="font-mono text-[12.5px] tnum text-ink-900">{formatDate(k.date)}</span>
                        <EvidencePopover
                          evidence={k.evidence}
                          align="right"
                          onActiveChange={(a) => onActive(a ? k.evidence : undefined)}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </SectionPanel>

          <SectionPanel
            title="Performance & labs"
            meta={
              abnormalLabs > 0 ? (
                <span className="flex items-center gap-1.5 font-mono text-[11.5px] tnum text-ink-400">
                  <span className="size-1.5 rounded-full bg-warn-500" aria-hidden />
                  {abnormalLabs} abnormal
                </span>
              ) : undefined
            }
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <ExtractedField label="ECOG" field={profile.performance.ecog} mono onActive={onActive} />
              {profile.performance.karnofsky && (
                <ExtractedField
                  label="Karnofsky"
                  field={profile.performance.karnofsky}
                  render={(v) => `${v}%`}
                  mono
                  onActive={onActive}
                />
              )}
            </div>
            {profile.labs.length > 0 && (
              <>
                <Divider className="my-5" />
                <ul className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  {profile.labs.map((lab, i) => (
                    <li
                      key={`${lab.name}-${i}`}
                      className="flex items-center gap-2 border-t border-ink-900/[0.06] py-1.5 first:border-t-0 md:[&:nth-child(2)]:border-t-0"
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[13px] text-ink-600">
                        {lab.flag === "abnormal" && (
                          <span
                            className="size-1.5 shrink-0 rounded-full bg-warn-500"
                            title="Abnormal"
                            aria-label="Abnormal"
                          />
                        )}
                        <span className="truncate">{lab.name}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[13px] tnum text-ink-900">
                        {lab.value}
                        {lab.unit ? ` ${lab.unit}` : ""}
                      </span>
                      <span className="w-[84px] shrink-0 text-right font-mono text-[11.5px] tnum text-ink-400">
                        {lab.date ? formatDate(lab.date) : ""}
                      </span>
                      <span className={cn("flex shrink-0 justify-end", lab.edited ? "w-auto" : "w-6")}>
                        {lab.edited ? (
                          <EditedTag />
                        ) : (
                          <EvidencePopover
                            evidence={lab.evidence}
                            align="right"
                            onActiveChange={(a) => onActive(a ? lab.evidence : undefined)}
                          />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </SectionPanel>

          <SectionPanel title="Comorbidities & medications">
            <div className="flex flex-col gap-5">
              <ChipList label="Comorbidities" items={profile.comorbidities} onActive={onActive} />
              <ChipList label="Medications" items={profile.medications ?? []} onActive={onActive} />
              {profile.allergies && profile.allergies.length > 0 && (
                <ChipList label="Allergies" items={profile.allergies} onActive={onActive} />
              )}
            </div>
          </SectionPanel>

          <SectionPanel
            title="Open questions"
            meta={
              <span className="font-mono text-[11.5px] tnum text-ink-400">
                {profile.openQuestions.length}
              </span>
            }
          >
            {profile.openQuestions.length === 0 ? (
              <p className="text-[13.5px] text-ink-400">
                The record answers everything trials commonly ask for.
              </p>
            ) : (
              <>
                <p className="mb-3 text-[13px] leading-snug text-ink-500">
                  Things trials will ask for that the record does not answer.
                </p>
                <ul className="space-y-2">
                  {profile.openQuestions.map((q, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] leading-snug text-ink-700">
                      <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-warn-500" aria-hidden />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </SectionPanel>
            </>
          )}
        </div>
      </div>

      <ActionBar
        message={
          searchError ? (
            <span role="alert" className="text-fail-700">
              {searchError}
            </span>
          ) : editing ? (
            valid ? (
              "Editing the profile. Nothing is applied until you save."
            ) : (
              <span className="text-warn-700">A primary diagnosis is required.</span>
            )
          ) : (
            "Review the extraction, then find trials."
          )
        }
      >
        {editing ? (
          <>
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Cancel
            </Button>
            <Button onClick={saveDraft} disabled={!valid}>
              {dirty ? "Save changes" : "Done"}
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" icon={<ArrowLeft />} onClick={() => goToStage("record")}>
              Back to record
            </Button>
            <Button variant="secondary" icon={<Pencil />} onClick={() => setDraft(profile)} disabled={searching}>
              Edit profile
            </Button>
            <Button icon={<Search />} loading={searching} onClick={() => void confirmProfile()}>
              Looks right — find trials
            </Button>
          </>
        )}
      </ActionBar>
    </div>
  );
}
