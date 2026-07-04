import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { servicesApi } from '../../../lib/api/services'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

export default function ServicesPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['services'], queryFn: servicesApi.list })
  const [isOpen, setIsOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [name, setName] = useState('')

  const createMutation = useMutation({
    mutationFn: () => servicesApi.create({ name }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['services'] }); toast.success('Created'); setIsOpen(false); setName('') },
    onError: () => toast.error('Failed'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => servicesApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['services'] }); toast.success('Deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed'),
  })

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#D7E2EA]">Services</h2>
        <Button size="sm" onClick={() => setIsOpen(true)}>Add Service</Button>
      </div>

      {isLoading ? <p className="text-[#D7E2EA]/50">Loading...</p> : (
        <div className="flex flex-wrap gap-3">
          {(data?.data ?? []).map((s) => (
            <div key={s._id} className="group flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-[#D7E2EA] hover:border-white/20 transition-colors">
              <span>{s.name}</span>
              <button onClick={() => setDeleteId(s._id)} className="text-[#D7E2EA]/20 hover:text-red-400 transition-colors text-xs ml-1 opacity-0 group-hover:opacity-100">&times;</button>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Service">
        <div className="space-y-4">
          <Input label="Service Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Web Development" />
          <Button onClick={() => createMutation.mutate()} loading={createMutation.isPending}>Create</Button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} message="Delete this service?" loading={deleteMutation.isPending} />
    </div>
  )
}
