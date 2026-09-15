import { nanoid } from 'nanoid'
import type { Collection, Note, Snapshot } from './types'

const now = () => new Date().toISOString()

export function buildSample(): Snapshot {
  const inbox: Collection = { id: nanoid(), name: 'Inbox', color: '#268dea' }
  const research: Collection = { id: nanoid(), name: 'Research', color: '#28f5c4' }
  const projects: Collection = { id: nanoid(), name: 'Projects', color: '#e8a14a' }

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

Write short cards. Link them with [[wiki links]]. Tag freely. Export a folder of Markdown whenever you want a backup.

Try opening [[Zettelkasten habit]] or filtering by the research collection.`,
    ['sample', 'start'],
    inbox.id,
    '#f4efe6',
  )

  const zettel = mk(
    'Zettelkasten habit',
    `SAMPLE — one idea per card.

Capture → link → revisit. Backlinks appear automatically when other cards mention this title with [[Zettelkasten habit]].

See also [[Atomic notes]] and [[Export Markdown]].`,
    ['sample', 'method'],
    research.id,
    '#eef6f2',
  )

  const atomic = mk(
    'Atomic notes',
    `SAMPLE — keep each card self-contained.

If a thought grows, split it. Link back to [[Welcome to Inkwell]] so the trail stays visible.`,
    ['sample', 'method'],
    research.id,
    '#f7f1e8',
  )

  const exportMd = mk(
    'Export Markdown',
    `SAMPLE — Inkwell exports a zip of .md files (one per card).

Frontmatter includes tags and collection. No accounts. Your notes live in IndexedDB until you export.`,
    ['sample', 'backup'],
    projects.id,
    '#f3ebe3',
  )

  const shortcuts = mk(
    'Keyboard habits',
    `SAMPLE — / focuses search. N creates a card. Esc closes the editor.

Search matches title, body, and tags instantly.`,
    ['sample', 'ux'],
    inbox.id,
    '#eef2f7',
  )

  return {
    version: 1,
    notes: [welcome, zettel, atomic, exportMd, shortcuts],
    collections: [inbox, research, projects],
    updatedAt: t0,
  }
}
