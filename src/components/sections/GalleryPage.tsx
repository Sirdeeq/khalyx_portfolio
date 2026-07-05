import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { galleryApi } from '../../lib/api/gallery'
import { ArrowLeft } from 'lucide-react'

const sizeHints: Record<string, string> = {
  'aspect-[3/4]': '600×800px',
  'aspect-[4/3]': '800×600px',
  'aspect-[4/5]': '800×1000px',
  'aspect-[1/1]': '800×800px',
  'aspect-[16/9]': '1280×720px',
  'aspect-[9/16]': '720×1280px',
  'aspect-[2/3]': '600×900px',
}

const tabs = ['All', 'Images', 'Videos'] as const

export default function GalleryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gallery', 'all'],
    queryFn: () => galleryApi.list({ limit: 100 }),
  })

  const [filter, setFilter] = useState<'All' | 'Images' | 'Videos'>('All')
  const [lightbox, setLightbox] = useState<{ src: string; type: 'image' | 'video'; label: string } | null>(null)

  const close = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [lightbox, close])

  const allItems = data?.data ?? []
  const items = filter === 'All' ? allItems
    : filter === 'Images' ? allItems.filter((i) => (i.type || 'image') === 'image')
    : allItems.filter((i) => i.type === 'video')

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-body)] text-sm transition-colors mb-6">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <h1 className="hero-heading font-black uppercase leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}>
          Gallery
        </h1>
        <p className="text-[var(--text-muted)] text-sm max-w-xl mb-8">
          {allItems.length} {allItems.length === 1 ? 'item' : 'items'} — {allItems.filter((i) => (i.type || 'image') === 'image').length} images, {allItems.filter((i) => i.type === 'video').length} videos
        </p>

        {allItems.length > 0 && (
          <div className="flex gap-2 mb-10">
            {tabs.map((tab) => {
              const count = tab === 'All' ? allItems.length
                : tab === 'Images' ? allItems.filter((i) => (i.type || 'image') === 'image').length
                : allItems.filter((i) => i.type === 'video').length
              return (
                <button key={tab} onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    filter === tab
                      ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-[var(--text-body)] border border-purple-500/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-body)] border border-[var(--border-subtle)]'
                  }`}>
                  {tab} ({count})
                </button>
              )
            })}
          </div>
        )}

        {isLoading ? (
          <p className="text-[var(--text-muted)]">Loading gallery...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted-30)] text-sm">No items found.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((item, i) => (
              <div
                key={item._id || item.label + i}
                onClick={() => item.src && setLightbox({ src: item.src, type: item.type || 'image', label: item.label })}
                className={`break-inside-avoid rounded-2xl overflow-hidden ${item.aspect || 'aspect-[3/4]'} relative group cursor-pointer ${item.src ? '' : 'border border-[var(--border-subtle)]'}`}
              >
                {item.src ? (
                  (item.type || 'image') === 'video' ? (
                    <>
                      {(item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.label} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
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
                    </>
                  ) : (
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--card-bg)] to-white/[0.02] flex flex-col items-center justify-center text-[var(--text-body)] gap-3 group-hover:scale-[1.02] transition-all duration-300" style={{ minHeight: '200px' }}>
                    <span className="text-3xl opacity-50">+</span>
                    <span className="text-sm font-bold drop-shadow-lg px-4 text-center">{item.label}</span>
                    <span className="text-xs opacity-50">{sizeHints[item.aspect] || '600×800px'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

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
    </div>
  )
}
