import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { blogApi } from '../../lib/api/blog'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

const allImages = (post: { images?: string[]; image?: string }) => {
  const imgs = (post.images || []).filter(Boolean)
  if (post.image && !imgs.includes(post.image)) imgs.unshift(post.image)
  return imgs
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogApi.getBySlug(slug!),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Loading...</p>
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-[var(--text-body)]">Post not found</h1>
        <Link to="/" className="text-[#B600A8] hover:underline text-sm">Back to home</Link>
      </div>
    )
  }

  const post = data.data
  const images = allImages(post)

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="max-w-3xl mx-auto px-5 py-12 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-body)] text-sm transition-colors mb-8">
          <ArrowLeft size={16} /> Back to home
        </Link>

        {images.length > 0 && (
          <div className="grid gap-4 mb-8">
            {images.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#18011F] via-[#B600A8]/20 to-[#7621B0]/20">
                <img src={src} alt={`${post.title} image`} className="w-full h-48 object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-[var(--text-muted-40)] text-sm mb-4">
          {post.readTime && <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>}
          {post.createdAt && <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(post.createdAt).toLocaleDateString()}</span>}
          <span className="text-[var(--text-muted-30)]">·</span>
          <span>{post.author}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-body)] leading-tight mb-6">{post.title}</h1>

        {post.tags?.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-[var(--text-muted)] bg-[var(--card-bg)] rounded-full px-3 py-1">{tag}</span>
            ))}
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[var(--text-body)] mt-8 mb-4">{line.slice(3)}</h2>
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-[var(--text-body)] mt-6 mb-3">{line.slice(4)}</h3>
            if (line.trim() === '') return <br key={i} />
            if (line.startsWith('- ')) return <li key={i} className="text-[var(--text-muted-70)] ml-4 list-disc">{line.slice(2)}</li>
            return <p key={i} className="text-[var(--text-muted-80)] leading-relaxed mb-4">{line}</p>
          })}
        </div>
      </div>
    </div>
  )
}
