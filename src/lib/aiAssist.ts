import type { Note } from './types'

export type AiMode = 'local' | 'llm'
export type AiSummary = { mode: AiMode; summary: string; provider?: string }
export type AiTags = { mode: AiMode; tags: string[]; provider?: string }
export type AiLinks = {
  mode: AiMode
  links: { id: string; title: string; reason: string }[]
  provider?: string
}

const STOP = new Set(
  'a an the and or but if in on at to for of as is was are were be been being with by from this that these those it its into over under about after before between without within than then so such not no nor only own same too very can will just also than more most some any each few other into over again further once here there when where why how all both each few more most other some such no nor not only own same so than too very'.split(
    ' ',
  ),
)

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/\[\[([^\]]+)\]\]/g, ' $1 ')
    .replace(/[^a-z0-9\s#-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t))
}

function freq(words: string[]): Map<string, number> {
  const m = new Map<string, number>()
  for (const w of words) m.set(w, (m.get(w) || 0) + 1)
  return m
}

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0
  let na = 0
  let nb = 0
  for (const [, v] of a) na += v * v
  for (const [, v] of b) nb += v * v
  if (!na || !nb) return 0
  for (const [k, v] of a) {
    const u = b.get(k)
    if (u) dot += v * u
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

/** Extractive summary — first dense sentence + key noun phrases. Not canned. */
export function localSummarize(title: string, body: string): AiSummary {
  const cleaned = body.replace(/\[\[([^\]]+)\]\]/g, '$1').replace(/\s+/g, ' ').trim()
  if (!cleaned) {
    return { mode: 'local', summary: title ? `Untitled thought: ${title}.` : 'Empty card — write a seed idea first.' }
  }
  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const scored = sentences.map((s) => {
    const w = tokens(s)
    const uniq = new Set(w).size
    return { s, score: uniq + Math.min(s.length, 180) / 180 }
  })
  scored.sort((a, b) => b.score - a.score)
  const top = scored.slice(0, 2).map((x) => x.s)
  let summary = top.join(' ')
  if (summary.length > 280) summary = summary.slice(0, 277) + '…'
  if (title && !summary.toLowerCase().includes(title.toLowerCase().slice(0, 18))) {
    summary = `${title}: ${summary}`
  }
  return { mode: 'local', summary }
}

/** TF-style auto-tags from card text, preferring desk vocabulary. */
export function localAutotag(title: string, body: string, deskTags: string[]): AiTags {
  const words = tokens(`${title} ${body}`)
  const f = freq(words)
  const preferred = new Set(deskTags.map((t) => t.toLowerCase()))
  const scored: { tag: string; score: number }[] = []
  for (const [w, c] of f) {
    let score = c
    if (preferred.has(w)) score += 3
    if (title.toLowerCase().includes(w)) score += 2
    if (w.startsWith('#') || w.length >= 5) score += 0.5
    scored.push({ tag: w.replace(/^#/, ''), score })
  }
  scored.sort((a, b) => b.score - a.score)
  const tags: string[] = []
  for (const row of scored) {
    if (tags.length >= 5) break
    if (!tags.includes(row.tag)) tags.push(row.tag)
  }
  // Prefer existing desk tags that appear
  for (const t of deskTags) {
    const key = t.toLowerCase()
    if (words.includes(key) && !tags.includes(key) && tags.length < 6) tags.unshift(key)
  }
  return { mode: 'local', tags: [...new Set(tags)].slice(0, 6) }
}

/** Cosine-similarity link suggestions across the desk. */
export function localLinkSuggest(note: Note, catalog: Note[]): AiLinks {
  const self = freq(tokens(`${note.title} ${note.body} ${note.tags.join(' ')}`))
  const scored = catalog
    .filter((n) => n.id !== note.id)
    .map((n) => {
      const other = freq(tokens(`${n.title} ${n.body} ${n.tags.join(' ')}`))
      const score = cosine(self, other)
      const shared = [...self.keys()].filter((k) => other.has(k)).slice(0, 3)
      return {
        id: n.id,
        title: n.title,
        score,
        reason: shared.length ? `Shares ${shared.join(', ')}` : 'Related theme',
      }
    })
    .filter((r) => r.score > 0.05)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
  return {
    mode: 'local',
    links: scored.map(({ id, title, reason }) => ({ id, title, reason })),
  }
}

async function postAi(payload: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return null
    return (await res.json()) as Record<string, unknown>
  } catch {
    return null
  }
}

export async function summarizeCard(title: string, body: string): Promise<AiSummary> {
  const remote = await postAi({ action: 'summarize', title, body })
  if (remote?.mode === 'llm' && typeof remote.summary === 'string' && remote.summary.trim()) {
    return { mode: 'llm', summary: remote.summary.trim(), provider: String(remote.provider || 'llm') }
  }
  return localSummarize(title, body)
}

export async function autotagCard(title: string, body: string, deskTags: string[]): Promise<AiTags> {
  const remote = await postAi({ action: 'autotag', title, body, tags: deskTags })
  if (remote?.mode === 'llm' && Array.isArray(remote.tags) && remote.tags.length) {
    return {
      mode: 'llm',
      tags: remote.tags.map(String).map((t) => t.toLowerCase().replace(/^#/, '')),
      provider: String(remote.provider || 'llm'),
    }
  }
  return localAutotag(title, body, deskTags)
}

export async function suggestLinks(note: Note, catalog: Note[]): Promise<AiLinks> {
  const remote = await postAi({
    action: 'link',
    title: note.title,
    body: note.body,
    catalog: catalog.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body.slice(0, 280),
      tags: n.tags,
    })),
  })
  if (remote?.mode === 'llm' && Array.isArray(remote.links) && remote.links.length) {
    const byId = new Map(catalog.map((n) => [n.id, n]))
    const links = remote.links
      .map((raw) => {
        const row = raw as { id?: string; title?: string; reason?: string }
        const hit = row.id ? byId.get(row.id) : catalog.find((n) => n.title === row.title)
        if (!hit || hit.id === note.id) return null
        return { id: hit.id, title: hit.title, reason: String(row.reason || 'Suggested link') }
      })
      .filter(Boolean) as AiLinks['links']
    if (links.length) return { mode: 'llm', links, provider: String(remote.provider || 'llm') }
  }
  return localLinkSuggest(note, catalog)
}
