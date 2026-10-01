"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { Check, ChevronDown, CircleHelp, ExternalLink, Flag, MousePointerClick, OctagonX, X } from "lucide-react";
import type { Criterion, CriterionType, CriterionVerdict, Evidence, Trial, TrialMatch, VerdictStatus } from "@/lib/types";
import { Badge, Button, EmptyState, Eyebrow, GlassPanel, IconButton, ScoreRing, Skeleton, cn } from "@/components/ui";
import { formatAgeRange, formatDate, formatPhase, formatSex, formatStatus, tierLabel } from "@/lib/ctgov/format";
import { explainScore, type ScoreBreakdown } from "@/lib/scoring";
import { MATRIX_GROUPS, groupOf, pairedVerdicts, splitCounts } from "../insights";
import { engineLabel, formatInt, formatSites, plural, tierTone } from "../labels";
import { CriterionRow } from "../CriterionRow";
import { useRankedTrials, useWorkspace, type RankedEntry } from "../store";
import { VerdictBar } from "./marks";

/* ---------------------------------------------------------------------------
   Score explanation
   --------------------------------------------------------------------------- */

/** The arithmetic behind the score, in one line (see lib/scoring.ts). */
export function scoreLine(b: ScoreBreakdown): string {
  switch (b.rule) {
    case "scored":
      return `40 + 60 × ${b.pass}/${b.applicable} met${b.penalty > 0 ? ` − ${b.penalty} for ${plural(b.keyUnknowns, "open key item")}` : ""} = ${b.score}`;
    case "blocked":
      return `${plural(b.blockers, "documented blocker")}: score capped at ${b.score}`;
    case "doubtful":
      return `38 − 6 × ${plural(b.blockers, "possible blocker")} − 2 × ${b.unknowns} open = ${b.score}`;
    default:
      return "No parsable criteria: neutral score";
  }
}

/* ---------------------------------------------------------------------------
   Criteria
   --------------------------------------------------------------------------- */

type StatusFilter = "all" | "fail" | "unknown" | "pass";

const STATUS_ORDER: Record<VerdictStatus, number> = { fail: 0, unknown: 1, pass: 2, "not-applicable": 3 };

function isFormality(c: Criterion, v: CriterionVerdict | undefined): boolean {
  if (c.category !== "consent" && c.category !== "reproductive") return false;
  return !!v && (v.status === "not-applicable" || v.status === "pass");
}

function FilterChip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-chip px-2 text-[12px] font-medium transition-[background-color,color,box-shadow] duration-150",
        pressed ? "bg-white/85 text-ink-800 hairline" : "text-ink-500 hover:bg-ink-900/[0.04] hover:text-ink-800",
      )}
    >
      {children}
    </button>
  );
}

function CriteriaList({
  type,
  rows,
  onQuote,
}: {
  type: CriterionType;
  rows: Array<{ criterion: Criterion; verdict?: CriterionVerdict; index: number }>;
  onQuote: (evidence: Evidence[]) => void;
}) {
  const [showFormalities, setShowFormalities] = useState(false);
  const formalitiesId = useId();
  const mine = rows.filter((r) => r.criterion.type === type);
  const main = mine
    .filter((r) => !isFormality(r.criterion, r.verdict))
    .sort((a, b) => STATUS_ORDER[a.verdict?.status ?? "unknown"] - STATUS_ORDER[b.verdict?.status ?? "unknown"] || a.index - b.index);
  const formalities = mine.filter((r) => isFormality(r.criterion, r.verdict));
  if (mine.length === 0) return null;

  return (
    <section aria-label={`${type === "inclusion" ? "Inclusion" : "Exclusion"} criteria`}>
      <div className="flex items-baseline gap-2">
        <Eyebrow>{type === "inclusion" ? "Inclusion" : "Exclusion"}</Eyebrow>
        <span className="font-mono text-[11px] tnum text-ink-400">{mine.length}</span>
      </div>
      {main.length > 0 && (
        <ul className="mt-0.5 divide-y divide-ink-900/[0.06]">
          {main.map((r) => (
            <CriterionRow key={r.criterion.id} criterion={r.criterion} verdict={r.verdict} onQuote={onQuote} />
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
            className="mt-1 inline-flex h-7 items-center gap-1 rounded-chip px-2 text-[12.5px] font-medium text-ink-500 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
          >
            <ChevronDown className={cn("size-3.5 transition-transform duration-200", showFormalities && "rotate-180")} aria-hidden />
            {plural(formalities.length, "screening formality", "screening formalities")}
          </button>
          {showFormalities && (
            <ul id={formalitiesId} className="divide-y divide-ink-900/[0.06]">
              {formalities.map((r) => (
                <CriterionRow key={r.criterion.id} criterion={r.criterion} verdict={r.verdict} onQuote={onQuote} />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Sections
   --------------------------------------------------------------------------- */

function Section({ title, count, children, className }: { title: string; count?: number; children: ReactNode; className?: string }) {
  return (
    <section className={cn("hairline-t px-6 py-5", className)}>
      <div className="flex items-baseline gap-2">
        <h3 className="text-[13px] font-semibold tracking-[-0.005em] text-ink-900">{title}</h3>
        {count !== undefined && <span className="font-mono text-[11px] tnum text-ink-400">{count}</span>}
      </div>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="-ml-2 inline-flex h-7 items-center gap-1 rounded-chip px-2 text-[12.5px] font-medium text-ink-500 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
      >
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden />
        {label}
      </button>
      {open && (
        <div id={id} className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-medium tracking-[0.02em] text-ink-400">{label}</dt>
      <dd className="mt-0.5 text-[13px] leading-snug text-ink-800">{children}</dd>
    </div>
  );
}

function siteLines(trial: Trial): string[] {
  return trial.locations.slice(0, 5).map((l) => [l.facility, [l.city, l.state].filter(Boolean).join(", "), l.country].filter(Boolean).join(" · "));
}

/* ---------------------------------------------------------------------------
   Detail
   --------------------------------------------------------------------------- */

function Matched({ entry, match }: { entry: RankedEntry; match: TrialMatch }) {
  const { trial, review } = entry;
  const trials = useWorkspace((s) => s.trials);
  const setReview = useWorkspace((s) => s.setReview);
  const openRecord = useWorkspace((s) => s.openRecord);
  const criteriaFocus = useWorkspace((s) => s.criteriaFocus);
  const setCriteriaFocus = useWorkspace((s) => s.setCriteriaFocus);
  const trace = useWorkspace((s) => s.trace);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const rows = useMemo(() => pairedVerdicts(trial, match).map((r, index) => ({ ...r, index })), [trial, match]);
  const counts = useMemo(() => splitCounts(trial, match), [trial, match]);
  const breakdown = useMemo(() => explainScore(trial, match.verdicts), [trial, match]);
  const blocked = counts.notMet + counts.excludes;

  const open = rows.filter((r) => (r.verdict?.status ?? "unknown") === "unknown");
  const blockers = rows.filter((r) => r.verdict?.status === "fail");
  const focusGroup = criteriaFocus ? MATRIX_GROUPS.find((g) => g.key === criteriaFocus) : undefined;
  const filtered = rows.filter(
    (r) =>
      (statusFilter === "all" || (r.verdict?.status ?? "unknown") === statusFilter) &&
      (!criteriaFocus || groupOf(r.criterion) === criteriaFocus),
  );

  // Where the deterministic pre-screen placed this study, and on what signals.
  const prescreenRank = trials.findIndex((t) => t.nctId === trial.nctId) + 1;
  const prescreen = trace?.prescreen.find((e) => e.nctId === trial.nctId);
  const relevantTotal = trace ? trace.prescreen.filter((e) => e.outcome !== "set-aside").length : undefined;

  const shortlisted = review === "shortlisted";
  const flagged = review === "flagged";
  const recruiting = trial.status === "RECRUITING";
  const interventions = trial.interventions.filter((i) => i.name).slice(0, 6);
  const sites = siteLines(trial);

  return (
    <>
      <header className="px-6 pb-5 pt-6">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone={tierTone(match.tier)} dot>
            {tierLabel(match.tier)}
          </Badge>
          <Badge>{formatPhase(trial.phases)}</Badge>
          <Badge tone={recruiting ? "accent" : "neutral"} dot>
            {formatStatus(trial.status)}
          </Badge>
          <a
            href={trial.url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex h-[22px] items-center gap-1 rounded-chip px-1.5 font-mono text-[11.5px] tnum text-ink-600 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
            title="Open on ClinicalTrials.gov"
          >
            {trial.nctId}
            <ExternalLink className="size-3" aria-hidden />
          </a>
        </div>
        <h2 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900 text-pretty">{trial.title}</h2>
        <p className="mt-1 text-[12.5px] text-ink-500">
          {trial.sponsor} · {formatSites(trial)}
        </p>

        <div className="mt-5 flex items-center gap-4">
          <ScoreRing value={match.score} tier={match.tier} size={60} strokeWidth={4.5} />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-snug text-ink-800 text-pretty">{match.headline}</p>
            <p className="mt-1.5 font-mono text-[11.5px] tnum text-ink-400" title="How the score was computed from the verdicts (deterministic)">
              {scoreLine(breakdown)}
            </p>
          </div>
        </div>

        <VerdictBar counts={counts} className="mt-5" />
        <div className="mt-2 flex flex-wrap gap-x-3.5 gap-y-1 text-[12px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-pass-500" aria-hidden />
            <span className="tnum">
              <span className="font-medium text-ink-800">{counts.met}</span> met
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-warn-500" aria-hidden />
            <span className="tnum">
              <span className="font-medium text-ink-800">{counts.open}</span> open
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-fail-500" aria-hidden />
            <span className="tnum">
              <span className="font-medium text-ink-800">{blocked}</span> blocking
            </span>
          </span>
          {counts.notApplicable > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-ink-200" aria-hidden />
              <span className="tnum">
                <span className="font-medium text-ink-800">{counts.notApplicable}</span> n/a
              </span>
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            aria-pressed={shortlisted}
            onClick={() => setReview(trial.nctId, shortlisted ? "none" : "shortlisted")}
            className={cn(
              "inline-flex h-9 flex-1 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-chip px-4 text-[13.5px] font-medium tracking-[-0.005em]",
              "transition-[transform,background-color,box-shadow,color] duration-200 ease-out-quart active:translate-y-px [&_svg]:size-4",
              shortlisted
                ? "bg-accent-100 text-accent-800 shadow-[inset_0_0_0_1px_var(--color-accent-200)] hover:bg-accent-200/70"
                : "bg-accent-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(11,18,32,0.14),0_0_0_1px_rgba(11,110,98,0.32)] hover:bg-accent-700",
            )}
          >
            <Check aria-hidden strokeWidth={2.5} />
            {shortlisted ? "Shortlisted" : "Shortlist"}
          </button>
          <IconButton
            label={flagged ? "Remove flag" : "Flag for discussion"}
            active={flagged}
            aria-pressed={flagged}
            onClick={() => setReview(trial.nctId, flagged ? "none" : "flagged")}
          >
            <Flag />
          </IconButton>
          <IconButton label="Dismiss" onClick={() => setReview(trial.nctId, "dismissed")}>
            <X />
          </IconButton>
        </div>
      </header>

      {blockers.length > 0 && (
        <Section title="Blocking" count={blockers.length}>
          <ul className="flex flex-col gap-3">
            {blockers.slice(0, 4).map(({ criterion, verdict }) => (
              <li key={criterion.id} className="flex gap-2.5">
                <OctagonX className="mt-[2px] size-4 shrink-0 text-fail-600" aria-hidden />
                <div className="min-w-0">
                  <p className="text-[13px] leading-snug text-ink-900">{verdict?.rationale}</p>
                  <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-snug text-ink-400">{criterion.text}</p>
                </div>
              </li>
            ))}
          </ul>
          {blockers.length > 4 && <p className="mt-2 text-[12.5px] text-ink-400">{blockers.length - 4} more under Criteria.</p>}
        </Section>
      )}

      {open.length > 0 && (
        <Section title="To confirm before referral" count={open.length}>
          <ul className="flex flex-col gap-2.5">
            {open.slice(0, 6).map(({ criterion, verdict }) => (
              <li key={criterion.id} className="flex gap-2.5">
                <CircleHelp className="mt-[2px] size-4 shrink-0 text-warn-600" aria-hidden />
                <div className="min-w-0">
                  <p className="text-[13px] leading-snug text-ink-900">{verdict?.actionNeeded ?? "Review against the record"}</p>
                  <p className="mt-0.5 line-clamp-1 text-[12.5px] leading-snug text-ink-400">{criterion.text}</p>
                </div>
              </li>
            ))}
          </ul>
          {open.length > 6 && <p className="mt-2 text-[12.5px] text-ink-400">{open.length - 6} more under Criteria.</p>}
        </Section>
      )}

      <Section title="Why it ranks here">
        <p className="text-[13.5px] leading-relaxed text-ink-700 text-pretty">{match.reasoning}</p>
      </Section>

      <Section title="Criteria" count={rows.length}>
        <div className="flex flex-wrap items-center gap-1">
          <FilterChip pressed={statusFilter === "all"} onClick={() => setStatusFilter("all")}>
            All
          </FilterChip>
          <FilterChip pressed={statusFilter === "fail"} onClick={() => setStatusFilter("fail")}>
            Blocking <span className="font-mono text-[11px] tnum text-ink-400">{blocked}</span>
          </FilterChip>
          <FilterChip pressed={statusFilter === "unknown"} onClick={() => setStatusFilter("unknown")}>
            Open <span className="font-mono text-[11px] tnum text-ink-400">{counts.open}</span>
          </FilterChip>
          <FilterChip pressed={statusFilter === "pass"} onClick={() => setStatusFilter("pass")}>
            Met <span className="font-mono text-[11px] tnum text-ink-400">{counts.met}</span>
          </FilterChip>
          {focusGroup && (
            <button
              type="button"
              onClick={() => setCriteriaFocus(undefined)}
              className="ml-1 inline-flex h-6 items-center gap-1 rounded-chip bg-accent-100 px-2 text-[12px] font-medium text-accent-800 transition-colors hover:bg-accent-200/70"
              title="Clear the domain filter"
            >
              {focusGroup.label}
              <X className="size-3" aria-hidden />
            </button>
          )}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-3 text-[13px] text-ink-400">No criteria match this filter.</p>
        ) : (
          <div className="mt-4 flex flex-col gap-5">
            <CriteriaList type="inclusion" rows={filtered} onQuote={openRecord} />
            <CriteriaList type="exclusion" rows={filtered} onQuote={openRecord} />
          </div>
        )}
      </Section>

      <Section title="About the study">
        {interventions.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {interventions.map((i, n) => (
              <Badge key={`${i.name}-${n}`} tone="neutral" className="max-w-full" title={`${i.type.toLowerCase().replace(/_/g, " ")}: ${i.name}`}>
                <span className="min-w-0 truncate">{i.name}</span>
              </Badge>
            ))}
          </div>
        )}
        {trial.summary && <p className="line-clamp-5 text-[13px] leading-relaxed text-ink-600 text-pretty">{trial.summary}</p>}
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
          <Fact label="Enrolls">
            {formatSex(trial.sex)} · {formatAgeRange(trial.minimumAge, trial.maximumAge)}
          </Fact>
          <Fact label="Target enrollment">{trial.enrollment !== undefined ? formatInt(trial.enrollment) : "Not stated"}</Fact>
          <Fact label="Started">{formatDate(trial.startDate)}</Fact>
          <Fact label="Primary completion">{formatDate(trial.primaryCompletionDate)}</Fact>
        </dl>
        {sites.length > 0 && (
          <div className="mt-4">
            <div className="text-[11px] font-medium tracking-[0.02em] text-ink-400">
              Sites{trial.locationCount > sites.length ? ` (${sites.length} of ${formatInt(trial.locationCount)})` : ""}
            </div>
            <ul className="mt-1 flex flex-col gap-0.5 text-[12.5px] leading-snug text-ink-700">
              {sites.map((s, i) => (
                <li key={i} className="truncate" title={s}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section title="Audit trail">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
          <Fact label="Reviewer">{engineLabel(match)}</Fact>
          <Fact label="Reviewed">{formatDate(match.evaluatedAt.slice(0, 10))}</Fact>
          <Fact label="Registry record">
            {trace?.mode === "snapshot" ? `Snapshot ${formatDate(trace.fetchedAt.slice(0, 10))}` : "Live"}
            {trial.lastUpdated && ` · updated ${formatDate(trial.lastUpdated)}`}
          </Fact>
          <Fact label="Pre-screen rank">
            {prescreenRank > 0 ? prescreenRank : "—"}
            {relevantTotal !== undefined && ` of ${formatInt(relevantTotal)} relevant`}
          </Fact>
          {prescreen && prescreen.signals.length > 0 && (
            <div className="col-span-2">
              <Fact label="Pre-screen signals">{prescreen.signals.join(" · ")}</Fact>
            </div>
          )}
        </dl>
        <div className="mt-3">
          <Disclosure label="Eligibility text as published">
            <pre className="max-h-[320px] overflow-auto overscroll-contain whitespace-pre-wrap rounded-field glass-soft p-3.5 font-sans text-[12.5px] leading-relaxed text-ink-700">
              {trial.eligibilityText || "The registry entry has no eligibility text."}
            </pre>
          </Disclosure>
        </div>
      </Section>
    </>
  );
}

export function TrialDetail({ className }: { className?: string }) {
  const selected = useWorkspace((s) => s.selected);
  const { all } = useRankedTrials();
  const entry = all.find((e) => e.trial.nctId === selected);

  return (
    <GlassPanel as="aside" aria-label="Trial detail" padding="none" className={cn("overflow-hidden", className)}>
      {!entry ? (
        <EmptyState
          icon={<MousePointerClick />}
          title="Select a trial"
          description="Its verdicts, the quotes they rest on, and what to confirm before referral appear here."
          className="py-24"
        />
      ) : entry.match ? (
        // Keyed so the criteria filter resets when another trial is opened.
        <Matched key={entry.trial.nctId} entry={entry} match={entry.match} />
      ) : (
        <div className="p-6" aria-busy={entry.status !== "error"}>
          <div className="font-mono text-[11.5px] tnum text-ink-400">{entry.trial.nctId}</div>
          <h2 className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-700">{entry.trial.title}</h2>
          {entry.status === "error" ? (
            <p className="mt-3 text-[13px] text-fail-700">This trial could not be screened. Retry it from the worklist.</p>
          ) : (
            <>
              <Skeleton className="mt-5 h-3 w-[70%]" />
              <Skeleton className="mt-3 h-3 w-[92%]" />
              <Skeleton className="mt-3 h-3 w-[55%]" />
              <p className="mt-5 text-[13px] text-ink-400">
                Reviewing {plural(entry.trial.criteria.length, "criterion", "criteria")} against the record.
              </p>
            </>
          )}
          <Button variant="ghost" size="sm" className="-ml-3 mt-4" onClick={() => window.open(entry.trial.url, "_blank", "noreferrer")}>
            Open on ClinicalTrials.gov
          </Button>
        </div>
      )}
    </GlassPanel>
  );
}
