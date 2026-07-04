import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contactApi } from '../../../lib/api/contact'
import toast from 'react-hot-toast'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'

export default function ContactMessagesPage() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ['contacts', page],
    queryFn: () => contactApi.list({ page, limit: 20 }),
  })

  const markReadMutation = useMutation({
    mutationFn: (id: string) => contactApi.markRead(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contacts'] }); toast.success('Marked as read') },
  })

  return (
    <div>
      <Card title="Contact Messages">
        {isLoading ? (
          <p className="text-[#D7E2EA]/50">Loading...</p>
        ) : (
          <div className="space-y-4">
            {(data?.data ?? []).map((msg) => (
              <div key={msg._id} className={`bg-white/5 rounded-xl border p-4 ${msg.isRead ? 'border-white/5 opacity-60' : 'border-white/10'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[#D7E2EA] font-medium">{msg.name}</span>
                    <span className="text-[#D7E2EA]/40 text-xs ml-3">{msg.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {msg.reason && <span className="text-xs text-[#D7E2EA]/50">{msg.reason}</span>}
                    {!msg.isRead && (
                      <button onClick={() => markReadMutation.mutate(msg._id)} className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors">Mark read</button>
                    )}
                    <Badge variant={msg.isRead ? 'success' : 'warning'}>{msg.isRead ? 'Read' : 'New'}</Badge>
                  </div>
                </div>
                <p className="text-[#D7E2EA]/70 text-sm">{msg.message}</p>
                <p className="text-[#D7E2EA]/30 text-xs mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            ))}
            <Pagination page={data?.pagination?.page ?? 1} totalPages={data?.pagination?.totalPages ?? 1} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  )
}
