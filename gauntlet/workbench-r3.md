# Gauntlet workbench R3 — Inkwell (Phase B3)

**Identity locked:** Index Drawer (`docs/IDENTITY.md`) — **no aesthetic reseed**.
**Bar:** https://supernotes.app/
**Demo:** https://buildgames-supernotes.vercel.app
**Job (≤3s):** Write → Link → Search → Export Markdown
**Rounds target:** 20
**Flat materials:** keep zero decorative gradients (post anti-gradient pass).

Bar craft extracted live (2026-09-14 PT): Gelica display @400 / −3px tracking; SN Pro body; ink `#2b2a2d`; primary CTA `#ff6682` weight 700 + coral border + soft coral shadow; Log in = text tertiary (no chrome).

Shots: `gauntlet/shots-r3/`.

## Round 1 — Bar screenshot + type audit
- Opened live bar; saved `bar-supernotes-home.png`
- Gap: our Literata locked at 700 only; tracking soft; mute `#6e675c` washes vs bar near-black body
- Visible: before desk `r3-before-desk.png`

## Round 2 — Font load completeness
- Load Literata opsz 400–700 + Source Sans 3 400–700 (+ italic)
- Identity pairing unchanged (Literata + Source Sans 3 + IBM Plex Mono)
- Visible: optical sizing available for titles

## Round 3 — Ink contrast harden
- `--ink` → `#1a1816`; `--ink-soft` → `#2f2b25`; `--mute` → `#5c564c`; add `--mute-soft`
- Lines slightly stronger so cards/chrome hold on paper
- Visible: darker titles/body vs washed R2 mute

## Round 4 — Body tracking (SN Pro lesson)
- Body `letter-spacing: -0.011em`; UI buttons −0.02em
- Closer to bar’s negative tracking without cloning SN Pro
- Visible: tighter, calmer UI copy

## Round 5 — Brand wordmark weight
- Literata **600** (not 700), optical sizing, tracking −0.035em, slightly smaller clamp
- Matches bar’s calm Gelica weight more than heavy AI-serif
- Visible: Inkwell mark less shouty

## Round 6 — Brand sub contrast
- Sub weight 500; mute that still holds (`#5c564c`)
- Visible: “8 linked notecards…” readable, not grey mush

## Round 7 — Button ladder (primary)
- `.btn.solid`: weight 700, coral border `#d94a60`, soft coral shadow (bar Get Started pattern)
- Radius 14px (less pill-everything)
- Visible: **New card** earns primary weight

## Round 8 — Button ladder (secondary outline)
- `.btn.export`: white fill, 1.5px coral border, weight 700, no competing shadow
- Visible: **Export Markdown** clearly secondary to New card

## Round 9 — Button ladder (tertiary text)
- New `.btn.text` (bar Log in): no border/fill; mute-soft; hover → ink
- Restore desk + editor Close demoted to text
- Visible: three chrome actions no longer same weight

## Round 10 — Quiet AI secondary actions
- Tag / Tighten → `.btn.tiny.quiet` (paper fill, hairline)
- Find links stays `.btn.tiny.solid`
- Visible: Find links is the editor’s primary assist

## Round 11 — Search field type/contrast
- Input weight 500, size ~1.02rem, flat (no soft shadow wash)
- Placeholder mute-soft; focus coral ring (functional, not glow CTA)
- Placeholder copy shortened: “Search linked cards…”
- Visible: search reads as a tool, not a floating panel

## Round 12 — Card title hierarchy
- Titles Literata 600, −0.03em tracking, ink color explicit
- Body Source Sans with ink-soft; line-height 1.48
- Card border slightly stronger on paper
- Visible: title/body split closer to bar product cards

## Round 13 — Collection label anti-CAPS
- Sidebar h2 + card-col: sentence case (drop ALL-CAPS AI tell)
- Letter-spacing tightened
- Visible: Collections / Field notes calmer

## Round 14 — Tag chip contrast
- Default chips use ink-soft (not washed mute); active = solid coral + border
- Tiny tags slightly stronger fill
- Visible: tags don’t disappear into paper

## Round 15 — Job strip calm
- Flat paper-card fill; no drop shadow; steps ink-soft weight 600
- Visible: job strip still ≤3s, less chrome noise

## Round 16 — Editor type parity
- Editor title Literata 600 + optical sizing + tight tracking
- Body 1rem / 1.58 lh; focus coral ring
- Meta labels sentence case (not uppercase track)
- Visible: editor matches desk hierarchy

## Round 17 — Desk status / list row ink
- Desk status strong ink; list titles Literata with ink
- Visible: status rail hierarchy holds

## Round 18 — Flat materials guard
- Explicit `background-image: none` on chrome selectors
- Zero decorative gradients in `index.css`; shimmer recipe remains neutralized
- Soft coral **shadow** on primary only (matches bar; not a gradient wash)
- Visible: flat paper desk retained

## Round 19 — Side-by-side A/B
- Composite `r3-ab-bar-vs-desk.png` (bar marketing vs our desk)
- Critic gaps remaining: no live graph/collab; marketing serenity vs tool density — expected
- Wins: button ladder, type weight, ink contrast closer; identity kept

## Round 20 — Coherence / smoke / ship
- Unit tests green; build green; local preview shots
- workbench + status-r3; PR + Vercel redeploy; live smoke
- Verdict: Index Drawer locked; craft closer on **fonts / contrast / buttons**; flat materials held

## Scores (execution critic approx — not builder self-grade)
| Round | Focus | ~score |
|------:|-------|-------:|
| B2 end | prior | 9.3* (*too soft — treat ~7.8 craft vs bar) |
| R3.1–3 | audit + fonts + ink | 8.0 |
| R3.4–6 | tracking + brand | 8.2 |
| R3.7–10 | button ladder | 8.6 |
| R3.11–14 | search/cards/tags | 8.8 |
| R3.15–18 | job/editor/flat | 8.9 |
| R3.19–20 | A/B + ship | 9.0 |

Identity reseeded: **false**
