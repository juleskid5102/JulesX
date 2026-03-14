/**
 * Jules Studio — API Client
 * Centralizes all API calls to the backend worker.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `API ${res.status}`)
  }
  return res.json()
}

// ── Public endpoints ──

export interface PortfolioProject {
  id: string
  title: string
  category: string
  year: string
  image: string
  type?: string
  description?: string
  technologies?: string[]
  featured?: boolean
}

export interface SiteSettings {
  systemTypes: Array<{ id: string; name: string; description: string; basePrice: number }>
  modules: Array<{ id: string; name: string; description: string; price: number }>
  contact: {
    email: string
    phone: string
    address: string
    bankName?: string
    bankAccount?: string
    bankOwner?: string
  }
}

export interface TrackingData {
  shortId: string
  status: string
  projectName: string
  projectType: string
  progress: Array<{ label: string; completed: boolean; current: boolean }>
  timeline: Array<{ title: string; date: string }>
  documents: Array<{ name: string; url?: string }>
  estimatedDelivery?: string
}

/** GET /api/public/portfolio */
export async function fetchPortfolio(type = 'all'): Promise<PortfolioProject[]> {
  const data = await apiFetch<{ data: PortfolioProject[] }>(
    `/api/public/portfolio?type=${encodeURIComponent(type)}`
  )
  return data.data || []
}

/** GET /api/public/settings */
export async function fetchSettings(): Promise<SiteSettings> {
  const data = await apiFetch<{ data: SiteSettings }>('/api/public/settings')
  return data.data
}

/** GET /api/public/track/:token */
export async function fetchTracking(token: string): Promise<TrackingData> {
  const data = await apiFetch<{ data: TrackingData }>(
    `/api/public/track/${encodeURIComponent(token)}`
  )
  return data.data
}

/** POST /api/public/contact */
export async function submitContact(body: {
  name: string
  email: string
  phone?: string
  message: string
  service?: string
}): Promise<{ success: boolean; message: string }> {
  return apiFetch('/api/public/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

/** POST /api/public/submit-project */
export async function submitProject(body: {
  clientInfo: { name: string; email: string; phone: string; company?: string }
  websiteType: string
  websiteTypeName: string
  selectedFeatures: string[]
  budget?: string
  timeline?: string
  notes?: string
}): Promise<{ success: boolean; message: string; trackingToken?: string }> {
  return apiFetch('/api/public/submit-project', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
