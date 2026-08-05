import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import CompareView from './components/CompareView'
import OverviewGrid from './components/OverviewGrid'
import PatternSwitcher from './components/PatternSwitcher'
import { isEmbedded } from './lib/isEmbedded'
import { PATTERNS, patternFor } from './lib/patterns'
import { useIsDesktop } from './lib/useIsDesktop'
import { modeFrom, pairFrom } from './lib/viewMode'
import MobilePage from './mobile/MobilePage'

export default function App() {
  const { pathname } = useLocation()
  const [search] = useSearchParams()
  const isDesktop = useIsDesktop()
  const embedded = isEmbedded()

  // /mobile is a self-contained shell with its own overview and switcher, so it
  // returns before the desktop modes and PatternSwitcher below. Claiming the URL
  // here rather than as a <Route> is what keeps that switcher off the phone screen.
  if (pathname === '/mobile' || pathname.startsWith('/mobile/')) return <MobilePage />

  const active = patternFor(pathname)
  // Overview and compare need room they don't have on a phone, so below `lg` a
  // stray mode param is ignored rather than rendering something unusable. Inside a
  // stage's iframe there's only ever the bare shell — the modes live in the parent.
  const mode = isDesktop && !embedded ? modeFrom(search) : 'single'

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

      {!embedded && <PatternSwitcher active={active} mode={mode} showModeButton={isDesktop} />}
    </>
  )
}
