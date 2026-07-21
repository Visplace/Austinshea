import { useInViewAnimation } from '../hooks/useInViewAnimation'

export function AboutSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section id="about" aria-label="About Austin Shea" className="w-full py-12">
      <div ref={ref} className="mx-auto max-w-4xl px-6">
        <h2
          className={`${revealClass} text-3xl leading-tight tracking-tight text-[#0D212C] md:text-4xl lg:text-5xl`}
        >
          A commercial real estate perspective{' '}
          <span className="font-serif">grounded in operations</span>
        </h2>

        <div
          className={`${revealClass} mt-8 flex flex-col gap-6 text-sm leading-relaxed text-[#051A24]/80 md:text-base`}
          style={{ animationDelay: '0.15s' }}
        >
          <p>
            Austin Shea is a commercial real estate professional based in Northern Virginia. His
            career has progressed through office administration, contract administration,
            commercial property operations, portfolio management, lease administration, and
            financial analysis.
          </p>
          <p>
            He has worked across retail and mixed-use real estate, supporting the contractual,
            financial, and operational details that influence property performance. His work
            frequently involves lease interpretation, recoveries, budgeting, reconciliations,
            rent schedules, amendments, reporting, issue resolution, and coordination across
            legal, accounting, ownership, asset management, vendors, and property teams.
          </p>
          <p>
            Austin earned a Bachelor of Arts in Political Science and Sociology from James
            Madison University. His professional interests include complex lease analysis,
            acquisition underwriting, tenant advisory, commercial real estate technology, and the
            relationship between contractual language and asset performance.
          </p>
        </div>

        <div
          className={`${revealClass} mt-10 rounded-2xl bg-[#F5F7F7] p-6 md:p-8`}
          style={{ animationDelay: '0.25s' }}
        >
          <p className="text-xs font-medium tracking-wide text-[#273C46] uppercase">Education</p>
          <p className="mt-2 font-serif text-xl text-[#051A24] md:text-2xl">
            James Madison University
          </p>
          <p className="mt-1 text-sm text-[#051A24]/80 md:text-base">
            Bachelor of Arts, Political Science and Sociology
          </p>
          <p className="mt-3 text-sm text-[#273C46]">
            Dean&rsquo;s List · Student Government · Make Your Mark on Madison · Epsilon Sigma
            Alpha Treasurer
          </p>
        </div>
      </div>
    </section>
  )
}
