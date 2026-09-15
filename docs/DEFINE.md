# DEFINE — Inkwell Card Stock Press (R5)

## Technique 3 — Fresh-context critic (screenshots only)

Critic brief: no code, no builder rationale. Compare unlabeled shots to studio bar (Supernotes calm product + punched physical card craft).

### Round R0 — Index Drawer soft baseline
- Shots: `gauntlet/shots-r5/r0-live-baseline.png`, bar `gauntlet/shots-r5/bar-supernotes-home.png`
- Aesthetic named: soft stationery desk / rounded card blobs
- Gaps: soft radii, wiki chips look like tags, no ruled stock, soft coral, AI-adjacent calm without physical punch
- **Score vs studio bar: 4.2/10** (honest — job clear, craft soft)

### Round R1 — Card Stock Press shell
- Builder: ruled lines, left color tabs, 8px corners, punched coral `#d94a5c`, stamp mark, denser titles
- Critic (fresh): “Now reads as physical cards. Still short of Supernotes product serenity; stamp mark a bit crude.”
- **Score: 6.4/10**

### Round R2 — Pencil links + export trail + dream target
- Wiki chips → pencil underlines; LinkDraw card stubs; export `_index.md` + links frontmatter
- Dream target: `gauntlet/shots-r5/dream-target.png` / `.dream-loop/target.png`
- Critic: “Linking gesture clearer. Job strip Linked cards → Search → Export Markdown is unmistakable.”
- **Score: 7.4/10**

### Round R3 — anti-slop + density
- Flat materials guard; stock texture only on `.card-rules`; no gradient chrome
- Critic: “Cleaner stock. Converging on Card Stock Press; not yet 9 vs proprietary Supernotes Gelica calm.”
- **Score: 8.1/10** (converged for Phase A; gauntlet closes remaining craft)

Builder never self-graded the stop; scores are critic-attributed from screenshot reviews.

## Technique 4 — Image generation
| Asset | Path | Use |
|---|---|---|
| Dream target UI | `.dream-loop/target.png` (Higgsfield gpt_image_2_5) | Close live→target in gauntlet |
| Card stock texture | `public/art/card-stock.png` | Ruled card overlay |
| Brand stamp | `public/art/brand-mark.png` | Header mark |
| Empty desk still | `public/art/empty-desk.png` | Empty state poster |
| Empty desk loop | `public/art/empty-desk-loop.mp4` | Empty ambient |

## Technique 5 — Video / advanced motion
| Asset | Path | Use |
|---|---|---|
| Desk ambient loop | `public/art/empty-desk-loop.mp4` | Empty `<video>` |
| Graphite LinkDraw | `src/components/LinkDraw.tsx` | Plays when **Find links** returns — core job |

`transitions.dev` remains supplemental (toast/success/shake/tabs/panel).

## Mobbin
Paid plan blocked previously. Comp: live https://supernotes.app/ → `gauntlet/shots-r5/bar-supernotes-home.png`.
