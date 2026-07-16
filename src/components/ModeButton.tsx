import type { ViewMode } from '../lib/viewMode'

const LABEL: Record<ViewMode, string> = {
  single: 'Single view',
  overview: 'Overview — all four patterns',
  compare: 'Compare — two patterns',
}

/** The icon shows the mode you're in, not the one you'd get by clicking. */
function ModeIcon({ mode }: { mode: ViewMode }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 18 18',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
  }

  if (mode === 'overview') {
    return (
      <svg {...props}>
        <rect x="2.5" y="3.5" width="5.5" height="5" rx="1" />
        <rect x="10" y="3.5" width="5.5" height="5" rx="1" />
        <rect x="2.5" y="10" width="5.5" height="5" rx="1" />
        <rect x="10" y="10" width="5.5" height="5" rx="1" />
      </svg>
    )
  }

  if (mode === 'compare') {
    return (
      <svg {...props}>
        <rect x="2.5" y="3.5" width="13" height="11" rx="1.5" />
        <line x1="9" y1="3.5" x2="9" y2="14.5" />
      </svg>
    )
  }

  return (
    <svg {...props}>
      <rect x="2.5" y="3.5" width="13" height="11" rx="1.5" />
    </svg>
  )
}

export default function ModeButton({ mode, onClick }: { mode: ViewMode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={LABEL[mode]}
      aria-label={`${LABEL[mode]}. Click for the next view mode.`}
      className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#001022] shadow-lg backdrop-blur-md transition-colors hover:bg-white"
    >
      <ModeIcon mode={mode} />
    </button>
  )
}
