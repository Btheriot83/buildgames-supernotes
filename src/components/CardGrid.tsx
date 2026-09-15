import { filteredNotes, useNotes } from '../store/notesStore'
import { NoteCard } from './NoteCard'
import { renderBodyPreview } from '../lib/links'

export function CardGrid() {
  const state = useNotes()
  const notes = filteredNotes(state)
  const openNote = useNotes((s) => s.openNote)
  const createNote = useNotes((s) => s.createNote)
  const view = state.view
  const hasFilters = Boolean(state.query || state.activeCollectionId || state.activeTag)

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <img
          src="/art/empty-desk.png"
          alt="Blank notecards and a fountain pen on a wooden desk"
          width={840}
          height={472}
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <h3>{hasFilters ? 'Nothing matches' : 'Desk is clear'}</h3>
        <p>
          {hasFilters
            ? 'Clear search or filters, or start a fresh card.'
            : 'One idea per card. Link with [[titles]]. Auto-tag and summarize when you need a polish.'}
        </p>
        <button type="button" className="btn solid" onClick={createNote}>
          New card
        </button>
      </div>
    )
  }

  if (view === 'list') {
    return (
      <ul className="note-list t-texts-reveal" data-state="in">
        {notes.map((n) => (
          <li key={n.id}>
            <button type="button" className="list-row" onClick={() => openNote(n.id)}>
              <strong>
                {n.sample && <span className="sample-badge inline">SAMPLE</span>}
                {n.title}
              </strong>
              <span>{renderBodyPreview(n.body, 90)}</span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="card-grid t-texts-reveal" data-state="in">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} />
      ))}
    </div>
  )
}
