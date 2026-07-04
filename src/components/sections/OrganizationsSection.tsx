import FadeIn from '../ui/FadeIn'

const organizations = [
  {
    name: 'Voice of Adolescents',
    role: 'Founder/Community Lead',
    desc: 'Founded a youth empowerment platform that amplifies adolescent voices in healthcare and community development across Nigeria.',
  },
  {
    name: 'Vibe Tribe',
    role: 'Member',
    desc: 'Active member of a creative collective focused on community building, youth engagement, and collaborative projects.',
  },
  {
    name: 'F.O.Z Ambassador',
    role: 'Ambassador',
    desc: 'Represents the Future of Youth (F.O.Z) initiative, promoting youth leadership and community development programs.',
  },
  {
    name: 'Fellow Youth Academy',
    role: 'Fellow',
    desc: 'Selected as a fellow in a youth leadership academy focused on developing skills in advocacy, technology, and community service.',
  },
  {
    name: 'GBV Focal Person',
    role: 'Focal Person',
    desc: 'Serves as a focal person for Gender-Based Violence response, providing support, referral, and advocacy for survivors.',
  },
  {
    name: 'Peer Navigator',
    role: 'Healthcare Advocate',
    desc: 'Works as a peer navigator helping adolescents and young people access healthcare services and navigate the health system.',
  },
]

export default function OrganizationsSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Organizations
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org, i) => (
          <FadeIn key={org.name} delay={0.05 * i} y={20}>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <span className="text-[#D7E2EA] text-lg font-bold">{org.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-[#D7E2EA] mb-1">{org.name}</h3>
              <p className="text-[#D7E2EA]/80 text-sm font-medium mb-3">{org.role}</p>
              <p className="text-[#D7E2EA]/60 text-sm leading-relaxed">{org.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
