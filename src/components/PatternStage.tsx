import { useEffect, useRef, useState } from 'react'
import { PATTERNS, type Pattern } from '../lib/patterns'

/** Every stage renders at this width, whatever the cell size. The iframe's own
 *  viewport is what Tailwind's breakpoints measure, so cells stay on the desktop
 *  layout instead of collapsing to the mobile one. */
const STAGE_WIDTH = 1440

/**
 * One pattern, rendered small enough to fit a cell.
 *
 * This is an iframe rather than a mounted component tree because each shell needs
 * its own router: React Router throws outright if a <Router> renders inside another,
 * and every shell calls useLocation. A document boundary also gives each cell its
 * own viewport, so `fixed` sidebars and `min-h-screen` resolve against the cell
 * instead of the real window.
 */
export default function PatternStage({ pattern }: { pattern: Pattern }) {
  const box = useRef<HTMLDivElement>(null)
  const [{ scale, height }, setBox] = useState({ scale: 0, height: 0 })

  useEffect(() => {
    const el = box.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      const next = entry.contentRect.width / STAGE_WIDTH
      // Height follows from the scale, so the shell fills the cell instead of
      // letterboxing — a narrow cell just gets a taller virtual window.
      setBox({ scale: next, height: next > 0 ? entry.contentRect.height / next : 0 })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={box} className="relative min-h-0 flex-1 overflow-hidden bg-page">
      {scale > 0 && (
        <iframe
          src={PATTERNS[pattern].home}
          title={`${PATTERNS[pattern].label} preview`}
          className="absolute left-0 top-0 origin-top-left border-0"
          style={{ width: STAGE_WIDTH, height, transform: `scale(${scale})` }}
        />
      )}
    </div>
  )
}
