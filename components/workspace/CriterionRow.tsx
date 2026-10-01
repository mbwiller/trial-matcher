"use client";

import { CircleHelp } from "lucide-react";
import type { Criterion, CriterionVerdict, Evidence } from "@/lib/types";
import { VerdictPill, cn } from "@/components/ui";

export interface CriterionRowProps {
  criterion: Criterion;
  /** Missing when the engine returned no verdict for this criterion. */
  verdict?: CriterionVerdict;
  /** Called with the verdict's evidence when a quote is clicked (opens the source record at that passage). */
  onQuote?: (evidence: Evidence[]) => void;
  className?: string;
}

const CONFIDENCE_NOTE = {
  high: undefined,
  medium: { label: "Inferred", title: "Medium confidence: inferred from the record rather than stated outright" },
  low: { label: "Assumed", title: "Low confidence: assumed, to be confirmed at screening" },
} as const;

/**
 * One criterion with everything the reviewer said about it: the verdict, how
 * sure it is, the rationale, the verbatim quote(s) it rests on and, when
 * something is missing, the concrete thing to check.
 */
export function CriterionRow({ criterion, verdict, onQuote, className }: CriterionRowProps) {
  const status = verdict?.status ?? "unknown";
  const confidence = verdict ? CONFIDENCE_NOTE[verdict.confidence] : undefined;
  return (
    <li className={cn("py-3", className)}>
      <div className="flex items-center gap-2">
        <VerdictPill status={status} type={criterion.type} />
        {confidence && (
          <span className="text-[11.5px] text-ink-400" title={confidence.title}>
            {confidence.label}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-[13.5px] leading-snug text-ink-900 text-pretty">{criterion.text}</p>
      {verdict?.rationale ? (
        <p className="mt-1 text-[13px] leading-snug text-ink-500 text-pretty">{verdict.rationale}</p>
      ) : (
        !verdict && <p className="mt-1 text-[13px] leading-snug text-ink-400">No verdict returned.</p>
      )}
      {verdict && verdict.evidence.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1">
          {verdict.evidence.map((e, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => onQuote?.([e])}
                disabled={!onQuote}
                title={onQuote ? "Show this passage in the source record" : undefined}
                className={cn(
                  "block w-full border-l-2 border-accent-300 py-0.5 pl-2.5 text-left text-[12.5px] leading-snug text-ink-700",
                  onQuote && "transition-colors hover:border-accent-500 hover:text-accent-900",
                )}
              >
                “{e.quote}”{e.source && <span className="text-ink-400"> · {e.source}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
      {verdict?.actionNeeded && (
        <p className={cn("mt-2 flex items-start gap-1.5 text-[13px] leading-snug", status === "unknown" ? "text-warn-700" : "text-ink-500")}>
          <CircleHelp className="mt-[2px] size-3.5 shrink-0" aria-hidden />
          <span>{verdict.actionNeeded}</span>
        </p>
      )}
    </li>
  );
}
