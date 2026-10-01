import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The harvest manifest written by `npm run fixture` next to the registry
 * snapshot: what was asked of ClinicalTrials.gov, what each page returned, and
 * summary statistics. Server-only (reads from disk).
 */

export interface HarvestPage {
  /** 1-based. */
  page: number;
  /** Studies in the response. */
  studies: number;
  /** New studies after de-duplication. */
  added: number;
  bytes: number;
  ms: number;
}

export interface HarvestManifest {
  fetchedAt: string;
  api: { base: string; version?: string; dataTimestamp?: string };
  query: { cond: string; overallStatus: string[]; advanced: string; pageSize: number; url: string };
  registry: {
    /** Every study registered on ClinicalTrials.gov. */
    totalStudies?: number;
    /** Recruiting interventional studies for "cancer". */
    recruitingInterventionalCancer?: number;
    /** Studies matching `query` (the registry's own count). */
    matching?: number;
  };
  pages: HarvestPage[];
  totals: {
    studies: number;
    bytes: number;
    ms: number;
    criteria: number;
    inclusion: number;
    exclusion: number;
    medianCriteria: number;
    maxCriteria: number;
    withoutCriteria: number;
    eligibilityChars: number;
    sites: number;
    sponsors: number;
    countries: number;
    withUsSite: number;
    phases: Record<string, number>;
  };
}

let cache: HarvestManifest | undefined;

export function demoHarvest(): HarvestManifest {
  cache ??= JSON.parse(readFileSync(join(process.cwd(), "lib/demo/harvest.json"), "utf8")) as HarvestManifest;
  return cache;
}
