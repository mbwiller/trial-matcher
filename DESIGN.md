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
   No bounce, no parallax, no attention-seeking loaders.

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
| `hairline` | 1px `ink-200`-ish separator via box-shadow (no layout cost). |

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

## 5. Screens

### Landing (`/`)
Single quiet hero. Eyebrow "Clinical trial matching", display headline
"The registry, read for you.", two-sentence sub-copy, primary CTA "Open
workspace" + ghost "How it works". Below: a wide glass panel with a static
mock of the shortlist (real components, demo data) tilted 0°, no 3D. Then three
small glass cards: *Structures the record*, *Matches the fine print*,
*Clinician in the loop*. Footer: one line, ink-400.

### Workspace (`/workspace`)
Top bar (`glass-strong`, 56px): mark + wordmark left, `Stepper` centered,
right: engine badge (`Demo data` / `Live · claude-opus-5-5`), patient label when
present. Content max-width 1180px, 24px gutters.

**Stage 1 — Record.** Centered column (max 760px). Eyebrow "Patient record",
title "Paste the record.", helper line. A tall glass textarea (min 380px)
with a subtle inner shadow and mono-ish line-height for notes. Under it, a row
of sample chips ("Load sample · Margaret H. — HR+/HER2-low, PIK3CA") and a
primary button "Structure record". A PHI notice in `ink-400` small.

**Stage 2 — Profile review.** Two columns (5/7). Left, sticky: the source
record in a glass panel with evidence spans highlighted (`accent-100`
background, `accent-700` text, 2px radius) when a field is hovered/selected.
Right: sections — *Diagnosis*, *Biomarkers*, *Treatment history* (vertical
timeline with dates on the left), *Performance & labs*, *Open questions*. Each
value is a `Field`; low-confidence values show a `warn` dot. Bottom sticky bar
(`glass-strong`): "Looks right — find trials" primary + "Edit" ghost.

**Stage 3 — Shortlist.** Left rail (300px, sticky): compact patient summary
card, then filters (tier toggles, phase, "hide ineligible", sort). Main:
summary strip ("22 trials screened · 4 strong · 6 possible · 12 ineligible"),
then ranked `TrialCard`s. While matching, cards appear as skeletons and fill in
as verdicts stream; a slim progress line shows "Screening 9 / 22".

**TrialCard.** Rank number (mono, ink-400) · `ScoreRing` · title (section
title style, 2 lines max) · meta row of badges (Phase, Recruiting, `NCT…` mono,
sponsor) · headline · counts row ("● 9 met · ● 1 not met · ● 2 to confirm").
Actions right: Shortlist (primary-ghost), Dismiss, Flag; external link to
ClinicalTrials.gov. Expand reveals *Why this ranks here* (reasoning), then
*Inclusion* and *Exclusion* lists: each row = `VerdictPill` + criterion text +
rationale (ink-500) + evidence popover trigger; `unknown` rows show the
`actionNeeded` in `warn-700`.

## 6. Copy voice

Short, declarative, clinical. Sentence case everywhere. No exclamation marks.
Buttons are verbs ("Structure record", "Find trials", "Shortlist"). Empty
states explain what will appear. Never say "AI magic"; say what was read and
why it matched.

## 7. Do / Don't

- Do use `ink-*` for all text; never pure black or Tailwind gray/zinc/slate.
- Do keep one primary button per screen.
- Don't use gradients on text or buttons. The only gradients are the color field and the glass sheen.
- Don't use drop shadows on text, icons or badges.
- Don't animate layout properties (width/height/top). Use transform/opacity.
- Don't introduce new colors, radii or shadows. Extend `globals.css` if truly needed and document here.
- Don't ship dark mode in this prototype; keep colors token-based so it can be added.
