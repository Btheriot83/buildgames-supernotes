import { useMemo } from 'react'
import { backlinks } from '../lib/links'
import { useNotes } from '../store/notesStore'

export function EditorPanel() {
  const open = useNotes((s) => s.editorOpen)
  const selectedId = useNotes((s) => s.selectedId)
  const notes = useNotes((s) => s.notes)
  const collections = useNotes((s) => s.collections)
  const updateNote = useNotes((s) => s.updateNote)
  const deleteNote = useNotes((s) => s.deleteNote)
  const closeEditor = useNotes((s) => s.closeEditor)
  const openNote = useNotes((s) => s.openNote)

  const note = notes.find((n) => n.id === selectedId) ?? null
  const links = useMemo(() => (note ? backlinks(note, notes) : []), [note, notes])

  return (
    <>
      <div
        className={`editor-scrim t-modal${open && note ? ' is-open' : ''}`}
        onClick={closeEditor}
        aria-hidden={!open}
      />
      <aside
        className="editor-panel t-panel-slide"
        data-open={open && note ? 'true' : 'false'}
        aria-hidden={!open || !note}
        role="dialog"
        aria-label="Edit notecard"
      >
        {note && (
          <>
            <div className="editor-head">
              <button type="button" className="btn ghost" onClick={closeEditor}>
                Close
              </button>
              <button
                type="button"
                className="btn danger ghost"
                onClick={() => {
                  if (confirm('Delete this card?')) deleteNote(note.id)
                }}
              >
                Delete
              </button>
            </div>
            <input
              className="editor-title"
              value={note.title}
              onChange={(e) => updateNote(note.id, { title: e.target.value })}
              aria-label="Title"
            />
            <div className="editor-meta">
              <label>
                Collection
                <select
                  value={note.collectionId ?? ''}
                  onChange={(e) =>
                    updateNote(note.id, {
                      collectionId: e.target.value || null,
                    })
                  }
                >
                  <option value="">None</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Tags (comma)
                <input
                  value={note.tags.join(', ')}
                  onChange={(e) =>
                    updateNote(note.id, {
                      tags: e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </label>
            </div>
            <textarea
              className="editor-body"
              value={note.body}
              onChange={(e) => updateNote(note.id, { body: e.target.value })}
              placeholder="Write the card. Link with [[Other card title]]."
              spellCheck
            />
            <section className="backlinks">
              <h3>
                Backlinks{' '}
                <span className="t-number-pop-in" key={links.length} data-state="in">
                  {links.length}
                </span>
              </h3>
              {links.length === 0 ? (
                <p className="muted">No cards link here yet. Mention this title with [[…]].</p>
              ) : (
                <ul>
                  {links.map((l) => (
                    <li key={l.id}>
                      <button type="button" onClick={() => openNote(l.id)}>
                        {l.sample && <span className="sample-badge inline">SAMPLE</span>}
                        {l.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </aside>
    </>
  )
}
