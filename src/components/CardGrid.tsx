import { filteredNotes, useNotes } from '../store/notesStore'
import { NoteCard } from './NoteCard'
import { renderBodyPreview } from '../lib/links'

export function CardGrid() {
  const state = useNotes()
  const notes = filteredNotes(state)
  const openNote = useNotes((s) => s.openNote)
  const view = state.view

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No cards match. Clear filters or create a new card.</p>
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
