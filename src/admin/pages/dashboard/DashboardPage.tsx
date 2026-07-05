import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { heroApi } from '../../../lib/api/hero'
import { projectsApi } from '../../../lib/api/projects'
import { contactApi } from '../../../lib/api/contact'
import { visitsApi } from '../../../lib/api/visits'
import Card from '../../components/ui/Card'

let deferredPrompt: any = null
window.addEventListener('beforeinstallprompt', (e: Event) => { e.preventDefault(); deferredPrompt = e })

export default function DashboardPage() {
  const [installable, setInstallable] = useState(false)

  useEffect(() => {
    if (deferredPrompt) setInstallable(true)
    const handler = (e: Event) => { e.preventDefault(); deferredPrompt = e; setInstallable(true) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') { deferredPrompt = null; setInstallable(false) }
  }

  const { data: hero } = useQuery({ queryKey: ['hero'], queryFn: heroApi.get })
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: () => projectsApi.list({ limit: 100 }) })
  const { data: contacts } = useQuery({ queryKey: ['contacts'], queryFn: () => contactApi.list({ limit: 100 }) })
  const { data: visits } = useQuery({ queryKey: ['visits'], queryFn: () => visitsApi.stats(), refetchInterval: 30000 })

  const stats = [
    { label: 'Total Visits', value: visits?.data?.totalVisits ?? 0, color: 'border-cyan-500' },
    { label: 'Projects', value: projects?.data?.length ?? 0, color: 'border-purple-500' },
    { label: 'Hero Roles', value: hero?.data?.roles?.length ?? 0, color: 'border-blue-500' },
    { label: 'Messages', value: contacts?.pagination?.total ?? 0, color: 'border-orange-500' },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`bg-[var(--card-bg)] backdrop-blur-xl rounded-xl border-l-4 ${s.color} border border-[var(--border-subtle)] p-5`}>
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-[var(--text-body)]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Quick Actions">
          <div className="space-y-2">
            {[
              { label: 'Edit Hero Section', to: '/admin/hero' },
              { label: 'Manage Projects', to: '/admin/projects' },
              { label: 'View Messages', to: '/admin/contact' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.to}
                className="block px-4 py-3 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-[var(--text-body)] text-sm transition-colors"
              >
                {action.label}
              </a>
            ))}
            {installable && (
              <button
                onClick={handleInstall}
                className="w-full text-left px-4 py-3 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-[var(--text-body)] text-sm transition-colors"
              >
                {installable ? 'Save as App' : 'Install App'}
              </button>
            )}
          </div>
        </Card>

        <Card title="Recent Messages">
          <div className="space-y-3">
            {(contacts?.data ?? []).slice(0, 5).map((msg) => (
              <div key={msg._id} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${msg.isRead ? 'bg-green-500/50' : 'bg-yellow-500'}`} />
                <div className="min-w-0">
                  <p className="text-[var(--text-body)] truncate">{msg.name}</p>
                  <p className="text-[var(--text-muted-40)] text-xs truncate">{msg.message}</p>
                </div>
              </div>
            ))}
            {contacts?.data?.length === 0 && <p className="text-[var(--text-muted-30)] text-sm">No messages yet</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}
