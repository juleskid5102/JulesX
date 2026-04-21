import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * Services — JulesX Editorial
 * Reference: screen1.png — zigzag timeline with illustrations,
 * Connector line on TEXT side, starts from 01 circle, not above it.
 */

const SERVICES = [
  {
    num: '01',
    title: 'The Blueprint',
    subtitle: 'Strategy & UX Research',
    description:
      'Nghiên cứu sâu, phân tích người dùng và lập kế hoạch chiến lược. Chúng tôi xác định logic cốt lõi và mô hình tương tác trước khi thiết kế bất kỳ pixel nào.',
    deliverables: [
      'User Personas',
      'Information Architecture',
      'Wireframes',
      'Functional Specifications',
    ],
    image: '/images/srv-strategy.png',
  },
  {
    num: '02',
    title: 'The Aesthetic',
    subtitle: 'UI & Identity',
    description:
      'Xây dựng ngôn ngữ hình ảnh riêng biệt. Kết hợp bản sắc thương hiệu với thiết kế giao diện trực quan để tạo tác động tối đa.',
    deliverables: [
      'Brand System',
      'Visual Design',
      'Style Guide',
      'UI Components',
    ],
    image: '/images/srv-design.png',
  },
  {
    num: '03',
    title: 'The Engine',
    subtitle: 'Development & Scalability',
    description:
      'Kỹ thuật vững vàng, code sạch và có khả năng mở rộng. Xây dựng nền tảng tối ưu cho tốc độ và bảo mật.',
    deliverables: [
      'Front-End Build',
      'Back-End API',
      'CMS Integration',
      'Performance Optimization',
    ],
    image: '/images/srv-dev.png',
  },
  {
    num: '04',
    title: 'The Soul',
    subtitle: 'Motion & Interaction',
    description:
      'Thổi hồn vào trải nghiệm. Tích hợp animations mượt mà và micro-interactions tạo sự hấp dẫn và thú vị.',
    deliverables: [
      'Interactive Prototypes',
      'Animation Library',
      'Micro-Interactions',
      'Sound Design',
    ],
    image: '/images/srv-motion.png',
  },
]

const WHY_US = [
  {
    title: 'Holistic Approach',
    desc: 'Tiếp cận toàn diện từ chiến lược đến thực thi.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Pixel-Perfect Execution',
    desc: 'Chính xác từng chi tiết, từng pixel, từng animation.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Performance-Driven',
    desc: 'Lighthouse 100/100, Core Web Vitals xanh lá.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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
          <section className="px-6 max-w-7xl mx-auto mb-20 md:mb-28 srv-reveal">
            <h1
              className="font-heading font-bold text-text leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Services — The Full
              <br />
              Build Process
            </h1>
            <p className="text-text-muted text-lg max-w-xl leading-relaxed">
              Our end-to-end approach to crafting digital excellence.
              <br />
              From concept to award-winning reality.
            </p>
          </section>

          {/* ─── Zigzag Timeline ─── */}
          <section className="px-6 max-w-7xl mx-auto mb-28 md:mb-36">
            <div className="flex flex-col gap-0">
              {SERVICES.map((service, i) => {
                const isEven = i % 2 === 0
                const isFirst = i === 0
                const isLast = i === SERVICES.length - 1

                return (
                  <div
                    key={service.num}
                    className="srv-reveal relative py-12 lg:py-20"
                  >
                    {/* ─── Desktop layout ─── */}
                    <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-0 items-start">
                      {/* LEFT column */}
                      {isEven ? (
                        /* Text on LEFT for even (01, 03) */
                        <div className="pr-16 pt-2">
                          <h3
                            className="font-heading font-bold text-text leading-[1.15] mb-1"
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                          >
                            {service.title}:
                          </h3>
                          <p
                            className="font-heading font-bold text-text-muted mb-5"
                            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                          >
                            {service.subtitle}
                          </p>
                          <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-6">
                            {service.description}
                          </p>
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-light mb-3">
                            Deliverables:
                          </p>
                          <p className="text-text-muted text-sm leading-relaxed">
                            {service.deliverables.join(', ')}.
                          </p>
                        </div>
                      ) : (
                        /* Image on LEFT for odd (02, 04) */
                        <div className="pr-16">
                          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}

                      {/* CENTER — Circle + connector line */}
                      <div className="relative flex flex-col items-center" style={{ width: '60px' }}>
                        {/* Line ABOVE circle — only if not first */}
                        {!isFirst && (
                          <div className="w-[2px] bg-border flex-1 min-h-[40px]" />
                        )}
                        {/* Spacer before first circle so it aligns with content top */}
                        {isFirst && <div className="flex-1" />}

                        {/* Circle */}
                        <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-border bg-bg z-10 flex-shrink-0">
                          <span className="font-heading text-sm font-bold text-text-muted">
                            {service.num}
                          </span>
                        </div>

                        {/* Line BELOW circle — only if not last */}
                        {!isLast && (
                          <div className="w-[2px] bg-border flex-1 min-h-[40px]" />
                        )}
                        {isLast && <div className="flex-1" />}
                      </div>

                      {/* RIGHT column */}
                      {isEven ? (
                        /* Image on RIGHT for even (01, 03) */
                        <div className="pl-16">
                          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ) : (
                        /* Text on RIGHT for odd (02, 04) */
                        <div className="pl-16 pt-2">
                          <h3
                            className="font-heading font-bold text-text leading-[1.15] mb-1"
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                          >
                            {service.title}:
                          </h3>
                          <p
                            className="font-heading font-bold text-text-muted mb-5"
                            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                          >
                            {service.subtitle}
                          </p>
                          <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-6">
                            {service.description}
                          </p>
                          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-light mb-3">
                            Deliverables:
                          </p>
                          <p className="text-text-muted text-sm leading-relaxed">
                            {service.deliverables.join(', ')}.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* ─── Mobile layout ─── */}
                    <div className="lg:hidden">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-border bg-bg">
                          <span className="font-heading text-sm font-bold text-text-muted">
                            {service.num}
                          </span>
                        </div>
                        <div className="flex-1 h-[1px] bg-border" />
                      </div>

                      <h3
                        className="font-heading font-bold text-text leading-[1.15] mb-1"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                      >
                        {service.title}:
                      </h3>
                      <p
                        className="font-heading font-bold text-text-muted mb-5"
                        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                      >
                        {service.subtitle}
                      </p>
                      <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-6">
                        {service.description}
                      </p>

                      <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>

                      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-light mb-3">
                        Deliverables:
                      </p>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {service.deliverables.join(', ')}.
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ─── Why Us ─── */}
          <section className="bg-bg py-20 md:py-28 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image */}
                <div className="srv-reveal">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/srv-motion.png"
                      alt="Why Us — The Bridge Between Design & Code"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="srv-reveal">
                  <h2
                    className="font-heading font-bold text-text leading-[1.1] mb-5"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
                  >
                    Why Us: The Bridge Between
                    <br />
                    <span className="text-accent">Design & Code</span>
                  </h2>
                  <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-10">
                    Sự kết hợp độc đáo giữa tầm nhìn sáng tạo và năng lực kỹ thuật
                    đảm bảo sản phẩm không chỉ đạt chuẩn mà vượt trội. Chúng tôi
                    không chỉ xây website — chúng tôi tạo trải nghiệm số đẳng cấp.
                  </p>

                  <div className="grid grid-cols-3 gap-6">
                    {WHY_US.map((item) => (
                      <div key={item.title} className="group">
                        <span className="text-accent mb-3 block">{item.icon}</span>
                        <h4 className="font-heading font-bold text-text text-sm mb-1 group-hover:text-accent transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-text-light text-xs leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── CTA — "Let's build something iconic." ─── */}
          <section className="bg-[#1a1a18] py-20 md:py-28 px-6">
            <div className="max-w-3xl mx-auto text-center srv-reveal">
              <Link
                to="/bat-dau-du-an"
                className="btn-gold btn-press inline-flex text-lg"
              >
                Let's build something iconic.
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
