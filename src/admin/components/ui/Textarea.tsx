import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className = '', ...rest }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">{label}</label>}
    <textarea
      ref={ref}
      className={`w-full bg-[var(--card-bg)] border ${error ? 'border-red-500/50' : 'border-[var(--border-subtle)]'} rounded-xl px-4 py-2.5 text-[var(--text-body)] placeholder:text-[var(--text-muted-30)] outline-none focus:border-[var(--text-muted-30)] transition-colors text-sm resize-none ${className}`}
      {...rest}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
))
Textarea.displayName = 'Textarea'
export default Textarea
