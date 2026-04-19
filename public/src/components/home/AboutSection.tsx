import { useEffect, useRef } from 'react'

/**
 * AboutSection — JulesX Capabilities
 * 2×2 grid with oversized numbers, editorial style.
 * GSAP stagger reveal on scroll.
 */

const capabilities = [
  {
    num: '01',
    title: 'Strategy',
    desc: 'Phân tích ngành nghề, đối tượng khách hàng và định vị thương hiệu số.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Thiết kế UI/UX cao cấp, tập trung vào trải nghiệm và chuyển đổi.',
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Xây dựng bằng React, Vite, Cloudflare — tốc độ và bảo mật hàng đầu.',
  },
  {
    num: '04',
    title: 'Motion',
    desc: 'Hiệu ứng GSAP chuyên nghiệp tạo nên website sống động và cuốn hút.',
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Text reveal
      const textEl = sectionRef.current?.querySelector('.about-text')
      if (textEl) {
        gsap.fromTo(
          textEl,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: textEl, start: 'top 85%' },
          }
        )
      }

      // Cards stagger
      const cards = sectionRef.current?.querySelectorAll('.cap-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: cards[0], start: 'top 85%' },
          }
        )
      }
    }

    init()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-bg-alt">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
        {/* Left — Text */}
        <div className="about-text space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent mb-4">
            Capabilities
          </p>
          <h2
            className="font-heading font-bold text-text leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Thiết kế không chỉ
            <br />
            để đẹp — mà để
            <br />
            <span className="text-accent">hoạt động.</span>
          </h2>
          <p className="text-text-muted leading-relaxed text-lg max-w-xl">
            JulesX chuyên thiết kế và xây dựng website theo hướng trải nghiệm.
            Kết hợp giữa thẩm mỹ cao cấp và giải pháp kỹ thuật tối ưu để biến
            thương hiệu của bạn thành một thực thể số đầy sức sống.
          </p>
        </div>

        {/* Right — Capabilities Grid */}
        <div className="grid grid-cols-2 gap-[1px] bg-border">
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              className="cap-card bg-bg-alt p-8 group cursor-default hover:bg-white transition-colors duration-300"
            >
              <span className="font-heading text-4xl lg:text-5xl font-bold text-border block mb-4 group-hover:text-accent transition-colors duration-500">
                {cap.num}
              </span>
              <h3 className="font-heading text-lg font-bold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                {cap.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
