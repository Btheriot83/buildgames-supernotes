import { describe, expect, it } from 'vitest'
import { backlinks, extractWikiTitles, noteByTitle } from '../src/lib/links'
import type { Note } from '../src/lib/types'

const note = (title: string, body: string, id = title): Note => ({
  id,
  title,
  body,
  tags: [],
  collectionId: null,
  color: '#fff',
  sample: false,
  createdAt: '',
  updatedAt: '',
})

describe('wiki links', () => {
  it('extracts titles', () => {
    expect(extractWikiTitles('See [[Alpha]] and [[Beta|b]]')).toEqual(['Alpha', 'Beta'])
  })

  it('resolves backlinks', () => {
    const a = note('Alpha', 'root')
    const b = note('Beta', 'points to [[Alpha]]')
    expect(noteByTitle([a, b], 'alpha')?.id).toBe('Alpha')
    expect(backlinks(a, [a, b]).map((n) => n.id)).toEqual(['Beta'])
  })
})
