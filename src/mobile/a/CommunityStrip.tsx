import { Chev, Pin } from '../../components/a/iconsA'
import { communityLabel } from './communities'

/**
 * The current community, shown as page chrome rather than a menu item.
 *
 * On desktop the switcher lives in a sidebar that's always on screen, so the
 * active community is always readable. A drawer is transient, so putting it there
 * would hide the answer to "which community is this data?" behind a menu. This
 * strip restores that property at the cost of ~40px.
 */
export default function CommunityStrip({
  selected,
  onOpen,
}: {
  selected: number[]
  onOpen: () => void
}) {
  const label = communityLabel(selected)

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Community: ${label.title}. Change community.`}
      className="flex w-full shrink-0 items-center gap-3 border-b border-a-gray-100 bg-white px-4 py-2 text-left transition-colors active:bg-a-gray-50"
    >
      <Pin className="shrink-0 text-a-gray-500" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold text-a-ink">{label.title}</span>
        <span className="block truncate text-[11px] text-a-gray-400">{label.sub}</span>
      </span>
      <Chev dir="down" className="shrink-0 text-a-gray-400" />
    </button>
  )
}
