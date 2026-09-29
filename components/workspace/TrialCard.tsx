"use client";

import { useId, useMemo, useState } from "react";
import { Check, ChevronDown, ExternalLink, Flag, Loader2, RotateCcw, Undo2, X } from "lucide-react";
import type { Criterion, CriterionType, CriterionVerdict, Trial, TrialMatch, VerdictStatus } from "@/lib/types";
import {
  Badge,
  Button,
  Eyebrow,
  GlassPanel,
  IconButton,
  ScoreRing,
  Skeleton,
  cn,
} from "@/components/ui";
import { formatPhase, formatStatus, tierLabel } from "@/lib/ctgov/format";
import { useWorkspace, type RankedEntry } from "./store";
import { formatSites, plural, tierTone } from "./labels";
import { CriterionRow } from "./CriterionRow";

const STATUS_ORDER: Record<VerdictStatus, number> = {
  fail: 0,
  unknown: 1,
  pass: 2,
  "not-applicable": 3,
};

function isFormality(c: Criterion, v: CriterionVerdict | undefined): boolean {
  if (c.category !== "consent" && c.category !== "reproductive") return false;
  return !!v && (v.status === "not-applicable" || v.status === "pass");
}

/* ---------------------------------------------------------------------------
   Pieces
   --------------------------------------------------------------------------- */

function Rank({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={cn(
        "hidden w-[2ch] shrink-0 text-right font-mono text-[13px] tnum text-ink-400 sm:block",
        className,
      )}
      aria-label={`Rank ${value}`}
    >
      {value}
    </span>
  );
}

function ExternalIconLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-[10px] text-ink-400",
        "transition-[background-color,color] duration-150 ease-out-quart hover:bg-ink-900/[0.05] hover:text-ink-900",
      )}
    >
      <ExternalLink className="size-4" aria-hidden />
    </a>
  );
}

/** Secondary pill that turns accent when selected (Button has no pressed state). */
function ShortlistButton({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 select-none items-center gap-1.5 whitespace-nowrap rounded-chip px-3 text-[13px] font-medium tracking-[-0.005em]",
        "transition-[transform,background-color,box-shadow,color] duration-200 ease-out-quart active:translate-y-px",
        "[&_svg]:size-3.5",
        selected
          ? "bg-accent-100 text-accent-800 shadow-[inset_0_0_0_1px_var(--color-accent-200)] hover:bg-accent-200/70"
          : "glass-strong text-ink-800 hover:bg-white/90 hover:text-ink-900",
      )}
    >
      <Check aria-hidden strokeWidth={selected ? 2.5 : 2} />
      {selected ? "Shortlisted" : "Shortlist"}
    </button>
  );
}

function CountsRow({ trial, match }: { trial: Trial; match: TrialMatch }) {
  const typeById = useMemo(() => {
    const m = new Map<string, CriterionType>();
    for (const c of trial.criteria) m.set(c.id, c.type);
    return m;
  }, [trial]);
  const failInc = match.verdicts.filter(
    (v) => v.status === "fail" && typeById.get(v.criterionId) !== "exclusion",
  ).length;
  const failExc = Math.max(0, match.counts.fail - failInc);
  const items = [
    { n: match.counts.pass, label: "met", dot: "bg-pass-500", always: true },
    { n: failInc, label: "not met", dot: "bg-fail-500", always: false },
    { n: failExc, label: failExc === 1 ? "excludes" : "exclude", dot: "bg-fail-500", always: false },
    { n: match.counts.unknown, label: "to confirm", dot: "bg-warn-500", always: false },
    { n: match.counts.notApplicable, label: "n/a", dot: "bg-ink-300", always: false },
  ].filter((i) => i.always || i.n > 0);
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-500">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5">
          <span className={cn("size-1.5 rounded-full", i.dot)} aria-hidden />
          <span className="tnum">
            <span className="font-medium text-ink-700">{i.n}</span> {i.label}
          </span>
        </span>
      ))}
    </div>
  );
}

function CriteriaList({
  type,
  criteria,
  verdicts,
}: {
  type: CriterionType;
  criteria: Criterion[];
  verdicts: Map<string, CriterionVerdict>;
}) {
  const [showFormalities, setShowFormalities] = useState(false);
  const rows = criteria
    .filter((c) => c.type === type)
    .map((c, index) => ({ c, v: verdicts.get(c.id), index }));
  const main = rows
    .filter((r) => !isFormality(r.c, r.v))
    .sort(
      (a, b) =>
        STATUS_ORDER[a.v?.status ?? "unknown"] - STATUS_ORDER[b.v?.status ?? "unknown"] ||
        a.index - b.index,
    );
  const formalities = rows.filter((r) => isFormality(r.c, r.v));
  const formalitiesId = useId();

  return (
    <section aria-label={`${type === "inclusion" ? "Inclusion" : "Exclusion"} criteria`}>
      <div className="flex items-baseline gap-2">
        <Eyebrow>{type === "inclusion" ? "Inclusion" : "Exclusion"}</Eyebrow>
        <span className="font-mono text-[11px] tnum text-ink-400">{rows.length}</span>
      </div>
      {rows.length === 0 ? (
        <p className="mt-2 text-[13px] text-ink-400">None listed.</p>
      ) : (
        <ul className="mt-1 divide-y divide-ink-900/[0.06]">
          {main.map((r) => (
            <CriterionRow key={r.c.id} criterion={r.c} verdict={r.v} />
          ))}
        </ul>
      )}
      {formalities.length > 0 && (
        <>
          <button
            type="button"
            aria-expanded={showFormalities}
            aria-controls={formalitiesId}
            onClick={() => setShowFormalities((v) => !v)}
            className="mt-2 inline-flex h-7 items-center gap-1 rounded-chip px-2 text-[12.5px] font-medium text-ink-500 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
          >
            <ChevronDown
              className={cn("size-3.5 transition-transform duration-200", showFormalities && "rotate-180")}
              aria-hidden
            />
            {plural(formalities.length, "screening formality", "screening formalities")}
          </button>
          {showFormalities && (
            <ul id={formalitiesId} className="mt-1 divide-y divide-ink-900/[0.06]">
              {formalities.map((r) => (
                <CriterionRow key={r.c.id} criterion={r.c} verdict={r.v} />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Card states
   --------------------------------------------------------------------------- */

function DismissedRow({ entry }: { entry: RankedEntry }) {
  const setReview = useWorkspace((s) => s.setReview);
  return (
    <li>
      <div className="flex items-center gap-3 rounded-card glass-soft px-5 py-2 text-[13px] text-ink-400">
        <Rank value={entry.rank} className="text-ink-300" />
        <span className="min-w-0 flex-1 truncate">
          Dismissed · <span className="text-ink-500">{entry.trial.title}</span>
        </span>
        <span className="hidden sm:block">
          <Badge mono size="sm">{entry.trial.nctId}</Badge>
        </span>
        <Button
          variant="ghost"
          size="sm"
          icon={<Undo2 />}
          onClick={() => setReview(entry.trial.nctId, "none")}
        >
          Undo
        </Button>
      </div>
    </li>
  );
}

function PendingCard({ entry }: { entry: RankedEntry }) {
  const running = entry.status === "running";
  return (
    <li>
      <GlassPanel as="article" size="card" padding="none" className="p-5" aria-busy="true">
        <div className="flex gap-4">
          <Rank value={entry.rank} className="pt-3 text-ink-300" />
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border-[3.5px] border-ink-100"
            aria-hidden
          >
            {running && <Loader2 className="size-4 animate-spin text-ink-300" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="line-clamp-1 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-400">
                {entry.trial.title}
              </h3>
              <Badge tone="neutral" size="sm" className="mt-1">
                {running ? "Screening" : "Queued"}
              </Badge>
            </div>
            <Skeleton className="mt-3 h-3 w-[40%]" />
            <Skeleton className="mt-3 h-3 w-[92%]" />
            <Skeleton className="mt-2.5 h-3 w-[60%]" />
          </div>
        </div>
      </GlassPanel>
    </li>
  );
}

function ErrorCard({ entry }: { entry: RankedEntry }) {
  const retryMatch = useWorkspace((s) => s.retryMatch);
  return (
    <li>
      <GlassPanel as="article" size="card" padding="none" className="p-5">
        <div className="flex flex-wrap items-center gap-4">
          <Rank value={entry.rank} />
          <div className="size-11 shrink-0 rounded-full border-[3.5px] border-ink-100" aria-hidden />
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-700">
              {entry.trial.title}
            </h3>
            <p className="mt-1 text-[13px] text-fail-700">This trial could not be screened.</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<RotateCcw />}
            onClick={() => retryMatch(entry.trial.nctId)}
          >
            Retry
          </Button>
        </div>
      </GlassPanel>
    </li>
  );
}

function MatchedCard({ entry, match }: { entry: RankedEntry; match: TrialMatch }) {
  const { trial, rank, review } = entry;
  const expanded = useWorkspace((s) => !!s.expanded[trial.nctId]);
  const toggleExpanded = useWorkspace((s) => s.toggleExpanded);
  const setReview = useWorkspace((s) => s.setReview);
  const titleId = useId();
  const bodyId = useId();

  const verdicts = useMemo(() => {
    const m = new Map<string, CriterionVerdict>();
    for (const v of match.verdicts) m.set(v.criterionId, v);
    return m;
  }, [match]);

  const shortlisted = review === "shortlisted";
  const flagged = review === "flagged";
  const recruiting = trial.status === "RECRUITING";

  return (
    <li>
      <GlassPanel
        as="article"
        size="card"
        interactive
        padding="none"
        aria-labelledby={titleId}
        className={cn(
          "relative animate-fade-up hover:z-10 focus-within:z-10",
          shortlisted && "[outline:1px_solid_var(--color-accent-200)] [outline-offset:-1px]",
        )}
      >
        <div className="flex flex-wrap gap-4 p-5">
          <Rank value={rank} className="pt-3" />
          <ScoreRing value={match.score} tier={match.tier} size={44} className="mt-0.5" />

          <div className="min-w-0 flex-1 basis-[240px]">
            <div className="flex items-start gap-1">
              <h3
                id={titleId}
                className="line-clamp-2 min-w-0 flex-1 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900 text-pretty"
              >
                {trial.title}
              </h3>
              <ExternalIconLink href={trial.url} label="Open on ClinicalTrials.gov" />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <Badge tone={tierTone(match.tier)} dot>
                {tierLabel(match.tier)}
              </Badge>
              <Badge>{formatPhase(trial.phases)}</Badge>
              <Badge tone={recruiting ? "accent" : "neutral"} dot>
                {formatStatus(trial.status)}
              </Badge>
              <Badge mono>{trial.nctId}</Badge>
              <span className="min-w-0 max-w-[260px] truncate text-[12.5px] text-ink-500" title={trial.sponsor}>
                {trial.sponsor}
              </span>
              <span className="whitespace-nowrap text-[12.5px] text-ink-400">· {formatSites(trial)}</span>
            </div>

            <p className="mt-2.5 text-[14px] leading-snug text-ink-600 text-pretty">{match.headline}</p>
            <CountsRow trial={trial} match={match} />
          </div>

          <div className="flex w-full shrink-0 items-center justify-between gap-2 sm:w-auto sm:flex-col sm:items-end">
            <div className="flex items-center gap-1">
              <ShortlistButton
                selected={shortlisted}
                onClick={() => setReview(trial.nctId, shortlisted ? "none" : "shortlisted")}
              />
              <IconButton label="Dismiss" size="sm" onClick={() => setReview(trial.nctId, "dismissed")}>
                <X />
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
            </div>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={bodyId}
              onClick={() => toggleExpanded(trial.nctId)}
              className="inline-flex h-7 items-center gap-1 rounded-chip px-2 text-[12.5px] font-medium text-ink-500 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
            >
              {expanded ? "Hide criteria" : "Criteria"}
              <ChevronDown
                className={cn("size-3.5 transition-transform duration-200", expanded && "rotate-180")}
                aria-hidden
              />
            </button>
          </div>
        </div>

        {expanded && (
          <div id={bodyId} className="hairline-t px-5 pb-5 pt-4 sm:pl-[112px]">
            <Eyebrow>Why this ranks here</Eyebrow>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-700 text-pretty">{match.reasoning}</p>
            <div className="mt-5 flex flex-col gap-6">
              <CriteriaList type="inclusion" criteria={trial.criteria} verdicts={verdicts} />
              <CriteriaList type="exclusion" criteria={trial.criteria} verdicts={verdicts} />
            </div>
          </div>
        )}
      </GlassPanel>
    </li>
  );
}

/* ---------------------------------------------------------------------------
   Entry
   --------------------------------------------------------------------------- */

export function TrialCard({ entry }: { entry: RankedEntry }) {
  if (entry.review === "dismissed") return <DismissedRow entry={entry} />;
  if (entry.match) return <MatchedCard entry={entry} match={entry.match} />;
  if (entry.status === "error") return <ErrorCard entry={entry} />;
  return <PendingCard entry={entry} />;
}
