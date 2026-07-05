import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { galleryApi } from '../../../lib/api/gallery'
import toast from 'react-hot-toast'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import MultiAssetUpload from '../../components/ui/MultiAssetUpload'
import type { GalleryAsset } from '../../../lib/api/types'

interface FormState {
  _id?: string
  assets: GalleryAsset[]
  label: string
  aspect: string
}

const aspectOptions = [
  { value: 'aspect-[3/4]', label: 'Portrait 3:4 (600×800px)' },
  { value: 'aspect-[4/3]', label: 'Landscape 4:3 (800×600px)' },
  { value: 'aspect-[4/5]', label: 'Tall 4:5 (800×1000px)' },
  { value: 'aspect-[1/1]', label: 'Square 1:1 (800×800px)' },
  { value: 'aspect-[16/9]', label: 'Wide 16:9 (1280×720px)' },
  { value: 'aspect-[9/16]', label: 'Story 9:16 (720×1280px)' },
  { value: 'aspect-[2/3]', label: 'Portrait 2:3 (600×900px)' },
]

const emptyForm = (): FormState => ({
  assets: [], label: '', aspect: 'aspect-[3/4]',
})

export default function GalleryListPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['gallery'], queryFn: () => galleryApi.list({ limit: 50 }) })

  const [form, setForm] = useState<FormState>(emptyForm())
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const items = data?.data ?? []

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['gallery'] })

  const createMutation = useMutation({
    mutationFn: (body: Partial<FormState>) => galleryApi.create(body),
    onSuccess: () => { invalidate(); toast.success('Item created'); setShowCreate(false); setForm(emptyForm()) },
    onError: () => toast.error('Failed to create'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<FormState> }) => galleryApi.update(id, body),
    onSuccess: () => { invalidate(); toast.success('Updated'); setEditId(null); setForm(emptyForm()) },
    onError: () => toast.error('Failed to update'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => galleryApi.remove(id),
    onSuccess: () => { invalidate(); toast.success('Deleted'); setDeleteId(null) },
    onError: () => toast.error('Failed to delete'),
  })

  const openEdit = (item: typeof items[0]) => {
    setForm({ _id: item._id, assets: item.assets || [], label: item.label, aspect: item.aspect })
    setEditId(item._id)
  }

  const saveEdit = () => {
    if (editId) updateMutation.mutate({ id: editId, body: form })
  }

  const saveCreate = () => {
    if (!form.label.trim()) { toast.error('Label is required'); return }
    createMutation.mutate(form)
  }

  const totalAssets = items.reduce((s, i) => s + (i.assets?.length || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--text-body)]">Gallery</h1>
        <Button onClick={() => { setForm(emptyForm()); setShowCreate(true) }}>+ Add Item</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-body)]">{items.length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Items</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-body)]">{totalAssets}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Total Assets</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-body)]">{items.filter(i => i.assets?.some(a => a.type === 'video')).length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">With Video</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-body)]">{items.reduce((s, i) => s + (i.assets?.filter(a => a.type === 'image').length || 0), 0)}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Images</p>
        </div>
      </div>

      {/* Gallery grid */}
      <Card title="All Items">
        {isLoading ? (
          <p className="text-[var(--text-muted)]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-[var(--text-muted-30)] text-sm text-center py-8">No gallery items yet. Click "Add Item" to create one.</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => {
              const first = item.assets?.[0]
              const assetCount = item.assets?.length || 0
              return (
                <div key={item._id} className="flex items-center gap-4 bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 hover:border-[var(--text-muted-30)] transition-colors">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg border border-[var(--border-subtle)] flex-shrink-0 flex items-center justify-center overflow-hidden bg-[var(--bg-page)]">
                    {first?.src ? (
                      first.type === 'video' ? (
                        <div className="relative w-full h-full">
                          <img src={first.thumbnail || first.src} alt="" className="w-full h-full object-cover" />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M8 5v14l11-7z" /></svg>
                          </span>
                        </div>
                      ) : (
                        <img src={first.src} alt="" className="w-full h-full object-cover" />
                      )
                    ) : (
                      <span className="text-[var(--text-muted-20)] text-lg">+</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--text-body)] truncate">{item.label}</p>
                      {assetCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-white/10 text-[var(--text-muted)]">
                          {assetCount} file{assetCount > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted-40)] mt-0.5">{item.aspect}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(item)} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-body)] transition-colors px-2 py-1">Edit</button>
                    <button onClick={() => { setDeleteId(item._id) }} className="text-xs text-red-400/50 hover:text-red-400 transition-colors px-2 py-1">Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {/* Edit Modal */}
      <Modal isOpen={!!editId} onClose={() => { setEditId(null); setForm(emptyForm()) }} title="Edit Gallery Item">
        {editId && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Label</label>
              <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] text-sm outline-none focus:border-[var(--text-muted-30)]" placeholder="Item label" />
            </div>

            <MultiAssetUpload assets={form.assets} onChange={(assets) => setForm({ ...form, assets })} />

            <div>
              <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Aspect Ratio</label>
              <select value={form.aspect} onChange={(e) => setForm({ ...form, aspect: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] text-sm outline-none focus:border-[var(--text-muted-30)]">
                {aspectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <Button onClick={saveEdit} loading={updateMutation.isPending} className="w-full">Save Changes</Button>
          </div>
        )}
      </Modal>

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => { setShowCreate(false); setForm(emptyForm()) }} title="Add Gallery Item">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Label</label>
            <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
              className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] text-sm outline-none focus:border-[var(--text-muted-30)]" placeholder="Item label" />
          </div>

          <MultiAssetUpload assets={form.assets} onChange={(assets) => setForm({ ...form, assets })} />

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Aspect Ratio</label>
            <select value={form.aspect} onChange={(e) => setForm({ ...form, aspect: e.target.value })}
              className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] text-sm outline-none focus:border-[var(--text-muted-30)]">
              {aspectOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <Button onClick={saveCreate} loading={createMutation.isPending} className="w-full">Create Item</Button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} message="Delete this gallery item?" loading={deleteMutation.isPending} />
    </div>
  )
}
