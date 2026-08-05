import { Bell, Burger } from '../../components/a/iconsA'
import PlaceholderLogoA from './PlaceholderLogoA'

/**
 * Pattern A's mobile app bar, cut down to three things: brand, notifications, menu.
 *
 * The desktop TopBarA also carries the search field and the language, help, and
 * account menus. Search moves into the page below the heading, where it has room
 * for its placeholder; the three menus move into the drawer.
 */
export default function MobileTopBarA({
  onOpenNav,
  unread,
}: {
  onOpenNav: () => void
  unread: number
}) {
  return (
    <header className="relative z-10 flex h-14 shrink-0 items-center border-b border-a-gray-100 bg-white px-4">
      <PlaceholderLogoA />

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          aria-label={`Notifications${unread ? ` (${unread} unread)` : ''}`}
          className="relative flex h-10 w-10 items-center justify-center rounded text-a-gray-500 transition-colors active:bg-a-gray-50"
        >
          <Bell />
          {unread > 0 && (
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-2 w-2 rounded-full bg-a-blue ring-2 ring-white"
            />
          )}
        </button>

        <button
          type="button"
          aria-label="Open navigation"
          onClick={onOpenNav}
          className="flex h-10 w-10 items-center justify-center rounded text-a-gray-500 transition-colors active:bg-a-gray-50"
        >
          <Burger />
        </button>
      </div>
    </header>
  )
}
