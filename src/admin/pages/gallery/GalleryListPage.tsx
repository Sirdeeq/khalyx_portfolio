import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { galleryApi } from '../../../lib/api/gallery'
import toast from 'react-hot-toast'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import MediaUpload from '../../components/ui/MediaUpload'

interface FormState {
  _id?: string
  src: string
  type: 'image' | 'video'
  thumbnail: string
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
  src: '', type: 'image', thumbnail: '', label: '', aspect: 'aspect-[3/4]',
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
    setForm({ _id: item._id, src: item.src, type: item.type || 'image', thumbnail: item.thumbnail || '', label: item.label, aspect: item.aspect })
    setEditId(item._id)
  }

  const saveEdit = () => {
    if (editId) updateMutation.mutate({ id: editId, body: form })
  }

  const saveCreate = () => {
    if (!form.label.trim()) { toast.error('Label is required'); return }
    createMutation.mutate(form)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--text-body)]">Gallery</h1>
        <Button onClick={() => { setForm(emptyForm()); setShowCreate(true) }}>+ Add Item</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-body)]">{items.length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Total Items</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-body)]">{items.filter(i => (i.type || 'image') === 'image').length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Images</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-body)]">{items.filter(i => i.type === 'video').length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Videos</p>
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
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-4 hover:border-[var(--text-muted-30)] transition-colors">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg border border-[var(--border-subtle)] flex-shrink-0 flex items-center justify-center overflow-hidden bg-[var(--bg-page)]">
                  {(item.type || 'image') === 'video' ? (
                    item.thumbnail ? (
                      <div className="relative w-full h-full">
                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-black/40">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[var(--text-muted-30)]">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )
                  ) : item.src ? (
                    <img src={item.src} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[var(--text-muted-20)] text-lg">+</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--text-body)] truncate">{item.label}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${(item.type || 'image') === 'video' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {(item.type || 'image') === 'video' ? 'VIDEO' : 'IMAGE'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted-40)] mt-0.5">{item.aspect}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(item)} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-body)] transition-colors px-2 py-1">Edit</button>
                  <button onClick={() => { setDeleteId(item._id) }} className="text-xs text-red-400/50 hover:text-red-400 transition-colors px-2 py-1">Delete</button>
                </div>
              </div>
            ))}
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

            <div>
              <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Type</label>
              <div className="flex gap-2">
                <button onClick={() => setForm({ ...form, type: 'image' })}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${form.type === 'image' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}>
                  Image
                </button>
                <button onClick={() => setForm({ ...form, type: 'video' })}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${form.type === 'video' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}>
                  Video
                </button>
              </div>
            </div>

            <MediaUpload
              value={form.src}
              onChange={(url, meta) => {
                const updates: Partial<FormState> = {
                  src: url,
                  type: meta?.type || form.type,
                  thumbnail: meta?.thumbnail || '',
                }
                if (meta?.aspect) updates.aspect = meta.aspect
                setForm({ ...form, ...updates })
              }}
              acceptType={form.type === 'video' ? 'video' : 'image'}
              label={form.type === 'video' ? 'Video File' : 'Image File'}
              placeholder={form.type === 'video' ? 'Or paste video URL...' : 'Or paste image URL...'}
            />

            <div>
              <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Aspect Ratio</label>
              <select value={form.aspect} onChange={(e) => setForm({ ...form, aspect: e.target.value })}
                className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] text-sm outline-none focus:border-[var(--text-muted-30)]">
                {aspectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {form.type === 'video' && form.thumbnail && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Thumbnail Preview</label>
                <img src={form.thumbnail} alt="" className="w-32 h-24 rounded-lg object-cover border border-[var(--border-subtle)]" />
              </div>
            )}

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

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">Type</label>
            <div className="flex gap-2">
              <button onClick={() => setForm({ ...form, type: 'image' })}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${form.type === 'image' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}>
                Image
              </button>
              <button onClick={() => setForm({ ...form, type: 'video' })}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${form.type === 'video' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}>
                Video
              </button>
            </div>
          </div>

          <MediaUpload
            value={form.src}
            onChange={(url, meta) => {
              const updates: Partial<FormState> = {
                src: url,
                type: meta?.type || form.type,
                thumbnail: meta?.thumbnail || '',
              }
              if (meta?.aspect) updates.aspect = meta.aspect
              setForm({ ...form, ...updates })
            }}
            acceptType={form.type === 'video' ? 'video' : 'image'}
            label={form.type === 'video' ? 'Video File' : 'Image File'}
            placeholder={form.type === 'video' ? 'Or paste video URL...' : 'Or paste image URL...'}
          />

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
