import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { blogApi } from '../../../lib/api/blog'
import BlogForm from './BlogForm'

export default function BlogEditPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogApi.get(id!),
    enabled: !!id,
  })

  if (isLoading) return <p className="text-[#D7E2EA]/50">Loading...</p>
  if (!data?.data) return <p className="text-[#D7E2EA]/50">Post not found</p>

  return <BlogForm initialData={data.data} />
}
