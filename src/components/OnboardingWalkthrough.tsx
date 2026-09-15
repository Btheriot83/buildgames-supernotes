import { useEffect, useState } from 'react'
import {
  ONBOARD_CARDS,
  markOnboarded,
  readOnboardStep,
  readOnboarded,
  writeOnboardStep,
  type OnboardCardId,
} from '../lib/onboarding'
import { useNotes } from '../store/notesStore'

function MiniPreview({ id }: { id: OnboardCardId }) {
  if (id === 'desk') {
    return (
      <div className="ob-mini ob-mini-stack" aria-hidden>
        <span className="ob-mini-stock" style={{ ['--tab' as string]: '#5f7a4a' }}>
          <em>Verde River morning</em>
          <span>Field notes</span>
        </span>
        <span className="ob-mini-stock is-back" style={{ ['--tab' as string]: '#3d7ea6' }}>
          <em>Wiki trails</em>
          <span>Desk kit</span>
        </span>
      </div>
    )
  }
  if (id === 'link') {
    return (
      <div className="ob-mini ob-mini-wiki" aria-hidden>
        <span className="ob-wiki-chip">[[Wiki trails]]</span>
        <span className="ob-mini-path">pencil line between two cards</span>
      </div>
    )
  }
  if (id === 'find') {
    return (
      <div className="ob-mini ob-mini-search" aria-hidden>
        <span className="ob-search-line">Find a card or [[link]]</span>
        <span className="ob-mini-path">/ to find</span>
      </div>
    )
  }
  if (id === 'done') {
    return (
      <div className="ob-mini ob-mini-check" aria-hidden>
        <span className="ob-check-mark" aria-hidden>
          ✓
        </span>
        <span>Export Markdown when you leave</span>
      </div>
    )
  }
  return (
    <div className="ob-mini ob-mini-press" aria-hidden>
      <span className="ob-mini-stock is-hero" style={{ ['--tab' as string]: '#c48a3a' }}>
        <em>Index card</em>
        <span>ruled stock · left tab</span>
      </span>
    </div>
  )
}

export function OnboardingWalkthrough() {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const notes = useNotes((s) => s.notes)
  const openNote = useNotes((s) => s.openNote)
  const closeEditor = useNotes((s) => s.closeEditor)

  useEffect(() => {
    if (readOnboarded()) {
      setActive(false)
      return
    }
    setStep(readOnboardStep())
    setActive(true)
  }, [])

  if (!active) return null

  const card = ONBOARD_CARDS[step] ?? ONBOARD_CARDS[0]!
  const total = ONBOARD_CARDS.length
  const index = step + 1

  const finish = () => {
    markOnboarded()
    setActive(false)
  }

  const skip = () => {
    finish()
  }

  const advance = () => {
    if (card.id === 'desk') {
      const sample = notes.find((n) => n.title === 'Wiki trails') ?? notes[0]
      if (sample) openNote(sample.id)
    }
    if (card.id === 'done' || step >= total - 1) {
      finish()
      return
    }
    if (card.id === 'link' || card.id === 'find') {
      closeEditor()
    }
    const next = step + 1
    writeOnboardStep(next)
    setStep(next)
    if (ONBOARD_CARDS[next]?.id === 'find') {
      window.setTimeout(() => {
        document.getElementById('ink-search')?.focus()
      }, 80)
    }
  }

  return (
    <div
      className="ob-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ob-title"
      data-testid="onboarding"
    >
      <div className="ob-backdrop" aria-hidden onClick={skip} />
      <div className="ob-card t-panel-reveal" data-state="in">
        <div className="ob-progress" aria-label={`Step ${index} of ${total}`}>
          {ONBOARD_CARDS.map((c, i) => (
            <span
              key={c.id}
              className={`ob-dot${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
            />
          ))}
          <span className="ob-progress-label">
            {index} of {total}
          </span>
        </div>

        <MiniPreview id={card.id} />

        <h2 id="ob-title" className="ob-title">
          {card.title}
        </h2>
        <p className="ob-body">{card.body}</p>

        <div className="ob-actions">
          <button type="button" className="btn text ob-skip" data-testid="onboard-skip" onClick={skip}>
            Skip
          </button>
          <button
            type="button"
            className="btn solid ob-cta"
            data-testid="onboard-next"
            onClick={advance}
          >
            {card.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
