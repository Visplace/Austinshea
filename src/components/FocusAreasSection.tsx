import { ArrowUpRight } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { Button } from './Button'

export function FocusAreasSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section aria-label="Focus areas" className="w-full px-6 py-12">
      <div
        ref={ref}
        className="grid grid-cols-1 gap-8 md:ml-auto md:max-w-5xl md:grid-cols-2 md:justify-end"
      >
        <div
          className={`${revealClass} rounded-[40px] bg-[#051A24] pt-8 pb-10 pr-10 pl-10 shadow-card-dark-inset md:pr-20`}
          style={{ animationDelay: '0.1s' }}
        >
          <h3 className="font-serif text-2xl text-[#F6FCFF] md:text-3xl">
            Lease and Asset Analysis
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#E0EBF0] md:text-base">
            Translating leases, amendments, recoveries, operating expenses, and financial
            obligations into clear property-level conclusions.
          </p>

          <p className="mt-10 font-serif text-2xl leading-tight text-[#F6FCFF] md:text-3xl">
            From source document to financial outcome.
          </p>
          <p className="mt-3 text-xs tracking-wide text-[#E0EBF0]/80 md:text-sm">
            Lease administration · Recoveries · Risk · Reporting
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#expertise" variant="secondary">
              Explore expertise
            </Button>
            <a
              href="#experience"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#F6FCFF] transition-opacity hover:opacity-75"
            >
              View experience
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          className={`${revealClass} rounded-[40px] bg-white pt-8 pb-10 pr-10 pl-10 shadow-card-light md:pr-20`}
          style={{ animationDelay: '0.2s' }}
        >
          <h3 className="font-serif text-2xl text-[#051A24] md:text-3xl">
            Underwriting and Advisory
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#051A24]/80 md:text-base">
            Evaluating property opportunities, tenant needs, operating assumptions, financing
            considerations, and commercial real estate decisions.
          </p>

          <p className="mt-10 font-serif text-2xl leading-tight text-[#0D212C] md:text-3xl">
            Structured analysis for complex decisions.
          </p>
          <p className="mt-3 text-xs tracking-wide text-[#273C46]/80 md:text-sm">
            Underwriting · Tenant advisory · Scenario analysis
          </p>

          <div className="mt-8">
            <Button href="#work" variant="primary">
              View selected work
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
