import { useEffect, useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Media', href: '#media' },
  { label: 'Healthcare', href: '#healthcare' },
  { label: 'Contact', href: '#contact' },
];

const mobileNav = [
  { label: 'Home', href: '#home', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )},
  { label: 'About', href: '#about', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )},
  { label: 'Services', href: '#services', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )},
  { label: 'Projects', href: '#projects', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  )},
  { label: 'Contact', href: '#contact', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )},
];

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── TOP BAR (all screens) ─── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[var(--nav-bg)]/95 backdrop-blur-xl shadow-lg shadow-black/10' : 'bg-[var(--nav-bg)]/80 backdrop-blur-md'
      }`}>
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-10 h-14 lg:h-16">
          <button onClick={() => scrollTo('#home')} className="hero-heading font-bold text-lg md:text-xl tracking-tight">
            Sirdurx
          </button>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace('#', '');
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-2 text-sm uppercase tracking-wider font-medium transition-colors duration-200 ${
                    isActive ? 'text-[var(--text-body)]' : 'text-[var(--text-muted)] hover:text-[var(--text-muted-70)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full" />
                  )}
                </button>
              );
            })}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* ── Tablet & mobile top bar extras ── */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        {/* ── Tablet nav strip ── */}
        <div className="hidden md:flex lg:hidden overflow-x-auto hide-scrollbar border-t border-[var(--border-subtle)]">
          <div className="flex gap-1 px-4 py-2.5 mx-auto">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace('#', '');
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-[var(--text-body)] border border-purple-500/30'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--card-bg)] border border-transparent'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ─── Mobile bottom nav ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--nav-bg)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-1">
          {mobileNav.map((item) => {
            const isActive = active === item.href.replace('#', '');
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`relative flex flex-col items-center justify-center gap-0.5 w-14 py-1 rounded-xl transition-colors ${
                  isActive ? 'text-[var(--text-body)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full" />
                )}
                <span className={isActive ? 'drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]' : ''}>
                  {item.icon}
                </span>
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
