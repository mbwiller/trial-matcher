import { useMemo } from "react";
import { create } from "zustand";
import type {
  Evidence,
  MatchTier,
  PatientProfile,
  ReviewDecision,
  ReviewState,
  Trial,
  TrialMatch,
  TrialSearchResponse,
} from "@/lib/types";
import { DEMO_PATIENTS, type DemoPatient } from "@/lib/demo/patients";
import { formatPhase } from "@/lib/ctgov/format";
import { errorMessage, extractRecord, matchTrial, searchTrials } from "./api";
import { TIER_ORDER, phaseRank } from "./labels";

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type Stage = "record" | "profile" | "shortlist";
export const STAGES: Stage[] = ["record", "profile", "shortlist"];
export const STAGE_LABELS: Record<Stage, string> = {
  record: "Record",
  profile: "Profile",
  shortlist: "Shortlist",
};

export type MatchStatus = "pending" | "running" | "done" | "error";
export type SortKey = "rank" | "score" | "phase";

export interface WorkspaceFilters {
  tiers: Record<MatchTier, boolean>;
  /** Selected phase labels (as produced by formatPhase). Empty = all phases. */
  phases: string[];
  hideIneligible: boolean;
  sort: SortKey;
  onlyShortlisted: boolean;
}

export interface TrialsMeta {
  queryDescription: string;
  source: TrialSearchResponse["source"];
  totalAvailable?: number;
}

export const MIN_RECORD_CHARS = 40;
export const MATCH_CONCURRENCY = 4;
const RETRY_DELAY_MS = 600;

interface WorkspaceData {
  stage: Stage;
  furthestStage: Stage;
  recordText: string;
  demoPatientId?: string;
  patientLabel?: string;
  profile?: PatientProfile;
  extracting: boolean;
  extractError?: string;
  searching: boolean;
  searchError?: string;
  trials: Trial[];
  trialsMeta?: TrialsMeta;
  matches: Record<string, TrialMatch>;
  matchStatus: Record<string, MatchStatus>;
  matching: boolean;
  matchError?: string;
  reviews: Record<string, ReviewState>;
  activeEvidence?: Evidence[];
  filters: WorkspaceFilters;
  expanded: Record<string, boolean>;
}

interface WorkspaceActions {
  setRecordText: (text: string) => void;
  loadSample: (patient: DemoPatient) => void;
  extract: () => Promise<void>;
  confirmProfile: () => Promise<void>;
  matchAll: () => Promise<void>;
  retryMatch: (nctId: string) => void;
  setReview: (nctId: string, decision: ReviewDecision) => void;
  toggleExpanded: (nctId: string) => void;
  setFilters: (patch: Partial<WorkspaceFilters>) => void;
  resetFilters: () => void;
  setActiveEvidence: (evidence?: Evidence[]) => void;
  goToStage: (stage: Stage) => void;
  reset: () => void;
}

export type WorkspaceState = WorkspaceData & WorkspaceActions;

/* ---------------------------------------------------------------------------
   Initial state
   --------------------------------------------------------------------------- */

export function defaultFilters(): WorkspaceFilters {
  return {
    tiers: { strong: true, possible: true, unlikely: true, ineligible: true },
    phases: [],
    hideIneligible: false,
    sort: "rank",
    onlyShortlisted: false,
  };
}

function initialData(): WorkspaceData {
  return {
    stage: "record",
    furthestStage: "record",
    recordText: "",
    demoPatientId: undefined,
    patientLabel: undefined,
    profile: undefined,
    extracting: false,
    extractError: undefined,
    searching: false,
    searchError: undefined,
    trials: [],
    trialsMeta: undefined,
    matches: {},
    matchStatus: {},
    matching: false,
    matchError: undefined,
    reviews: {},
    activeEvidence: undefined,
    filters: defaultFilters(),
    expanded: {},
  };
}

/** Everything downstream of a (re)extracted profile. */
function clearedResults(): Pick<
  WorkspaceData,
  | "trials"
  | "trialsMeta"
  | "matches"
  | "matchStatus"
  | "matching"
  | "matchError"
  | "reviews"
  | "expanded"
  | "searchError"
> {
  return {
    trials: [],
    trialsMeta: undefined,
    matches: {},
    matchStatus: {},
    matching: false,
    matchError: undefined,
    reviews: {},
    expanded: {},
    searchError: undefined,
  };
}

function stageIndex(stage: Stage): number {
  return STAGES.indexOf(stage);
}

function furthest(a: Stage, b: Stage): Stage {
  return stageIndex(a) >= stageIndex(b) ? a : b;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Run generation. Every async action captures the current value and drops its
 * result if the workspace moved on (re-extract, new search, reset) meanwhile.
 */
let generation = 0;

/* ---------------------------------------------------------------------------
   Store
   --------------------------------------------------------------------------- */

export const useWorkspace = create<WorkspaceState>()((set, get) => ({
  ...initialData(),

  setRecordText: (text) => {
    const sample = DEMO_PATIENTS.find((p) => p.record === text);
    set({
      recordText: text,
      demoPatientId: sample?.id,
      patientLabel: sample?.label,
      extractError: undefined,
    });
  },

  loadSample: (patient) => {
    set({
      recordText: patient.record,
      demoPatientId: patient.id,
      patientLabel: patient.label,
      extractError: undefined,
    });
  },

  extract: async () => {
    const { recordText, demoPatientId, patientLabel, extracting } = get();
    if (extracting || recordText.trim().length < MIN_RECORD_CHARS) return;
    const token = ++generation;
    set({ extracting: true, extractError: undefined });
    try {
      const { profile } = await extractRecord({ text: recordText, demoPatientId });
      if (token !== generation) return;
      set((s) => ({
        ...clearedResults(),
        profile,
        patientLabel: profile.label ?? patientLabel,
        extracting: false,
        stage: "profile",
        furthestStage: "profile",
        activeEvidence: undefined,
        filters: { ...s.filters, phases: [] },
      }));
    } catch (error) {
      if (token !== generation) return;
      set({ extracting: false, extractError: errorMessage(error) });
    }
  },

  confirmProfile: async () => {
    const { profile, searching } = get();
    if (!profile || searching) return;
    const token = ++generation;
    set({ searching: true, searchError: undefined });
    try {
      const res = await searchTrials({ profile });
      if (token !== generation) return;
      const matchStatus: Record<string, MatchStatus> = {};
      for (const t of res.trials) matchStatus[t.nctId] = "pending";
      set((s) => ({
        ...clearedResults(),
        trials: res.trials,
        trialsMeta: {
          queryDescription: res.queryDescription,
          source: res.source,
          totalAvailable: res.totalAvailable,
        },
        matchStatus,
        searching: false,
        stage: "shortlist",
        furthestStage: furthest(s.furthestStage, "shortlist"),
        activeEvidence: undefined,
        filters: { ...s.filters, phases: [], onlyShortlisted: false },
      }));
      void get().matchAll();
    } catch (error) {
      if (token !== generation) return;
      set({ searching: false, searchError: errorMessage(error) });
    }
  },

  matchAll: async () => {
    const { profile, trials, matching } = get();
    if (!profile || trials.length === 0 || matching) return;
    const token = generation;
    set({ matching: true, matchError: undefined });

    const attempts = new Map<string, number>();
    let failures = 0;
    let lastError = "";

    const setStatus = (nctId: string, status: MatchStatus) =>
      set((s) => ({ matchStatus: { ...s.matchStatus, [nctId]: status } }));

    const takeNext = (): Trial | undefined => {
      const s = get();
      return s.trials.find((t) => s.matchStatus[t.nctId] === "pending");
    };

    const worker = async () => {
      for (;;) {
        if (token !== generation) return;
        const trial = takeNext();
        if (!trial) return;
        const id = trial.nctId;
        const attempt = (attempts.get(id) ?? 0) + 1;
        attempts.set(id, attempt);
        setStatus(id, "running");
        try {
          const { match } = await matchTrial({ profile, trial });
          if (token !== generation) return;
          set((s) => ({
            matches: { ...s.matches, [id]: match },
            matchStatus: { ...s.matchStatus, [id]: "done" },
          }));
        } catch (error) {
          if (token !== generation) return;
          if (attempt < 2) {
            await sleep(RETRY_DELAY_MS);
            if (token !== generation) return;
            setStatus(id, "pending");
          } else {
            failures++;
            lastError = errorMessage(error);
            setStatus(id, "error");
          }
        }
      }
    };

    // Small promise pool: workers pull from the store until nothing is pending.
    // Loop so trials re-queued by retryMatch() during the tail are picked up too.
    do {
      const size = Math.min(MATCH_CONCURRENCY, trials.length);
      await Promise.all(Array.from({ length: size }, worker));
      if (token !== generation) return;
    } while (takeNext());

    set({
      matching: false,
      matchError:
        failures > 0
          ? `${failures} ${failures === 1 ? "trial" : "trials"} could not be screened. ${lastError}`.trim()
          : undefined,
    });
  },

  retryMatch: (nctId) => {
    const { matchStatus, matching } = get();
    if (matchStatus[nctId] !== "error") return;
    set({ matchStatus: { ...matchStatus, [nctId]: "pending" }, matchError: undefined });
    if (!matching) void get().matchAll();
  },

  setReview: (nctId, decision) => {
    set((s) => ({
      reviews: {
        ...s.reviews,
        [nctId]: { decision, updatedAt: new Date().toISOString() },
      },
    }));
  },

  toggleExpanded: (nctId) => {
    set((s) => ({ expanded: { ...s.expanded, [nctId]: !s.expanded[nctId] } }));
  },

  setFilters: (patch) => {
    set((s) => ({ filters: { ...s.filters, ...patch } }));
  },

  resetFilters: () => set({ filters: defaultFilters() }),

  setActiveEvidence: (evidence) => {
    set({ activeEvidence: evidence && evidence.length > 0 ? evidence : undefined });
  },

  goToStage: (stage) => {
    const { furthestStage, stage: current } = get();
    if (stage === current) return;
    if (stageIndex(stage) > stageIndex(furthestStage)) return;
    set({ stage, activeEvidence: undefined });
  },

  reset: () => {
    generation++;
    set(initialData());
  },
}));

/* ---------------------------------------------------------------------------
   Derived data (pure functions + memoised hooks)
   --------------------------------------------------------------------------- */

export interface RankedEntry {
  trial: Trial;
  match?: TrialMatch;
  status: MatchStatus;
  review: ReviewDecision;
  /** 1-based position in the ranked list. */
  rank: number;
}

function unknowns(m: TrialMatch): number {
  return m.counts.unknown;
}

function compareRank(a: TrialMatch, b: TrialMatch): number {
  return (
    TIER_ORDER[a.tier] - TIER_ORDER[b.tier] ||
    b.score - a.score ||
    unknowns(a) - unknowns(b)
  );
}

/**
 * Ranks screened trials (tier → score → fewer unknowns); trials without a
 * verdict yet trail the list in registry order so the list stays alive while
 * verdicts stream in.
 */
export function rankTrials(
  trials: Trial[],
  matches: Record<string, TrialMatch>,
  matchStatus: Record<string, MatchStatus>,
  reviews: Record<string, ReviewState>,
  sort: SortKey = "rank",
): RankedEntry[] {
  const done: Array<{ trial: Trial; match: TrialMatch; index: number }> = [];
  const pending: Array<{ trial: Trial; index: number }> = [];
  trials.forEach((trial, index) => {
    const match = matches[trial.nctId];
    if (match) done.push({ trial, match, index });
    else pending.push({ trial, index });
  });

  done.sort((a, b) => {
    switch (sort) {
      case "score":
        return b.match.score - a.match.score || compareRank(a.match, b.match) || a.index - b.index;
      case "phase":
        return (
          phaseRank(b.trial.phases) - phaseRank(a.trial.phases) ||
          compareRank(a.match, b.match) ||
          a.index - b.index
        );
      default:
        return compareRank(a.match, b.match) || a.index - b.index;
    }
  });

  const ordered = [
    ...done.map(({ trial, match }) => ({ trial, match })),
    ...pending.map(({ trial }) => ({ trial, match: undefined })),
  ];
  return ordered.map(({ trial, match }, i) => ({
    trial,
    match,
    status: matchStatus[trial.nctId] ?? (match ? "done" : "pending"),
    review: reviews[trial.nctId]?.decision ?? "none",
    rank: i + 1,
  }));
}

export function applyFilters(entries: RankedEntry[], filters: WorkspaceFilters): RankedEntry[] {
  const phaseSet = new Set(filters.phases);
  return entries.filter((e) => {
    if (filters.onlyShortlisted && e.review !== "shortlisted") return false;
    if (phaseSet.size > 0 && !phaseSet.has(formatPhase(e.trial.phases))) return false;
    if (e.match) {
      if (!filters.tiers[e.match.tier]) return false;
      if (filters.hideIneligible && e.match.tier === "ineligible") return false;
    }
    return true;
  });
}

export interface TierCounts {
  strong: number;
  possible: number;
  unlikely: number;
  ineligible: number;
  /** Trials with a verdict. */
  screened: number;
  /** Trials that failed to screen. */
  errors: number;
  total: number;
}

export function countTiers(
  trials: Trial[],
  matches: Record<string, TrialMatch>,
  matchStatus: Record<string, MatchStatus>,
): TierCounts {
  const c: TierCounts = {
    strong: 0,
    possible: 0,
    unlikely: 0,
    ineligible: 0,
    screened: 0,
    errors: 0,
    total: trials.length,
  };
  for (const t of trials) {
    const m = matches[t.nctId];
    if (m) {
      c[m.tier]++;
      c.screened++;
    } else if (matchStatus[t.nctId] === "error") {
      c.errors++;
    }
  }
  return c;
}

export function useRankedTrials(): { all: RankedEntry[]; visible: RankedEntry[]; hidden: number } {
  const trials = useWorkspace((s) => s.trials);
  const matches = useWorkspace((s) => s.matches);
  const matchStatus = useWorkspace((s) => s.matchStatus);
  const reviews = useWorkspace((s) => s.reviews);
  const filters = useWorkspace((s) => s.filters);
  return useMemo(() => {
    const all = rankTrials(trials, matches, matchStatus, reviews, filters.sort);
    const visible = applyFilters(all, filters);
    return { all, visible, hidden: all.length - visible.length };
  }, [trials, matches, matchStatus, reviews, filters]);
}

export function useTierCounts(): TierCounts {
  const trials = useWorkspace((s) => s.trials);
  const matches = useWorkspace((s) => s.matches);
  const matchStatus = useWorkspace((s) => s.matchStatus);
  return useMemo(() => countTiers(trials, matches, matchStatus), [trials, matches, matchStatus]);
}

/** Distinct phase labels present in the current trial set, best phase first. */
export function usePhaseOptions(): string[] {
  const trials = useWorkspace((s) => s.trials);
  return useMemo(() => {
    const seen = new Map<string, number>();
    for (const t of trials) {
      const label = formatPhase(t.phases);
      if (!seen.has(label)) seen.set(label, phaseRank(t.phases));
    }
    return [...seen.entries()].sort((a, b) => b[1] - a[1]).map(([label]) => label);
  }, [trials]);
}

export function useShortlistedCount(): number {
  const reviews = useWorkspace((s) => s.reviews);
  const trials = useWorkspace((s) => s.trials);
  return useMemo(
    () => trials.filter((t) => reviews[t.nctId]?.decision === "shortlisted").length,
    [trials, reviews],
  );
}
