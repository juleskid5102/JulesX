import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * CapabilitiesSection — Interactive Hover-Reveal Cards
 * 
 * 2×2 grid on warm cream bg.
 * Default state: number + title only.
 * Hover: card lifts, gold border appears, description fades in, image slides up.
 * 
 * Skills: micro-interactions (hover feedback), gsap-animations (hover timeline)
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

      // Reveal header
      gsap.fromTo(sectionRef.current!.querySelector('.cap-header'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // Stagger reveal cards
      gsap.fromTo(sectionRef.current!.querySelectorAll('.cap-card'),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }

    init()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="cap-header flex items-center gap-4 mb-16 opacity-0">
          <h2 className="font-heading font-bold text-text tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            Năng Lực
          </h2>
          <div className="flex-1 h-[1px] bg-border" />
          <Link to="/dich-vu" className="text-accent text-xs font-semibold uppercase tracking-[0.15em] hover:underline">
            Xem chi tiết →
          </Link>
        </div>

        {/* 2×2 Grid — hover-reveal cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              className="cap-card group relative bg-bg-elevated border border-border overflow-hidden cursor-default transition-all duration-500 hover:border-accent hover:shadow-[0_12px_40px_rgba(200,169,110,0.08)] hover:-translate-y-1 opacity-0"
              style={{ minHeight: '280px' }}
            >
              {/* Background image — slides up on hover */}
              <div className="absolute bottom-0 right-0 w-[45%] h-[70%] overflow-hidden opacity-0 group-hover:opacity-20 translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <img src={cap.image} alt="" className="w-full h-full object-contain" loading="lazy" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                {/* Top: number + title (always visible) */}
                <div>
                  <span className="font-heading text-5xl md:text-6xl font-bold text-border group-hover:text-accent/20 transition-colors duration-500">{cap.num}</span>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-text tracking-[-0.02em] mt-2 group-hover:text-accent transition-colors duration-300">
                    {cap.title}
                  </h3>
                  <p className="text-text-light text-[10px] font-semibold uppercase tracking-[0.2em] mt-1">{cap.subtitle}</p>
                </div>

                {/* Bottom: description — fades in on hover */}
                <div className="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <p className="text-text-muted font-body text-sm leading-[1.7] max-w-sm">{cap.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-[0.15em]">
                    <span>Tìm hiểu thêm</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
