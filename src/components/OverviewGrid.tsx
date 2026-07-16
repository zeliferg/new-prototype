import { useNavigate } from 'react-router-dom'
import { PATTERNS, PATTERN_IDS } from '../lib/patterns'
import PatternCell from './PatternCell'

/** All four patterns at once, live. Navigating to a pattern's home drops the mode param. */
export default function OverviewGrid() {
  const navigate = useNavigate()

  return (
    <div className="grid h-screen grid-cols-2 grid-rows-2 gap-px overflow-hidden bg-black/15">
      {PATTERN_IDS.map((pattern) => (
        <PatternCell
          key={pattern}
          pattern={pattern}
          onEnter={() => navigate(PATTERNS[pattern].home)}
        />
      ))}
    </div>
  )
}
