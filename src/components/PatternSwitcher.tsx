import { useNavigate, useSearchParams } from 'react-router-dom'
import { PATTERNS, PATTERN_IDS, type Pattern } from '../lib/patterns'
import { nextMode, pairFrom, rotateSlot, type ViewMode } from '../lib/viewMode'
import ModeButton from './ModeButton'

export default function PatternSwitcher({
  active,
  mode,
  showModeButton,
}: {
  active: Pattern
  mode: ViewMode
  showModeButton: boolean
}) {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const pair = pairFrom(search, active)

  function goToMode(next: ViewMode) {
    const params = new URLSearchParams(search)
    if (next === 'single') {
      params.delete('mode')
      params.delete('vs')
    } else {
      params.set('mode', next)
      if (next === 'compare') params.set('vs', pair.join(','))
      else params.delete('vs')
    }
    setSearch(params)
  }

  function rotate(slot: 0 | 1) {
    const params = new URLSearchParams(search)
    params.set('vs', rotateSlot(pair, slot).join(','))
    setSearch(params)
  }

  const slotClass =
    'h-9 rounded-full bg-[#001022] px-3 text-sm font-semibold text-white transition-opacity hover:opacity-85'

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex items-center justify-center gap-2 p-4">
      {showModeButton && (
        <div className="pointer-events-auto">
          <ModeButton mode={mode} onClick={() => goToMode(nextMode(mode))} />
        </div>
      )}

      {/* Overview drops the pill entirely, which lets the circle recentre. Everywhere
          else the pill is a fixed width, so its contents can change without shifting
          the circle out from under the user's cursor. */}
      {mode !== 'overview' && (
        <div
          role="group"
          aria-label="Switch design pattern"
          className="pointer-events-auto flex w-[184px] flex-none items-center justify-center gap-0.5 rounded-full border border-black/10 bg-white/85 p-1 shadow-lg backdrop-blur-md"
        >
          {mode === 'compare' ? (
            <>
              <button
                type="button"
                onClick={() => rotate(0)}
                aria-label={`Left pane: ${PATTERNS[pair[0]].label}. Click to change.`}
                className={slotClass}
              >
                {pair[0]}
              </button>
              <span aria-hidden className="px-1.5 text-[10px] font-semibold tracking-wider text-black/40">
                VS
              </span>
              <button
                type="button"
                onClick={() => rotate(1)}
                aria-label={`Right pane: ${PATTERNS[pair[1]].label}. Click to change.`}
                className={slotClass}
              >
                {pair[1]}
              </button>
            </>
          ) : (
            PATTERN_IDS.map((pattern) => {
              const on = pattern === active
              return (
                <button
                  key={pattern}
                  type="button"
                  aria-pressed={on}
                  title={`${PATTERNS[pattern].label} — ${PATTERNS[pattern].hint}`}
                  onClick={() => navigate(PATTERNS[pattern].home)}
                  className={`h-9 w-9 flex-none rounded-full text-sm font-semibold transition-colors ${
                    on ? 'bg-[#001022] text-white' : 'text-black/65 hover:bg-black/5 hover:text-black'
                  }`}
                >
                  {pattern}
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
