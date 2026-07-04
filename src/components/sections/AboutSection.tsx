import FadeIn from '../ui/FadeIn';
import ContactButton from '../ui/ContactButton';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function AboutSection() {
  const { about } = usePortfolioData();
  return (
    <section id="about" className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20">
      <FadeIn delay={0.1} x={-30} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-full"
        />
      </FadeIn>

      <FadeIn delay={0.2} x={-20} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-full"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={30} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-full"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={20} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] z-0">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-full"
        />
      </FadeIn>

      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4">
        <FadeIn delay={0} y={40} className="w-full max-w-4xl mx-auto">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About Me
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20} className="w-full mt-8 sm:mt-10 md:mt-12 overflow-hidden">
          <div
            className="whitespace-nowrap flex gap-0"
            style={{ animation: 'marquee 120s linear infinite' }}
          >
            <span
              className="text-[#D7E2EA] font-medium leading-relaxed flex-shrink-0"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)', paddingRight: '4rem' }}
            >
              {about.bio}
            </span>
            <span
              className="text-[#D7E2EA] font-medium leading-relaxed flex-shrink-0"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            >
              {about.bio}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={20} className="w-full max-w-2xl mx-auto mt-6 sm:mt-8">
          <p
            className="text-[#D7E2EA] font-light text-center leading-relaxed"
            style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)' }}
          >
            {about.passion}
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20} className="w-full max-w-3xl mx-auto mt-8 sm:mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            {about.values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] px-5 py-2 text-sm font-medium"
              >
                {value}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.4} y={20} className="mt-12 sm:mt-16">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
