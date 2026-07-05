import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { organizationsApi } from '../../../lib/api/organizations'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

export default function OrganizationsPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['organizations'], queryFn: organizationsApi.list })
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', role: '', description: '', url: '' })

  const resetForm = () => { setForm({ name: '', role: '', description: '', url: '' }); setEditId(null) }

  const openEdit = (item: any) => {
    setForm({ name: item.name, role: item.role || '', description: item.description || '', url: item.url || '' })
    setEditId(item._id)
    setIsOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: () => editId
      ? organizationsApi.update(editId, form)
      : organizationsApi.create(form),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['organizations'] }); toast.success(editId ? 'Updated' : 'Created'); setIsOpen(false); resetForm() },
    onError: () => toast.error('Failed'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => organizationsApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['organizations'] }); toast.success('Deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed'),
  })

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D7E2EA]">Organizations</h2>
        <Button size="sm" onClick={() => { resetForm(); setIsOpen(true) }}>Add Organization</Button>
      </div>

      {isLoading ? <p className="text-[#D7E2EA]/50">Loading...</p> : (
        <div className="space-y-3">
          {(data?.data ?? []).map((item) => (
            <div key={item._id} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#D7E2EA] font-medium">{item.name}</h3>
                  {item.role && <p className="text-[#D7E2EA]/50 text-xs">{item.role}</p>}
                  {item.description && <p className="text-[#D7E2EA]/60 text-sm mt-1">{item.description}</p>}
                  {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#B600A8] text-xs hover:underline mt-1 inline-block">{item.url}</a>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {data?.data?.length === 0 && <p className="text-[#D7E2EA]/30 text-center py-8">No organizations added yet</p>}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => { setIsOpen(false); resetForm() }} title={editId ? 'Edit Organization' : 'Add Organization'}>
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Organization name" />
          <Input label="Role" value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="Your role (optional)" />
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <Input label="Website URL" value={form.url} onChange={(e) => set('url', e.target.value)} placeholder="https://..." />
          <Button onClick={() => saveMutation.mutate()} loading={saveMutation.isPending}>{editId ? 'Update' : 'Create'}</Button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} message="Delete this organization?" loading={deleteMutation.isPending} />
    </div>
  )
}
