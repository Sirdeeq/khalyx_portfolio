import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import MobileNav from './MobileNav'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/hero': 'Hero Section',
  '/admin/about': 'About Section',
  '/admin/projects': 'Projects',
  '/admin/organizations': 'Organizations',
  '/admin/testimonials': 'Testimonials',
  '/admin/blog': 'Blog',
  '/admin/future-projects': 'Future Projects',
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
  const path = useLocation().pathname
  const title = Object.entries(pageTitles).find(([key]) => path.startsWith(key))?.[1] || 'Admin'

  return (
    <div data-theme="dark" className="flex h-screen bg-[#0C0C0C]">
      <div className="hidden lg:flex">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
