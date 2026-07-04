import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }
    toast.success('Password has been reset. Please login.')
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-sm text-center">
          <p className="text-green-400 text-sm mb-4">Password reset successful!</p>
          <Link to="/login" className="text-sm text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors">Go to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-[#D7E2EA] text-center mb-2">Reset Password</h1>
          <p className="text-[#D7E2EA]/50 text-sm text-center mb-6">Enter your new password</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" value={token} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
            />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
            />
            <button
              type="submit"
              className="w-full rounded-xl font-medium text-white py-2.5 text-sm uppercase tracking-wider"
              style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
