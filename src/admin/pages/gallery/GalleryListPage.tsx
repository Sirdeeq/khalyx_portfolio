import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { galleryApi } from '../../../lib/api/gallery'
import toast from 'react-hot-toast'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import ImageUpload from '../../components/ui/ImageUpload'

export default function GalleryListPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: () => galleryApi.list({ limit: 50 }) })

  const [editItem, setEditItem] = useState<{ _id: string; src: string; label: string } | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const updateMutation = useMutation({
    mutationFn: ({ id, data: body }: { id: string; data: { src: string; label: string } }) => galleryApi.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['gallery'] }); toast.success('Updated') },
    onError: () => toast.error('Failed'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => galleryApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['gallery'] }); toast.success('Deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed'),
  })

  return (
    <div>
      <Card title="Gallery Items">
        {isLoading ? (
          <p className="text-[#D7E2EA]/50">Loading...</p>
        ) : (
          <div className="space-y-3">
            {(data?.data ?? []).map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.src ? <img src={item.src} alt="" className="w-full h-full object-cover" /> : <span className="text-[#D7E2EA]/20">+</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#D7E2EA]">{item.label}</p>
                  <p className="text-xs text-[#D7E2EA]/40">{item.aspect}</p>
                </div>
                <button onClick={() => setEditItem(item)} className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-colors">Edit</button>
                <button onClick={() => setDeleteId(item._id)} className="text-xs text-red-400/50 hover:text-red-400 transition-colors">Delete</button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={!!editItem} onClose={() => setEditItem(null)} title="Edit Gallery Item">
        {editItem && (
          <div className="space-y-4">
            <input type="text" value={editItem.label} onChange={(e) => setEditItem({ ...editItem, label: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] text-sm outline-none focus:border-white/30" placeholder="Label" />
            <ImageUpload value={editItem.src} onChange={(v) => setEditItem({ ...editItem, src: v })} label="Image" placeholder="Image URL..." />
            <Button onClick={() => { updateMutation.mutate({ id: editItem._id, data: { src: editItem.src, label: editItem.label } }); setEditItem(null) }} loading={updateMutation.isPending}>Save</Button>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} message="Delete this gallery item?" loading={deleteMutation.isPending} />
    </div>
  )
}
