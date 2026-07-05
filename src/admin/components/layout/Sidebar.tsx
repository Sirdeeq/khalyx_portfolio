import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '◉', end: true },
  { to: '/admin/hero', label: 'Hero', icon: '★' },
  { to: '/admin/about', label: 'About', icon: '◎' },
  { to: '/admin/projects', label: 'Projects', icon: '♦' },
  { to: '/admin/organizations', label: 'Organizations', icon: '▤' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: '♛' },
  { to: '/admin/blog', label: 'Blog', icon: '✎' },
  { to: '/admin/future-projects', label: 'Future Projects', icon: '◈' },
  { to: '/admin/gallery', label: 'Gallery', icon: '▣' },
  { to: '/admin/tech-stack', label: 'Tech Stack', icon: '◆' },
  { to: '/admin/services', label: 'Services', icon: '○' },
  { to: '/admin/media', label: 'Media', icon: '▶' },
  { to: '/admin/healthcare', label: 'Healthcare', icon: '♥' },
  { to: '/admin/contact', label: 'Messages', icon: '✉' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`bg-[var(--bg-page)] border-r border-[var(--border-subtle)] flex flex-col flex-shrink-0 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-subtle)]">
        {!collapsed && <span className="text-lg font-bold text-[var(--text-body)]">Portfolio</span>}
        <button
          onClick={onToggle}
          className="text-[var(--text-muted)] hover:text-[var(--text-body)] transition-colors text-lg mx-auto"
        >
          {collapsed ? '☰' : '✕'}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--card-bg)] text-[var(--text-body)] font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--card-bg)]'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
