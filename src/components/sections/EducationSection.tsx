import FadeIn from '../ui/FadeIn'

const education = [
  {
    title: 'Diploma in Computer Science',
    org: 'Kano State Polytechnic',
    period: '2021 – 2023',
    type: 'degree',
    description:
      'Developed practical knowledge in computer science, software development, programming, database systems, networking, and information technology. Strengthened skills through personal projects and real-world software development.',
  },
  {
    title: 'Senior Secondary Education (WAEC & NECO)',
    org: 'Imanil Haq Secondary School',
    period: 'Completed',
    type: 'school',
    description:
      'Obtained both the West African Senior School Certificate Examination (WAEC) and the National Examinations Council (NECO) certificates.',
  },
  {
    title: 'Secondary Education',
    org: 'Gifted High School, Kano',
    period: 'Completed',
    type: 'school',
    description:
      'Completed part of my secondary education, building a strong academic foundation before continuing my studies.',
  },
  {
    title: 'Junior Secondary School (JSS1 – JSS3)',
    org: 'Trinity International School, Nasarawa',
    period: 'Completed',
    type: 'school',
    description:
      'Completed my junior secondary education, where I developed a growing interest in technology, creativity, and leadership.',
  },
  {
    title: 'Nursery & Primary Education',
    org: 'Al-Azhar Nursery & Primary School, Kano',
    period: 'Completed',
    type: 'school',
    description:
      'Completed my nursery and primary education, laying the foundation for my academic journey and personal development.',
  },
]

const training = [
  {
    title: 'Peer Navigation Training',
    period: '2025',
    description:
      'Received practical training in peer navigation, focusing on supporting adolescents and people living with HIV through treatment adherence, patient follow-up, psychosocial support, community engagement, and healthcare service linkage.',
  },
  {
    title: 'Social Media Health Advocacy Training',
    period: '2020',
    description:
      'Completed training on using digital platforms and social media to promote public health awareness, educate communities, combat misinformation, advocate for HIV and TB awareness, and encourage positive health behaviors among young people.',
  },
]

export default function EducationSection() {
  return (
    <section className="bg-[var(--bg-page)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Education & Training
        </h2>
      </FadeIn>

      {/* Education Timeline */}
      <div className="max-w-4xl mx-auto mb-20">
        <FadeIn y={20} delay={0.05}>
          <p className="text-[var(--text-muted-60)] text-center max-w-2xl mx-auto mb-12 leading-relaxed" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}>
            My educational journey has provided me with a strong foundation in both academics and
            technology, shaping my passion for software development, digital media, and community
            leadership.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

          {education.map((item, i) => (
            <FadeIn key={item.title} delay={0.05 * i} y={20}>
              <div className="flex items-start gap-5 sm:gap-8 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold z-10"
                >
                  {item.type === 'degree' ? 'D' : 'S'}
                </div>
                <div className="bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] p-5 flex-1 hover:border-[var(--border-subtle)] transition-all duration-300">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-body)]">{item.title}</h3>
                  <p className="text-[var(--text-muted-70)] text-sm mt-1">{item.org}</p>
                  <span className="inline-block text-[var(--text-muted-40)] text-xs mt-2 font-medium">
                    {item.period}
                  </span>
                  <p className="text-[var(--text-muted-60)] text-sm mt-3 leading-relaxed border-t border-[var(--border-subtle)] pt-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Professional Training */}
      <div className="max-w-4xl mx-auto">
        <FadeIn y={20} delay={0.1}>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-body)] mb-2 text-center">Professional Training</h3>
          <p className="text-[var(--text-muted-60)] text-center max-w-2xl mx-auto mb-12 leading-relaxed text-sm">
            Although my experience has largely been built through hands-on work and community service,
            I have also participated in specialized training programs that strengthened my knowledge
            in healthcare advocacy and community engagement.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {training.map((item, i) => (
            <FadeIn key={item.title} delay={0.1 * i} y={20}>
              <div className="bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] p-6 h-full hover:border-[var(--border-subtle)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-bold text-[var(--text-body)]">{item.title}</h4>
                  <span className="text-xs text-[var(--text-muted-40)] border border-[var(--border-subtle)] rounded-full px-3 py-0.5 flex-shrink-0">
                    {item.period}
                  </span>
                </div>
                <p className="text-[var(--text-muted-60)] text-sm leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
