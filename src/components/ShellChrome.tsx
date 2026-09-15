import { useNotes } from '../store/notesStore'

export function ShellChrome() {
  const notes = useNotes((s) => s.notes)
  const exportZip = useNotes((s) => s.exportZip)
  const resetSample = useNotes((s) => s.resetSample)
  const createNote = useNotes((s) => s.createNote)
  const count = notes.length

  return (
    <header className="shell-chrome">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true" />
        <div>
          <h1 className="t-texts-reveal" data-state="in">
            Inkwell
          </h1>
          <p className="brand-sub">
            <span className="t-number-pop-in" key={count} data-state="in">
              {count}
            </span>{' '}
            cards · local desk
          </p>
        </div>
      </div>
      <div className="chrome-actions">
        <button type="button" className="btn ghost" onClick={() => void resetSample()}>
          Sample
        </button>
        <button type="button" className="btn ghost" onClick={() => void exportZip()}>
          Export .md
        </button>
        <button type="button" className="btn solid" onClick={createNote}>
          New card
        </button>
      </div>
    </header>
  )
}
