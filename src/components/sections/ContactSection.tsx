import { useState, type FormEvent } from 'react'
import { Mail, Code, Camera, Heart, Phone, Smartphone, Loader2 } from 'lucide-react'
import FadeIn from '../ui/FadeIn'
import ContactButton from '../ui/ContactButton'
import { contactApi } from '../../lib/api/contact'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA] group-hover:text-white" width={20} height={20}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA] group-hover:text-white" width={20} height={20}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA] group-hover:text-white" width={20} height={20}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#D7E2EA] group-hover:text-white" width={20} height={20}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M17.232 4.768l-4.464 4.464" stroke="currentColor" strokeWidth="2" />
  </svg>
)
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA] group-hover:text-white" width={20} height={20}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA] group-hover:text-white" width={20} height={20}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const contactInfo = [
  { platform: 'Email (Personal)', value: 'ssirdeeq@gmail.com', href: 'mailto:ssirdeeq@gmail.com', icon: Mail },
  { platform: 'Email (Coding)', value: 'sirdurxcodelabs@gmail.com', href: 'mailto:sirdurxcodelabs@gmail.com', icon: Code },
  { platform: 'Email (Media)', value: 'brainstormmediaservices@gmail.com', href: 'mailto:brainstormmediaservices@gmail.com', icon: Camera },
  { platform: 'Email (Health)', value: 'voiceofadolescence1@gmail.com', href: 'mailto:voiceofadolescence1@gmail.com', icon: Heart },
  { platform: 'Phone (Media)', value: '+234 816 178 1643', href: 'tel:+2348161781643', icon: Phone },
  { platform: 'Phone (Personal)', value: '+234 802 799 9992', href: 'tel:+2348027999992', icon: Smartphone },
]

const socialLinks = [
  { name: 'Instagram', handle: '@khalyx__', url: 'https://www.instagram.com/khalyx__/', icon: InstagramIcon },
  { name: 'Facebook', handle: 'sirdurx.idris', url: 'https://web.facebook.com/sirdurx.idris', icon: FacebookIcon },
  { name: 'LinkedIn', handle: 'sadiq-idris-baba', url: 'https://www.linkedin.com/in/sadiq-idris-baba-26683822b/', icon: LinkedInIcon },
  { name: 'X (Twitter)', handle: '@sirdurx', url: 'https://x.com/sirdurx', icon: XIcon },
  { name: 'GitHub', handle: 'Sirdeeq', url: 'https://github.com/Sirdeeq', icon: GitHubIcon },
  { name: 'TikTok', handle: '@khalyx__', url: 'https://www.tiktok.com/@khalyx__', icon: TikTokIcon },
]

const reasons = [
  'Web Development Project',
  'Mobile App Development',
  'UI/UX Design',
  'Motion Graphics / Video Editing',
  'Graphic Design / Branding',
  'Healthcare / Advocacy Collaboration',
  'General Inquiry',
  'Collaboration / Partnership',
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', reason: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await contactApi.send(form)
      setSent(true)
      setForm({ name: '', email: '', phone: '', reason: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch {
      /* error shown by toast interceptor */
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Contact Info */}
        <FadeIn x={-20} delay={0.1}>
          <div className="space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:border-white/30 hover:bg-white/[0.07] transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-[#D7E2EA]" size={18} />
                  </div>
                  <div>
                    <p className="text-[#D7E2EA]/50 text-xs font-medium uppercase tracking-wider">{item.platform}</p>
                    <p className="text-[#D7E2EA] text-sm font-medium group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </FadeIn>

        {/* Contact Form */}
        <FadeIn x={20} delay={0.15}>
          {sent ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-10 flex flex-col items-center justify-center text-center h-full">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <span className="text-green-400 text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#D7E2EA] mb-2">Message Sent!</h3>
              <p className="text-[#D7E2EA]/60">Your message has been sent. I'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
                />
              </div>

              <input
                type="tel"
                placeholder="Your Phone (for WhatsApp reply)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm"
              />

              <select
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#D7E2EA] outline-none focus:border-white/30 transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-[#0C0C0C]">
                  What are you contacting me about? *
                </option>
                {reasons.map((r) => (
                  <option key={r} value={r} className="bg-[#0C0C0C]">
                    {r}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Your Message *"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 outline-none focus:border-white/30 transition-colors text-sm resize-none"
              />

              <p className="text-[#D7E2EA]/40 text-xs leading-relaxed">
                Your message will be sent to my email and WhatsApp. I typically respond within 30 minutes during business hours.
              </p>

              <ContactButton disabled={loading}>
                {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                {loading ? 'Sending...' : 'Send Message'}
              </ContactButton>
            </form>
          )}
        </FadeIn>
      </div>

      {/* Social Links */}
      <FadeIn y={20} delay={0.3}>
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-300">
                  <Icon />
                </div>
                <span className="text-[#D7E2EA]/60 text-xs group-hover:text-[#D7E2EA] transition-colors">
                  {link.handle}
                </span>
              </a>
            )
          })}
        </div>
      </FadeIn>
    </section>
  )
}
