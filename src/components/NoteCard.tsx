import { useRef, type MouseEvent } from 'react'
import type { Note } from '../lib/types'
import { backlinks, extractWikiTitles, renderBodyPreview } from '../lib/links'
import { useNotes } from '../store/notesStore'

export function NoteCard({ note }: { note: Note }) {
  const openNote = useNotes((s) => s.openNote)
  const notes = useNotes((s) => s.notes)
  const collections = useNotes((s) => s.collections)
  const col = collections.find((c) => c.id === note.collectionId)
  const outbound = extractWikiTitles(note.body)
  const inbound = backlinks(note, notes).length
  const ref = useRef<HTMLButtonElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <button
      ref={ref}
      type="button"
      className="note-card t-tilt-card"
      style={{ background: note.color }}
      onClick={() => openNote(note.id)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="card-top">
        {col && (
          <span className="card-col">
            <span className="dot" style={{ background: col.color }} />
            {col.name}
          </span>
        )}
        {(outbound.length > 0 || inbound > 0) && (
          <span className="card-link-meta" title="Outgoing wiki links / backlinks">
            {outbound.length}↔{inbound}
          </span>
        )}
      </div>
      <h3>{note.title}</h3>
      <p>{renderBodyPreview(note.body)}</p>
      <div className="card-tags">
        {note.tags.slice(0, 3).map((t) => (
          <span key={t} className="tag-chip tiny">
            {t}
          </span>
        ))}
        {outbound.slice(0, 2).map((t) => (
          <span key={t} className="tag-chip tiny linkish wiki-chip">
            [[{t}]]
          </span>
        ))}
        {outbound.length > 2 && (
          <span className="tag-chip tiny linkish">+{outbound.length - 2}</span>
        )}
      </div>
    </button>
  )
}
