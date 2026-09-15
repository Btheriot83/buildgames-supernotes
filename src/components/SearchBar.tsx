import { useEffect, useRef } from 'react'
import { useNotes } from '../store/notesStore'

export function SearchBar() {
  const query = useNotes((s) => s.query)
  const setQuery = useNotes((s) => s.setQuery)
  const clearQuery = useNotes((s) => s.clearQuery)
  const shake = useNotes((s) => s.searchShake)
  const createNote = useNotes((s) => s.createNote)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        ref.current?.focus()
      }
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        createNote()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [createNote])

  return (
    <div className={`search-bar${shake ? ' t-error-state-shake is-error' : ''}`}>
      <label className="sr-only" htmlFor="ink-search">
        Search cards
      </label>
      <input
        id="ink-search"
        ref={ref}
        className="search-input t-clear"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find a card — press /"
        autoComplete="off"
      />
      {query && (
        <button type="button" className="clear-btn" onClick={clearQuery} aria-label="Clear search">
          Clear
        </button>
      )}
    </div>
  )
}
