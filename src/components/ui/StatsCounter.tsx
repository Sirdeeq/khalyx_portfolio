import { useEffect, useRef, useState } from 'react';

interface StatsCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export default function StatsCounter({ end, suffix = '', label }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
        {count}{suffix}
      </span>
      <span className="text-[#D7E2EA]/60 text-sm sm:text-base mt-1 text-center">
        {label}
      </span>
    </div>
  );
}
