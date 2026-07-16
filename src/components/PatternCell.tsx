import { PATTERNS, type Pattern } from '../lib/patterns'
import PatternStage from './PatternStage'

/**
 * A captioned pattern preview. Pass `onEnter` to make the caption the way into
 * that pattern — the stage below it can't take that job, because it's a live app
 * and a click there is a click *in* it.
 */
export default function PatternCell({
  pattern,
  onEnter,
}: {
  pattern: Pattern
  onEnter?: () => void
}) {
  const def = PATTERNS[pattern]

  const caption = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold text-[#001022] group-hover:text-white">
          {def.label} — {def.hint}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-black/55 group-hover:text-white/70">
          {def.caption}
        </span>
      </span>
      {onEnter && (
        <span aria-hidden className="flex-none text-black/30 group-hover:text-white">
          ↗
        </span>
      )}
    </>
  )

  return (
    <div className="flex min-h-0 flex-col bg-white">
      {onEnter ? (
        <button
          type="button"
          onClick={onEnter}
          aria-label={`Open ${def.label} full screen`}
          className="group flex flex-none items-center gap-3 border-b border-black/10 bg-[#fbfbfc] px-3 py-2 text-left transition-colors hover:bg-[#001022]"
        >
          {caption}
        </button>
      ) : (
        <div className="flex flex-none items-center gap-3 border-b border-black/10 bg-[#fbfbfc] px-3 py-2">
          {caption}
        </div>
      )}
      <PatternStage pattern={pattern} />
    </div>
  )
}
