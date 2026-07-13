export type Insight = {
  id: number
  date: string
  statement: string
  category: string
  /** Brand accent driving the row's gradient badge. */
  tone: 'green' | 'pink' | 'purple' | 'blue'
}

export const INSIGHTS: Insight[] = [
  {
    id: 1,
    date: '04/11/2023',
    statement:
      "You are currently behind last quarter's MQL production by 28% Sed ultricies hendrerit imperdiet. Curabitur sit amet efficitur ex.",
    category: 'MQL Production',
    tone: 'green',
  },
  {
    id: 2,
    date: '04/11/2023',
    statement:
      '3 of your campaigns have significantly decreased over the last month Sed ultricies hendrerit imperdiet. Curabitur sit amet…',
    category: 'Campaigns Impacting Pipeline',
    tone: 'pink',
  },
  {
    id: 3,
    date: '04/11/2023',
    statement:
      'Your total marketing attribution is ahead of last quarter by 7% Sed ultricies hendrerit imperdiet. Curabitur sit amet efficitu…',
    category: 'Marketing Attribution',
    tone: 'purple',
  },
  {
    id: 4,
    date: '04/11/2023',
    statement:
      'The number of highly engaged accounts is down by 14% from down by 14% from last quarter',
    category: 'Engaged Accounts',
    tone: 'blue',
  },
  {
    id: 5,
    date: '04/11/2023',
    statement:
      'The number of highly engaged accounts is up by 18% from last quarter Sed ultricies hendrerit imperdiet. Curabitur sit…',
    category: 'Engaged Accounts',
    tone: 'blue',
  },
]

export const SEARCH_SCOPES = ['Accounts', 'Campaigns', 'Insights', 'Reports']
