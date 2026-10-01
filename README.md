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
   extracted value keeps the verbatim quote it came from. The clinician can
   edit any of it before screening; edited values are marked as theirs and the
   reviewer treats them as stated facts.
2. **Screens the registry in the open.** Every recruiting, interventional
   breast-cancer study on ClinicalTrials.gov is harvested. A deterministic
   pre-screen gives each one an outcome and a stated reason (no site in the
   configured country, enrolls the other sex, age window, not a treatment study,
   different subtype, different setting, no relevance signal). The 16 best fits
   go on to criterion review; the rest stay visible.
3. **Matches the fine print.** For each reviewed trial, every inclusion and
   exclusion criterion gets a verdict (met / not met / clear / excludes / needs
   review), a rationale, the supporting quote, and, when the record is silent,
   the concrete thing to check. Scores are computed deterministically from the
   verdicts and the arithmetic is shown.
4. **Keeps the clinician in the loop.** A dashboard: patient banner, the
   funnel, a ranked worklist with the next step per trial, a detail panel with
   the full audit trail, an eligibility matrix across trials, and the workup
   that would close open items. Shortlist / flag / dismiss; nothing is
   auto-enrolled.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Without an API key the app runs entirely on bundled data:

- a **registry snapshot** of every recruiting interventional breast-cancer
  study (1,866 studies, 36,753 parsed criteria at the last harvest), with the
  harvest manifest that the screening run replays;
- **eight fictional patients** with curated structured profiles;
- **precomputed criterion-level reviews** for the 16 trials the pre-screen
  selects for each patient (128 reviews, about 4,000 verdicts, every quote
  checked verbatim against the record by the test suite).

Any other pasted record falls back to a keyword screen so the flow still works
end to end.

To go live, copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`.
The engine then structures records and reviews trials with Claude
(`TRIAL_MATCHER_MODEL`, default `claude-opus-5-5`) and searches
ClinicalTrials.gov directly. `TRIAL_MATCHER_COUNTRY` (default `United States`)
sets the country a study must have a site in.

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm test             # vitest
npm run fixture      # re-harvest the registry snapshot (see the warning below)
npm run demo:index   # regenerate lib/demo/matches.ts after adding review files
```

> **Re-harvesting invalidates the precomputed reviews.** The sample reviews are
> keyed to the trials the pre-screen selects and to the criterion ids the parser
> produces. `npm run fixture`, a change to `lib/ctgov/criteria.ts`, or a change
> to the relevance scoring in `lib/ctgov/query.ts` / `prescreen.ts` can change
> either. `lib/demo/matches.test.ts` fails when they drift; trials without a
> matching review fall back to the keyword screen.

## Architecture

```
app/
  page.tsx                landing (computed from the snapshot and sample reviews)
  workspace/              the clinician flow: Record → Profile → Trials
  styleguide/             design-system reference
  api/status              engine capabilities
  api/extract             record → PatientProfile (LLM, demo, or heuristic)
  api/trials              PatientProfile → selected trials + search trace
  api/match               PatientProfile × Trial → TrialMatch (one call per trial)
lib/
  types.ts                shared domain contract (read the verdict semantics at the top)
  schemas.ts              zod mirrors used for LLM structured output + request validation
  ctgov/                  ClinicalTrials.gov v2 client, eligibility parser, query builder,
                          pre-screen (gates + relevance), live search with trace
  llm/                    Anthropic client, prompts, extraction, matching, evidence alignment, heuristics
  scoring.ts              deterministic score / tier from verdicts, and its explanation
  demo/                   sample records, curated profiles, registry snapshot + harvest
                          manifest, precomputed reviews (matches/<patient>/<NCT>.ts)
components/
  ui/                     Clinical Glass primitives (see DESIGN.md)
  shell/                  top bar, engine badge
  landing/                hero figure, problem, fine print, how it works, sample patients
  workspace/              record and profile stages, run/ (screening run), results/ (dashboard)
scripts/
  build-fixture.ts        registry harvest → trials.json + harvest.json
  build-match-index.ts    generates lib/demo/matches.ts
  demo-match-summary.ts   tier / score / blockers for authored review files
```

### The pipeline

```
record text ──▶ /api/extract ──▶ PatientProfile (values + evidence quotes + open questions)
                                      │
                                      ▼
                               /api/trials ──▶ harvest (live query or snapshot)
                                      │        pre-screen: one outcome + reason per study
                                      │        ──▶ 16 selected trials + SearchTrace
                       for each trial ▼  (4 in parallel)
                               /api/match ──▶ TrialMatch (verdict per criterion, score, tier)
                                      │
                                      ▼
              screening run (replayable) ──▶ dashboard ──▶ clinician review
```

Verdicts are always expressed relative to eligibility: `pass` never blocks,
`fail` blocks, `unknown` needs a human, `not-applicable` cannot apply. The UI
translates these per criterion type (inclusion: Met / Not met; exclusion:
Clear / Excludes). Scores and tiers are computed deterministically in
`lib/scoring.ts` so live and demo results rank the same way.

The pre-screen is deliberately coarse. It only acts on what the registry states
structurally or in the title; in the sample data roughly half the trials it
sends to review turn out ineligible on the fine print, which is exactly the
reading the reviewer is there to do.

### Design

See `DESIGN.md`. The interface is a "Clinical Glass" system: translucent
panels over a slowly moving color field, one teal accent, semantic color only
on verdicts, Geist typography, tabular numerals, and provenance one hover away.

## Privacy

Records are processed in memory for the request and never logged or stored by
this app. When live mode is enabled, record text is sent to the configured
model provider; deploy behind your organization's agreements before using real
patient data.
