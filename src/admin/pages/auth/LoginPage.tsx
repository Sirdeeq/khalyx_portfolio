import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuthStore } from '../../../lib/store/authStore'
import { authApi } from '../../../lib/api/auth'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.login({ email, password })
      setAuth(res.data.user, res.data.token)
      toast.success('Login successful')
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Login failed'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#D7E2EA]">Admin Login</h1>
            <p className="text-[#D7E2EA]/50 text-sm mt-1">Sign in to manage your portfolio</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#D7E2EA]/70 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl font-medium text-white py-2.5 text-sm uppercase tracking-wider disabled:opacity-50"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-xs text-[#D7E2EA]/40 hover:text-[#D7E2EA]/60 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-[#D7E2EA]/30 hover:text-[#D7E2EA]/50 transition-colors">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
        <p className="text-center text-[#D7E2EA]/20 text-xs mt-4">Default: admin@example.com / admin123</p>
      </div>
    </div>
  )
}
