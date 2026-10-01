/**
 * Anthropic client, engine configuration and the error type shared by the
 * extraction and matching engines.
 */
import Anthropic, {
  AnthropicError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  AuthenticationError,
  BadRequestError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
} from "@anthropic-ai/sdk";
import type { EngineStatus } from "@/lib/types";

export type Effort = "low" | "medium" | "high" | "xhigh" | "max";

const EFFORTS: readonly Effort[] = ["low", "medium", "high", "xhigh", "max"];

function readEffort(envName: string, fallback: Effort): Effort {
  const raw = process.env[envName]?.trim().toLowerCase();
  if (!raw) return fallback;
  if ((EFFORTS as readonly string[]).includes(raw)) return raw as Effort;
  console.warn(`[trial-matcher] ${envName}="${raw}" is not one of ${EFFORTS.join("|")}; using "${fallback}".`);
  return fallback;
}

/** Model id for live extraction/matching. Never write this into UI copy — read it from /api/status. */
export const MODEL_ID: string = process.env.TRIAL_MATCHER_MODEL?.trim() || "claude-opus-5-5";

/** Effort for record structuring (default "high" — long records, many fields). */
export const EXTRACT_EFFORT: Effort = readEffort("TRIAL_MATCHER_EXTRACT_EFFORT", "high");

/** Effort for per-trial criteria matching (default "medium" — ~20 calls per patient). */
export const MATCH_EFFORT: Effort = readEffort("TRIAL_MATCHER_MATCH_EFFORT", "medium");

/** True when an Anthropic API key is configured on the server. */
export function hasLLM(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

let client: Anthropic | undefined;

/** Memoized zero-arg client (credentials come from the environment). */
export function getClient(): Anthropic {
  client ??= new Anthropic();
  return client;
}

export function getEngineStatus(): EngineStatus {
  return {
    llm: hasLLM(),
    modelId: MODEL_ID,
    liveRegistry: process.env.TRIAL_MATCHER_LIVE_REGISTRY !== "0",
  };
}

/** An engine failure with a clinician-readable message and the HTTP status a route should return. */
export class EngineError extends Error {
  constructor(
    message: string,
    public status = 502,
  ) {
    super(message);
    this.name = "EngineError";
  }
}

/**
 * EngineError for a `stop_reason: "refusal"` response. With `fallbacks: "default"`
 * the API has already retried on Anthropic's recommended fallback model, so a
 * refusal that reaches us means the whole chain declined.
 */
export function refusalError(category: string | null | undefined, activity: string): EngineError {
  const label = category ? ` (safety category: ${category})` : "";
  return new EngineError(
    `The model declined this request while ${activity}${label}. Remove any content unrelated to the patient's oncology history and try again, or review the record manually.`,
    502,
  );
}

/**
 * Convert any error raised while calling the model into an EngineError with a
 * useful message. `activity` reads like "structuring the record".
 */
export function toEngineError(error: unknown, activity: string): EngineError {
  if (error instanceof EngineError) return error;
  if (error instanceof AuthenticationError) {
    return new EngineError("The Anthropic API rejected the server's API key. Check ANTHROPIC_API_KEY.", 502);
  }
  if (error instanceof PermissionDeniedError) {
    return new EngineError(
      `The configured API key is not permitted to use model "${MODEL_ID}". Check TRIAL_MATCHER_MODEL and the key's permissions.`,
      502,
    );
  }
  if (error instanceof NotFoundError) {
    return new EngineError(`Model "${MODEL_ID}" was not found. Check TRIAL_MATCHER_MODEL.`, 502);
  }
  if (error instanceof RateLimitError) {
    return new EngineError("The model is rate-limited right now. Wait a moment and try again.", 429);
  }
  if (error instanceof BadRequestError) {
    return new EngineError(`The Anthropic API rejected the request while ${activity}: ${error.message}`, 502);
  }
  if (error instanceof APIConnectionTimeoutError) {
    return new EngineError(`The request timed out while ${activity}. Long records can take several minutes — try again.`, 504);
  }
  if (error instanceof APIConnectionError) {
    return new EngineError("Could not reach the Anthropic API. Check the server's network connection.", 502);
  }
  if (error instanceof APIError) {
    return new EngineError(`The Anthropic API returned an error (${error.status ?? "no status"}) while ${activity}.`, 502);
  }
  if (error instanceof AnthropicError) {
    // Raised by messages.parse when the structured output does not validate.
    return new EngineError(`The model returned output that could not be read while ${activity}. Try again.`, 502);
  }
  return new EngineError(`Unexpected error while ${activity}.`, 500);
}
