import { useState, useEffect, useCallback } from 'react'
import FadeIn from '../ui/FadeIn'
import { ArrowRight } from 'lucide-react'
import { usePortfolioData } from '../../context/PortfolioDataContext'

const sizeHints: Record<string, string> = {
  'aspect-[3/4]': '600×800px',
  'aspect-[4/3]': '800×600px',
  'aspect-[4/5]': '800×1000px',
  'aspect-[1/1]': '800×800px',
  'aspect-[16/9]': '1280×720px',
  'aspect-[9/16]': '720×1280px',
  'aspect-[2/3]': '600×900px',
}

export default function GallerySection() {
  const { gallery } = usePortfolioData()
  const [lightbox, setLightbox] = useState<{ src: string; type: 'image' | 'video'; label: string } | null>(null)

  const close = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [lightbox, close])

  const visible = gallery.slice(0, 6)

  return (
    <section id="gallery" className="bg-[var(--bg-page)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Gallery
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {visible.map((item, i) => {
          const first = item.assets?.[0]
          const count = item.assets?.length || 0
          return (
            <div
              key={item.label + i}
              onClick={() => { if (count > 0) window.location.href = '/gallery' }}
              className={`block w-full rounded-2xl overflow-hidden ${item.aspect} relative group ${count > 0 ? 'cursor-pointer' : 'border border-[var(--border-subtle)]'}`}
            >
              {first?.src ? (
                first.type === 'video' ? (
                  <>
                    {(first.thumbnail ? (
                      <img src={first.thumbnail} alt={item.label} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--card-bg)] to-black/60 flex items-center justify-center">
                        <span className="text-[var(--text-body)] text-lg font-semibold drop-shadow-lg px-4 text-center">{item.label}</span>
                      </div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#0C0C0C] ml-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {count > 1 && (
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {count} files
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <img src={first.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    {count > 1 && (
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {count} files
                      </span>
                    )}
                  </>
                )
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--card-bg)] to-white/[0.02] flex flex-col items-center justify-center text-[var(--text-body)] gap-3 group-hover:scale-[1.02] transition-all duration-300">
                  <span className="text-3xl opacity-50">+</span>
                  <span className="text-sm font-bold drop-shadow-lg px-4 text-center">{item.label}</span>
                  <span className="text-xs opacity-50">{sizeHints[item.aspect] || '600×800px'}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {gallery.length > 6 && (
        <FadeIn y={20} delay={0.3}>
          <div className="text-center mt-10">
            <a href="/gallery" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-body)] text-sm transition-colors">
              View all <ArrowRight size={14} />
            </a>
          </div>
        </FadeIn>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={close}>
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button onClick={close} className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm transition-colors z-10">
              Close [Esc]
            </button>
            {lightbox.type === 'video' ? (
              <video src={lightbox.src} controls autoPlay className="w-full max-h-[85vh] rounded-2xl" style={{ maxHeight: '85vh' }} />
            ) : (
              <img src={lightbox.src} alt={lightbox.label} className="w-full max-h-[85vh] object-contain rounded-2xl" />
            )}
            <p className="text-white/90 text-sm text-center mt-4 font-medium">{lightbox.label}</p>
          </div>
        </div>
      )}
    </section>
  )
}
