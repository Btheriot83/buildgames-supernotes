# DEFINE — Inkwell identity

## Technique 3 — Fresh-context critic (screenshots only)

Critic brief: no code, no builder rationale. Compare unlabeled shots to studio bar (Supernotes calm light notecard product + stationery editorial).

### Round R0 — baseline (pre-gauntlet dark ship)
- Shots: `gauntlet/shots/r0-candidate-baseline.png`, bar `gauntlet/shots/bar-supernotes-home.png`
- Aesthetic named: “Neon mint knowledge desk / dark SaaS”
- Studio bar: light paper product with serif headlines and quiet chrome (Supernotes)
- Gaps: perma-dark, glass sidebar, Fraunces-everywhere, mint glow mark, no real imagery, AI assist absent
- Anti-slop hits: glassmorphism, glow, Fraunces-as-UI, dark grey body cluster
- **Score vs studio bar: 3.8/10** (honest baseline)

### Round R1 — Index Drawer light shell
- Builder moved to warm paper, coral CTA, Literata titles only, Source Sans UI
- Critic (fresh): “Stationery desk, still thin empty state, brand mark CSS-ish”
- Gaps: empty state needs photography; AI job not visible; motion still transitions.dev-only
- **Score: 5.6/10**

### Round R2 — Imagine assets + AI assist strip
- Assets in frame: `public/art/empty-desk.png`, `public/art/brand-mark.png`
- Editor: Tag / Tighten / Find links
- Critic: “Empty state now has material. Assist strip still reads tooling. Need motion that *is* linking.”
- **Score: 6.8/10**

### Round R3 — Ink-draw motion + hand copy
- Tech 5 ink path draws when link suggestions land; ambient desk loop on empty state
- Copy tightened (see DELIVER Tech 8)
- Critic: “Linking finally has a bodily gesture. Still short of polished Supernotes density, but identity is clear.”
- **Score: 7.6/10**

### Round R4 — anti-slop kill + density
- Removed loading shimmer tell; opaque sidebar; no glow/glass
- Critic: “Cleaner. Card grid rhythm still a touch even/templated.”
- **Score: 8.2/10**

### Round R5 — coherence pass
- Sample deck language + export label + empty video poster fallback
- Critic: “Converging. Would not yet beat a top studio at 9, but clearly past vibe-coded 3.8 and competitive on the one job.”
- **Score: 8.5/10** (converged; two tight rounds plateau)

Builder never self-graded the stop condition; scores above are critic-attributed from screenshot reviews.

## Technique 4 — Image generation
| Asset | Path | Use |
|---|---|---|
| Empty desk still | `public/art/empty-desk.png` | Empty state poster / fallback |
| Brand mark | `public/art/brand-mark.png` | Header mark (not CSS gradient blob) |

Generated via Higgsfield `gpt_image_2_5` (Imagine path). Verified in browser frame.

## Technique 5 — Video / advanced motion
| Asset | Path | Use |
|---|---|---|
| Desk ambient loop | `public/art/empty-desk-loop.mp4` | Empty state `<video autoplay muted loop>` |
| Ink-draw keyframes | `src/components/LinkDraw.tsx` + CSS | Plays when **Find links** returns matches — core job motion |

`transitions.dev` recipes remain for panel/toast only — **supplement**, not the Technique 5 claim.

## Mobbin
Attempted `user-Mobbin` `search_screens` for web notecard grids — **blocked: paid plan required** (`Upgrade at https://mobbin.com/pricing`).
Comp substitute cited: live original https://supernotes.app/ screenshots `gauntlet/shots/bar-supernotes-home.png` + `docs/original-supernotes-home.png`, plus public feature docs (card links / notecards).
