import { Eyebrow, cn } from "@/components/ui";
import { formatDate } from "@/lib/ctgov/format";
import type { LandingData } from "./data";

function Figure({ value, children, source }: { value: string; children: React.ReactNode; source: string }) {
  return (
    <li className="flex flex-col py-7 min-[900px]:px-9 min-[900px]:py-1 min-[900px]:first:pl-0 min-[900px]:last:pr-0">
      <span className="text-[56px] font-semibold leading-none tracking-[-0.035em] text-ink-900 md:text-[64px]">{value}</span>
      <p className="mt-4 max-w-[300px] text-pretty text-[15px] leading-relaxed text-ink-700">{children}</p>
      <span className="mt-3 text-[12px] leading-snug text-ink-400">{source}</span>
    </li>
  );
}

/** Why trial matching matters, in three numbers. The third is counted from this app's own registry snapshot. */
export function Problem({ data, className }: { data: LandingData; className?: string }) {
  const { registry } = data;
  return (
    <section aria-labelledby="problem-title" className={cn("mx-auto w-full max-w-[1180px] px-6", className)}>
      <div className="max-w-[600px]">
        <Eyebrow>The problem</Eyebrow>
        <h2 id="problem-title" className="mt-3 text-balance text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900 md:text-[34px]">
          Matching is the bottleneck.
        </h2>
        <p className="mt-3 max-w-[520px] text-pretty text-[16px] leading-relaxed text-ink-500">
          Trials are how cancer care moves forward. Most never see the patients they were written for.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 divide-y divide-ink-900/[0.07] min-[900px]:mt-12 min-[900px]:grid-cols-3 min-[900px]:divide-x min-[900px]:divide-y-0">
        <Figure value="7.1%" source="Unger et al., J Clin Oncol, 2024">
          of adults with cancer enroll in a treatment trial.
        </Figure>
        <Figure value="1 in 5" source="Stensland et al., J Natl Cancer Inst, 2014">
          cancer trials never finishes. Too few patients is the leading reason.
        </Figure>
        <Figure
          value={registry.criteria.toLocaleString("en-US")}
          source={`ClinicalTrials.gov, counted ${formatDate(registry.fetchedAt.slice(0, 10))}`}
        >
          eligibility criteria across the {registry.studies.toLocaleString("en-US")} breast cancer trials recruiting today. All of it free text.
        </Figure>
      </ul>
    </section>
  );
}
