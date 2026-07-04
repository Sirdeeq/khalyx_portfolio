import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/hero': 'Hero Section',
  '/admin/about': 'About Section',
  '/admin/projects': 'Projects',
  '/admin/gallery': 'Gallery',
  '/admin/tech-stack': 'Tech Stack',
  '/admin/services': 'Services',
  '/admin/media': 'Media Portfolio',
  '/admin/healthcare': 'Healthcare',
  '/admin/contact': 'Messages',
  '/admin/settings': 'Settings',
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const path = window.location.pathname
  const title = Object.entries(pageTitles).find(([key]) => path.startsWith(key))?.[1] || 'Admin'

  return (
    <div className="flex h-screen bg-[#0C0C0C]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
