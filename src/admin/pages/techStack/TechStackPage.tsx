import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { techStackApi } from '../../../lib/api/techStack'
import toast from 'react-hot-toast'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function TechStackPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['techStack'], queryFn: techStackApi.list })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const updateMutation = useMutation({
    mutationFn: ({ id, data: body }: { id: string; data: { items: string[] } }) => techStackApi.update(id, body),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['techStack'] }); toast.success('Updated'); setEditingId(null) },
    onError: () => toast.error('Failed'),
  })

  const startEdit = (id: string, items: string[]) => { setEditingId(id); setEditText(items.join('\n')) }

  if (isLoading) return <p className="text-[#D7E2EA]/50">Loading...</p>

  return (
    <div className="max-w-3xl space-y-6">
      {(data?.data ?? []).map((cat) => (
        <Card key={cat._id} title={cat.category}>
          {editingId === cat._id ? (
            <div className="space-y-3">
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => updateMutation.mutate({ id: cat._id, data: { items: editText.split('\n').filter(Boolean) } })} loading={updateMutation.isPending}>Save</Button>
                <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, i) => (
                  <span key={i} className="inline-block text-xs text-[#D7E2EA]/70 bg-white/5 border border-white/10 rounded-full px-3 py-1">{item}</span>
                ))}
              </div>
              <button onClick={() => startEdit(cat._id, cat.items)} className="text-xs text-[#D7E2EA]/50 hover:text-[#D7E2EA] flex-shrink-0 ml-4">Edit</button>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
