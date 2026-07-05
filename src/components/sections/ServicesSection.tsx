import FadeIn from '../ui/FadeIn';
import { usePortfolioData } from '../../context/PortfolioDataContext';

function padNum(i: number) { return String(i + 1).padStart(2, '0') }

export default function ServicesSection() {
  const { services } = usePortfolioData()
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.name} delay={i * 0.1}>
            <div className="flex gap-4 sm:gap-6 md:gap-10 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)]">
              <span
                className="font-black text-[#0C0C0C] flex-shrink-0 leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {padNum(i)}
              </span>
              <div className="flex flex-col justify-end">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl mt-1"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.description || `Professional ${service.name.toLowerCase()} services tailored to your needs.`}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}