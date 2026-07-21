import { ArrowUpRight } from 'lucide-react'
import { primaryNavLinks, secondaryNavLinks, type NavLink } from '../data/site'
import { Button } from './Button'

function FooterLink({ link }: { link: NavLink }) {
  const isExternal = /^https?:\/\//.test(link.href)
  return (
    <a
      href={link.href}
      className="inline-flex items-center gap-1 text-base text-[#051A24] transition hover:opacity-70"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {link.label}
      {isExternal && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1200px] px-6 py-12">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div>
          <Button href="#contact" variant="primary">
            Connect with Austin
          </Button>
        </div>

        <nav aria-label="Footer" className="flex gap-16">
          <ul className="flex flex-col gap-3">
            {primaryNavLinks.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3">
            {secondaryNavLinks.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
