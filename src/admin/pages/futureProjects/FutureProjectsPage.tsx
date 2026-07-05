import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { futureProjectsApi } from '../../../lib/api/futureProjects'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Badge from '../../components/ui/Badge'

const statusColors: Record<string, 'warning' | 'info' | 'success'> = {
  'Planned': 'warning',
  'In Development': 'info',
  'Coming Soon': 'success',
}

export default function FutureProjectsPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['futureProjects'], queryFn: futureProjectsApi.list })
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', description: '', category: '', status: 'Planned' as const })

  const resetForm = () => { setForm({ name: '', description: '', category: '', status: 'Planned' }); setEditId(null) }

  const openEdit = (item: any) => {
    setForm({ name: item.name, description: item.description || '', category: item.category || '', status: item.status || 'Planned' })
    setEditId(item._id)
    setIsOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: () => editId
      ? futureProjectsApi.update(editId, form)
      : futureProjectsApi.create(form),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['futureProjects'] }); toast.success(editId ? 'Updated' : 'Created'); setIsOpen(false); resetForm() },
    onError: () => toast.error('Failed'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => futureProjectsApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['futureProjects'] }); toast.success('Deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed'),
  })

  const set = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D7E2EA]">Future Projects</h2>
        <Button size="sm" onClick={() => { resetForm(); setIsOpen(true) }}>Add Project</Button>
      </div>

      {isLoading ? <p className="text-[#D7E2EA]/50">Loading...</p> : (
        <div className="space-y-3">
          {(data?.data ?? []).map((item) => (
            <div key={item._id} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[#D7E2EA] font-medium">{item.name}</h3>
                    <Badge variant={statusColors[item.status] || 'warning'}>{item.status}</Badge>
                  </div>
                  {item.category && <span className="text-[#D7E2EA]/40 text-xs uppercase tracking-wider">{item.category}</span>}
                  {item.description && <p className="text-[#D7E2EA]/60 text-sm mt-1">{item.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {data?.data?.length === 0 && <p className="text-[#D7E2EA]/30 text-center py-8">No future projects added yet</p>}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => { setIsOpen(false); resetForm() }} title={editId ? 'Edit Future Project' : 'Add Future Project'}>
        <div className="space-y-4">
          <Input label="Project Name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Project name" />
          <Input label="Category" value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="e.g. Web, Mobile, AI" />
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm">
              <option value="Planned">Planned</option>
              <option value="In Development">In Development</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
          <Button onClick={() => saveMutation.mutate()} loading={saveMutation.isPending}>{editId ? 'Update' : 'Create'}</Button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} message="Delete this future project?" loading={deleteMutation.isPending} />
    </div>
  )
}
