"use client";

import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui";
import { workupItems } from "../insights";
import { useRankedTrials, useWorkspace } from "../store";
import { EligibilityMatrix } from "./EligibilityMatrix";
import { FunnelStrip } from "./FunnelStrip";
import { PatientBanner } from "./PatientBanner";
import { RecordDrawer } from "./RecordDrawer";
import { TrialDetail } from "./TrialDetail";
import { WorkupPanel } from "./WorkupPanel";
import { Worklist } from "./Worklist";

/**
 * The results dashboard: who the patient is, what the screen found, the ranked
 * worklist with one trial open beside it, and two cross-trial views (where
 * each trial stands by domain, and the workup that would close open items).
 */
export function ResultsView() {
  const { all } = useRankedTrials();
  const trials = useWorkspace((s) => s.trials);
  const matchStatus = useWorkspace((s) => s.matchStatus);
  const matchError = useWorkspace((s) => s.matchError);
  const retryMatch = useWorkspace((s) => s.retryMatch);

  const workup = useMemo(() => workupItems(all), [all]);
  const openItems = workup.reduce((n, item) => n + item.open.length, 0);

  const retryFailed = () => {
    for (const t of trials) if (matchStatus[t.nctId] === "error") retryMatch(t.nctId);
  };

  return (
    <div className="flex flex-col gap-5">
      <PatientBanner />
      <FunnelStrip openItems={openItems} />

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

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(400px,460px)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Worklist />
          <div className="grid grid-cols-1 items-start gap-5 min-[1400px]:grid-cols-[minmax(0,1fr)_300px]">
            <EligibilityMatrix />
            <WorkupPanel items={workup} />
          </div>
        </div>
        <TrialDetail className="xl:sticky xl:top-[76px] xl:max-h-[calc(100vh-92px)] xl:overflow-y-auto xl:overscroll-contain" />
      </div>

      <RecordDrawer />
    </div>
  );
}
