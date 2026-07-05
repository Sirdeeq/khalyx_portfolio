export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface ProjectData {
  _id: string
  num: string
  name: string
  category: string
  features: string
  role: string
  url: string
  col1_img1: string
  col1_img2: string
  col2_img: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface GalleryData {
  _id: string
  src: string
  label: string
  aspect: string
  order: number
  isActive: boolean
}

export interface HeroData {
  _id: string
  roles: string[]
  tagline: string
  portrait: string
}

export interface AboutData {
  _id: string
  bio: string
  passion: string
  values: string[]
}

export interface MediaData {
  _id: string
  title: string
  timeline: { title: string; period: string; detail: string }[]
  services: string[]
}

export interface HealthcareData {
  _id: string
  title: string
  period: string
  brief: string
  responsibilities: string[]
  highlight: string
  order: number
}

export interface ContactMessageData {
  _id: string
  name: string
  email: string
  phone: string
  reason: string
  message: string
  isRead: boolean
  reply: string
  createdAt: string
}

export interface TechStackData {
  _id: string
  category: string
  items: string[]
  order: number
}

export interface ServiceData {
  _id: string
  name: string
  description: string
  icon: string
  order: number
}
