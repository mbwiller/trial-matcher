/**
 * Prints tier, score and blockers for authored demo verdict files:
 *   npx tsx scripts/demo-match-summary.ts <patient-id> [NCT…,NCT…]
 * With no trial list, summarizes every file under lib/demo/matches/<patient-id>/.
 */
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { TrialMatch } from "../lib/types";
import { getDemoTrial } from "../lib/demo/trials";

const here = dirname(fileURLToPath(import.meta.url));

async function main() {
  const [patient, list] = process.argv.slice(2);
  if (!patient) throw new Error("usage: demo-match-summary <patient-id> [NCT…,NCT…]");
  const dir = resolve(here, "../lib/demo/matches", patient);
  const ids = list ? list.split(",") : readdirSync(dir).filter((f) => f.endsWith(".ts")).map((f) => f.replace(/\.ts$/, ""));
  for (const id of ids) {
    const match = ((await import(resolve(dir, `${id}.ts`))) as { default: TrialMatch }).default;
    const trial = getDemoTrial(id);
    const c = match.counts;
    console.log(`${id}  ${match.tier.padEnd(10)} ${String(match.score).padStart(3)}  pass ${c.pass} · fail ${c.fail} · unknown ${c.unknown} · n/a ${c.notApplicable}  | ${match.headline}`);
    for (const b of match.blockers) {
      const v = match.verdicts.find((x) => x.criterionId === b);
      const text = trial?.criteria.find((x) => x.id === b)?.text ?? "";
      console.log(`      blocker ${b} (${v?.confidence}): ${text.slice(0, 110)}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
