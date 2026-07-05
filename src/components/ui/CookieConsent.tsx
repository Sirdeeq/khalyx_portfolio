import { useState, useEffect } from 'react'

const KEY = 'portfolio-cookies-accepted'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[var(--card-bg)] border-t border-[var(--border-subtle)] backdrop-blur-xl p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-muted)]">
          This site uses cookies for analytics and basic functionality. By continuing you accept our cookie policy.
        </p>
        <button
          onClick={() => { localStorage.setItem(KEY, 'true'); setShow(false) }}
          className="shrink-0 px-5 py-2 rounded-lg text-sm font-medium bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
