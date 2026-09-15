# Lenny / Anshu — Inkwell (Supernotes)

## 1. Discover
- Seed (never shown in UI): `28f5c4b9b1bc29d0ff96059d6438aa33edbb268dea353e6c` via `openssl rand -hex 24`
- Hex-derived palette cues: `#28f5c4` mint, `#268dea` sky, `#353e6c` ink navy, `#33edbb` seafoam — **dropped** purple chunks `#96059d` / `#6438aa` per anti-slop.
- Direction briefs:
  1. **Inkwell Desk** — deep tidewater ink desk, warm paper notecards, mint link accents, brass collection dots, Fraunces + IBM Plex (picked)
  2. **Atlas Ledger** — cartographic cream + copper stamps (quieter; weaker night-desk presence)
  3. **Signal Coral** — light mint wash + pink CTAs echoing Supernotes marketing (too close to original landing / vibe-adjacent pink SaaS)
- Ambition: physical notecard tilt + wiki backlinks + zip Markdown export — not “clean modern SaaS”.

## 2. Define
- Implementer built React+Vite+IndexedDB notecard desk (cards/list, collections, tags, search, editor, backlinks, export).
- Independent critic reviewed **live original** https://supernotes.app/ (and pricing) — screenshots `docs/original-*.png` — **and** candidate screenshots `docs/live-*.png`.
- Critic scores: `docs/CRITIC_VS_ORIGINAL.md`.

## 3. Deliver
- Core loop: SAMPLE deck → search → open card → see backlinks → edit tags/collection → Export .md zip (success-check).
- Cut: cloud sync, realtime collab, share links, 2D/3D graph, LaTeX/images, mobile native, accounts.
- transitions.dev free recipes in real UX: success-check, toast, skeleton-reveal, texts-reveal, tabs-sliding, number-pop-in, error-state-shake, panel-reveal/panel-slide, card-tilt, shimmer-text, modal scrim, input clear.
- Anti-slop: no vibe-purple, no Inter, no 3-card marketing hero, no fake stats, no emoji nav.
- Live demo: https://buildgames-supernotes.vercel.app
