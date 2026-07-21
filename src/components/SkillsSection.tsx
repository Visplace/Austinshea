import { skills } from '../data/skills'
import { useInViewAnimation } from '../hooks/useInViewAnimation'

export function SkillsSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section aria-label="Skills and tools" className="w-full py-12">
      <div ref={ref} className={`mx-auto max-w-4xl px-6 ${revealClass}`}>
        <h2 className="mb-6 text-xs font-medium tracking-wide text-[#273C46] uppercase">
          Tools &amp; Skills
        </h2>
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li key={skill}>
              <span className="inline-block rounded-full border border-[#0D212C]/10 bg-[#F5F7F7] px-4 py-2 text-sm text-[#051A24]">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
