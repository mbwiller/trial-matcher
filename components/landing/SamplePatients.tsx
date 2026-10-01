import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassPanel, cn } from "@/components/ui";
import { ButtonLink } from "./ButtonLink";
import type { LandingData } from "./data";

/** Closing call to action: pick a sample patient and watch the run. */
export function SamplePatients({ data, className }: { data: LandingData; className?: string }) {
  return (
    <section aria-labelledby="samples-title" className={cn("mx-auto w-full max-w-[1180px] px-6", className)}>
      <GlassPanel sheen padding="none" className="px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-[520px]">
            <h2 id="samples-title" className="text-balance text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink-900 md:text-[28px]">
              See it on a patient.
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
              {data.samples.length} fictional records, screened against the live registry snapshot. No API key needed.
            </p>
          </div>
          <ButtonLink href="/workspace" variant="secondary" iconRight={<ArrowRight aria-hidden />}>
            Paste your own record
          </ButtonLink>
        </div>

        <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {data.samples.map((sample) => (
            <li key={sample.id}>
              <Link
                href={`/workspace?sample=${sample.id}`}
                className="group flex h-full flex-col rounded-field glass-strong px-4 py-3.5 transition-[transform,background-color,box-shadow] duration-200 ease-out-quart hover:-translate-y-px hover:bg-white/90 hover:shadow-float"
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[14px] font-medium text-ink-900">{sample.label}</span>
                  <span className="shrink-0 font-mono text-[11.5px] tnum text-ink-400">{sample.ageSex}</span>
                </span>
                <span className="mt-1.5 truncate text-[13px] font-medium text-ink-700">{sample.tags[0]}</span>
                <span className="mt-0.5 truncate text-[12.5px] text-ink-400">{sample.tags.slice(1).join(" · ")}</span>
              </Link>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </section>
  );
}
