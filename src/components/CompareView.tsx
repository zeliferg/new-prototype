import type { Pattern } from '../lib/patterns'
import PatternCell from './PatternCell'

/** Two patterns, full width, half each. The switcher's slots pick the pair. */
export default function CompareView({ pair }: { pair: [Pattern, Pattern] }) {
  return (
    <div className="grid h-screen grid-cols-2 gap-px overflow-hidden bg-black/15">
      {pair.map((pattern, slot) => (
        <PatternCell key={`${slot}-${pattern}`} pattern={pattern} />
      ))}
    </div>
  )
}
