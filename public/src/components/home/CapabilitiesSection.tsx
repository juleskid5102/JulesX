import { useEffect, useRef } from 'react'

/**
 * CapabilitiesSection — JulesX Editorial
 * Reference: screen3.png capabilities grid
 * 2×2 dark cards with images, number, icon, title, subtitle.
 * Light background, dark cards for contrast.
 */

const capabilities = [
  {
    num: '01',
    title: 'STRATEGY',
    subtitle: 'Market Analysis, Brand Positioning',
    image: '/images/cap-strategy.png',
  },
  {
    num: '02',
    title: 'DESIGN',
    subtitle: 'UI/UX, Brand Identity, Art Direction',
    image: '/images/cap-design.png',
  },
  {
    num: '03',
    title: 'DEVELOPMENT',
    subtitle: 'Front-End, Back-End, CMS, E-commerce',
    image: '/images/cap-dev.png',
  },
  {
    num: '04',
    title: 'MOTION',
    subtitle: 'Interaction Design, 3D, GSAP',
    image: '/images/cap-motion.png',
  },
]

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const cards = sectionRef.current?.querySelectorAll('.cap-card')
      if (!cards) return

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    init()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section header — minimal like screen3 */}
        <div className="mb-12">
          <h2
            className="font-heading font-bold text-text tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Capabilities
          </h2>
        </div>

        {/* 2×2 Grid — dark cards with images like screen3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              className="cap-card group relative bg-[#1A1A1A] overflow-hidden cursor-default"
              style={{ aspectRatio: '1 / 0.85' }}
            >
              {/* Image — takes up most of the card */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pt-16 pb-24">
                <img
                  src={cap.image}
                  alt={cap.title}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-90 transition-opacity duration-500 group-hover:scale-[1.03] transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Top row: number + navigation dots */}
              <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
                <span className="font-heading text-3xl md:text-4xl font-bold text-white/80">
                  {cap.num}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                </div>
              </div>

              {/* Bottom: title + subtitle */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent pt-12">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-wide mb-1">
                  {cap.title}
                </h3>
                <p className="text-white/40 text-xs tracking-wide">
                  {cap.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
