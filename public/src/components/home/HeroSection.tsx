import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroSection — "The Living Portfolio"
 * 
 * Left: Oversized Vietnamese headline + stats + single CTA
 * Right: Realistic browser window mockup auto-cycling through real project screenshots
 * 
 * Skills: gsap-animations (timeline reveal), micro-interactions (hover pause)
 */

const SHOWCASE_PROJECTS = [
  { url: 'julesatelier.pages.dev', image: '/images/projects/jules-atelier-hero.png', title: 'Jules Atelier' },
  { url: 'havy-portfolio.pages.dev', image: '/images/projects/havy-hero.png', title: 'Hà Vy Portfolio' },
  { url: 'mamcungthanhhuan.pages.dev', image: '/images/projects/mamcung-hero.png', title: 'Mâm Cúng Thanh Huân' },
  { url: 'dhome.pages.dev', image: '/images/projects/dhome-hero.png', title: 'D.HOME Interior' },
  { url: 'jules-oasis.pages.dev', image: '/images/projects/jules-oasis-hero.png', title: 'Jules Oasis' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Auto-cycle every 4s
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SHOWCASE_PROJECTS.length)
    }, 4000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPaused])

  // GSAP entrance animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline({ delay: 0.15 })
      tl.fromTo('.hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo('.hero-headline', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=0.3')
        .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-stats', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo('.hero-browser', { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1')
    }

    init()
  }, [])

  const current = SHOWCASE_PROJECTS[activeIdx] ?? SHOWCASE_PROJECTS[0]!

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center bg-bg overflow-hidden grain-overlay">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-32 lg:py-0">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-6 items-center">

          {/* ── LEFT: Editorial Text ── */}
          <div>
            <p className="hero-label label-caps text-accent mb-5 opacity-0">Web Design Studio</p>

            <h1 className="hero-headline font-heading font-bold text-text leading-[0.92] tracking-[-0.04em] mb-8 opacity-0"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)' }}>
              Thiết kế web
              <br />
              <span className="text-accent italic">đẳng cấp</span> —
              <br />
              trải nghiệm
              <br />
              khác biệt.
            </h1>

            <p className="hero-sub text-text-muted text-base md:text-lg leading-[1.7] font-body mb-10 max-w-md opacity-0">
              Từ chiến lược thương hiệu đến website hoàn chỉnh —
              giải pháp số toàn diện cho doanh nghiệp.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 mb-12 opacity-0">
              <Link to="/du-an" className="btn-gold btn-press">
                Xem Dự Án
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/dich-vu" className="btn-secondary btn-press">
                Dịch Vụ
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats flex items-center gap-8 opacity-0">
              <div>
                <p className="font-heading text-3xl font-bold text-text">50+</p>
                <p className="text-text-light text-[10px] uppercase tracking-[0.2em] mt-1">Dự Án</p>
              </div>
              <div className="w-[1px] h-8 bg-border" />
              <div>
                <p className="font-heading text-3xl font-bold text-text">100</p>
                <p className="text-text-light text-[10px] uppercase tracking-[0.2em] mt-1">Lighthouse</p>
              </div>
              <div className="w-[1px] h-8 bg-border" />
              <div>
                <p className="font-heading text-3xl font-bold text-accent">A+</p>
                <p className="text-text-light text-[10px] uppercase tracking-[0.2em] mt-1">Bảo Mật</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Browser Window Mockup ── */}
          <div
            className="hero-browser opacity-0 cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative bg-bg-elevated border border-border shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden transition-transform duration-500 hover:scale-[1.015]"
              style={{ borderRadius: '12px' }}>

              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-bg-alt border-b border-border">
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                {/* URL bar */}
                <div className="flex-1 mx-3 px-4 py-1.5 bg-bg rounded-md text-[11px] text-text-light font-mono truncate">
                  {current.url}
                </div>
              </div>

              {/* Screenshot viewport */}
              <div className="relative aspect-[16/10] bg-bg-alt overflow-hidden">
                {SHOWCASE_PROJECTS.map((proj, i) => (
                  <img
                    key={proj.url}
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000"
                    style={{ opacity: i === activeIdx ? 1 : 0 }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>

              {/* Bottom bar — project name + dots */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-bg-alt/50 border-t border-border">
                <span className="text-[11px] font-semibold text-text font-heading">
                  {current.title}
                </span>
                <div className="flex gap-1.5">
                  {SHOWCASE_PROJECTS.map((_, i) => (
                    <button key={i} onClick={() => setActiveIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-accent scale-125' : 'bg-border hover:bg-text-light'
                        }`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_2.5s_both]">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-text-muted/30 origin-top"
          style={{ animation: 'draw-line 1s ease-out 2.7s both' }} />
        <span className="text-text-light text-[9px] uppercase tracking-[0.4em] font-body">Scroll</span>
      </div>
    </section>
  )
}
