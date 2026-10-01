"use client";

import { Check, ChevronDown, Flag, ListFilter, Loader2, RotateCcw, Undo2, X } from "lucide-react";
import type { MatchTier } from "@/lib/types";
import { Button, EmptyState, GlassPanel, IconButton, ScoreRing, Skeleton, Toggle, cn } from "@/components/ui";
import { formatPhase } from "@/lib/ctgov/format";
import { splitCounts } from "../insights";
import { TIERS, TIER_DOT, TIER_SHORT, formatSites, plural } from "../labels";
import {
  usePhaseOptions,
  useRankedTrials,
  useTierCounts,
  useWorkspace,
  type RankedEntry,
  type SortKey,
} from "../store";
import { CopyShortlist } from "./CopyShortlist";
import { VerdictBar } from "./marks";

/* ---------------------------------------------------------------------------
   Toolbar: one filter row above the list it scopes
   --------------------------------------------------------------------------- */

function TierChip({ tier, count, pressed, onClick }: { tier: MatchTier; count: number; pressed: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-chip px-2.5 text-[12.5px] font-medium",
        "transition-[background-color,color,box-shadow] duration-150 ease-out-quart",
        pressed ? "bg-white/85 text-ink-800 hairline" : "text-ink-400 hover:bg-ink-900/[0.04] hover:text-ink-600",
      )}
    >
      <span className={cn("size-1.5 rounded-full", TIER_DOT[tier], !pressed && "opacity-40")} aria-hidden />
      {TIER_SHORT[tier]}
      <span className={cn("font-mono text-[11px] tnum", pressed ? "text-ink-400" : "text-ink-300")}>{count}</span>
    </button>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 appearance-none rounded-chip bg-ink-900/[0.04] pl-3 pr-7 text-[12.5px] font-medium text-ink-700 transition-colors hover:bg-ink-900/[0.07]"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 size-3.5 text-ink-400" aria-hidden />
    </label>
  );
}

function Toolbar() {
  const filters = useWorkspace((s) => s.filters);
  const setFilters = useWorkspace((s) => s.setFilters);
  const counts = useTierCounts();
  const phases = usePhaseOptions();

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-5 py-3.5">
      <div className="flex flex-wrap items-center gap-1">
        <h2 className="mr-2 text-[15px] font-semibold tracking-[-0.01em] text-ink-900">Worklist</h2>
        {TIERS.map((tier) => (
          <TierChip
            key={tier}
            tier={tier}
            count={counts[tier]}
            pressed={filters.tiers[tier] && !(filters.hideIneligible && tier === "ineligible")}
            onClick={() =>
              tier === "ineligible" && filters.hideIneligible
                ? setFilters({ hideIneligible: false, tiers: { ...filters.tiers, ineligible: true } })
                : setFilters({ tiers: { ...filters.tiers, [tier]: !filters.tiers[tier] } })
            }
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Toggle label="Shortlisted only" checked={filters.onlyShortlisted} onChange={(v) => setFilters({ onlyShortlisted: v })} />
        {phases.length > 1 && (
          <Select label="Phase" value={filters.phases[0] ?? ""} onChange={(v) => setFilters({ phases: v ? [v] : [] })}>
            <option value="">All phases</option>
            {phases.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        )}
        <Select label="Sort by" value={filters.sort} onChange={(v) => setFilters({ sort: v as SortKey })}>
          <option value="rank">Sort: rank</option>
          <option value="score">Sort: score</option>
          <option value="phase">Sort: phase</option>
        </Select>
        <CopyShortlist />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Rows
   --------------------------------------------------------------------------- */

const GRID = "grid grid-cols-[28px_52px_minmax(0,1fr)_112px] items-center gap-x-3 md:grid-cols-[28px_52px_minmax(0,1.7fr)_132px_minmax(0,1fr)_104px]";

/** The one thing to know before opening the trial: its blocker, or what to confirm, or that it is clear. */
function keyIssue(entry: RankedEntry): { tone: "fail" | "warn" | "pass"; label: string; text: string } | undefined {
  const match = entry.match;
  if (!match) return undefined;
  const text = new Map(entry.trial.criteria.map((c) => [c.id, c.text] as const));
  const verdict = new Map(match.verdicts.map((v) => [v.criterionId, v] as const));
  if (match.blockers.length > 0) {
    const id = match.blockers.find((b) => verdict.get(b)?.confidence === "high") ?? match.blockers[0];
    return { tone: "fail", label: "Blocked", text: verdict.get(id)?.rationale ?? text.get(id) ?? "" };
  }
  if (match.confirmations.length > 0) {
    const id = match.confirmations[0];
    const more = match.confirmations.length - 1;
    return { tone: "warn", label: "Confirm", text: `${verdict.get(id)?.actionNeeded ?? text.get(id) ?? ""}${more > 0 ? ` (+${more} more)` : ""}` };
  }
  return { tone: "pass", label: "Clear", text: "No blockers and nothing left to confirm." };
}

const ISSUE_DOT = { fail: "bg-fail-500", warn: "bg-warn-500", pass: "bg-pass-500" } as const;

function Row({ entry, selected }: { entry: RankedEntry; selected: boolean }) {
  const selectTrial = useWorkspace((s) => s.selectTrial);
  const setReview = useWorkspace((s) => s.setReview);
  const retryMatch = useWorkspace((s) => s.retryMatch);
  const { trial, match, review, rank, status } = entry;

  if (review === "dismissed") {
    return (
      <li className={cn(GRID, "px-5 py-2 text-[13px] text-ink-400")}>
        <span className="text-right font-mono text-[12px] tnum text-ink-300">{rank}</span>
        <span />
        <span className="col-span-2 min-w-0 truncate md:col-span-3">
          Dismissed · <span className="text-ink-500">{trial.title}</span>
        </span>
        <span className="flex justify-end">
          <Button variant="ghost" size="sm" icon={<Undo2 />} onClick={() => setReview(trial.nctId, "none")}>
            Undo
          </Button>
        </span>
      </li>
    );
  }

  if (!match) {
    const failed = status === "error";
    return (
      <li className={cn(GRID, "px-5 py-3")} aria-busy={!failed}>
        <span className="text-right font-mono text-[12px] tnum text-ink-300">{rank}</span>
        <span className="flex size-9 items-center justify-center rounded-full border-[3px] border-ink-100" aria-hidden>
          {status === "running" && <Loader2 className="size-3.5 animate-spin text-ink-300" />}
        </span>
        <div className="min-w-0">
          <div className="line-clamp-1 text-[13.5px] font-medium text-ink-500">{trial.title}</div>
          {failed ? (
            <div className="mt-1 text-[12.5px] text-fail-700">This trial could not be screened.</div>
          ) : (
            <Skeleton className="mt-2 h-2.5 w-[55%]" />
          )}
        </div>
        <span className="text-[12px] text-ink-400">{failed ? "" : status === "running" ? "Screening" : "Queued"}</span>
        <span className="hidden md:block" />
        <span className="hidden justify-end md:flex">
          {failed && (
            <Button variant="secondary" size="sm" icon={<RotateCcw />} onClick={() => retryMatch(trial.nctId)}>
              Retry
            </Button>
          )}
        </span>
      </li>
    );
  }

  const counts = splitCounts(trial, match);
  const issue = keyIssue(entry);
  const shortlisted = review === "shortlisted";
  const flagged = review === "flagged";
  const blocked = counts.notMet + counts.excludes;

  return (
    <li
      className={cn(
        "relative transition-colors duration-150",
        selected ? "bg-accent-50/80 shadow-[inset_2px_0_0_var(--color-accent-500)]" : "hover:bg-white/55",
      )}
    >
      <div className={cn(GRID, "px-5 py-3")}>
        <span className="text-right font-mono text-[12px] tnum text-ink-400" aria-label={`Rank ${rank}`}>
          {rank}
        </span>
        <ScoreRing value={match.score} tier={match.tier} size={38} strokeWidth={3.25} />

        <div className="min-w-0">
          {/* The title is the row's selection control; the pseudo-element stretches it over the whole row. */}
          <button
            type="button"
            aria-pressed={selected}
            onClick={() => selectTrial(trial.nctId)}
            className="block w-full rounded-md text-left before:absolute before:inset-0 before:content-['']"
          >
            <span className="line-clamp-2 text-[13.5px] font-medium leading-snug text-ink-900 text-pretty">{trial.title}</span>
          </button>
          <div className="mt-1 flex min-w-0 items-center gap-1.5 text-[12px] text-ink-500">
            <span className="shrink-0 font-mono tnum text-ink-600">{trial.nctId}</span>
            <span className="text-ink-300">·</span>
            <span className="shrink-0">{formatPhase(trial.phases)}</span>
            <span className="text-ink-300">·</span>
            <span className="min-w-0 truncate" title={trial.sponsor}>
              {trial.sponsor}
            </span>
            <span className="hidden shrink-0 text-ink-400 xl:inline">· {formatSites(trial)}</span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-ink-700">
            <span className={cn("size-1.5 shrink-0 rounded-full", TIER_DOT[match.tier])} aria-hidden />
            {TIER_SHORT[match.tier]}
          </div>
          <VerdictBar counts={counts} className="mt-1.5" />
          <div className="mt-1.5 truncate text-[11.5px] tnum text-ink-500">
            {counts.met} met
            {counts.open > 0 && ` · ${counts.open} open`}
            {blocked > 0 && ` · ${blocked} blocking`}
          </div>
        </div>

        <div className="hidden min-w-0 md:block">
          {issue && (
            <>
              <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink-500">
                <span className={cn("size-1.5 shrink-0 rounded-full", ISSUE_DOT[issue.tone])} aria-hidden />
                {issue.label}
              </div>
              <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-ink-700" title={issue.text}>
                {issue.text}
              </p>
            </>
          )}
        </div>

        <div className="relative z-10 hidden items-center justify-end gap-0.5 md:flex">
          <IconButton
            label={shortlisted ? "Remove from shortlist" : "Shortlist"}
            size="sm"
            active={shortlisted}
            aria-pressed={shortlisted}
            onClick={() => setReview(trial.nctId, shortlisted ? "none" : "shortlisted")}
          >
            <Check strokeWidth={shortlisted ? 2.5 : 2} />
          </IconButton>
          <IconButton
            label={flagged ? "Remove flag" : "Flag for discussion"}
            size="sm"
            active={flagged}
            aria-pressed={flagged}
            onClick={() => setReview(trial.nctId, flagged ? "none" : "flagged")}
          >
            <Flag />
          </IconButton>
          <IconButton label="Dismiss" size="sm" onClick={() => setReview(trial.nctId, "dismissed")}>
            <X />
          </IconButton>
        </div>
      </div>
    </li>
  );
}

/* ---------------------------------------------------------------------------
   Worklist
   --------------------------------------------------------------------------- */

export function Worklist() {
  const { visible, hidden } = useRankedTrials();
  const selected = useWorkspace((s) => s.selected);
  const trials = useWorkspace((s) => s.trials);
  const resetFilters = useWorkspace((s) => s.resetFilters);

  return (
    <GlassPanel as="section" aria-label="Trial worklist" padding="none" className="overflow-hidden">
      <Toolbar />
      <div className={cn(GRID, "hairline-t hairline-b px-5 py-2 text-[11px] font-medium tracking-[0.02em] text-ink-400")} aria-hidden>
        <span className="text-right">#</span>
        <span>Score</span>
        <span>Study</span>
        <span>Criteria</span>
        <span className="hidden md:block">Next step</span>
        <span className="hidden text-right md:block">Decision</span>
      </div>
      {visible.length === 0 ? (
        <EmptyState
          icon={<ListFilter />}
          title={trials.length === 0 ? "No studies to review" : "Nothing matches these filters"}
          description={trials.length === 0 ? "The pre-screen sent no studies to criterion review." : `${plural(hidden, "trial")} hidden by the current filters.`}
          action={
            trials.length > 0 ? (
              <Button variant="secondary" onClick={resetFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ol className="divide-y divide-ink-900/[0.06]" aria-label="Ranked trials">
          {visible.map((entry) => (
            <Row key={entry.trial.nctId} entry={entry} selected={entry.trial.nctId === selected} />
          ))}
        </ol>
      )}
      {visible.length > 0 && hidden > 0 && (
        <p className="hairline-t px-5 py-2.5 text-center text-[12.5px] text-ink-400">
          {plural(hidden, "trial")} hidden by filters ·{" "}
          <button type="button" onClick={resetFilters} className="rounded-md font-medium text-accent-700 transition-colors hover:text-accent-800">
            Show all
          </button>
        </p>
      )}
    </GlassPanel>
  );
}
