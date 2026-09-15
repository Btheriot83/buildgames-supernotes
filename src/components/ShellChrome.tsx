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
        <span className="brand-mark" role="img" aria-label="Inkwell mark" />
        <div>
          <h1 className="t-texts-reveal" data-state="in">
            Inkwell
          </h1>
          <p className="brand-sub">
            <span className="t-number-pop-in" key={count} data-state="in">
              {count}
            </span>{' '}
            cards on the desk
          </p>
        </div>
      </div>
      <div className="chrome-actions">
        <button type="button" className="btn ghost" onClick={() => void resetSample()}>
          Sample deck
        </button>
        <button type="button" className="btn ghost" onClick={() => void exportZip()}>
          Export Markdown
        </button>
        <button type="button" className="btn solid" onClick={createNote}>
          New card
        </button>
      </div>
    </header>
  )
}
