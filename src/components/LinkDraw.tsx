/** Keyframe ink-draw between notecard ideas — Technique 5 motion craft (core job). */
export function LinkDraw({ active }: { active: boolean }) {
  return (
    <div className={`link-draw${active ? ' is-on' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 320 48" className="link-draw-svg">
        <path
          className="link-draw-path"
          d="M12 28 C 70 8, 120 44, 160 24 S 250 6, 308 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle className="link-draw-dot a" cx="12" cy="28" r="4" />
        <circle className="link-draw-dot b" cx="308" cy="26" r="4" />
      </svg>
    </div>
  )
}
