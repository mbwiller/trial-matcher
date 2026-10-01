import type { PatientProfile, RegistryRequestTrace, SearchTrace, Trial, TrialSearchResponse } from "@/lib/types";
import {
  buildSearchUrl,
  searchTrialsPage,
  type CtgovRequestOptions,
  type CtgovSearchParams,
  type CtgovTrialPage,
} from "./client";
import { prescreenTrials } from "./prescreen";
import { buildTrialQuery, DEFAULT_LIMIT, profileFacets, type QueryBreadth } from "./query";

/**
 * Live registry search for a patient profile: run the focused query (and the
 * biomarker-targeted query when the profile has actionable biomarkers), widen
 * the query if too few candidates come back, then pre-screen the pool and
 * select the studies that go to criterion-level review. Every request and
 * every pre-screen decision is recorded in the returned trace.
 */

export type SearchPageFn = (params: CtgovSearchParams, options: CtgovRequestOptions) => Promise<CtgovTrialPage>;

export interface LiveSearchOptions {
  /** Trials sent to criterion-level review (default 16). */
  limit?: number;
  /** Deadline for the whole search (e.g. `AbortSignal.timeout(40_000)`). */
  signal?: AbortSignal;
  /** Widen the query while fewer relevant candidates than this (default min(limit, 12)). */
  minCandidates?: number;
  /** Require a site in this country (exact CT.gov country name). */
  country?: string;
  /** Injectable for tests. */
  searchPage?: SearchPageFn;
}

const BREADTHS: QueryBreadth[] = ["focused", "broad", "widest"];
const BREADTH_LABEL: Record<QueryBreadth, string> = {
  focused: "Focused query",
  broad: "Broadened query (subtype only)",
  widest: "Widest query (condition only)",
};

function filterLabels(params: CtgovSearchParams, sex: "female" | "male" | "unknown", country?: string): string[] {
  const out: string[] = [];
  if (params.overallStatus?.includes("RECRUITING")) out.push("Recruiting");
  if (params.advanced?.includes("INTERVENTIONAL")) out.push("Interventional");
  if (sex !== "unknown") out.push(`Sex: all or ${sex}`);
  if (country) out.push(`Site in ${country}`);
  return out;
}

export async function searchTrialsForProfile(
  profile: PatientProfile,
  opts: LiveSearchOptions = {},
): Promise<TrialSearchResponse> {
  const limit = Math.max(1, Math.floor(opts.limit ?? DEFAULT_LIMIT));
  const minCandidates = opts.minCandidates ?? Math.min(limit, 12);
  const searchPage = opts.searchPage ?? searchTrialsPage;
  const requestOptions: CtgovRequestOptions = { signal: opts.signal };
  const country = opts.country?.trim() || undefined;
  const sex = profileFacets(profile).sex;
  const startedAt = new Date().toISOString();

  const pool = new Map<string, Trial>();
  const add = (trials: Trial[]) => {
    for (const t of trials) if (!pool.has(t.nctId)) pool.set(t.nctId, t);
  };
  const relevantCount = () => prescreenTrials(profile, [...pool.values()], { limit, country }).selected.length;

  const requests: RegistryRequestTrace[] = [];
  /** Run one request and record it in the trace (failures are recorded by the caller's handling). */
  const traced = async (label: string, params: CtgovSearchParams): Promise<CtgovTrialPage> => {
    const started = performance.now();
    const page = await searchPage(params, requestOptions);
    requests.push({
      label,
      url: buildSearchUrl(params),
      cond: params.cond,
      term: params.term,
      filters: filterLabels(params, sex, country),
      pages: [{ page: 1, studies: page.trials.length, ms: Math.round(performance.now() - started) }],
      total: page.totalCount,
    });
    return page;
  };

  let description = "";
  let totalAvailable: number | undefined;
  let previousTerm: string | undefined;

  for (const breadth of BREADTHS) {
    const query = buildTrialQuery(profile, { limit, breadth, country });
    const first = breadth === "focused";
    if (!first && query.params.term === previousTerm) continue;
    previousTerm = query.params.term;

    if (first) {
      const jobs: Promise<CtgovTrialPage>[] = [traced(BREADTH_LABEL.focused, query.params)];
      if (query.biomarkerParams) jobs.push(traced("Biomarker query", query.biomarkerParams));
      const [primary, targeted] = await Promise.allSettled(jobs);
      // The main query must succeed; the biomarker query is best-effort.
      if (primary.status === "rejected") throw primary.reason;
      add(primary.value.trials);
      totalAvailable = primary.value.totalCount;
      if (targeted?.status === "fulfilled") add(targeted.value.trials);
      description = query.description;
    } else {
      try {
        const page = await traced(BREADTH_LABEL[breadth], query.params);
        add(page.trials);
        description = query.description;
        if (page.totalCount !== undefined) totalAvailable = page.totalCount;
      } catch {
        break; // keep what we already have
      }
    }
    if (relevantCount() >= minCandidates) break;
  }

  const harvested = [...pool.values()];
  const { entries, selected } = prescreenTrials(profile, harvested, { limit, country });
  const trace: SearchTrace = {
    mode: "live",
    fetchedAt: startedAt,
    requests,
    harvested: harvested.length,
    criteriaParsed: harvested.reduce((n, t) => n + t.criteria.length, 0),
    country,
    prescreen: entries,
    reviewLimit: limit,
  };
  return {
    trials: selected,
    queryDescription: description,
    source: "registry",
    totalAvailable: totalAvailable ?? harvested.length,
    trace,
  };
}
