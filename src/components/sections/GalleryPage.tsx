import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { galleryApi } from '../../lib/api/gallery'
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react'

const tabs = ['All', 'Images', 'Videos'] as const

export default function GalleryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['gallery', 'all'],
    queryFn: () => galleryApi.list({ limit: 100 }),
  })

  /* ── desktop state ── */
  const [filter, setFilter] = useState<'All' | 'Images' | 'Videos'>('All')
  const [lightbox, setLightbox] = useState<{ src: string; type: 'image' | 'video'; label: string } | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [lightbox, closeLightbox])

  /* ── mobile feed state ── */
  const [muted, setMuted] = useState(true)
  const [activeItemIdx, setActiveItemIdx] = useState(0)
  const feedRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map())
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  /* Track active item via IntersectionObserver */
  useEffect(() => {
    const feed = feedRef.current
    if (!feed || !isMobile) return
    const items = feed.querySelectorAll<HTMLDivElement>('[data-feed-item]')
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLDivElement).dataset.idx)
            setActiveItemIdx(idx)
          }
        }
      },
      { root: feed, threshold: 0.6 }
    )

    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [data, isMobile])

  /* Autoplay videos on mobile when active */
  useEffect(() => {
    if (!isMobile) return
    const allItems = data?.data ?? []
    const item = allItems[activeItemIdx]
    if (!item) return

    const videos = item.assets?.filter((a) => a.type === 'video') || []
    const otherVideos: HTMLVideoElement[] = []

    allItems.forEach((it, idx) => {
      it.assets?.forEach((a) => {
        const el = videoRefs.current.get(a.src)
        if (!el) return
        if (a.type === 'video') {
          if (idx === activeItemIdx) {
            el.muted = muted
            el.play().catch(() => {})
          } else {
            el.pause()
            otherVideos.push(el)
          }
        }
      })
    })

    return () => {
      videos.forEach((v) => {
        const el = videoRefs.current.get(v.src)
        el?.pause()
      })
      otherVideos.forEach((el) => el.play().catch(() => {}))
    }
  }, [activeItemIdx, data, muted, isMobile])

  /* ── data ── */
  const allItems = data?.data ?? []
  const filtered = filter === 'All' ? allItems
    : filter === 'Images' ? allItems.filter((i) => i.assets?.some((a) => a.type === 'image'))
    : allItems.filter((i) => i.assets?.some((a) => a.type === 'video'))

  const gridItems = filtered

  const getVideoRef = (src: string) => (el: HTMLVideoElement | null) => {
    if (el) videoRefs.current.set(src, el)
    else videoRefs.current.delete(src)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* ─── DESKTOP VIEW ─── */}
      <div className="hidden md:block max-w-6xl mx-auto px-5 py-12 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-body)] text-sm transition-colors mb-6">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <h1 className="hero-heading font-black uppercase leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}>
          Gallery
        </h1>
        <p className="text-[var(--text-muted)] text-sm max-w-xl mb-8">
          {allItems.length} {allItems.length === 1 ? 'item' : 'items'} — {allItems.reduce((s, i) => s + (i.assets?.filter(a => a.type === 'image').length || 0), 0)} images, {allItems.reduce((s, i) => s + (i.assets?.filter(a => a.type === 'video').length || 0), 0)} videos
        </p>

        {allItems.length > 0 && (
          <div className="flex gap-2 mb-10">
            {tabs.map((tab) => {
              const count = tab === 'All' ? allItems.length
                : tab === 'Images' ? allItems.filter((i) => i.assets?.some((a) => a.type === 'image')).length
                : allItems.filter((i) => i.assets?.some((a) => a.type === 'video')).length
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
        ) : gridItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted-30)] text-sm">No items found.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {gridItems.map((item, i) => {
              const first = item.assets?.[0]
              const count = item.assets?.length || 0
              return (
                <div
                  key={item._id || item.label + i}
                  onClick={() => {
                    if (!first?.src) return
                    if (first.type === 'video') setLightbox({ src: first.src, type: 'video', label: item.label })
                    else setLightbox({ src: first.src, type: 'image', label: item.label })
                  }}
                  className={`break-inside-avoid rounded-2xl overflow-hidden ${item.aspect || 'aspect-[3/4]'} relative group cursor-pointer ${first?.src ? '' : 'border border-[var(--border-subtle)]'}`}
                >
                  {first?.src ? (
                    first.type === 'video' ? (
                      <>
                        {first.thumbnail ? (
                          <img src={first.thumbnail} alt={item.label} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                        ) : (
                          <video src={first.src} muted playsInline preload="metadata" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#0C0C0C] ml-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img src={first.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                    )
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--card-bg)] to-white/[0.02] flex flex-col items-center justify-center text-[var(--text-body)] gap-3" style={{ minHeight: '200px' }}>
                      <span className="text-3xl opacity-50">+</span>
                      <span className="text-sm font-bold drop-shadow-lg px-4 text-center">{item.label}</span>
                    </div>
                  )}
                  {count > 1 && (
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                      {count} files
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ─── MOBILE TIKTOK FEED ─── */}
      <div className="md:hidden fixed inset-0 bg-black z-40 flex flex-col">
        {/* Top overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent px-4 pt-12 pb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors">
            <ArrowLeft size={14} /> Back
          </Link>
          <h1 className="text-white font-bold text-sm mt-1">Gallery</h1>
        </div>

        {/* Feed */}
        <div ref={feedRef} className="flex-1 overflow-y-auto snap-y snap-mandatory hide-scrollbar">
          {allItems.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-white/40 text-sm">No items yet</p>
            </div>
          ) : (
            allItems.map((item, idx) => {
              const assets = item.assets || []
              return (
                <div key={item._id || idx} data-feed-item data-idx={idx} className="h-screen w-full snap-start snap-aligned relative bg-black flex flex-col">
                  {/* Assets horizontal swipe */}
                  {assets.length > 0 ? (
                    <div className="flex-1 relative overflow-hidden">
                      <div className="h-full w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar flex">
                        {assets.map((asset, ai) => (
                          <div key={ai} className="h-full w-full flex-shrink-0 snap-start snap-aligned relative flex items-center justify-center bg-black">
                            {asset.type === 'video' ? (
                              <video
                                ref={getVideoRef(asset.src)}
                                src={asset.src}
                                loop
                                playsInline
                                muted={muted}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <img src={asset.src} alt="" className="w-full h-full object-contain" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Asset dots */}
                      {assets.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {assets.map((_, ai) => (
                            <span key={ai} className="w-1.5 h-1.5 rounded-full bg-white/60" />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-white/30 text-sm">{item.label}</span>
                    </div>
                  )}

                  {/* Item label */}
                  <div className="bg-gradient-to-t from-black/80 to-transparent px-4 pt-8 pb-4">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/50 text-xs mt-0.5">{assets.length} asset{assets.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Right side: item dots + mute */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
          {allItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                feedRef.current?.querySelector<HTMLDivElement>(`[data-idx="${idx}"]`)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === activeItemIdx ? 'bg-white scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Mute toggle */}
        {allItems.some((i) => i.assets?.some((a) => a.type === 'video')) && (
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-20 right-3 z-20 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      {/* ─── Desktop Lightbox ─── */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm transition-colors z-10">
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
