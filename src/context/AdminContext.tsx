import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

/* ── Types ── */
export interface Project {
  num: string
  name: string
  category: string
  features: string
  role: string
  url: string
  col1_img1: string
  col1_img2: string
  col2_img: string
}

export interface GalleryItem {
  src: string
  label: string
  aspect: string
}

export interface SiteData {
  hero: { roles: string[]; tagline: string; portrait: string }
  about: { bio: string; passion: string; values: string[] }
  projects: Project[]
  gallery: GalleryItem[]
  techStack: { category: string; items: string[] }[]
  services: string[]
  media: { title: string; timeline: { title: string; period: string; detail: string }[]; services: string[] }
  healthcare: { title: string; period: string; brief: string; responsibilities: string[] }[]
}

/* ── Defaults ── */
const defaults: SiteData = {
  hero: {
    roles: ['Full Stack Developer', 'UI/UX Designer', 'Motion Graphics Designer', 'Content Creator', 'Healthcare Advocate'],
    tagline: 'I build modern web and mobile applications, create engaging visual content, and leverage technology to solve real-world challenges in education, healthcare, and digital businesses.',
    portrait: 'https://ui-avatars.com/api/?name=Sadiq+Baba+Idris&background=BBCCD7&color=0C0C0C&size=256',
  },
  about: {
    bio: "I'm Sadiq Baba Idris (Khalifa / Sirdurx), a Full Stack Developer, UI/UX Designer, Motion Graphics Designer and Creative Technologist from Kano, Nigeria. I specialize in building scalable web applications, mobile apps, healthcare systems, fintech platforms, educational technology and immersive digital experiences.",
    passion: "I'm passionate about solving problems with technology, creating engaging visual content, and building products that improve lives. I'm interested in AI, startups, fintech, healthcare and education.",
    values: ['Innovation', 'Simplicity', 'Community Impact', 'Learning', 'Leadership'],
  },
  projects: [
    { num: '01', name: 'Paylob', category: 'Fintech', features: 'Secure payments \u2022 Wallet \u2022 Transactions \u2022 Dashboard \u2022 Payment API', role: 'Founder & Lead Developer', url: '', col1_img1: '', col1_img2: '', col2_img: '' },
    { num: '02', name: 'AKY Media Center', category: 'Media & Governance', features: '20 audio tracks \u2022 Live broadcast \u2022 Video streaming \u2022 News portal \u2022 Newsletter \u2022 Social media hub', role: 'Lead Developer - Techlife Global Ventures LTD', url: 'https://akywebsite-henna.vercel.app', col1_img1: '', col1_img2: '', col2_img: '' },
    { num: '03', name: 'Elite Edu Tech', category: 'EdTech', features: 'Student dashboard \u2022 Teacher dashboard \u2022 Online learning \u2022 Educational content', role: 'Frontend Developer', url: '', col1_img1: '', col1_img2: '', col2_img: '' },
    { num: '04', name: 'GAMSAJ International Ltd', category: 'Construction & Engineering', features: 'Building construction \u2022 Civil engineering \u2022 Real estate \u2022 Project management \u2022 Industrial construction', role: 'Lead Developer', url: 'https://gamsaj.com', col1_img1: '', col1_img2: '', col2_img: '' },
  ],
  gallery: [
    { src: '', label: 'Behind-the-scenes', aspect: 'aspect-[3/4]' },
    { src: '', label: 'Event coverage', aspect: 'aspect-[4/3]' },
    { src: '', label: 'Professional portrait', aspect: 'aspect-[3/4]' },
    { src: '', label: 'Design work', aspect: 'aspect-[4/5]' },
    { src: '', label: 'Coding sessions', aspect: 'aspect-[3/4]' },
    { src: '', label: 'Team / Event', aspect: 'aspect-[4/3]' },
    { src: '', label: 'Professional', aspect: 'aspect-[3/4]' },
    { src: '', label: 'Design showcase', aspect: 'aspect-[4/5]' },
    { src: '', label: 'Coding / Workspace', aspect: 'aspect-[3/4]' },
  ],
  techStack: [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'REST APIs'] },
    { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'] },
    { category: 'Mobile', items: ['React Native', 'Flutter'] },
    { category: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel'] },
  ],
  services: ['Web Development', 'Mobile App Development', 'UI/UX Design', 'Motion Graphics', 'Graphic Design', 'Brand Identity', 'Photography', 'Content Creation'],
  media: {
    title: 'Media Portfolio',
    timeline: [
      { title: 'Graphic Design', period: 'Where it all began', detail: 'Started as a freelance Graphic Designer, creating flyers, social media graphics, brand identities, logos, and marketing materials.' },
      { title: 'Photography', period: 'Expanding the vision', detail: 'Expanded into Photography, capturing portraits, events, products, and lifestyle content.' },
      { title: 'Multimedia Production', period: 'Full creative spectrum', detail: 'Developed skills in video editing, motion graphics, content creation, and digital storytelling.' },
    ],
    services: ['Graphic Design', 'Brand Identity Design', 'Social Media Content Design', 'Photography', 'Portrait Photography', 'Event Photography', 'Product Photography', 'Videography', 'Video Editing', 'Motion Graphics', 'Promotional Videos', 'Short-form Content', 'Content Strategy', 'Creative Direction', 'Digital Marketing Visuals', 'UI/UX Design'],
  },
  healthcare: [
    { title: 'Chairman – Voice of Adolescents (VOA)', period: 'Present', brief: 'Youth-led organization supporting adolescents living with HIV', responsibilities: ['Lead and coordinate organizational activities', 'Strategic planning and program implementation'] },
    { title: 'Peer Navigator – iCare+ NAF', period: 'Present', brief: 'Providing peer support for adolescents living with HIV', responsibilities: ['Peer counseling and adherence support', 'Health education sessions'] },
  ],
}

const STORAGE_KEY = 'portfolio_admin_data'

/* ── Context ── */
interface AdminContextType {
  data: SiteData
  update: (section: keyof SiteData, value: unknown) => void
  reset: () => void
  isAdmin: boolean
  setAdmin: (v: boolean) => void
}

const AdminContext = createContext<AdminContextType>(null!)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return { ...defaults, ...JSON.parse(stored) }
    } catch { /* ignore */ }
    return defaults
  })
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const update = (section: keyof SiteData, value: unknown) => {
    setData((prev) => ({ ...prev, [section]: value }))
  }

  const reset = () => {
    setData(defaults)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AdminContext.Provider value={{ data, update, reset, isAdmin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
export { defaults }
