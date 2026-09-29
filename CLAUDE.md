@AGENTS.md

# Trial Matcher — project conventions

Clinical trial matching prototype: structures free-text oncology records with an
LLM, screens ClinicalTrials.gov trials criterion-by-criterion, and presents a
ranked shortlist for clinician review.

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
- `npm run fixture` — rebuild `lib/demo/trials.json` from ClinicalTrials.gov

## Layout
- `lib/types.ts` — the shared domain contract. Change it deliberately; everything depends on it.
- `lib/schemas.ts` — zod mirrors of the types (LLM structured output + API validation).
- `lib/ctgov/` — ClinicalTrials.gov v2 client, eligibility parser, profile → query builder, normaliser.
- `lib/llm/` — Anthropic client, record extraction, criteria matching.
- `lib/scoring.ts` — deterministic score/tier from verdicts (shared by live + demo).
- `lib/demo/` — bundled demo patients, curated profiles, trial fixture, precomputed matches.
- `app/api/*` — route handlers: `status`, `extract`, `trials`, `match`.
- `components/ui/` — design-system primitives (see `DESIGN.md`). Feature code must use them.
- `components/workspace/`, `components/landing/`, `components/shell/` — feature components.

## Rules
- Read `DESIGN.md` before touching UI. Only tokens defined in `globals.css`; no Tailwind gray/zinc/slate palettes, no new colors.
- Verdict semantics are relative to eligibility (`pass` never blocks, `fail` blocks) — see the header of `lib/types.ts`.
- Evidence quotes must be verbatim substrings of the source record.
- Demo mode must work fully offline: no API key, no network. Live mode is additive.
- Never log or persist record text server-side. No analytics.
- Keep dependencies minimal; ask before adding one.
- Model id for live mode comes from `TRIAL_MATCHER_MODEL` (default `claude-opus-5-5`). Never write model ids into UI copy — read them from `/api/status`.
