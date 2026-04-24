import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroSection — JulesX Editorial (Vietnamese-first)
 * Cinematic full-viewport hero with bold Vietnamese headline,
 * subtle background, and editorial typography matching Services page.
 */
export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const init = async () => {
      const { gsap } = await import('gsap')

      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.2 }
        )
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.8 }
        )
      }
    }

    init()
  }, [])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-start justify-center bg-bg overflow-hidden">
      {/* Content — left-aligned editorial */}
      <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto w-full">
        {/* Label */}
        <p className="label-caps text-accent mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
          Digital Studio
        </p>

        {/* Headline — massive Vietnamese editorial */}
        <h1
          ref={headlineRef}
          className="font-heading font-bold text-text leading-[0.95] tracking-[-0.04em] mb-10 opacity-0 max-w-5xl"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Thiết kế web
          <br />
          đẳng cấp —
          <br />
          <span className="text-accent italic">trải nghiệm</span>
          <br />
          khác biệt.
        </h1>

        {/* Subtext + CTA */}
        <div ref={contentRef} className="max-w-xl">
          <p className="text-text-muted text-base md:text-lg leading-relaxed font-body opacity-0 mb-10">
            Từ chiến lược thương hiệu đến website hoàn chỉnh.
            <br className="hidden md:block" />
            Giải pháp số toàn diện cho doanh nghiệp hiện đại.
          </p>

          <div className="opacity-0 flex flex-wrap gap-4">
            <Link
              to="/du-an"
              className="btn-gold btn-press inline-flex"
            >
              Xem Dự Án
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/dich-vu"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border text-text font-body text-[11px] font-bold uppercase tracking-[0.15em] hover:border-text hover:bg-bg-alt transition-all duration-300 btn-press"
            >
              Dịch Vụ
            </Link>
          </div>
        </div>
      </div>

      {/* Right side decoration — subtle showcase image */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[35%] h-[70%] overflow-hidden opacity-20">
        <img
          src="/images/hero-showcase.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_2s_both]">
        <div
          className="w-[1px] h-12 bg-gradient-to-b from-transparent to-text-muted/30 origin-top"
          style={{ animation: 'draw-line 1s ease-out 2.2s both' }}
        />
        <span className="text-text-light text-[9px] uppercase tracking-[0.4em] font-body">
          Scroll
        </span>
      </div>
    </section>
  )
}
