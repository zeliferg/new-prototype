export type NavChild = { label: string; to: string }

export type NavItem = {
  label: string
  to: string
  children?: NavChild[]
}

/**
 * The single source of truth for navigation.
 * Both the desktop dropdown bar and the mobile accordion panel render from this
 * array, so a menu item can never exist in one mode but not the other.
 */
export const NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Dashboard',
    to: '/dashboard',
    children: [
      { label: 'Component Dashboard', to: '/dashboard' },
      { label: 'Overview', to: '/dashboard/overview' },
      { label: 'Reports', to: '/dashboard/reports' },
    ],
  },
  { label: 'Knowledge Center', to: '/knowledge-center' },
  {
    label: 'Manage',
    to: '/manage',
    children: [
      { label: 'Projects', to: '/manage/projects' },
      { label: 'Users', to: '/manage/users' },
      { label: 'Roles', to: '/manage/roles' },
      { label: 'Integrations', to: '/manage/integrations' },
    ],
  },
  { label: 'Files', to: '/files' },
]

/** Icon-only menus pinned to the right of the desktop navbar. */
export const UTILITY_NAV: NavItem[] = [
  {
    label: 'Profile',
    to: '/profile',
    children: [
      { label: 'Account Settings', to: '/profile/account' },
      { label: 'Preferences', to: '/profile/preferences' },
      { label: 'Sign Out', to: '/profile/sign-out' },
    ],
  },
  {
    label: 'Help Center',
    to: '/help',
    children: [
      { label: 'Documentation', to: '/help/docs' },
      { label: 'Support', to: '/help/support' },
    ],
  },
]
