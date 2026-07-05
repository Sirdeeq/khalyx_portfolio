import { useState, useMemo } from 'react'
import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'

export default function TechStackSection() {
  const { techStack } = usePortfolioData()
  const categories = useMemo(() => {
    const map: Record<string, string[]> = {}
    techStack.forEach((cat) => { map[cat.category] = cat.items })
    return map
  }, [techStack])
  const keys = Object.keys(categories)
  const [active, setActive] = useState(keys[0] || '')

  return (
    <section id="tech-stack" className="bg-[var(--bg-page)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Tech Stack
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        <FadeIn y={20} delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {keys.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-6 py-2 border text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? 'bg-[var(--text-body)] text-[var(--bg-page)] border-[var(--text-body)]'
                    : 'border-[var(--text-muted-30)] text-[var(--text-body)] hover:border-[var(--text-muted-60)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-3">
          {(categories[active] || []).map((skill, i) => (
            <FadeIn key={skill} delay={0.05 * i} y={10}>
              <span className="inline-block border border-[var(--text-muted-20)] rounded-full px-4 py-1.5 text-sm text-[var(--text-muted-80)]">
                {skill}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
