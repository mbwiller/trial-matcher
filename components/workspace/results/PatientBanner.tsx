"use client";

import type { ReactNode } from "react";
import { FileText, Pencil } from "lucide-react";
import { Badge, Button, GlassPanel, cn } from "@/components/ui";
import { useWorkspace } from "../store";
import {
  CNS_LABEL,
  MENOPAUSAL_LABEL,
  SETTING_LABEL,
  SEX_LABEL,
  biomarkerShort,
  biomarkerTone,
  patientDisplay,
  plural,
} from "../labels";

function Item({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt className="text-[11px] font-medium tracking-[0.02em] text-ink-400">{label}</dt>
      <dd className="mt-1 min-w-0 text-[13.5px] font-medium leading-snug text-ink-900">{children}</dd>
    </div>
  );
}

/** The chart banner: who this is and the handful of facts every trial asks about. */
export function PatientBanner() {
  const profile = useWorkspace((s) => s.profile);
  const patientLabel = useWorkspace((s) => s.patientLabel);
  const goToStage = useWorkspace((s) => s.goToStage);
  const openRecord = useWorkspace((s) => s.openRecord);
  const recordOpen = useWorkspace((s) => s.recordOpen);
  const closeRecord = useWorkspace((s) => s.closeRecord);

  if (!profile) return null;

  const patient = patientDisplay(profile, patientLabel);
  const d = profile.diagnosis;
  const demo = profile.demographics;
  const demographics = [
    demo.age ? `${demo.age.value} y` : "",
    demo.sex ? SEX_LABEL[demo.sex.value] : "",
    demo.menopausalStatus && demo.menopausalStatus.value !== "unknown" ? MENOPAUSAL_LABEL[demo.menopausalStatus.value] : "",
  ].filter(Boolean);

  const stage = [d.currentStage?.value ? `Stage ${d.currentStage.value}` : d.stageAtDiagnosis?.value ? `Stage ${d.stageAtDiagnosis.value}` : "", SETTING_LABEL[d.setting.value]]
    .filter(Boolean)
    .join(" · ");

  const systemic = profile.treatments.filter((t) => t.category !== "surgery" && t.category !== "radiation" && t.category !== "other");
  const metastaticLines = new Set(profile.treatments.map((t) => t.line).filter((l): l is number => typeof l === "number")).size;
  const lastSystemic = [...systemic].reverse().find((t) => t.status !== "planned");
  const therapy =
    systemic.length === 0
      ? "No systemic therapy yet"
      : metastaticLines > 0
        ? `${plural(metastaticLines, "metastatic line")}`
        : `${plural(systemic.length, "regimen")}`;

  const ecog = profile.performance.ecog?.value;
  const cns = d.cnsStatus?.value;
  const biomarkers = profile.biomarkers.filter((b) => b.status !== "unknown").slice(0, 7);

  return (
    <GlassPanel as="section" aria-label="Patient" variant="strong" padding="none" className="px-6 py-5">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 items-center gap-3.5">
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-100 text-[13px] font-semibold tracking-[0.02em] text-accent-800"
          >
            {patient.label
              .split(/\s+/)
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
          <div className="min-w-0">
            <h1 className="text-[19px] font-semibold leading-tight tracking-[-0.015em] text-ink-900">{patient.label}</h1>
            <div className="mt-0.5 text-[13px] text-ink-500">{demographics.join(" · ") || "Demographics not documented"}</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<FileText />}
            aria-pressed={recordOpen}
            onClick={() => (recordOpen ? closeRecord() : openRecord())}
          >
            Source record
          </Button>
          <Button variant="ghost" size="sm" icon={<Pencil />} onClick={() => goToStage("profile")}>
            Edit profile
          </Button>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,0.7fr)_minmax(0,2.2fr)]">
        <Item label="Diagnosis" className="col-span-2 md:col-span-1">
          <span className="line-clamp-2">{d.primary.value}</span>
        </Item>
        <Item label="Stage and setting">
          {stage}
          {cns && cns !== "unknown" && cns !== "none" && (
            <div className="mt-0.5 text-[12.5px] font-normal text-ink-500">CNS: {CNS_LABEL[cns].toLowerCase()}</div>
          )}
        </Item>
        <Item label="Systemic therapy">
          {therapy}
          {lastSystemic && (
            <div className="mt-0.5 line-clamp-1 text-[12.5px] font-normal text-ink-500" title={lastSystemic.name}>
              Last: {lastSystemic.name}
            </div>
          )}
        </Item>
        <Item label="ECOG">{ecog !== undefined ? <span className="font-mono tnum">{ecog}</span> : "Not documented"}</Item>
        <Item label="Biomarkers" className="col-span-2 md:col-span-1">
          <div className="flex flex-wrap gap-1.5">
            {d.subtype && <Badge tone="accent">{d.subtype.value}</Badge>}
            {biomarkers.map((b, i) => (
              <Badge key={`${b.name}-${i}`} tone={biomarkerTone(b.status) === "accent" ? "neutral" : biomarkerTone(b.status)} title={b.detail}>
                {biomarkerShort(b)}
              </Badge>
            ))}
          </div>
        </Item>
      </dl>
    </GlassPanel>
  );
}
