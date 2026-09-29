import { ArrowRight } from "lucide-react";
import { Eyebrow, cn } from "@/components/ui";
import { ButtonLink } from "./ButtonLink";

/** Entrance: the `animate-fade-up` token (320 ms, ease-out-quart, opacity + 6px translate). */
const REVEAL = "animate-fade-up motion-reduce:animate-none";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-[1180px] px-6 pb-14 pt-20 md:pb-16 md:pt-24"
    >
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <Eyebrow className={REVEAL}>Clinical trial matching</Eyebrow>

        <h1
          id="hero-title"
          className={cn(
            "display mt-5 max-w-[680px] text-balance text-[44px] text-ink-900 md:text-[60px]",
            REVEAL,
            "[animation-delay:60ms]",
          )}
        >
          The registry, read for you.
        </h1>

        <p
          className={cn(
            "mt-6 max-w-[560px] text-pretty text-[17px] leading-[1.6] text-ink-500",
            REVEAL,
            "[animation-delay:120ms]",
          )}
        >
          Trial Matcher reads the patient’s record, structures the free text, and screens
          ClinicalTrials.gov criterion by criterion — so the clinician reviews a ranked shortlist
          instead of searching a maze.
        </p>

        <div
          className={cn(
            "mt-9 flex flex-col items-center gap-3 sm:flex-row",
            REVEAL,
            "[animation-delay:180ms]",
          )}
        >
          <ButtonLink href="/workspace" size="lg" iconRight={<ArrowRight aria-hidden />}>
            Open workspace
          </ButtonLink>
          <ButtonLink href="/workspace?sample=margaret-h" variant="ghost" size="lg">
            See a sample patient
          </ButtonLink>
        </div>

        <p className={cn("mt-5 text-[13px] text-ink-400", REVEAL, "[animation-delay:240ms]")}>
          Runs on bundled sample data without an API key.
        </p>
      </div>
    </section>
  );
}
