import { useState, useRef } from 'react'
import { uploadApi } from '../../../lib/api/upload'
import toast from 'react-hot-toast'

const aspectOptions = [
  { value: 'aspect-[3/4]', ratio: 3 / 4, label: 'Portrait 3:4' },
  { value: 'aspect-[4/3]', ratio: 4 / 3, label: 'Landscape 4:3' },
  { value: 'aspect-[4/5]', ratio: 4 / 5, label: 'Tall 4:5' },
  { value: 'aspect-[1/1]', ratio: 1, label: 'Square 1:1' },
  { value: 'aspect-[16/9]', ratio: 16 / 9, label: 'Wide 16:9' },
  { value: 'aspect-[9/16]', ratio: 9 / 16, label: 'Story 9:16' },
  { value: 'aspect-[2/3]', ratio: 2 / 3, label: 'Portrait 2:3' },
]

function detectClosestAspect(w: number, h: number): string {
  const ratio = w / h
  let closest = aspectOptions[0]
  let minDiff = Math.abs(ratio - closest.ratio)
  for (const opt of aspectOptions) {
    const diff = Math.abs(ratio - opt.ratio)
    if (diff < minDiff) { minDiff = diff; closest = opt }
  }
  return closest.value
}

interface MediaUploadProps {
  value: string
  onChange: (url: string, meta?: { type: 'image' | 'video'; thumbnail: string; aspect?: string }) => void
  acceptType?: 'image' | 'video' | 'both'
  label?: string
  placeholder?: string
}

export default function MediaUpload({ value, onChange, acceptType = 'both', label, placeholder }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploadedType, setUploadedType] = useState<'image' | 'video' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptMime = acceptType === 'image' ? 'image/*' : acceptType === 'video' ? 'video/*' : 'image/*,video/*'
  const maxSize = acceptType === 'video' ? 200 * 1024 * 1024 : 10 * 1024 * 1024
  const sizeLabel = acceptType === 'video' ? '200MB' : '10MB'

  const handleFile = async (file: File) => {
    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')
    if (!isVideo && !isImage) {
      toast.error('Only image or video files are allowed')
      return
    }
    if (acceptType === 'image' && isVideo) {
      toast.error('Only image files are accepted here')
      return
    }
    if (acceptType === 'video' && isImage) {
      toast.error('Only video files are accepted here')
      return
    }
    if (file.size > maxSize) {
      toast.error(`File must be under ${sizeLabel}`)
      return
    }
    setUploadedType(isVideo ? 'video' : 'image')
    setUploading(true)
    try {
      const res = await uploadApi.upload(file)
      const meta: { type: 'image' | 'video'; thumbnail: string; aspect?: string } = {
        type: res.data.type,
        thumbnail: res.data.thumbnail || '',
      }
      if (isImage) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        await new Promise<void>((resolve) => {
          img.onload = () => { meta.aspect = detectClosestAspect(img.naturalWidth, img.naturalHeight); resolve() }
          img.onerror = () => resolve()
          img.src = res.data.url
        })
      }
      onChange(res.data.url, meta)
      toast.success(isVideo ? 'Video uploaded' : 'Image uploaded')
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const isVideo = uploadedType === 'video' || value.match(/\.(mp4|webm|mov|avi|mkv)(\?|$)/i)

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium text-[var(--text-muted-70)]">{label}</label>}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragOver ? 'border-purple-500 bg-purple-500/10' : 'border-[var(--border-subtle)] hover:border-[var(--text-muted-30)] bg-[var(--card-bg)]'
        }`}
      >
        <input ref={inputRef} type="file" accept={acceptMime} onChange={handleChange} className="hidden" />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <span className="w-6 h-6 border-2 border-[var(--text-muted-30)] border-t-[var(--text-body)] rounded-full animate-spin" />
            <span className="text-xs text-[var(--text-muted)]">Uploading...</span>
          </div>
        ) : value ? (
          <div className="flex items-center gap-4">
            {isVideo ? (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[var(--border-subtle)] flex-shrink-0 bg-black/60 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/80">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            ) : (
              <img src={value} alt="" className="w-16 h-16 rounded-lg object-cover border border-[var(--border-subtle)] flex-shrink-0" />
            )}
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs text-[var(--text-muted-60)] truncate">{value}</p>
              <p className="text-xs text-[var(--text-muted-30)] mt-1">Click or drag to replace</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl text-[var(--text-muted-30)]">+</span>
            <span className="text-sm text-[var(--text-muted)]">Click to upload or drag & drop</span>
            <span className="text-xs text-[var(--text-muted-30)]">{acceptType === 'video' ? 'MP4, WebM, MOV' : 'PNG, JPG, WebP, SVG'} (max {sizeLabel})</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Or paste URL here...'}
          className="flex-1 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] placeholder:text-[var(--text-muted-30)] outline-none focus:border-[var(--text-muted-30)] text-sm" />
        {value && (
          <button onClick={() => onChange('')} className="text-xs text-red-400/50 hover:text-red-400 px-2">Clear</button>
        )}
      </div>
    </div>
  )
}
