import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { aboutApi } from '../../../lib/api/about'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

export default function AboutEditPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['about'], queryFn: aboutApi.get })
  const [bio, setBio] = useState('')
  const [passion, setPassion] = useState('')
  const [valuesText, setValuesText] = useState('')

  useEffect(() => {
    if (data?.data) {
      setBio(data.data.bio)
      setPassion(data.data.passion)
      setValuesText(data.data.values.join('\n'))
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: (payload: Parameters<typeof aboutApi.update>[0]) => aboutApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] })
      toast.success('About section updated')
    },
    onError: () => toast.error('Failed to update'),
  })

  const handleSave = () => {
    mutation.mutate({
      bio,
      passion,
      values: valuesText.split('\n').map((v) => v.trim()).filter(Boolean),
    })
  }

  if (isLoading) return <p className="text-[#D7E2EA]/50">Loading...</p>

  return (
    <div className="max-w-3xl space-y-6">
      <Card title="About Section">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-2">Bio (marquee text)</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-2">Passion</label>
            <textarea value={passion} onChange={(e) => setPassion(e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-2">Values (one per line)</label>
            <textarea value={valuesText} onChange={(e) => setValuesText(e.target.value)} rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <Button onClick={handleSave} loading={mutation.isPending}>Save Changes</Button>
        </div>
      </Card>
    </div>
  )
}
