import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'

const sizeHints: Record<string, string> = {
  'aspect-[3/4]': '600×800px',
  'aspect-[4/3]': '800×600px',
  'aspect-[4/5]': '800×1000px',
}

export default function GallerySection() {
  const { gallery } = usePortfolioData()
  return (
    <section id="gallery" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Gallery
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {gallery.map((item, i) => (
          <FadeIn key={item.label + i} delay={0.05 * i}>
            {item.src ? (
              <img
                src={item.src}
                alt={item.label}
                className={`w-full rounded-2xl object-cover ${item.aspect} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
              />
            ) : (
              <div
                className={`bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 ${item.aspect} flex flex-col items-center justify-center text-[#D7E2EA] gap-3 hover:border-white/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
              >
                <span className="text-3xl opacity-30">+</span>
                <span className="text-sm font-semibold drop-shadow-lg px-4 text-center">{item.label}</span>
                <span className="text-[10px] opacity-30">{sizeHints[item.aspect] || '600×800px'}</span>
              </div>
            )}
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
