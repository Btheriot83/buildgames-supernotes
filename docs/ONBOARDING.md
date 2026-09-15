# Inkwell onboarding — friend walkthrough

Skill: Friend walkthrough onboarding (`friend-walkthrough-onboarding`).  
Guide lens: Anshu (`01-anshu`) — anti-slop craft under Card Stock Press.  
Patterns studied: **Linear** (workspace *is* the onboarding; sample cards; teach by doing), **Notion** (one intent → usable first surface), **Calendly** (opinionated defaults, empty-state coach).

## Activation event

**User opens a seeded card on the press and understands the loop: pencil `[[links]]` → search → Export Markdown.**

Everything in the deck moves toward that outcome. Feature tours are cut.

## Persist

| Key | Value |
| --- | --- |
| `inkwell.onboarded.v1` | `"1"` when complete or skipped |
| `inkwell.onboard.step.v1` | current card index while in progress |

Never restart from zero mid-flow. Return visits with onboarded flag do not replay.

## Sample defaults (already seeded)

- Collections: Field notes · Threads · Desk kit
- Eight linked sample cards (Verde River, Pump house, Wiki trails, …)
- Local-only IndexedDB; no account wall

## Copy deck (≤5) — wire exactly

Hand-written. Friend voice. Second person. One CTA per card. Skip always visible.

### Card 1 — start
- **Title:** Hey — this is a card press.
- **Body:** I'll stay beside you for a minute. Skip anytime if you already know the drill.
- **CTA:** Show me the desk
- **Preview:** Mini ruled stock + left tab

### Card 2 — desk
- **Title:** Sample cards are already cut.
- **Body:** Field notes, Threads, Desk kit — real stock on the press. Tap any card to open it.
- **CTA:** Open a sample
- **Preview:** Mini two-card stack

### Card 3 — link (activation core)
- **Title:** Pencil a [[link]].
- **Body:** Type [[Another card]] in the body. Find links when you forget the title. That's the whole linking job.
- **CTA:** Got linking
- **Preview:** Wiki chip `[[Wiki trails]]`

### Card 4 — find
- **Title:** Press / to find.
- **Body:** Search hits title, body, and tags. Better than a third pile with the same idea.
- **CTA:** Next
- **Preview:** Underline search chrome

### Card 5 — done
- **Title:** You're set.
- **Body:** Export Markdown when you leave. Notes stay in this browser until you do. I'll get out of the way.
- **CTA:** Done
- **Preview:** Soft check — no confetti

## Empty-state coach (desk)

When the press is empty:
- **Line:** Empty press — cut a card, or restore the sample desk.
- **Action:** Cut a card
- **Secondary:** Restore sample

## Critic check

Friend or tour? Friend — each card names the next move, samples already work, last card lands on the real desk job. No feature dump.

## Design craft
- cut-elements — one CTA, Skip always, no badge chrome
- remove-ai-tells — no vibe-purple / glass / sparkle / fake stats
- hand-rewrite-copy — strings above are locked
- specify-the-look — Card Stock Press (Literata / Source Sans 3 / IBM Plex Mono)
- make-it-alive — cards float over real desk; Open a sample opens a seeded note
