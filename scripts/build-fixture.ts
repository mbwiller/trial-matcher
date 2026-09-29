/**
 * Rebuilds lib/demo/trials.json from ClinicalTrials.gov API v2.
 *   npm run fixture
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMO_TRIAL_IDS } from "../lib/demo/trial-ids";
import { normalizeStudy } from "../lib/ctgov/normalize";
import type { Trial } from "../lib/types";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "../lib/demo/trials.json");
const BASE = "https://clinicaltrials.gov/api/v2/studies";

async function fetchStudy(nctId: string): Promise<unknown> {
  const res = await fetch(`${BASE}/${nctId}?format=json`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${nctId}: HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const trials: Trial[] = [];
  for (const id of DEMO_TRIAL_IDS) {
    const study = await fetchStudy(id);
    const trial = normalizeStudy(study);
    const inc = trial.criteria.filter((c) => c.type === "inclusion").length;
    const exc = trial.criteria.length - inc;
    console.log(`${trial.nctId}  ${trial.status.padEnd(10)}  inc ${String(inc).padStart(2)}  exc ${String(exc).padStart(2)}  ${trial.title.slice(0, 80)}`);
    trials.push(trial);
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(trials, null, 2) + "\n");
  console.log(`\nWrote ${trials.length} trials → ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
