import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { projectsApi } from '../../../lib/api/projects'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import ImageUpload from '../../components/ui/ImageUpload'

interface ProjectFormProps {
  initialData?: {
    _id: string
    num: string
    name: string
    category: string
    features: string
    impact: string
    role: string
    url: string
    col1_img1: string
    col1_img2: string
    col2_img: string
  }
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!initialData

  const [form, setForm] = useState({
    num: '', name: '', category: '', features: '', impact: '', role: '', url: '',
    col1_img1: '', col1_img2: '', col2_img: '',
  })

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const mutation = useMutation({
    mutationFn: () => isEdit
      ? projectsApi.update(initialData!._id, form)
      : projectsApi.create(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success(isEdit ? 'Project updated' : 'Project created')
      navigate('/admin/projects')
    },
    onError: () => toast.error('Failed to save'),
  })

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="max-w-3xl">
      <Card title={isEdit ? 'Edit Project' : 'Create Project'}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Number" value={form.num} onChange={(e) => set('num', e.target.value)} placeholder="e.g. 01" />
            <Input label="Name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Project name" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Category" value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="e.g. Fintech" />
            <Input label="Role" value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="Your role" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Features</label>
            <input value={form.features} onChange={(e) => set('features', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Impact (optional)</label>
            <textarea value={form.impact} onChange={(e) => set('impact', e.target.value)} rows={2}
              placeholder="Describe the impact of this project..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <Input label="URL (optional)" value={form.url} onChange={(e) => set('url', e.target.value)} placeholder="https://..." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ImageUpload value={form.col1_img1} onChange={(v) => set('col1_img1', v)} label="Screenshot 1 (800×400px)" placeholder="Image URL..." />
            <ImageUpload value={form.col1_img2} onChange={(v) => set('col1_img2', v)} label="Screenshot 2 (800×600px)" placeholder="Image URL..." />
            <ImageUpload value={form.col2_img} onChange={(v) => set('col2_img', v)} label="Main (800×900px)" placeholder="Image URL..." />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => mutation.mutate()} loading={mutation.isPending}>{isEdit ? 'Update' : 'Create'}</Button>
            <Button variant="ghost" onClick={() => navigate('/admin/projects')}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
