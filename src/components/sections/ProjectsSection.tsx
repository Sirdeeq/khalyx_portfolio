import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../ui/FadeIn';
import LiveProjectButton from '../ui/LiveProjectButton';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export default function ProjectsSection() {
  const { projects } = usePortfolioData();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const total = projects.length;
  const s0 = useTransform(scrollYProgress, [0 / total, 1 / total], [1 - (total - 1 - 0) * 0.03, 1]);
  const s1 = useTransform(scrollYProgress, [1 / total, 2 / total], [1 - (total - 1 - 1) * 0.03, 1]);
  const s2 = useTransform(scrollYProgress, [2 / total, 3 / total], [1 - (total - 1 - 2) * 0.03, 1]);
  const s3 = useTransform(scrollYProgress, [3 / total, 4 / total], [1 - (total - 1 - 3) * 0.03, 1]);
  const scales = [s0, s1, s2, s3];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </h2>

      <div className="max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <div
            key={project.num}
            className="sticky h-[85vh] flex items-center"
            style={{ top: `${24 + i * 28}px` }}
          >
            <FadeIn delay={i * 0.1} className="w-full">
              <motion.div
                className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
                style={{ scale: scales[i] }}
              >
                <div className="flex justify-between items-start mb-4 sm:mb-6 md:mb-8">
                  <div>
                    <span
                      className="font-black text-[#D7E2EA] leading-none block"
                      style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                    >
                      {project.num}
                    </span>
                    <span className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm">
                      {project.category}
                    </span>
                    <h3
                      className="font-bold uppercase text-[#D7E2EA] leading-tight"
                      style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-[#D7E2EA]/60 text-xs uppercase tracking-wider mt-1">
                      {project.features}
                    </p>
                    <p className="text-[#D7E2EA]/50 text-xs mt-1">
                      {project.role}
                    </p>
                  </div>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <LiveProjectButton />
                    </a>
                  ) : (
                    <LiveProjectButton />
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="w-[40%] flex flex-col gap-4">
                    {project.col1_img1 ? (
                      <img src={project.col1_img1} alt="" className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover" style={{ height: 'clamp(130px, 16vw, 230px)' }} />
                    ) : (
                      <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-[#D7E2EA]/30 text-xs" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
                        <span className="text-lg mb-1">+</span>
                        <span>Screenshot 800×400px</span>
                      </div>
                    )}
                    {project.col1_img2 ? (
                      <img src={project.col1_img2} alt="" className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover" style={{ height: 'clamp(160px, 22vw, 340px)' }} />
                    ) : (
                      <div className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-[#D7E2EA]/30 text-xs" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
                        <span className="text-lg mb-1">+</span>
                        <span>Screenshot 800×600px</span>
                      </div>
                    )}
                  </div>
                  <div className="w-[60%]">
                    {project.col2_img ? (
                      <img src={project.col2_img} alt="" className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-[#D7E2EA]/30 text-xs" style={{ minHeight: 'clamp(300px, 40vw, 600px)' }}>
                        <span className="text-lg mb-1">+</span>
                        <span>Screenshot 800×900px</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        ))}
      </div>
    </section>
  );
}
