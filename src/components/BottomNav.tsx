import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { primaryNavLinks, siteConfig } from '../data/site'
import { Button } from './Button'

const sectionIds = primaryNavLinks.map((link) => link.href.replace('#', ''))

export function BottomNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: [0.15, 0.4], rootMargin: '-20% 0px -20% 0px' },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      {menuOpen && (
        <div
          id="bottom-nav-menu"
          className="absolute bottom-full left-1/2 mb-3 w-56 -translate-x-1/2 rounded-3xl bg-white p-3 shadow-nav"
        >
          <ul className="flex flex-col">
            {primaryNavLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block rounded-2xl px-4 py-2.5 text-sm transition hover:bg-[#F5F7F7] ${
                      isActive ? 'bg-[#F5F7F7] font-medium text-[#051A24]' : 'text-[#273C46]'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3 rounded-full bg-white px-6 py-2 shadow-nav md:gap-4 md:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label="Back to top">
          <span className="font-serif text-2xl leading-none text-[#051A24]" aria-hidden="true">
            A
          </span>
          <span className="hidden text-sm text-[#051A24] sm:inline">{siteConfig.name}</span>
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="bottom-nav-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#051A24] transition hover:bg-[#F5F7F7]"
        >
          {menuOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <Button href="#contact" variant="primary" className="!px-5 !py-2 text-sm">
          Connect
        </Button>
      </div>
    </nav>
  )
}
