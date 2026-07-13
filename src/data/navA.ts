export type NavAItem = {
  label: string
  to?: string
  icon: 'grid' | 'search' | 'tools' | 'financials' | 'enforcement'
  children?: { label: string; to: string }[]
}

export const NAV_A: NavAItem[] = [
  { label: 'Dashboard', to: '/a', icon: 'grid' },
  { label: 'Search', to: '/a/search', icon: 'search' },
  {
    label: 'Property Tools',
    icon: 'tools',
    children: [
      { label: 'Basic Information', to: '/a/property/basic' },
      { label: 'Property Reports', to: '/a/property/reports' },
      { label: 'ParkM Materials', to: '/a/property/materials' },
      { label: 'Employee Vehicles', to: '/a/property/vehicles' },
      { label: 'ParkM Orders', to: '/a/property/orders' },
    ],
  },
  {
    label: 'Financials',
    icon: 'financials',
    children: [
      { label: 'Month End Statements', to: '/a/financials/statements' },
      { label: 'Revenue and Deduction', to: '/a/financials/revenue' },
      { label: 'Revenue Calculator', to: '/a/financials/calculator' },
    ],
  },
  {
    label: 'Enforcement',
    icon: 'enforcement',
    children: [
      { label: 'Violations', to: '/a/enforcement/violations' },
      { label: 'Citations', to: '/a/enforcement/citations' },
      { label: 'Appeals', to: '/a/enforcement/appeals' },
    ],
  },
]

/** Route → { breadcrumb parent, page title }. */
export const PAGES_A: Record<string, { parent: string; title: string }> = {
  '/a': { parent: 'Home', title: 'Dashboard' },
  '/a/search': { parent: 'Home', title: 'Search' },
  '/a/property/basic': { parent: 'Basic Information', title: 'Property 1' },
  '/a/property/reports': { parent: 'Property Reports', title: 'Property 1' },
  '/a/property/materials': { parent: 'ParkM Materials', title: 'Property 1' },
  '/a/property/vehicles': { parent: 'Employee Vehicles', title: 'Property 1' },
  '/a/property/orders': { parent: 'ParkM Orders', title: 'Property 1' },
  '/a/financials/statements': { parent: 'Financials', title: 'Month End Statements' },
  '/a/financials/revenue': { parent: 'Financials', title: 'Revenue and Deduction' },
  '/a/financials/calculator': { parent: 'Financials', title: 'Revenue Calculator' },
  '/a/enforcement/violations': { parent: 'Enforcement', title: 'Violations' },
  '/a/enforcement/citations': { parent: 'Enforcement', title: 'Citations' },
  '/a/enforcement/appeals': { parent: 'Enforcement', title: 'Appeals' },
}

export type Community = { id: number; name: string; city: string; state: string }

export const COMMUNITIES: Community[] = [
  { id: 1, name: 'Colorado Apartments', city: 'Denver', state: 'CO' },
  { id: 2, name: 'Country Green Townhomes', city: 'Westminster', state: 'CO' },
  { id: 3, name: 'Country Green Estates', city: 'Boulder', state: 'CO' },
  { id: 4, name: 'Country Green Studios', city: 'San Diego', state: 'CA' },
  { id: 5, name: 'Country Green Castle', city: 'Houston', state: 'TX' },
  { id: 6, name: 'Country Green Tower', city: 'Orlando', state: 'FL' },
  { id: 7, name: 'Country Green Apartments', city: 'Orlando', state: 'FL' },
]

export const STATES = ['CO', 'CA', 'TX', 'FL']
