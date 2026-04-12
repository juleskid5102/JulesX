import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroSection — v4 Premium Light
 * Full-screen editorial hero with oversized typography,
 * staggered text reveal, and scroll indicator.
 * Multi-device showcase moves below as floating gallery.
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const init = async () => {
      const { gsap } = await import('gsap')

      const els = textRef.current?.children
      if (!els) return

      // Stagger text reveal
      gsap.fromTo(
        els,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2,
        }
      )

      // Floating devices animation (delayed)
      const devices = heroRef.current?.querySelector('.hero-devices')
      if (devices) {
        gsap.fromTo(
          devices,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.8,
          }
        )
      }
    }

    init()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF9]"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1c1917 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient accent — very subtle */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-8">
        {/* Pre-title label */}
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary/70 mb-8 font-display">
          Web Design Studio
        </p>

        {/* Main heading — oversized editorial */}
        <h1
          className="font-extrabold text-stone-900 leading-[1.05] tracking-tight mb-8 font-display"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Mỗi website
          <br />
          <span className="text-primary">một câu chuyện</span>
          <br />
          được thiết kế
        </h1>

        {/* Divider + tagline */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="w-12 h-[1px] bg-stone-300" />
          <p className="text-stone-500 text-sm md:text-base tracking-wide font-display max-w-lg">
            Thiết kế và xây dựng website mang tính trải nghiệm — phù hợp với từng ngành và mục tiêu kinh doanh.
          </p>
          <div className="w-12 h-[1px] bg-stone-300" />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/du-an"
            className="group inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.1em] hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20 btn-press"
          >
            Xem Dự Án
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
          <a
            href="/#lien-he"
            className="inline-flex items-center gap-2 border-2 border-stone-200 text-stone-700 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.1em] hover:border-stone-400 hover:bg-stone-50 transition-all duration-300 btn-press"
          >
            Liên Hệ Tư Vấn
          </a>
        </div>
      </div>

      {/* Multi-device showcase — floating below text */}
      <div className="hero-devices relative z-10 w-full max-w-5xl mx-auto px-6 mt-4 mb-16 opacity-0">
        <div className="relative flex items-center justify-center min-h-[320px] lg:min-h-[420px]">
          {/* Main Laptop mockup — center */}
          <div className="relative z-10 w-[75%] lg:w-[65%]">
            <div className="bg-white rounded-t-xl shadow-2xl border border-stone-200/60 overflow-hidden">
              <div className="h-7 bg-stone-100 flex items-center px-3 gap-1.5 border-b border-stone-200/60">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-300/60" />
                <div className="flex-1 mx-6">
                  <div className="bg-stone-200/60 rounded-full h-4 max-w-[180px] mx-auto" />
                </div>
              </div>
              <div className="aspect-[16/10] bg-stone-50">
                <img
                  className="w-full h-full object-cover"
                  src="/images/showcase-desktop.jpg"
                  alt="Desktop website showcase"
                  loading="eager"
                />
              </div>
            </div>
            <div className="h-3 bg-gradient-to-b from-stone-200 to-stone-300 rounded-b-lg shadow-lg" />
          </div>

          {/* Dashboard panel — left, overlapping */}
          <div className="absolute z-20 left-[2%] lg:left-[5%] top-[12%] w-[32%] lg:w-[28%] bg-white rounded-xl shadow-xl border border-stone-100/60 overflow-hidden hover-lift">
            <div className="aspect-[4/5]">
              <img
                className="w-full h-full object-cover object-top"
                src="/images/projects/zenith-app.jpg"
                alt="Dashboard overview"
                loading="eager"
              />
            </div>
          </div>

          {/* Tablet — right bottom, overlapping */}
          <div className="absolute z-20 right-[2%] lg:right-[5%] bottom-[-8px] w-[28%] lg:w-[24%] bg-white rounded-xl shadow-xl border border-stone-100/60 overflow-hidden hover-lift">
            <div className="aspect-[3/4]">
              <img
                className="w-full h-full object-cover"
                src="/images/showcase-tablet.jpg"
                alt="Tablet website showcase"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-[fadeInUp_0.8s_ease-out_1.5s_both]">
        <div
          className="w-[1px] h-10 bg-gradient-to-b from-transparent to-stone-400/50 origin-top"
          style={{ animation: 'draw-line 1.2s ease-out 1.8s both' }}
        />
        <span className="text-stone-400/60 text-[9px] uppercase tracking-[0.4em] font-display">
          Scroll
        </span>
      </div>
    </section>
  )
}
