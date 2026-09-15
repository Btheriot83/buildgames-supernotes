/** Inkwell friend-walkthrough persistence — see docs/ONBOARDING.md */

export const ONBOARD_DONE_KEY = 'inkwell.onboarded.v1'
export const ONBOARD_STEP_KEY = 'inkwell.onboard.step.v1'

export type OnboardCardId = 'start' | 'desk' | 'link' | 'find' | 'done'

export type OnboardCard = {
  id: OnboardCardId
  title: string
  body: string
  cta: string
}

/** Hand-locked copy — wire exactly (hand-rewrite-copy). */
export const ONBOARD_CARDS: OnboardCard[] = [
  {
    id: 'start',
    title: 'Hey — this is a card press.',
    body: "I'll stay beside you for a minute. Skip anytime if you already know the drill.",
    cta: 'Show me the desk',
  },
  {
    id: 'desk',
    title: 'Sample cards are already cut.',
    body: 'Field notes, Threads, Desk kit — real stock on the press. Tap any card to open it.',
    cta: 'Open a sample',
  },
  {
    id: 'link',
    title: 'Pencil a [[link]].',
    body: "Type [[Another card]] in the body. Find links when you forget the title. That's the whole linking job.",
    cta: 'Got linking',
  },
  {
    id: 'find',
    title: 'Press / to find.',
    body: 'Search hits title, body, and tags. Better than a third pile with the same idea.',
    cta: 'Next',
  },
  {
    id: 'done',
    title: "You're set.",
    body: "Export Markdown when you leave. Notes stay in this browser until you do. I'll get out of the way.",
    cta: 'Done',
  },
]

export function readOnboarded(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(ONBOARD_DONE_KEY) === '1'
  } catch {
    return true
  }
}

export function readOnboardStep(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = window.localStorage.getItem(ONBOARD_STEP_KEY)
    if (raw == null) return 0
    const n = Number(raw)
    if (!Number.isFinite(n) || n < 0) return 0
    return Math.min(n, ONBOARD_CARDS.length - 1)
  } catch {
    return 0
  }
}

export function writeOnboardStep(step: number): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(ONBOARD_STEP_KEY, String(step))
  } catch {
    /* private mode */
  }
}

export function markOnboarded(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(ONBOARD_DONE_KEY, '1')
    window.localStorage.removeItem(ONBOARD_STEP_KEY)
  } catch {
    /* private mode */
  }
}

export function clearOnboardFlags(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(ONBOARD_DONE_KEY)
    window.localStorage.removeItem(ONBOARD_STEP_KEY)
  } catch {
    /* private mode */
  }
}
