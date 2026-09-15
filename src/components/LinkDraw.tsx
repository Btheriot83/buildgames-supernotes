/** Technique 5 — graphite pencil path when Find links returns matches (core job). */
export function LinkDraw({ active }: { active: boolean }) {
  return (
    <div className={`link-draw${active ? ' is-on' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 320 52" className="link-draw-svg">
        <path
          className="link-draw-path"
          d="M14 30 C 58 10, 110 46, 158 26 S 240 8, 306 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <rect className="link-draw-card a" x="4" y="18" width="20" height="24" rx="2" />
        <rect className="link-draw-card b" x="296" y="16" width="20" height="24" rx="2" />
      </svg>
      <span className="link-draw-caption">pencil trail between cards</span>
    </div>
  )
}
