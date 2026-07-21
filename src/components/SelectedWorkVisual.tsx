import type { ReactElement } from 'react'
import type { WorkVisual } from '../data/selectedWork'

const wash = 'bg-gradient-to-br from-[#F5F7F7] to-[#E0EBF0]'

function ReconciliationArt() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="225" fill="#F5F7F7" />
      <rect x="24" y="24" width="150" height="177" rx="6" fill="#FFFFFF" stroke="#0D212C" strokeOpacity="0.15" />
      {[46, 62, 78, 94, 110, 126, 142, 158, 174].map((y) => (
        <line key={y} x1="40" y1={y} x2="158" y2={y} stroke="#0D212C" strokeOpacity="0.18" strokeWidth="2" />
      ))}
      <rect x="200" y="24" width="176" height="177" rx="6" fill="#0D212C" />
      {Array.from({ length: 6 }).map((_, row) => (
        <g key={row}>
          {Array.from({ length: 4 }).map((_, col) => (
            <rect
              key={col}
              x={216 + col * 40}
              y={44 + row * 24}
              width="32"
              height="14"
              rx="2"
              fill="#F6FCFF"
              opacity={row === 2 && col === 2 ? 0.9 : 0.15}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

function AbatementArt() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="225" fill="#0D212C" />
      <line x1="30" y1="180" x2="370" y2="180" stroke="#F6FCFF" strokeOpacity="0.3" strokeWidth="1.5" />
      <rect x="60" y="60" width="60" height="120" fill="#F6FCFF" opacity="0.12" />
      <rect x="150" y="90" width="60" height="90" fill="#F6FCFF" opacity="0.5" />
      <rect x="240" y="60" width="60" height="120" fill="#F6FCFF" opacity="0.12" />
      <line x1="150" y1="90" x2="150" y2="45" stroke="#F6FCFF" strokeDasharray="4 4" strokeWidth="1.5" />
      <line x1="210" y1="90" x2="210" y2="45" stroke="#F6FCFF" strokeDasharray="4 4" strokeWidth="1.5" />
      <line x1="150" y1="50" x2="210" y2="50" stroke="#F6FCFF" strokeWidth="1.5" />
      <text x="180" y="42" fill="#F6FCFF" fontSize="11" textAnchor="middle" opacity="0.8">
        abatement
      </text>
    </svg>
  )
}

function PercentageRentArt() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="225" fill="#F5F7F7" />
      <polyline
        points="30,190 80,160 130,170 180,120 230,135 280,80 330,95 370,40"
        fill="none"
        stroke="#051A24"
        strokeWidth="2.5"
      />
      <line x1="30" y1="110" x2="370" y2="110" stroke="#273C46" strokeDasharray="5 5" strokeWidth="1.5" />
      <circle cx="280" cy="80" r="4" fill="#051A24" />
      <text x="300" y="70" fill="#273C46" fontSize="11">
        breakpoint
      </text>
    </svg>
  )
}

function PortfolioArt() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="225" fill="#0D212C" />
      <rect x="0" y="150" width="400" height="75" fill="#051A24" />
      {[20, 70, 120, 170, 220, 270, 320].map((x, i) => (
        <rect key={x} x={x} y={150 - (i % 3) * 20 - 40} width="34" height={70 + (i % 3) * 20} fill="#F6FCFF" opacity="0.15" />
      ))}
      {[20, 70, 120, 170, 220, 270, 320].map((x) => (
        <rect key={`storefront-${x}`} x={x + 4} y="150" width="26" height="40" fill="#F6FCFF" opacity="0.35" />
      ))}
      <line x1="0" y1="150" x2="400" y2="150" stroke="#F6FCFF" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  )
}

function UnderwritingArt() {
  return (
    <svg viewBox="0 0 400 225" className="h-full w-full" aria-hidden="true">
      <rect width="400" height="225" fill="#051A24" />
      {[
        [30, 100],
        [70, 130],
        [110, 90],
        [150, 150],
        [190, 110],
        [230, 170],
        [270, 140],
        [310, 190],
        [350, 160],
      ].map(([x, h]) => (
        <rect key={x} x={x} y={200 - h} width="20" height={h} fill="#F6FCFF" opacity="0.2" />
      ))}
      <polyline
        points="30,120 70,100 110,105 150,70 190,80 230,50 270,60 310,30 350,45"
        fill="none"
        stroke="#F6FCFF"
        strokeWidth="2"
      />
    </svg>
  )
}

const artByVisual: Record<WorkVisual, () => ReactElement> = {
  reconciliation: ReconciliationArt,
  abatement: AbatementArt,
  'percentage-rent': PercentageRentArt,
  portfolio: PortfolioArt,
  underwriting: UnderwritingArt,
}

export function SelectedWorkVisual({ visual, alt }: { visual: WorkVisual; alt: string }) {
  const Art = artByVisual[visual]
  return (
    <div
      role="img"
      aria-label={alt}
      className={`aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg ${wash}`}
    >
      <Art />
    </div>
  )
}
