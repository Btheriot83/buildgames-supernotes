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
        <div className="empty-media">
          <video
            className="empty-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/art/empty-desk.png"
            onError={(e) => {
              ;(e.currentTarget as HTMLVideoElement).style.display = 'none'
            }}
          >
            <source src="/art/empty-desk-loop.mp4" type="video/mp4" />
          </video>
          <img
            className="empty-fallback"
            src="/art/empty-desk.png"
            alt=""
            width={840}
            height={472}
          />
        </div>
        <h3>{hasFilters ? 'No cards here' : 'Clear desk'}</h3>
        <p>
          {hasFilters
            ? 'Loosen search or filters — or jot a fresh card.'
            : 'One thought per card. Pencil a [[link]]. Let the desk suggest the rest.'}
        </p>
        <button type="button" className="btn solid" onClick={createNote}>
          Start a card
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
