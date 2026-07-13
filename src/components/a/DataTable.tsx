import { useEffect, useMemo, useState } from 'react'
import type { Row, SortKey } from '../../data/properties'
import { Chev, InfoI, SortArrows } from './iconsA'

const COLUMNS: { key: SortKey; label: string; info?: boolean }[] = [
  { key: 'name', label: 'Name' },
  { key: 'userType', label: 'User Type' },
  { key: 'price', label: 'Price' },
  { key: 'available', label: 'Available' },
  { key: 'permits', label: 'Active Permits', info: true },
]

const PAGE_SIZES = [5, 10, 20]

function Permits({ n }: { n: number }) {
  return (
    <span className="inline-flex rounded-full bg-a-success px-3 py-1 text-[12px] font-bold text-a-gray-650">
      {n} Permits
    </span>
  )
}

function Availability({ n }: { n: number }) {
  if (n === 0) return <span className="font-bold text-a-error">Sold Out</span>
  return <span>{n}</span>
}

export default function DataTable({ rows }: { rows: Row[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' } | null>(null)
  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const copy = [...rows]
    copy.sort((a, b) => {
      const x = a[sort.key]
      const y = b[sort.key]
      const cmp = typeof x === 'number' && typeof y === 'number'
        ? x - y
        : String(x).localeCompare(String(y), undefined, { numeric: true })
      return sort.dir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [rows, sort])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))

  // A shrinking result set (new filter, bigger page size) can strand you on a
  // page that no longer exists — clamp back into range.
  useEffect(() => {
    if (page > pageCount) setPage(pageCount)
  }, [page, pageCount])

  const visible = sorted.slice((page - 1) * pageSize, page * pageSize)

  function toggleSort(key: SortKey) {
    setSort((s) =>
      s?.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' },
    )
    setPage(1)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-a-gray-100">
      {/* Group band */}
      <div className="bg-a-blue-faint px-4 py-4 font-bold text-a-gray-600">Group1</div>

      {rows.length === 0 ? (
        <p className="px-4 py-12 text-center text-a-gray-400">No records match your search.</p>
      ) : (
        <>
          {/* Wide: real table. Scrolls horizontally rather than squashing columns. */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-y border-a-gray-100">
                  {COLUMNS.map((c) => {
                    const dir = sort?.key === c.key ? sort.dir : undefined
                    return (
                      <th key={c.key} scope="col" className="p-0">
                        <button
                          type="button"
                          onClick={() => toggleSort(c.key)}
                          aria-label={`Sort by ${c.label}`}
                          className="flex w-full items-center gap-2 px-4 py-4 text-left font-bold text-a-gray-600 transition-colors hover:bg-a-gray-50"
                        >
                          <span>{c.label}</span>
                          {c.info && (
                            <span className="text-a-blue" title="Permits active this month">
                              <InfoI />
                            </span>
                          )}
                          <span className="ml-auto text-a-gray-450">
                            <SortArrows dir={dir} />
                          </span>
                        </button>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-a-gray-100 transition-colors last:border-0 hover:bg-a-blue-faint"
                  >
                    <td className="px-4 py-4 text-a-gray-600">{r.name}</td>
                    <td className="px-4 py-4 text-a-gray-600">{r.userType}</td>
                    <td className="px-4 py-4 text-a-gray-600">${r.price.toFixed(2)}</td>
                    <td className="px-4 py-4 text-a-gray-600">
                      <Availability n={r.available} />
                    </td>
                    <td className="px-4 py-4">
                      <Permits n={r.permits} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Narrow: stacked cards. */}
          <ul className="sm:hidden">
            {visible.map((r) => (
              <li key={r.id} className="border-b border-a-gray-100 px-4 py-4 last:border-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-a-ink">{r.name}</span>
                  <Permits n={r.permits} />
                </div>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-a-gray-500">
                  <dt className="font-bold">User Type</dt>
                  <dd>{r.userType}</dd>
                  <dt className="font-bold">Price</dt>
                  <dd>${r.price.toFixed(2)}</dd>
                  <dt className="font-bold">Available</dt>
                  <dd>
                    <Availability n={r.available} />
                  </dd>
                </dl>
              </li>
            ))}
          </ul>

          {/* Footer: page size + pagination */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-a-gray-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-a-gray-500">Show records</span>
              <div className="flex gap-2">
                {PAGE_SIZES.map((n) => {
                  const on = n === pageSize
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setPageSize(n)
                        setPage(1)
                      }}
                      className={`min-w-[33px] rounded border px-2 py-1.5 transition-colors ${
                        on
                          ? 'border-a-blue bg-white font-bold text-a-blue'
                          : 'border-a-gray-100 bg-white text-a-gray-500 hover:border-a-gray-250'
                      }`}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="rounded p-2 text-a-gray-500 transition-colors enabled:hover:bg-a-gray-50 disabled:opacity-30"
              >
                <Chev dir="left" />
              </button>

              <label className="flex items-center gap-2 text-a-gray-500">
                Page
                <input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={page}
                  onChange={(e) => {
                    const n = Number(e.target.value)
                    if (n >= 1 && n <= pageCount) setPage(n)
                  }}
                  aria-label="Page number"
                  className="w-12 rounded border border-a-gray-100 px-2 py-1.5 text-center text-a-gray-600 outline-none focus:border-a-blue"
                />
              </label>

              <span className="text-a-gray-500">out of {pageCount}</span>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                aria-label="Next page"
                className="rounded p-2 text-a-gray-500 transition-colors enabled:hover:bg-a-gray-50 disabled:opacity-30"
              >
                <Chev dir="right" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
