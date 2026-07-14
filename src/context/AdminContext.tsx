import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

/* ── Types ── */
export interface Project {
  num: string
  name: string
  category: string
  features: string
  impact: string
  role: string
  url: string
  col1_img1: string
  col1_img2: string
  col2_img: string
}

export interface GalleryAsset {
  src: string
  type: 'image' | 'video'
  thumbnail: string
}

export interface GalleryItem {
  assets: GalleryAsset[]
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
  organizations: { name: string; role: string; description: string; url: string }[]
  testimonials: { name: string; role: string; company: string; text: string; avatar: string; rating: number }[]
  futureProjects: { name: string; description: string; category: string; status: string }[]
}

/* ── Defaults ── */
const defaults: SiteData = {
  hero: {
    roles: ['Full Stack Developer', 'Data & Digital Solutions', 'Healthcare Advocate'],
    tagline: 'Building technology that improves healthcare, education, and community development through secure digital solutions and data-driven applications.',
    portrait: 'https://ui-avatars.com/api/?name=Sadiq+Baba+Idris&background=BBCCD7&color=0C0C0C&size=256',
  },
  about: {
    bio: "I am a Full Stack Developer and Healthcare Advocate passionate about using technology to solve real-world problems. My experience spans software engineering, healthcare programmes, digital product development, and community advocacy. I have built applications that improve patient management, organizational workflows, education, and financial services while supporting initiatives focused on public health and youth empowerment.",
    passion: "I enjoy creating scalable digital solutions that transform complex data into meaningful insights, helping organizations make informed decisions and deliver greater impact. I am committed to leveraging technology for humanitarian and international development initiatives.",
    values: ['Innovation', 'Data-Driven Impact', 'Community Health', 'Leadership', 'Humanitarian Service'],
  },
  projects: [
    { num: '01', name: 'Paylob', category: 'Fintech', features: 'Secure payments \u2022 Wallet \u2022 Transactions \u2022 Dashboard \u2022 Payment API', impact: 'Built to simplify secure online payments through reliable transaction management and user-friendly financial technology.', role: 'Founder & Lead Developer', url: '', col1_img1: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop', col1_img2: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop', col2_img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=900&fit=crop' },
    { num: '02', name: 'AKY Media Center', category: 'Media & Governance', features: '20 audio tracks \u2022 Live broadcast \u2022 Video streaming \u2022 News portal \u2022 Newsletter \u2022 Social media hub', impact: 'Designed to strengthen media engagement and governance communication through a centralized digital platform for broadcasting, news, and community outreach.', role: 'Lead Developer - Techlife Global Ventures LTD', url: 'https://akywebsite-henna.vercel.app', col1_img1: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=400&fit=crop', col1_img2: 'https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=800&h=600&fit=crop', col2_img: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&h=900&fit=crop' },
    { num: '03', name: 'Elite Edu Tech', category: 'EdTech', features: 'Student dashboard \u2022 Teacher dashboard \u2022 Online learning \u2022 Educational content', impact: 'Created to improve access to education through digital learning tools, student tracking, and interactive educational content delivery.', role: 'Frontend Developer', url: '', col1_img1: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop', col1_img2: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', col2_img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=900&fit=crop' },
    { num: '04', name: 'GAMSAJ International Ltd', category: 'Construction & Engineering', features: 'Building construction \u2022 Civil engineering \u2022 Real estate \u2022 Project management \u2022 Industrial construction', impact: 'Developed to streamline construction project management and strengthen online presence for an engineering firm serving industrial and residential sectors.', role: 'Lead Developer', url: 'https://gamsaj.com', col1_img1: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop', col1_img2: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop', col2_img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=900&fit=crop' },
  ],
  gallery: [
    { assets: [], label: 'Behind-the-scenes', aspect: 'aspect-[3/4]' },
    { assets: [], label: 'Event coverage', aspect: 'aspect-[4/3]' },
    { assets: [], label: 'Professional portrait', aspect: 'aspect-[3/4]' },
    { assets: [], label: 'Design work', aspect: 'aspect-[4/5]' },
    { assets: [], label: 'Coding sessions', aspect: 'aspect-[3/4]' },
    { assets: [], label: 'Team / Event', aspect: 'aspect-[4/3]' },
    { assets: [], label: 'Professional', aspect: 'aspect-[3/4]' },
    { assets: [], label: 'Design showcase', aspect: 'aspect-[4/5]' },
    { assets: [], label: 'Motion graphics', aspect: 'aspect-[16/9]' },
    { assets: [], label: 'Photography', aspect: 'aspect-[3/4]' },
  ],
  techStack: [
    { category: 'Data & Analytics', items: ['Excel (Advanced)', 'Data Quality Assurance', 'Data Entry & Validation', 'Data Analysis', 'Reporting', 'Monitoring & Evaluation (MEAL Support)'] },
    { category: 'Software Development', items: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'REST APIs', 'MySQL', 'MongoDB'] },
    { category: 'Healthcare Systems', items: ['Digital Patient Management', 'Treatment Adherence Tracking', 'Patient Data Collection', 'Healthcare Reporting', 'Community Health Tools'] },
    { category: 'Cloud & Deployment', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Firebase'] },
    { category: 'Leadership & Communication', items: ['Stakeholder Communication', 'Information Management', 'Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint', 'SharePoint', 'Team Leadership', 'Community Engagement'] },
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
    { title: 'Chairman – Voice of Adolescents (VOA)', period: 'Present', brief: 'Youth-led organization supporting adolescents living with HIV', responsibilities: ['Lead and coordinate organizational activities', 'Strategic planning and program implementation', 'Community engagement and stakeholder coordination', 'Youth leadership development and mentorship'] },
    { title: 'Peer Navigator – iCare Plus Project', period: 'Present', brief: 'Providing peer support for adolescents living with HIV', responsibilities: ['Peer counseling and adherence support', 'Health education sessions', 'Supported patient data collection, documentation, and follow-up for adolescents receiving HIV treatment', 'Maintained accurate client records and monitored treatment adherence', 'Assisted healthcare teams with reporting and tracking patient outcomes', 'Engaged with community stakeholders to improve service delivery', 'Contributed to digital patient management through the design of a healthcare tracking application'] },
  ],
  organizations: [],
  testimonials: [],
  futureProjects: [],
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
