import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-8xl font-black text-white/10 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#D7E2EA] mb-2">Page Not Found</h2>
        <p className="text-[#D7E2EA]/50 mb-6">The page you're looking for doesn't exist.</p>
        <Link
          to="/admin"
          className="inline-block rounded-xl font-medium text-white px-6 py-2.5 text-sm uppercase tracking-wider"
          style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
