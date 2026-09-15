import { nanoid } from 'nanoid'
import type { Collection, Note, Snapshot } from './types'

const now = () => new Date().toISOString()

export function buildSample(): Snapshot {
  const inbox: Collection = { id: nanoid(), name: 'Inbox', color: '#3d7ea6' }
  const research: Collection = { id: nanoid(), name: 'Research', color: '#5f7a4a' }
  const projects: Collection = { id: nanoid(), name: 'Projects', color: '#c48a3a' }

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
    sample: true,
    createdAt: t0,
    updatedAt: t0,
  })

  const welcome = mk(
    'Welcome to Inkwell',
    `SAMPLE — small linked notecards, not sprawling documents.

Write short cards. Link them with [[wiki links]]. Tag freely. Use Auto-tag / Summarize / Suggest links in the editor. Export Markdown whenever you want a backup.

Try opening [[Zettelkasten habit]] or filtering by the research collection.`,
    ['sample', 'start'],
    inbox.id,
    '#fff8ef',
  )

  const zettel = mk(
    'Zettelkasten habit',
    `SAMPLE — one idea per card.

Capture → link → revisit. Backlinks appear automatically when other cards mention this title with [[Zettelkasten habit]].

See also [[Atomic notes]] and [[Export Markdown]].`,
    ['sample', 'method'],
    research.id,
    '#f3f7f1',
  )

  const atomic = mk(
    'Atomic notes',
    `SAMPLE — keep each card self-contained.

If a thought grows, split it. Link back to [[Welcome to Inkwell]] so the trail stays visible.`,
    ['sample', 'method'],
    research.id,
    '#fff1ea',
  )

  const exportMd = mk(
    'Export Markdown',
    `SAMPLE — Inkwell exports a zip of .md files (one per card).

Frontmatter includes tags and collection. No accounts. Your notes live in IndexedDB until you export.`,
    ['sample', 'backup'],
    projects.id,
    '#f7efe3',
  )

  const shortcuts = mk(
    'Keyboard habits',
    `SAMPLE — / focuses search. N creates a card. Esc closes the editor.

Search matches title, body, and tags instantly.`,
    ['sample', 'ux'],
    inbox.id,
    '#f1f4fa',
  )

  return {
    version: 1,
    notes: [welcome, zettel, atomic, exportMd, shortcuts],
    collections: [inbox, research, projects],
    updatedAt: t0,
  }
}
