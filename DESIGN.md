# Trial Matcher — Design Language ("Clinical Glass")

This document is the source of truth for how the product looks and feels.
Everything in `app/` and `components/` must follow it. When in doubt: remove.

## 1. Intent

A clinician opens this tool between patients. They need to paste a record, trust
what the system read out of it, and review a ranked shortlist in under two
minutes. The interface must feel like a precision instrument: quiet, exact,
unhurried. Reference points: seed.com (whitespace, restraint, warm-neutral
canvas, premium typography) and predoc.ai (clinical trust, navy ink, pill CTAs,
grid discipline), rendered as liquid glass — translucent layers floating over a
soft, slowly-moving color field.

## 2. Principles

1. **Quiet chrome, precise content.** The record, the profile and the trials are
   the interface. Bars, rails and cards nearly disappear.
2. **One accent.** Teal (`accent-*`) is reserved for the primary action, focus,
   the active step and links. Never for decoration.
3. **Semantic color is earned.** Green / red / amber appear only on verdicts and
   status (`pass` / `fail` / `warn`). Nothing else is colored.
4. **Depth by translucency, not shadow.** Glass panels blur the color field
   behind them. Shadows are barely there; hover lifts, it does not glow.
5. **Clinical density.** 14–15px body, tabular numbers, tight vertical rhythm
   inside cards; generous whitespace between sections. Compact, never cramped.
6. **Provenance everywhere.** Every extracted value and every verdict can show
   the verbatim quote it came from. Evidence is one hover away.
7. **Motion is functional.** 180–320ms, ease-out, transform + opacity only.
   No bounce, no parallax, no attention-seeking loaders. Where the product
   shows its own process (the screening run, the hero figure) motion paces real
   data; it never stands in for work that is not happening.
8. **Glass box.** Nothing the engine does is hidden: every request, every
   study set aside and why, every verdict with its quote, and the arithmetic
   behind every score are one click away.

## 3. Tokens (defined in `app/globals.css`)

### Color

| Token | Use |
|---|---|
| `ink-900 … ink-50` | Text and lines. `ink-900` headings, `ink-700` body, `ink-500` secondary, `ink-400` labels/placeholder, `ink-200` hairlines, `ink-100` subtle fills. |
| `accent-700 … accent-50` | Primary actions, focus, active step, links. `accent-600` for solid buttons, `accent-700` on hover, `accent-100/50` tinted backgrounds. |
| `pass-700/600/100/50` | Inclusion met / exclusion clear. |
| `fail-700/600/100/50` | Inclusion not met / exclusion triggered. |
| `warn-700/600/100/50` | Needs review / unconfirmed / low confidence. |
| `info-700/600/100/50` | Neutral informational (rarely). |

Canvas is `#F5F6F8`. A fixed `.color-field` behind the app drifts two blurred
blobs (teal, blue) at very low saturation. Glass panels get their life from it.

### Glass utilities

| Class | Use |
|---|---|
| `glass` | Primary panels: `rgba(255,255,255,.6)`, blur 24px, hairline border, faint shadow, 1px inner highlight. |
| `glass-strong` | Top bar, sticky action bars, modals: `rgba(255,255,255,.8)`. |
| `glass-soft` | Nested cards inside a `glass` panel: `rgba(255,255,255,.38)`, no blur. |
| `glass-sheen` | Adds a specular top gradient (use on hero panels and score rings only). |
| `hairline` | 1px `ink-200`-ish separator via box-shadow (no layout cost). `hairline-t`, `hairline-b`, `hairline-l` draw one edge. |

### Radius

`rounded-panel` 24px (panels), `rounded-card` 16px (cards), `rounded-field` 12px
(inputs, small cards), `rounded-chip` pill.

### Shadow

`shadow-glass` (rest), `shadow-float` (hover / popover / modal). Nothing else.

### Type

Geist Sans everywhere; Geist Mono for NCT ids, dates, values, units.

| Role | Classes |
|---|---|
| Display (landing hero) | `text-[44px] md:text-[60px] display text-ink-900` |
| Page title | `text-[28px] leading-[1.15] tracking-[-0.02em] font-semibold text-ink-900` |
| Section title | `text-[17px] leading-snug tracking-[-0.01em] font-semibold text-ink-900` |
| Body | `text-[15px] leading-relaxed text-ink-700` |
| Small | `text-[13px] leading-snug text-ink-500` |
| Eyebrow | `eyebrow` (11px, uppercase, tracking .08em, ink-400, medium) |
| Data / ids | `font-mono text-[13px] tnum text-ink-600` |

Headings weight 500–600, never 700+. Letter-spacing tightens as size grows.

## 4. Primitives (`components/ui`)

Use these; do not re-invent them in feature code.

- `GlassPanel` — `variant: "default" | "strong" | "soft"`, `padding: "none" | "sm" | "md" | "lg"`, `sheen?: boolean`, `as?`. Wraps children in a glass surface with `rounded-panel` (or `rounded-card` when `size="card"`).
- `Button` — `variant: "primary" | "secondary" | "ghost" | "danger-ghost"`, `size: "sm" | "md" | "lg"`, `icon?`, `iconRight?`, `loading?`. Primary is solid `accent-600` with white text and a 1px darker inner ring; secondary is `glass-strong`; ghost is text-only with hover fill.
- `IconButton` — square ghost button for icons, 32/36px.
- `Badge` — `tone: "neutral" | "accent" | "pass" | "fail" | "warn" | "info"`, `dot?`, `mono?`. Pill, 11–12px, tinted background `*-50/100` with `*-700` text.
- `VerdictPill` — takes `status` + `type` and renders the human label: inclusion pass → **Met**, inclusion fail → **Not met**, exclusion pass → **Clear**, exclusion fail → **Excludes**, unknown → **Needs review**, not-applicable → **N/A**. Uses `Badge` tones pass/fail/warn/neutral with a dot.
- `Eyebrow` — small caps label.
- `ScoreRing` — SVG ring, `value 0–100`, `tier`, `size`. Track `ink-100`, arc colored by tier (strong → accent, possible → warn, unlikely → ink-400, ineligible → fail). Number in the middle in mono.
- `Stepper` — three steps (Record → Profile → Shortlist), current highlighted with accent, completed with a check, future in ink-400.
- `Field` — label + value with optional `confidence` and `evidence` (renders an `EvidencePopover` trigger).
- `EvidencePopover` — hover/focus popover showing the verbatim quote(s) with `source`. Glass-strong, `shadow-float`, 320px max, quote in a serif-free block with a left `accent-300` rule.
- `Skeleton` — shimmering placeholder block using `ink-100`.
- `EmptyState` — icon + title + description, centered.
- `Divider` — hairline.
- `Kbd` — keyboard hint (rarely).
- `Toggle` — small labeled switch (filters).
- `Input`, `Select`, `Textarea` — form controls for editing structured values: 36px, `rounded-field`, faint white fill with a hairline, accent ring on focus; `mono` for dates and values.
- `EditedTag` — marks a value the clinician entered or corrected; takes the place of the evidence trigger (also via `Field`'s `edited` prop).
- `Tooltip` — short hover hint; `align="end"` for triggers near the right edge of the viewport.

## 5. Screens

### Landing (`/`)
Says what the problem is and shows the product working, with as few words as
possible. Everything on it is computed on the server from the registry snapshot
and the sample patient's reviews (`components/landing/data.ts`); nothing is
hard-coded or illustrative.

1. **Hero.** Two columns. Left: eyebrow, display headline "The registry, read
   for you.", one sentence, primary CTA "Open workspace" + ghost "Watch a
   screening run". Right: the hero figure, a glass-sheen panel that plays one
   screening run in miniature: one dot per harvested study, the four funnel
   numbers, the top three results. It renders complete and then replays.
2. **The problem.** Three figures set large (56–64px), each with one line and
   its source. No cards: whitespace and hairline dividers only.
3. **Why it is hard.** A glass panel pairing three lines of the chart with the
   three protocol criteria they answer, joined by a hairline connector, each
   with its `VerdictPill`. Closes with the one sentence on what the model does
   and what the clinician keeps.
4. **How it works.** Three steps in one glass panel, each led by a small
   vignette (profile fields, set-aside reasons, verdict cells) rather than text.
5. **Sample patients.** A glass-sheen panel of patient cards that deep-link to
   `/workspace?sample=<id>`.
6. Footer: one line, ink-400.

### Workspace (`/workspace`)
Top bar (`glass-strong`, 56px): mark + wordmark left, `Stepper` centered
(Record → Profile → Trials), right: patient label, engine badge (`Demo data` /
`Live · <model id from /api/status>`). Content max-width 1180px for Record and
Profile; the Trials stage is a dashboard and widens to 1480px.

**Stage 1 — Record.** Centered column (max 760px). Eyebrow "Patient record",
title "Paste the record.", helper line. A tall glass textarea (min 380px).
Under it, the privacy line and the primary button "Structure record"; then
"Or start from a sample patient": a 4-column grid of patient cards (name,
age/sex, subtype, two details).

**Stage 2 — Profile review.** Two columns (5/7). Left, sticky: the source
record in a glass panel with evidence spans highlighted when a field is
hovered. Right: *Diagnosis*, *Biomarkers*, *Treatment history*, *Performance &
labs*, *Open questions*. Bottom sticky bar (`glass-strong`): "Looks right —
find trials" primary, "Edit profile" secondary, "Back to record" ghost.

*Edit mode.* "Edit profile" swaps the read sections for forms over the same
sections (summary, diagnosis, biomarkers, treatment history, performance and
labs, comorbidities and medications, open questions); the source record stays
beside them. Edits go into a draft: the bar becomes "Cancel" + "Save changes"
and nothing is applied until saved. A value the clinician changed is shown with
an `EditedTag` where its quote icon was: it no longer points at the record, and
the reviewer is told to treat it as a stated fact. Putting a value back
restores its quote. After saving, the header shows how many values were edited,
with "Discard edits" to return to the extraction. Editing a sample patient
retires its precomputed reviews, and the panel says so.

**Stage 3 — Trials.** Two views of the same run.

*Screening run* (shown first, replayable): how the list was made.
- Header + pipeline strip: Registry harvest → Pre-screen → Criterion review →
  Ranked shortlist, each with its live count.
- **Registry harvest** panel: the request(s) made to ClinicalTrials.gov with a
  chip per page, then the registry matrix: one 7px dot per harvested study.
  Dots appear as pages land, dim as the gate that stops them is applied, and
  the survivors turn accent (`accent-300` relevant, `accent-600` sent to
  review). Hovering a dot names the study and the reason for its outcome.
- **Pre-screen** panel: one row per gate with its count and a thin neutral bar.
- **Criterion review** panel: a tile per reviewed study with one cell per
  criterion (inclusion, a gap, exclusion) that fills with its verdict color;
  the reviewer log beside it surfaces blockers, open items and quoted evidence
  as they are revealed; the reviewer's instructions are one click away.
- Playback only paces real data (see `run/usePlayback.ts`): a tile never
  reveals before its review has arrived. `prefers-reduced-motion` shows the
  finished state immediately. "Skip to results" is always available.

*Results* (the dashboard): what to do with it.
- **Patient banner** (`glass-strong`): initials, name, demographics, then a
  definition row: diagnosis, stage and setting, systemic therapy, ECOG,
  biomarkers. Actions: "Source record", "Edit profile".
- **Funnel strip**: harvested → relevant → reviewed, then the hero figure
  ("Strong or possible") with the tier bar, then open items and the link back
  to the screening run.
- **Worklist** (left) + **trial detail** (right, sticky, 400–460px). Worklist:
  one filter row above the table (tier chips, shortlisted only, phase, sort,
  copy shortlist); rows are rank · `ScoreRing` · title + NCT/phase/sponsor ·
  tier + verdict bar + counts · next step (the blocker, or what to confirm) ·
  decision (shortlist / flag / dismiss). The selected row carries a 2px accent
  rule and `accent-50` wash.
- **Trial detail**: badges, title, score ring with the score's arithmetic in
  mono beneath the headline, verdict bar, the one primary button ("Shortlist"),
  then *Blocking*, *To confirm before referral*, *Why it ranks here*,
  *Criteria* (filter chips; each row = pill + confidence + criterion +
  rationale + inline quotes + action), *About the study*, *Audit trail*
  (reviewer, date, registry record, pre-screen rank and signals, eligibility
  text as published). Clicking a quote opens the source record docked on the
  left with the passage highlighted.
- **Eligibility matrix**: trials × domains, each cell the worst verdict in the
  domain as a tinted cell with a glyph (✓ ? ✕ –). Selecting a cell opens the
  trial filtered to that domain.
- **Workup that unlocks trials**: open items across strong and possible
  matches, grouped by the test that would close them.

## 6. Data marks

The dashboard and the screening run draw small charts. They follow one set of
rules so they read as part of the instrument, not decoration.

- **Form first.** A single number is a stat tile, not a chart. One figure per
  view is the hero (40px); the rest are 26px. Big standalone figures use
  proportional numerals; `tnum` is for columns and live counters.
- **Color by job.** Verdict marks use the status steps `pass-500`,
  `warn-500`, `fail-500` and `ink-200` (not applicable). Tiers reuse the
  `ScoreRing` colors. Funnel and registry dots use the accent ramp
  (`accent-300` → `accent-600`) because the stages are ordered. Nominal bars
  (set-aside reasons) are one neutral color, `ink-300`.
- **Color is never the only channel.** Green and amber are close under
  color-vision deficiency, so every bar sits beside labeled counts and every
  matrix cell carries a glyph.
- **Thin marks, surface gaps.** Bars are 4–6px; touching segments are separated
  by a 2px gap in the surface color, never by a border.
- **Text wears ink.** Labels, counts and legends use `ink-*`; identity comes
  from the dot or bar beside them.
- **One filter row** above the content it scopes; never inside a chart.
- **Hover enhances, never gates.** Anything a tooltip shows is also reachable
  in the table or the detail panel.

## 7. Copy voice

Short, declarative, clinical. Sentence case everywhere. No exclamation marks.
Buttons are verbs ("Structure record", "Find trials", "Shortlist"). Empty
states explain what will appear. Never say "AI magic"; say what was read and
why it matched.

## 8. Do / Don't

- Do use `ink-*` for all text; never pure black or Tailwind gray/zinc/slate.
- Do keep one primary button per screen (on the dashboard it is "Shortlist" in the trial detail).
- Don't use gradients on text or buttons. The only gradients are the color field and the glass sheen.
- Don't use drop shadows on text, icons or badges.
- Don't animate layout properties (width/height/top). Use transform/opacity.
- Don't introduce new colors, radii or shadows. Extend `globals.css` if truly needed and document here.
- Don't ship dark mode in this prototype; keep colors token-based so it can be added.
