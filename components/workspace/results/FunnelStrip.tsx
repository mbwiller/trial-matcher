"use client";

import { useMemo } from "react";
import { ChevronRight, Workflow } from "lucide-react";
import { Button, GlassPanel, cn } from "@/components/ui";
import { summarizePrescreen } from "@/lib/ctgov/prescreen";
import { formatDate } from "@/lib/ctgov/format";
import { TIERS, TIER_DOT, TIER_SHORT, formatInt } from "../labels";
import { useTierCounts, useWorkspace } from "../store";
import { Stat, TierBar } from "./marks";

function Arrow() {
  return <ChevronRight aria-hidden className="mt-7 hidden size-4 shrink-0 text-ink-300 md:block" />;
}

/**
 * Headline numbers for the screen, left to right in the order the work
 * happened: harvested → relevant → reviewed → worth a look.
 */
export function FunnelStrip({ openItems }: { openItems: number }) {
  const trace = useWorkspace((s) => s.trace);
  const trials = useWorkspace((s) => s.trials);
  const matching = useWorkspace((s) => s.matching);
  const setView = useWorkspace((s) => s.setView);
  const tiers = useTierCounts();
  const summary = useMemo(() => (trace ? summarizePrescreen(trace.prescreen) : undefined), [trace]);
  const criteria = useMemo(() => trials.reduce((n, t) => n + t.criteria.length, 0), [trials]);
  const inPlay = tiers.strong + tiers.possible;

  return (
    <GlassPanel as="section" aria-label="Screening summary" padding="none" className="px-6 py-5">
      <div className="flex flex-wrap items-start gap-x-5 gap-y-5">
        <div className="flex min-w-0 flex-[3_1_420px] items-start gap-4">
          <Stat
            className="flex-1"
            label="Studies harvested"
            value={summary ? formatInt(summary.harvested) : formatInt(trials.length)}
            caption={
              trace
                ? trace.mode === "snapshot"
                  ? `Snapshot · ${formatDate(trace.fetchedAt.slice(0, 10))}`
                  : "Live registry"
                : "ClinicalTrials.gov"
            }
          />
          <Arrow />
          <Stat
            className="flex-1"
            label="Relevant after pre-screen"
            value={summary ? formatInt(summary.relevant) : "—"}
            caption={summary ? `${formatInt(summary.harvested - summary.relevant)} set aside` : undefined}
          />
          <Arrow />
          <Stat
            className="flex-1"
            label="Reviewed in depth"
            value={matching ? `${tiers.screened} / ${tiers.total}` : formatInt(tiers.total)}
            caption={`${formatInt(criteria)} criteria ruled on`}
          />
        </div>

        <div className="hidden w-px self-stretch bg-ink-900/[0.07] lg:block" aria-hidden />

        <div className="flex min-w-0 flex-[2_1_320px] items-start gap-6">
          <Stat className="shrink-0" hero label="Strong or possible" value={inPlay} />
          <div className="min-w-0 flex-1 pt-[18px]">
            <TierBar counts={tiers} />
            <ul className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[12px] text-ink-500">
              {TIERS.map((tier) => (
                <li key={tier} className="flex items-center gap-1.5">
                  <span aria-hidden className={cn("size-1.5 rounded-full", TIER_DOT[tier])} />
                  <span className="tnum">
                    <span className="font-medium text-ink-800">{tiers[tier]}</span> {TIER_SHORT[tier].toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden w-px self-stretch bg-ink-900/[0.07] lg:block" aria-hidden />

        <div className="flex min-w-0 flex-[1_1_200px] items-start justify-between gap-4">
          <Stat label="Open items" value={openItems} caption="To confirm" />
          <Button variant="ghost" size="sm" icon={<Workflow />} onClick={() => setView("run")} className="-mr-2 shrink-0" title="See how this list was produced">
            Screening run
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
}
