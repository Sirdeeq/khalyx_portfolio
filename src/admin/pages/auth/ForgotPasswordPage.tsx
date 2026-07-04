import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('If the email exists, a reset link has been sent.')
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-[#D7E2EA] text-center mb-2">Forgot Password</h1>
          <p className="text-[#D7E2EA]/50 text-sm text-center mb-6">Enter your email to receive a reset link</p>
          {sent ? (
            <div className="text-center">
              <p className="text-green-400 text-sm mb-4">Check your email for the reset link.</p>
              <Link to="/login" className="text-sm text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full rounded-xl font-medium text-white py-2.5 text-sm uppercase tracking-wider"
                style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' }}
              >
                Send Reset Link
              </button>
              <div className="text-center">
                <Link to="/login" className="text-xs text-[#D7E2EA]/40 hover:text-[#D7E2EA]/60 transition-colors">Back to Login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
