import { useEffect, useCallback } from 'react'

interface ImageLightboxProps {
  src: string
  label?: string
  onClose: () => void
}

export default function ImageLightbox({ src, label, onClose }: ImageLightboxProps) {
  const close = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [close])

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={close}>
      <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm transition-colors z-10">
          Close [Esc]
        </button>
        <img src={src} alt={label || ''} className="w-full max-h-[85vh] object-contain rounded-2xl" />
        {label && <p className="text-white/90 text-sm text-center mt-4 font-medium">{label}</p>}
      </div>
    </div>
  )
}
