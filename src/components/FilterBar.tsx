import { useState } from 'react'
import { COMPONENTS, FILTER_VIEWS, SOURCES } from '../data/pages'
import type { Filters } from '../lib/metrics'
import { Sliders, UserCircle } from './icons'

function Select({
  id,
  label,
  value,
  options,
  onChange,
  leadingIcon,
}: {
  id: string
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
  leadingIcon?: boolean
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 sm:max-w-[164px] sm:flex-none">
      <label htmlFor={id} className="text-[0.9rem] text-txt">
        {label}
      </label>
      <div className="relative">
        {leadingIcon && (
          <UserCircle className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-txt-secondary" />
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-9 w-full appearance-none rounded border border-input-border bg-white py-1.5 pr-8 text-txt outline-none transition-shadow focus:border-primary sm:w-[164px] ${
            leadingIcon ? 'pl-8' : 'pl-2.5'
          }`}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-txt-secondary"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path d="M1 3.5L5 7.5l4-4" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}

export default function FilterBar({
  applied,
  onApply,
}: {
  applied: Filters
  onApply: (f: Filters) => void
}) {
  const [draft, setDraft] = useState<Filters>(applied)

  // Apply is disabled while the draft matches what's already applied — which is
  // exactly why the button reads as disabled in the Figma comp.
  const dirty =
    draft.source !== applied.source ||
    draft.component !== applied.component ||
    draft.view !== applied.view

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Select
        id="filter-source"
        label="Source"
        value={draft.source}
        options={SOURCES}
        onChange={(source) => setDraft((d) => ({ ...d, source }))}
      />
      <Select
        id="filter-component"
        label="Component"
        value={draft.component}
        options={COMPONENTS}
        onChange={(component) => setDraft((d) => ({ ...d, component }))}
      />
      <Select
        id="filter-view"
        label="Filter View"
        value={draft.view}
        options={FILTER_VIEWS}
        onChange={(view) => setDraft((d) => ({ ...d, view }))}
        leadingIcon
      />

      <button
        type="button"
        disabled={!dirty}
        onClick={() => onApply(draft)}
        className={`h-9 rounded px-4 font-semibold transition-colors ${
          dirty
            ? 'bg-primary text-white hover:bg-[#2f68a6]'
            : 'cursor-not-allowed bg-gray-100 text-txt-disabled'
        }`}
      >
        Apply
      </button>

      <button
        type="button"
        aria-label="Filter options"
        className="flex h-9 w-9 items-center justify-center rounded border border-input-border bg-white text-txt-secondary transition-colors hover:bg-gray-100"
      >
        <Sliders />
      </button>
    </div>
  )
}
