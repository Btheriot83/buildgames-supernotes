import { afterEach, describe, expect, it } from 'vitest'
import {
  ONBOARD_CARDS,
  ONBOARD_DONE_KEY,
  ONBOARD_STEP_KEY,
  clearOnboardFlags,
  markOnboarded,
  readOnboardStep,
  readOnboarded,
  writeOnboardStep,
} from '../src/lib/onboarding'

describe('inkwell onboarding', () => {
  afterEach(() => {
    clearOnboardFlags()
  })

  it('ships ≤5 friend cards with locked copy', () => {
    expect(ONBOARD_CARDS.length).toBeLessThanOrEqual(5)
    expect(ONBOARD_CARDS[0]?.title).toContain('card press')
    expect(ONBOARD_CARDS.some((c) => c.id === 'link')).toBe(true)
  })

  it('persists step and completion without restart', () => {
    expect(readOnboarded()).toBe(false)
    writeOnboardStep(2)
    expect(readOnboardStep()).toBe(2)
    expect(localStorage.getItem(ONBOARD_STEP_KEY)).toBe('2')
    markOnboarded()
    expect(readOnboarded()).toBe(true)
    expect(localStorage.getItem(ONBOARD_DONE_KEY)).toBe('1')
    expect(localStorage.getItem(ONBOARD_STEP_KEY)).toBeNull()
  })
})
