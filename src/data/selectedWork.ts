export type WorkVisual = 'reconciliation' | 'abatement' | 'percentage-rent' | 'portfolio' | 'underwriting'

export interface SelectedWorkItem {
  title: string
  description: string
  visual: WorkVisual
  alt: string
}

export const selectedWorkItems: SelectedWorkItem[] = [
  {
    title: 'Lease Reconciliation Analysis',
    description:
      'Reviewed lease language, amendments, expense pools, tenant-specific limitations, billing records, and supporting documentation to resolve discrepancies and support an accurate reconciliation outcome.',
    visual: 'reconciliation',
    alt: 'Abstract representation of annotated lease pages and reconciliation spreadsheet detail',
  },
  {
    title: 'Rent and Abatement Review',
    description:
      'Compared contractual abatement provisions against rent schedules and financial setup to identify inconsistencies requiring correction or further review.',
    visual: 'abatement',
    alt: 'Abstract timeline graphic comparing a rent schedule against abatement periods',
  },
  {
    title: 'Percentage Rent Analysis',
    description:
      'Analyzed contractual and natural breakpoints, sales periods, amendments, and billing timing to validate percentage-rent obligations.',
    visual: 'percentage-rent',
    alt: 'Abstract chart visualizing sales figures against percentage-rent breakpoints',
  },
  {
    title: 'Mixed-Use Portfolio Operations',
    description:
      'Managed financial reporting, tenant obligations, vendor contracts, operating budgets, receivables, capital projects, and daily property operations across a large mixed-use retail portfolio.',
    visual: 'portfolio',
    alt: 'Abstract illustration of mixed-use retail storefronts and an operations dashboard',
  },
  {
    title: 'Acquisition Underwriting',
    description:
      'Developed property-level underwriting materials including historical operating analysis, stabilized cash flow, financing assumptions, return metrics, sensitivity testing, and investment-committee presentation materials.',
    visual: 'underwriting',
    alt: 'Abstract underwriting dashboard showing a cash-flow model and sensitivity table',
  },
]
