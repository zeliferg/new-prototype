import { BellB, BurgerB } from '../../components/b/iconsB'

/**
 * Pattern B's mobile app bar: brand on the left, notifications and the menu on the
 * right. The desktop TopBarB puts the hamburger on the left and carries a clock —
 * this is the phone arrangement from the Figma frame, which drops both.
 *
 * The frame's brand mark is a real logo; this uses the same "Placeholder Logo"
 * wording SideNavB shows on desktop, to keep the demo unbranded.
 *
 * The shadow is the frame's `elevation/4` token, spelled out because the project's
 * shadow tokens stop at `--shadow-b-card`.
 */
export default function MobileTopBarB({
  onOpenNav,
  notifications,
}: {
  onOpenNav: () => void
  notifications: number
}) {
  return (
    <header className="relative z-10 flex h-16 shrink-0 items-center bg-white pl-5 pr-4 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.2),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)]">
      <span className="truncate text-[16px] font-medium tracking-[0.17px] text-[#003d78]">
        Placeholder Logo
      </span>

      <div className="ml-auto flex items-center">
        <button
          type="button"
          aria-label={`Notifications${notifications ? ` (${notifications} unread)` : ''}`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-b-muted transition-colors active:bg-black/[0.06]"
        >
          <BellB />
          {notifications > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-b-error" />
          )}
        </button>

        <button
          type="button"
          aria-label="Open navigation"
          onClick={onOpenNav}
          className="flex h-10 w-10 items-center justify-center rounded-full text-b-muted transition-colors active:bg-black/[0.06]"
        >
          <BurgerB />
        </button>
      </div>
    </header>
  )
}
