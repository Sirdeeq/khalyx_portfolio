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
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-[var(--text-body)] text-center mb-2">Forgot Password</h1>
          <p className="text-[var(--text-muted)] text-sm text-center mb-6">Enter your email to receive a reset link</p>
          {sent ? (
            <div className="text-center">
              <p className="text-green-400 text-sm mb-4">Check your email for the reset link.</p>
              <Link to="/login" className="text-sm text-[var(--text-muted-60)] hover:text-[var(--text-body)] transition-colors">
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
                className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-[var(--text-body)] placeholder:text-[var(--text-muted-30)] outline-none focus:border-[var(--text-muted-30)] transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full rounded-xl font-medium text-white py-2.5 text-sm uppercase tracking-wider"
                style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' }}
              >
                Send Reset Link
              </button>
              <div className="text-center">
                <Link to="/login" className="text-xs text-[var(--text-muted-40)] hover:text-[var(--text-muted-60)] transition-colors">Back to Login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}