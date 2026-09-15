# Gauntlet workbench R5 — Inkwell (WEAK Anshu + integrity)

**Identity:** Card Stock Press (reseeds Index Drawer — soft/AI-adjacent)
**Bar:** https://supernotes.app/
**Demo:** https://buildgames-supernotes.vercel.app
**Job (≤3s):** Linked cards → Search → Export Markdown
**Phase A:** full Anshu 1–8 (`docs/DISCOVER.md`, `DEFINE.md`, `DELIVER.md`, `IDENTITY.md`)
**Rounds target:** 10 integrity (separate `rN:` commits)
**Flat materials:** zero decorative gradients

Shots: `gauntlet/shots-r5/`
Bar baseline: `gauntlet/shots-r5/bar-supernotes-home.png`
Dream target: `gauntlet/shots-r5/dream-target.png` (also `.dream-loop/target.png`)

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

## Phase A — Card Stock Press
- files: docs/*, src/index.css, NoteCard, ShellChrome, SearchBar, CardGrid, EditorPanel, LinkDraw, export.ts, sample.ts, public/art/*
- shot: gauntlet/shots-r5/r0-after-phaseA.png (vs r0-live-baseline.png)
- verdict: Ruled stock + left tabs + punched coral job strip visible in ≤3s vs soft Index Drawer. Bar marketing still wins proprietary Gelica serenity.
- commit: 9e2b2ba

## r1 — fonts
- files: src/index.css (.brand h1); public/art/brand-mark.png (Higgsfield stamp)
- shot: gauntlet/shots-r5/r1-fonts-brand.png
- verdict: Wordmark Literata 600 denser; stamp mark replaces soft quill tile. Bar still wins proprietary face.
- commit: b3f9ba5

## r2 — contrast
- files: src/index.css (:root line/mute; .search-input)
- shot: gauntlet/shots-r5/r2-contrast-search.png
- verdict: Search edge + mute hold harder on stock paper; bar email field still softer marketing chrome.
- commit: 798b209

## r3 — buttons
- files: src/index.css (.btn, .btn.solid)
- shot: gauntlet/shots-r5/r3-buttons-chrome.png
- verdict: New card / Export denser toward bar Sign up weight; coral identity `#d94a5c` not bar `#ff6682`.
- commit: 95ee3b3

## r4 — bar gap
- files: src/index.css (.job-strip, .sidebar)
- shot: gauntlet/shots-r5/r4-bar-job-strip.png
- recipes: job strip Linked cards → Search → Export Markdown; toast on Restore
- verdict: Job strip louder; sidebar corners match 8px stock. Bar hero still airier.
- commit: 04eb4d9

## r5 — fonts (+ bar A/B)
- files: src/index.css (.note-card h3)
- shot: gauntlet/shots-r5/r5-card-titles.png; bar gauntlet/shots-r5/r5-bar.png
- verdict: Titles denser on ruled cards; bar Gelica marketing still calmer proprietary.
- commit: dc76ba3

## r6 — contrast
- files: src/index.css (.card-tab, .card-rules)
- shot: gauntlet/shots-r5/r6-card-tab-rules.png
- verdict: Tabs/rules punch physical stock; bar product cards still cooler empty chrome.
- commit: 2e1f7c2

## r7 — buttons
- files: src/index.css (.btn.tiny, .ai-assist)
- shot: gauntlet/shots-r5/r7-editor-assist.png
- recipes: panel-slide←open card; LinkDraw←Find links; number-pop-in←backlinks
- verdict: Press-this-card assist frame clearer; bar has no AI assist chrome.
- commit: 05f85d0
- note: committed after r8 in git history (shot/locator fix); change is discrete.

## r8 — bar gap
- files: src/index.css (.brand-sub, .btn.export)
- shot: gauntlet/shots-r5/r8-export-chrome.png
- verdict: Export Markdown secondary weight clearer in job path; bar Sign up still pinker.
- commit: 9a691c8

## r9 — contrast
- files: src/index.css (.tag-chip, .side-item.is-active)
- shot: gauntlet/shots-r5/r9-tags-sidebar.png
- recipes: tabs-sliding←Cards/List; panel-reveal←sidebar
- verdict: Active collection + tags hold on paper; bar sidebar cooler grey.
- commit: be1dd03

## r10 — bar gap (+ bar A/B + dream vs live)
- files: src/index.css (body density); flat guard verified (0 linear/radial in index.css)
- shot: gauntlet/shots-r5/r10-desk.png; A/B gauntlet/shots-r5/r10-ab.png; dream gauntlet/shots-r5/r10-dream-vs-live.png
- verdict: Live closed toward dream-target on ruled stock/tabs/job strip; bar marketing still wins serenity; Card Stock Press locked; 0 decorative gradients.
- commit: d6999c3
