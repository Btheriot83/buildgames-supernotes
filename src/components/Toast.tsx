import { useNotes } from '../store/notesStore'

export function Toast() {
  const toast = useNotes((s) => s.toast)
  const dismiss = useNotes((s) => s.dismissToast)
  const open = Boolean(toast)
  return (
    <div
      className={`app-toast t-toast${open ? ' is-open' : ''}`}
      role="status"
      onClick={dismiss}
    >
      {toast?.message ?? ''}
    </div>
  )
}
