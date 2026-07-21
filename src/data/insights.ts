export interface InsightArticle {
  title: string
  summary: string
  category: string
  /** ISO date string for published articles, or null when unpublished. */
  publishedAt: string | null
  href?: string
}

export const insightArticles: InsightArticle[] = [
  {
    title: 'Why Lease Abstraction Is More Than Data Entry',
    summary:
      'Lease abstraction shapes downstream billing, reporting, and risk. A closer look at why careful reading matters more than speed.',
    category: 'Lease Administration',
    publishedAt: null,
  },
  {
    title: 'How CAM Caps Affect Tenant Recoveries',
    summary:
      'Expense caps change the math on recoveries year over year. An overview of how compounding and cumulative caps affect tenant billing.',
    category: 'CAM & Recoveries',
    publishedAt: null,
  },
  {
    title: 'Understanding Percentage Rent and Natural Breakpoints',
    summary:
      'Natural breakpoints, contractual breakpoints, and sales reporting timing all interact. A primer on how percentage rent is actually calculated.',
    category: 'Financial Analysis',
    publishedAt: null,
  },
  {
    title: 'The Financial Importance of Commencement Dates',
    summary:
      'Commencement dates anchor rent schedules, abatements, and option windows. Getting the date wrong has cascading financial consequences.',
    category: 'Lease Administration',
    publishedAt: null,
  },
  {
    title: 'What Makes a Lease Reconciliation Defensible',
    summary:
      'A defensible reconciliation rests on documentation, consistent methodology, and traceability back to lease language. What that looks like in practice.',
    category: 'CAM & Recoveries',
    publishedAt: null,
  },
  {
    title: 'Connecting Lease Administration to Asset Performance',
    summary:
      'Lease administration is often treated as back-office work. A case for why it is a direct input to asset-level performance and risk.',
    category: 'Asset Performance',
    publishedAt: null,
  },
]
