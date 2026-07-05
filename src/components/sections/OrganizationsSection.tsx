import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { ExternalLink } from 'lucide-react'

export default function OrganizationsSection() {
  const { organizations } = usePortfolioData()

  if (!organizations.length) return null

  return (
    <section id="organizations" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Organizations
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {organizations.map((org, i) => (
          <FadeIn key={org.name} y={20} delay={i * 0.08}>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#D7E2EA] text-lg font-bold flex-shrink-0">
                  {org.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#D7E2EA] font-bold text-lg">{org.name}</h3>
                  {org.role && <p className="text-[#D7E2EA]/50 text-xs uppercase tracking-wider">{org.role}</p>}
                  {org.description && <p className="text-[#D7E2EA]/60 text-sm mt-2">{org.description}</p>}
                  {org.url && (
                    <a href={org.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#B600A8] text-xs mt-2 hover:underline">
                      Visit website <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
