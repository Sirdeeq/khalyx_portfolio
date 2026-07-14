import FadeIn from '../ui/FadeIn'

const items = [
  { title: 'Peer Navigator', description: 'Providing peer support and counseling for adolescents living with HIV, supporting treatment adherence and health education.' },
  { title: 'HIV Advocacy', description: 'Championing awareness, reducing stigma, and promoting access to treatment for adolescents and vulnerable populations affected by HIV.' },
  { title: 'TB Awareness', description: 'Educating communities on tuberculosis prevention, screening, and treatment to strengthen public health outcomes.' },
  { title: 'Youth Leadership', description: 'Leading the Voice of Adolescents organization to coordinate programs, strategic planning, and youth empowerment initiatives.' },
  { title: 'Community Health', description: 'Engaging community stakeholders to improve healthcare delivery, service access, and health outcomes for underserved populations.' },
  { title: 'Digital Health Innovation', description: 'Designing healthcare tracking applications to improve patient management, data collection, and treatment adherence monitoring.' },
]

export default function HumanitarianWorkSection() {
  return (
    <section id="humanitarian" className="bg-[var(--bg-page)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Humanitarian & Community Work
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-[var(--text-muted-70)] text-center max-w-3xl mx-auto mb-16 sm:mb-20 leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)' }}
        >
          Committed to improving the lives of children and vulnerable populations through community
          engagement, health advocacy, youth leadership, and digital health innovation.
        </p>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={0.05 * i} y={20}>
            <div className="bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] p-6 h-full">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-body)] mb-2">{item.title}</h3>
              <p className="text-[var(--text-muted-70)] text-sm leading-relaxed">{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
