import type { Trial } from "@/lib/types";
import { normalizeStudy } from "./normalize";

/**
 * Thin client for the ClinicalTrials.gov API v2 (https://clinicaltrials.gov/data-api/api).
 *
 * Verified behaviour (Sept 2026):
 *   - `query.cond` / `query.term` take Essie expressions; space-separated words
 *     are ANDed, `OR`, parentheses and "quoted phrases" work. Trailing `+`/`-`
 *     on a token is ignored ("HER2+" ≡ "HER2").
 *   - `filter.advanced` takes Essie with AREA[...] selectors, e.g.
 *     `AREA[StudyType]INTERVENTIONAL AND AREA[Sex](ALL OR FEMALE)`.
 *   - `fields` accepts legacy field names (NCTId, BriefTitle, LocationCity …)
 *     and returns them in the normal `protocolSection.*Module` shape.
 *   - Errors come back as HTTP 400/404 with a plain-text body.
 *   - Default ordering is relevance; `sort=LastUpdatePostDate:desc` etc. work.
 */

export const CTGOV_API_BASE = "https://clinicaltrials.gov/api/v2";
export const DEFAULT_TIMEOUT_MS = 15_000;
export const DEFAULT_RETRIES = 1;
export const DEFAULT_PAGE_SIZE = 50;
export const MAX_PAGE_SIZE = 1000;
const RETRY_DELAY_MS = 400;

/** Field projection sufficient for normalizeStudy(); roughly halves the payload versus full studies. */
export const STUDY_FIELDS: readonly string[] = [
  "NCTId",
  "BriefTitle",
  "OfficialTitle",
  "OverallStatus",
  "StartDate",
  "PrimaryCompletionDate",
  "LastUpdatePostDate",
  "LeadSponsorName",
  "BriefSummary",
  "Condition",
  "Keyword",
  "StudyType",
  "Phase",
  "EnrollmentCount",
  "InterventionType",
  "InterventionName",
  "EligibilityCriteria",
  "Sex",
  "MinimumAge",
  "MaximumAge",
  "LocationFacility",
  "LocationCity",
  "LocationState",
  "LocationCountry",
  "LocationStatus",
];

export interface CtgovSearchParams {
  /** Condition or disease (`query.cond`), e.g. "breast cancer". */
  cond?: string;
  /** Other terms (`query.term`), Essie syntax. */
  term?: string;
  /** Intervention/treatment (`query.intr`). */
  intr?: string;
  /** `filter.overallStatus`, e.g. ["RECRUITING"]. */
  overallStatus?: string[];
  /** `filter.advanced`, Essie with AREA[...] selectors. */
  advanced?: string;
  /** `filter.ids` — restrict to specific NCT ids. */
  ids?: string[];
  /** 1–1000, default 50. */
  pageSize?: number;
  /** Continuation token from a previous response. */
  pageToken?: string;
  /** e.g. "LastUpdatePostDate:desc". Omit for relevance ordering. */
  sort?: string;
  /** Field projection; defaults to STUDY_FIELDS. */
  fields?: string[];
  /** Ask for `totalCount` in the response. */
  countTotal?: boolean;
}

export interface CtgovRequestOptions {
  /** Per-attempt timeout (default 15 s). */
  timeoutMs?: number;
  /** Extra attempts after a network error, timeout or 5xx (default 1). */
  retries?: number;
  /** Caller-owned abort signal (e.g. a route-level deadline). Aborting it stops retries. */
  signal?: AbortSignal;
}

export interface CtgovSearchResult {
  studies: unknown[];
  totalCount?: number;
  nextPageToken?: string;
}

export interface CtgovTrialPage {
  trials: Trial[];
  totalCount?: number;
  nextPageToken?: string;
}

export type CtgovErrorKind = "http" | "network" | "timeout" | "parse" | "invalid";

/** Descriptive error for any failure talking to ClinicalTrials.gov. */
export class CtgovError extends Error {
  readonly kind: CtgovErrorKind;
  readonly status?: number;
  readonly url?: string;
  readonly retryable: boolean;

  constructor(
    message: string,
    init: { kind: CtgovErrorKind; status?: number; url?: string; retryable?: boolean; cause?: unknown },
  ) {
    super(message, init.cause === undefined ? undefined : { cause: init.cause });
    this.name = "CtgovError";
    this.kind = init.kind;
    this.status = init.status;
    this.url = init.url;
    this.retryable = init.retryable ?? false;
  }
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, Math.floor(n)));
}

/** Build the `/studies` search URL. Brackets, parentheses and quotes are percent-encoded by URLSearchParams. */
export function buildSearchUrl(params: CtgovSearchParams): string {
  const sp = new URLSearchParams();
  if (params.cond?.trim()) sp.set("query.cond", params.cond.trim());
  if (params.term?.trim()) sp.set("query.term", params.term.trim());
  if (params.intr?.trim()) sp.set("query.intr", params.intr.trim());
  if (params.overallStatus?.length) sp.set("filter.overallStatus", params.overallStatus.join(","));
  if (params.advanced?.trim()) sp.set("filter.advanced", params.advanced.trim());
  if (params.ids?.length) sp.set("filter.ids", params.ids.join(","));
  if (params.sort) sp.set("sort", params.sort);
  if (params.countTotal) sp.set("countTotal", "true");
  if (params.pageToken) sp.set("pageToken", params.pageToken);
  sp.set("pageSize", String(clamp(params.pageSize ?? DEFAULT_PAGE_SIZE, 1, MAX_PAGE_SIZE)));
  sp.set("fields", (params.fields?.length ? params.fields : STUDY_FIELDS).join(","));
  sp.set("format", "json");
  return `${CTGOV_API_BASE}/studies?${sp.toString()}`;
}

export function buildStudyUrl(nctId: string): string {
  const id = nctId.trim().toUpperCase();
  if (!/^NCT\d{8}$/.test(id)) {
    throw new CtgovError(`"${nctId}" is not a valid NCT id (expected NCT followed by 8 digits).`, { kind: "invalid" });
  }
  return `${CTGOV_API_BASE}/studies/${id}?format=json`;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function readErrorBody(res: Response): Promise<string> {
  try {
    const text = (await res.text()).replace(/\s+/g, " ").trim();
    return text.length > 200 ? `${text.slice(0, 200)}…` : text;
  } catch {
    return "";
  }
}

/**
 * GET a JSON document with a per-attempt timeout (AbortController) and one
 * retry on network errors, timeouts and 5xx responses. 4xx responses are not
 * retried. Every failure surfaces as a CtgovError.
 */
export async function requestJson(url: string, options: CtgovRequestOptions = {}): Promise<unknown> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const retries = Math.max(0, options.retries ?? DEFAULT_RETRIES);
  const external = options.signal;
  let lastError: CtgovError | undefined;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (external?.aborted) {
      throw lastError ?? new CtgovError("ClinicalTrials.gov request was cancelled before it started.", { kind: "network", url });
    }
    if (attempt > 0) await sleep(RETRY_DELAY_MS * attempt);

    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeoutMs);
    const onExternalAbort = () => controller.abort();
    external?.addEventListener("abort", onExternalAbort, { once: true });

    try {
      const res = await fetch(url, {
        headers: { accept: "application/json" },
        cache: "no-store",
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await readErrorBody(res);
        const retryable = res.status >= 500 || res.status === 429;
        const err = new CtgovError(
          `ClinicalTrials.gov responded with HTTP ${res.status}${body ? `: ${body}` : ""}`,
          { kind: "http", status: res.status, url, retryable },
        );
        if (retryable && attempt < retries) {
          lastError = err;
          continue;
        }
        throw err;
      }

      try {
        return await res.json();
      } catch (cause) {
        throw new CtgovError("ClinicalTrials.gov returned a response that is not valid JSON.", { kind: "parse", url, cause });
      }
    } catch (cause) {
      if (cause instanceof CtgovError) {
        if (cause.retryable && attempt < retries) {
          lastError = cause;
          continue;
        }
        throw cause;
      }
      const cancelled = external?.aborted === true;
      const message = cause instanceof Error ? cause.message : String(cause);
      const err = timedOut
        ? new CtgovError(`ClinicalTrials.gov did not respond within ${timeoutMs} ms.`, { kind: "timeout", url, retryable: true, cause })
        : cancelled
          ? new CtgovError("ClinicalTrials.gov request was cancelled.", { kind: "network", url, retryable: false, cause })
          : new CtgovError(`Could not reach ClinicalTrials.gov: ${message}`, { kind: "network", url, retryable: true, cause });
      if (err.retryable && attempt < retries) {
        lastError = err;
        continue;
      }
      throw err;
    } finally {
      clearTimeout(timer);
      external?.removeEventListener("abort", onExternalAbort);
    }
  }

  throw lastError ?? new CtgovError("ClinicalTrials.gov request failed.", { kind: "network", url });
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/** Search studies; returns raw v2 study objects plus paging metadata. */
export async function searchStudies(
  params: CtgovSearchParams,
  options: CtgovRequestOptions = {},
): Promise<CtgovSearchResult> {
  const url = buildSearchUrl(params);
  const json = await requestJson(url, options);
  if (!isRecord(json)) {
    throw new CtgovError("ClinicalTrials.gov search response had an unexpected shape.", { kind: "parse", url });
  }
  return {
    studies: Array.isArray(json.studies) ? json.studies : [],
    totalCount: typeof json.totalCount === "number" ? json.totalCount : undefined,
    nextPageToken: typeof json.nextPageToken === "string" && json.nextPageToken ? json.nextPageToken : undefined,
  };
}

/** Fetch one study (full record) by NCT id. 404 → CtgovError with status 404. */
export async function fetchStudy(nctId: string, options: CtgovRequestOptions = {}): Promise<unknown> {
  const url = buildStudyUrl(nctId);
  const json = await requestJson(url, options);
  if (!isRecord(json) || !isRecord(json.protocolSection)) {
    throw new CtgovError(`ClinicalTrials.gov returned no protocol section for ${nctId}.`, { kind: "parse", url });
  }
  return json;
}

/** Search and normalise one page of studies into Trial objects (de-duplicated by NCT id). */
export async function searchTrialsPage(
  params: CtgovSearchParams,
  options: CtgovRequestOptions = {},
): Promise<CtgovTrialPage> {
  const page = await searchStudies(params, options);
  const seen = new Set<string>();
  const trials: Trial[] = [];
  for (const study of page.studies) {
    const trial = normalizeStudy(study);
    if (trial.nctId === "UNKNOWN" || seen.has(trial.nctId)) continue;
    seen.add(trial.nctId);
    trials.push(trial);
  }
  return { trials, totalCount: page.totalCount, nextPageToken: page.nextPageToken };
}

/** Search and normalise via normalizeStudy(). */
export async function searchTrials(params: CtgovSearchParams, options: CtgovRequestOptions = {}): Promise<Trial[]> {
  return (await searchTrialsPage(params, options)).trials;
}

/** Fetch and normalise one study. */
export async function fetchTrial(nctId: string, options: CtgovRequestOptions = {}): Promise<Trial> {
  return normalizeStudy(await fetchStudy(nctId, options));
}
