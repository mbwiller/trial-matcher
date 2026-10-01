"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, RotateCcw, Search } from "lucide-react";
import { Badge, Button, EmptyState, Eyebrow, GlassPanel, cn } from "@/components/ui";
import { summarizePrescreen } from "@/lib/ctgov/prescreen";
import { formatDate } from "@/lib/ctgov/format";
import { MATCH_SYSTEM_PROMPT } from "@/lib/llm/prompts";
import { MATCH_CONCURRENCY, useTierCounts, useWorkspace } from "../store";
import { engineLabel, formatInt, patientDisplay, plural } from "../labels";
import { MatrixLegend, RegistryMatrix } from "./RegistryMatrix";
import { GateBreakdown, PipelineStrip, RequestLog, traceSource, type PipelineStage } from "./RunPanels";
import { ReviewTile, ReviewerLog } from "./ReviewGrid";
import { GATE_ORDER, usePlayback } from "./usePlayback";

function PanelHeader({ step, title, aside }: { step: string; title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <div className="flex items-baseline gap-2.5">
        <span className="font-mono text-[11px] font-medium tnum text-accent-700">{step}</span>
        <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-ink-900">{title}</h2>
      </div>
      {aside && <div className="text-[12.5px] text-ink-500">{aside}</div>}
    </div>
  );
}

function ReviewerInstructions() {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-7 items-center gap-1 rounded-chip px-2 text-[12.5px] font-medium text-ink-500 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
      >
        Reviewer instructions
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div id={id} className="mt-2 max-h-[280px] overflow-auto overscroll-contain rounded-field glass-soft p-4">
          <p className="mb-2 text-[12px] text-ink-400">
            The rules the criterion-level reviewer is given, verbatim. Scores and tiers are then computed deterministically from its verdicts.
          </p>
          <pre className="whitespace-pre-wrap font-sans text-[12.5px] leading-relaxed text-ink-700">{MATCH_SYSTEM_PROMPT}</pre>
        </div>
      )}
    </div>
  );
}

export function RunView() {
  const runId = useWorkspace((s) => s.runId);
  const trace = useWorkspace((s) => s.trace);
  const trials = useWorkspace((s) => s.trials);
  const matches = useWorkspace((s) => s.matches);
  const matchStatus = useWorkspace((s) => s.matchStatus);
  const matching = useWorkspace((s) => s.matching);
  const matchError = useWorkspace((s) => s.matchError);
  const profile = useWorkspace((s) => s.profile);
  const patientLabel = useWorkspace((s) => s.patientLabel);
  const setView = useWorkspace((s) => s.setView);
  const selectTrial = useWorkspace((s) => s.selectTrial);
  const retryMatch = useWorkspace((s) => s.retryMatch);
  const goToStage = useWorkspace((s) => s.goToStage);
  const tiers = useTierCounts();

  const pb = usePlayback({ runId, trace, trials, matches, matchStatus, matching });
  const summary = useMemo(() => (trace ? summarizePrescreen(trace.prescreen) : undefined), [trace]);
  const patient = patientDisplay(profile, patientLabel);

  // First play: hand over to the results once the run has been watched to the end.
  const done = pb.phase === "done";
  const autoAdvance = done && pb.firstPlay && trials.length > 0;
  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setTimeout(() => setView("results"), 1400);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, setView]);

  const reviewStarted = pb.phase === "review" || done;
  const revealedSet = useMemo(() => new Set(pb.revealed), [pb.revealed]);
  const totalCriteria = useMemo(() => trials.reduce((n, t) => n + t.criteria.length, 0), [trials]);
  const ruledOn = useMemo(
    () => trials.reduce((n, t) => n + (revealedSet.has(t.nctId) && matches[t.nctId] ? t.criteria.length : 0), 0),
    [trials, matches, revealedSet],
  );
  const firstMatch = trials.map((t) => matches[t.nctId]).find(Boolean);

  const setAsideSoFar = summary ? GATE_ORDER.slice(0, pb.gates).reduce((n, g) => n + summary.setAside[g], 0) : 0;
  const snapshotDate = trace ? formatDate(trace.fetchedAt.slice(0, 10)) : "";

  const stages: PipelineStage[] = [
    {
      key: "harvest",
      label: "Registry harvest",
      value: trace ? `${formatInt(pb.harvested)} studies` : "—",
      sub: trace ? (trace.mode === "snapshot" ? `ClinicalTrials.gov · snapshot ${snapshotDate}` : "ClinicalTrials.gov · live") : "",
      state: pb.phase === "harvest" ? "active" : "done",
    },
    {
      key: "prescreen",
      label: "Pre-screen",
      value: pb.phase === "harvest" || !summary ? "—" : pb.gates >= GATE_ORDER.length ? `${formatInt(summary.relevant)} relevant` : `${formatInt(summary.harvested - setAsideSoFar)} remaining`,
      sub: pb.phase === "harvest" || !summary ? "Location, sex, age, subtype, setting" : `${formatInt(setAsideSoFar)} set aside`,
      state: pb.phase === "harvest" ? "pending" : pb.phase === "prescreen" ? "active" : "done",
    },
    {
      key: "review",
      label: "Criterion review",
      value: reviewStarted ? `${pb.revealed.length} / ${trials.length} studies` : `${trials.length} studies`,
      sub: reviewStarted ? `${formatInt(ruledOn)} of ${formatInt(totalCriteria)} criteria ruled on` : `${formatInt(totalCriteria)} criteria to rule on`,
      state: done ? "done" : pb.phase === "review" ? "active" : "pending",
    },
    {
      key: "rank",
      label: "Ranked shortlist",
      value: done ? `${tiers.strong} strong · ${tiers.possible} possible` : "—",
      sub: done ? `${tiers.unlikely} unlikely · ${tiers.ineligible} ineligible` : "Scored from the verdicts",
      state: done ? "done" : "pending",
    },
  ];

  const openTrial = (nctId: string) => {
    selectTrial(nctId);
    setView("results");
  };

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <Eyebrow>Screening run</Eyebrow>
          <h1 className="mt-2 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900">
            Screening the registry for {patient.label.replace(/\.$/, "")}.
          </h1>
          <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-ink-500 text-pretty">
            Every study the registry returned, why each one was set aside, and every criterion the reviewer ruled on.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {done ? (
            <>
              <Button variant="ghost" size="sm" icon={<RotateCcw />} onClick={pb.replay}>
                Replay
              </Button>
              <Button iconRight={<ArrowRight />} onClick={() => setView("results")} disabled={trials.length === 0}>
                View results
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={() => {
                pb.skip();
                setView("results");
              }}
            >
              Skip to results
            </Button>
          )}
        </div>
      </header>

      <GlassPanel as="section" aria-label="Pipeline" padding="none" className="px-6 py-5">
        <PipelineStrip stages={stages} />
      </GlassPanel>

      {trace && summary && (
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <GlassPanel as="section" aria-label="Registry harvest" padding="none" className="p-6">
            <PanelHeader
              step="01"
              title="Registry harvest"
              aside={
                trace.registryTotal ? (
                  <>
                    <span className="tnum">{formatInt(trace.harvested)}</span> of{" "}
                    <span className="tnum">{formatInt(trace.registryTotal)}</span> registered studies match the query
                  </>
                ) : (
                  <>
                    <span className="tnum">{formatInt(trace.harvested)}</span> studies harvested
                  </>
                )
              }
            />
            <div className="mt-4 rounded-field glass-soft px-4 py-3">
              <RequestLog trace={trace} pagesShown={pb.pages} />
            </div>
            <RegistryMatrix entries={trace.prescreen} harvested={pb.harvested} gates={pb.gates} phase={pb.phase} className="mt-5" />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <MatrixLegend />
              <span className="text-[12px] text-ink-400">
                One dot per study · <span className="tnum">{formatInt(trace.criteriaParsed)}</span> eligibility criteria parsed from free text
              </span>
            </div>
            <p className="mt-2 text-[12px] text-ink-400">{traceSource(trace)}.</p>
          </GlassPanel>

          <GlassPanel as="section" aria-label="Pre-screen" padding="none" className="p-6">
            <PanelHeader step="02" title="Pre-screen" />
            <p className="mt-1 text-[12.5px] leading-snug text-ink-500">
              Deterministic gates on what the registry states structurally. No judgment on the fine print.
            </p>
            <div className="mt-4">
              <GateBreakdown summary={summary} gates={pb.gates} phase={pb.phase} country={trace.country} />
            </div>
          </GlassPanel>
        </div>
      )}

      <GlassPanel as="section" aria-label="Criterion review" padding="none" className="p-6">
        <PanelHeader
          step="03"
          title="Criterion review"
          aside={
            <span className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral" dot>
                {engineLabel(firstMatch)}
              </Badge>
              <span>
                {plural(trials.length, "study", "studies")} · {MATCH_CONCURRENCY} at a time
              </span>
            </span>
          }
        />
        <p className="mt-1 max-w-[720px] text-[12.5px] leading-snug text-ink-500">
          One cell per criterion, inclusion first. Each is ruled met, open or blocking against the record, with the quote it rests on.
        </p>

        {matchError && done && (
          <div role="alert" className="mt-4 rounded-field border border-fail-100 bg-fail-50 px-3 py-2 text-[13px] text-fail-700">
            {matchError}
          </div>
        )}

        {trials.length === 0 ? (
          <EmptyState
            icon={<Search />}
            title="No relevant studies passed the pre-screen"
            description="Nothing in the registry matched this diagnosis, subtype and setting. Adjust the profile and search again."
            action={
              <Button variant="secondary" onClick={() => goToStage("profile")}>
                Edit profile
              </Button>
            }
          />
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {trials.map((trial) => {
                const revealed = revealedSet.has(trial.nctId);
                const status = matchStatus[trial.nctId] ?? "pending";
                return (
                  <li key={trial.nctId}>
                    <ReviewTile
                      trial={trial}
                      match={revealed ? matches[trial.nctId] : undefined}
                      status={revealed || status !== "error" ? status : "running"}
                      started={reviewStarted && (status === "running" || status === "done" || status === "error" || !!matches[trial.nctId])}
                      onOpen={() => openTrial(trial.nctId)}
                      onRetry={() => retryMatch(trial.nctId)}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="xl:hairline-l xl:pl-6">
              <Eyebrow>Reviewer log</Eyebrow>
              <ReviewerLog trials={trials} matches={matches} revealed={pb.revealed} instant={!pb.firstPlay && done} className="mt-3" />
            </div>
          </div>
        )}

        <div className="mt-5">
          <ReviewerInstructions />
        </div>
      </GlassPanel>
    </div>
  );
}
