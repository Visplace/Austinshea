import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { Button } from './Button'

export function HeroSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section id="top" aria-label="Introduction" className="w-full">
      <div ref={ref} className="mx-auto max-w-[520px] px-6 pt-12 md:pt-16">
        <p
          className={`${revealClass} font-serif text-[32px] font-semibold tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] mb-4`}
          style={{ animationDelay: '0.1s' }}
        >
          Austin Shea
        </p>

        <p
          className={`${revealClass} font-mono text-xs text-[#051A24] md:text-sm mb-2`}
          style={{ animationDelay: '0.2s' }}
        >
          Commercial real estate, lease strategy, and asset-focused analysis
        </p>

        <h1
          className={`${revealClass} text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]`}
          style={{ animationDelay: '0.3s' }}
        >
          Understand <span className="font-serif">the lease</span>,
          <br />
          strengthen <span className="font-serif">the asset</span>.
        </h1>

        <div
          className={`${revealClass} mt-5 flex flex-col gap-6 text-sm leading-relaxed text-[#051A24] md:mt-6 md:text-base`}
          style={{ animationDelay: '0.4s' }}
        >
          <p>
            I work at the intersection of commercial leases, property operations, financial
            reporting, and asset-level performance. My experience spans lease administration,
            mixed-use property management, CAM recoveries, budgeting, contract interpretation,
            and portfolio reporting.
          </p>
          <p>
            My focus is translating complex agreements and operating information into clear
            financial outcomes. That means understanding how rent, recoveries, amendments,
            abatements, expense caps, reporting obligations, and property decisions affect cash
            flow and risk.
          </p>
          <p>
            I also develop independent work in underwriting, tenant advisory, business
            visibility, and commercial real estate problem solving.
          </p>
        </div>

        <div
          className={`${revealClass} mt-5 flex flex-col gap-3 sm:flex-row md:mt-6 md:gap-4`}
          style={{ animationDelay: '0.5s' }}
        >
          <Button href="#work" variant="primary">
            View my work
          </Button>
          <Button href="#contact" variant="secondary">
            Connect with Austin
          </Button>
        </div>
      </div>
    </section>
  )
}
