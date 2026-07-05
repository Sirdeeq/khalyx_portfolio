import { useState, useRef } from 'react'
import { uploadApi } from '../../../lib/api/upload'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
}

export default function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10MB')
      return
    }
    setUploading(true)
    try {
      const res = await uploadApi.upload(file)
      onChange(res.data.url)
      toast.success('Image uploaded')
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
        <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <span className="w-6 h-6 border-2 border-[var(--text-muted-30)] border-t-[var(--text-body)] rounded-full animate-spin" />
            <span className="text-xs text-[var(--text-muted)]">Uploading...</span>
          </div>
        ) : value ? (
          <div className="flex items-center gap-4">
            <img src={value} alt="" className="w-16 h-16 rounded-lg object-cover border border-[var(--border-subtle)]" />
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs text-[var(--text-muted-60)] truncate">{value}</p>
              <p className="text-xs text-[var(--text-muted-30)] mt-1">Click or drag to replace</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl text-[var(--text-muted-30)]">+</span>
            <span className="text-sm text-[var(--text-muted)]">Click to upload or drag & drop</span>
            <span className="text-xs text-[var(--text-muted-30)]">PNG, JPG, WebP, SVG (max 10MB)</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Or paste image URL here...'}
          className="flex-1 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] placeholder:text-[var(--text-muted-30)] outline-none focus:border-[var(--text-muted-30)] text-sm" />
        {value && (
          <button onClick={() => onChange('')} className="text-xs text-red-400/50 hover:text-red-400 px-2">Clear</button>
        )}
      </div>
    </div>
  )
}
