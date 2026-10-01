import { ArrowRight } from "lucide-react";
import { Eyebrow, cn } from "@/components/ui";
import { ButtonLink } from "./ButtonLink";
import type { LandingData } from "./data";
import { HeroFunnel } from "./HeroFunnel";

/** Entrance: the `animate-fade-up` token (320 ms, ease-out-quart, opacity + 6px translate). */
const REVEAL = "animate-fade-up motion-reduce:animate-none";

export function Hero({ data }: { data: LandingData }) {
  return (
    <section aria-labelledby="hero-title" className="mx-auto w-full max-w-[1180px] px-6 pb-20 pt-14 md:pb-24 md:pt-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-14">
        <div className="max-w-[520px]">
          <Eyebrow className={REVEAL}>Clinical trial matching</Eyebrow>
          <h1
            id="hero-title"
            className={cn("display mt-5 text-balance text-[44px] text-ink-900 md:text-[60px]", REVEAL, "[animation-delay:60ms]")}
          >
            The registry, read for you.
          </h1>
          <p className={cn("mt-6 max-w-[440px] text-pretty text-[17px] leading-[1.6] text-ink-500", REVEAL, "[animation-delay:120ms]")}>
            Every trial states who may enroll in pages of fine print. Trial Matcher reads it against the patient’s chart, and shows its work.
          </p>
          <div className={cn("mt-9 flex flex-wrap items-center gap-3", REVEAL, "[animation-delay:180ms]")}>
            <ButtonLink href="/workspace" size="lg" iconRight={<ArrowRight aria-hidden />}>
              Open workspace
            </ButtonLink>
            <ButtonLink href={`/workspace?sample=${data.patient.id}`} variant="ghost" size="lg">
              Watch a screening run
            </ButtonLink>
          </div>
        </div>

        <div className={cn(REVEAL, "[animation-delay:160ms]")}>
          <HeroFunnel data={data} />
          <p className="mt-3 text-center text-[12px] text-ink-400">
            A fictional patient screened against {data.funnel.harvested.toLocaleString("en-US")} real, recruiting studies. One dot per study.
          </p>
        </div>
      </div>
    </section>
  );
}
