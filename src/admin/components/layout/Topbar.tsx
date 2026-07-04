import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../lib/store/authStore'

interface TopbarProps {
  title: string
}

export default function Topbar({ title }: TopbarProps) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0C0C0C]">
      <div>
        <h1 className="text-lg font-bold text-[#D7E2EA]">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#D7E2EA]/50">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="text-xs text-red-400/70 hover:text-red-400 transition-colors uppercase tracking-wider font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
