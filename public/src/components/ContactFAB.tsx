import { useEffect, useState, useRef } from 'react'
import { API_BASE } from '../config/site'

/**
 * ContactFAB — Arc-layout Floating Action Button
 * Channels fan out in a quarter-circle arc (bottom-right origin)
 * Uses inline SVG icons instead of Material Symbols
 */

interface FabChannel {
  name: string
  icon: string
  url: string
  color: string
}

const DEFAULT_CHANNELS: FabChannel[] = [
  { name: 'Zalo', icon: 'zalo', url: 'https://zalo.me/', color: '#0068FF' },
  { name: 'Messenger', icon: 'messenger', url: 'https://m.me/', color: '#00B2FF' },
  { name: 'Điện thoại', icon: 'phone', url: 'tel:', color: '#25D366' },
  { name: 'Email', icon: 'email', url: 'mailto:', color: '#EA4335' },
]

/* ─── SVG Icon Map ─── */
function ChannelIcon({ icon, className = 'w-5 h-5' }: { icon: string; className?: string }) {
  switch (icon) {
    case 'zalo':
    case 'chat':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.04 2 11c0 2.83 1.34 5.35 3.44 7.03L4 22l4.2-2.24C9.36 20.24 10.65 20.5 12 20.5c5.52 0 10-4.04 10-9S17.52 2 12 2zm-1 13H7v-1.5h4V15zm4-3H7v-1.5h8V12zm0-3H7V7.5h8V9z" />
        </svg>
      )
    case 'messenger':
    case 'forum':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.37 2 2 6.12 2 11.08c0 2.87 1.42 5.43 3.65 7.1v3.82l3.54-1.95c.95.27 1.96.41 3.01.41 5.52 0 9.8-4.12 9.8-9.08S17.52 2 12 2zm1.05 12.22l-2.5-2.67-4.88 2.67 5.37-5.7 2.56 2.67 4.82-2.67-5.37 5.7z" />
        </svg>
      )
    case 'phone':
    case 'call':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      )
    case 'email':
    case 'mail':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      )
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      )
  }
}

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
          if (data.social?.zalo) ch.push({ name: 'Zalo', icon: 'zalo', url: data.social.zalo, color: '#0068FF' })
          if (data.social?.messenger) ch.push({ name: 'Messenger', icon: 'messenger', url: data.social.messenger, color: '#00B2FF' })
          if (data.phone) ch.push({ name: 'Gọi điện', icon: 'phone', url: `tel:${data.phone}`, color: '#25D366' })
          if (data.email) ch.push({ name: 'Email', icon: 'email', url: `mailto:${data.email}`, color: '#EA4335' })
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
    if (open) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  if (loading || channels.length === 0) return null

  // Arc layout: quarter circle from 180° to 270° (bottom-right origin)
  const radius = 80
  const angleStep = channels.length > 1 ? 90 / (channels.length - 1) : 0

  return (
    <div ref={fabRef} className="fixed bottom-6 right-6 z-50">
      {/* Sub-buttons — arc layout */}
      {channels.map((ch, i) => {
        // 180° = straight left, 270° = straight up
        const angle = 180 + (i * angleStep)
        const rad = (angle * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius

        return (
          <a
            key={ch.name}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: ch.color,
              bottom: `${-y}px`,
              right: `${-x}px`,
              opacity: open ? 1 : 0,
              transform: open ? 'scale(1)' : 'scale(0.3)',
              transitionDelay: open ? `${i * 60}ms` : '0ms',
              pointerEvents: open ? 'auto' : 'none',
            }}
            title={ch.name}
          >
            <ChannelIcon icon={ch.icon} />
          </a>
        )
      })}

      {/* Main FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center transition-all duration-300 ${open
            ? 'bg-slate-900 rotate-45'
            : 'bg-gradient-to-br from-primary to-indigo-600 hover:scale-105 shadow-primary/30'
          }`}
        title="Liên hệ"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none" />
        )}
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
