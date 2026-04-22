import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MotionDemo from '../components/MotionDemo'

/**
 * Services — JulesX Editorial (Vietnamese)
 *
 * v6:
 * 1. Vertical line from circle 01 → 04 only (dynamic via refs)
 * 2. Dot connector tips + left-aligned text
 * 3. Step 04 uses live MotionDemo instead of static image
 * 4. More padding for steps 02/04 text (pl-28)
 * 5. Enhanced organic wave background with subtle motion
 */

const SERVICES = [
  {
    num: '01',
    title: 'Bản Thiết Kế',
    subtitle: 'Chiến Lược & Nghiên Cứu UX',
    description:
      'Nghiên cứu sâu, phân tích người dùng và lập kế hoạch chiến lược. Chúng tôi xác định logic cốt lõi và mô hình tương tác trước khi thiết kế bất kỳ pixel nào.',
    deliverables: 'User Personas, Information Architecture, Wireframes, Functional Specifications',
    image: '/images/srv-strategy.png',
  },
  {
    num: '02',
    title: 'Thẩm Mỹ',
    subtitle: 'Giao Diện & Nhận Diện Thương Hiệu',
    description:
      'Xây dựng ngôn ngữ hình ảnh riêng biệt. Kết hợp bản sắc thương hiệu với thiết kế giao diện trực quan để tạo tác động tối đa.',
    deliverables: 'Brand System, Visual Design, Style Guide, UI Components',
    image: '/images/srv-design.png',
  },
  {
    num: '03',
    title: 'Bộ Máy',
    subtitle: 'Phát Triển & Mở Rộng',
    description:
      'Kỹ thuật vững vàng, code sạch và có khả năng mở rộng. Xây dựng nền tảng tối ưu cho tốc độ và bảo mật.',
    deliverables: 'Front-End, Back-End, CMS Integration, Performance Optimization, API Development',
    image: '/images/srv-dev.png',
  },
  {
    num: '04',
    title: 'Linh Hồn',
    subtitle: 'Chuyển Động & Tương Tác',
    description:
      'Thổi hồn vào trải nghiệm. Tích hợp animations mượt mà và micro-interactions tạo sự hấp dẫn và thú vị.',
    deliverables: 'Interactive Prototypes, Animation Library, Micro-Interactions, Sound Design',
    image: '/images/srv-motion.png', // Fallback for mobile
    isMotion: true, // Flag for live animation on desktop
  },
]

const WHY_US = [
  {
    title: 'Tiếp Cận Toàn Diện',
    desc: 'Từ chiến lược đến thực thi, không chỉ thiết kế — chúng tôi tạo trải nghiệm số trọn vẹn.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Chính Xác Từng Pixel',
    desc: 'Mỗi pixel, mỗi animation, mỗi dòng code đều được tinh chỉnh đạt chất lượng cao nhất.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Hiệu Suất Tối Ưu',
    desc: 'Lighthouse 100/100, Core Web Vitals xanh lá, tốc độ tải nhanh trên mọi thiết bị.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

/* ─── Organic wave / mesh background — visible but not distracting ─── */
function WaveBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* ── Layer 1: Full-width flowing waves (top area) ── */}
      <svg
        className="absolute -top-20 left-0 w-full h-[600px]"
        viewBox="0 0 1400 600"
        fill="none"
        preserveAspectRatio="none"
        style={{ animation: 'waveDrift 30s ease-in-out infinite', opacity: 0.08 }}
      >
        <path d="M0 250C200 180 400 320 600 270S900 150 1100 230S1400 300 1400 300" stroke="#8a7a62" strokeWidth="2" />
        <path d="M0 290C150 220 350 360 550 300S850 180 1050 260S1400 330 1400 330" stroke="#8a7a62" strokeWidth="1.5" />
        <path d="M0 330C180 270 380 390 580 320S880 200 1080 280S1400 360 1400 360" stroke="#8a7a62" strokeWidth="1" />
        <path d="M0 370C120 310 320 420 520 340S820 220 1020 300S1400 380 1400 380" stroke="#8a7a62" strokeWidth="0.8" />
        <path d="M0 410C200 360 400 440 600 370S900 250 1100 320S1400 400 1400 400" stroke="#8a7a62" strokeWidth="0.6" />
      </svg>

      {/* ── Layer 2: Bottom flowing waves ── */}
      <svg
        className="absolute -bottom-20 left-0 w-full h-[500px]"
        viewBox="0 0 1400 500"
        fill="none"
        preserveAspectRatio="none"
        style={{ animation: 'waveDrift 25s ease-in-out infinite reverse', opacity: 0.07 }}
      >
        <path d="M0 200C250 120 500 300 750 220S1100 100 1400 200" stroke="#8a7a62" strokeWidth="2" />
        <path d="M0 240C200 160 450 320 700 250S1050 130 1400 230" stroke="#8a7a62" strokeWidth="1.5" />
        <path d="M0 280C300 210 550 360 800 270S1150 150 1400 260" stroke="#8a7a62" strokeWidth="1" />
      </svg>

      {/* ── Layer 3: Topographic contour circles (right side) ── */}
      <svg
        className="absolute top-[20%] -right-40 w-[600px] h-[600px]"
        viewBox="0 0 600 600"
        fill="none"
        style={{ animation: 'waveDrift 40s ease-in-out infinite', opacity: 0.06 }}
      >
        <circle cx="300" cy="300" r="80" stroke="#8a7a62" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="130" stroke="#8a7a62" strokeWidth="1.2" />
        <circle cx="300" cy="300" r="180" stroke="#8a7a62" strokeWidth="1" />
        <circle cx="300" cy="300" r="230" stroke="#8a7a62" strokeWidth="0.8" />
        <circle cx="300" cy="300" r="280" stroke="#8a7a62" strokeWidth="0.5" />
      </svg>

      {/* ── Layer 4: Topographic contour circles (left-center) ── */}
      <svg
        className="absolute top-[55%] -left-32 w-[500px] h-[500px]"
        viewBox="0 0 500 500"
        fill="none"
        style={{ animation: 'waveDrift 35s ease-in-out infinite reverse', opacity: 0.05 }}
      >
        <circle cx="250" cy="250" r="100" stroke="#8a7a62" strokeWidth="1.2" />
        <circle cx="250" cy="250" r="160" stroke="#8a7a62" strokeWidth="0.8" />
        <circle cx="250" cy="250" r="220" stroke="#8a7a62" strokeWidth="0.5" />
        <path d="M100 250C100 167 167 100 250 100" stroke="#8a7a62" strokeWidth="1.5" />
      </svg>

      {/* ── Layer 5: Subtle dot grid (very faint) ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.03 }}
      >
        <defs>
          <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#8a7a62" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" />
      </svg>

      {/* CSS for gentle drift */}
      <style>{`
        @keyframes waveDrift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(8px, 4px); }
          66% { transform: translate(-5px, 7px); }
        }
      `}</style>
    </div>
  )
}

/* ─── Small dot at connector tip ─── */
function ConnectorDot({ side, isActive }: { side: 'left' | 'right'; isActive: boolean }) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full border-[1.5px] transition-colors duration-300 ${isActive ? 'border-accent bg-accent' : 'border-text/30 bg-bg'
        }`}
      style={side === 'left' ? { left: '-4px' } : { right: '-4px' }}
    />
  )
}

const CIRCLE_SIZE = 64
const CIRCLE_CENTER_Y = 32
const CONNECTOR_WIDTH = 60

export default function Services() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 })

  // Vertical line from circle 01 center → circle 04 center
  useEffect(() => {
    const calculate = () => {
      const container = timelineRef.current
      const first = circleRefs.current[0]
      const last = circleRefs.current[SERVICES.length - 1]
      if (!container || !first || !last) return

      const containerRect = container.getBoundingClientRect()
      const firstRect = first.getBoundingClientRect()
      const lastRect = last.getBoundingClientRect()

      const top = firstRect.top - containerRect.top + firstRect.height / 2
      const bottom = lastRect.top - containerRect.top + lastRect.height / 2
      setLineStyle({ top, height: bottom - top })
    }

    // Delay to ensure layout
    const timer = setTimeout(calculate, 100)
    window.addEventListener('resize', calculate)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculate)
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const els = pageRef.current?.querySelectorAll('.srv-reveal')
      if (!els) return
      els.forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    }
    init()
  }, [])

  /* ─── Render a content block (text) ─── */
  const renderContent = (service: typeof SERVICES[number], isActive: boolean) => (
    <div className="text-left">
      <h3
        className={`font-heading font-bold leading-[1.15] mb-1 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-text'
          }`}
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
      >
        {service.title}:
      </h3>
      <p className="font-heading font-bold text-text-muted mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
        {service.subtitle}
      </p>
      <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-5">
        {service.description}
      </p>
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-light mb-2">
        Sản phẩm bàn giao:
      </p>
      <p className="text-text-muted text-sm leading-relaxed">
        {service.deliverables}.
      </p>
    </div>
  )

  /* ─── Render a media block (image or MotionDemo for step 04) ─── */
  const renderMedia = (service: typeof SERVICES[number]) => {
    if (service.isMotion) {
      return <MotionDemo />
    }
    return (
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
          style={{ maxHeight: '280px', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
        <main className="pt-32 pb-0 bg-bg relative">
          <WaveBackground />

          {/* ─── Hero ─── */}
          <section className="px-6 max-w-7xl mx-auto mb-20 md:mb-28 srv-reveal relative z-10">
            <h1
              className="font-heading font-bold text-text leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Dịch Vụ — Quy Trình
              <br />
              Xây Dựng Toàn Diện
            </h1>
            <p className="text-text-muted text-lg max-w-xl leading-relaxed">
              Quy trình end-to-end từ chiến lược đến thực thi.
              <br />
              Từ ý tưởng đến sản phẩm đoạt giải thưởng.
            </p>
          </section>

          {/* ━━━ TIMELINE SECTION ━━━ */}
          <section className="px-6 max-w-7xl mx-auto mb-28 md:mb-36 relative z-10">

            {/* ─── DESKTOP TIMELINE ─── */}
            <div ref={timelineRef} className="hidden lg:block relative">

              {/* Vertical line: 01 center → 04 center */}
              {lineStyle.height > 0 && (
                <div
                  className="absolute w-[2px] bg-border"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: `${lineStyle.top}px`,
                    height: `${lineStyle.height}px`,
                  }}
                />
              )}

              {/* Steps */}
              {SERVICES.map((service, i) => {
                const isOddStep = i % 2 === 0 // 01,03 text LEFT
                const isActive = hoveredIndex === i
                const isDimmed = hoveredIndex !== null && hoveredIndex !== i

                return (
                  <div
                    key={service.num}
                    className="srv-reveal"
                    style={{ marginBottom: i < SERVICES.length - 1 ? '100px' : '0' }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="grid grid-cols-2 gap-0 relative" style={{ minHeight: '200px' }}>

                      {/* Circle */}
                      <div
                        ref={el => { circleRefs.current[i] = el }}
                        className="absolute z-20"
                        style={{
                          left: '50%',
                          top: `${CIRCLE_CENTER_Y}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center border-[2.5px] transition-all duration-300 ${isActive
                            ? 'border-accent bg-accent text-white shadow-lg shadow-accent/25 scale-110'
                            : 'border-text/30 bg-bg text-text'
                            }`}
                          style={{
                            boxShadow: isActive
                              ? undefined
                              : '0 0 0 5px rgba(245,240,232,1), 0 0 0 7px rgba(0,0,0,0.06)',
                          }}
                        >
                          <span className="font-heading text-base font-bold">{service.num}</span>
                        </div>
                      </div>

                      {/* Horizontal connector with dot */}
                      <div
                        className="absolute z-10"
                        style={{
                          top: `${CIRCLE_CENTER_Y}px`,
                          transform: 'translateY(-50%)',
                          height: '2px',
                          width: `${CONNECTOR_WIDTH}px`,
                          ...(isOddStep
                            ? { right: `calc(50% + ${CIRCLE_SIZE / 2 + 2}px)` }
                            : { left: `calc(50% + ${CIRCLE_SIZE / 2 + 2}px)` }),
                        }}
                      >
                        <div
                          className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-accent' : 'bg-text/20'
                            }`}
                        />
                        <ConnectorDot side={isOddStep ? 'left' : 'right'} isActive={isActive} />
                      </div>

                      {/* LEFT column */}
                      <div
                        className={`transition-all duration-400 ${isDimmed ? 'opacity-50' : 'opacity-100'
                          } ${isOddStep ? 'pr-24' : 'pr-16'}`}
                      >
                        {isOddStep ? renderContent(service, isActive) : renderMedia(service)}
                      </div>

                      {/* RIGHT column — more padding (pl-28) for text on even steps */}
                      <div
                        className={`transition-all duration-400 ${isDimmed ? 'opacity-50' : 'opacity-100'
                          } ${isOddStep ? 'pl-24' : 'pl-28'}`}
                      >
                        {isOddStep ? renderMedia(service) : renderContent(service, isActive)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ─── MOBILE TIMELINE ─── */}
            <div className="lg:hidden flex flex-col gap-12">
              {SERVICES.map((service) => (
                <div key={service.num} className="srv-reveal">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full border-[2.5px] border-text/30 bg-bg shadow-[0_0_0_3px_rgba(245,240,232,1),0_0_0_5px_rgba(0,0,0,0.06)]">
                      <span className="font-heading text-base font-bold text-text">{service.num}</span>
                    </div>
                    <div className="flex-1 h-[2px] bg-border relative">
                      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full border-[1.5px] border-text/30 bg-bg" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-text leading-[1.15] mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    {service.title}:
                  </h3>
                  <p className="font-heading font-bold text-text-muted mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
                    {service.subtitle}
                  </p>
                  <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-5">{service.description}</p>

                  <div className="mb-5">
                    {service.isMotion ? (
                      <MotionDemo />
                    ) : (
                      <div className="overflow-hidden rounded-2xl shadow-lg">
                        <img src={service.image} alt={service.title} className="w-full h-auto object-cover" style={{ maxHeight: '240px' }} loading="lazy" />
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-light mb-2">Sản phẩm bàn giao:</p>
                  <p className="text-text-muted text-sm leading-relaxed">{service.deliverables}.</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Why Us ─── */}
          <section className="bg-bg py-20 md:py-28 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="srv-reveal">
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img src="/images/srv-whyus.png" alt="Cầu nối giữa Thiết Kế và Lập Trình" className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="srv-reveal">
                  <h2 className="font-heading font-bold text-text leading-[1.1] mb-5" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
                    Tại Sao Chọn Chúng Tôi:
                    <br />
                    Cầu Nối Giữa <span className="text-accent">Thiết Kế & Lập Trình</span>
                  </h2>
                  <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-10">
                    Sự kết hợp độc đáo giữa tầm nhìn sáng tạo và năng lực kỹ thuật đảm bảo sản phẩm không chỉ đạt chuẩn mà vượt trội.
                    Chúng tôi không chỉ xây website — chúng tôi tạo trải nghiệm số đẳng cấp.
                  </p>
                  <div className="grid grid-cols-3 gap-6">
                    {WHY_US.map((item) => (
                      <div key={item.title} className="group">
                        <span className="text-accent mb-3 block">{item.icon}</span>
                        <h4 className="font-heading font-bold text-text text-sm mb-1 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                        <p className="text-text-light text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── CTA ─── */}
          <section className="bg-[#1a1a18] py-20 md:py-28 px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center srv-reveal">
              <Link to="/bat-dau-du-an" className="btn-gold btn-press inline-flex text-lg">
                Hãy cùng xây dựng điều phi thường.
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
