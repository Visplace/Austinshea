import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type MouseEvent } from 'react'
import { FileText, Store, LineChart, Building2, ShoppingBag, NotebookPen, Map, Route } from 'lucide-react'
import { independentProjects } from '../data/independentProjects'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Button } from './Button'

interface ThumbKind {
  label: string
  Icon: ComponentType<{ className?: string }>
}

const thumbKinds: ThumbKind[] = [
  { label: 'lease document', Icon: FileText },
  { label: 'storefront', Icon: Store },
  { label: 'financial model', Icon: LineChart },
  { label: 'architectural detail', Icon: Building2 },
  { label: 'retail property', Icon: ShoppingBag },
  { label: 'strategy notes', Icon: NotebookPen },
  { label: 'abstract map', Icon: Map },
  { label: 'commercial corridor', Icon: Route },
]

interface Thumb {
  id: number
  x: number
  y: number
  rotation: number
  kind: ThumbKind
}

const SPAWN_INTERVAL_MS = 80
const LIFETIME_MS = 1000

export function IndependentProjectsSection() {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'
  const prefersReducedMotion = usePrefersReducedMotion()

  const [thumbs, setThumbs] = useState<Thumb[]>([])
  const lastSpawnRef = useRef(0)
  const idRef = useRef(0)
  const timeoutsRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => {
      for (const id of timeouts) {
        window.clearTimeout(id)
      }
      timeouts.clear()
    }
  }, [])

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return

    const now = performance.now()
    if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) return
    lastSpawnRef.current = now

    const bounds = event.currentTarget.getBoundingClientRect()
    const kind = thumbKinds[Math.floor(Math.random() * thumbKinds.length)]
    const id = idRef.current++

    const thumb: Thumb = {
      id,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      rotation: Math.random() * 20 - 10,
      kind,
    }

    setThumbs((prev) => [...prev, thumb])

    const timeoutId = window.setTimeout(() => {
      setThumbs((prev) => prev.filter((t) => t.id !== id))
      timeoutsRef.current.delete(timeoutId)
    }, LIFETIME_MS)
    timeoutsRef.current.add(timeoutId)
  }

  return (
    <section id="projects" aria-label="Independent projects" className="w-full px-6 py-12">
      <div
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className={`relative mx-auto max-w-7xl overflow-hidden rounded-[40px] py-40 shadow-panel md:py-48 ${revealClass}`}
      >
        {thumbs.map((thumb) => (
          <div
            key={thumb.id}
            aria-hidden="true"
            className="thumb-pop pointer-events-none absolute z-10 flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl bg-white shadow-lg"
            style={{
              left: thumb.x,
              top: thumb.y,
              '--thumb-rot': `${thumb.rotation}deg`,
            } as CSSProperties}
          >
            <thumb.kind.Icon className="h-5 w-5 text-[#051A24]" />
          </div>
        ))}

        <h2 className="relative z-0 mb-12 px-4 text-center text-[48px] leading-[1.05] tracking-tight text-[#0D212C] md:text-[64px] lg:text-[80px]">
          Building <span className="font-serif">beyond</span> the day job
        </h2>

        <div className="relative z-0 mx-auto flex max-w-3xl flex-col gap-10 px-6 sm:flex-row sm:gap-8">
          {independentProjects.map((project) => (
            <div key={project.name} className="flex-1 text-center sm:text-left">
              <h3 className="font-serif text-2xl text-[#051A24]">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#051A24]/70">
                {project.description}
              </p>
              <div className="mt-5">
                <Button href={project.href} variant="secondary">
                  {project.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
