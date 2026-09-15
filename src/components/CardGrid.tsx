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
        <h3>{hasFilters ? 'No cards match' : 'Empty press'}</h3>
        <p>
          {hasFilters
            ? 'Clear search or pick another collection — or cut a fresh card.'
            : 'Cut a card. Pencil a [[link]]. Search the press. Export Markdown when you leave.'}
        </p>
        <button type="button" className="btn solid" onClick={createNote}>
          Cut a card
        </button>
      </div>
    )
  }

  return (
    <div className="desk-stack">
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
