import { nanoid } from 'nanoid'
import type { Collection, Note, Snapshot } from './types'

/** Bump when demo deck content changes so IndexedDB reseeds SAMPLE-only desks. */
export const DEMO_SEED_KEY = 'index-drawer-b2'

const now = () => new Date().toISOString()

export function buildSample(): Snapshot {
  const field: Collection = { id: nanoid(), name: 'Field notes', color: '#5f7a4a' }
  const threads: Collection = { id: nanoid(), name: 'Threads', color: '#3d7ea6' }
  const desk: Collection = { id: nanoid(), name: 'Desk kit', color: '#c48a3a' }

  const t0 = now()
  const mk = (
    title: string,
    body: string,
    tags: string[],
    collectionId: string | null,
    color: string,
  ): Note => ({
    id: nanoid(),
    title,
    body,
    tags,
    collectionId,
    color,
    sample: false,
    createdAt: t0,
    updatedAt: t0,
  })

  const verde = mk(
    'Verde River morning',
    `06:40 — water clear above the gauge. Heron lifted off the sandbar when the diesel coughed.

Flow felt higher than Friday. Cross-check [[Pump house log]] before calling the co-op.

Weather note for [[Monsoon window]]: dry wind from the SE, no dust yet.`,
    ['verde', 'gauge', 'az'],
    field.id,
    '#fff8ef',
  )

  const pump = mk(
    'Pump house log',
    `Generator hours: 1,842. Oil dark but still in range. Belts quiet.

Yesterday's draw matched [[Verde River morning]] — no unexplained drop.

Need a filter kit on the next [[Parts run — Casa Grande]]. Note the serial on the spare impeller.`,
    ['diesel', 'pump', 'ops'],
    field.id,
    '#f3f7f1',
  )

  const monsoon = mk(
    'Monsoon window',
    `Phoenix side usually breaks mid-July. Field days before that are gold — roads still firm.

If storms stack early, pull the week into Markdown and leave the laptop in the truck. See [[Export the week's cards]].

Pair with [[Search before you stack]] so you do not dig through wet notebooks.`,
    ['weather', 'season', 'az'],
    threads.id,
    '#fff1ea',
  )

  const parts = mk(
    'Parts run — Casa Grande',
    `Stop order:
1. Belt set B-40
2. Fuel filter (diesel, not gas)
3. Impeller spare — match serial in [[Pump house log]]

Pay cash at Ruiz Industrial. Ask for the brass fittings drawer, not the aisle.`,
    ['parts', 'casa-grande', 'diesel'],
    field.id,
    '#f7efe3',
  )

  const habit = mk(
    'Index card habit',
    `One thought per card. If it sprawls, split it.

Title is a noun you can [[Wiki trails]] from another card. Body stays short enough to read standing up.

This desk is paper with a search box — not a second brain product.`,
    ['method', 'cards'],
    desk.id,
    '#f1f4fa',
  )

  const wiki = mk(
    'Wiki trails',
    `Type [[Verde River morning]] to leave a pencil line to another card. Backlinks show who pointed here.

Find links in the editor when you forget the exact title. Keep trails honest — no orphan marketing cards.

Habit pair: [[Index card habit]].`,
    ['links', 'method'],
    desk.id,
    '#f6f1e6',
  )

  const search = mk(
    'Search before you stack',
    `Press / and type a word from the field — diesel, verde, monsoon.

Search hits title, body, and tags. Better than a third pile of cards with the same idea.

After you find the thread, [[Export the week's cards]] so the truck copy matches the desk.`,
    ['search', 'ux'],
    desk.id,
    '#fdecef',
  )

  const exportCard = mk(
    'Export the week\'s cards',
    `Export Markdown from the header. One .md per card, tags and collection in the frontmatter, zip ready for the glovebox USB.

No account. Notes stay in this browser until you export.

Linked from [[Monsoon window]] and [[Search before you stack]] on purpose — backup is part of the job.`,
    ['export', 'markdown', 'backup'],
    threads.id,
    '#f3f7f1',
  )

  return {
    version: 1,
    seedKey: DEMO_SEED_KEY,
    notes: [verde, pump, monsoon, parts, habit, wiki, search, exportCard],
    collections: [field, threads, desk],
    updatedAt: t0,
  }
}

/** True when local desk is still an old SAMPLE / prior seed and safe to replace. */
export function shouldReseedDemo(snap: Snapshot): boolean {
  if (snap.seedKey === DEMO_SEED_KEY) return false
  if (snap.notes.length === 0) return true
  // Old Phase A/B deck: every card flagged sample, or classic SAMPLE titles
  const allSample = snap.notes.every((n) => n.sample)
  const classic =
    snap.notes.some((n) => n.title === 'Welcome to Inkwell') &&
    snap.notes.some((n) => /SAMPLE\s*—/.test(n.body))
  return allSample || classic
}
