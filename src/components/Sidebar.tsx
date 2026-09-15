import { useState } from 'react'
import { allTags, useNotes } from '../store/notesStore'

export function Sidebar() {
  const collections = useNotes((s) => s.collections)
  const notes = useNotes((s) => s.notes)
  const activeCollectionId = useNotes((s) => s.activeCollectionId)
  const activeTag = useNotes((s) => s.activeTag)
  const setCollectionFilter = useNotes((s) => s.setCollectionFilter)
  const setTagFilter = useNotes((s) => s.setTagFilter)
  const addCollection = useNotes((s) => s.addCollection)
  const view = useNotes((s) => s.view)
  const setView = useNotes((s) => s.setView)
  const [name, setName] = useState('')
  const [adding, setAdding] = useState(false)
  const tags = allTags(notes)
  const shownTags = tags.slice(0, 6)
  const extra = tags.length - shownTags.length

  return (
    <aside className="sidebar t-panel-reveal" data-state="in">
      <div className="view-tabs t-tabs">
        <div className="t-tabs-indicator" style={{ ['--tabs-i' as string]: view === 'cards' ? 0 : 1 }} />
        <button
          type="button"
          className={`t-tab${view === 'cards' ? ' is-active' : ''}`}
          onClick={() => setView('cards')}
        >
          Cards
        </button>
        <button
          type="button"
          className={`t-tab${view === 'list' ? ' is-active' : ''}`}
          onClick={() => setView('list')}
        >
          List
        </button>
      </div>

      <section>
        <div className="side-head">
          <h2>Folders</h2>
          <button
            type="button"
            className="side-add"
            aria-label="Add collection"
            onClick={() => setAdding((v) => !v)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className={`side-item${!activeCollectionId && !activeTag ? ' is-active' : ''}`}
          onClick={() => {
            setCollectionFilter(null)
            setTagFilter(null)
          }}
        >
          All cards
          <span className="count">{notes.length}</span>
        </button>
        {collections.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`side-item${activeCollectionId === c.id ? ' is-active' : ''}`}
            onClick={() => setCollectionFilter(c.id)}
          >
            <span className="dot" style={{ background: c.color }} />
            {c.name}
            <span className="count">
              {notes.filter((n) => n.collectionId === c.id).length}
            </span>
          </button>
        ))}
        {adding && (
          <form
            className="add-col"
            onSubmit={(e) => {
              e.preventDefault()
              addCollection(name)
              setName('')
              setAdding(false)
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Collection name"
              aria-label="New collection name"
              autoFocus
            />
            <button type="submit" className="btn tiny">
              Add
            </button>
          </form>
        )}
      </section>

      <section className="tag-rail">
        <h2>Tags</h2>
        <div className="tag-nest">
          {shownTags.map((t) => (
            <button
              key={t}
              type="button"
              className={`tag-line${activeTag === t ? ' is-active' : ''}${t.includes('-') ? ' is-nest' : ''}`}
              onClick={() => setTagFilter(activeTag === t ? null : t)}
            >
              <span className="tag-hash">#</span>
              {t}
            </button>
          ))}
          {extra > 0 && !activeTag && (
            <span className="tag-more muted">{extra} more from cards</span>
          )}
          {activeTag && !shownTags.includes(activeTag) && (
            <button
              type="button"
              className="tag-line is-active"
              onClick={() => setTagFilter(null)}
            >
              <span className="tag-hash">#</span>
              {activeTag}
            </button>
          )}
          {tags.length === 0 && <p className="muted">Tags come from card text</p>}
        </div>
      </section>
    </aside>
  )
}
