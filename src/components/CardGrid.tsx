import { filteredNotes, useNotes } from '../store/notesStore'
import { NoteCard } from './NoteCard'
import { extractWikiTitles, renderBodyPreview } from '../lib/links'

export function CardGrid() {
  const state = useNotes()
  const notes = filteredNotes(state)
  const openNote = useNotes((s) => s.openNote)
  const createNote = useNotes((s) => s.createNote)
  const view = state.view
  const hasFilters = Boolean(state.query || state.activeCollectionId || state.activeTag)
  const linkCount = state.notes.reduce((n, note) => n + extractWikiTitles(note.body).length, 0)

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
            : 'Write a card. Link it with [[Title]]. Search the desk. Export Markdown when you leave.'}
        </p>
        <button type="button" className="btn solid" onClick={createNote}>
          Start a card
        </button>
      </div>
    )
  }

  return (
    <div className="desk-stack">
      <div className="desk-status" aria-live="polite">
        <strong>
          {notes.length} card{notes.length === 1 ? '' : 's'}
          {hasFilters ? ' shown' : ' on the desk'}
        </strong>
        <span className="desk-status-sep" aria-hidden>
          ·
        </span>
        <span>{linkCount} wiki links</span>
        <span className="desk-status-sep" aria-hidden>
          ·
        </span>
        <span>Search above · Export Markdown in the header</span>
      </div>

      {view === 'list' ? (
        <ul className="note-list t-texts-reveal" data-state="in">
          {notes.map((n) => {
            const links = extractWikiTitles(n.body)
            return (
              <li key={n.id}>
                <button type="button" className="list-row" onClick={() => openNote(n.id)}>
                  <strong>{n.title}</strong>
                  <span>{renderBodyPreview(n.body, 90)}</span>
                  {links.length > 0 && (
                    <span className="list-links">
                      {links.slice(0, 3).map((t) => (
                        <span key={t} className="tag-chip tiny linkish wiki-chip">
                          [[{t}]]
                        </span>
                      ))}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="card-grid t-texts-reveal" data-state="in">
          {notes.map((n) => (
            <NoteCard key={n.id} note={n} />
          ))}
        </div>
      )}
    </div>
  )
}
