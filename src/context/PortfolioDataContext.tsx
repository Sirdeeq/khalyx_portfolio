import { createContext, useContext } from 'react'
import { useQueries } from '@tanstack/react-query'
import { heroApi } from '../lib/api/hero'
import { aboutApi } from '../lib/api/about'
import { projectsApi } from '../lib/api/projects'
import { galleryApi } from '../lib/api/gallery'
import { techStackApi } from '../lib/api/techStack'
import { servicesApi } from '../lib/api/services'
import { mediaApi } from '../lib/api/media'
import { healthcareApi } from '../lib/api/healthcare'
import { organizationsApi } from '../lib/api/organizations'
import { testimonialsApi } from '../lib/api/testimonials'
import { blogApi } from '../lib/api/blog'
import { futureProjectsApi } from '../lib/api/futureProjects'
import { defaults } from './AdminContext'

export interface PortfolioData {
  hero: { roles: string[]; tagline: string; portrait: string }
  about: { bio: string; passion: string; values: string[] }
  projects: Array<{
    _id?: string; num: string; name: string; category: string; features: string; role: string; url?: string
    col1_img1: string; col1_img2: string; col2_img: string
  }>
  gallery: Array<{ _id?: string; src: string; label: string; aspect: string }>
  techStack: Array<{ category: string; items: string[] }>
  services: Array<{ name: string; description: string; icon: string }>
  media: { title: string; timeline: Array<{ title: string; period: string; detail: string }>; services: string[] }
  healthcare: Array<{ _id?: string; title: string; period: string; brief: string; responsibilities: string[]; highlight?: string }>
  organizations: Array<{ name: string; role: string; description: string; url: string }>
  testimonials: Array<{ name: string; role: string; company: string; text: string; avatar: string; rating: number }>
  blogPosts: Array<{ _id?: string; title: string; slug: string; excerpt: string; image: string; images: string[]; tags: string[]; readTime: string; createdAt: string }>
  futureProjects: Array<{ name: string; description: string; category: string; status: string }>
}

const defaultData: PortfolioData = {
  hero: defaults.hero,
  about: defaults.about,
  projects: defaults.projects.map(p => ({ ...p, col1_img1: p.col1_img1 || '', col1_img2: p.col1_img2 || '', col2_img: p.col2_img || '' })),
  gallery: defaults.gallery.map(g => ({ ...g, src: g.src || '' })),
  techStack: defaults.techStack,
  services: defaults.services.map(s => ({ name: s, description: '', icon: '' })),
  media: defaults.media,
  healthcare: defaults.healthcare as PortfolioData['healthcare'],
  organizations: defaults.organizations,
  testimonials: defaults.testimonials,
  blogPosts: [],
  futureProjects: defaults.futureProjects,
}

const PortfolioDataContext = createContext<PortfolioData>(defaultData)

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const results = useQueries({
    queries: [
      { queryKey: ['hero'], queryFn: heroApi.get, staleTime: 60000, retry: false },
      { queryKey: ['about'], queryFn: aboutApi.get, staleTime: 60000, retry: false },
      { queryKey: ['projects'], queryFn: () => projectsApi.list({ limit: 50 }), staleTime: 60000, retry: false },
      { queryKey: ['gallery'], queryFn: () => galleryApi.list({ limit: 50 }), staleTime: 60000, retry: false },
      { queryKey: ['techStack'], queryFn: techStackApi.list, staleTime: 60000, retry: false },
      { queryKey: ['services'], queryFn: servicesApi.list, staleTime: 60000, retry: false },
      { queryKey: ['media'], queryFn: mediaApi.get, staleTime: 60000, retry: false },
      { queryKey: ['healthcare'], queryFn: healthcareApi.list, staleTime: 60000, retry: false },
      { queryKey: ['organizations'], queryFn: organizationsApi.list, staleTime: 60000, retry: false },
      { queryKey: ['testimonials'], queryFn: testimonialsApi.list, staleTime: 60000, retry: false },
      { queryKey: ['blog'], queryFn: () => blogApi.list({ limit: 50 }), staleTime: 60000, retry: false },
      { queryKey: ['futureProjects'], queryFn: futureProjectsApi.list, staleTime: 60000, retry: false },
    ],
  })

  const heroData = results[0].data?.data
  const aboutData = results[1].data?.data
  const projectsRaw = results[2].data
  const galleryRaw = results[3].data
  const techRaw = results[4].data
  const servicesRaw = results[5].data
  const mediaData = results[6].data?.data
  const healthcareRaw = results[7].data
  const orgsRaw = results[8].data
  const testimRaw = results[9].data
  const blogRaw = results[10].data
  const futureRaw = results[11].data

  const data: PortfolioData = {
    hero: heroData ? { roles: heroData.roles, tagline: heroData.tagline, portrait: heroData.portrait } : defaultData.hero,
    about: aboutData ? { bio: aboutData.bio, passion: aboutData.passion, values: aboutData.values } : defaultData.about,
    projects: projectsRaw?.data?.length ? projectsRaw.data.map(p => ({
      _id: p._id, num: p.num, name: p.name, category: p.category, features: p.features, role: p.role, url: p.url,
      col1_img1: p.col1_img1 || '', col1_img2: p.col1_img2 || '', col2_img: p.col2_img || '',
    })) : defaultData.projects,
    gallery: galleryRaw?.data?.length ? galleryRaw.data.map(g => ({
      _id: g._id, src: g.src || '', label: g.label, aspect: g.aspect,
    })) : defaultData.gallery,
    techStack: Array.isArray(techRaw?.data) && techRaw.data.length ? techRaw.data : defaultData.techStack,
    services: Array.isArray(servicesRaw?.data) && servicesRaw.data.length ? servicesRaw.data.map((s: any) => ({ name: s.name, description: s.description, icon: s.icon })) : defaultData.services,
    media: mediaData ? { title: mediaData.title, timeline: mediaData.timeline || [], services: mediaData.services || [] } : defaultData.media,
    healthcare: Array.isArray(healthcareRaw?.data) && healthcareRaw.data.length ? healthcareRaw.data as PortfolioData['healthcare'] : defaultData.healthcare,
    organizations: Array.isArray(orgsRaw?.data) && orgsRaw.data.length ? orgsRaw.data : defaultData.organizations,
    testimonials: Array.isArray(testimRaw?.data) && testimRaw.data.length ? testimRaw.data : defaultData.testimonials,
    blogPosts: Array.isArray(blogRaw?.data) && blogRaw.data.length ? blogRaw.data.map((p: any) => ({
      _id: p._id, title: p.title, slug: p.slug, excerpt: p.excerpt || '', image: p.image || '',
      images: p.images || [], tags: p.tags || [], readTime: p.readTime || '', createdAt: p.createdAt || '',
    })) : [],
    futureProjects: Array.isArray(futureRaw?.data) && futureRaw.data.length ? futureRaw.data : defaultData.futureProjects,
  }

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  )
}

export const usePortfolioData = () => useContext(PortfolioDataContext)
