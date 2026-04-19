import { useEffect, useState, useRef } from 'react'
import { API_BASE } from '../config/site'

/**
 * ContactFAB — Arc-layout Floating Action Button
 * Channels fan out in a quarter-circle arc (bottom-right origin)
 * Pattern adapted from minhkhangclinic FAB
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
            <span className="material-symbols-outlined text-xl">{ch.icon}</span>
          </a>
        )
      })}

      {/* Main FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-slate-900 rotate-45'
            : 'bg-gradient-to-br from-primary to-indigo-600 hover:scale-105 shadow-primary/30'
        }`}
        title="Liên hệ"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none" />
        )}
        <span className="material-symbols-outlined text-2xl">
          {open ? 'close' : 'chat'}
        </span>
      </button>
    </div>
  )
}
