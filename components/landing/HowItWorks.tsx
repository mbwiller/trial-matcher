import type { ReactNode } from "react";
import { Quote } from "lucide-react";
import type { VerdictStatus } from "@/lib/types";
import { Eyebrow, GlassPanel, ScoreRing, cn } from "@/components/ui";
import type { LandingData } from "./data";

const VERDICT_BG: Record<VerdictStatus, string> = {
  pass: "bg-pass-500",
  fail: "bg-fail-500",
  unknown: "bg-warn-500",
  "not-applicable": "bg-ink-200",
};

function Step({ number, title, caption, children }: { number: string; title: string; caption: string; children: ReactNode }) {
  return (
    <li className="flex flex-col px-6 py-7 md:px-8 md:py-8">
      <div className="flex h-[132px] flex-col justify-center" aria-hidden>
        {children}
      </div>
      <span className="mt-6 font-mono text-[13px] font-medium tnum text-accent-700">{number}</span>
      <h3 className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">{title}</h3>
      <p className="mt-1.5 text-pretty text-[14px] leading-relaxed text-ink-600">{caption}</p>
    </li>
  );
}

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[10px] bg-white/55 px-3 py-2 hairline">
      <span className="text-[11.5px] font-medium text-ink-400">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="truncate text-[13px] font-medium text-ink-900">{value}</span>
        <Quote className="size-3 shrink-0 text-accent-500" />
      </span>
    </div>
  );
}

export function HowItWorks({ data, className }: { data: LandingData; className?: string }) {
  const best = data.top[0];
  const maxGate = Math.max(1, ...data.gates.map((g) => g.count));
  return (
    <section
      id="how"
      tabIndex={-1}
      aria-labelledby="how-title"
      className={cn("mx-auto w-full max-w-[1180px] scroll-mt-8 px-6 outline-none", className)}
    >
      <div className="max-w-[600px]">
        <Eyebrow>How it works</Eyebrow>
        <h2 id="how-title" className="mt-3 text-balance text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900 md:text-[34px]">
          Three steps, nothing hidden.
        </h2>
      </div>

      <GlassPanel padding="none" className="mt-10">
        <ol className="grid grid-cols-1 divide-y divide-ink-900/[0.06] min-[900px]:grid-cols-3 min-[900px]:divide-x min-[900px]:divide-y-0">
          <Step number="01" title="Structure the record" caption="Free text becomes a profile. Every value keeps the quote it came from.">
            <div className="flex flex-col gap-1.5">
              <ProfileLine label="Subtype" value={data.patient.tags[0]} />
              <ProfileLine label="Setting" value={data.patient.tags[1]} />
              <ProfileLine label="Biomarker" value={data.patient.tags[2]} />
            </div>
          </Step>

          <Step number="02" title="Screen the registry" caption="Every recruiting study is harvested. Each one set aside gets a stated reason.">
            <div className="flex flex-col gap-2.5">
              {data.gates.map((gate) => (
                <div key={gate.label}>
                  <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
                    <span className="truncate text-ink-700">{gate.label}</span>
                    <span className="shrink-0 font-mono text-[12px] tnum text-ink-500">{gate.count.toLocaleString("en-US")}</span>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-ink-300" style={{ width: `${Math.max(1.5, (gate.count / maxGate) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Step>

          <Step number="03" title="Review the fine print" caption="Each criterion is ruled on, with its evidence. You make the call.">
            {best && (
              <div className="flex items-center gap-4">
                <ScoreRing value={best.score} tier={best.tier} size={56} strokeWidth={4.5} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-[3px]">
                    {data.topVerdicts.map((status, i) => (
                      <span key={i} className={cn("h-[14px] w-[7px] rounded-[2px]", VERDICT_BG[status])} />
                    ))}
                  </div>
                  <div className="mt-2.5 text-[12.5px] text-ink-600 tnum">
                    <span className="font-medium text-ink-900">{best.met}</span> met ·{" "}
                    <span className="font-medium text-ink-900">{best.open}</span> open ·{" "}
                    <span className="font-medium text-ink-900">{best.blocking}</span> blocking
                  </div>
                  <div className="mt-0.5 font-mono text-[11.5px] tnum text-ink-400">{best.nctId}</div>
                </div>
              </div>
            )}
          </Step>
        </ol>
      </GlassPanel>
    </section>
  );
}
