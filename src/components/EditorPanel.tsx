import { useEffect, useMemo, useRef, useState } from 'react'
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
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!open || !note) return
    const id = window.setTimeout(() => {
      const el = titleRef.current
      if (!el) return
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    }, 40)
    return () => window.clearTimeout(id)
  }, [open, note?.id])

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
        aria-label="Press this card"
      >
        {note && (
          <>
            <div className="editor-head">
              <button
                type="button"
                className="btn text"
                onClick={() => {
                  closeEditor()
                  resetAi()
                }}
              >
                Desk
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
              ref={titleRef}
              className="editor-title"
              value={note.title}
              onChange={(e) => updateNote(note.id, { title: e.target.value })}
              aria-label="Title"
              placeholder="Untitled card"
            />
            <div className="editor-meta">
              <label>
                Folder
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
                Tags
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
              ref={bodyRef}
              className="editor-body"
              value={note.body}
              onChange={(e) => updateNote(note.id, { body: e.target.value })}
              placeholder="Write on the stock. Pencil [[Another card]]."
              spellCheck
            />
            <p className="editor-hint">
              Pencil <code>[[Card title]]</code> for a trail. Tools stay quiet below.
            </p>

            <section className="ai-assist" aria-label="Desk tools">
              <h3 className="assist-heading">Desk tools</h3>
              <p className="ai-meta">
                Tag · Tighten · Find links
              </p>
              <LinkDraw active={Boolean(linkResult && linkResult.links.length)} />
              <div className="ai-actions">
                <button
                  type="button"
                  className="btn tiny quiet"
                  disabled={busy !== null}
                  onClick={() => void runAutotag()}
                >
                  {busy === 'autotag' ? 'Reading…' : 'Tag'}
                </button>
                <button
                  type="button"
                  className="btn tiny quiet"
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
                      No nearby cards yet — write a little more.
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
                <p className="muted">No backlinks yet. Name this card from another with [[…]].</p>
              ) : (
                <ul>
                  {links.map((l) => (
                    <li key={l.id}>
                      <button type="button" onClick={() => openNote(l.id)}>
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
