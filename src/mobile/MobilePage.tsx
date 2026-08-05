import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import MobileOverview from './MobileOverview'
import MobilePatternView from './MobilePatternView'
import { patternFromParam } from './patternParam'

/** Resolves `/mobile/:id`, sending anything unrecognised back to the list. */
function PatternRoute() {
  const pattern = patternFromParam(useParams().id)
  if (!pattern) return <Navigate to="/mobile" replace />
  return <MobilePatternView pattern={pattern} />
}

/**
 * The phone-sized entry point: an overview of all four patterns, and a full view of
 * any one of them. Nested <Routes> rather than a second <Router> — this mounts
 * inside the BrowserRouter that main.tsx already provides.
 *
 * Paths are absolute because App reaches this component by an early return rather
 * than a matched <Route>, so there's no parent segment for relative paths to build
 * on — `index` here would resolve against `/`, not `/mobile`.
 */
export default function MobilePage() {
  return (
    <Routes>
      <Route path="/mobile" element={<MobileOverview />} />
      <Route path="/mobile/:id" element={<PatternRoute />} />
      <Route path="*" element={<Navigate to="/mobile" replace />} />
    </Routes>
  )
}
