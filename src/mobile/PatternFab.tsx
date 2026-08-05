import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATTERNS, PATTERN_IDS, type Pattern } from '../lib/patterns'
import { mobilePathFor } from './patternParam'

/**
 * The floating switcher. Collapsed it shows the current pattern's letter; expanded
 * it lists all four, so changing pattern never costs a trip back to the overview.
 * Same dark pill / blurred-white treatment as the desktop PatternSwitcher.
 */
export default function PatternFab({ active }: { active: Pattern }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  // Escape dismisses, matching the desktop nav menus.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function go(to: string) {
    setOpen(false)
    navigate(to)
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close pattern switcher"
          onClick={() => setOpen(false)}
          className="absolute inset-0 z-40 bg-black/30"
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex flex-col items-end gap-3 p-4">
        {open && (
          <div
            role="group"
            aria-label="Switch design pattern"
            className="pointer-events-auto w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg"
          >
            {/* MobileOverview's rows minus the caption: by the time this sheet is
                open you've already read the descriptions, and names alone keep the
                sheet short enough to leave the pattern behind it visible. The
                pattern you're in wears the overview's hover inversion, which reads
                as "you are here" and leaves it the only row without an affordance. */}
            {PATTERN_IDS.map((pattern) => {
              const def = PATTERNS[pattern]
              const on = pattern === active
              return (
                <button
                  key={pattern}
                  type="button"
                  aria-pressed={on}
                  onClick={() => go(mobilePathFor(pattern))}
                  className={`group flex min-h-[56px] w-full items-center gap-3 border-b border-black/10 px-4 py-3 text-left transition-colors ${
                    on ? 'bg-[#001022]' : 'bg-[#fbfbfc] hover:bg-[#001022] active:bg-[#001022]'
                  }`}
                >
                  <span
                    className={`min-w-0 flex-1 text-[13px] font-semibold ${
                      on
                        ? 'text-white'
                        : 'text-[#001022] group-hover:text-white group-active:text-white'
                    }`}
                  >
                    {def.label} — {def.hint}
                  </span>
                  {!on && (
                    <span
                      aria-hidden
                      className="flex-none text-black/30 group-hover:text-white group-active:text-white"
                    >
                      ↗
                    </span>
                  )}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => go('/mobile')}
              className="group flex min-h-[52px] w-full items-center gap-3 bg-[#fbfbfc] px-4 py-3 text-left transition-colors hover:bg-[#001022] active:bg-[#001022]"
            >
              <span
                aria-hidden
                className="flex-none text-black/30 group-hover:text-white group-active:text-white"
              >
                ‹
              </span>
              <span className="text-[13px] font-semibold text-black/55 group-hover:text-white group-active:text-white">
                All patterns
              </span>
            </button>
          </div>
        )}

        <button
          type="button"
          aria-expanded={open}
          aria-label={`${PATTERNS[active].label} — ${PATTERNS[active].hint}. Switch pattern.`}
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#001022] text-lg font-semibold text-white shadow-lg transition-opacity active:opacity-85"
        >
          {open ? '×' : active}
        </button>
      </div>
    </>
  )
}
