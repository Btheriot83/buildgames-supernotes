# Visible delta — Inkwell anti-gradient pass (2026-09-14)

Brandon: works better / data better, but **gradients are AI slop** and the app still read as AI-made.

## Removed (chrome personality)
1. **Body wash** `.ink-bg` mint/peach radial + vertical linear gradient → solid `--paper`
2. **Skeleton shimmer** `.skel-line` sweeping `linear-gradient` band → flat `#e8e0d2` opacity pulse
3. **Brand fallback wash** `.brand-mark.fallback` diagonal mint gradient → solid `#fff`
4. **Card-tilt radial sheen** `.t-tilt-glare` multi-radial screen glare → disabled (`display:none`)
5. **Shimmer-text recipe** decorative gradient `::before` inert for chrome safety

## Kept
- Functional hairlines / borders / focus rings
- Solid card fills + real empty-state photo/video
- Subtle paper drop shadows (not colored glow)

## Audit (ANTI_SLOP instant-fail)
- No vibe purple / indigo CTAs
- No glass `backdrop-blur` chrome
- No colored glow CTAs
- No blob/mesh empty states (real media)
- No Inter/Geist/Space Grotesk defaults (Literata + Source Sans 3)

## Proof
- Before: `gauntlet/shots-r2/before-gradients-prod.png` (live wash visible)
- After: `gauntlet/shots-r2/after-gradients-flat.png` (flat paper)
- Live smoke: `gauntlet/shots-r2/after-gradients-live-prod.png`

Demo: https://buildgames-supernotes.vercel.app
