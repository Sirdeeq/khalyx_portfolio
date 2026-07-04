import { useState, useRef } from 'react'
import { uploadApi } from '../../../lib/api/upload'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
  folder?: string
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
      {label && <label className="block text-sm font-medium text-[#D7E2EA]/70">{label}</label>}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragOver ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-white/40 bg-white/[0.02]'
        }`}
      >
        <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-xs text-[#D7E2EA]/50">Uploading...</span>
          </div>
        ) : value ? (
          <div className="flex items-center gap-4">
            <img src={value} alt="" className="w-16 h-16 rounded-lg object-cover border border-white/10" />
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs text-[#D7E2EA]/60 truncate">{value}</p>
              <p className="text-xs text-[#D7E2EA]/30 mt-1">Click or drag to replace</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl text-[#D7E2EA]/30">+</span>
            <span className="text-sm text-[#D7E2EA]/50">Click to upload or drag & drop</span>
            <span className="text-xs text-[#D7E2EA]/30">PNG, JPG, WebP, SVG (max 10MB)</span>
          </div>
        )}
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Or paste image URL here...'}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 text-sm" />
        {value && (
          <button onClick={() => onChange('')} className="text-xs text-red-400/50 hover:text-red-400 px-2">Clear</button>
        )}
      </div>
    </div>
  )
}
