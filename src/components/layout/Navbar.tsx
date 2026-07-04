import { useEffect, useState } from 'react';

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

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

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

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C0C0C]/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-6 md:px-10 h-16">
        <button
          onClick={() => scrollTo('#home')}
          className="hero-heading font-bold text-xl tracking-tight"
        >
          Sirdurx
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`text-sm uppercase tracking-wider font-medium transition-colors duration-200 ${
                active === link.href.replace('#', '')
                  ? 'text-[#D7E2EA]'
                  : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]/80'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-[#D7E2EA] transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#D7E2EA] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#D7E2EA] transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`text-sm uppercase tracking-wider font-medium text-left py-2 transition-colors duration-200 ${
                active === link.href.replace('#', '')
                  ? 'text-[#D7E2EA]'
                  : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]/80'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
