export type Row = {
  id: number
  name: string
  userType: string
  price: number
  /** 0 renders as "Sold Out". */
  available: number
  permits: number
}

/** Seeded with enough rows that the 5 / 10 / 20 page sizes and pagination
 *  are actually exercised, rather than the 3 rows shown in the static comp. */
export const ROWS: Row[] = [
  { id: 1, name: 'Name 1', userType: 'Available to All', price: 10, available: 25, permits: 5 },
  { id: 2, name: 'Name 2', userType: 'Available to All', price: 3, available: 2, permits: 5 },
  { id: 3, name: 'Name 3', userType: 'Available to All', price: 0, available: 0, permits: 5 },
  { id: 4, name: 'Name 4', userType: 'Residents Only', price: 25, available: 12, permits: 3 },
  { id: 5, name: 'Name 5', userType: 'Employees Only', price: 15.5, available: 8, permits: 2 },
  { id: 6, name: 'Name 6', userType: 'Available to All', price: 7.25, available: 40, permits: 8 },
  { id: 7, name: 'Name 7', userType: 'Residents Only', price: 0, available: 0, permits: 1 },
  { id: 8, name: 'Name 8', userType: 'Visitors', price: 5, available: 60, permits: 12 },
  { id: 9, name: 'Name 9', userType: 'Available to All', price: 12, available: 3, permits: 4 },
  { id: 10, name: 'Name 10', userType: 'Employees Only', price: 30, available: 18, permits: 6 },
  { id: 11, name: 'Name 11', userType: 'Visitors', price: 2.5, available: 0, permits: 2 },
  { id: 12, name: 'Name 12', userType: 'Residents Only', price: 18, available: 22, permits: 7 },
]

export type SortKey = keyof Pick<Row, 'name' | 'userType' | 'price' | 'available' | 'permits'>
