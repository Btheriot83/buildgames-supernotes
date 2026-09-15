import { describe, expect, it } from 'vitest'
import { localAutotag, localLinkSuggest, localSummarize } from '../src/lib/aiAssist'
import type { Note } from '../src/lib/types'

const base = (partial: Partial<Note> & Pick<Note, 'id' | 'title' | 'body'>): Note => ({
  tags: [],
  collectionId: null,
  color: '#fff',
  sample: false,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
  ...partial,
})

describe('local AI craft', () => {
  it('summarizes from real sentences', () => {
    const out = localSummarize(
      'Atomic notes',
      'Keep each card self-contained. If a thought grows, split it. Link back to Welcome.',
    )
    expect(out.mode).toBe('local')
    expect(out.summary.toLowerCase()).toMatch(/card|thought|link|atomic/)
  })

  it('autotags with desk vocabulary preference', () => {
    const out = localAutotag(
      'Zettelkasten habit',
      'Capture then link then revisit. Method matters for research notes.',
      ['method', 'sample'],
    )
    expect(out.tags.length).toBeGreaterThan(0)
    expect(out.tags).toContain('method')
  })

  it('suggests links by overlap', () => {
    const a = base({
      id: '1',
      title: 'Atomic notes',
      body: 'Self-contained cards. Split growing thoughts. Zettelkasten.',
      tags: ['method'],
    })
    const b = base({
      id: '2',
      title: 'Zettelkasten habit',
      body: 'One idea per card. Capture link revisit. Zettelkasten method.',
      tags: ['method'],
    })
    const c = base({ id: '3', title: 'Lunch', body: 'Tomato soup recipe.', tags: ['food'] })
    const out = localLinkSuggest(a, [a, b, c])
    expect(out.links[0]?.id).toBe('2')
  })
})
