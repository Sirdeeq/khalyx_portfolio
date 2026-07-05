import { useEffect, useRef, useState, useMemo } from 'react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function MarqueeSection() {
  const { gallery } = usePortfolioData();
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const gifImages = useMemo(() => {
    const images = gallery.flatMap((item) =>
      (item.assets || []).filter((a) => a.type === 'image').map((a) => a.src)
    ).filter(Boolean)
    return images.length >= 4 ? images : [
      'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
      'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
      'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
      'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    ];
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

  const mid = Math.ceil(gifImages.length / 2);
  const row1 = gifImages.slice(0, mid);
  const row2 = gifImages.slice(mid);

  return (
    <section id="media" ref={sectionRef} className="bg-[var(--bg-page)] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div
        className="flex gap-3 mb-3"
        style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}
      >
        {[...row1, ...row1, ...row1].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>
      <div
        className="flex gap-3"
        style={{ transform: `translateX(${offset * -1}px)`, willChange: 'transform' }}
      >
        {[...row2, ...row2, ...row2].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
