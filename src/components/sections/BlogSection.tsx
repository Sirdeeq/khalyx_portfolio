import FadeIn from '../ui/FadeIn'

const posts = [
  {
    title: 'Building Scalable Web Applications with React and Next.js',
    category: 'Technology',
    excerpt: 'Explore the architectural patterns and best practices for building production-ready web applications using React and Next.js, from project structure to deployment.',
    date: 'Coming Soon',
  },
  {
    title: 'The Role of Technology in Modern Healthcare',
    category: 'Healthcare Tech',
    excerpt: 'How digital tools, telemedicine, and health information systems are transforming healthcare delivery and patient outcomes across the globe.',
    date: 'Coming Soon',
  },
  {
    title: "Getting Started with Motion Graphics: A Beginner's Guide",
    category: 'Design',
    excerpt: 'A practical introduction to motion graphics covering essential tools, techniques, and principles for creating engaging animated content.',
    date: 'Coming Soon',
  },
  {
    title: 'My Journey as a Full Stack Developer in Nigeria',
    category: 'Career',
    excerpt: 'Personal insights and lessons learned from navigating the tech industry in Nigeria, from starting out to building real-world solutions.',
    date: 'Coming Soon',
  },
]

const categoryColors: Record<string, string> = {
  Technology: 'from-blue-600 to-cyan-600',
  'Healthcare Tech': 'from-emerald-600 to-teal-600',
  Design: 'from-violet-600 to-purple-600',
  Career: 'from-amber-600 to-orange-600',
}

export default function BlogSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Blog
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post, i) => (
          <FadeIn key={post.title} delay={0.05 * i} y={20}>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 group h-full">
              <div className={`h-2 bg-gradient-to-r ${categoryColors[post.category]}`} />
              <div className="p-6">
                <span className={`inline-block text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#D7E2EA] mt-3 mb-2 group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#D7E2EA]/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-[#D7E2EA]/40 text-xs">{post.date}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
