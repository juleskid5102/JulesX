import { useEffect, useRef } from 'react'

/**
 * ProcessSection — JulesX Editorial
 * Reference: screen1.png — vertical timeline with connected circles 01→04
 * Each step: numbered circle, title, description, deliverables.
 */

const steps = [
  {
    num: '01',
    title: 'The Blueprint',
    subtitle: 'Strategy & UX Research',
    desc: 'Nghiên cứu sâu, phân tích người dùng và lập kế hoạch cấu trúc. Chúng tôi xác định logic cốt lõi và mô hình tương tác trước khi thiết kế bất kỳ pixel nào.',
    deliverables: ['User Personas', 'Information Architecture', 'Wireframes', 'Functional Specifications'],
  },
  {
    num: '02',
    title: 'The Aesthetic',
    subtitle: 'UI & Identity',
    desc: 'Xây dựng ngôn ngữ hình ảnh riêng biệt. Kết hợp bản sắc thương hiệu với thiết kế giao diện trực quan để tạo tác động tối đa.',
    deliverables: ['Brand System', 'Visual Design', 'Style Guide', 'UI Components'],
  },
  {
    num: '03',
    title: 'The Engine',
    subtitle: 'Development & Scalability',
    desc: 'Kỹ thuật vững vàng, code sạch và có khả năng mở rộng. Xây dựng nền tảng tối ưu cho tốc độ và bảo mật.',
    deliverables: ['Front-end', 'Back-end', 'CMS Integration', 'Performance Optimization'],
  },
  {
    num: '04',
    title: 'The Soul',
    subtitle: 'Motion & Interaction',
    desc: 'Thổi hồn vào trải nghiệm. Tích hợp animations mượt mà và micro-interactions tạo sự hấp dẫn và thú vị.',
    deliverables: ['Interactive Prototypes', 'Animation Library', 'Micro-Interactions', 'Sound Design'],
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = sectionRef.current?.querySelectorAll('.timeline-step')
      if (!items) return

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }

    init()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20 md:mb-28">
          <p className="label-caps text-accent mb-5">Process</p>
          <h2
            className="text-editorial text-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            The Full Build
            <br />
            <span className="text-text-muted">Process.</span>
          </h2>
          <p className="text-text-muted text-lg mt-6 max-w-lg leading-relaxed">
            Our end-to-end approach to crafting digital excellence.
            <br />
            From concept to award-winning reality.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="hidden md:block absolute left-[2.75rem] top-0 bottom-0 w-[2px] bg-border" />

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-20">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="timeline-step group grid grid-cols-1 md:grid-cols-[5.5rem_1fr] gap-6 md:gap-10"
              >
                {/* Circle */}
                <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-0">
                  <div className="timeline-circle">
                    {step.num}
                  </div>
                  {/* Mobile connector */}
                  {i < steps.length - 1 && (
                    <div className="md:hidden flex-1 h-[2px] bg-border" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-16 pb-0 md:pb-0">
                  {/* Left — Title + Desc */}
                  <div className="md:w-1/2">
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-text group-hover:text-accent transition-colors duration-300 mb-1">
                      {step.title}:
                    </h3>
                    <p className="font-heading text-lg md:text-xl font-bold text-text-muted mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-text-muted leading-relaxed text-[0.9375rem]">
                      {step.desc}
                    </p>
                  </div>

                  {/* Right — Deliverables */}
                  <div className="md:w-1/2">
                    <p className="label-caps text-text-light mb-4">Deliverables</p>
                    <ul className="space-y-2.5">
                      {step.deliverables.map((d) => (
                        <li key={d} className="text-text-muted text-sm flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
