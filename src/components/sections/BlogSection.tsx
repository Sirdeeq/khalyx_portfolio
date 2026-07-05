import { Link } from 'react-router-dom'
import FadeIn from '../ui/FadeIn'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { Clock, ArrowRight } from 'lucide-react'

export default function BlogSection() {
  const { blogPosts } = usePortfolioData()

  if (!blogPosts.length) return null

  const posts = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="bg-[var(--bg-page)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Blog
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <FadeIn key={post._id || post.slug} y={20} delay={i * 0.1}>
            <Link to={`/blog/${post.slug}`} className="block h-full">
              <div className="bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] overflow-hidden hover:border-[var(--border-subtle)] hover:bg-[var(--card-bg)] transition-all duration-300 group h-full flex flex-col">
                <div className="aspect-[16/9] bg-gradient-to-br from-[#18011F] via-[#B600A8]/30 to-[#7621B0]/30 flex items-center justify-center">
                  {(post.images?.[0] || post.image) ? (
                    <img src={post.images?.[0] || post.image} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--text-muted-20)] text-4xl font-black">S</span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[var(--text-muted-40)] text-xs mb-3">
                    {post.readTime && <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>}
                  </div>
                  <h3 className="text-[var(--text-body)] font-bold text-base mb-2 line-clamp-2 group-hover:text-white transition-colors">{post.title}</h3>
                  {post.excerpt && <p className="text-[var(--text-muted-60)] text-sm line-clamp-2 flex-1">{post.excerpt}</p>}
                  {post.tags?.length > 0 && (
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] text-[var(--text-muted-40)] bg-[var(--card-bg)] rounded-full px-2 py-0.5">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[#B600A8] text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {blogPosts.length > 3 && (
        <FadeIn y={20} delay={0.3}>
          <div className="text-center mt-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-body)] text-sm transition-colors">
              View all posts <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      )}
    </section>
  )
}
