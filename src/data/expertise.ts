export type ExpertiseVisual = 'lease' | 'contract' | 'cam' | 'finance' | 'operations' | 'underwriting' | 'advisory' | 'reporting'

export interface ExpertiseCard {
  title: string
  visual: ExpertiseVisual
}

export const expertiseCards: ExpertiseCard[] = [
  { title: 'Lease Administration', visual: 'lease' },
  { title: 'Contract Interpretation', visual: 'contract' },
  { title: 'CAM and Recoveries', visual: 'cam' },
  { title: 'Financial Analysis', visual: 'finance' },
  { title: 'Property Operations', visual: 'operations' },
  { title: 'Acquisition Underwriting', visual: 'underwriting' },
  { title: 'Tenant Advisory', visual: 'advisory' },
  { title: 'Asset-Level Reporting', visual: 'reporting' },
]
