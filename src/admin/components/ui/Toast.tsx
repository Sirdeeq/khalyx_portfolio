import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1a1a1a',
          color: '#D7E2EA',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          fontSize: '14px',
        },
        success: { iconTheme: { primary: '#4ade80', secondary: '#1a1a1a' } },
        error: { iconTheme: { primary: '#f87171', secondary: '#1a1a1a' } },
      }}
    />
  )
}
