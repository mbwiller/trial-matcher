import type { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CriterionType, Evidence, MatchTier, TrialStatus, VerdictStatus } from "@/lib/types";
import { formatPhase, formatStatus, tierLabel } from "@/lib/ctgov/format";
import {
  Badge,
  EvidencePopover,
  Eyebrow,
  GlassPanel,
  ScoreRing,
  VerdictPill,
  cn,
} from "@/components/ui";

/**
 * Static preview of the shortlist stage for the landing page.
 *
 * Built from the real primitives so it looks exactly like the workspace, but the
 * content is hard-coded: real recruiting studies from the bundled fixture
 * (lib/demo/trials.json) screened against the fictional sample patient
 * "Margaret H." (HR+/HER2-low, PIK3CA-mutant, progressed on a CDK4/6 inhibitor).
 * Verdicts are illustrative — this is a picture of the product, not live data.
 */

interface PreviewCriterion {
  type: CriterionType;
  status: VerdictStatus;
  text: string;
  rationale: string;
  actionNeeded?: string;
  evidence?: Evidence[];
}

interface PreviewCounts {
  met: number;
  notMet: number;
  review: number;
}

interface PreviewTrial {
  rank: number;
  nctId: string;
  title: string;
  sponsor: string;
  phases: string[];
  status: TrialStatus;
  score: number;
  tier: MatchTier;
  headline: string;
  counts: PreviewCounts;
  /** Present on the expanded row only. */
  expanded?: {
    shown: PreviewCriterion[];
    total: number;
  };
}

const TRIALS: PreviewTrial[] = [
  {
    rank: 1,
    nctId: "NCT06982521",
    title:
      "Phase 3 Study of RLY-2608 + Fulvestrant vs Capivasertib + Fulvestrant as Treatment for Locally Advanced or Metastatic PIK3CA-mutant HR+/HER2- Breast Cancer",
    sponsor: "Relay Therapeutics",
    phases: ["PHASE3"],
    status: "RECRUITING",
    score: 92,
    tier: "strong",
    headline: "Meets all 6 inclusion criteria · HbA1c not documented for the diabetes exclusion",
    counts: { met: 13, notMet: 0, review: 1 },
    expanded: {
      total: 14,
      shown: [
        {
          type: "inclusion",
          status: "pass",
          text: "One or more known primary oncogenic PIK3CA mutation(s)",
          rationale: "PIK3CA H1047R detected on NGS from the liver biopsy, Feb 2025.",
          evidence: [
            { quote: "PIK3CA p.H1047R (VAF 18%)", source: "NGS — liver core biopsy 2025-02-19" },
          ],
        },
        {
          type: "inclusion",
          status: "pass",
          text: "Histologically or cytologically confirmed HR+/HER2- locally advanced or metastatic breast cancer with radiological evidence of recurrence or progression",
          rationale:
            "ER 95%, PR 60%, HER2 IHC 1+ with ISH not amplified; bone and liver metastases with progression on CT, Aug 2026.",
          evidence: [
            {
              quote: "HER2 IHC 1+ / ISH not amplified",
              source: "Pathology — liver core biopsy 2025-02-19",
            },
          ],
        },
        {
          type: "inclusion",
          status: "pass",
          text: "Radiological evidence of progression on or after a CDK4/6 inhibitor with endocrine therapy for HR+/HER2- advanced breast cancer",
          rationale: "Progressed on first-line letrozole + palbociclib (Mar 2025 – Aug 2026).",
          evidence: [
            {
              quote: "PD on letrozole/palbociclib — new hepatic lesions on CT 8/26",
              source: "Oncology follow-up note 2026-09-18",
            },
          ],
        },
        {
          type: "exclusion",
          status: "unknown",
          text: "Type 2 diabetes requiring antihyperglycemic medication, fasting plasma glucose ≥ 140 mg/dL, or HbA1c ≥ 7.0%",
          rationale:
            "No diabetes in the problem list and no antihyperglycemic on the medication list, but no HbA1c or fasting glucose in the record.",
          actionNeeded: "Obtain HbA1c — must be below 7.0% at screening.",
        },
      ],
    },
  },
  {
    rank: 2,
    nctId: "NCT07198724",
    title:
      "ERADICATE: A Phase Ib/II Study of Elacestrant Plus Trastuzumab Deruxtecan in Patients With CDK4/6 Inhibitor and Endocrine-resistant HR+/HER2-low or HER2-ultralow Metastatic Breast Cancer",
    sponsor: "Kristina A. Fanucci",
    phases: ["PHASE1", "PHASE2"],
    status: "RECRUITING",
    score: 81,
    tier: "strong",
    headline:
      "HER2-low and prior CDK4/6 inhibitor both documented · ESR1 status needs a result within 6 months",
    counts: { met: 21, notMet: 0, review: 2 },
  },
  {
    rank: 3,
    nctId: "NCT05933395",
    title: "Genetically-informed Therapy for ER+ Breast Cancer Post-CDK4/6 Inhibitor",
    sponsor: "Dartmouth-Hitchcock Medical Center",
    phases: ["PHASE2"],
    status: "RECRUITING",
    score: 66,
    tier: "possible",
    headline:
      "ER+/HER2-non-amplified after palbociclib fits · genomic profiling must post-date CDK4/6 progression",
    counts: { met: 11, notMet: 0, review: 3 },
  },
];

const TIER_TEXT: Record<MatchTier, string> = {
  strong: "text-accent-800",
  possible: "text-warn-700",
  unlikely: "text-ink-500",
  ineligible: "text-fail-700",
};

const DOT: Record<"pass" | "fail" | "warn", string> = {
  pass: "bg-pass-500",
  fail: "bg-fail-500",
  warn: "bg-warn-500",
};

function Count({ tone, children }: { tone: keyof typeof DOT; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className={cn("size-1.5 rounded-full", DOT[tone])} />
      {children}
    </span>
  );
}

function Counts({ counts, className }: { counts: PreviewCounts; className?: string }) {
  const items: ReactNode[] = [
    <Count key="met" tone="pass">
      {counts.met} met
    </Count>,
  ];
  if (counts.notMet > 0) {
    items.push(
      <Count key="notMet" tone="fail">
        {counts.notMet} not met
      </Count>,
    );
  }
  if (counts.review > 0) {
    items.push(
      <Count key="review" tone="warn">
        {counts.review} needs review
      </Count>,
    );
  }
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] tnum text-ink-500",
        className,
      )}
    >
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-x-2">
          {i > 0 && (
            <span aria-hidden className="text-ink-300">
              ·
            </span>
          )}
          {item}
        </span>
      ))}
    </div>
  );
}

function CriterionRow({ criterion }: { criterion: PreviewCriterion }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1.5 px-4 py-3 sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:gap-y-0">
      {/* Grid items stretch by default; keep the pill at its natural width. Own row on phones. */}
      <VerdictPill
        status={criterion.status}
        type={criterion.type}
        className="col-span-2 mt-px justify-self-start sm:col-span-1"
      />
      <div className="min-w-0">
        <p className="text-pretty text-[13.5px] leading-snug text-ink-800">{criterion.text}</p>
        <p className="mt-1 text-pretty text-[12.5px] leading-snug text-ink-500">
          {criterion.rationale}
        </p>
        {criterion.actionNeeded && (
          <p className="mt-1 text-pretty text-[12.5px] font-medium leading-snug text-warn-700">
            {criterion.actionNeeded}
          </p>
        )}
      </div>
      {criterion.evidence && criterion.evidence.length > 0 ? (
        <EvidencePopover evidence={criterion.evidence} align="right" className="-mt-0.5" />
      ) : (
        <span aria-hidden className="size-6" />
      )}
    </li>
  );
}

function TrialRow({ trial }: { trial: PreviewTrial }) {
  const Chevron = trial.expanded ? ChevronUp : ChevronDown;
  return (
    <li className="px-4 py-4 sm:px-5 md:px-6 md:py-5">
      <div className="flex items-start gap-3 md:gap-4">
        <span className="w-5 shrink-0 pt-3.5 text-right font-mono text-[13px] tnum text-ink-400">
          {trial.rank}
        </span>
        <ScoreRing value={trial.score} tier={trial.tier} size={44} className="mt-0.5" />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-pretty text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink-900">
              {trial.title}
            </h3>
            <span className="flex shrink-0 items-center gap-2 pt-0.5">
              <span
                className={cn(
                  "hidden text-[12px] font-medium tracking-[-0.005em] sm:inline",
                  TIER_TEXT[trial.tier],
                )}
              >
                {tierLabel(trial.tier)}
              </span>
              <Chevron aria-hidden className="size-4 text-ink-300" strokeWidth={2} />
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge>{formatPhase(trial.phases)}</Badge>
            <Badge tone="accent" dot>
              {formatStatus(trial.status)}
            </Badge>
            <Badge mono>{trial.nctId}</Badge>
            <Badge>{trial.sponsor}</Badge>
          </div>

          <p className="mt-2.5 text-pretty text-[13.5px] leading-snug text-ink-500">
            {trial.headline}
          </p>
          <Counts counts={trial.counts} className="mt-2" />
        </div>
      </div>

      {trial.expanded && (
        <GlassPanel variant="soft" size="card" padding="none" className="mt-4 md:ml-24">
          <div className="hairline-b flex items-center justify-between px-4 py-2.5">
            <Eyebrow>Criteria</Eyebrow>
            <span className="font-mono text-[11.5px] tnum text-ink-400">
              {trial.expanded.shown.length} of {trial.expanded.total} shown
            </span>
          </div>
          <ul className="divide-y divide-ink-900/[0.05]">
            {trial.expanded.shown.map((criterion, i) => (
              <CriterionRow key={i} criterion={criterion} />
            ))}
          </ul>
        </GlassPanel>
      )}
    </li>
  );
}

export function ShortlistPreview({ className }: { className?: string }) {
  return (
    <GlassPanel sheen padding="none" className={className}>
      {/* `relative` keeps the content above the sheen's absolutely positioned highlight. */}
      <div className="relative">
        <div className="hairline-b flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3.5 sm:px-5 md:px-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 text-[14px] leading-none">
            <span className="font-medium text-ink-900">Shortlist</span>
            <span aria-hidden className="text-ink-300">
              ·
            </span>
            <span className="text-ink-700">Margaret H.</span>
            <span aria-hidden className="text-ink-300">
              ·
            </span>
            <span className="tnum text-ink-500">22 trials screened</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge tone="accent" dot>
              4 strong
            </Badge>
            <Badge tone="warn" dot>
              6 possible
            </Badge>
            <Badge dot>12 ineligible</Badge>
          </div>
        </div>

        <ol aria-label="Ranked trials" className="divide-y divide-ink-900/[0.06]">
          {TRIALS.map((trial) => (
            <TrialRow key={trial.nctId} trial={trial} />
          ))}
        </ol>
      </div>
    </GlassPanel>
  );
}
