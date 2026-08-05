import { Link } from 'react-router-dom'
import { PATTERNS, PATTERN_IDS } from '../lib/patterns'
import { mobilePathFor } from './patternParam'

/**
 * All four patterns as a column of text rows.
 *
 * Deliberately the same caption bar PatternCell puts above each desktop preview —
 * same surface, type scale, and hover inversion — minus the live stage below it,
 * which is what a phone has no room for. Only the padding grows, to keep each row
 * a comfortable tap target. Every word comes from PATTERNS, so a new pattern shows
 * up here without touching this file.
 */
export default function MobileOverview() {
  return (
    <div className="min-h-dvh bg-page">
      <div className="mx-auto w-full max-w-[430px]">
        <header className="px-4 pb-4 pt-8">
          <h1 className="text-[20px] font-semibold leading-tight text-[#001022]">
            Navigation patterns
          </h1>
          <p className="mt-1 text-[12px] leading-snug text-black/55">
            Four shells for the same app. Open one to try it at phone size.
          </p>
        </header>

        <ul className="border-y border-black/10 bg-white">
          {PATTERN_IDS.map((pattern) => {
            const def = PATTERNS[pattern]
            return (
              <li key={pattern}>
                <Link
                  to={mobilePathFor(pattern)}
                  aria-label={`Open ${def.label} full screen`}
                  className="group flex min-h-[68px] items-center gap-3 border-b border-black/10 bg-[#fbfbfc] px-4 py-3.5 text-left transition-colors last:border-b-0 hover:bg-[#001022] active:bg-[#001022]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold text-[#001022] group-hover:text-white group-active:text-white">
                      {def.label} — {def.hint}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-black/55 group-hover:text-white/70 group-active:text-white/70">
                      {def.caption}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="flex-none text-black/30 group-hover:text-white group-active:text-white"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
