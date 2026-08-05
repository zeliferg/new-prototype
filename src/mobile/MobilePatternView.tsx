import { PATTERNS, type Pattern } from '../lib/patterns'
import MobilePatternA from './a/MobilePatternA'
import MobilePatternB from './b/MobilePatternB'
import MobilePatternC from './c/MobilePatternC'
import PatternFab from './PatternFab'

/** Shells with a purpose-built mobile design, mounted instead of framed. */
const NATIVE: Partial<Record<Pattern, () => React.ReactNode>> = {
  A: () => <MobilePatternA />,
  B: () => <MobilePatternB />,
  C: () => <MobilePatternC />,
}

/**
 * Where a framed pattern lands on a phone, when that differs from its desktop home.
 * Pattern D opens on Home rather than the dashboard, which also settles the menu:
 * Navbar marks the item whose `to` matches the path, and pageFor('/') is the Home
 * page, so one URL decides both. Kept here rather than in PATTERNS.D.home so the
 * desktop switcher, overview grid, and compare view keep landing where they did.
 */
const MOBILE_HOME: Partial<Record<Pattern, string>> = {
  D: '/',
}

/**
 * One pattern filling the phone screen.
 *
 * A, B, and C are mounted directly: their mobile screens are mobile-only markup,
 * with no breakpoints to resolve and nothing to gain from a viewport of their own.
 *
 * Pattern D is still framed, as PatternStage frames on desktop, but at 1:1 instead
 * of scaled down. The iframe's own viewport is what Tailwind's breakpoints measure,
 * so its shell resolves the mobile layout already built into Navbar. Mounting it
 * directly would have it measure the real window and render the desktop layout
 * instead. isEmbedded() keeps the desktop switcher out of the frame.
 *
 * Above phone widths the column is capped, so the mobile layout stays visible when
 * this URL is opened on a laptop.
 */
export default function MobilePatternView({ pattern }: { pattern: Pattern }) {
  const def = PATTERNS[pattern]
  const native = NATIVE[pattern]

  return (
    <div className="fixed inset-0 flex justify-center bg-page">
      <div className="relative h-full w-full max-w-[430px] overflow-hidden bg-white shadow-lg">
        {native ? (
          native()
        ) : (
          /* Keyed so switching patterns loads a fresh document at that pattern's
             home, rather than reusing the previous shell's history. */
          <iframe
            key={pattern}
            src={MOBILE_HOME[pattern] ?? def.home}
            title={`${def.label} — ${def.hint}`}
            className="h-full w-full border-0"
          />
        )}
        <PatternFab active={pattern} />
      </div>
    </div>
  )
}
