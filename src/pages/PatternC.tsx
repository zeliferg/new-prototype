import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderC from '../components/c/HeaderC'
import InsightsTable from '../components/c/InsightsTable'
import { CloseCircle } from '../components/c/iconsC'
import SideNav from '../components/c/SideNav'
import { INSIGHTS } from '../data/insights'
import { PAGES_C } from '../data/navC'

export default function PatternC() {
  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(true)
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState('Accounts')

  // Selecting a destination should dismiss the mobile drawer.
  useEffect(() => setMobileOpen(false), [pathname])

  const title = PAGES_C[pathname] ?? 'Home'

  // Search filters the table live, across statement and category.
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
    <div className="min-h-screen bg-c-bg font-c text-c-ink">
      <SideNav
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* The sidebar is fixed, so the content pane is offset by its current width. */}
      <div
        className={`transition-[padding] duration-300 ease-out ${
          collapsed ? 'lg:pl-[76px]' : 'lg:pl-[294px]'
        }`}
      >
        <HeaderC
          title={title}
          query={query}
          onQueryChange={setQuery}
          scope={scope}
          onScopeChange={setScope}
          onOpenMobileNav={() => setMobileOpen(true)}
        />

        <main className="mx-auto max-w-[1100px] space-y-6 px-4 py-6 pb-28 sm:px-6">
          {bannerOpen && (
            <div className="flex items-center justify-between gap-4 rounded-lg bg-c-ink px-6 py-5 text-white">
              <p className="font-medium">Welcome back!</p>
              <button
                type="button"
                onClick={() => setBannerOpen(false)}
                aria-label="Dismiss welcome message"
                className="rounded-full text-white/80 transition-colors hover:text-white"
              >
                <CloseCircle />
              </button>
            </div>
          )}

          <InsightsTable rows={rows} />
        </main>
      </div>
    </div>
  )
}
