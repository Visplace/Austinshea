import { selectedWorkItems, type SelectedWorkItem } from '../data/selectedWork'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { SelectedWorkVisual } from './SelectedWorkVisual'

function WorkItem({ item }: { item: SelectedWorkItem }) {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <div ref={ref}>
      <div className={`ml-8 max-w-2xl md:ml-20 ${revealClass}`}>
        <h3 className="font-serif text-2xl font-semibold text-[#051A24] md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-3 text-sm text-[#051A24]/70 md:text-base">{item.description}</p>
      </div>
      <div className={`mt-6 ${revealClass}`} style={{ animationDelay: '0.15s' }}>
        <SelectedWorkVisual visual={item.visual} alt={item.alt} />
      </div>
    </div>
  )
}

export function SelectedWorkSection() {
  return (
    <section id="work" aria-label="Selected work" className="w-full">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col gap-16 md:gap-20">
          {selectedWorkItems.map((item) => (
            <WorkItem item={item} key={item.title} />
          ))}
        </div>

        <p className="mt-16 max-w-2xl text-sm text-[#273C46]">
          Selected examples are intentionally generalized to preserve employer, tenant, property,
          and transaction confidentiality.
        </p>
      </div>
    </section>
  )
}
