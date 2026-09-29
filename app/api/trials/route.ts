import { NextResponse } from "next/server";
import type { PatientProfile, TrialSearchResponse } from "@/lib/types";
import { DEMO_TRIALS } from "@/lib/demo/trials";
import { CtgovError } from "@/lib/ctgov/client";
import { buildTrialQuery, DEFAULT_LIMIT, prioritizeTrials } from "@/lib/ctgov/query";
import { searchTrialsForProfile } from "@/lib/ctgov/search";

/**
 * POST /api/trials — TrialSearchRequest → TrialSearchResponse.
 *
 * Demo profiles (`profile.source === "demo"`) and deployments with
 * TRIAL_MATCHER_LIVE_REGISTRY=0 always get the bundled fixture, so the
 * precomputed demo verdicts line up. Everything else queries
 * ClinicalTrials.gov live and falls back to the fixture on any failure.
 * Request bodies are never logged.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

/** Leave headroom under maxDuration for serialisation. */
const SEARCH_BUDGET_MS = 40_000;
const MAX_LIMIT = 50;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isLiveRegistryEnabled(): boolean {
  return process.env.TRIAL_MATCHER_LIVE_REGISTRY !== "0";
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

function fixtureResponse(profile: PatientProfile, queryDescription: string): TrialSearchResponse {
  return {
    trials: prioritizeTrials(profile, DEMO_TRIALS),
    queryDescription,
    source: "fixture",
    totalAvailable: DEMO_TRIALS.length,
  };
}

const BUNDLED = `Bundled trial set · ${DEMO_TRIALS.length} recruiting breast cancer trials`;

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
    return NextResponse.json(fixtureResponse(profile, BUNDLED));
  }

  const diagnosis = profile.diagnosis.primary?.value?.trim() ?? "";
  if (!diagnosis) {
    return NextResponse.json(fixtureResponse(profile, `${BUNDLED} · no primary diagnosis in the profile`));
  }

  try {
    const result = await searchTrialsForProfile(profile, { limit, signal: AbortSignal.timeout(SEARCH_BUDGET_MS) });
    return NextResponse.json(result);
  } catch (err) {
    // Log only the failure class, never the request or query text.
    const detail = err instanceof CtgovError ? `${err.kind}${err.status ? ` ${err.status}` : ""}` : err instanceof Error ? err.name : "unknown";
    console.error(`[api/trials] live registry search failed (${detail}); serving bundled fixture`);
    const attempted = buildTrialQuery(profile, { limit }).description;
    return NextResponse.json(fixtureResponse(profile, `${attempted} · registry unavailable, showing the bundled trial set`));
  }
}
