/**
 * Rebuilds the offline registry snapshot from ClinicalTrials.gov API v2.
 *   npm run fixture
 *
 * Harvests every recruiting, interventional breast-cancer study (not a curated
 * handful), page by page, and writes:
 *   lib/demo/trials.json   one normalized study per line, in harvest order
 *                          (page k of the manifest is lines 200(k-1)+1 … 200k).
 *                          Criteria are not stored: they are parsed from the
 *                          eligibility text at load time (lib/demo/trials.ts).
 *   lib/demo/harvest.json  the manifest: what was asked, what each page
 *                          returned, and summary statistics. The workspace
 *                          replays it so the harvest is visible in demo mode.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CTGOV_API_BASE, buildSearchUrl, type CtgovSearchParams } from "../lib/ctgov/client";
import { normalizeStudy } from "../lib/ctgov/normalize";
import type { HarvestManifest, HarvestPage } from "../lib/demo/harvest";
import type { Trial } from "../lib/types";

const here = dirname(fileURLToPath(import.meta.url));
const OUT_TRIALS = resolve(here, "../lib/demo/trials.json");
const OUT_MANIFEST = resolve(here, "../lib/demo/harvest.json");

const PAGE_SIZE = 200;
const QUERY: CtgovSearchParams = {
  cond: "breast cancer",
  overallStatus: ["RECRUITING"],
  advanced: "AREA[StudyType]INTERVENTIONAL",
  pageSize: PAGE_SIZE,
  countTotal: true,
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function getJson(url: string): Promise<{ json: Record<string, unknown>; bytes: number; ms: number }> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await sleep(800 * attempt);
    const started = performance.now();
    try {
      const res = await fetch(url, { headers: { accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const text = await res.text();
      return { json: JSON.parse(text) as Record<string, unknown>, bytes: Buffer.byteLength(text), ms: Math.round(performance.now() - started) };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

async function count(params: CtgovSearchParams): Promise<number | undefined> {
  const { json } = await getJson(buildSearchUrl({ ...params, pageSize: 1, countTotal: true, fields: ["NCTId"] }));
  return typeof json.totalCount === "number" ? json.totalCount : undefined;
}

function tally(values: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const v of values) out[v] = (out[v] ?? 0) + 1;
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
}

function median(sorted: number[]): number {
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function phaseBucket(phases: string[]): string {
  const p = phases.map((x) => x.toUpperCase()).filter((x) => x !== "NA");
  if (p.length === 0) return "Not applicable";
  if (p.includes("PHASE3")) return p.includes("PHASE2") ? "Phase 2/3" : "Phase 3";
  if (p.includes("PHASE2")) return p.includes("PHASE1") ? "Phase 1/2" : "Phase 2";
  if (p.includes("PHASE4")) return "Phase 4";
  return p.includes("EARLY_PHASE1") ? "Early phase 1" : "Phase 1";
}

async function main() {
  const started = Date.now();
  const version = (await getJson(`${CTGOV_API_BASE}/version`)).json as { apiVersion?: string; dataTimestamp?: string };
  const size = (await getJson(`${CTGOV_API_BASE}/stats/size`)).json as { totalStudies?: number };

  const byId = new Map<string, Trial>();
  const pages: HarvestPage[] = [];
  let pageToken: string | undefined;
  let matching: number | undefined;

  do {
    const url = buildSearchUrl({ ...QUERY, pageToken });
    const { json, bytes, ms } = await getJson(url);
    const studies: unknown[] = Array.isArray(json.studies) ? json.studies : [];
    if (typeof json.totalCount === "number") matching = json.totalCount;
    let added = 0;
    for (const study of studies) {
      const trial = normalizeStudy(study);
      if (trial.nctId === "UNKNOWN" || byId.has(trial.nctId)) continue;
      byId.set(trial.nctId, trial);
      added++;
    }
    pages.push({ page: pages.length + 1, studies: studies.length, added, bytes, ms });
    console.log(`page ${String(pages.length).padStart(2)}  ${String(studies.length).padStart(4)} studies  ${(bytes / 1e6).toFixed(2)} MB  ${ms} ms`);
    pageToken = typeof json.nextPageToken === "string" && json.nextPageToken ? json.nextPageToken : undefined;
    if (pageToken) await sleep(250);
  } while (pageToken);

  const trials = [...byId.values()];
  const criteriaCounts = trials.map((t) => t.criteria.length).sort((a, b) => a - b);
  const inclusion = trials.reduce((n, t) => n + t.criteria.filter((c) => c.type === "inclusion").length, 0);
  const criteriaTotal = criteriaCounts.reduce((a, b) => a + b, 0);
  const countries = new Set(trials.flatMap((t) => t.countries ?? []));

  const manifest: HarvestManifest = {
    fetchedAt: new Date(started).toISOString(),
    api: { base: CTGOV_API_BASE, version: version.apiVersion, dataTimestamp: version.dataTimestamp },
    query: {
      cond: QUERY.cond ?? "",
      overallStatus: QUERY.overallStatus ?? [],
      advanced: QUERY.advanced ?? "",
      pageSize: PAGE_SIZE,
      url: buildSearchUrl(QUERY),
    },
    registry: {
      totalStudies: size.totalStudies,
      recruitingInterventionalCancer: await count({ cond: "cancer", overallStatus: ["RECRUITING"], advanced: "AREA[StudyType]INTERVENTIONAL" }),
      matching,
    },
    pages,
    totals: {
      studies: trials.length,
      bytes: pages.reduce((n, p) => n + p.bytes, 0),
      ms: pages.reduce((n, p) => n + p.ms, 0),
      criteria: criteriaTotal,
      inclusion,
      exclusion: criteriaTotal - inclusion,
      medianCriteria: median(criteriaCounts),
      maxCriteria: criteriaCounts[criteriaCounts.length - 1] ?? 0,
      withoutCriteria: criteriaCounts.filter((n) => n === 0).length,
      eligibilityChars: trials.reduce((n, t) => n + t.eligibilityText.length, 0),
      sites: trials.reduce((n, t) => n + t.locationCount, 0),
      sponsors: new Set(trials.map((t) => t.sponsor)).size,
      countries: countries.size,
      withUsSite: trials.filter((t) => (t.countries ?? []).includes("United States")).length,
      phases: tally(trials.map((t) => phaseBucket(t.phases))),
    },
  };

  // Criteria are derived data: re-parsed from eligibilityText when the fixture is loaded.
  const lines = trials.map((t) => JSON.stringify({ ...t, criteria: undefined }));
  mkdirSync(dirname(OUT_TRIALS), { recursive: true });
  writeFileSync(OUT_TRIALS, `[\n${lines.join(",\n")}\n]\n`);
  writeFileSync(OUT_MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  console.log(
    `\n${trials.length} studies (registry reports ${matching ?? "?"}) · ${criteriaTotal} criteria · median ${manifest.totals.medianCriteria}/trial · ${(manifest.totals.eligibilityChars / 1e6).toFixed(1)} M chars of eligibility text`,
  );
  console.log(`Wrote ${OUT_TRIALS}\nWrote ${OUT_MANIFEST}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
