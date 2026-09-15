import { useMemo, useState } from 'react'
import { backlinks } from '../lib/links'
import {
  autotagCard,
  suggestLinks,
  summarizeCard,
  type AiLinks,
  type AiSummary,
  type AiTags,
} from '../lib/aiAssist'
import { allTags, useNotes } from '../store/notesStore'
import { LinkDraw } from './LinkDraw'

export function EditorPanel() {
  const open = useNotes((s) => s.editorOpen)
  const selectedId = useNotes((s) => s.selectedId)
  const notes = useNotes((s) => s.notes)
  const collections = useNotes((s) => s.collections)
  const updateNote = useNotes((s) => s.updateNote)
  const deleteNote = useNotes((s) => s.deleteNote)
  const closeEditor = useNotes((s) => s.closeEditor)
  const openNote = useNotes((s) => s.openNote)
  const showToast = useNotes((s) => s.showToast)

  const note = notes.find((n) => n.id === selectedId) ?? null
  const links = useMemo(() => (note ? backlinks(note, notes) : []), [note, notes])
  const deskTags = useMemo(() => allTags(notes), [notes])

  const [busy, setBusy] = useState<'summarize' | 'autotag' | 'link' | null>(null)
  const [summary, setSummary] = useState<AiSummary | null>(null)
  const [tagResult, setTagResult] = useState<AiTags | null>(null)
  const [linkResult, setLinkResult] = useState<AiLinks | null>(null)

  const resetAi = () => {
    setSummary(null)
    setTagResult(null)
    setLinkResult(null)
  }

  const runSummarize = async () => {
    if (!note) return
    setBusy('summarize')
    try {
      const out = await summarizeCard(note.title, note.body)
      setSummary(out)
      showToast(out.mode === 'llm' ? 'Tightened' : 'Tightened on-desk')
    } finally {
      setBusy(null)
    }
  }

  const runAutotag = async () => {
    if (!note) return
    setBusy('autotag')
    try {
      const out = await autotagCard(note.title, note.body, deskTags)
      setTagResult(out)
      const merged = [...new Set([...note.tags, ...out.tags])].slice(0, 12)
      updateNote(note.id, { tags: merged })
      showToast(out.mode === 'llm' ? 'Tags applied' : 'Tags from the text')
    } finally {
      setBusy(null)
    }
  }

  const runLinks = async () => {
    if (!note) return
    setBusy('link')
    try {
      const out = await suggestLinks(note, notes)
      setLinkResult(out)
      showToast(out.mode === 'llm' ? 'Links found' : 'Nearby cards')
    } finally {
      setBusy(null)
    }
  }

  const insertLink = (title: string) => {
    if (!note) return
    const wiki = `[[${title}]]`
    if (note.body.includes(wiki)) {
      showToast('Already linked')
      return
    }
    const next = note.body.trim() ? `${note.body.trim()}\n\nSee also ${wiki}.` : `See also ${wiki}.`
    updateNote(note.id, { body: next })
    showToast(`Linked [[${title}]]`)
  }

  const applySummary = () => {
    if (!note || !summary) return
    const block = `> ${summary.summary}`
    if (note.body.includes(summary.summary)) {
      showToast('Summary already in card')
      return
    }
    updateNote(note.id, {
      body: note.body.trim() ? `${block}\n\n${note.body.trim()}` : block,
    })
    showToast('Summary pinned to card')
  }

  return (
    <>
      <div
        className={`editor-scrim t-modal${open && note ? ' is-open' : ''}`}
        onClick={() => {
          closeEditor()
          resetAi()
        }}
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
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  closeEditor()
                  resetAi()
                }}
              >
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
              placeholder="One idea. Link with [[Another card]]."
              spellCheck
            />

            <section className="ai-assist" aria-label="AI card assist">
              <h3>Sharpen this card</h3>
              <p className="ai-meta">
                Tag it. Tighten it. Find the cards it should touch.
              </p>
              <LinkDraw active={Boolean(linkResult && linkResult.links.length)} />
              <div className="ai-actions">
                <button
                  type="button"
                  className="btn tiny"
                  disabled={busy !== null}
                  onClick={() => void runAutotag()}
                >
                  {busy === 'autotag' ? 'Reading…' : 'Tag'}
                </button>
                <button
                  type="button"
                  className="btn tiny"
                  disabled={busy !== null}
                  onClick={() => void runSummarize()}
                >
                  {busy === 'summarize' ? 'Tightening…' : 'Tighten'}
                </button>
                <button
                  type="button"
                  className="btn tiny solid"
                  disabled={busy !== null}
                  onClick={() => void runLinks()}
                >
                  {busy === 'link' ? 'Tracing…' : 'Find links'}
                </button>
              </div>
              {summary && (
                <div className="ai-result">
                  <strong>Tightened</strong>
                  <p style={{ margin: '0.35rem 0' }}>{summary.summary}</p>
                  <button type="button" className="btn tiny" onClick={applySummary}>
                    Keep on card
                  </button>
                </div>
              )}
              {tagResult && (
                <div className="ai-result">
                  <strong>Suggested tags</strong>
                  <p style={{ margin: '0.35rem 0' }}>{tagResult.tags.join(' · ') || '—'}</p>
                </div>
              )}
              {linkResult && (
                <div className="ai-result">
                  <strong>Nearby cards</strong>
                  {linkResult.links.length === 0 ? (
                    <p className="muted" style={{ margin: '0.35rem 0 0' }}>
                      Quiet desk — write a little more, or add another card.
                    </p>
                  ) : (
                    <ul>
                      {linkResult.links.map((l) => (
                        <li key={l.id}>
                          <button type="button" onClick={() => insertLink(l.title)}>
                            [[{l.title}]]
                            <span className="reason">{l.reason}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </section>

            <section className="backlinks">
              <h3>
                Backlinks{' '}
                <span className="t-number-pop-in" key={links.length} data-state="in">
                  {links.length}
                </span>
              </h3>
              {links.length === 0 ? (
                <p className="muted">Nothing points here yet. Name this card from another with [[…]].</p>
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
