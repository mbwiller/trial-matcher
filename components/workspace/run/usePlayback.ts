"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PrescreenReason, SearchTrace, Trial, TrialMatch } from "@/lib/types";
import type { MatchStatus } from "../store";

/**
 * Playback clock for the screening run.
 *
 * Everything shown is real — the requests, the harvested studies, the
 * pre-screen decisions and the verdicts all come from the search trace and the
 * match responses. Playback only decides *when* each piece appears, so a run
 * that the server finishes in under a second can still be followed by eye.
 * Verdict tiles never reveal before their match has actually arrived.
 *
 * The owner must be keyed by `runId` so a new search starts a fresh playback.
 */

export type RunPhase = "harvest" | "prescreen" | "review" | "done";

/** Gates in the order the pre-screen applies them (lib/ctgov/prescreen.ts). */
export const GATE_ORDER: PrescreenReason[] = ["location", "sex", "age", "study-type", "subtype", "setting", "relevance"];

export interface Playback {
  phase: RunPhase;
  /** Registry pages shown so far, flattened across requests. */
  pages: number;
  totalPages: number;
  /** Studies visible in the registry matrix. */
  harvested: number;
  /** How many of GATE_ORDER have been applied. */
  gates: number;
  /** Trials whose verdicts are revealed, in reveal order. */
  revealed: string[];
  /** True while this run is being played for the first time (drives the auto-advance to results). */
  firstPlay: boolean;
  skip: () => void;
  replay: () => void;
}

interface State {
  runId: number;
  phase: RunPhase;
  pages: number;
  gates: number;
  revealed: string[];
}

const PAGE_BUDGET_MS = 2200;
const GATE_MS = 360;
const REVEAL_MS = 300;

/** Runs that have already been played to the end in this session. */
const played = new Set<number>();

function reducedMotion(): boolean {
  return typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
}

export function usePlayback(input: {
  runId: number;
  trace: SearchTrace | undefined;
  trials: Trial[];
  matches: Record<string, TrialMatch>;
  matchStatus: Record<string, MatchStatus>;
  matching: boolean;
}): Playback {
  const { runId, trace, trials, matches, matchStatus, matching } = input;

  const pageSizes = useMemo(() => (trace ? trace.requests.flatMap((r) => r.pages.map((p) => p.studies)) : []), [trace]);
  const totalPages = pageSizes.length;
  const total = trace?.harvested ?? 0;

  /** Trials whose review has finished (verdict or error), in list order. */
  const settled = useMemo(
    () => trials.filter((t) => matches[t.nctId] || matchStatus[t.nctId] === "error").map((t) => t.nctId),
    [trials, matches, matchStatus],
  );

  const finalState = useCallback(
    (): State => ({ runId, phase: matching ? "review" : "done", pages: totalPages, gates: GATE_ORDER.length, revealed: settled }),
    [runId, matching, totalPages, settled],
  );

  const [state, setState] = useState<State>(() =>
    played.has(runId) || reducedMotion() || !trace ? finalState() : { runId, phase: "harvest", pages: 0, gates: 0, revealed: [] },
  );
  const [firstPlay, setFirstPlay] = useState(() => !played.has(runId));

  useEffect(() => {
    let delay: number;
    let next: (s: State) => State;
    switch (state.phase) {
      case "harvest":
        if (state.pages < totalPages) {
          delay = Math.min(480, Math.max(150, PAGE_BUDGET_MS / Math.max(1, totalPages)));
          next = (s) => ({ ...s, pages: s.pages + 1 });
        } else {
          delay = 420;
          next = (s) => ({ ...s, phase: "prescreen" });
        }
        break;
      case "prescreen":
        if (state.gates < GATE_ORDER.length) {
          delay = GATE_MS;
          next = (s) => ({ ...s, gates: s.gates + 1 });
        } else {
          delay = 520;
          next = (s) => ({ ...s, phase: "review" });
        }
        break;
      case "review": {
        const pending = settled.find((id) => !state.revealed.includes(id));
        if (pending) {
          delay = REVEAL_MS;
          next = (s) => (s.revealed.includes(pending) ? s : { ...s, revealed: [...s.revealed, pending] });
        } else if (!matching && state.revealed.length >= settled.length) {
          delay = 700;
          next = (s) => ({ ...s, phase: "done" });
        } else {
          return; // waiting for the next verdict to arrive
        }
        break;
      }
      default:
        played.add(runId);
        return;
    }
    const timer = window.setTimeout(() => setState((s) => (s.runId === runId ? next(s) : s)), delay);
    return () => window.clearTimeout(timer);
  }, [state, totalPages, settled, matching, runId]);

  // After the run has finished, late verdicts (a retried trial) reveal immediately.
  const revealed = state.phase === "done" ? settled : state.revealed;

  const harvested = useMemo(() => {
    if (state.pages >= totalPages) return total;
    let n = 0;
    for (let i = 0; i < state.pages; i++) n += pageSizes[i];
    return Math.min(total, n);
  }, [state.pages, totalPages, total, pageSizes]);

  const skip = useCallback(() => setState(finalState()), [finalState]);
  const replay = useCallback(() => {
    played.delete(runId);
    setFirstPlay(false);
    setState({ runId, phase: "harvest", pages: 0, gates: 0, revealed: [] });
  }, [runId]);

  return { phase: state.phase, pages: state.pages, totalPages, harvested, gates: state.gates, revealed, firstPlay, skip, replay };
}
