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
  const tabColor = col?.color ?? '#c48a3a'

  const onMove = (_e: MouseEvent) => {
    /* craft5: tilt cut — flat stock, Craft-calm overview */
  }
  const onLeave = () => {}

  return (
    <button
      ref={ref}
      type="button"
      className="note-card t-tilt-card"
      style={{ background: 'var(--paper-card)', ['--tab' as string]: tabColor }}
      onClick={() => openNote(note.id)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="card-tab" aria-hidden />
      <span className="card-rules" aria-hidden />
      <div className="card-top">
        {col && (
          <span className="card-col">
            <span className="dot stamp-dot" style={{ background: col.color }} />
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
        {note.tags.slice(0, 1).map((t) => (
          <span key={t} className="tag-chip tiny hashish">
            #{t}
          </span>
        ))}
        {outbound.slice(0, 1).map((t) => (
          <span key={t} className="tag-chip tiny linkish wiki-chip">
            [[{t}]]
          </span>
        ))}
      </div>
    </button>
  )
}
