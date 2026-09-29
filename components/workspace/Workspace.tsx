"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { EngineBadge, TopBar } from "@/components/shell";
import { Badge, Stepper } from "@/components/ui";
import { getDemoPatient } from "@/lib/demo/patients";
import { STAGES, STAGE_LABELS, useWorkspace, type Stage } from "./store";
import { patientDisplay } from "./labels";
import { RecordStage } from "./RecordStage";
import { ProfileStage } from "./ProfileStage";
import { ShortlistStage } from "./ShortlistStage";

const STEPS = STAGES.map((key) => ({ key, label: STAGE_LABELS[key] }));

const ENTER = { opacity: 0, y: 8 };
const CENTER = { opacity: 1, y: 0 };
const EXIT = { opacity: 0, y: -8 };

function StageView({ stage }: { stage: Stage }) {
  switch (stage) {
    case "record":
      return <RecordStage />;
    case "profile":
      return <ProfileStage />;
    case "shortlist":
      return <ShortlistStage />;
  }
}

/**
 * Deep link: /workspace?sample=<demo id> loads that bundled record and
 * structures it straight away (only when the workspace is still on Record).
 */
function SampleParam() {
  const params = useSearchParams();
  const sample = params.get("sample");
  const handled = useRef<string | null>(null);

  useEffect(() => {
    if (!sample || handled.current === sample) return;
    handled.current = sample;
    const state = useWorkspace.getState();
    if (state.stage !== "record") return;
    const patient = getDemoPatient(sample);
    if (!patient) return;
    state.loadSample(patient);
    void state.extract();
  }, [sample]);

  return null;
}

export function Workspace() {
  const stage = useWorkspace((s) => s.stage);
  const furthestStage = useWorkspace((s) => s.furthestStage);
  const goToStage = useWorkspace((s) => s.goToStage);
  const profile = useWorkspace((s) => s.profile);
  const patientLabel = useWorkspace((s) => s.patientLabel);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  const patient = profile ? patientDisplay(profile, patientLabel) : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <TopBar
          center={
            <Stepper
              steps={STEPS}
              current={STAGES.indexOf(stage)}
              reachable={STAGES.indexOf(furthestStage)}
              onSelect={(i) => goToStage(STAGES[i])}
            />
          }
          right={
            <>
              {patient && (
                <span className="hidden md:block">
                  <Badge tone="neutral" title="Current patient">
                    {patient.label}
                    {patient.ageSex && <span className="text-ink-400">· {patient.ageSex}</span>}
                  </Badge>
                </span>
              )}
              <EngineBadge />
            </>
          }
        />

        <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col px-6 pb-16 pt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage}
              initial={ENTER}
              animate={CENTER}
              exit={EXIT}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex flex-1 flex-col"
            >
              <StageView stage={stage} />
            </motion.div>
          </AnimatePresence>
        </main>

        <Suspense fallback={null}>
          <SampleParam />
        </Suspense>
      </div>
    </MotionConfig>
  );
}
