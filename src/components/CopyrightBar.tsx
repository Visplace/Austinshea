import { siteConfig } from '../data/site'

export function CopyrightBar() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-4 pb-28">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#051A24]">{siteConfig.name}</p>
        <p className="text-sm text-[#051A24]">{siteConfig.location}</p>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[#273C46]">
        The information presented on this website is for professional and informational purposes
        only and does not constitute legal, brokerage, tax, accounting, or investment advice.
      </p>
    </div>
  )
}
