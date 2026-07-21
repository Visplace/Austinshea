export const siteConfig = {
  name: 'Austin Shea',
  email: 'austindshea01@gmail.com',
  linkedin: 'https://www.linkedin.com/in/austin-shea',
  resumeHref: '/Austin-Shea-Resume.pdf',
  location: 'McLean, Virginia',
}

export interface NavLink {
  label: string
  href: string
}

export const primaryNavLinks: NavLink[] = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Selected Work', href: '#work' },
  { label: 'About', href: '#about' },
]

export const secondaryNavLinks: NavLink[] = [
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'Email', href: `mailto:${siteConfig.email}` },
  { label: 'Résumé', href: siteConfig.resumeHref },
  { label: 'Visplace', href: '#projects' },
  { label: 'Corrideal', href: '#projects' },
]
