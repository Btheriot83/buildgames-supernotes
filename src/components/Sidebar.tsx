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
  const tags = allTags(notes)

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
        <h2>Collections</h2>
        <button
          type="button"
          className={`side-item${!activeCollectionId && !activeTag ? ' is-active' : ''}`}
          onClick={() => {
            setCollectionFilter(null)
            setTagFilter(null)
          }}
        >
          All cards
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
        <form
          className="add-col"
          onSubmit={(e) => {
            e.preventDefault()
            addCollection(name)
            setName('')
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New collection"
            aria-label="New collection name"
          />
          <button type="submit" className="btn tiny">
            Add
          </button>
        </form>
      </section>

      <section>
        <h2>Tags</h2>
        <div className="tag-cloud">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              className={`tag-chip${activeTag === t ? ' is-active' : ''}`}
              onClick={() => setTagFilter(activeTag === t ? null : t)}
            >
              {t}
            </button>
          ))}
          {tags.length === 0 && <p className="muted">No tags yet</p>}
        </div>
      </section>
    </aside>
  )
}
