import type { CriterionType, MatchTier, VerdictStatus } from "@/lib/types";
import { formatPhase } from "@/lib/ctgov/format";
import { prescreenTrials, summarizePrescreen } from "@/lib/ctgov/prescreen";
import { DEFAULT_LIMIT } from "@/lib/ctgov/query";
import { demoHarvest } from "@/lib/demo/harvest";
import { DEMO_MATCHES } from "@/lib/demo/matches";
import { DEMO_PATIENTS } from "@/lib/demo/patients";
import { DEMO_PROFILES } from "@/lib/demo/profiles";
import { demoTrials, getDemoTrial } from "@/lib/demo/trials";
import { rankMatches } from "@/lib/scoring";

/**
 * Everything the landing page shows is computed here, on the server, from the
 * same snapshot, pre-screen and reviews the workspace uses: no hard-coded
 * numbers, no illustrative verdicts. The page is static, so this runs at build.
 */

const PATIENT_ID = "margaret-h";
/** The trial and criteria used to show what "matching the fine print" means. */
const FINE_PRINT_TRIAL = "NCT06982521";
const FINE_PRINT_CRITERIA = ["NCT06982521-inc-2", "NCT06982521-inc-6", "NCT06982521-exc-2"];

export interface LandingTrial {
  nctId: string;
  title: string;
  phase: string;
  score: number;
  tier: MatchTier;
  met: number;
  open: number;
  blocking: number;
  notApplicable: number;
}

export interface LandingPair {
  quote: string;
  source?: string;
  criterion: string;
  type: CriterionType;
  status: VerdictStatus;
  action?: string;
}

export interface LandingData {
  patient: { id: string; label: string; ageSex: string; tags: string[] };
  /** One character per harvested study, in harvest order: a = set aside, r = relevant, s = sent to review. */
  dots: string;
  funnel: { harvested: number; relevant: number; reviewed: number; inPlay: number; criteriaRuledOn: number };
  gates: Array<{ label: string; count: number }>;
  top: LandingTrial[];
  /** Cells of the best-ranked review, in trial order, for the "review" vignette. */
  topVerdicts: VerdictStatus[];
  finePrint: { nctId: string; title: string; pairs: LandingPair[] };
  registry: { studies: number; criteria: number; medianCriteria: number; totalStudies?: number; fetchedAt: string; countries: number };
  samples: Array<{ id: string; label: string; ageSex: string; tags: string[] }>;
}

let cache: LandingData | undefined;

export function landingData(): LandingData {
  if (cache) return cache;
  const patient = DEMO_PATIENTS.find((p) => p.id === PATIENT_ID)!;
  const profile = DEMO_PROFILES[PATIENT_ID];
  const harvest = demoHarvest();
  const { entries, selected } = prescreenTrials(profile, demoTrials(), { limit: DEFAULT_LIMIT, country: "United States" });
  const summary = summarizePrescreen(entries);
  const matches = rankMatches(selected.map((t) => DEMO_MATCHES[PATIENT_ID]?.[t.nctId]).filter((m) => m !== undefined));

  const top: LandingTrial[] = matches.slice(0, 3).map((m) => {
    const trial = getDemoTrial(m.nctId)!;
    return {
      nctId: m.nctId,
      title: trial.title,
      phase: formatPhase(trial.phases),
      score: m.score,
      tier: m.tier,
      met: m.counts.pass,
      open: m.counts.unknown,
      blocking: m.counts.fail,
      notApplicable: m.counts.notApplicable,
    };
  });

  const finePrintTrial = getDemoTrial(FINE_PRINT_TRIAL)!;
  const finePrintMatch = DEMO_MATCHES[PATIENT_ID]?.[FINE_PRINT_TRIAL];
  const pairs: LandingPair[] = FINE_PRINT_CRITERIA.flatMap((id) => {
    const criterion = finePrintTrial.criteria.find((c) => c.id === id);
    const verdict = finePrintMatch?.verdicts.find((v) => v.criterionId === id);
    const evidence = verdict?.evidence[verdict.evidence.length - 1];
    if (!criterion || !verdict || !evidence) return [];
    return [{ quote: evidence.quote, source: evidence.source, criterion: criterion.text, type: criterion.type, status: verdict.status, action: verdict.actionNeeded }];
  });

  const ageSex = (p: { age: number; sex: string }) => `${p.age} ${p.sex}`;
  cache = {
    patient: { id: patient.id, label: patient.label, ageSex: ageSex(patient), tags: patient.tags },
    dots: entries.map((e) => (e.outcome === "selected" ? "s" : e.outcome === "relevant" ? "r" : "a")).join(""),
    funnel: {
      harvested: summary.harvested,
      relevant: summary.relevant,
      reviewed: selected.length,
      inPlay: matches.filter((m) => m.tier === "strong" || m.tier === "possible").length,
      criteriaRuledOn: selected.reduce((n, t) => n + t.criteria.length, 0),
    },
    gates: [
      { label: "No US site", count: summary.setAside.location },
      { label: "Not a treatment study", count: summary.setAside["study-type"] },
      { label: "Different subtype", count: summary.setAside.subtype },
      { label: "Different setting", count: summary.setAside.setting },
    ],
    top,
    topVerdicts: matches[0] ? getDemoTrial(matches[0].nctId)!.criteria.map((c) => matches[0].verdicts.find((v) => v.criterionId === c.id)?.status ?? "unknown") : [],
    finePrint: { nctId: FINE_PRINT_TRIAL, title: finePrintTrial.title, pairs },
    registry: {
      studies: harvest.totals.studies,
      criteria: harvest.totals.criteria,
      medianCriteria: harvest.totals.medianCriteria,
      totalStudies: harvest.registry.totalStudies,
      fetchedAt: harvest.fetchedAt,
      countries: harvest.totals.countries,
    },
    samples: DEMO_PATIENTS.map((p) => ({ id: p.id, label: p.label, ageSex: ageSex(p), tags: p.tags })),
  };
  return cache;
}
