import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { blogApi } from '../../lib/api/blog'
import { ArrowLeft, Clock, ArrowRight, Calendar } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function BlogPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['blog', 'all'],
    queryFn: () => blogApi.list({ limit: 50 }),
  })

  const [tagFilter, setTagFilter] = useState<string | null>(null)

  const posts = useMemo(() => {
    const all = data?.data ?? []
    const sorted = [...all].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    if (tagFilter) return sorted.filter((p) => p.tags?.includes(tagFilter))
    return sorted
  }, [data, tagFilter])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    for (const p of data?.data ?? []) p.tags?.forEach((t) => tags.add(t))
    return Array.from(tags).sort()
  }, [data])

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-body)] text-sm transition-colors mb-6">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <h1 className="hero-heading font-black uppercase leading-none tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}>
          Blog
        </h1>
        <p className="text-[var(--text-muted)] text-sm max-w-xl mb-10">
          Thoughts on software engineering, healthcare innovation, and career growth.
        </p>

        {allTags.length > 0 && (
          <div className="flex gap-2 mb-10 flex-wrap">
            <button onClick={() => setTagFilter(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                tagFilter === null
                  ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-[var(--text-body)] border border-purple-500/30'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-body)] border border-[var(--border-subtle)]'
              }`}>
              All
            </button>
            {allTags.map((tag) => (
              <button key={tag} onClick={() => setTagFilter(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  tagFilter === tag
                    ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-[var(--text-body)] border border-purple-500/30'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-body)] border border-[var(--border-subtle)]'
                }`}>
                {tag}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <p className="text-[var(--text-muted)]">Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted-30)] text-sm">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post._id || post.slug} to={`/blog/${post.slug}`} className="block h-full group">
                <div className="bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] overflow-hidden hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#18011F] via-[#B600A8]/30 to-[#7621B0]/30 flex items-center justify-center overflow-hidden">
                    {(post.images?.[0] || post.image) ? (
                      <img src={post.images?.[0] || post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    ) : (
                      <span className="text-[var(--text-muted-20)] text-4xl font-black">S</span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[var(--text-muted-40)] text-xs mb-3">
                      {post.createdAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
