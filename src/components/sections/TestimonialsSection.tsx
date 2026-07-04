import { useEffect, useRef, useState } from 'react'
import FadeIn from '../ui/FadeIn'

const testimonials = [
  {
    quote: 'An exceptional developer who delivered our healthcare platform on time. His understanding of both technology and healthcare is remarkable.',
    author: 'Healthcare Client',
  },
  {
    quote: 'Working with Sadiq was a great experience. He transformed our vision into a beautiful, functional web application.',
    author: 'Tech Startup',
  },
  {
    quote: 'The motion graphics and video content he created for our brand were outstanding. Highly creative and professional.',
    author: 'Creative Agency',
  },
  {
    quote: "Sadiq's expertise in React and Next.js helped us build a scalable platform that our users love.",
    author: 'EdTech Partner',
  },
  {
    quote: 'His dedication to community health advocacy combined with technical skills makes him a unique and valuable partner.',
    author: 'NGO Partner',
  },
  {
    quote: 'Professional, reliable, and incredibly talented. The UI/UX work he did for our platform exceeded expectations.',
    author: 'Business Client',
  },
]

const duplicated = [...testimonials, ...testimonials, ...testimonials]

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el || isPaused) return

    let animationId: number
    const speed = 0.5

    const animate = () => {
      if (el) {
        el.scrollLeft += speed
        if (el.scrollLeft >= el.scrollWidth / 3) {
          el.scrollLeft = 0
        }
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Testimonials
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicated.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 min-w-[320px] sm:min-w-[360px] max-w-sm flex-shrink-0 hover:border-white/20 transition-all duration-300"
            >
              <svg className="w-8 h-8 text-[#D7E2EA]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <p className="text-[#D7E2EA]/80 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-[#D7E2EA] text-sm font-bold">{t.author.charAt(0)}</span>
                </div>
                <span className="text-[#D7E2EA] font-medium text-sm">{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
