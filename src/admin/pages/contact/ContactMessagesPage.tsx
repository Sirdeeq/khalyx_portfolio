import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contactApi } from '../../../lib/api/contact'
import toast from 'react-hot-toast'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'
import Modal from '../../components/ui/Modal'
import Textarea from '../../components/ui/Textarea'
import Button from '../../components/ui/Button'

export default function ContactMessagesPage() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [replyModal, setReplyModal] = useState<{ id: string; name: string } | null>(null)
  const [replyText, setReplyText] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['contacts', page],
    queryFn: () => contactApi.list({ page, limit: 20 }),
  })

  const markReadMutation = useMutation({
    mutationFn: (id: string) => contactApi.markRead(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contacts'] }); toast.success('Marked as read') },
  })

  const replyMutation = useMutation({
    mutationFn: ({ id, reply }: { id: string; reply: string }) => contactApi.reply(id, { reply }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Reply sent via email and WhatsApp')
      setReplyModal(null)
      setReplyText('')
    },
  })

  const handleReply = () => {
    if (!replyModal || !replyText.trim()) return
    replyMutation.mutate({ id: replyModal.id, reply: replyText.trim() })
  }

  return (
    <div>
      <Card title="Contact Messages">
        {isLoading ? (
          <p className="text-[#D7E2EA]/50">Loading...</p>
        ) : (
          <div className="space-y-4">
            {(data?.data ?? []).map((msg) => (
              <div key={msg._id} className={`bg-white/5 rounded-xl border p-4 ${msg.isRead ? 'border-white/5' : 'border-white/10'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[#D7E2EA] font-medium">{msg.name}</span>
                    <span className="text-[#D7E2EA]/40 text-xs ml-3">{msg.email}</span>
                    {msg.phone && <span className="text-[#D7E2EA]/40 text-xs ml-2">{msg.phone}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    {msg.reason && <span className="text-xs text-[#D7E2EA]/50">{msg.reason}</span>}
                    {!msg.isRead && (
                      <button onClick={() => markReadMutation.mutate(msg._id)} className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors">Mark read</button>
                    )}
                    <Badge variant={msg.isRead ? 'success' : 'warning'}>{msg.isRead ? 'Read' : 'New'}</Badge>
                  </div>
                </div>
                <p className="text-[#D7E2EA]/70 text-sm whitespace-pre-wrap">{msg.message}</p>
                {msg.reply && (
                  <div className="mt-3 pl-4 border-l-2 border-green-500/40">
                    <p className="text-xs text-green-400/60 font-medium uppercase tracking-wider mb-1">Your Reply</p>
                    <p className="text-[#D7E2EA]/80 text-sm whitespace-pre-wrap">{msg.reply}</p>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[#D7E2EA]/30 text-xs">{new Date(msg.createdAt).toLocaleString()}</p>
                  <button
                    onClick={() => setReplyModal({ id: msg._id, name: msg.name })}
                    className="text-xs text-purple-400/60 hover:text-purple-400 transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
            <Pagination page={data?.pagination?.page ?? 1} totalPages={data?.pagination?.totalPages ?? 1} onPageChange={setPage} />
          </div>
        )}
      </Card>

      <Modal isOpen={!!replyModal} onClose={() => { setReplyModal(null); setReplyText('') }} title={`Reply to ${replyModal?.name ?? ''}`}>
        <div className="space-y-4">
          <Textarea
            placeholder="Type your reply..."
            rows={5}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => { setReplyModal(null); setReplyText('') }}>Cancel</Button>
            <Button onClick={handleReply} disabled={!replyText.trim() || replyMutation.isPending}>
              {replyMutation.isPending ? 'Sending...' : 'Send Reply'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
