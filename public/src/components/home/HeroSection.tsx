import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroSection — JulesX Premium Editorial
 * 
 * Design Direction: "Warm Editorial Luxury"
 * - Asymmetric split: left text (60%) + right showcase (40%)
 * - Character-by-character text reveal (GSAP SplitText style)
 * - Magnetic CTA button
 * - Grain texture overlay
 * - Showcase: overlapping device mockups from real projects
 * 
 * Skills: frontend-design (asymmetry, memorable anchor),
 *         micro-interactions (text reveal, magnetic button),
 *         ui-ux-pro-max (line-height 1.5+, 44px touch targets)
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')

      // Stagger reveal all .hero-reveal elements
      const els = sectionRef.current?.querySelectorAll('.hero-reveal')
      if (els) {
        gsap.fromTo(els, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, stagger: 0.12,
          ease: 'power4.out', delay: 0.15,
        })
      }

      // Showcase images — parallax float
      const showcases = sectionRef.current?.querySelectorAll('.showcase-img')
      if (showcases) {
        gsap.fromTo(showcases, { y: 80, opacity: 0, scale: 0.95 }, {
          y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15,
          ease: 'power3.out', delay: 0.5,
        })
      }
    }

    init()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center bg-bg overflow-hidden grain-overlay">

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-8 items-center">

          {/* ── LEFT: Editorial Text ── */}
          <div className="max-w-2xl">
            {/* Headline — oversized, with accent word */}
            <h1 className="hero-reveal font-heading font-bold text-text leading-[0.92] tracking-[-0.04em] mb-8 opacity-0"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 6rem)' }}>
              Thiết kế web
              <br />
              <span className="text-accent italic">đẳng cấp</span> —
              <br />
              trải nghiệm
              <br />
              khác biệt.
            </h1>

            {/* Subtext — generous line-height, restrained */}
            <p className="hero-reveal text-text-muted text-base md:text-lg leading-[1.7] font-body mb-10 max-w-md opacity-0">
              Từ chiến lược thương hiệu đến website hoàn chỉnh —
              giải pháp số toàn diện cho doanh nghiệp hiện đại.
            </p>

            {/* Dual CTA — gold primary + ghost secondary */}
            <div className="hero-reveal flex flex-wrap gap-4 opacity-0">
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

            {/* Stats row — subtle proof */}
            <div className="hero-reveal flex items-center gap-8 mt-14 opacity-0">
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

          {/* ── RIGHT: Showcase — overlapping project screenshots ── */}
          <div className="relative hidden lg:block" style={{ minHeight: '500px' }}>
            {/* Background card — slightly rotated */}
            <div className="showcase-img absolute top-8 right-0 w-[85%] aspect-[4/3] bg-bg-alt border border-border opacity-0"
              style={{ transform: 'rotate(2deg)' }}>
              <img src="/images/projects/dhome-hero.png" alt=""
                className="w-full h-full object-cover opacity-40" loading="eager" />
            </div>

            {/* Middle card */}
            <div className="showcase-img absolute top-24 right-12 w-[80%] aspect-[4/3] shadow-2xl opacity-0 overflow-hidden">
              <img src="/images/projects/mamcung-hero.png" alt=""
                className="w-full h-full object-cover" loading="eager" />
            </div>

            {/* Front card — main showcase */}
            <div className="showcase-img absolute top-40 right-24 w-[75%] aspect-[4/3] shadow-[0_24px_48px_rgba(0,0,0,0.12)] opacity-0 overflow-hidden border border-border/50">
              <img src="/images/projects/havy-hero.png" alt=""
                className="w-full h-full object-cover" loading="eager" />
            </div>

            {/* Decorative gold accent line */}
            <div className="absolute bottom-16 right-0 w-24 h-[2px] bg-accent" />
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
