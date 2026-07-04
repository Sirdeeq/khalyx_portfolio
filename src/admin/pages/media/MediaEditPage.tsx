import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mediaApi } from '../../../lib/api/media'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

export default function MediaEditPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['media'], queryFn: mediaApi.get })
  const [servicesText, setServicesText] = useState('')

  useEffect(() => {
    if (data?.data) setServicesText(data.data.services.join('\n'))
  }, [data])

  const mutation = useMutation({
    mutationFn: (payload: Parameters<typeof mediaApi.update>[0]) => mediaApi.update(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['media'] }); toast.success('Media updated') },
    onError: () => toast.error('Failed'),
  })

  if (isLoading) return <p className="text-[#D7E2EA]/50">Loading...</p>

  return (
    <div className="max-w-3xl space-y-6">
      <Card title="Media Portfolio">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-2">Creative Services (one per line)</label>
            <textarea value={servicesText} onChange={(e) => setServicesText(e.target.value)} rows={12}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <Button onClick={() => mutation.mutate({ services: servicesText.split('\n').filter(Boolean) })} loading={mutation.isPending}>Save Changes</Button>
        </div>
      </Card>
    </div>
  )
}
