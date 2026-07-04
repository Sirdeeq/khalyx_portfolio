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
        className="px-3 py-1.5 rounded-lg text-sm text-[#D7E2EA]/50 hover:text-[#D7E2EA] disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 border border-white/10"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
            p === page ? 'bg-white/15 text-[#D7E2EA]' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA] bg-white/5'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 rounded-lg text-sm text-[#D7E2EA]/50 hover:text-[#D7E2EA] disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 border border-white/10"
      >
        Next
      </button>
    </div>
  )
}
