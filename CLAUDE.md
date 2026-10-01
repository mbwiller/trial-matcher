@AGENTS.md

# Trial Matcher — project conventions

Clinical trial matching prototype: structures free-text oncology records with an
LLM, harvests and pre-screens ClinicalTrials.gov, reviews the best fits
criterion-by-criterion, and presents the run and a results dashboard for
clinician review.

## Stack
- Next.js 16 (App Router, `app/`), React 19, TypeScript strict, Tailwind v4
  (CSS-first config in `app/globals.css`), `motion` for animation,
  `lucide-react` icons, `zustand` for workspace state, `zod` for schemas,
  `@anthropic-ai/sdk` for the LLM engine, `vitest` for unit tests.
- Fonts: Geist Sans / Geist Mono from the `geist` npm package (no network at build).

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (must pass before pushing)
- `npm run lint` — eslint
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — vitest
- `npm run fixture` — re-harvest the registry snapshot (`lib/demo/trials.json` + `harvest.json`) from ClinicalTrials.gov. Invalidates precomputed reviews; see Rules.
- `npm run demo:index` — regenerate `lib/demo/matches.ts` from `lib/demo/matches/<patient>/<NCT>.ts`

## Layout
- `lib/types.ts` — the shared domain contract. Change it deliberately; everything depends on it.
- `lib/schemas.ts` — zod mirrors of the types (LLM structured output + API validation).
- `lib/ctgov/` — ClinicalTrials.gov v2 client, eligibility parser, profile → query builder, normalizer, `prescreen.ts` (gates + relevance, one outcome per study), `search.ts` (live search with trace).
- `lib/llm/` — Anthropic client, `prompts.ts` (client-safe), record extraction, criteria matching.
- `lib/scoring.ts` — deterministic score/tier from verdicts (shared by live + demo) and `explainScore`.
- `lib/demo/` — demo patients (`patients.ts`, `patients/`), curated profiles (`profiles.ts`, `profiles/`), registry snapshot (`trials.json`, read from disk by `trials.ts`, criteria parsed at load), harvest manifest, precomputed reviews (`matches/<patient>/<NCT>.ts`, indexed by the generated `matches.ts`).
- `app/api/*` — route handlers: `status`, `extract`, `trials` (returns the selected trials and the `SearchTrace`), `match`.
- `components/ui/` — design-system primitives (see `DESIGN.md`). Feature code must use them.
- `components/workspace/` — record and profile stages, `run/` (screening run and its playback), `results/` (dashboard), `insights.ts` (matrix, workup).
- `components/landing/` — landing page; `data.ts` computes everything it shows on the server.
- `components/shell/` — top bar, engine badge.

## Rules
- Read `DESIGN.md` before touching UI. Only tokens defined in `globals.css`; no Tailwind gray/zinc/slate palettes, no new colors. Charts follow DESIGN.md §6.
- Verdict semantics are relative to eligibility (`pass` never blocks, `fail` blocks) — see the header of `lib/types.ts`.
- Evidence quotes must be verbatim substrings of the source record.
- A value the clinician edits in profile review is marked `edited` and carries no evidence (`components/workspace/profileEdits.ts`); an edited profile has `editedAt` set and never gets precomputed demo reviews.
- Copy is American English (enroll, tumor, randomized). Registry text and record quotes stay verbatim.
- Demo mode must work fully offline: no API key, no network. Live mode is additive.
- The precomputed reviews are keyed to the trials the pre-screen selects and the criterion ids the parser produces. Re-harvesting, or changing `lib/ctgov/criteria.ts`, the relevance scoring in `query.ts`, `prescreen.ts` or a demo profile, can shift either; `lib/demo/matches.test.ts` then fails and the affected reviews must be re-authored (validate with `DEMO_MATCH=<patient> DEMO_MATCH_TRIALS=<ids> npx vitest run lib/demo/matches-part.test.ts`).
- `lib/demo/trials.ts` and `harvest.ts` read from disk: never import them (or anything that does, such as `lib/demo/matches`) from a client component.
- The screening run only paces real data; never animate progress that is not backed by the trace or a returned match.
- Never log or persist record text server-side. No analytics.
- Keep dependencies minimal; ask before adding one.
- Model id for live mode comes from `TRIAL_MATCHER_MODEL` (default `claude-opus-5-5`). Never write model ids into UI copy — read them from `/api/status`.
