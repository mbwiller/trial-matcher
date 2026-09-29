"use client";

import { ListFilter, RotateCcw, Search } from "lucide-react";
import { Button, EmptyState, GlassPanel } from "@/components/ui";
import { useRankedTrials, useWorkspace } from "./store";
import { PatientSummaryCard } from "./PatientSummaryCard";
import { Filters } from "./Filters";
import { SummaryStrip } from "./SummaryStrip";
import { TrialCard } from "./TrialCard";
import { plural } from "./labels";

export function ShortlistStage() {
  const { visible, hidden } = useRankedTrials();
  const trials = useWorkspace((s) => s.trials);
  const matchStatus = useWorkspace((s) => s.matchStatus);
  const matchError = useWorkspace((s) => s.matchError);
  const retryMatch = useWorkspace((s) => s.retryMatch);
  const resetFilters = useWorkspace((s) => s.resetFilters);
  const goToStage = useWorkspace((s) => s.goToStage);

  const retryFailed = () => {
    for (const t of trials) if (matchStatus[t.nctId] === "error") retryMatch(t.nctId);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <h1 className="sr-only">Shortlist</h1>
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-auto lg:overscroll-contain">
        <PatientSummaryCard />
        <Filters />
      </aside>

      <div className="flex min-w-0 flex-col gap-4">
        <SummaryStrip />

        {matchError && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-fail-100 bg-fail-50 px-4 py-2.5 text-[13px] text-fail-700"
          >
            <span className="min-w-0">{matchError}</span>
            <Button variant="secondary" size="sm" icon={<RotateCcw />} onClick={retryFailed}>
              Retry
            </Button>
          </div>
        )}

        {trials.length === 0 ? (
          <GlassPanel padding="none">
            <EmptyState
              icon={<Search />}
              title="No recruiting trials matched the profile"
              description="The registry query returned nothing for this diagnosis and setting. Adjust the profile and search again."
              action={
                <Button variant="secondary" onClick={() => goToStage("profile")}>
                  Edit profile
                </Button>
              }
            />
          </GlassPanel>
        ) : visible.length === 0 ? (
          <GlassPanel padding="none">
            <EmptyState
              icon={<ListFilter />}
              title="Nothing matches these filters"
              description={`${plural(hidden, "trial")} hidden by the current filters.`}
              action={
                <Button variant="secondary" onClick={resetFilters}>
                  Clear filters
                </Button>
              }
            />
          </GlassPanel>
        ) : (
          <ol className="flex flex-col gap-3" aria-label="Ranked trials">
            {visible.map((entry) => (
              <TrialCard key={entry.trial.nctId} entry={entry} />
            ))}
          </ol>
        )}

        {trials.length > 0 && visible.length > 0 && hidden > 0 && (
          <p className="text-center text-[12.5px] text-ink-400">
            {plural(hidden, "trial")} hidden by filters ·{" "}
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-md font-medium text-accent-700 transition-colors hover:text-accent-800"
            >
              Show all
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
