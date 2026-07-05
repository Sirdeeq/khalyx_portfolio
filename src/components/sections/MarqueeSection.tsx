import { useEffect, useRef, useState, useMemo } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

const gradients = [
  'from-purple-900/40 to-fuchsia-900/40',
  'from-blue-900/40 to-cyan-900/40',
  'from-orange-900/40 to-red-900/40',
  'from-green-900/40 to-teal-900/40',
  'from-pink-900/40 to-rose-900/40',
  'from-indigo-900/40 to-violet-900/40',
];

export default function MarqueeSection() {
  const { gallery } = usePortfolioData();
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const slides = useMemo(() => {
    const images = gallery.flatMap((item) =>
      (item.assets || []).filter((a) => a.type === 'image').map((a) => ({ src: a.src, label: item.label }))
    )
    if (images.length >= 4) return images
    return gallery.map((item, i) => ({
      src: null as string | null,
      label: item.label,
      gradient: gradients[i % gradients.length],
    }))
  }, [gallery]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const sectionTop = rect.top + scrollY;
      const newOffset = (scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (slides.length < 4) return null

  const mid = Math.ceil(slides.length / 2);
  const row1 = slides.slice(0, mid);
  const row2 = slides.slice(mid);

  const renderSlide = (slide: typeof slides[0], i: number) => {
    if (slide.src) {
      return (
        <img
          key={i}
          src={slide.src}
          alt=""
          className="w-[420px] min-w-[420px] max-w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
          loading="lazy"
        />
      )
    }
    return (
      <div
        key={i}
        className={`w-[420px] min-w-[420px] max-w-[420px] h-[270px] rounded-2xl flex-shrink-0 bg-gradient-to-br ${(slide as any).gradient} border border-[var(--border-subtle)] flex items-center justify-center`}
      >
        <span className="text-[var(--text-muted-30)] text-xs uppercase tracking-wider font-medium px-4 text-center">
          {slide.label}
        </span>
      </div>
    )
  }

  return (
    <section id="media" ref={sectionRef} className="bg-[var(--bg-page)] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      {/* Mobile: horizontal scroll */}
      {row1.length + row2.length > 0 && (
        <div className="flex md:hidden flex-col gap-3 px-5">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2">
            {[...row1, ...row2].map((slide, i) => (
              <div key={i} className="snap-start shrink-0">{renderSlide(slide, i)}</div>
            ))}
          </div>
        </div>
      )}
      {/* Desktop: parallax marquee */}
      <div className="hidden md:block">
        <div
          className="flex gap-3 mb-3"
          style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}
        >
          {[...row1, ...row1, ...row1].map((slide, i) => renderSlide(slide, i))}
        </div>
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${offset * -1}px)`, willChange: 'transform' }}
        >
          {[...row2, ...row2, ...row2].map((slide, i) => renderSlide(slide, i))}
        </div>
      </div>
    </section>
  );
}
