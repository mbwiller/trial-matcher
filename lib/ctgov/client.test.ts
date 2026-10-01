import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CTGOV_API_BASE,
  CtgovError,
  STUDY_FIELDS,
  buildSearchUrl,
  buildStudyUrl,
  fetchStudy,
  requestJson,
  searchStudies,
  searchTrials,
} from "./client";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

function textResponse(body: string, status: number): Response {
  return new Response(body, { status, headers: { "content-type": "text/plain" } });
}

const study = (nctId: string) => ({
  protocolSection: {
    identificationModule: { nctId, briefTitle: `Study ${nctId}` },
    statusModule: { overallStatus: "RECRUITING" },
    eligibilityModule: { eligibilityCriteria: "Inclusion Criteria:\n\n* Age ≥ 18\n\nExclusion Criteria:\n\n* Pregnant" },
  },
});

describe("URL building", () => {
  it("encodes Essie brackets, parentheses and quotes and applies defaults", () => {
    const url = buildSearchUrl({
      cond: "breast cancer",
      term: '(HER2-positive OR "HER2 positive") AND metastatic',
      overallStatus: ["RECRUITING"],
      advanced: "AREA[StudyType]INTERVENTIONAL AND AREA[Sex](ALL OR FEMALE)",
      countTotal: true,
    });
    expect(url.startsWith(`${CTGOV_API_BASE}/studies?`)).toBe(true);
    const sp = new URL(url).searchParams;
    expect(sp.get("query.cond")).toBe("breast cancer");
    expect(sp.get("query.term")).toBe('(HER2-positive OR "HER2 positive") AND metastatic');
    expect(sp.get("filter.overallStatus")).toBe("RECRUITING");
    expect(sp.get("filter.advanced")).toBe("AREA[StudyType]INTERVENTIONAL AND AREA[Sex](ALL OR FEMALE)");
    expect(sp.get("countTotal")).toBe("true");
    expect(sp.get("pageSize")).toBe("50");
    expect(sp.get("format")).toBe("json");
    expect(sp.get("fields")).toBe(STUDY_FIELDS.join(","));
    expect(url).toContain("AREA%5BStudyType%5D");
    expect(url).not.toContain("[");
  });

  it("clamps the page size, joins ids and omits empty parameters", () => {
    const sp = new URL(buildSearchUrl({ pageSize: 5000, ids: ["NCT00000001", "NCT00000002"], term: "  ", fields: ["NCTId"], pageToken: "abc", sort: "LastUpdatePostDate:desc" })).searchParams;
    expect(sp.get("pageSize")).toBe("1000");
    expect(sp.get("filter.ids")).toBe("NCT00000001,NCT00000002");
    expect(sp.get("fields")).toBe("NCTId");
    expect(sp.get("pageToken")).toBe("abc");
    expect(sp.get("sort")).toBe("LastUpdatePostDate:desc");
    expect(sp.has("query.term")).toBe(false);
    expect(sp.has("query.cond")).toBe(false);
    expect(sp.has("countTotal")).toBe(false);
  });

  it("validates NCT ids for single-study URLs", () => {
    expect(buildStudyUrl(" nct03418961 ")).toBe(`${CTGOV_API_BASE}/studies/NCT03418961?format=json`);
    expect(() => buildStudyUrl("NCT123")).toThrowError(CtgovError);
    try {
      buildStudyUrl("NCT123");
    } catch (err) {
      expect((err as CtgovError).kind).toBe("invalid");
    }
  });
});

describe("requests", () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends no-store JSON requests and parses the search envelope", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ totalCount: 2, studies: [study("NCT00000001")], nextPageToken: "tok" }));
    const result = await searchStudies({ cond: "breast cancer" });
    expect(result.totalCount).toBe(2);
    expect(result.studies).toHaveLength(1);
    expect(result.nextPageToken).toBe("tok");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("query.cond=breast+cancer");
    expect(init?.cache).toBe("no-store");
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    expect(new Headers(init?.headers).get("accept")).toBe("application/json");
  });

  it("retries once on a 5xx response", async () => {
    fetchMock
      .mockResolvedValueOnce(textResponse("upstream unavailable", 503))
      .mockResolvedValueOnce(jsonResponse({ studies: [] }));
    const result = await searchStudies({ cond: "breast cancer" });
    expect(result.studies).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry a 4xx response and surfaces the registry's message", async () => {
    fetchMock.mockResolvedValueOnce(textResponse("Error parsing query in advanced filter: Unknown area name: `Nope`", 400));
    await expect(searchStudies({ advanced: "AREA[Nope]X" })).rejects.toMatchObject({
      name: "CtgovError",
      kind: "http",
      status: 400,
      retryable: false,
      message: expect.stringContaining("Unknown area name"),
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries once on a network error and then reports it", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    await expect(requestJson("https://example.invalid/x")).rejects.toMatchObject({ kind: "network", retryable: true, message: expect.stringContaining("fetch failed") });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("aborts after the timeout", async () => {
    fetchMock.mockImplementation(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            const err = new Error("This operation was aborted");
            err.name = "AbortError";
            reject(err);
          });
        }),
    );
    await expect(requestJson("https://example.invalid/slow", { timeoutMs: 20, retries: 0 })).rejects.toMatchObject({ kind: "timeout" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("stops retrying when the caller's signal is aborted", async () => {
    const controller = new AbortController();
    fetchMock.mockImplementation(
      (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            const err = new Error("aborted");
            err.name = "AbortError";
            reject(err);
          });
          controller.abort();
        }),
    );
    await expect(requestJson("https://example.invalid/x", { signal: controller.signal })).rejects.toMatchObject({ kind: "network", retryable: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rejects non-JSON bodies with a parse error", async () => {
    fetchMock.mockResolvedValueOnce(new Response("<html>oops</html>", { status: 200 }));
    await expect(searchStudies({ cond: "x" })).rejects.toMatchObject({ kind: "parse" });
  });

  it("fetches a single study and maps 404s", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(study("NCT03418961")));
    const s = (await fetchStudy("NCT03418961")) as { protocolSection: { identificationModule: { nctId: string } } };
    expect(s.protocolSection.identificationModule.nctId).toBe("NCT03418961");
    expect(String(fetchMock.mock.calls[0][0])).toBe(`${CTGOV_API_BASE}/studies/NCT03418961?format=json`);

    fetchMock.mockResolvedValueOnce(textResponse("NCT number NCT99999999 not found", 404));
    await expect(fetchStudy("NCT99999999")).rejects.toMatchObject({ kind: "http", status: 404 });
  });

  it("normalizes and de-duplicates search results", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ studies: [study("NCT00000001"), study("NCT00000001"), study("NCT00000002"), {}] }));
    const trials = await searchTrials({ cond: "breast cancer" });
    expect(trials.map((t) => t.nctId)).toEqual(["NCT00000001", "NCT00000002"]);
    expect(trials[0].criteria.map((c) => c.id)).toEqual(["NCT00000001-inc-1", "NCT00000001-exc-1"]);
  });
});
