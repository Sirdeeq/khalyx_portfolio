import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { heroApi } from '../../../lib/api/hero'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import ImageUpload from '../../components/ui/ImageUpload'

export default function HeroEditPage() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['hero'], queryFn: heroApi.get })
  const [rolesText, setRolesText] = useState('')
  const [tagline, setTagline] = useState('')
  const [portrait, setPortrait] = useState('')

  useEffect(() => {
    if (data?.data) {
      setRolesText(data.data.roles.join('\n'))
      setTagline(data.data.tagline)
      setPortrait(data.data.portrait)
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: (payload: Parameters<typeof heroApi.update>[0]) => heroApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero'] })
      toast.success('Hero section updated')
    },
    onError: () => toast.error('Failed to update'),
  })

  const handleSave = () => {
    mutation.mutate({
      roles: rolesText.split('\n').map((r) => r.trim()).filter(Boolean),
      tagline,
      portrait,
    })
  }

  if (isLoading) return <p className="text-[#D7E2EA]/50">Loading...</p>

  return (
    <div className="max-w-3xl space-y-6">
      <Card title="Hero Section">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-2">Roles (one per line)</label>
            <textarea value={rolesText} onChange={(e) => setRolesText(e.target.value)} rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-2">Tagline</label>
            <textarea value={tagline} onChange={(e) => setTagline(e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#D7E2EA] outline-none focus:border-white/30 text-sm resize-none" />
          </div>
          <ImageUpload value={portrait} onChange={setPortrait} label="Portrait Image" placeholder="Portrait image URL..." />
          <Button onClick={handleSave} loading={mutation.isPending}>Save Changes</Button>
        </div>
      </Card>
    </div>
  )
}
