import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DisclosurePanel from '../components/DisclosurePanel'
import FilterBar from '../components/FilterBar'
import MetricCard from '../components/MetricCard'
import { Density, Diamond, Instances, Severity } from '../components/icons'
import { pageFor } from '../data/pages'
import { deriveMetrics, INITIAL_METRICS, type Filters } from '../lib/metrics'

const DEFAULT_FILTERS: Filters = {
  source: 'Source Name',
  component: 'Component',
  view: 'WCAG 2.2 AA',
}

function Trend({ label, value }: { label: string; value: number }) {
  const up = value >= 0
  return (
    <div className="p-4">
      <p className="font-semibold text-txt">{label}</p>
      <p
        className={`mt-2 flex items-center gap-1.5 text-2xl font-bold leading-tight ${
          up ? 'text-success' : 'text-danger'
        }`}
      >
        <span aria-hidden="true" className="text-sm">
          {up ? '▲' : '▼'}
        </span>
        {up ? '' : '-'}
        {Math.abs(value).toFixed(2)}%
      </p>
    </div>
  )
}

export default function PatternD() {
  const { pathname } = useLocation()
  const page = pageFor(pathname)

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [touched, setTouched] = useState(false)

  // Before the first Apply we show the exact values from the design; afterwards
  // the numbers are derived from the applied filters.
  const metrics = touched ? deriveMetrics(filters, pathname) : INITIAL_METRICS

  function handleApply(next: Filters) {
    setFilters(next)
    setTouched(true)
  }

  return (
    // The bottom padding leaves room for the fixed pattern switcher.
    <main className="mx-auto max-w-[1440px] px-4 pb-28 pt-6 sm:px-6">
      {/* Top container */}
      <section className="rounded border border-border-subtle bg-white p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-txt-secondary">
                <li>
                  <Link to="/" className="text-txt-link underline hover:no-underline">
                    Home
                  </Link>
                </li>
                {page.trail.map((crumb) => (
                  <li key={crumb} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{crumb}</span>
                  </li>
                ))}
              </ol>
            </nav>

            <h1 className="mt-3 text-2xl font-bold text-nav-dark">{page.title}</h1>
            <p className="mt-1 text-txt">{page.description}</p>
          </div>

          <FilterBar applied={filters} onApply={handleApply} />
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
          <MetricCard
            icon={<Diamond />}
            label="Risk"
            value={metrics.riskLabel}
            score={metrics.riskScore}
            gauge
          />
          <MetricCard icon={<Severity />} label="Severity" value={metrics.severity} />
          <MetricCard icon={<Instances />} label="Instances" value={String(metrics.instances)} />
          <MetricCard icon={<Density />} label="Density" value={metrics.density.toFixed(2)} />

          <div className="grid grid-cols-2 sm:col-span-2 xl:col-span-1">
            <Trend label="From previous period" value={metrics.fromPreviousPeriod} />
            <Trend label="Over lifetime" value={metrics.overLifetime} />
          </div>
        </div>
      </section>

      {/* Details */}
      <div className="mt-6">
        <DisclosurePanel title="Component Details" notes={page.notes}>
          <aside className="rounded border border-border-subtle p-6">
            <h3 className="mb-4 font-bold text-txt">Additional</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-[0.9rem] font-semibold text-txt">Source Code</dt>
                <dd className="mt-0.5">
                  <button type="button" className="text-txt-link underline hover:no-underline">
                    Add
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-[0.9rem] font-semibold text-txt">JAWS Inspect</dt>
                <dd className="mt-0.5">
                  <button type="button" className="text-txt-link underline hover:no-underline">
                    View
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-[0.9rem] font-semibold text-txt">Assigned To</dt>
                <dd className="mt-0.5 flex items-center gap-2">
                  <span className="italic text-txt-secondary">Unassigned</span>
                  <button type="button" className="text-txt-link underline hover:no-underline">
                    Add
                  </button>
                </dd>
              </div>
            </dl>
          </aside>
        </DisclosurePanel>
      </div>
    </main>
  )
}
