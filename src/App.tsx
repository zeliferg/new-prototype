import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import CompareView from './components/CompareView'
import OverviewGrid from './components/OverviewGrid'
import PatternSwitcher from './components/PatternSwitcher'
import { PATTERNS, patternFor } from './lib/patterns'
import { useIsDesktop } from './lib/useIsDesktop'
import { modeFrom, pairFrom } from './lib/viewMode'

export default function App() {
  const { pathname } = useLocation()
  const [search] = useSearchParams()
  const isDesktop = useIsDesktop()

  const active = patternFor(pathname)
  // Overview and compare need room they don't have on a phone, so below `lg` a
  // stray mode param is simply ignored rather than rendering something unusable.
  const mode = isDesktop ? modeFrom(search) : 'single'

  return (
    <>
      {mode === 'single' && (
        <Routes>
          {/* Each pattern owns a URL namespace; Pattern D owns everything else. */}
          <Route path="/a/*" element={PATTERNS.A.element()} />
          <Route path="/a" element={PATTERNS.A.element()} />
          <Route path="/b/*" element={PATTERNS.B.element()} />
          <Route path="/b" element={PATTERNS.B.element()} />
          <Route path="/c/*" element={PATTERNS.C.element()} />
          <Route path="/c" element={PATTERNS.C.element()} />
          <Route path="*" element={PATTERNS.D.element()} />
        </Routes>
      )}
      {mode === 'overview' && <OverviewGrid />}
      {mode === 'compare' && <CompareView pair={pairFrom(search, active)} />}

      <PatternSwitcher active={active} mode={mode} showModeButton={isDesktop} />
    </>
  )
}
