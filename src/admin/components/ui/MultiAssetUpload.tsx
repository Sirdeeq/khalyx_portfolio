import { useRef } from 'react'
import { uploadApi } from '../../../lib/api/upload'
import toast from 'react-hot-toast'
import type { GalleryAsset } from '../../../lib/api/types'

interface MultiAssetUploadProps {
  assets: GalleryAsset[]
  onChange: (assets: GalleryAsset[]) => void
  maxSlots?: number
}

const MAX = 10

export default function MultiAssetUpload({ assets, onChange, maxSlots = MAX }: MultiAssetUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<GalleryAsset | null> => {
    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')
    if (!isVideo && !isImage) { toast.error('Only image or video files'); return null }
    const maxSize = isVideo ? 200 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) { toast.error(`File too large (max ${isVideo ? '200MB' : '10MB'})`); return null }
    try {
      const res = await uploadApi.upload(file)
      return { src: res.data.url, type: res.data.type, thumbnail: res.data.thumbnail || '' }
    } catch { toast.error('Upload failed'); return null }
  }

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    e.target.value = ''
    const remaining = maxSlots - assets.length
    const batch = Array.from(files).slice(0, remaining)
    if (batch.length < files.length) toast(`Only ${remaining} slot(s) left — uploading first ${remaining}`, { icon: '⚠️' })
    const results = await Promise.all(batch.map(uploadFile))
    const added = results.filter(Boolean) as GalleryAsset[]
    if (added.length) onChange([...assets, ...added])
  }

  const remove = (i: number) => {
    const next = assets.filter((_, idx) => idx !== i)
    onChange(next)
  }

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= assets.length) return
    const next = [...assets]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  const canAdd = assets.length < maxSlots

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[var(--text-muted-70)]">
        Assets ({assets.length}/{maxSlots})
      </label>

      <div className="space-y-2">
        {assets.map((asset, i) => (
          <div key={i} className="flex items-center gap-3 bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] p-2.5">
            {/* Preview */}
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[var(--border-subtle)] flex-shrink-0 bg-[var(--bg-page)]">
              {asset.type === 'video' ? (
                asset.thumbnail ? (
                  <div className="relative w-full h-full">
                    <img src={asset.thumbnail} alt="" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-black/40">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[var(--text-muted-30)]"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                )
              ) : (
                <img src={asset.src} alt="" className="w-full h-full object-cover" />
              )}
            </div>

            {/* URL + type */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--text-muted-60)] truncate">{asset.src}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${asset.type === 'video' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {asset.type.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} disabled={i === 0}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--bg-page)] transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M18 15l-6-6-6 6" /></svg>
              </button>
              <button onClick={() => move(i, 1)} disabled={i === assets.length - 1}
                className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--bg-page)] transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <button onClick={() => remove(i)}
                className="p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-[var(--bg-page)] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {canAdd && (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[var(--border-subtle)] rounded-xl p-4 text-center cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition-all"
        >
          <input ref={inputRef} type="file" accept="image/*,video/*" multiple onChange={handleFiles} className="hidden" />
          <span className="text-sm text-[var(--text-muted)]">+ Add asset ({assets.length}/{maxSlots})</span>
        </div>
      )}
    </div>
  )
}
