export type PageContent = {
  title: string
  description: string
  /** Breadcrumb trail, excluding the leading "Home" link which is always present. */
  trail: string[]
  notes: string
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

/**
 * Every route renders the same Pattern D template; only this record changes.
 * Keys are route pathnames.
 */
export const PAGES: Record<string, PageContent> = {
  '/': {
    title: 'Home',
    description: 'Overview of your workspace.',
    trail: [],
    notes: LOREM,
  },
  '/dashboard': {
    title: 'Component Dashboard',
    description: 'Description about the component dashboard.',
    trail: ['Component Dashboard'],
    notes: LOREM,
  },
  '/dashboard/overview': {
    title: 'Overview',
    description: 'Aggregate health across all monitored components.',
    trail: ['Dashboard', 'Overview'],
    notes: LOREM,
  },
  '/dashboard/reports': {
    title: 'Reports',
    description: 'Generated accessibility and quality reports.',
    trail: ['Dashboard', 'Reports'],
    notes: LOREM,
  },
  '/knowledge-center': {
    title: 'Knowledge Center',
    description: 'Guidance, patterns, and remediation references.',
    trail: ['Knowledge Center'],
    notes: LOREM,
  },
  '/manage': {
    title: 'Manage',
    description: 'Administer projects, users, roles, and integrations.',
    trail: ['Manage'],
    notes: LOREM,
  },
  '/manage/projects': {
    title: 'Projects',
    description: 'All projects in the current account.',
    trail: ['Manage', 'Projects'],
    notes: LOREM,
  },
  '/manage/users': {
    title: 'Users',
    description: 'People with access to this workspace.',
    trail: ['Manage', 'Users'],
    notes: LOREM,
  },
  '/manage/roles': {
    title: 'Roles',
    description: 'Permission sets assigned to users.',
    trail: ['Manage', 'Roles'],
    notes: LOREM,
  },
  '/manage/integrations': {
    title: 'Integrations',
    description: 'Connected services and data sources.',
    trail: ['Manage', 'Integrations'],
    notes: LOREM,
  },
  '/files': {
    title: 'Files',
    description: 'Uploaded source files and artifacts.',
    trail: ['Files'],
    notes: LOREM,
  },
}

export const SOURCES = ['Source Name', 'Design System', 'Marketing Site', 'Mobile App']
export const COMPONENTS = ['Component', 'Button', 'Select', 'Navbar', 'Modal']
export const FILTER_VIEWS = ['WCAG 2.2 AA', 'WCAG 2.2 AAA', 'WCAG 2.1 AA', 'Section 508']

export function pageFor(pathname: string): PageContent {
  return (
    PAGES[pathname] ?? {
      title: 'Not Found',
      description: 'This page does not exist yet.',
      trail: ['Not Found'],
      notes: LOREM,
    }
  )
}
