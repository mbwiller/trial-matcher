import type { MatchResponse, PatientProfile, Trial, TrialMatch } from "@/lib/types";
import { MatchRequestSchema, formatIssues } from "@/lib/schemas";
import { DEMO_MATCHES } from "@/lib/demo/matches";
import { EngineError, hasLLM } from "@/lib/llm/client";
import { matchTrial } from "@/lib/llm/match";
import { heuristicMatch } from "@/lib/llm/heuristic";

export const runtime = "nodejs";
export const maxDuration = 300;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function jsonError(error: string, status: number): Response {
  return Response.json({ error }, { status });
}

/**
 * POST /api/match — MatchRequest → MatchResponse.
 * Precomputed demo match → returned after a short randomised delay; API key
 * configured → live evaluation; otherwise the offline keyword screen.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must be JSON", 400);
  }
  const parsed = MatchRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(`Invalid request — ${formatIssues(parsed.error)}`, 400);
  }
  const profile = parsed.data.profile as unknown as PatientProfile;
  const trial = parsed.data.trial as unknown as Trial;

  try {
    const curated = DEMO_MATCHES[profile.id]?.[trial.nctId];
    if (curated) {
      await sleep(250 + Math.random() * 650);
      const match: TrialMatch = { ...curated, source: "demo" };
      return Response.json({ match } satisfies MatchResponse);
    }
    const match = hasLLM() ? await matchTrial(profile, trial) : heuristicMatch(profile, trial);
    return Response.json({ match } satisfies MatchResponse);
  } catch (error) {
    if (error instanceof EngineError) return jsonError(error.message, error.status);
    console.error("[api/match] unexpected error:", error instanceof Error ? `${error.name}: ${error.message}` : "unknown");
    return jsonError("Unexpected error while evaluating the trial", 500);
  }
}
