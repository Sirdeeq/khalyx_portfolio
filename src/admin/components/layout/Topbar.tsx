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
    <header className="h-14 lg:h-16 border-b border-[var(--border-subtle)] flex items-center justify-between px-4 lg:px-6 bg-[var(--bg-page)]">
      <h1 className="text-base lg:text-lg font-bold text-[var(--text-body)] truncate">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="hidden lg:block text-sm text-[var(--text-muted)] truncate max-w-[180px]">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="text-xs text-red-400/70 hover:text-red-400 transition-colors uppercase tracking-wider font-medium shrink-0"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
