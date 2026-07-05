import { useState } from 'react'
import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'

export default function MediaSection() {
  const { media } = usePortfolioData()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="media" className="bg-[var(--bg-page)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Media Portfolio
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-[var(--text-muted-70)] text-center max-w-3xl mx-auto mb-16 sm:mb-20 leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
        >
          Creativity has always been at the heart of my journey. What began as a passion for graphic
          design gradually evolved into photography, videography, motion graphics, and creative
          production. Today, I combine technical expertise with visual storytelling to create
          impactful digital experiences that connect with audiences.
        </p>
      </FadeIn>

      {/* Creative Journey Timeline */}
      <div className="max-w-4xl mx-auto mb-20">
        <FadeIn y={20} delay={0.15}>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-body)] mb-8 text-center">My Creative Journey</h3>
        </FadeIn>

        {(media.timeline.length ? media.timeline : [
          { title: 'Graphic Design', period: 'Where it all began', detail: 'Started as a freelance Graphic Designer.' },
          { title: 'Photography', period: 'Expanding the vision', detail: 'Expanded into Photography.' },
          { title: 'Multimedia Production', period: 'Full creative spectrum', detail: 'Developed skills in video editing, motion graphics.' },
        ]).map((item, i) => (
          <FadeIn key={item.title} delay={0.1 * i} y={20}>
            <div
              className="bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] p-6 mb-4 cursor-pointer transition-all duration-300 hover:border-[var(--border-subtle)]"
              onClick={() => toggle(i)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-lg sm:text-xl font-bold text-[var(--text-body)]">{item.title}</h4>
                    <span className="text-xs text-[var(--text-muted-40)] border border-[var(--border-subtle)] rounded-full px-3 py-0.5">
                      {item.period}
                    </span>
                  </div>
                </div>
                <span className="text-[var(--text-muted-40)] text-xl ml-4 transition-transform duration-300 flex-shrink-0">
                  +
                </span>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
              >
                <p className="text-[var(--text-muted-70)] leading-relaxed border-t border-[var(--border-subtle)] pt-4">{item.detail}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Technical Director - BMS */}
      <div className="max-w-4xl mx-auto mb-20">
        <FadeIn y={20} delay={0.2}>
          <div className="bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl border border-[var(--border-subtle)] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-body)]">Technical Director</h3>
              <span className="text-xs font-medium text-[var(--text-muted-40)] border border-[var(--border-subtle)] rounded-full px-3 py-0.5">BMS</span>
            </div>
            <p className="text-[var(--text-muted-60)] mb-6 leading-relaxed">
              I currently serve as the <strong className="text-[var(--text-muted-80)]">Technical Director</strong> at <strong className="text-[var(--text-muted-80)]">BMS</strong>,
              where I oversee the technical and creative aspects of media production and digital content.
            </p>
            <ul className="space-y-2">
              {[
                'Leading the technical production team',
                'Planning and managing photography and videography projects',
                'Directing video production workflows from concept to final delivery',
                'Creating motion graphics and visual effects for digital content',
                'Ensuring high production quality across all media projects',
                'Managing cameras, lighting, audio, and production equipment',
                'Supervising post-production, including editing, color correction, and visual enhancements',
                'Collaborating with creative teams to produce engaging media for campaigns, events, and digital platforms',
                'Mentoring team members and maintaining efficient production processes',
              ].map((r, j) => (
                <li key={j} className="text-[var(--text-muted-70)] leading-relaxed flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-body)]/30 flex-shrink-0 mt-1.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Creative Services Grid */}
      <div className="max-w-5xl mx-auto mb-20">
        <FadeIn y={20} delay={0.25}>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-body)] mb-8 text-center">Creative Services</h3>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-3">
          {(media.services.length ? media.services : ['Graphic Design', 'Photography', 'Videography', 'Motion Graphics']).map((s, i) => (
            <FadeIn key={s} delay={0.03 * i} y={15}>
              <span className="inline-block rounded-full border border-[var(--text-muted-20)] text-[var(--text-muted-70)] px-5 py-2 text-sm hover:border-[var(--text-muted-60)] hover:text-[var(--text-body)] transition-all duration-300 cursor-default">
                {s}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Creative Philosophy */}
      <FadeIn y={20} delay={0.3}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-body)] mb-6">Creative Philosophy</h3>
          <p
            className="text-[var(--text-muted-70)] leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}
          >
            I believe that great design is more than aesthetics — it is about communicating ideas,
            telling stories, and creating memorable experiences. Whether I am designing a brand
            identity, capturing photographs, producing videos, or directing media projects, my goal
            is to create work that is visually compelling, meaningful, and impactful.
          </p>
          <p className="text-[var(--text-muted-60)] leading-relaxed mt-4">
            By combining creativity with technology, I strive to deliver digital experiences that
            inspire, engage, and leave a lasting impression.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}
