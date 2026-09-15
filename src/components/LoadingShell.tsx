export function LoadingShell({ revealed }: { revealed: boolean }) {
  return (
    <div
      className={`loading-shell t-skeleton-reveal${revealed ? ' is-gone' : ''}`}
      aria-hidden={revealed}
    >
      <div className="loading-card t-skel">
        <div className="t-skel-skeleton">
          <div className="skel-line skel-title" />
          <div className="skel-line" />
          <div className="skel-line" />
          <div className="skel-line short" />
        </div>
      </div>
      <p className="loading-label">Laying out the cards…</p>
    </div>
  )
}
