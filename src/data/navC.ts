export type NavCItem = {
  label: string
  to: string
  icon: 'home' | 'insights' | 'report' | 'lists' | 'bell' | 'help' | 'settings' | 'logout'
  children?: { label: string; to: string }[]
}

/** Primary sidebar items for Pattern C. */
export const NAV_C: NavCItem[] = [
  { label: 'Home', to: '/c', icon: 'home' },
  { label: 'Insights', to: '/c/insights', icon: 'insights' },
  {
    label: 'Report Manager',
    to: '/c/reports',
    icon: 'report',
    children: [
      { label: 'All Reports', to: '/c/reports' },
      { label: 'Scheduled', to: '/c/reports/scheduled' },
      { label: 'Templates', to: '/c/reports/templates' },
    ],
  },
  { label: 'Lists', to: '/c/lists', icon: 'lists' },
  { label: 'Notifications', to: '/c/notifications', icon: 'bell' },
  {
    label: 'Help',
    to: '/c/help',
    icon: 'help',
    children: [
      { label: 'Documentation', to: '/c/help/docs' },
      { label: 'Contact Support', to: '/c/help/support' },
    ],
  },
]

/** Pinned to the bottom of the sidebar. */
export const NAV_C_BOTTOM: NavCItem[] = [
  { label: 'Settings', to: '/c/settings', icon: 'settings' },
  { label: 'Logout', to: '/c/logout', icon: 'logout' },
]

export const PAGES_C: Record<string, string> = {
  '/c': 'Home',
  '/c/insights': 'Insights',
  '/c/reports': 'Report Manager',
  '/c/reports/scheduled': 'Scheduled Reports',
  '/c/reports/templates': 'Report Templates',
  '/c/lists': 'Lists',
  '/c/notifications': 'Notifications',
  '/c/help': 'Help',
  '/c/help/docs': 'Documentation',
  '/c/help/support': 'Contact Support',
  '/c/settings': 'Settings',
  '/c/logout': 'Logout',
}
