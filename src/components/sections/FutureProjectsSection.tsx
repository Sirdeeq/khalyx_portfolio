import FadeIn from '../ui/FadeIn'

const projects = [
  {
    title: 'AI Healthcare Platform',
    desc: 'AI-powered healthcare diagnostics and patient management system leveraging machine learning for early detection and personalized treatment plans.',
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    title: 'AI Video Generator',
    desc: 'Automated video creation platform using artificial intelligence to generate professional-grade videos from text prompts and templates.',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'FinTech Products',
    desc: 'Next-generation financial technology solutions including digital banking, payment processing, and decentralized finance applications.',
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    title: 'SaaS Applications',
    desc: 'Scalable software-as-a-service platforms designed for businesses of all sizes, with focus on performance, security, and user experience.',
    gradient: 'from-violet-600 to-purple-600',
  },
  {
    title: 'Creative Agency',
    desc: 'Full-service digital creative agency offering web development, motion graphics, branding, and digital marketing solutions.',
    gradient: 'from-rose-600 to-pink-600',
  },
  {
    title: 'Healthcare Information System',
    desc: 'Comprehensive healthcare data management platform for patient records, treatment tracking, and health analytics.',
    gradient: 'from-amber-600 to-orange-600',
  },
]

export default function FutureProjectsSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Future Projects
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <FadeIn key={project.title} delay={0.05 * i} y={20}>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 group h-full">
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#D7E2EA] mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#D7E2EA]/60 text-sm leading-relaxed">{project.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
