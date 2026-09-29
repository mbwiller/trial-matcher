# Trial Matcher

A clinical-trial matching prototype for oncologists. It reads a patient's record
as it is — messy clinic notes, pathology, imaging, labs — structures the free
text with an LLM, screens recruiting ClinicalTrials.gov studies criterion by
criterion, and hands the clinician a ranked, explained shortlist to review.

> Prototype. Not a medical device. Sample patients are fictional.

## What it does

1. **Structures the record.** Stage, TNM, ER/PR/HER2 (incl. HER2-low), Ki-67,
   genomic alterations, every line of treatment with dates and responses, ECOG,
   labs, comorbidities, and the open questions a trial screen will ask. Every
   extracted value keeps the verbatim quote it came from.
2. **Matches the fine print.** For each trial, every inclusion and exclusion
   criterion gets a verdict (met / not met / clear / excludes / needs review),
   a one-line rationale, the supporting quote, and — when the record is silent —
   the concrete thing to check.
3. **Keeps the clinician in the loop.** A ranked shortlist with scores and
   tiers, filters, and shortlist / dismiss / flag actions. Nothing is auto-enrolled.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Without an API key the app runs entirely on bundled data: three sample
patients with curated structured profiles and precomputed verdicts against 22
real, recruiting breast-cancer trials pulled from ClinicalTrials.gov. Any other
pasted record falls back to a keyword screen so the flow still works end to end.

To go live, copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`.
The engine then structures records and screens trials with Claude
(`TRIAL_MATCHER_MODEL`, default `claude-opus-5-5`) and searches
ClinicalTrials.gov directly.

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm test             # vitest
npm run fixture      # refresh lib/demo/trials.json from ClinicalTrials.gov
```

## Architecture

```
app/
  page.tsx                landing
  workspace/              the three-stage clinician flow (Record → Profile → Shortlist)
  styleguide/             design-system reference
  api/status              engine capabilities
  api/extract             record → PatientProfile (LLM, demo, or heuristic)
  api/trials              PatientProfile → candidate trials (live registry or fixture)
  api/match               PatientProfile × Trial → TrialMatch (one call per trial)
lib/
  types.ts                shared domain contract (read the verdict semantics at the top)
  schemas.ts              zod mirrors used for LLM structured output + request validation
  ctgov/                  ClinicalTrials.gov v2 client, eligibility parser, query builder
  llm/                    Anthropic client, extraction, matching, evidence alignment, heuristics
  scoring.ts              deterministic score / tier from verdicts (shared by live + demo)
  demo/                   sample records, curated profiles, trial fixture, precomputed verdicts
components/
  ui/                     Clinical Glass primitives (see DESIGN.md)
  shell/                  top bar, engine badge
  landing/, workspace/    feature components
```

### The matching pipeline

```
record text ──▶ /api/extract ──▶ PatientProfile (values + evidence quotes + open questions)
                                      │
                                      ▼
                               /api/trials ──▶ candidate Trials (parsed criteria)
                                      │
                       for each trial ▼  (4 in parallel)
                               /api/match ──▶ TrialMatch (verdict per criterion, score, tier)
                                      │
                                      ▼
                       ranked shortlist ──▶ clinician review (shortlist / dismiss / flag)
```

Verdicts are always expressed relative to eligibility: `pass` never blocks,
`fail` blocks, `unknown` needs a human, `not-applicable` cannot apply. The UI
translates these per criterion type (inclusion: Met / Not met; exclusion:
Clear / Excludes). Scores and tiers are computed deterministically in
`lib/scoring.ts` so live and demo results rank the same way.

### Design

See `DESIGN.md`. The interface is a "Clinical Glass" system: translucent
panels over a slowly moving colour field, one teal accent, semantic colour only
on verdicts, Geist typography, tabular numerals, and provenance one hover away.

## Privacy

Records are processed in memory for the request and never logged or stored by
this app. When live mode is enabled, record text is sent to the configured
model provider; deploy behind your organisation's agreements before using real
patient data.
