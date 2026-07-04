import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className = '', ...rest }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">{label}</label>}
    <textarea
      ref={ref}
      className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-2.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm resize-none ${className}`}
      {...rest}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
))
Textarea.displayName = 'Textarea'
export default Textarea
