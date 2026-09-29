"use client";

import { Pencil } from "lucide-react";
import { Badge, Button, Eyebrow, GlassPanel } from "@/components/ui";
import { useWorkspace } from "./store";
import { MENOPAUSAL_LABEL, SETTING_LABEL, SEX_LABEL, biomarkerShort, patientDisplay } from "./labels";

export function PatientSummaryCard() {
  const profile = useWorkspace((s) => s.profile);
  const patientLabel = useWorkspace((s) => s.patientLabel);
  const goToStage = useWorkspace((s) => s.goToStage);

  if (!profile) return null;

  const patient = patientDisplay(profile, patientLabel);
  const d = profile.diagnosis;
  const demo = profile.demographics;
  const ecog = profile.performance.ecog?.value;
  const demographics = [
    demo.age ? `${demo.age.value}` : "",
    demo.sex ? SEX_LABEL[demo.sex.value] : "",
    demo.menopausalStatus && demo.menopausalStatus.value !== "unknown"
      ? MENOPAUSAL_LABEL[demo.menopausalStatus.value]
      : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const biomarkers = profile.biomarkers.filter((b) => b.status !== "unknown").slice(0, 8);

  return (
    <GlassPanel as="section" aria-label="Patient summary" padding="none" className="p-5">
      <Eyebrow>Patient</Eyebrow>
      <h2 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
        {patient.label}
      </h2>
      {demographics && <div className="mt-0.5 text-[13px] text-ink-500">{demographics}</div>}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {d.subtype && <Badge tone="accent">{d.subtype.value}</Badge>}
        <Badge>{SETTING_LABEL[d.setting.value]}</Badge>
        {ecog !== undefined && <Badge mono>ECOG {ecog}</Badge>}
      </div>

      <p className="mt-3 line-clamp-2 text-[13px] leading-snug text-ink-600">{d.primary.value}</p>

      {biomarkers.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {biomarkers.map((b, i) => (
            <Badge key={`${b.name}-${i}`} size="sm" tone="neutral">
              {biomarkerShort(b)}
            </Badge>
          ))}
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        icon={<Pencil />}
        onClick={() => goToStage("profile")}
        className="-ml-3 mt-4"
      >
        Edit profile
      </Button>
    </GlassPanel>
  );
}
