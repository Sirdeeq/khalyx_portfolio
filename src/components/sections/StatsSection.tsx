import FadeIn from '../ui/FadeIn'
import StatsCounter from '../ui/StatsCounter'

const stats = [
  { end: 5, suffix: '+', label: 'Years Experience' },
  { end: 20, suffix: '+', label: 'Projects Completed' },
  { end: 10, suffix: '+', label: 'Happy Clients' },
  { end: 100, suffix: 'K+', label: 'Lines of Code' },
  { end: 50, suffix: '+', label: 'Videos Edited' },
  { end: 30, suffix: '+', label: 'Designs Created' },
  { end: 7, suffix: '+', label: 'Healthcare Programs Supported' },
]

export default function StatsSection() {
  return (
    <section className="bg-[var(--bg-page)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn y={20}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {stats.map((stat) => (
              <StatsCounter key={stat.label} end={stat.end} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
