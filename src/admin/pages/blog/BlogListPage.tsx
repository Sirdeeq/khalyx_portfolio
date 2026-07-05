import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogApi } from '../../../lib/api/blog'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Pagination from '../../components/ui/Pagination'

export default function BlogListPage() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { data, isLoading } = useQuery({ queryKey: ['blog', page], queryFn: () => blogApi.list({ page, limit: 20 }) })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => blogApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['blog'] }); toast.success('Deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed'),
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D7E2EA]">Blog Posts</h2>
        <Link to="/admin/blog/create"><Button size="sm">New Post</Button></Link>
      </div>

      {isLoading ? <p className="text-[#D7E2EA]/50">Loading...</p> : (
        <div className="space-y-4">
          {(data?.data ?? []).map((post) => (
            <div key={post._id} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[#D7E2EA] font-bold">{post.title}</h3>
                    <Badge variant={post.isPublished ? 'success' : 'warning'}>{post.isPublished ? 'Published' : 'Draft'}</Badge>
                  </div>
                  <p className="text-[#D7E2EA]/40 text-xs">{post.slug} · {post.readTime || '—'}</p>
                  {post.excerpt && <p className="text-[#D7E2EA]/60 text-sm mt-1 line-clamp-2">{post.excerpt}</p>}
                  {post.tags?.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-[#D7E2EA]/40 bg-white/5 rounded-full px-2 py-0.5">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-3">
                  <Link to={`/admin/blog/edit/${post._id}`}>
                    <button className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors">Edit</button>
                  </Link>
                  <button onClick={() => setDeleteId(post._id)} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {data?.data?.length === 0 && <p className="text-[#D7E2EA]/30 text-center py-8">No blog posts yet</p>}
          <Pagination page={data?.pagination?.page ?? 1} totalPages={data?.pagination?.totalPages ?? 1} onPageChange={setPage} />
        </div>
      )}

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} message="Delete this blog post?" loading={deleteMutation.isPending} />
    </div>
  )
}
