import { ArrowUpRight } from 'lucide-react'
import { insightArticles } from '../data/insights'
import { useInViewAnimation } from '../hooks/useInViewAnimation'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function InsightsSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section id="insights" aria-label="Commercial real estate insights" className="w-full py-12">
      <div ref={ref} className="px-6">
        <h2
          className={`${revealClass} mb-8 max-w-2xl text-2xl tracking-tight text-[#0D212C] md:text-3xl`}
        >
          Commercial <span className="font-serif">real estate</span> insights
        </h2>

        <div
          className={`${revealClass} flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4`}
          style={{ animationDelay: '0.1s' }}
        >
          {insightArticles.map((article) => (
            <article
              key={article.title}
              className="flex w-[280px] flex-shrink-0 snap-start flex-col gap-3 rounded-2xl bg-white p-6 shadow-card-light md:w-[320px]"
            >
              <span className="text-xs font-medium tracking-wide text-[#273C46] uppercase">
                {article.category}
              </span>
              <h3 className="font-serif text-xl text-[#051A24]">{article.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-[#051A24]/70">
                {article.summary}
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-[#0D212C]/10 pt-3 text-sm">
                <span className="text-[#273C46]">
                  {article.publishedAt ? formatDate(article.publishedAt) : 'Coming Soon'}
                </span>
                {article.href ? (
                  <a
                    href={article.href}
                    className="inline-flex items-center gap-1 font-medium text-[#051A24] hover:opacity-70"
                  >
                    Read Article
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-medium text-[#051A24]/40">Read Article</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
