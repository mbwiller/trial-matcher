"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw, Sparkles } from "lucide-react";
import { Button, Eyebrow, GlassPanel, Skeleton, cn } from "@/components/ui";
import { DEMO_PATIENTS, type DemoPatient } from "@/lib/demo/patients";
import { MIN_RECORD_CHARS, useWorkspace } from "./store";
import { formatInt } from "./labels";

const READING_PHRASES = [
  "Reading the record",
  "Resolving abbreviations",
  "Extracting receptor status",
  "Building the treatment timeline",
  "Checking what trials will ask for",
];

const SKELETON_WIDTHS = ["w-[92%]", "w-[78%]", "w-[85%]", "w-[58%]", "w-[88%]", "w-[46%]"];

function ReadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % READING_PHRASES.length),
      1100,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[380px] px-6 py-6" aria-busy="true">
      <span className="sr-only" aria-live="polite">
        Structuring the record
      </span>
      <div className="space-y-3.5">
        {SKELETON_WIDTHS.map((w, i) => (
          <Skeleton key={i} className={cn("h-3", w)} />
        ))}
      </div>
      <div className="mt-8 flex items-center gap-2.5 text-[13.5px] text-ink-500" aria-hidden>
        <span className="size-1.5 shrink-0 rounded-full bg-accent-500" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="block"
          >
            {READING_PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SampleChip({
  patient,
  selected,
  disabled,
  onSelect,
}: {
  patient: DemoPatient;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      title={`${patient.label} — ${patient.subtitle}`}
      className={cn(
        "inline-flex h-9 max-w-full items-center gap-2 rounded-chip px-3.5 text-[13px] tracking-[-0.005em]",
        "transition-[background-color,color,transform,box-shadow] duration-200 ease-out-quart active:translate-y-px",
        "disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "bg-accent-100 text-accent-800 shadow-[inset_0_0_0_1px_var(--color-accent-200)]"
          : "glass-strong text-ink-800 hover:bg-white/90",
      )}
    >
      <span className="shrink-0 font-medium">{patient.label}</span>
      <span
        className={cn(
          "max-w-[220px] truncate font-normal",
          selected ? "text-accent-700" : "text-ink-400",
        )}
      >
        {patient.subtitle}
      </span>
    </button>
  );
}

export function RecordStage() {
  const recordText = useWorkspace((s) => s.recordText);
  const demoPatientId = useWorkspace((s) => s.demoPatientId);
  const extracting = useWorkspace((s) => s.extracting);
  const extractError = useWorkspace((s) => s.extractError);
  const setRecordText = useWorkspace((s) => s.setRecordText);
  const loadSample = useWorkspace((s) => s.loadSample);
  const extract = useWorkspace((s) => s.extract);

  const length = recordText.trim().length;
  const ready = length >= MIN_RECORD_CHARS;

  return (
    <section className="mx-auto w-full max-w-[760px]" aria-labelledby="record-title">
      <Eyebrow>Patient record</Eyebrow>
      <h1
        id="record-title"
        className="mt-2 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900"
      >
        Paste the record.
      </h1>
      <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-ink-500 text-pretty">
        Clinic notes, pathology, imaging, labs — as they are. The engine structures the free
        text before matching.
      </p>

      <GlassPanel
        padding="none"
        className={cn(
          "mt-7 overflow-hidden",
          !extracting &&
            "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-500",
        )}
      >
        {extracting ? (
          <ReadingState />
        ) : (
          <textarea
            value={recordText}
            onChange={(e) => setRecordText(e.target.value)}
            placeholder="Paste clinic notes, pathology, imaging and labs here."
            aria-label="Patient record"
            spellCheck={false}
            className={cn(
              "block min-h-[380px] w-full resize-y rounded-panel bg-transparent px-6 py-5 outline-none",
              "text-[14px] leading-[1.7] text-ink-800 placeholder:text-ink-300",
              "shadow-[inset_0_1px_2px_rgba(11,18,32,0.04)]",
            )}
          />
        )}
      </GlassPanel>

      {extractError && !extracting && (
        <div
          role="alert"
          className="mt-4 flex flex-col gap-3 rounded-card border border-fail-100 bg-fail-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="text-[14px] font-medium text-fail-700">
              The record could not be structured
            </div>
            <div className="mt-0.5 text-[13px] leading-snug text-fail-700">{extractError}</div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            icon={<RotateCcw />}
            onClick={() => void extract()}
            className="shrink-0"
          >
            Retry
          </Button>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="text-[12px] font-medium tracking-[0.02em] text-ink-400">Load a sample</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {DEMO_PATIENTS.map((patient) => (
              <SampleChip
                key={patient.id}
                patient={patient}
                selected={patient.id === demoPatientId}
                disabled={extracting}
                onSelect={() => loadSample(patient)}
              />
            ))}
            {DEMO_PATIENTS.length === 0 && (
              <span className="text-[13px] text-ink-400">No samples bundled.</span>
            )}
          </div>
        </div>
        <Button
          icon={<Sparkles />}
          disabled={!ready}
          loading={extracting}
          onClick={() => void extract()}
          className="shrink-0 sm:mt-5"
        >
          Structure record
        </Button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-[12.5px] leading-snug text-ink-400">
          Records are processed in memory for this session and never stored.
        </p>
        <span className="shrink-0 font-mono text-[12px] tnum text-ink-400" aria-live="off">
          {formatInt(recordText.length)} characters
        </span>
      </div>
    </section>
  );
}
