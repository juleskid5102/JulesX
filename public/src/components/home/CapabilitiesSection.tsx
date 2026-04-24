import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * CapabilitiesSection — JulesX Editorial (Vietnamese)
 * Services page editorial style: numbered steps, alternating layout,
 * Vietnamese content, clean typography.
 */

const capabilities = [
  {
    num: '01',
    title: 'Chiến Lược',
    subtitle: 'Strategy & UX Research',
    description: 'Phân tích thị trường, hành vi người dùng và mục tiêu kinh doanh để xây dựng chiến lược số phù hợp.',
    image: '/images/cap-strategy.png',
  },
  {
    num: '02',
    title: 'Thiết Kế',
    subtitle: 'UI/UX & Brand Identity',
    description: 'Thiết kế giao diện premium — từ wireframe đến visual design hoàn chỉnh, tối ưu trải nghiệm người dùng.',
    image: '/images/cap-design.png',
  },
  {
    num: '03',
    title: 'Phát Triển',
    subtitle: 'Development & Engineering',
    description: 'Code sạch, hiệu suất cao. React, TypeScript, Cloudflare Workers — sẵn sàng scale.',
    image: '/images/cap-dev.png',
  },
  {
    num: '04',
    title: 'Chuyển Động',
    subtitle: 'Motion & Interaction',
    description: 'GSAP animations, micro-interactions, và hiệu ứng cuộn — tạo trải nghiệm sống động và khác biệt.',
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

      sectionRef.current?.querySelectorAll('.cap-item')?.forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      })
    }

    init()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <h2
            className="font-heading font-bold text-text tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Năng Lực
          </h2>
          <div className="flex-1 h-[1px] bg-border" />
          <Link to="/dich-vu" className="text-accent text-xs font-semibold uppercase tracking-[0.15em] hover:underline">
            Xem chi tiết →
          </Link>
        </div>

        {/* Alternating layout — matching Services page style */}
        <div className="space-y-20">
          {capabilities.map((cap, i) => {
            const isReverse = i % 2 !== 0
            return (
              <div key={cap.num} className={`cap-item grid md:grid-cols-2 gap-10 md:gap-16 items-center ${isReverse ? 'md:direction-rtl' : ''}`}>
                {/* Text side */}
                <div className={`${isReverse ? 'md:order-2 md:text-right' : 'md:order-1'}`} style={{ direction: 'ltr' }}>
                  <span className="font-heading text-5xl md:text-6xl font-bold text-accent/15 block mb-3">{cap.num}</span>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-text tracking-[-0.02em] mb-1">{cap.title}</h3>
                  <p className="text-text-light text-xs font-semibold uppercase tracking-[0.15em] mb-4">{cap.subtitle}</p>
                  <p className="text-text-muted font-body leading-[1.7] text-sm md:text-base">{cap.description}</p>
                </div>
                {/* Image side */}
                <div className={`${isReverse ? 'md:order-1' : 'md:order-2'} bg-[#1A1A1A] overflow-hidden group`} style={{ direction: 'ltr' }}>
                  <div className="aspect-[4/3] flex items-center justify-center p-8">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
