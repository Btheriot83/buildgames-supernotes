import { useNotes } from '../store/notesStore'

export function SuccessOverlay() {
  const flash = useNotes((s) => s.successFlash)
  return (
    <div className={`success-overlay${flash ? ' is-on' : ''}`} aria-hidden={!flash}>
      <span className="t-success-check" data-state={flash ? 'in' : 'out'}>
        <svg viewBox="0 0 48 48" width="56" height="56" fill="none">
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.35" />
          <path
            d="M14 25.5 L21 32.5 L34 16.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
          />
        </svg>
      </span>
      <p>Zip ready</p>
      <span className="success-sub">One .md per card. Frontmatter keeps tags.</span>
    </div>
  )
}
