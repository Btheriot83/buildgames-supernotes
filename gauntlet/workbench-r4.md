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

## r8 — buttons
- files: src/index.css (.btn.tiny)
- shot: gauntlet/shots-r4/r8-editor-assist.png
- recipes: panel-slide/modal←open card; number-pop-in←backlinks
- verdict: Assist buttons clearer in editor; bar has no equivalent AI assist chrome.
- commit: fc9c497

## r9 — bar gap (dream close)
- files: src/index.css (.card-grid)
- shot: gauntlet/shots-r4/r9-card-density.png
- verdict: Four-up density closer to dream-target; bar laptop preview still airier.
- commit: 949298f

## r10 — fonts (+ bar A/B)
- files: src/index.css (.brand-sub)
- shot: gauntlet/shots-r4/r10-desk.png; A/B gauntlet/shots-r4/r10-ab.png
- verdict: Subcopy tighter; bar SN Pro body still more proprietary calm than Source Sans 3.
- commit: bb1b258

## r11 — contrast (dream close)
- files: src/index.css (.side-item.is-active)
- shot: gauntlet/shots-r4/r11-sidebar-active.png
- recipes: tabs-sliding←Cards/List; panel-reveal←sidebar
- verdict: Active collection wash stronger like dream-target; bar sidebar still cooler grey.
- commit: 5309413

## r12 — buttons
- files: src/index.css (.btn.text)
- shot: gauntlet/shots-r4/r12-text-restore.png
- verdict: Restore reads as Log-in-style tertiary; bar still quieter overall chrome.
- commit: 04e4d95

## r13 — bar gap (dream close)
- files: src/index.css (.desk-status)
- shot: gauntlet/shots-r4/r13-desk-status.png
- verdict: Status rail chrome removed like dream-target; bar marketing has no tool status rail.
- commit: a9af777

## r14 — fonts (dream close)
- files: src/index.css (.editor-title)
- shot: gauntlet/shots-r4/r14-editor-title.png
- recipes: panel-slide/modal←editor open
- verdict: Editor title calmer like dream-target wordmark; bar has no in-app editor frame here.
- commit: 5b54ae6

## r15 — contrast (+ bar A/B)
- files: src/index.css (.search-input)
- shot: gauntlet/shots-r4/r15-desk.png; A/B gauntlet/shots-r4/r15-ab.png
- verdict: Search edge stronger toward dream-target; bar email field still softer marketing chrome.
- commit: 906a75f

