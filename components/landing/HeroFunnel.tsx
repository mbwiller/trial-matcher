"use client";

import { memo, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { GlassPanel, ScoreRing, cn } from "@/components/ui";
import type { LandingData, LandingTrial } from "./data";

/**
 * The hero figure: one screening run in miniature. Every dot is a real
 * recruiting study from the registry snapshot; the outcomes and the three
 * results are the sample patient's actual pre-screen and reviews.
 *
 * It renders complete (so it reads without JavaScript or motion), then replays:
 * harvested → pre-screened → reviewed → ranked.
 */

type Step = 0 | 1 | 2 | 3;

/** How long each step is held before the next (ms). The last entry is the hold on the finished picture. */
const HOLD: Record<Step, number> = { 0: 1500, 1: 1500, 2: 1300, 3: 5200 };

const STEP_LABEL: Record<Step, string> = {
  0: "Harvesting the registry",
  1: "Pre-screening",
  2: "Reviewing criteria",
  3: "Ranked",
};

function dotClass(code: string, step: Step): string {
  if (step === 0) return "bg-ink-300";
  if (code === "a") return "bg-ink-200/70";
  if (code === "s" && step >= 2) return "scale-[1.7] bg-accent-600";
  return "bg-accent-300";
}

const Dots = memo(function Dots({ dots, step }: { dots: string; step: Step }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,4px)] justify-between gap-[3px]" aria-hidden>
      {Array.from(dots, (code, i) => (
        <i key={i} className={cn("block size-[4px] rounded-full transition-[background-color,transform] duration-500 ease-out-quart", dotClass(code, step))} />
      ))}
    </div>
  );
});

function FunnelNumber({ value, label, lit }: { value: number; label: string; lit: boolean }) {
  return (
    <div className={cn("min-w-0 transition-opacity duration-500", lit ? "opacity-100" : "opacity-30")}>
      <div className="text-[19px] font-semibold leading-none tracking-[-0.02em] text-ink-900 tnum">{value.toLocaleString("en-US")}</div>
      <div className="mt-1 truncate text-[11.5px] text-ink-500">{label}</div>
    </div>
  );
}

function ResultRow({ trial, rank, shown, delay }: { trial: LandingTrial; rank: number; shown: boolean; delay: number }) {
  const total = trial.met + trial.open + trial.blocking;
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-field glass-soft px-3 py-2.5 transition-opacity duration-500 ease-out-quart",
        // While the run replays, the previous results stay as a faint trace so the panel never empties.
        shown ? "opacity-100" : "opacity-25",
      )}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      <span className="w-3 shrink-0 text-right font-mono text-[11px] tnum text-ink-400">{rank}</span>
      <ScoreRing value={trial.score} tier={trial.tier} size={34} strokeWidth={3} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-ink-900">{trial.title}</div>
        <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-ink-500">
          <span className="shrink-0 font-mono tnum">{trial.nctId}</span>
          <span className="text-ink-300">·</span>
          <span className="shrink-0 tnum">
            {trial.met} of {total} met{trial.open > 0 ? ` · ${trial.open} open` : ""}
          </span>
        </div>
      </div>
    </li>
  );
}

export function HeroFunnel({ data }: { data: Pick<LandingData, "patient" | "dots" | "funnel" | "top"> }) {
  const [step, setStep] = useState<Step>(3);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setStep((s) => ((s + 1) % 4) as Step), HOLD[step]);
    return () => window.clearTimeout(timer);
  }, [step]);

  const { funnel } = data;
  return (
    <GlassPanel sheen padding="none" className="p-5 sm:p-6" role="img" aria-label={`A screening run for the sample patient ${data.patient.label}: ${funnel.harvested.toLocaleString("en-US")} studies harvested, ${funnel.relevant} relevant, ${funnel.reviewed} reviewed, ${funnel.inPlay} strong or possible matches.`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 truncate text-[12.5px] text-ink-500">
          <span className="font-medium text-ink-800">{data.patient.label}</span> · {data.patient.ageSex} · {data.patient.tags.join(" · ")}
        </div>
        <div className="flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-accent-800">
          <span className={cn("size-1.5 rounded-full bg-accent-500", step < 3 && "animate-reading")} aria-hidden />
          {STEP_LABEL[step]}
        </div>
      </div>

      <div className="mt-4">
        <Dots dots={data.dots} step={step} />
      </div>

      <div className="mt-5 flex items-start gap-2.5 sm:gap-4">
        <FunnelNumber value={funnel.harvested} label="studies harvested" lit />
        <ChevronRight className="mt-1 size-3.5 shrink-0 text-ink-300" aria-hidden />
        <FunnelNumber value={funnel.relevant} label="relevant" lit={step >= 1} />
        <ChevronRight className="mt-1 size-3.5 shrink-0 text-ink-300" aria-hidden />
        <FunnelNumber value={funnel.reviewed} label="reviewed in depth" lit={step >= 2} />
        <ChevronRight className="mt-1 size-3.5 shrink-0 text-ink-300" aria-hidden />
        <FunnelNumber value={funnel.inPlay} label="worth pursuing" lit={step >= 3} />
      </div>

      <ol className="mt-5 flex flex-col gap-2">
        {data.top.map((trial, i) => (
          <ResultRow key={trial.nctId} trial={trial} rank={i + 1} shown={step >= 3} delay={i * 110} />
        ))}
      </ol>
    </GlassPanel>
  );
}
