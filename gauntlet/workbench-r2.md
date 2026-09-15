# Gauntlet workbench R2 — Inkwell (Phase B2)

**Identity locked:** Index Drawer (`docs/IDENTITY.md`) — **no aesthetic reseed**.
**Bar:** https://supernotes.app/
**Demo:** https://buildgames-supernotes.vercel.app
**Job (≤3s):** Write → Link → Search → Export Markdown
**Rounds target:** 10

Shots live in `gauntlet/shots-r2/`.

## Round 1 — Kill SAMPLE
- Mistake: every card labelled SAMPLE; bodies opened with `SAMPLE —`
- Fix: real AZ field / desk-kit deck (Verde River, Pump house, Casa Grande, Wiki trails, Export…)
- `sample: false`; SAMPLE badges hidden; Restore desk reseeds via `DEMO_SEED_KEY`
- Visible: no SAMPLE chrome; believable titles on first paint
- Shot: `r2-desk-job-strip.png`

## Round 2 — Job strip (≤3s clarity)
- Gap: product job not obvious without opening editor
- Fix: pill strip under brand — **Write → Link → Search → Export Markdown**
- Brand sub: “N linked notecards on the desk”
- Visible: coral arrows + job verbs above the fold
- Shot: `r2-desk-job-strip.png`

## Round 3 — Search as core middle step
- Gap: search looked like optional chrome
- Fix: stronger placeholder (“Search linked cards…”), mono hint “Find before you stack”, live **N of M** match count
- Visible: diesel query → 4 of 8 + filtered desk
- Shot: `r2-search-diesel.png`

## Round 4 — Export Markdown prominence
- Gap: Export was ghost; success said only “Exported”
- Fix: coral-outline **Export Markdown** btn; overlay “Markdown zip ready” + frontmatter subcopy; toast “Markdown zip downloaded”
- Visible: outline CTA + success overlay
- Shot: `r2-export-success.png`

## Round 5 — Wiki link visibility on cards
- Gap: linking invisible until editor
- Fix: `2→ ←1` link meta; `[[Title]]` wiki chips on card footers; list-view chips
- Visible: coral wiki chips + counts on every linked card
- Shot: `r2-wiki-chips.png`

## Round 6 — Desk status / hierarchy fixes
- Mistake: main pane had no job reminder; body contrast soft
- Fix: desk-status bar (“8 cards · 13 wiki links · Search above · Export…”); darker card body ink; card min-height 188
- Visible: status rail under search

## Round 7 — Real interconnected deck density
- Gap: 5 thin SAMPLE cards didn’t demo the loop
- Fix: 8 cards / 3 collections (Field notes, Threads, Desk kit) / 13 wiki links / real tags (`diesel`, `verde`, `az`…)
- Migration: `shouldReseedDemo` replaces classic SAMPLE / all-sample desks only (user-edited cards kept)
- Visible: Field notes 3 · Threads 2 · Desk kit 3

## Round 8 — Editor job hint
- Gap: editor didn’t restate the loop
- Fix: hint under body — `Link with [[Card title]] · Tag / Tighten / Find links · Export Markdown from the header`
- Shot: `r2-editor-links.png`

## Round 9 — Cut / copy tighten (within voice)
- Cut: “Sample deck” → **Restore desk**; toast “Demo desk restored”
- Cut: SAMPLE badge CSS forced off; export frontmatter no longer writes `sample: true`
- Copy: empty state states Write / Link / Search / Export in one line
- Identity untouched (Literata + Source Sans, coral, paper desk)

## Round 10 — Coherence / smoke / ship
- Unit + Playwright core loop green (linked cards → search diesel → Find links → Export zip)
- Shots `gauntlet/shots-r2/*`; status `gauntlet/status-supernotes-r2.json`
- PR + Vercel redeploy; live smoke on demo URL
- Verdict: Index Drawer kept; blind A/B closer on **job clarity + real content**; original marketing still calmer brand — product desk now sells the one job in ≤3s

## Scores (execution critic approx, not builder self-grade)
| Round | Focus | ~score |
|------:|-------|-------:|
| B1 end | prior Phase B | 8.5 |
| R2.1 | real notes | 8.6 |
| R2.2 | job strip | 8.8 |
| R2.3 | search | 8.9 |
| R2.4 | export | 9.0 |
| R2.5 | wiki chips | 9.1 |
| R2.6 | desk status | 9.1 |
| R2.7 | deck density | 9.2 |
| R2.8 | editor hint | 9.2 |
| R2.9 | cut/copy | 9.3 |
| R2.10 | coherence | 9.3 |

Identity reseeded: **false**
