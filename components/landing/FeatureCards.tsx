import { FileText, ListChecks, Stethoscope, type LucideIcon } from "lucide-react";
import { GlassPanel, cn } from "@/components/ui";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: "Structures the record",
    body: "Pulls stage, ER/PR/HER2, treatments and dates out of free-text notes, and keeps the quote it came from.",
  },
  {
    icon: ListChecks,
    title: "Matches the fine print",
    body: "Every inclusion and exclusion criterion gets a verdict, a rationale and the evidence — not a keyword hit.",
  },
  {
    icon: Stethoscope,
    title: "Clinician in the loop",
    body: "A ranked shortlist for review. Confirm, dismiss or flag; the record never leaves your deployment.",
  },
];

export function FeatureCards({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="features-title"
      className={cn("mx-auto w-full max-w-[1180px] px-6", className)}
    >
      <h2 id="features-title" className="sr-only">
        What it does
      </h2>
      <ul className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <GlassPanel as="li" key={title} size="card" padding="md" className="flex flex-col">
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-50 text-accent-700"
            >
              <Icon className="size-[18px]" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
              {title}
            </h3>
            <p className="mt-2 text-pretty text-[14px] leading-relaxed text-ink-600">{body}</p>
          </GlassPanel>
        ))}
      </ul>
    </section>
  );
}
