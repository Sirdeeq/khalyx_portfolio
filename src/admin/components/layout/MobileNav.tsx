import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

const mainNav = [
  {
    to: '/admin',
    label: 'Dashboard',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    to: '/admin/projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    to: '/admin/gallery',
    label: 'Gallery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    to: '/admin/blog',
    label: 'Blog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
]

const moreItems = [
  { to: '/admin/hero', label: 'Hero', desc: 'Header section' },
  { to: '/admin/about', label: 'About', desc: 'About me' },
  { to: '/admin/organizations', label: 'Organizations', desc: 'Affiliations' },
  { to: '/admin/testimonials', label: 'Testimonials', desc: 'Reviews' },
  { to: '/admin/future-projects', label: 'Future Projects', desc: 'Upcoming work' },
  { to: '/admin/tech-stack', label: 'Tech Stack', desc: 'Skills & tools' },
  { to: '/admin/services', label: 'Services', desc: 'What I offer' },
  { to: '/admin/media', label: 'Media', desc: 'Portfolio media' },
  { to: '/admin/healthcare', label: 'Healthcare', desc: 'Health projects' },
  { to: '/admin/contact', label: 'Messages', desc: 'Inquiries' },
  { to: '/admin/settings', label: 'Settings', desc: 'Configuration' },
]

export default function MobileNav() {
  const [showMore, setShowMore] = useState(false)
  const location = useLocation()

  const inMore = moreItems.some((i) => location.pathname.startsWith(i.to))

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[var(--bg-page)] border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-around h-16 px-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-0.5 w-14 py-1 rounded-xl transition-colors ${
                  isActive ? 'text-[var(--text-body)]' : 'text-[var(--text-muted)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full" />
                  )}
                  <span className={isActive ? 'drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]' : ''}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}

          <button
            onClick={() => setShowMore(true)}
            className={`relative flex flex-col items-center justify-center gap-0.5 w-14 py-1 rounded-xl transition-colors ${
              inMore ? 'text-[var(--text-body)]' : 'text-[var(--text-muted)]'
            }`}
          >
            {inMore && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full" />
            )}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
              <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
              <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-[10px] font-medium leading-none">More</span>
          </button>
        </div>
      </nav>

      {showMore && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowMore(false)} />
          <div
            className="absolute bottom-0 left-0 right-0 bg-[var(--bg-page)] rounded-t-2xl shadow-2xl"
            style={{ maxHeight: 'min(70vh, 520px)' }}
          >
            <div className="sticky top-0 bg-[var(--bg-page)] rounded-t-2xl z-10">
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <h2 className="text-sm font-bold text-[var(--text-body)] tracking-wide uppercase">All Sections</h2>
                <button
                  onClick={() => setShowMore(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--card-bg)] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-3 pb-1">
                <div className="h-px bg-[var(--border-subtle)]" />
              </div>
            </div>

            <div className="overflow-y-auto pb-6 px-3" style={{ maxHeight: 'calc(min(70vh, 520px) - 64px)' }}>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {moreItems.map((item) => {
                  const active = location.pathname.startsWith(item.to)
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setShowMore(false)}
                      className={`flex flex-col gap-0.5 px-3.5 py-3 rounded-xl text-sm transition-all ${
                        active
                          ? 'bg-gradient-to-br from-purple-500/15 via-fuchsia-500/10 to-orange-500/10 text-[var(--text-body)] border border-purple-500/20'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--card-bg)] border border-transparent'
                      }`}
                    >
                      <span className="font-medium text-sm">{item.label}</span>
                      <span className="text-[11px] text-[var(--text-muted-40)]">{item.desc}</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>

            <div className="sticky bottom-0 bg-[var(--bg-page)] rounded-b-2xl px-5 py-3 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setShowMore(false)}
                className="w-full py-2.5 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--card-bg)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
