interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1.5 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-body)] disabled:opacity-30 disabled:cursor-not-allowed bg-[var(--card-bg)] border border-[var(--border-subtle)]"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
            p === page ? 'bg-[var(--border-subtle)] text-[var(--text-body)]' : 'text-[var(--text-muted)] hover:text-[var(--text-body)] bg-[var(--card-bg)]'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-body)] disabled:opacity-30 disabled:cursor-not-allowed bg-[var(--card-bg)] border border-[var(--border-subtle)]"
      >
        Next
      </button>
    </div>
  )
}
