import type { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => ReactNode
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  onRowClick?: (item: T) => void
}

export default function Table<T extends Record<string, unknown>>({ columns, data, loading, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-subtle)]">
            {columns.map((col) => (
              <th key={col.key} className={`text-left text-[var(--text-muted)] font-medium uppercase tracking-wider text-xs py-3 px-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-[var(--text-muted-30)]">Loading...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-[var(--text-muted-30)]">No data found</td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr
                key={(item._id as string) || i}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`py-3 px-4 text-[var(--text-body)] ${col.className || ''}`}>
                    {col.render ? col.render(item) : (item[col.key] as ReactNode) ?? '-'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
