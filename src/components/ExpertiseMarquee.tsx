import type { ReactNode } from 'react'
import { expertiseCards, type ExpertiseCard, type ExpertiseVisual } from '../data/expertise'

const artByVisual: Record<ExpertiseVisual, { bg: string; text: string; art: ReactNode }> = {
  lease: {
    bg: 'bg-[#F5F7F7]',
    text: 'text-[#051A24]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-6 -top-6 h-40 w-40 opacity-[0.12]" aria-hidden="true">
        <rect x="20" y="8" width="60" height="84" rx="3" fill="none" stroke="#051A24" strokeWidth="1.5" />
        {[20, 30, 40, 50, 60, 70].map((y) => (
          <line key={y} x1="30" y1={y} x2="70" y2={y} stroke="#051A24" strokeWidth="1.5" />
        ))}
      </svg>
    ),
  },
  contract: {
    bg: 'bg-[#051A24]',
    text: 'text-[#F6FCFF]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-4 -top-4 h-44 w-44 opacity-[0.14]" aria-hidden="true">
        <rect x="15" y="10" width="70" height="80" rx="3" fill="none" stroke="#F6FCFF" strokeWidth="1.5" />
        <line x1="25" y1="28" x2="75" y2="28" stroke="#F6FCFF" strokeWidth="1.5" />
        <line x1="25" y1="40" x2="75" y2="40" stroke="#F6FCFF" strokeWidth="4" />
        <line x1="25" y1="54" x2="60" y2="54" stroke="#F6FCFF" strokeWidth="1.5" />
        <line x1="25" y1="66" x2="70" y2="66" stroke="#F6FCFF" strokeWidth="1.5" />
      </svg>
    ),
  },
  cam: {
    bg: 'bg-[#F5F7F7]',
    text: 'text-[#051A24]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-2 -top-2 h-44 w-44 opacity-[0.16]" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`h${i}`} x1="10" y1={10 + i * 15} x2="95" y2={10 + i * 15} stroke="#051A24" strokeWidth="1" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`v${i}`} x1={10 + i * 21} y1="10" x2={10 + i * 21} y2="95" stroke="#051A24" strokeWidth="1" />
        ))}
      </svg>
    ),
  },
  finance: {
    bg: 'bg-[#0D212C]',
    text: 'text-[#F6FCFF]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-4 -bottom-6 h-48 w-48 opacity-[0.16]" aria-hidden="true">
        <polyline points="8,80 26,58 44,66 62,32 80,42 95,15" fill="none" stroke="#F6FCFF" strokeWidth="2" />
        <circle cx="95" cy="15" r="3" fill="#F6FCFF" />
      </svg>
    ),
  },
  operations: {
    bg: 'bg-[#273C46]',
    text: 'text-[#F6FCFF]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-6 -top-2 h-48 w-48 opacity-[0.14]" aria-hidden="true">
        {[14, 28, 42, 56, 70, 84].map((x) => (
          <line key={x} x1={x} y1="6" x2={x} y2="98" stroke="#F6FCFF" strokeWidth="1.5" />
        ))}
        <line x1="4" y1="98" x2="96" y2="98" stroke="#F6FCFF" strokeWidth="1.5" />
      </svg>
    ),
  },
  underwriting: {
    bg: 'bg-[#051A24]',
    text: 'text-[#F6FCFF]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-4 -bottom-4 h-44 w-44 opacity-[0.16]" aria-hidden="true">
        {[
          [15, 70, 10, 25],
          [32, 70, 10, 40],
          [49, 70, 10, 20],
          [66, 70, 10, 55],
          [83, 70, 10, 35],
        ].map(([x, base, w, h]) => (
          <rect key={x} x={x} y={base - h} width={w} height={h} fill="#F6FCFF" />
        ))}
      </svg>
    ),
  },
  advisory: {
    bg: 'bg-[#F5F7F7]',
    text: 'text-[#051A24]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-4 -top-4 h-44 w-44 opacity-[0.14]" aria-hidden="true">
        <path
          d="M50 12c-14 0-25 11-25 25 0 19 25 51 25 51s25-32 25-51c0-14-11-25-25-25z"
          fill="none"
          stroke="#051A24"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="37" r="9" fill="none" stroke="#051A24" strokeWidth="1.5" />
      </svg>
    ),
  },
  reporting: {
    bg: 'bg-[#0D212C]',
    text: 'text-[#F6FCFF]',
    art: (
      <svg viewBox="0 0 100 100" className="absolute -right-2 -top-2 h-44 w-44 opacity-[0.16]" aria-hidden="true">
        <circle cx="50" cy="50" r="34" fill="none" stroke="#F6FCFF" strokeWidth="10" strokeDasharray="140 214" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#F6FCFF" strokeOpacity="0.4" strokeWidth="10" strokeDasharray="60 214" strokeDashoffset="-140" />
      </svg>
    ),
  },
}

function MarqueeCard({ card, ariaHidden }: { card: ExpertiseCard; ariaHidden?: boolean }) {
  const art = artByVisual[card.visual]
  return (
    <div
      className={`relative mx-3 h-[220px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg md:h-[320px] md:w-[420px] ${art.bg}`}
      aria-hidden={ariaHidden}
    >
      {art.art}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <p className={`font-serif text-xl md:text-2xl ${art.text}`}>{card.title}</p>
      </div>
    </div>
  )
}

export function ExpertiseMarquee() {
  const items = [...expertiseCards, ...expertiseCards]

  return (
    <section id="expertise" aria-label="Areas of expertise" className="mt-16 mb-16 w-full md:mt-20">
      <h2 className="sr-only">Areas of expertise</h2>
      <div className="marquee-track w-full overflow-hidden">
        <div className="flex w-max animate-marquee">
          {items.map((card, index) => (
            <MarqueeCard card={card} key={`${card.title}-${index}`} ariaHidden={index >= expertiseCards.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
