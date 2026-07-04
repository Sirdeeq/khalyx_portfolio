import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { healthcareApi } from '../../../lib/api/healthcare'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'

const emptyItem = { title: '', period: '', brief: '', responsibilities: [] as string[], highlight: '', order: 0 }

export default function HealthcareListPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['healthcare'], queryFn: healthcareApi.list })
  const [editing, setEditing] = useState<{ _id?: string } & typeof emptyItem>(emptyItem)
  const [respText, setRespText] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const openCreate = () => { setEditing(emptyItem); setRespText(''); setIsOpen(true) }
  const openEdit = (item: NonNullable<typeof data>['data'][number]) => {
    setEditing(item); setRespText(item.responsibilities.join('\n')); setIsOpen(true)
  }

  const createMutation = useMutation({
    mutationFn: (payload: typeof emptyItem) => healthcareApi.create(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['healthcare'] }); toast.success('Created'); setIsOpen(false) },
    onError: () => toast.error('Failed'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data: body }: { id: string; data: typeof emptyItem }) => healthcareApi.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['healthcare'] }); toast.success('Updated'); setIsOpen(false) },
    onError: () => toast.error('Failed'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => healthcareApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['healthcare'] }); toast.success('Deleted') },
    onError: () => toast.error('Failed'),
  })

  const handleSave = () => {
    const payload = { ...editing, responsibilities: respText.split('\n').filter(Boolean) }
    if (editing._id) updateMutation.mutate({ id: editing._id, data: payload })
    else createMutation.mutate(payload)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D7E2EA]">Healthcare Roles</h2>
        <Button onClick={openCreate} size="sm">Add Role</Button>
      </div>

      {isLoading ? <p className="text-[#D7E2EA]/50">Loading...</p> : (
        <div className="space-y-4">
          {(data?.data ?? []).map((item) => (
            <div key={item._id} className="bg-white/5 rounded-xl border border-white/10 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#D7E2EA] font-bold">{item.title}</h3>
                  <p className="text-[#D7E2EA]/50 text-xs">{item.period}</p>
                  <p className="text-[#D7E2EA]/60 text-sm mt-1">{item.brief}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA]">Edit</button>
                  <button onClick={() => deleteMutation.mutate(item._id)} className="text-xs text-red-400/50 hover:text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editing._id ? 'Edit Role' : 'Add Role'}>
        <div className="space-y-4">
          <Input label="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <Input label="Period" value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} />
          <Input label="Brief" value={editing.brief} onChange={(e) => setEditing({ ...editing, brief: e.target.value })} />
          <Textarea label="Responsibilities (one per line)" value={respText} onChange={(e) => setRespText(e.target.value)} rows={4} />
          <Input label="Highlight" value={editing.highlight} onChange={(e) => setEditing({ ...editing, highlight: e.target.value })} />
          <Button onClick={handleSave} loading={createMutation.isPending || updateMutation.isPending}>{editing._id ? 'Update' : 'Create'}</Button>
        </div>
      </Modal>
    </div>
  )
}
