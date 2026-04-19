import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * Services — JulesX Editorial
 * Reference: screen1.png — full Services page with organic timeline
 * "Services – The Full Build Process"
 * Warm cream palette, vertical timeline, deliverables, Why Us, gold CTA.
 */

const SERVICES = [
  {
    num: '01',
    title: 'The Blueprint',
    subtitle: 'Strategy & UX Research',
    description: 'Nghiên cứu sâu, phân tích người dùng và lập kế hoạch cấu trúc. Chúng tôi xác định logic cốt lõi và mô hình tương tác trước khi thiết kế bất kỳ pixel nào.',
    deliverables: ['User Personas', 'Information Architecture', 'Wireframes', 'Functional Specifications'],
    tags: ['Figma', 'Research', 'Analytics', 'User Flow'],
  },
  {
    num: '02',
    title: 'The Aesthetic',
    subtitle: 'UI & Identity',
    description: 'Xây dựng ngôn ngữ hình ảnh riêng biệt. Kết hợp bản sắc thương hiệu với thiết kế giao diện trực quan để tạo tác động tối đa.',
    deliverables: ['Brand System', 'Visual Design', 'Style Guide', 'UI Component Library'],
    tags: ['Figma', 'Brand Design', 'Typography', 'Color Theory'],
  },
  {
    num: '03',
    title: 'The Engine',
    subtitle: 'Development & Scalability',
    description: 'Kỹ thuật vững vàng, code sạch và có khả năng mở rộng. Xây dựng nền tảng tối ưu cho tốc độ và bảo mật.',
    deliverables: ['Front-End Build', 'Back-End API', 'CMS Integration', 'Performance Optimization'],
    tags: ['React', 'Vite', 'Cloudflare Workers', 'Firebase'],
  },
  {
    num: '04',
    title: 'The Soul',
    subtitle: 'Motion & Interaction',
    description: 'Thổi hồn vào trải nghiệm. Tích hợp animations mượt mà và micro-interactions tạo sự hấp dẫn và thú vị.',
    deliverables: ['Interactive Prototypes', 'Animation Library', 'Micro-Interactions', 'Sound Design'],
    tags: ['GSAP', 'Lenis', 'Three.js', 'Motion Design'],
  },
]

const WHY_US = [
  {
    title: 'Holistic Approach',
    desc: 'Tiếp cận toàn diện từ chiến lược đến thực thi. Không chỉ thiết kế giao diện — chúng tôi tạo trải nghiệm số trọn vẹn.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Pixel-Perfect Execution',
    desc: 'Chính xác từng chi tiết. Mỗi pixel, mỗi animation, mỗi dòng code đều được tinh chỉnh để đạt chất lượng cao nhất.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Performance-Driven',
    desc: 'Tối ưu hiệu suất từ đầu. Lighthouse 100/100, Core Web Vitals xanh lá, tốc độ tải nhanh trên mọi thiết bị.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

export default function Services() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const els = pageRef.current?.querySelectorAll('.srv-reveal')
      if (!els) return

      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }

    init()
  }, [])

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
        <main className="pt-32 pb-0 bg-bg">
          {/* ─── Hero ─── */}
          <section className="px-6 max-w-6xl mx-auto mb-24 md:mb-32 srv-reveal">
            <p className="label-caps text-accent mb-6">Services</p>
            <h1
              className="text-editorial text-text mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              The Full Build
              <br />
              <span className="text-text-muted">Process.</span>
            </h1>
            <p className="text-text-muted text-lg max-w-xl leading-relaxed">
              Quy trình end-to-end từ chiến lược đến thực thi.
              Mỗi giai đoạn được thiết kế để đảm bảo chất lượng tối đa.
            </p>
          </section>

          {/* ─── Timeline ─── */}
          <section className="px-6 max-w-6xl mx-auto mb-32">
            <div className="relative">
              {/* Vertical connector */}
              <div className="hidden lg:block absolute left-[2.75rem] top-0 bottom-0 w-[2px] bg-border" />

              <div className="flex flex-col gap-0">
                {SERVICES.map((service, i) => (
                  <div
                    key={service.num}
                    className="srv-reveal timeline-step group grid grid-cols-1 lg:grid-cols-[5.5rem_1fr] gap-6 lg:gap-12 py-12 lg:py-16 border-b border-border last:border-b-0"
                  >
                    {/* Circle */}
                    <div className="flex lg:flex-col items-center lg:items-center gap-4 lg:gap-0">
                      <div className="timeline-circle">
                        {service.num}
                      </div>
                      {i < SERVICES.length - 1 && (
                        <div className="lg:hidden flex-1 h-[2px] bg-border" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                      {/* Left — Title + Desc */}
                      <div>
                        <h3 className="font-heading text-xl lg:text-2xl font-bold text-text group-hover:text-accent transition-colors duration-300 mb-1">
                          {service.title}:
                        </h3>
                        <p className="font-heading text-lg font-bold text-text-muted mb-4">
                          {service.subtitle}
                        </p>
                        <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-6">
                          {service.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 border border-border text-text-light text-[10px] font-semibold uppercase tracking-[0.1em] hover:border-accent hover:text-accent transition-colors duration-300 bg-bg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right — Deliverables */}
                      <div>
                        <p className="label-caps text-text-light mb-5">Deliverables</p>
                        <ul className="space-y-3">
                          {service.deliverables.map((d) => (
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
          </section>

          {/* ─── Why Us ─── */}
          <section className="bg-bg-alt py-24 md:py-32 px-6 grain-overlay">
            <div className="max-w-6xl mx-auto">
              <div className="srv-reveal mb-16">
                <p className="label-caps text-accent mb-5">Why Us</p>
                <h2
                  className="font-heading font-bold text-text leading-[1.1]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  The Bridge Between
                  <br />
                  <span className="text-accent">Design & Code</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {WHY_US.map((item) => (
                  <div key={item.title} className="srv-reveal group">
                    <span className="text-accent mb-5 block">{item.icon}</span>
                    <h3 className="font-heading font-bold text-text text-lg mb-3 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── CTA ─── */}
          <section className="bg-bg-dark py-24 md:py-32 px-6 grain-overlay">
            <div className="max-w-3xl mx-auto text-center srv-reveal">
              <h2
                className="font-heading font-bold text-text-inverse mb-6 leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Let's build something
                <br />
                <span className="text-accent">iconic.</span>
              </h2>
              <p className="text-text-inverse/40 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                Bạn có ý tưởng? Chúng tôi sẵn sàng biến tầm nhìn thành hiện thực.
              </p>
              <Link
                to="/bat-dau-du-an"
                className="btn-gold btn-press inline-flex"
              >
                Bắt Đầu Dự Án
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
