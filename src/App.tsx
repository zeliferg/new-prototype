import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import PatternSwitcher, { patternFor } from './components/PatternSwitcher'
import PatternA from './pages/PatternA'
import PatternC from './pages/PatternC'
import PatternD from './pages/PatternD'

/** Pattern D's shell: dark top navbar over the Pattern D page template. */
function ShellD() {
  return (
    <>
      <Navbar />
      <PatternD />
    </>
  )
}

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <Routes>
        {/* Each pattern owns a URL namespace; Pattern D owns everything else. */}
        <Route path="/a/*" element={<PatternA />} />
        <Route path="/a" element={<PatternA />} />
        <Route path="/c/*" element={<PatternC />} />
        <Route path="/c" element={<PatternC />} />
        <Route path="*" element={<ShellD />} />
      </Routes>

      <PatternSwitcher active={patternFor(pathname)} />
    </>
  )
}
