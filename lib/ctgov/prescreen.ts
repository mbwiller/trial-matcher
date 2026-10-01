import type { PatientProfile, PrescreenEntry, PrescreenReason, Trial } from "@/lib/types";
import { formatAgeRange } from "./format";
import { profileFacets, scoreWithFacets, trialAcceptsAge } from "./query";

/**
 * Deterministic pre-screen between the registry harvest and the criterion-level
 * review. Every harvested study gets exactly one outcome and the signals behind
 * it, so the funnel can be shown study by study:
 *
 *   hard gates   location → sex → age → study type → subtype → setting
 *   relevance    scoreWithFacets() ≥ MIN_RELEVANCE, else set aside
 *   cut-off      the `limit` best-scoring studies are selected for review; the
 *                rest stay "relevant" (not reviewed, never hidden)
 *
 * Nothing here judges eligibility. A gate only fires on facts the registry
 * states structurally (sex, age window, site countries, intervention types) or
 * in the title/conditions (subtype, setting); the fine print is left to the
 * criterion-level review.
 */

export const DEFAULT_REVIEW_LIMIT = 16;
/** Minimum relevance score to count as relevant to the profile. */
export const MIN_RELEVANCE = 2;

/** Intervention types that make a study a treatment study. */
const THERAPEUTIC_TYPES: ReadonlySet<string> = new Set([
  "DRUG",
  "BIOLOGICAL",
  "COMBINATION_PRODUCT",
  "GENETIC",
  "RADIATION",
  "PROCEDURE",
]);

export interface PrescreenOptions {
  /** Studies sent to criterion-level review (default 16). */
  limit?: number;
  /** Require at least one site in this country (exact CT.gov country name). Omit for no location gate. */
  country?: string;
}

export interface PrescreenResult {
  /** One entry per input study, in input order. */
  entries: PrescreenEntry[];
  /** The selected studies, best first. */
  selected: Trial[];
}

/** 3 > 2/3 > 2 > 1/2 > 1 > early 1 > not applicable. */
function phaseRank(phases: string[]): number {
  let best = -1;
  for (const raw of phases) {
    const p = raw.toUpperCase();
    const n = p === "EARLY_PHASE1" ? 0.5 : p === "NA" ? 0 : Number(p.replace("PHASE", ""));
    if (!Number.isNaN(n)) best = Math.max(best, n);
  }
  // Phase 4 studies are post-marketing: rank them with phase 2.
  return best === 4 ? 2 : best;
}

function interventionTypes(trial: Trial): string[] {
  return [...new Set((trial.interventions ?? []).map((i) => i.type.toUpperCase()))];
}

function typeLabel(type: string): string {
  return type.toLowerCase().replace(/_/g, " ");
}

/** The first hard gate the study fails, with the fact that triggered it. */
function gate(
  trial: Trial,
  sex: "female" | "male" | "unknown",
  age: number | undefined,
  country: string | undefined,
): { reason: PrescreenReason; signal: string } | undefined {
  if (country) {
    const countries = trial.countries ?? [...new Set(trial.locations.map((l) => l.country).filter((c): c is string => Boolean(c)))];
    if (!countries.includes(country)) {
      const where = countries.length === 0 ? "no sites listed" : countries.length <= 3 ? `sites in ${countries.join(", ")}` : `sites in ${countries.length} other countries`;
      return { reason: "location", signal: `No site in ${country} (${where})` };
    }
  }
  if (sex === "male" && trial.sex === "FEMALE") return { reason: "sex", signal: "Enrolls women only" };
  if (sex === "female" && trial.sex === "MALE") return { reason: "sex", signal: "Enrolls men only" };
  if (age !== undefined && !trialAcceptsAge(trial, age)) {
    return { reason: "age", signal: `Age window ${formatAgeRange(trial.minimumAge, trial.maximumAge)}; patient is ${age}` };
  }
  const purpose = trial.primaryPurpose?.toUpperCase();
  if (purpose && purpose !== "TREATMENT") {
    return { reason: "study-type", signal: `Not a treatment study (primary purpose: ${typeLabel(purpose)})` };
  }
  const types = interventionTypes(trial);
  if (types.length > 0 && !types.some((t) => THERAPEUTIC_TYPES.has(t))) {
    return { reason: "study-type", signal: `Not a treatment study (${types.map(typeLabel).join(", ")} only)` };
  }
  return undefined;
}

export function prescreenTrials(profile: PatientProfile, trials: Trial[], options: PrescreenOptions = {}): PrescreenResult {
  const limit = Math.max(1, Math.floor(options.limit ?? DEFAULT_REVIEW_LIMIT));
  const country = options.country?.trim() || undefined;
  const facets = profileFacets(profile);

  const entries: PrescreenEntry[] = [];
  const relevant: Array<{ trial: Trial; entry: PrescreenEntry; index: number }> = [];

  trials.forEach((trial, index) => {
    const base = { nctId: trial.nctId, title: trial.title, phases: trial.phases };
    const blocked = gate(trial, facets.sex, facets.age, country);
    if (blocked) {
      entries.push({ ...base, outcome: "set-aside", reason: blocked.reason, score: 0, signals: [blocked.signal] });
      return;
    }
    const relevance = scoreWithFacets(facets, trial);
    const conflict = relevance.conflicts[0];
    if (conflict) {
      const signals = relevance.reasons.filter((r) => r.includes("conflict"));
      entries.push({ ...base, outcome: "set-aside", reason: conflict, score: relevance.score, signals });
      return;
    }
    if (relevance.score < MIN_RELEVANCE) {
      const signals = relevance.reasons.length ? relevance.reasons : ["No subtype, setting or biomarker signal in the title, conditions or summary"];
      entries.push({ ...base, outcome: "set-aside", reason: "relevance", score: relevance.score, signals });
      return;
    }
    const entry: PrescreenEntry = { ...base, outcome: "relevant", score: relevance.score, signals: relevance.reasons };
    entries.push(entry);
    relevant.push({ trial, entry, index });
  });

  relevant.sort((a, b) => {
    if (b.entry.score !== a.entry.score) return b.entry.score - a.entry.score;
    // Ties: later phase, then more sites (the trials a patient can most plausibly reach), then most recently updated.
    const phase = phaseRank(b.trial.phases) - phaseRank(a.trial.phases);
    if (phase !== 0) return phase;
    if (b.trial.locationCount !== a.trial.locationCount) return b.trial.locationCount - a.trial.locationCount;
    const ua = a.trial.lastUpdated ?? "";
    const ub = b.trial.lastUpdated ?? "";
    if (ua !== ub) return ub.localeCompare(ua);
    return a.index - b.index;
  });

  const selected = relevant.slice(0, limit);
  for (const s of selected) s.entry.outcome = "selected";
  return { entries, selected: selected.map((s) => s.trial) };
}

export interface PrescreenSummary {
  harvested: number;
  /** Studies that passed every gate (selected + relevant). */
  relevant: number;
  selected: number;
  setAside: Record<PrescreenReason, number>;
}

export function summarizePrescreen(entries: PrescreenEntry[]): PrescreenSummary {
  const setAside: Record<PrescreenReason, number> = { location: 0, sex: 0, age: 0, "study-type": 0, subtype: 0, setting: 0, relevance: 0 };
  let relevant = 0;
  let selected = 0;
  for (const e of entries) {
    if (e.outcome === "set-aside") setAside[e.reason ?? "relevance"]++;
    else {
      relevant++;
      if (e.outcome === "selected") selected++;
    }
  }
  return { harvested: entries.length, relevant, selected, setAside };
}
