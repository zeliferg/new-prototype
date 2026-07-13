import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContainerCard, { type Item, type Status } from '../components/b/ContainerCard'
import SideNavB from '../components/b/SideNavB'
import TopBarB from '../components/b/TopBarB'
import { PAGES_B } from '../data/navB'

const STATUSES: Status[] = ['Success', 'Running', 'Failed']

const DETAIL =
  'Last run completed against the current catalog. No anomalies detected in the propagated state vector.'

function seed(container: number): Item[] {
  return [{ id: `c${container}-1`, label: 'Item 1', status: 'Success', detail: DETAIL }]
}

export default function PatternB() {
  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [c1, setC1] = useState<Item[]>(() => seed(1))
  const [c2, setC2] = useState<Item[]>(() => seed(2))

  useEffect(() => setMobileOpen(false), [pathname])

  const title = PAGES_B[pathname] ?? 'Dashboard'

  /** Refreshing cycles the item's status, so the button visibly does something. */
  function cycle(items: Item[]): Item[] {
    return items.map((i) => ({
      ...i,
      status: STATUSES[(STATUSES.indexOf(i.status) + 1) % STATUSES.length],
    }))
  }

  return (
    <div className="min-h-screen bg-b-bg font-b text-b-text">
      <SideNavB
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={`transition-[padding] duration-300 ease-out ${
          collapsed ? 'lg:pl-[80px]' : 'lg:pl-[296px]'
        }`}
      >
        <TopBarB onOpenMobileNav={() => setMobileOpen(true)} />

        <main className="px-4 pb-28 pt-6 sm:px-10">
          <h1 className="sr-only">{title}</h1>

          {/* Two containers side by side on desktop, stacked below md. */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ContainerCard title="Container 1" items={c1} onRefresh={() => setC1(cycle)} />
            <ContainerCard title="Container 2" items={c2} onRefresh={() => setC2(cycle)} />
          </div>
        </main>
      </div>
    </div>
  )
}
