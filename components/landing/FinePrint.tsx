import { CircleHelp } from "lucide-react";
import { Eyebrow, GlassPanel, VerdictPill, cn } from "@/components/ui";
import type { LandingData } from "./data";

/**
 * What matching actually is: a line in the chart set against a line in the
 * protocol. Three real pairs from the sample patient's review.
 */
export function FinePrint({ data, className }: { data: LandingData; className?: string }) {
  const { finePrint, patient } = data;
  return (
    <section aria-labelledby="fineprint-title" className={cn("mx-auto w-full max-w-[1180px] px-6", className)}>
      <div className="max-w-[600px]">
        <Eyebrow>Why it is hard</Eyebrow>
        <h2 id="fineprint-title" className="mt-3 text-balance text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900 md:text-[34px]">
          Two documents that were never meant to meet.
        </h2>
        <p className="mt-3 max-w-[540px] text-pretty text-[16px] leading-relaxed text-ink-500">
          A chart in clinical shorthand. A protocol in legal precision. Someone has to hold one against the other, line by line, for every trial.
        </p>
      </div>

      <GlassPanel padding="none" className="mt-10 overflow-hidden">
        <div className="grid grid-cols-1 gap-x-10 px-6 pb-2 pt-6 md:grid-cols-[minmax(0,5fr)_56px_minmax(0,7fr)] md:gap-x-0 md:px-8 md:pt-7">
          <div>
            <Eyebrow>The chart</Eyebrow>
            <p className="mt-1.5 text-[13px] text-ink-500">
              {patient.label} · {patient.tags.join(" · ")}
            </p>
          </div>
          <span className="hidden md:block" />
          <div className="mt-5 md:mt-0">
            <Eyebrow>The protocol</Eyebrow>
            <p className="mt-1.5 truncate text-[13px] text-ink-500">
              <span className="font-mono tnum">{finePrint.nctId}</span> · {finePrint.title}
            </p>
          </div>
        </div>

        <ol className="px-6 pb-6 md:px-8 md:pb-8">
          {finePrint.pairs.map((pair, i) => (
            <li key={i} className="grid grid-cols-1 items-center pt-5 md:grid-cols-[minmax(0,5fr)_56px_minmax(0,7fr)]">
              <div className="rounded-field glass-soft px-4 py-3">
                <p className="text-[13.5px] leading-relaxed text-ink-800">
                  <mark className="evidence-mark">{pair.quote}</mark>
                </p>
                {pair.source && <p className="mt-1.5 text-[12px] text-ink-400">{pair.source}</p>}
              </div>

              {/* Connector: a hairline between the two readings, vertical on small screens. */}
              <div className="flex items-center justify-center py-1.5 md:py-0" aria-hidden>
                <span className="size-1.5 rounded-full bg-accent-400" />
                <span className="h-4 w-px bg-accent-300 md:h-px md:w-full md:flex-1" />
                <span className="size-1.5 rounded-full bg-accent-400" />
              </div>

              <div className="rounded-field glass-soft px-4 py-3">
                <VerdictPill status={pair.status} type={pair.type} />
                <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-800" title={pair.criterion}>
                  {pair.criterion}
                </p>
                {pair.status === "unknown" && pair.action && (
                  <p className="mt-2 flex items-start gap-1.5 text-[13px] leading-snug text-warn-700">
                    <CircleHelp className="mt-[2px] size-3.5 shrink-0" aria-hidden />
                    {pair.action}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="hairline-t flex flex-col gap-1 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-[15px] font-medium text-ink-900">The reading is work a language model can do.</p>
          <p className="text-[15px] text-ink-500">The decision stays with the clinician.</p>
        </div>
      </GlassPanel>
    </section>
  );
}
