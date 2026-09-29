import { Eyebrow, GlassPanel, cn } from "@/components/ui";

interface Step {
  number: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Paste the record",
    body: "Notes, pathology and labs, exactly as they read in the chart. Nothing is stored server-side.",
  },
  {
    number: "02",
    title: "Review the structured profile",
    body: "Stage, receptors, biomarkers and treatment lines, each with the quote it came from. Correct anything before it goes further.",
  },
  {
    number: "03",
    title: "Screen the shortlist",
    body: "Recruiting trials ranked by fit, every criterion with a verdict and its evidence. Confirm, dismiss or flag.",
  },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <section
      id="how"
      tabIndex={-1}
      aria-labelledby="how-title"
      className={cn("mx-auto w-full max-w-[1180px] scroll-mt-8 px-6 outline-none", className)}
    >
      <div className="mb-8 max-w-[560px] md:mb-10">
        <Eyebrow>How it works</Eyebrow>
        <h2
          id="how-title"
          className="mt-3 text-balance text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900"
        >
          From the chart to a shortlist in three steps.
        </h2>
      </div>

      <GlassPanel padding="none">
        <ol className="grid grid-cols-1 divide-y divide-ink-900/[0.06] min-[900px]:grid-cols-3 min-[900px]:divide-x min-[900px]:divide-y-0">
          {STEPS.map((step) => (
            <li key={step.number} className="px-6 py-6 md:px-8 md:py-8">
              <span className="font-mono text-[13px] font-medium tnum text-accent-700">
                {step.number}
              </span>
              <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-[14px] leading-relaxed text-ink-600">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </section>
  );
}
