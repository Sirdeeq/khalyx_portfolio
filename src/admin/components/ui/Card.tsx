import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
  action?: ReactNode
}

export default function Card({ children, className = '', title, action }: CardProps) {
  return (
    <div className={`bg-[var(--card-bg)] backdrop-blur-xl rounded-xl border border-[var(--border-subtle)] ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
          {title && <h3 className="text-lg font-bold text-[var(--text-body)]">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  )
}
