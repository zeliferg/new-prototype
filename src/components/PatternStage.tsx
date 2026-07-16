import { useEffect, useRef, useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { PATTERNS, type Pattern } from '../lib/patterns'

/** Every stage renders at this width, whatever the cell size, so cells always
 *  show the desktop layout — Tailwind's breakpoints read the real window, not us. */
const STAGE_WIDTH = 1440

/**
 * One pattern, rendered small enough to fit a cell.
 *
 * The `scale` transform does double duty: it shrinks the shell, and it makes this
 * element the containing block for the shell's `fixed` sidebars, which would
 * otherwise escape to the real viewport edge. The MemoryRouter gives the shell its
 * own history, so it highlights its own routes and clicking inside never touches
 * the browser URL.
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
    <div ref={box} className="relative min-h-0 flex-1 overflow-hidden bg-white">
      {scale > 0 && (
        <div
          className="pattern-stage absolute left-0 top-0 origin-top-left"
          style={{ width: STAGE_WIDTH, height, transform: `scale(${scale})` }}
        >
          <MemoryRouter initialEntries={[PATTERNS[pattern].home]}>
            {PATTERNS[pattern].element()}
          </MemoryRouter>
        </div>
      )}
    </div>
  )
}
