"use client";

import { CircleHelp } from "lucide-react";
import type { Criterion, CriterionVerdict } from "@/lib/types";
import { EvidencePopover, VerdictPill, cn } from "@/components/ui";

export interface CriterionRowProps {
  criterion: Criterion;
  /** Missing when the engine returned no verdict for this criterion. */
  verdict?: CriterionVerdict;
  className?: string;
}

/** VerdictPill + criterion text + rationale + evidence; unknown rows carry the action needed. */
export function CriterionRow({ criterion, verdict, className }: CriterionRowProps) {
  const status = verdict?.status ?? "unknown";
  const lowConfidence = verdict?.confidence === "low";
  return (
    <li className={cn("grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 py-3", className)}>
      <div className="flex min-w-[100px] items-center gap-1.5 pt-px">
        <VerdictPill status={status} type={criterion.type} />
        {lowConfidence && (
          <span
            className="size-1.5 shrink-0 rounded-full bg-warn-500"
            title="Low confidence — verify against the record"
            aria-label="Low confidence"
          />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[14px] leading-snug text-ink-800 text-pretty">{criterion.text}</p>
        {verdict?.rationale ? (
          <p className="mt-1 text-[13px] leading-snug text-ink-500">{verdict.rationale}</p>
        ) : (
          !verdict && <p className="mt-1 text-[13px] leading-snug text-ink-400">No verdict returned.</p>
        )}
        {verdict?.actionNeeded && (status === "unknown" || lowConfidence) && (
          <p className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-warn-700">
            <CircleHelp className="mt-[2px] size-3.5 shrink-0" aria-hidden />
            <span>{verdict.actionNeeded}</span>
          </p>
        )}
      </div>
      <div className="flex w-6 justify-end">
        {verdict && verdict.evidence.length > 0 && (
          <EvidencePopover evidence={verdict.evidence} align="right" />
        )}
      </div>
    </li>
  );
}
