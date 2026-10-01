import { NextResponse } from "next/server";
import type { PatientProfile, SearchTrace, TrialSearchResponse } from "@/lib/types";
import { demoHarvest } from "@/lib/demo/harvest";
import { demoTrials } from "@/lib/demo/trials";
import { CtgovError } from "@/lib/ctgov/client";
import { prescreenTrials } from "@/lib/ctgov/prescreen";
import { buildTrialQuery, DEFAULT_LIMIT } from "@/lib/ctgov/query";
import { searchTrialsForProfile } from "@/lib/ctgov/search";

/**
 * POST /api/trials — TrialSearchRequest → TrialSearchResponse.
 *
 * Demo profiles (`profile.source === "demo"`) and deployments with
 * TRIAL_MATCHER_LIVE_REGISTRY=0 always get the bundled registry snapshot, so
 * the precomputed demo verdicts line up. Everything else queries
 * ClinicalTrials.gov live and falls back to the snapshot on any failure.
 * Either way the response carries a trace: every request, every harvested
 * study and the pre-screen decision made about it.
 * Request bodies are never logged.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

/** Leave headroom under maxDuration for serialization. */
const SEARCH_BUDGET_MS = 40_000;
const MAX_LIMIT = 50;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isLiveRegistryEnabled(): boolean {
  return process.env.TRIAL_MATCHER_LIVE_REGISTRY !== "0";
}

/** Country a study must have a site in (default United States); set TRIAL_MATCHER_COUNTRY="" to disable the gate. */
function siteCountry(): string | undefined {
  const raw = process.env.TRIAL_MATCHER_COUNTRY;
  return raw === undefined ? "United States" : raw.trim() || undefined;
}

/** Minimal structural validation: `profile` is an object carrying a `diagnosis` object. */
function parseRequest(body: unknown): { profile: PatientProfile; limit: number } | { error: string } {
  if (!isRecord(body)) return { error: "Request body must be a JSON object." };
  const profile = body.profile;
  if (!isRecord(profile)) return { error: "`profile` must be an object." };
  if (!isRecord(profile.diagnosis)) return { error: "`profile.diagnosis` must be an object." };
  const primary = profile.diagnosis.primary;
  if (primary !== undefined && (!isRecord(primary) || typeof primary.value !== "string")) {
    return { error: "`profile.diagnosis.primary.value` must be a string." };
  }
  const rawLimit = body.limit;
  const limit =
    typeof rawLimit === "number" && Number.isFinite(rawLimit)
      ? Math.min(MAX_LIMIT, Math.max(1, Math.floor(rawLimit)))
      : DEFAULT_LIMIT;
  return { profile: profile as unknown as PatientProfile, limit };
}

/** Pre-screen the bundled snapshot and replay its harvest manifest as the trace. */
function snapshotResponse(profile: PatientProfile, limit: number, note?: string): TrialSearchResponse {
  const trials = demoTrials();
  const harvest = demoHarvest();
  const country = siteCountry();
  const { entries, selected } = prescreenTrials(profile, trials, { limit, country });
  const trace: SearchTrace = {
    mode: "snapshot",
    fetchedAt: harvest.fetchedAt,
    dataTimestamp: harvest.api.dataTimestamp,
    registryTotal: harvest.registry.totalStudies,
    requests: [
      {
        label: "Registry harvest",
        url: harvest.query.url,
        cond: harvest.query.cond,
        filters: ["Recruiting", "Interventional"],
        pages: harvest.pages.map((p) => ({ page: p.page, studies: p.studies, ms: p.ms, bytes: p.bytes })),
        total: harvest.registry.matching,
      },
    ],
    harvested: trials.length,
    criteriaParsed: harvest.totals.criteria,
    country,
    prescreen: entries,
    reviewLimit: limit,
  };
  const description = `Registry snapshot · ${trials.length.toLocaleString("en-US")} recruiting interventional breast cancer studies`;
  return {
    trials: selected,
    queryDescription: note ? `${description} · ${note}` : description,
    source: "fixture",
    totalAvailable: trials.length,
    trace,
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = parseRequest(body);
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { profile, limit } = parsed;

  if (!isLiveRegistryEnabled() || profile.source === "demo") {
    return NextResponse.json(snapshotResponse(profile, limit));
  }

  const diagnosis = profile.diagnosis.primary?.value?.trim() ?? "";
  if (!diagnosis) {
    return NextResponse.json(snapshotResponse(profile, limit, "no primary diagnosis in the profile"));
  }

  try {
    const result = await searchTrialsForProfile(profile, {
      limit,
      country: siteCountry(),
      signal: AbortSignal.timeout(SEARCH_BUDGET_MS),
    });
    return NextResponse.json(result);
  } catch (err) {
    // Log only the failure class, never the request or query text.
    const detail = err instanceof CtgovError ? `${err.kind}${err.status ? ` ${err.status}` : ""}` : err instanceof Error ? err.name : "unknown";
    console.error(`[api/trials] live registry search failed (${detail}); serving the bundled snapshot`);
    const attempted = buildTrialQuery(profile, { limit }).description;
    return NextResponse.json(snapshotResponse(profile, limit, `registry unavailable for "${attempted}"`));
  }
}
