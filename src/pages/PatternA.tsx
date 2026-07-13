import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DataTable from '../components/a/DataTable'
import SideNavA from '../components/a/SideNavA'
import TopBarA from '../components/a/TopBarA'
import { PAGES_A } from '../data/navA'
import { ROWS } from '../data/properties'

export default function PatternA() {
  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => setMobileOpen(false), [pathname])

  const page = PAGES_A[pathname] ?? { parent: 'Home', title: 'Dashboard' }

  // The top-bar search filters the table, matching its placeholder's promise
  // ("Search by Name, Plate, Year, Make, Model, or Color").
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ROWS
    return ROWS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.userType.toLowerCase().includes(q) ||
        String(r.price).includes(q),
    )
  }, [query])

  return (
    <div className="min-h-screen bg-a-gray-50 font-a text-a-gray-600">
      <SideNavA
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={`transition-[padding] duration-300 ease-out ${
          collapsed ? 'lg:pl-[84px]' : 'lg:pl-[296px]'
        }`}
      >
        <TopBarA
          query={query}
          onQueryChange={setQuery}
          onOpenMobileNav={() => setMobileOpen(true)}
        />

        <main className="px-4 pb-28 pt-6 sm:px-10">
          <nav aria-label="Breadcrumb" className="text-[12px]">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/a" className="text-a-gray-450 hover:text-a-blue">
                  {page.parent}
                </Link>
              </li>
              <li aria-hidden="true" className="text-a-gray-450">
                /
              </li>
              <li aria-current="page" className="font-bold text-a-blue">
                {page.title}
              </li>
            </ol>
          </nav>

          <h1 className="mt-3 text-[28px] font-bold text-a-ink">{page.title}</h1>

          {/* Card */}
          <section className="mt-6 rounded-lg bg-white p-6 shadow-[var(--shadow-a-1)] sm:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-[17px] font-bold text-a-ink">Header1</h2>
              <button
                type="button"
                className="rounded-lg border border-a-blue px-4 py-2.5 font-bold text-a-blue transition-colors hover:bg-a-blue-bg"
              >
                Lorem Ipsum
              </button>
            </div>

            <DataTable rows={rows} />
          </section>
        </main>
      </div>
    </div>
  )
}
