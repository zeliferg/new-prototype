import type { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import PatternA from '../pages/PatternA'
import PatternB from '../pages/PatternB'
import PatternC from '../pages/PatternC'
import PatternD from '../pages/PatternD'

export type Pattern = 'A' | 'B' | 'C' | 'D'

export const PATTERN_IDS: Pattern[] = ['A', 'B', 'C', 'D']

export type PatternDef = {
  label: string
  /** One word for the shell's character, shown beside the label. */
  hint: string
  home: string
  /** Describes the IA choice, so two read side by side say something. */
  caption: string
  element: () => ReactNode
}

/** The one definition of a pattern: how to name it, where it lives, how to render it. */
export const PATTERNS: Record<Pattern, PatternDef> = {
  A: {
    label: 'Pattern A',
    hint: 'Admin',
    home: '/a/property/basic',
    caption: 'Left sidebar with a context switcher, for managing multiple accounts.',
    element: () => <PatternA />,
  },
  B: {
    label: 'Pattern B',
    hint: 'Console',
    home: '/b',
    caption: 'Left sidebar with grouped categories, for dense technical monitoring.',
    element: () => <PatternB />,
  },
  C: {
    label: 'Pattern C',
    hint: 'Insights',
    home: '/c',
    caption: 'Left sidebar with a light footprint, for a dashboard-first experience.',
    element: () => <PatternC />,
  },
  D: {
    label: 'Pattern D',
    hint: 'Top nav',
    home: '/dashboard',
    caption: 'Top-only nav with tabs, for flatter, filter-heavy IA.',
    element: () => (
      <>
        <Navbar />
        <PatternD />
      </>
    ),
  },
}

/** The pattern is encoded in the URL, so it's shareable and survives reload. */
export function patternFor(pathname: string): Pattern {
  if (pathname === '/a' || pathname.startsWith('/a/')) return 'A'
  if (pathname === '/b' || pathname.startsWith('/b/')) return 'B'
  if (pathname === '/c' || pathname.startsWith('/c/')) return 'C'
  return 'D'
}
