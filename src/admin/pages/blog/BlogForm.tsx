import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blogApi } from '../../../lib/api/blog'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import ImageUpload from '../../components/ui/ImageUpload'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

interface BlogFormProps {
  initialData?: {
    _id: string
    title: string
    slug: string
    excerpt: string
    content: string
    image: string
    author: string
    tags: string[]
    readTime: string
    isPublished: boolean
  }
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!initialData

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Sadiq Baba Idris',
    tags: '',
    readTime: '',
    isPublished: true,
  })

  useEffect(() => {
    if (initialData) setForm({
      title: initialData.title,
      slug: initialData.slug,
      excerpt: initialData.excerpt || '',
      content: initialData.content,
      image: initialData.image || '',
      author: initialData.author || 'Sadiq Baba Idris',
      tags: initialData.tags?.join(', ') || '',
      readTime: initialData.readTime || '',
      isPublished: initialData.isPublished,
    })
  }, [initialData])

  const mutation = useMutation({
    mutationFn: () => {
      const data = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) }
      return isEdit ? blogApi.update(initialData!._id, data) : blogApi.create(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      toast.success(isEdit ? 'Post updated' : 'Post created')
      navigate('/admin/blog')
    },
    onError: () => toast.error('Failed to save'),
  })

  const set = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="max-w-4xl">
      <Card title={isEdit ? 'Edit Blog Post' : 'Create Blog Post'}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Title" value={form.title} onChange={(e) => { const v = e.target.value; set('title', v); if (!isEdit) set('slug', slugify(v)) }} placeholder="Post title" />
            <Input label="Slug" value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="post-url-slug" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Author" value={form.author} onChange={(e) => set('author', e.target.value)} />
            <Input label="Read Time" value={form.readTime} onChange={(e) => set('readTime', e.target.value)} placeholder="e.g. 5 min read" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="React, TypeScript, Web"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} placeholder="Brief summary..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Content (Markdown supported)</label>
            <textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={16} placeholder="Write your blog post content here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none font-mono" />
          </div>

          <ImageUpload value={form.image} onChange={(v) => set('image', v)} label="Featured Image (1200×630px)" placeholder="Image URL..." />

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => set('isPublished', e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5" />
            <span className="text-sm text-[#D7E2EA]/70">Published</span>
          </label>

          <div className="flex gap-3">
            <Button onClick={() => mutation.mutate()} loading={mutation.isPending}>{isEdit ? 'Update' : 'Create'}</Button>
            <Button variant="ghost" onClick={() => navigate('/admin/blog')}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
