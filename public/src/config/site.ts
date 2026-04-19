/**
 * JulesX — Site Configuration
 * Types + constants only. All dynamic data fetched from API.
 */

// API Base URL
export const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

// Static site config (not dynamic — used for metadata/SEO)
export const SITE = {
  name: 'JulesX',
  tagline: 'Thiết kế và xây dựng website mang tính trải nghiệm — phù hợp với từng ngành và mục tiêu kinh doanh.',
  copyright: (year = new Date().getFullYear()) =>
    `© ${year} JulesX. All rights reserved.`,
} as const

// Static nav links (not dynamic — part of layout)
export const NAV_LINKS = [
  { label: 'Tổng Quan', href: '/' },
  { label: 'Dự Án', href: '/du-an' },
  { label: 'Dịch Vụ', href: '/dich-vu' },
] as const

// ─── Types (used by components) ──────────────────────────────────

export interface ProjectFeature {
  id: string
  name: string
  cat: string
  catLabel?: string
  coeff?: number
}

export interface Project {
  id: string
  slug?: string
  title: string
  category: string
  designStyle: string
  designStyleIds?: string[]
  webTypeKey?: string
  completedAt: string
  image: string
  featured?: boolean
  order?: number
  field: string
  description: string
  overview?: string
  challenge: string
  solution: string
  duration: string
  stack: string
  lighthouse: string
  gallery: string[]
  techTags: string[]
  features?: ProjectFeature[]
  liveUrl?: string
}

export interface Service {
  id?: string
  number: string
  title: string
  description: string
  tags: string[]
  bgImage: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface SiteSettings {
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  heroCtaLink: string
  email: string
  phone: string
  address: string
  social: {
    dribbble?: string
    behance?: string
    linkedin?: string
    zalo?: string
    messenger?: string
  }
  fabChannels?: Array<{
    name: string
    icon: string
    url: string
    color: string
  }>
  systemTypes?: string[]
}
