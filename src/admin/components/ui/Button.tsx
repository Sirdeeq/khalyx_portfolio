import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
}

const variants = {
  primary:
    'bg-gradient-to-r from-purple-700 via-fuchsia-700 to-orange-700 text-white hover:opacity-90 shadow-lg shadow-purple-900/30',
  secondary: 'bg-white/10 text-[#D7E2EA] hover:bg-white/15 border border-white/10',
  danger: 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30',
  ghost: 'text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:bg-white/5',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`font-medium uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
