import type { ExtractResponse, PatientProfile } from "@/lib/types";
import { ExtractRequestSchema, formatIssues } from "@/lib/schemas";
import { DEMO_PROFILES } from "@/lib/demo/profiles";
import { EngineError, hasLLM } from "@/lib/llm/client";
import { alignEvidence } from "@/lib/llm/evidence";
import { extractProfile } from "@/lib/llm/extract";
import { heuristicExtract } from "@/lib/llm/heuristic";

export const runtime = "nodejs";
export const maxDuration = 300;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function jsonError(error: string, status: number): Response {
  return Response.json({ error }, { status });
}

/**
 * POST /api/extract — ExtractRequest → ExtractResponse.
 * Demo patient → curated profile (re-aligned to the text) after a short
 * simulated delay; API key configured → live extraction; otherwise the
 * offline keyword heuristics. Record text is never logged.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must be JSON", 400);
  }
  const parsed = ExtractRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(`Invalid request — ${formatIssues(parsed.error)}`, 400);
  }
  const { text, demoPatientId } = parsed.data;

  try {
    const curated = demoPatientId ? DEMO_PROFILES[demoPatientId] : undefined;
    if (curated) {
      await sleep(900 + Math.random() * 500);
      const profile: PatientProfile = { ...alignEvidence(curated, text), source: "demo" };
      return Response.json({ profile, source: "demo" } satisfies ExtractResponse);
    }
    const profile = hasLLM() ? await extractProfile(text) : heuristicExtract(text);
    return Response.json({ profile, source: profile.source } satisfies ExtractResponse);
  } catch (error) {
    if (error instanceof EngineError) return jsonError(error.message, error.status);
    console.error("[api/extract] unexpected error:", error instanceof Error ? `${error.name}: ${error.message}` : "unknown");
    return jsonError("Unexpected error while structuring the record", 500);
  }
}
