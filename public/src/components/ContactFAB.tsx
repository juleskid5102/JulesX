// ContactFAB — Floating Action Button (Zalo, Messenger, Phone)
// Adapted for Jules Studio — uses static config, no API call
import { useState, useEffect, useRef } from 'react'

const SOCIAL_LINKS = [
  {
    label: 'Zalo',
    url: 'https://zalo.me/0901234567', // TODO: Thay link Zalo thực tế
    bg: 'bg-blue-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Messenger',
    url: 'https://m.me/julesstudio', // TODO: Thay link Messenger thực tế
    bg: 'bg-blue-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    ),
  },
]

export function ContactFAB() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const radius = 75
  const angleStep = SOCIAL_LINKS.length > 1 ? 90 / (SOCIAL_LINKS.length - 1) : 0

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50">
      {/* Sub-buttons */}
      {SOCIAL_LINKS.map((btn, idx) => {
        const angle = 180 + (idx * angleStep)
        const rad = (angle * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius

        return (
          <a
            key={btn.label}
            href={btn.url}
            target="_blank"
            rel="noreferrer"
            title={btn.label}
            style={{
              bottom: `${-y}px`,
              right: `${-x}px`,
              opacity: open ? 1 : 0,
              transform: open ? 'scale(1)' : 'scale(0.3)',
              transitionDelay: open ? `${idx * 50}ms` : '0ms',
              pointerEvents: open ? 'auto' : 'none',
            }}
            className={`absolute w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${btn.bg}`}
          >
            {btn.icon}
          </a>
        )
      })}

      {/* Main Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          open ? 'bg-slate-900 rotate-45' : 'bg-gradient-to-r from-primary to-indigo-500 hover:scale-105'
        }`}
      >
        {!open && (
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
        )}
        <svg xmlns="http://www.w3.org/2000/svg" width={open ? 28 : 24} height={open ? 28 : 24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {open ? (
            <path d="M12 5v14M5 12h14" />
          ) : (
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          )}
        </svg>
      </button>
    </div>
  )
}
