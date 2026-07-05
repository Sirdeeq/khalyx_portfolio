import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const { testimonials } = usePortfolioData()

  if (!testimonials.length) return null

  return (
    <section id="testimonials" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Testimonials
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item, i) => (
          <FadeIn key={item.name} y={20} delay={i * 0.1}>
            <div className="bg-[#0C0C0C]/5 rounded-2xl p-8 h-full flex flex-col">
              <Quote className="text-[#0C0C0C]/10 mb-4" size={32} />
              <p className="text-[#0C0C0C]/70 italic leading-relaxed flex-1 text-sm sm:text-base">"{item.text}"</p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[rgba(12,12,12,0.1)]">
                <div className="w-10 h-10 rounded-full bg-[#0C0C0C]/10 flex items-center justify-center text-[#0C0C0C] font-bold text-sm flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[#0C0C0C] font-medium text-sm">{item.name}</p>
                  <p className="text-[#0C0C0C]/50 text-xs">{[item.role, item.company].filter(Boolean).join(' · ')}</p>
                </div>
                {item.rating && <div className="ml-auto text-yellow-500 text-xs">{'★'.repeat(item.rating)}</div>}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
