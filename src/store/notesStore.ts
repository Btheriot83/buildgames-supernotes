import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { clearSnapshot, loadSnapshot, saveSnapshot } from '../lib/db'
import { buildSample } from '../lib/sample'
import { exportMarkdownZip } from '../lib/export'
import type { Collection, CollectionId, Note, NoteId, ViewMode } from '../lib/types'

type LoadStatus = 'boot' | 'loading' | 'ready' | 'error'
type Toast = { id: string; message: string } | null

interface NotesState {
  loadStatus: LoadStatus
  notes: Note[]
  collections: Collection[]
  selectedId: NoteId | null
  editorOpen: boolean
  query: string
  activeCollectionId: CollectionId | null
  activeTag: string | null
  view: ViewMode
  toast: Toast
  successFlash: boolean
  searchShake: boolean
  boot: () => Promise<void>
  persist: () => Promise<void>
  setQuery: (q: string) => void
  clearQuery: () => void
  setView: (v: ViewMode) => void
  setCollectionFilter: (id: CollectionId | null) => void
  setTagFilter: (tag: string | null) => void
  openNote: (id: NoteId) => void
  closeEditor: () => void
  createNote: () => void
  updateNote: (id: NoteId, patch: Partial<Pick<Note, 'title' | 'body' | 'tags' | 'collectionId' | 'color'>>) => void
  deleteNote: (id: NoteId) => void
  addCollection: (name: string) => void
  exportZip: () => Promise<void>
  resetSample: () => Promise<void>
  clearAll: () => Promise<void>
  showToast: (message: string) => void
  dismissToast: () => void
}

const CARD_COLORS = ['#f4efe6', '#eef6f2', '#f7f1e8', '#eef2f7', '#f3ebe3', '#f5f0e7']

function stamp(): string {
  return new Date().toISOString()
}

export const useNotes = create<NotesState>((set, get) => ({
  loadStatus: 'boot',
  notes: [],
  collections: [],
  selectedId: null,
  editorOpen: false,
  query: '',
  activeCollectionId: null,
  activeTag: null,
  view: 'cards',
  toast: null,
  successFlash: false,
  searchShake: false,

  boot: async () => {
    set({ loadStatus: 'loading' })
    try {
      let snap = await loadSnapshot()
      if (!snap || snap.notes.length === 0) {
        snap = buildSample()
        await saveSnapshot(snap)
      }
      set({
        notes: snap.notes,
        collections: snap.collections,
        loadStatus: 'ready',
      })
    } catch {
      const snap = buildSample()
      set({ notes: snap.notes, collections: snap.collections, loadStatus: 'ready' })
    }
  },

  persist: async () => {
    const { notes, collections } = get()
    await saveSnapshot({
      version: 1,
      notes,
      collections,
      updatedAt: stamp(),
    })
  },

  setQuery: (q) => set({ query: q, searchShake: false }),
  clearQuery: () => set({ query: '' }),
  setView: (v) => set({ view: v }),
  setCollectionFilter: (id) => set({ activeCollectionId: id, activeTag: null }),
  setTagFilter: (tag) => set({ activeTag: tag, activeCollectionId: null }),

  openNote: (id) => set({ selectedId: id, editorOpen: true }),
  closeEditor: () => set({ editorOpen: false }),

  createNote: () => {
    const note: Note = {
      id: nanoid(),
      title: 'Untitled card',
      body: '',
      tags: [],
      collectionId: get().activeCollectionId,
      color: CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)],
      sample: false,
      createdAt: stamp(),
      updatedAt: stamp(),
    }
    set((s) => ({
      notes: [note, ...s.notes],
      selectedId: note.id,
      editorOpen: true,
    }))
    void get().persist()
    get().showToast('Card created')
  },

  updateNote: (id, patch) => {
    set((s) => ({
      notes: s.notes.map((n) =>
        n.id === id
          ? {
              ...n,
              ...patch,
              sample: false,
              updatedAt: stamp(),
            }
          : n,
      ),
    }))
    void get().persist()
  },

  deleteNote: (id) => {
    set((s) => ({
      notes: s.notes.filter((n) => n.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
      editorOpen: s.selectedId === id ? false : s.editorOpen,
    }))
    void get().persist()
    get().showToast('Card deleted')
  },

  addCollection: (name) => {
    const trimmed = name.trim()
    if (!trimmed) {
      set({ searchShake: true })
      return
    }
    const col: Collection = {
      id: nanoid(),
      name: trimmed,
      color: '#28f5c4',
    }
    set((s) => ({ collections: [...s.collections, col] }))
    void get().persist()
    get().showToast(`Collection “${trimmed}”`)
  },

  exportZip: async () => {
    const { notes, collections } = get()
    if (notes.length === 0) {
      set({ searchShake: true })
      get().showToast('Nothing to export')
      return
    }
    await exportMarkdownZip(notes, collections)
    set({ successFlash: true })
    get().showToast('Markdown zip downloaded')
    window.setTimeout(() => set({ successFlash: false }), 1600)
  },

  resetSample: async () => {
    const snap = buildSample()
    await saveSnapshot(snap)
    set({
      notes: snap.notes,
      collections: snap.collections,
      selectedId: null,
      editorOpen: false,
      query: '',
      activeCollectionId: null,
      activeTag: null,
    })
    get().showToast('Sample deck restored')
  },

  clearAll: async () => {
    await clearSnapshot()
    set({
      notes: [],
      collections: [],
      selectedId: null,
      editorOpen: false,
    })
    get().showToast('Cleared local notes')
  },

  showToast: (message) => {
    const id = nanoid(6)
    set({ toast: { id, message } })
    window.setTimeout(() => {
      const cur = get().toast
      if (cur?.id === id) set({ toast: null })
    }, 2800)
  },

  dismissToast: () => set({ toast: null }),
}))

export function filteredNotes(state: NotesState): Note[] {
  const q = state.query.trim().toLowerCase()
  return state.notes
    .filter((n) => {
      if (state.activeCollectionId && n.collectionId !== state.activeCollectionId) return false
      if (state.activeTag && !n.tags.map((t) => t.toLowerCase()).includes(state.activeTag.toLowerCase()))
        return false
      if (!q) return true
      const hay = `${n.title}\n${n.body}\n${n.tags.join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function allTags(notes: Note[]): string[] {
  const set = new Set<string>()
  for (const n of notes) for (const t of n.tags) set.add(t)
  return [...set].sort((a, b) => a.localeCompare(b))
}
