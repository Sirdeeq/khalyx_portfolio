import { useState } from 'react'
import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'

export default function HealthcareSection() {
  const { healthcare } = usePortfolioData()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="healthcare" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Healthcare & Advocacy
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-[#D7E2EA]/70 text-center max-w-3xl mx-auto mb-16 sm:mb-20 leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
        >
          I am passionate about using technology and community engagement to improve the lives of
          adolescents and vulnerable populations affected by HIV and tuberculosis (TB). My work
          combines peer support, digital innovation, advocacy, and leadership to strengthen
          healthcare delivery and community participation.
        </p>
      </FadeIn>

      <div className="max-w-4xl mx-auto">
        {healthcare.map((item, i) => (
          <FadeIn key={item.title} delay={0.05 * i} y={20}>
            <div
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-4 cursor-pointer transition-all duration-300 hover:border-white/20"
              onClick={() => toggle(i)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#D7E2EA]">{item.title}</h3>
                    {item.period && (
                      <span className="text-xs font-medium text-[#D7E2EA]/40 border border-white/10 rounded-full px-3 py-0.5">
                        {item.period}
                      </span>
                    )}
                  </div>
                  <p className="text-[#D7E2EA]/60 mt-1 text-sm sm:text-base">{item.brief}</p>
                </div>
                <span
                  className={`text-[#D7E2EA]/40 text-2xl ml-4 transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-white/10 pt-4">
                  <ul className="space-y-2">
                    {item.responsibilities.map((r, j) => (
                      <li key={j} className="text-[#D7E2EA]/70 leading-relaxed flex items-start gap-2">
                        <span className="text-[#D7E2EA]/30 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/30 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  {item.highlight && (
                    <p className="text-[#D7E2EA]/80 mt-4 leading-relaxed border-l-2 border-[#D7E2EA]/20 pl-4 italic">
                      {item.highlight}
                    </p>
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
