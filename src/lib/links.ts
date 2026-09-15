import type { Note, NoteId } from './types'

const WIKI = /\[\[([^\]|#]+)(?:\|[^\]]+)?\]\]/g

export function extractWikiTitles(body: string): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const m of body.matchAll(WIKI)) {
    const t = m[1].trim()
    const key = t.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      out.push(t)
    }
  }
  return out
}

export function noteByTitle(notes: Note[], title: string): Note | undefined {
  const key = title.trim().toLowerCase()
  return notes.find((n) => n.title.trim().toLowerCase() === key)
}

/** Outgoing links from a note (by resolved id when possible). */
export function outgoingIds(note: Note, notes: Note[]): NoteId[] {
  const ids: NoteId[] = []
  for (const title of extractWikiTitles(note.body)) {
    const hit = noteByTitle(notes, title)
    if (hit && hit.id !== note.id) ids.push(hit.id)
  }
  return ids
}

/** Notes that link TO this note. */
export function backlinks(target: Note, notes: Note[]): Note[] {
  const key = target.title.trim().toLowerCase()
  return notes.filter((n) => {
    if (n.id === target.id) return false
    return extractWikiTitles(n.body).some((t) => t.toLowerCase() === key)
  })
}

export function renderBodyPreview(body: string, max = 160): string {
  const plain = body
    .replace(WIKI, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/[*_`>~]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  return plain.length > max ? plain.slice(0, max - 1) + '…' : plain
}
