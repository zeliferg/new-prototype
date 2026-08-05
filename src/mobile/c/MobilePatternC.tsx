import { useMemo, useState } from 'react'
import { CloseCircle } from '../../components/c/iconsC'
import InsightsTable from '../../components/c/InsightsTable'
import { INSIGHTS } from '../../data/insights'
import { PAGES_C } from '../../data/navC'
import MobileNavC from './MobileNavC'
import MobileTopBarC from './MobileTopBarC'

/**
 * Pattern C at phone size.
 *
 * The bar keeps brand and search on one line; the page title moves down here as a
 * heading, where it also serves as visible confirmation that a nav choice landed.
 *
 * Selection lives in state rather than the URL, because the desktop shell owns the
 * `/c/*` namespace and this screen is mounted at `/mobile/c`.
 */
export default function MobilePatternC() {
  const [navOpen, setNavOpen] = useState(false)
  const [active, setActive] = useState('/c')
  const [query, setQuery] = useState('')
  const [bannerOpen, setBannerOpen] = useState(true)

  const title = PAGES_C[active] ?? 'Home'

  // Same filter the desktop shell runs, across statement and category.
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INSIGHTS
    return INSIGHTS.filter(
      (i) =>
        i.statement.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.date.includes(q),
    )
  }, [query])

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-c-bg font-c text-c-ink">
      <MobileTopBarC
        query={query}
        onQueryChange={setQuery}
        navOpen={navOpen}
        onToggleNav={() => setNavOpen((v) => !v)}
      />

      <main className="flex-1 space-y-4 overflow-y-auto px-4 pb-28 pt-4">
        <h1 className="text-lg font-medium text-c-ink">{title}</h1>

        {bannerOpen && (
          <div className="flex items-center justify-between gap-4 rounded-lg bg-c-ink px-4 py-4 text-white">
            <p className="font-medium">Welcome back!</p>
            <button
              type="button"
              onClick={() => setBannerOpen(false)}
              aria-label="Dismiss welcome message"
              className="rounded-full text-white/80 transition-colors active:text-white"
            >
              <CloseCircle />
            </button>
          </div>
        )}

        <InsightsTable rows={rows} />
      </main>

      <MobileNavC
        open={navOpen}
        active={active}
        onSelect={(to) => {
          setActive(to)
          setNavOpen(false)
        }}
        onClose={() => setNavOpen(false)}
      />
    </div>
  )
}
