import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../../lib/api/auth'
import toast from 'react-hot-toast'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) => authApi.changePassword(data),
    onSuccess: () => { toast.success('Password changed'); setCurrentPassword(''); setNewPassword(''); setConfirmPassword('') },
    onError: () => toast.error('Failed to change password'),
  })

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return }
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return }
    mutation.mutate({ currentPassword, newPassword })
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Card title="Change Password">
        <div className="space-y-4">
          <Input label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button onClick={handleChangePassword} loading={mutation.isPending}>Update Password</Button>
        </div>
      </Card>

      <Card title="Data Management">
        <div className="space-y-3">
          <p className="text-sm text-[#D7E2EA]/50">Export all portfolio data as JSON backup, or import from a previous backup.</p>
          <Button variant="secondary" size="sm" onClick={() => {
            const stored = localStorage.getItem('portfolio_admin_data')
            if (stored) {
              const blob = new Blob([stored], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = 'portfolio-backup.json'; a.click()
              URL.revokeObjectURL(url)
            } else {
              toast.error('No local data to export')
            }
          }}>Export Local Data</Button>
        </div>
      </Card>
    </div>
  )
}
