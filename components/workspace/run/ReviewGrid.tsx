"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Criterion, CriterionVerdict, Trial, TrialMatch } from "@/lib/types";
import { ScoreRing, VerdictPill, cn } from "@/components/ui";
import { formatPhase, tierLabel } from "@/lib/ctgov/format";
import { VERDICT_BG, plural } from "../labels";
import { splitCounts } from "../insights";
import type { MatchStatus } from "../store";

/* ---------------------------------------------------------------------------
   One tile per study under review: a cell per criterion, filled with its
   verdict once the review has come back
   --------------------------------------------------------------------------- */

function CriteriaCells({
  trial,
  match,
  reading,
}: {
  trial: Trial;
  match?: TrialMatch;
  reading: boolean;
}) {
  const verdicts = useMemo(() => new Map((match?.verdicts ?? []).map((v) => [v.criterionId, v.status] as const)), [match]);
  const firstExclusion = trial.criteria.findIndex((c) => c.type === "exclusion");
  return (
    <div className={cn("flex flex-wrap gap-[2px]", reading && "animate-reading")} aria-hidden>
      {trial.criteria.map((c, i) => {
        const status = verdicts.get(c.id);
        return (
          <span
            key={c.id}
            className={cn(
              "h-[11px] w-[5px] origin-bottom rounded-[1.5px]",
              i === firstExclusion && i > 0 && "ml-[5px]",
              status ? cn(VERDICT_BG[status], "animate-cell-in motion-reduce:animate-none") : reading ? "bg-ink-200" : "bg-ink-100",
            )}
            style={status ? { animationDelay: `${Math.min(i * 14, 900)}ms` } : undefined}
          />
        );
      })}
    </div>
  );
}

export interface ReviewTileProps {
  trial: Trial;
  /** Present once the verdicts are revealed. */
  match?: TrialMatch;
  status: MatchStatus;
  /** Review has started for this study (the run has reached it). */
  started: boolean;
  onOpen?: () => void;
  onRetry?: () => void;
}

export function ReviewTile({ trial, match, status, started, onOpen, onRetry }: ReviewTileProps) {
  const reading = started && !match && status !== "error";
  const counts = match ? splitCounts(trial, match) : undefined;
  const blocked = counts ? counts.notMet + counts.excludes : 0;

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate font-mono text-[11px] tnum text-ink-400">
          {trial.nctId} <span className="font-sans">· {formatPhase(trial.phases)}</span>
        </span>
        {match ? (
          <ScoreRing value={match.score} tier={match.tier} size={30} strokeWidth={3} className="-my-1 animate-fade-up" />
        ) : (
          <span className={cn("shrink-0 text-[11.5px]", reading ? "text-accent-700" : "text-ink-300")}>
            {status === "error" ? "" : reading ? `Reading ${trial.criteria.length}` : "Queued"}
          </span>
        )}
      </div>
      <div
        className={cn(
          "mt-1.5 line-clamp-2 min-h-[34px] text-[12.5px] font-medium leading-[1.35] transition-colors duration-300",
          match ? "text-ink-900" : reading ? "text-ink-600" : "text-ink-400",
        )}
      >
        {trial.title}
      </div>
      <div className="mt-2.5">
        <CriteriaCells trial={trial} match={match} reading={reading} />
      </div>
      <div className="mt-2 min-h-[16px] text-[11.5px] leading-none text-ink-500">
        {match && counts ? (
          <span className="animate-fade-up tnum">
            <span className="font-medium text-ink-700">{tierLabel(match.tier)}</span> · {counts.met} met
            {counts.open > 0 && ` · ${counts.open} open`}
            {blocked > 0 && ` · ${plural(blocked, "blocker")}`}
          </span>
        ) : status === "error" ? (
          <span className="text-fail-700">Could not be screened</span>
        ) : (
          <span className="text-ink-300">{plural(trial.criteria.length, "criterion", "criteria")}</span>
        )}
      </div>
    </>
  );

  const shell = "block w-full rounded-field glass-soft p-3 text-left";
  if (status === "error" && !match) {
    return (
      <div className={shell}>
        {body}
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex h-6 items-center gap-1 rounded-chip px-2 text-[11.5px] font-medium text-ink-600 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
        >
          <RotateCcw className="size-3" aria-hidden /> Retry
        </button>
      </div>
    );
  }
  if (match && onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        title="Open this study in the results"
        className={cn(shell, "transition-[background-color,transform] duration-200 ease-out-quart hover:-translate-y-px hover:bg-white/70")}
      >
        {body}
      </button>
    );
  }
  return (
    <div className={shell} aria-busy={reading || undefined}>
      {body}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Reviewer log: the verdicts that matter most, as they are revealed
   --------------------------------------------------------------------------- */

interface LogLine {
  key: string;
  nctId: string;
  criterion: Criterion;
  verdict: CriterionVerdict;
}

const LINES_PER_TRIAL = 4;
const STATUS_PRIORITY: Record<CriterionVerdict["status"], number> = { fail: 0, unknown: 1, pass: 2, "not-applicable": 3 };

/** The few verdicts of a review worth surfacing: blockers, then open items, then evidence-backed passes. */
export function notableVerdicts(trial: Trial, match: TrialMatch): LogLine[] {
  const criteria = new Map(trial.criteria.map((c) => [c.id, c] as const));
  return match.verdicts
    .map((verdict, index) => ({ verdict, index, criterion: criteria.get(verdict.criterionId) }))
    .filter((x): x is { verdict: CriterionVerdict; index: number; criterion: Criterion } => !!x.criterion && x.verdict.status !== "not-applicable")
    .filter((x) => x.verdict.status !== "pass" || x.verdict.evidence.length > 0)
    .sort((a, b) => STATUS_PRIORITY[a.verdict.status] - STATUS_PRIORITY[b.verdict.status] || a.index - b.index)
    .slice(0, LINES_PER_TRIAL)
    .map((x) => ({ key: x.verdict.criterionId, nctId: trial.nctId, criterion: x.criterion, verdict: x.verdict }));
}

export function ReviewerLog({
  trials,
  matches,
  revealed,
  instant,
  className,
}: {
  trials: Trial[];
  matches: Record<string, TrialMatch>;
  /** Trial ids in reveal order. */
  revealed: string[];
  /** Show everything at once (run already complete). */
  instant: boolean;
  className?: string;
}) {
  const lines = useMemo(() => {
    const byId = new Map(trials.map((t) => [t.nctId, t] as const));
    return revealed.flatMap((id) => {
      const trial = byId.get(id);
      const match = matches[id];
      return trial && match ? notableVerdicts(trial, match) : [];
    });
  }, [trials, matches, revealed]);

  const [shown, setShown] = useState(() => (instant ? lines.length : 0));
  useEffect(() => {
    if (shown >= lines.length) return;
    const backlog = lines.length - shown;
    const timer = window.setTimeout(() => setShown((n) => Math.min(lines.length, n + (backlog > 16 ? 3 : 1))), instant ? 0 : 140);
    return () => window.clearTimeout(timer);
  }, [shown, lines.length, instant]);

  const visible = lines.slice(Math.max(0, Math.min(shown, lines.length) - 7), Math.min(shown, lines.length)).reverse();

  return (
    <div className={className}>
      {visible.length === 0 ? (
        <p className="text-[12.5px] leading-snug text-ink-400">
          Verdicts appear here as each review comes back: blockers first, then open items, then what the record supports.
        </p>
      ) : (
        <ol className="flex flex-col gap-3" aria-label="Latest verdicts">
          {visible.map((line, i) => (
            <li
              key={line.key}
              className={cn("animate-fade-up transition-opacity duration-300 motion-reduce:animate-none", i >= 5 && "opacity-50")}
            >
              <div className="flex items-center gap-2">
                <VerdictPill status={line.verdict.status} type={line.criterion.type} size="sm" />
                <span className="font-mono text-[10.5px] tnum text-ink-400">{line.nctId}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-ink-800">{line.criterion.text}</p>
              {line.verdict.evidence[0] ? (
                <p className="mt-1 truncate border-l-2 border-accent-300 pl-2 text-[12px] leading-snug text-ink-500">
                  “{line.verdict.evidence[0].quote}”
                </p>
              ) : (
                line.verdict.actionNeeded && (
                  <p className="mt-1 truncate text-[12px] leading-snug text-warn-700">{line.verdict.actionNeeded}</p>
                )
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
