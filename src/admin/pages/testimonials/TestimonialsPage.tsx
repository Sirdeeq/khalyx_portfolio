import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { testimonialsApi } from '../../../lib/api/testimonials'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

export default function TestimonialsPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['testimonials'], queryFn: testimonialsApi.list })
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', role: '', company: '', text: '', avatar: '', rating: 5 })

  const resetForm = () => { setForm({ name: '', role: '', company: '', text: '', avatar: '', rating: 5 }); setEditId(null) }

  const openEdit = (item: any) => {
    setForm({ name: item.name, role: item.role || '', company: item.company || '', text: item.text, avatar: item.avatar || '', rating: item.rating || 5 })
    setEditId(item._id)
    setIsOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: () => editId
      ? testimonialsApi.update(editId, form)
      : testimonialsApi.create(form),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['testimonials'] }); toast.success(editId ? 'Updated' : 'Created'); setIsOpen(false); resetForm() },
    onError: () => toast.error('Failed'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => testimonialsApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['testimonials'] }); toast.success('Deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed'),
  })

  const set = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D7E2EA]">Testimonials</h2>
        <Button size="sm" onClick={() => { resetForm(); setIsOpen(true) }}>Add Testimonial</Button>
      </div>

      {isLoading ? <p className="text-[#D7E2EA]/50">Loading...</p> : (
        <div className="space-y-3">
          {(data?.data ?? []).map((item) => (
            <div key={item._id} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D7E2EA] font-bold text-sm flex-shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-[#D7E2EA] font-medium">{item.name}</h3>
                      <p className="text-[#D7E2EA]/40 text-xs">{[item.role, item.company].filter(Boolean).join(' · ')}</p>
                    </div>
                  </div>
                  <p className="text-[#D7E2EA]/60 text-sm mt-2 italic">"{item.text}"</p>
                  <div className="text-yellow-400 text-xs mt-1">{'★'.repeat(item.rating)}</div>
                </div>
                <div className="flex gap-2 ml-3">
                  <button onClick={() => openEdit(item)} className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {data?.data?.length === 0 && <p className="text-[#D7E2EA]/30 text-center py-8">No testimonials added yet</p>}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => { setIsOpen(false); resetForm() }} title={editId ? 'Edit Testimonial' : 'Add Testimonial'}>
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Person's name" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Role" value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="e.g. CEO" />
            <Input label="Company" value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Testimonial</label>
            <textarea value={form.text} onChange={(e) => set('text', e.target.value)} rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <Input label="Rating (1-5)" type="number" min={1} max={5} value={form.rating} onChange={(e) => set('rating', parseInt(e.target.value) || 5)} />
          <Input label="Avatar URL (optional)" value={form.avatar} onChange={(e) => set('avatar', e.target.value)} placeholder="https://..." />
          <Button onClick={() => saveMutation.mutate()} loading={saveMutation.isPending}>{editId ? 'Update' : 'Create'}</Button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} message="Delete this testimonial?" loading={deleteMutation.isPending} />
    </div>
  )
}
