import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react'
import {
  Briefcase,
  Building2,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  FileSignature,
  FileText,
  Store,
} from 'lucide-react'
import { experienceEntries } from '../data/experience'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const iconByCompany: Record<string, ComponentType<{ className?: string }>> = {
  Rappaport: FileText,
  'KETTLER Management': Building2,
  'The Shopping Center Group': Store,
  KETTLER: FileSignature,
  'Valley Smart Move': Briefcase,
}

const GAP_PX = 24
const AUTO_ADVANCE_MS = 4000
const TRANSITION_MS = 800
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)'

export function ExperienceCarousel() {
  const count = experienceEntries.length
  const tripled = [...experienceEntries, ...experienceEntries, ...experienceEntries]

  const [currentIndex, setCurrentIndex] = useState(count)
  const [instant, setInstant] = useState(false)
  const [step, setStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  const measure = useCallback(() => {
    const track = trackRef.current
    const firstCard = track?.firstElementChild as HTMLElement | undefined
    if (!firstCard) return
    setStep(firstCard.getBoundingClientRect().width + GAP_PX)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const goNext = useCallback(() => {
    setInstant(false)
    setCurrentIndex((i) => i + 1)
  }, [])

  const goPrev = useCallback(() => {
    setInstant(false)
    setCurrentIndex((i) => i - 1)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || isPaused || step === 0) return
    const id = window.setInterval(goNext, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, isPaused, step, goNext])

  const handleTransitionEnd = () => {
    if (currentIndex >= count * 2) {
      setInstant(true)
      setCurrentIndex((i) => i - count)
    } else if (currentIndex < count) {
      setInstant(true)
      setCurrentIndex((i) => i + count)
    }
  }

  useEffect(() => {
    if (!instant) return
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setInstant(false))
    })
    return () => cancelAnimationFrame(raf)
  }, [instant])

  const handlePauseOn = () => setIsPaused(true)
  const handlePauseOff = () => setIsPaused(false)

  return (
    <section id="experience" aria-label="Professional experience" className="w-full py-20">
      <div ref={sectionRef} className="px-6">
        <div
          className={`${revealClass} mb-10 flex flex-col gap-4 md:ml-auto md:max-w-5xl md:flex-row md:items-end md:justify-between`}
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="max-w-lg text-2xl leading-tight tracking-tight text-[#0D212C] md:text-3xl">
            Experience across the <span className="font-serif">commercial real estate</span>{' '}
            lifecycle
          </h2>
          <div className="flex items-center gap-3 text-sm text-[#273C46]">
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              <FileText className="h-4 w-4" aria-hidden="true" />
              <ChartNoAxesCombined className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>Operations · Leases · Finance</span>
          </div>
        </div>

        <div
          className={`${revealClass} relative`}
          style={{ animationDelay: '0.2s' }}
          onMouseEnter={handlePauseOn}
          onMouseLeave={handlePauseOff}
          onFocus={handlePauseOn}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              handlePauseOff()
            }
          }}
        >
          <div
            className="overflow-hidden"
            role="group"
            aria-roledescription="carousel"
            aria-label="Professional experience"
          >
            <div
              ref={trackRef}
              className="flex gap-6"
              style={{
                transform: `translateX(-${currentIndex * step}px)`,
                transition: instant ? 'none' : `transform ${TRANSITION_MS}ms ${EASING}`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {tripled.map((entry, index) => {
                const isBuffer = index < count || index >= count * 2
                const distance = Math.abs(index - currentIndex)
                const Icon = iconByCompany[entry.company] ?? Building2
                return (
                  <article
                    key={`${entry.company}-${index}`}
                    aria-hidden={isBuffer}
                    className="w-[calc(100vw-48px)] flex-shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:w-[427.5px] md:rounded-[40px] md:pr-16 md:pl-10"
                    style={{
                      transform: distance === 0 ? 'scale(1)' : 'scale(0.95)',
                      opacity: distance === 0 ? 1 : 0.55,
                      transition: instant ? 'none' : `transform ${TRANSITION_MS}ms ${EASING}, opacity ${TRANSITION_MS}ms ${EASING}`,
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F7F7]">
                      <Icon className="h-5 w-5 text-[#051A24]" />
                    </div>
                    <h3 className="mt-6 font-serif text-xl text-[#051A24] md:text-2xl">
                      {entry.company}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#273C46]">
                      {entry.role} · {entry.period}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[#051A24]/80">
                      {entry.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 md:justify-end md:pr-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous experience"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#051A24] shadow-btn-secondary transition-opacity hover:opacity-75 focus-visible:opacity-75"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next experience"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#051A24] text-white shadow-btn-primary transition-opacity hover:opacity-85 focus-visible:opacity-85"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
