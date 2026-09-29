"use client";

import { useMemo } from "react";
import type { Evidence, TreatmentEvent } from "@/lib/types";
import { EvidencePopover, cn } from "@/components/ui";
import {
  TREATMENT_CATEGORY_LABEL,
  TREATMENT_INTENT_LABEL,
  TREATMENT_STATUS_LABEL,
  treatmentDates,
} from "./labels";

export interface TreatmentTimelineProps {
  treatments: TreatmentEvent[];
  onActiveEvidence: (evidence?: Evidence[]) => void;
}

function sortKey(t: TreatmentEvent): string {
  return t.startDate ?? t.endDate ?? "";
}

/** Chronological (oldest first); undated events keep their given position at the end. */
export function sortTreatments(treatments: TreatmentEvent[]): TreatmentEvent[] {
  return treatments
    .map((t, i) => ({ t, i }))
    .sort((a, b) => {
      const ka = sortKey(a.t);
      const kb = sortKey(b.t);
      if (ka && kb && ka !== kb) return ka < kb ? -1 : 1;
      if (ka && !kb) return -1;
      if (!ka && kb) return 1;
      return a.i - b.i;
    })
    .map(({ t }) => t);
}

function detailLine(t: TreatmentEvent): string {
  return [
    TREATMENT_CATEGORY_LABEL[t.category],
    TREATMENT_INTENT_LABEL[t.intent],
    t.line ? `Line ${t.line}` : "",
    t.bestResponse ? `Best response ${t.bestResponse}` : TREATMENT_STATUS_LABEL[t.status],
    t.reasonStopped ? `Stopped: ${t.reasonStopped}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

export function TreatmentTimeline({ treatments, onActiveEvidence }: TreatmentTimelineProps) {
  const sorted = useMemo(() => sortTreatments(treatments), [treatments]);

  if (sorted.length === 0) {
    return <p className="text-[13.5px] text-ink-400">No treatments documented.</p>;
  }

  return (
    <ol>
      {sorted.map((t, i) => {
        const first = i === 0;
        const last = i === sorted.length - 1;
        const current = t.status === "ongoing" || t.status === "planned";
        return (
          <li
            key={`${t.name}-${i}`}
            className="grid grid-cols-[112px_16px_minmax(0,1fr)] gap-x-3 sm:grid-cols-[136px_16px_minmax(0,1fr)]"
          >
            <div className="pt-px text-right font-mono text-[12px] tnum leading-[1.5] text-ink-400">
              {treatmentDates(t.startDate, t.endDate, t.status)}
            </div>
            <div className="relative flex justify-center">
              {!(first && last) && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1/2 w-0.5 -translate-x-1/2 bg-ink-200",
                    first && "top-[7px] bottom-0",
                    last && "top-0 h-[7px]",
                    !first && !last && "top-0 bottom-0",
                  )}
                />
              )}
              <span
                aria-hidden
                className={cn(
                  "relative mt-[3px] size-2 shrink-0 rounded-full",
                  current
                    ? "bg-accent-500 shadow-[0_0_0_3px_var(--color-accent-100)]"
                    : "bg-ink-300",
                )}
              />
            </div>
            <div className={cn("min-w-0", !last && "pb-5")}>
              <div className="flex items-start gap-1">
                <span className="min-w-0 text-[14px] font-medium leading-snug text-ink-900">
                  {t.name}
                  {t.confidence === "low" && (
                    <span
                      className="ml-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-warn-500 align-middle"
                      title="Low confidence — verify against the record"
                      aria-label="Low confidence"
                    />
                  )}
                </span>
                <EvidencePopover
                  evidence={t.evidence}
                  align="right"
                  className="-mt-0.5 shrink-0"
                  onActiveChange={(active) => onActiveEvidence(active ? t.evidence : undefined)}
                />
              </div>
              <div className="mt-0.5 text-[12.5px] leading-snug text-ink-500">{detailLine(t)}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
