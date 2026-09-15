import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { Collection, Note } from './types'

function slug(title: string): string {
  const s = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return s || 'note'
}

function toMarkdown(note: Note, collections: Collection[]): string {
  const col = collections.find((c) => c.id === note.collectionId)
  const fm = [
    '---',
    `title: ${JSON.stringify(note.title)}`,
    `tags: [${note.tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    col ? `collection: ${JSON.stringify(col.name)}` : null,
    note.sample ? 'sample: true' : null,
    `updated: ${note.updatedAt}`,
    '---',
    '',
    note.body.trim(),
    '',
  ]
    .filter((x) => x !== null)
    .join('\n')
  return fm
}

export async function exportMarkdownZip(
  notes: Note[],
  collections: Collection[],
): Promise<void> {
  const zip = new JSZip()
  const folder = zip.folder('inkwell-notes')
  if (!folder) throw new Error('zip failed')
  const used = new Map<string, number>()
  for (const note of notes) {
    let base = slug(note.title)
    const n = used.get(base) ?? 0
    used.set(base, n + 1)
    if (n > 0) base = `${base}-${n}`
    folder.file(`${base}.md`, toMarkdown(note, collections))
  }
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `inkwell-notes-${new Date().toISOString().slice(0, 10)}.zip`)
}
