import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { blogApi } from '../../lib/api/blog'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogApi.getBySlug(slug!),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
        <p className="text-[#D7E2EA]/50">Loading...</p>
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-[#D7E2EA]">Post not found</h1>
        <Link to="/" className="text-[#B600A8] hover:underline text-sm">Back to home</Link>
      </div>
    )
  }

  const post = data.data

  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      <div className="max-w-3xl mx-auto px-5 py-12 sm:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-[#D7E2EA]/50 hover:text-[#D7E2EA] text-sm transition-colors mb-8">
          <ArrowLeft size={16} /> Back to home
        </Link>

        {post.image && (
          <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-[#18011F] via-[#B600A8]/20 to-[#7621B0]/20">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-4 text-[#D7E2EA]/40 text-sm mb-4">
          {post.readTime && <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>}
          {post.createdAt && <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(post.createdAt).toLocaleDateString()}</span>}
          <span className="text-[#D7E2EA]/30">·</span>
          <span>{post.author}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#D7E2EA] leading-tight mb-6">{post.title}</h1>

        {post.tags?.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#D7E2EA]/50 bg-white/5 rounded-full px-3 py-1">{tag}</span>
            ))}
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[#D7E2EA] mt-8 mb-4">{line.slice(3)}</h2>
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-[#D7E2EA] mt-6 mb-3">{line.slice(4)}</h3>
            if (line.trim() === '') return <br key={i} />
            if (line.startsWith('- ')) return <li key={i} className="text-[#D7E2EA]/70 ml-4 list-disc">{line.slice(2)}</li>
            return <p key={i} className="text-[#D7E2EA]/80 leading-relaxed mb-4">{line}</p>
          })}
        </div>
      </div>
    </div>
  )
}
