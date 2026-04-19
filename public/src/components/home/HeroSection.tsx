import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroSection — JulesX Editorial
 * Reference: screen3.png hero — bold uppercase headline,
 * minimal subtext, single CTA button.
 * Light cream background, editorial oversized type.
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
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power4.out',
            delay: 0.2,
          }
        )
      }

      if (contentRef.current) {
        const children = contentRef.current.children
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.8,
          }
        )
      }
    }

    init()
  }, [])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-bg overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Headline — massive uppercase editorial like screen3 */}
        <h1
          ref={headlineRef}
          className="font-heading font-bold text-text uppercase leading-[0.95] tracking-[-0.03em] mb-10 opacity-0"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          We don't
          <br />
          just design.
          <br />
          We <span className="text-accent italic">build</span>
          <br />
          the future
          <br />
          of the web.
        </h1>

        {/* Subtext + CTA */}
        <div ref={contentRef}>
          <p className="text-text-muted text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed font-body opacity-0">
            From avant-garde strategy to high-performance engineering.
            <br className="hidden md:block" />
            Complete digital solutions for visionary brands.
          </p>

          {/* Single CTA — like "Start Project" in screen3 */}
          <div className="opacity-0">
            <Link
              to="/du-an"
              className="inline-flex items-center gap-3 px-8 py-4 bg-text text-bg font-heading font-bold text-sm uppercase tracking-[0.15em] hover:bg-accent hover:text-[#0A0A0A] transition-all duration-300 btn-press"
            >
              Start Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
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
