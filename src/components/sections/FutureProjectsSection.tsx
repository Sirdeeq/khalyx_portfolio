import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { Sparkles, Lightbulb, Rocket } from 'lucide-react'

const statusIcons: Record<string, typeof Sparkles> = {
  'Planned': Lightbulb,
  'In Development': Rocket,
  'Coming Soon': Sparkles,
}

const statusColors: Record<string, string> = {
  'Planned': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  'In Development': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  'Coming Soon': 'text-green-400 border-green-400/30 bg-green-400/10',
}

export default function FutureProjectsSection() {
  const { futureProjects } = usePortfolioData()

  if (!futureProjects.length) return null

  return (
    <section id="future-projects" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Future Projects
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {futureProjects.map((project, i) => {
          const StatusIcon = statusIcons[project.status] || Sparkles
          const statusColor = statusColors[project.status] || 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'

          return (
            <FadeIn key={project.name} y={20} delay={i * 0.1}>
              <div className="bg-[#0C0C0C]/5 rounded-2xl p-6 hover:bg-[#0C0C0C]/10 transition-all duration-300 h-full flex flex-col">
                <div className={`inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider rounded-full border px-3 py-1 mb-4 w-fit ${statusColor}`}>
                  <StatusIcon size={12} />
                  {project.status}
                </div>
                <h3 className="text-[#0C0C0C] font-bold text-lg mb-2">{project.name}</h3>
                {project.category && <span className="text-[#0C0C0C]/40 text-xs uppercase tracking-wider mb-2">{project.category}</span>}
                {project.description && <p className="text-[#0C0C0C]/60 text-sm flex-1">{project.description}</p>}
              </div>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
