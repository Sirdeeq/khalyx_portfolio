import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...rest }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-[var(--text-muted-70)] mb-1.5">{label}</label>}
    <input
      ref={ref}
      className={`w-full bg-[var(--card-bg)] border ${error ? 'border-red-500/50' : 'border-[var(--border-subtle)]'} rounded-xl px-4 py-2.5 text-[var(--text-body)] placeholder:text-[var(--text-muted-30)] outline-none focus:border-[var(--text-muted-30)] transition-colors text-sm ${className}`}
      {...rest}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
))
Input.displayName = 'Input'
export default Input
