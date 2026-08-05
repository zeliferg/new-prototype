/**
 * Pattern A's brand mark, as the Figma side-nav frame draws it: "Placeholder"
 * over "Logo" in Mulish, tightly leaded, in #45a3ff.
 *
 * The frame sets 22px for a 296px sidebar; a 56px phone bar has to hold this plus
 * two icon buttons, so the size drops and the rest of the lockup — face, weight,
 * colour, two-line stack, 0.95 leading — carries over unchanged.
 *
 * Note the desktop SideNavA currently renders this in `text-a-blue` (#1a7bd9) at
 * 19px bold, which is not what the frame specifies. This follows the frame.
 */
export default function PlaceholderLogoA({ className = '' }: { className?: string }) {
  return (
    <span
      className={`shrink-0 font-a text-[17px] leading-[0.95] text-[#45a3ff] ${className}`}
    >
      Placeholder
      <br />
      Logo
    </span>
  )
}
