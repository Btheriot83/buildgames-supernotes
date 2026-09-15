# Gauntlet workbench R6 — Inkwell (integrity)

**Identity:** Card Stock Press (LOCKED — no reseed)
**Bar:** https://supernotes.app/
**Demo:** https://buildgames-supernotes.vercel.app
**Job (≤3s):** Linked cards → Search → Export Markdown
**Rounds target:** 10 integrity (separate `rN:` commits)
**Flat materials:** zero decorative gradients

Shots: `gauntlet/shots-r6/`
Bar baseline: `gauntlet/shots-r6/bar-supernotes-home.png`
Dream target: `gauntlet/shots-r6/dream-target.png` (also `.dream-loop/target.png`)
Live baseline: `gauntlet/shots-r6/r0-live-baseline.png`

## transitions.dev map (live actions)
| Recipe | Action trigger |
|--------|----------------|
| success-check | Export Markdown → successFlash |
| toast | create/delete/restore/export/collection |
| error-state-shake | zero-hit search + empty export/collection |
| skeleton-reveal | LoadingShell dismiss |
| texts-reveal | brand h1 + card grid |
| tabs-sliding | Cards/List |
| number-pop-in | card count + backlinks |
| panel-reveal | sidebar |
| panel-slide/modal | editor open/close |
| card-tilt | note card hover |
| input-clear-dissolve | search Clear |
| **Tech5 LinkDraw** | Find links → graphite path between card stubs |

## r1 — fonts
- files: src/index.css (.brand-sub, .note-card p)
- shot: gauntlet/shots-r6/r1-fonts-brand.png
- verdict: Brand-sub denser ink weight; card body tracking tighter. Bar Gelica marketing still calmer proprietary.
- commit: ccf34dd

## r2 — contrast
- files: src/index.css (:root mute/line; .note-card border; .stamp-dot)
- shot: gauntlet/shots-r6/r2-contrast-edges.png
- verdict: Card edges + collection stamps punch harder on stock paper; bar hero still airier chrome.
- commit: fa173f9

## r3 — buttons
- files: src/index.css (.btn, .btn.solid, .btn.text)
- shot: gauntlet/shots-r6/r3-buttons-ladder.png
- verdict: New card denser toward bar Sign up; Restore now outlined secondary (dream ladder). Coral `#d94a5c` kept.
- commit: b956b18

## r4 — bar gap
- files: src/index.css (.job-strip, .desk-status)
- shot: gauntlet/shots-r6/r4-bar-job-strip.png
- recipes: job strip Linked cards → Search → Export Markdown; toast on Restore
- verdict: Job path stamped coral chip ≤3s; desk-status as stock chip. Bar marketing still wins serenity.
- commit: 47f38c2

## r5 — fonts (+ bar A/B)
- files: src/index.css (.note-card h3, .editor-title, .list-row strong)
- shot: gauntlet/shots-r6/r5-card-titles.png; A/B gauntlet/shots-r6/r5-ab.png
- verdict: Titles/editor Literata denser on ruled cards; bar Gelica still proprietary calm.
- commit: e0b0c2b

## r6 — contrast
- files: src/index.css (.card-tab, .card-rules, .note-card padding)
- shot: gauntlet/shots-r6/r6-card-tab-rules.png
- verdict: 9px tabs + clearer ruled stock close toward dream-target physicality; bar product cards cooler empty chrome.
- commit: 027e8b8

## r7 — buttons
- files: src/index.css (.btn.export, .ai-assist, .btn.tiny)
- shot: gauntlet/shots-r6/r7-editor-assist.png
- recipes: panel-slide←open card; LinkDraw←Find links; number-pop-in←backlinks
- verdict: Export 2px coral + Press-this-card assist frame clearer; bar has no AI assist chrome.
- commit: dffb151

## r8 — bar gap
- files: src/index.css (.tag-chip.tiny.linkish, .card-link-meta, .sidebar)
- shot: gauntlet/shots-r6/r8-wiki-chips.png
- verdict: Pink wiki stock chips + link meta stamp toward dream; sidebar stock corners. Bar Sign up still pinker.
- commit: db65f7b

## r9 — contrast
- files: src/index.css (.list-row, .search-input, .side-item.is-active, .empty-state)
- shot: gauntlet/shots-r6/r9-tags-sidebar.png; list gauntlet/shots-r6/r9-list-search.png
- recipes: tabs-sliding←Cards/List; panel-reveal←sidebar
- verdict: List stock 8px + search edge + active collection hold on paper; bar sidebar cooler grey.
- commit: c7a148e

## r10 — bar gap (+ bar A/B + dream vs live)
- files: src/index.css (body density, .app-frame, .brand h1, .card-grid); flat guard verified (0 linear/radial in index.css)
- shot: gauntlet/shots-r6/r10-desk.png; A/B gauntlet/shots-r6/r10-ab.png; dream gauntlet/shots-r6/r10-dream-vs-live.png
- verdict: Live closed further toward dream-target on tabs/wiki chips/job stamp/button ladder; bar marketing still wins Gelica serenity; Card Stock Press locked; 0 decorative gradients.
- commit: 3f792be
