export type NoteId = string
export type CollectionId = string

export interface Note {
  id: NoteId
  title: string
  body: string
  tags: string[]
  collectionId: CollectionId | null
  color: string
  sample: boolean
  createdAt: string
  updatedAt: string
}

export interface Collection {
  id: CollectionId
  name: string
  color: string
}

export interface Snapshot {
  version: 1
  notes: Note[]
  collections: Collection[]
  updatedAt: string
  /** Demo deck identity — bump via DEMO_SEED_KEY to refresh SAMPLE-only desks */
  seedKey?: string
}

export type ViewMode = 'cards' | 'list'
export type FilterKind = 'all' | 'untagged' | 'collection' | 'tag'
