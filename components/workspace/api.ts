import type {
  EngineStatus,
  ExtractRequest,
  ExtractResponse,
  MatchRequest,
  MatchResponse,
  TrialSearchRequest,
  TrialSearchResponse,
} from "@/lib/types";

/** Error raised for non-2xx responses (message comes from the route's `{ error }` body). */
export class ApiError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const UNREACHABLE = "The engine could not be reached. Check that the server is running and try again.";

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data: unknown = await res.json();
    if (
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
    ) {
      return (data as { error: string }).error;
    }
  } catch {
    // Body was not JSON; fall through to a generic message.
  }
  return res.status >= 500
    ? "The engine hit an internal error. Try again in a moment."
    : `The request was rejected (${res.status}).`;
}

async function request<T>(url: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res =
      body === undefined
        ? await fetch(url, { method: "GET", cache: "no-store" })
        : await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
          });
  } catch {
    throw new ApiError(UNREACHABLE, 0);
  }
  if (!res.ok) throw new ApiError(await readErrorMessage(res), res.status);
  try {
    return (await res.json()) as T;
  } catch {
    throw new ApiError("The engine returned an unreadable response.", res.status);
  }
}

export function getStatus(): Promise<EngineStatus> {
  return request<EngineStatus>("/api/status");
}

export function extractRecord(req: ExtractRequest): Promise<ExtractResponse> {
  return request<ExtractResponse>("/api/extract", req);
}

export function searchTrials(req: TrialSearchRequest): Promise<TrialSearchResponse> {
  return request<TrialSearchResponse>("/api/trials", req);
}

export function matchTrial(req: MatchRequest): Promise<MatchResponse> {
  return request<MatchResponse>("/api/match", req);
}

/** Clinician-readable message for any thrown value. */
export function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return "Something went wrong.";
}
