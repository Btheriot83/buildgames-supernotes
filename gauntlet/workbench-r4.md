# Gauntlet workbench R4 — Inkwell (Phase B4 INTEGRITY)

**Identity locked:** Index Drawer (`docs/IDENTITY.md`) — **no aesthetic reseed**.
**Bar:** https://supernotes.app/
**Demo:** https://buildgames-supernotes.vercel.app
**Job (≤3s):** Write → Link → Search → Export Markdown
**Rounds target:** 20 counted (separate `rN:` commits; no batch)
**Flat materials:** zero decorative gradients
**Also:** transitions.dev on real actions; dream-loop target close (screenshot path)

Shots: `gauntlet/shots-r4/`.
Bar baseline: `gauntlet/shots-r4/bar-supernotes-home.png`

## transitions.dev map (live actions)
| Recipe | Action trigger |
|--------|----------------|
| success-check | Export Markdown → successFlash |
| toast | store toast (create/delete/AI/link) |
| error-state-shake | search zero-results shake |
| skeleton-reveal | LoadingShell dismiss |
| texts-reveal | brand h1 + card grid mount |
| tabs-sliding | Cards/List view tabs |
| number-pop-in | card count + backlink count |
| panel-reveal | sidebar mount |
| panel-slide / modal | editor open/close |
| card-tilt | note card hover (supplemental) |
| input-clear-dissolve | search Clear (t-clear) |

## r1 — fonts
- files: src/index.css (.brand h1); gauntlet/shot-r4.mjs helpers
- shot: gauntlet/shots-r4/r1-after-brand.png
- verdict: Wordmark lighter/tighter like bar Gelica 400; still Literata (identity). Bar wins on proprietary face.
- commit: d2e90ef

## r2 — bar gap (transitions on real actions)
- files: src/components/Toast.tsx, src/components/SuccessOverlay.tsx, src/store/notesStore.ts, src/styles/transitions.css
- shot: gauntlet/shots-r4/r2-toast-restore.png
- recipes: toast←create/delete/restore/export; success-check←Export Markdown; error-state-shake←zero-hit search + empty export/collection
- verdict: Interaction feedback closer to bar polish; still denser tool UI than marketing serenity.
- commit: 31ec491

## r3 — contrast
- files: src/index.css (:root ink/mute/line)
- shot: gauntlet/shots-r4/r3-ink-contrast.png
- verdict: Body ink now matches bar near-black #2b2a2d; paper still warmer than bar mint wash marketing.
- commit: 093373f

## r4 — buttons
- files: src/index.css (.btn, --btn-shadow)
- shot: gauntlet/shots-r4/r4-buttons-chrome.png
- verdict: New card / Export denser like bar Sign up; coral still identity #e4576b not bar #ff6682.
- commit: 10f3a72

## r5 — bar gap (+ bar A/B + dream-loop target locked)
- files: src/index.css (.job-strip); .gitignore (.dream-loop); gauntlet/shots-r4/dream-target.png (copy of .dream-loop/target.png)
- shot: gauntlet/shots-r4/r5-desk.png; bar A/B gauntlet/shots-r4/r5-ab.png
- dream-target: refined Index Drawer desk (coral job text, denser cards, toast) — close live→target in later rounds while still vs bar
- verdict: Job strip now coral text like target; bar marketing still wins serenity/space; tool density expected.
- commit: f704927

## r6 — fonts (dream close)
- files: src/index.css (.note-card h3)
- shot: gauntlet/shots-r4/r6-card-titles.png
- verdict: Titles calmer/larger toward dream-target; bar still uses proprietary Gelica on marketing.
- commit: 469a7e9

## r7 — contrast (dream close)
- files: src/components/NoteCard.tsx, src/index.css (.card-link-meta)
- shot: gauntlet/shots-r4/r7-link-meta.png
- verdict: Link counts now N↔N like dream-target; bar product cards still cleaner empty chrome.
- commit: 32e79d4

