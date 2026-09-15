import { useEffect } from 'react'
import { CardGrid } from './components/CardGrid'
import { EditorPanel } from './components/EditorPanel'
import { InkBg } from './components/InkBg'
import { LoadingShell } from './components/LoadingShell'
import { OnboardingWalkthrough } from './components/OnboardingWalkthrough'
import { SearchBar } from './components/SearchBar'
import { ShellChrome } from './components/ShellChrome'
import { Sidebar } from './components/Sidebar'
import { SuccessOverlay } from './components/SuccessOverlay'
import { Toast } from './components/Toast'
import { useNotes } from './store/notesStore'

export default function App() {
  const boot = useNotes((s) => s.boot)
  const loadStatus = useNotes((s) => s.loadStatus)
  const closeEditor = useNotes((s) => s.closeEditor)
  const editorOpen = useNotes((s) => s.editorOpen)

  useEffect(() => {
    void boot()
  }, [boot])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && editorOpen) closeEditor()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeEditor, editorOpen])

  const booting = loadStatus === 'boot' || loadStatus === 'loading'
  const ready = loadStatus === 'ready' || loadStatus === 'error'

  return (
    <div className="app-shell">
      <InkBg />
      <LoadingShell revealed={!booting} />
      {ready && (
        <div className={`app-frame${editorOpen ? ' is-writing' : ''}`}>
          <ShellChrome />
          <SearchBar />
          <div className="desk">
            <Sidebar />
            <main className="desk-main" aria-live="polite">
              <CardGrid />
            </main>
          </div>
        </div>
      )}
      <EditorPanel />
      {ready && <OnboardingWalkthrough />}
      <Toast />
      <SuccessOverlay />
    </div>
  )
}
