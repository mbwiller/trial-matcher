import { getEngineStatus } from "@/lib/llm/client";

export const runtime = "nodejs";
export const maxDuration = 300;

/** GET /api/status → EngineStatus. The UI reads the model id from here; never hard-code it in copy. */
export async function GET(): Promise<Response> {
  return Response.json(getEngineStatus());
}
