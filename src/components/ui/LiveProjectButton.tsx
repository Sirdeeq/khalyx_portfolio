import type { ButtonHTMLAttributes } from 'react'

interface LiveProjectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function LiveProjectButton({ className, ...rest }: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full border-2 border-[#D7E2EA] font-medium uppercase tracking-widest text-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base hover:bg-[#D7E2EA]/10 ${className ?? ''}`}
      {...rest}
    >
      Live Project
    </button>
  )
}
