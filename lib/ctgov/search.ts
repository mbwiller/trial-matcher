import type { PatientProfile, Trial, TrialSearchResponse } from "@/lib/types";
import { searchTrialsPage, type CtgovRequestOptions, type CtgovSearchParams, type CtgovTrialPage } from "./client";
import { buildTrialQuery, DEFAULT_LIMIT, filterByAge, prioritizeTrials, profileFacets, type QueryBreadth } from "./query";

/**
 * Live registry search for a patient profile: run the focused query (and the
 * biomarker-targeted query when the profile has actionable biomarkers), widen
 * the query if too few candidates come back, filter by age, rank, truncate.
 */

export type SearchPageFn = (params: CtgovSearchParams, options: CtgovRequestOptions) => Promise<CtgovTrialPage>;

export interface LiveSearchOptions {
  /** Trials to return (default 24). */
  limit?: number;
  /** Deadline for the whole search (e.g. `AbortSignal.timeout(40_000)`). */
  signal?: AbortSignal;
  /** Widen the query while fewer eligible candidates than this (default min(limit, 12)). */
  minCandidates?: number;
  /** Injectable for tests. */
  searchPage?: SearchPageFn;
}

const BREADTHS: QueryBreadth[] = ["focused", "broad", "widest"];

export async function searchTrialsForProfile(
  profile: PatientProfile,
  opts: LiveSearchOptions = {},
): Promise<TrialSearchResponse> {
  const limit = Math.max(1, Math.floor(opts.limit ?? DEFAULT_LIMIT));
  const minCandidates = opts.minCandidates ?? Math.min(limit, 12);
  const searchPage = opts.searchPage ?? searchTrialsPage;
  const requestOptions: CtgovRequestOptions = { signal: opts.signal };
  const age = profileFacets(profile).age;

  const pool = new Map<string, Trial>();
  const add = (trials: Trial[]) => {
    for (const t of trials) if (!pool.has(t.nctId)) pool.set(t.nctId, t);
  };
  const eligibleCount = () => filterByAge([...pool.values()], age).length;

  let description = "";
  let totalAvailable: number | undefined;
  let previousTerm: string | undefined;

  for (const breadth of BREADTHS) {
    const query = buildTrialQuery(profile, { limit, breadth });
    const first = breadth === "focused";
    if (!first && query.params.term === previousTerm) continue;
    previousTerm = query.params.term;

    if (first) {
      const jobs: Promise<CtgovTrialPage>[] = [searchPage(query.params, requestOptions)];
      if (query.biomarkerParams) jobs.push(searchPage(query.biomarkerParams, requestOptions));
      const [primary, targeted] = await Promise.allSettled(jobs);
      // The main query must succeed; the biomarker query is best-effort.
      if (primary.status === "rejected") throw primary.reason;
      add(primary.value.trials);
      totalAvailable = primary.value.totalCount;
      if (targeted?.status === "fulfilled") add(targeted.value.trials);
      description = query.description;
    } else {
      try {
        const page = await searchPage(query.params, requestOptions);
        add(page.trials);
        description = query.description;
        if (page.totalCount !== undefined) totalAvailable = page.totalCount;
      } catch {
        break; // keep what we already have
      }
    }
    if (eligibleCount() >= minCandidates) break;
  }

  const candidates = filterByAge([...pool.values()], age);
  const trials = prioritizeTrials(profile, candidates).slice(0, limit);
  return {
    trials,
    queryDescription: description,
    source: "registry",
    totalAvailable: totalAvailable ?? candidates.length,
  };
}
