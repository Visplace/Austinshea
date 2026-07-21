import { Quote } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { useParallax } from '../hooks/useParallax'

const capabilityLabels = ['Lease Strategy', 'Property Operations', 'Financial Analysis']

function SkylineArt() {
  return (
    <div
      role="img"
      aria-label="Commercial real estate and asset analysis"
      className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-b from-[#0D212C] to-[#051A24] shadow-lg"
    >
      <svg viewBox="0 0 300 375" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="300" height="375" fill="url(#skyGradient)" />
        <defs>
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D212C" />
            <stop offset="100%" stopColor="#051A24" />
          </linearGradient>
        </defs>
        {[
          { x: 24, w: 34, h: 150 },
          { x: 64, w: 26, h: 210 },
          { x: 96, w: 40, h: 130 },
          { x: 142, w: 30, h: 240 },
          { x: 178, w: 22, h: 170 },
          { x: 206, w: 44, h: 200 },
          { x: 256, w: 28, h: 120 },
        ].map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={375 - b.h}
            width={b.w}
            height={b.h}
            fill="#F6FCFF"
            opacity={0.08}
          />
        ))}
        {[
          { x: 24, w: 34, h: 150 },
          { x: 142, w: 30, h: 240 },
          { x: 206, w: 44, h: 200 },
        ].map((b) =>
          Array.from({ length: Math.floor(b.h / 18) }).map((_, row) => (
            <g key={`${b.x}-${row}`}>
              {Array.from({ length: Math.max(1, Math.floor(b.w / 10)) }).map((_, col) => (
                <rect
                  key={col}
                  x={b.x + 4 + col * 10}
                  y={375 - b.h + 8 + row * 18}
                  width="5"
                  height="8"
                  fill="#F6FCFF"
                  opacity={0.18}
                />
              ))}
            </g>
          )),
        )}
        <rect x="0" y="360" width="300" height="15" fill="#051A24" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#051A24]/40 via-transparent to-transparent" />
    </div>
  )
}

export function StatementSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const { ref: parallaxRef, offset } = useParallax(160)
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section aria-label="Professional statement" className="w-full">
      <div ref={ref} className="mx-auto max-w-2xl px-6 py-12 text-center">
        <div className={revealClass} style={{ animationDelay: '0.1s' }}>
          <Quote className="mx-auto h-6 w-6 text-slate-900" aria-hidden="true" />
        </div>

        <p
          className={`${revealClass} mt-6 text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]`}
          style={{ animationDelay: '0.2s' }}
        >
          I approach commercial real estate by connecting{' '}
          <span className="font-serif">contract language</span> to cash flow, operations, risk,
          and <span className="font-serif">asset performance</span>.
        </p>

        <p
          className={`${revealClass} mt-6 text-sm italic text-[#273C46]`}
          style={{ animationDelay: '0.3s' }}
        >
          Austin Shea
        </p>

        <div
          className={`${revealClass} mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3`}
          style={{ animationDelay: '0.4s' }}
        >
          {capabilityLabels.map((label) => (
            <span key={label} className="text-lg font-medium text-slate-900 md:text-xl">
              {label}
            </span>
          ))}
        </div>

        <div
          ref={parallaxRef}
          className={`${revealClass} mt-10 flex justify-center`}
          style={{ animationDelay: '0.5s' }}
        >
          <div style={{ transform: `translateY(${offset}px)` }} className="w-full max-w-sm">
            <SkylineArt />
          </div>
        </div>
      </div>
    </section>
  )
}
