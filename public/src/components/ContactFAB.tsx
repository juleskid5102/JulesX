import { useEffect, useState, useRef } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

/**
 * ContactFAB — Floating Action Button with social channels
 * Adapted from contact-fab.md pattern
 * Channels fetched from /api/public/site-settings { fabChannels }
 */

interface FabChannel {
  name: string
  icon: string
  url: string
  color: string
}

const DEFAULT_CHANNELS: FabChannel[] = [
  { name: 'Zalo', icon: 'chat', url: 'https://zalo.me/', color: '#0068FF' },
  { name: 'Messenger', icon: 'forum', url: 'https://m.me/', color: '#00B2FF' },
  { name: 'Điện thoại', icon: 'call', url: 'tel:', color: '#25D366' },
  { name: 'Email', icon: 'mail', url: 'mailto:', color: '#EA4335' },
]

export function ContactFAB() {
  const [open, setOpen] = useState(false)
  const [channels, setChannels] = useState<FabChannel[]>([])
  const [loading, setLoading] = useState(true)
  const fabRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/site-settings`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        if (data.fabChannels && Array.isArray(data.fabChannels) && data.fabChannels.length > 0) {
          setChannels(data.fabChannels)
        } else {
          // Build from contact info
          const ch: FabChannel[] = []
          if (data.social?.zalo) ch.push({ name: 'Zalo', icon: 'chat', url: data.social.zalo, color: '#0068FF' })
          if (data.social?.messenger) ch.push({ name: 'Messenger', icon: 'forum', url: data.social.messenger, color: '#00B2FF' })
          if (data.phone) ch.push({ name: 'Gọi điện', icon: 'call', url: `tel:${data.phone}`, color: '#25D366' })
          if (data.email) ch.push({ name: 'Email', icon: 'mail', url: `mailto:${data.email}`, color: '#EA4335' })
          setChannels(ch.length > 0 ? ch : DEFAULT_CHANNELS)
        }
      })
      .catch(() => setChannels(DEFAULT_CHANNELS))
      .finally(() => setLoading(false))
  }, [])

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (loading || channels.length === 0) return null

  return (
    <div ref={fabRef} className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
      {/* Main FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        title="Liên hệ"
      >
        <span className="material-symbols-outlined text-2xl">
          {open ? 'close' : 'chat'}
        </span>
      </button>

      {/* Channel items — fan out */}
      {channels.map((ch, i) => (
        <a
          key={ch.name}
          href={ch.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full text-white shadow-md flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: ch.color,
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(16px)',
            transitionDelay: open ? `${i * 60}ms` : '0ms',
            pointerEvents: open ? 'auto' : 'none',
          }}
          title={ch.name}
        >
          <span className="material-symbols-outlined text-xl">{ch.icon}</span>
        </a>
      ))}

      {/* Label tooltip */}
      {open && channels.map((ch, i) => (
        <span
          key={`label-${ch.name}`}
          className="absolute right-16 text-sm font-medium bg-slate-900 text-white px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg transition-all duration-300"
          style={{
            bottom: `${(i + 1) * 60 + 8}px`,
            opacity: open ? 1 : 0,
            transform: open ? 'translateX(0)' : 'translateX(8px)',
            transitionDelay: `${i * 60 + 100}ms`,
          }}
        >
          {ch.name}
        </span>
      ))}

      {/* Pulse animation when closed */}
      {!open && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-primary/20 animate-ping pointer-events-none" />
      )}
    </div>
  )
}
