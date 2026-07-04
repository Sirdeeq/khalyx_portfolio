import FadeIn from '../ui/FadeIn'
import TypewriterHeading from '../ui/TypewriterHeading'
import Magnet from '../ui/Magnet'
import { usePortfolioData } from '../../context/PortfolioDataContext'

function scrollTo(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const { hero } = usePortfolioData()

  return (
    <section id="home" className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-10 relative">
        <FadeIn delay={0.15} y={40} className="relative">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="overflow-hidden">
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-right text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
                <TypewriterHeading />
              </h1>
            </div>
            <Magnet padding={100} strength={2}>
              <img
                src={hero.portrait || 'https://ui-avatars.com/api/?name=Sadiq+Baba+Idris&background=BBCCD7&color=0C0C0C&size=256'}
                alt="Sadiq Baba Idris"
                className="w-[16vw] sm:w-[14vw] md:w-[12vw] lg:w-[10vw] rounded-full flex-shrink-0"
              />
            </Magnet>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p className="text-[#D7E2EA] font-medium text-center mt-2 text-sm sm:text-base md:text-lg">
            Sadiq Baba Idris
          </p>
        </FadeIn>

        <FadeIn delay={0.25} y={20}>
          <p
            className="text-[#D7E2EA]/60 font-light uppercase tracking-wide text-center max-w-4xl mx-auto mt-4"
            style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}
          >
            {hero.roles.join(' \u2022 ')}
          </p>
        </FadeIn>

        <FadeIn delay={0.35} y={20} className="mt-6 sm:mt-8">
          <p
            className="text-[#D7E2EA] font-light text-center leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1.1rem)' }}
          >
            {hero.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.45} y={20} className="mt-8 sm:mt-10">
          <div className="flex flex-row gap-4 items-center justify-center">
            <button
              type="button"
              onClick={() => scrollTo('#projects')}
              className="rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow:
                  '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid white',
                outlineOffset: '-3px',
              }}
            >
              View Portfolio
            </button>
            <a
              href="/Sadiq_Baba_Idris_Portfolio.docx"
              download
              className="rounded-full font-medium uppercase tracking-widest text-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base border-2 border-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors duration-200 inline-block"
            >
              Download CV
            </a>
            <button
              type="button"
              onClick={() => scrollTo('#contact')}
              className="rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
              style={{
                background:
                  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow:
                  '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid white',
                outlineOffset: '-3px',
              }}
            >
              Contact Me
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
