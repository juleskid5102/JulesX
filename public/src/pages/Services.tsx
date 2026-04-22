import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * Services — JulesX Editorial (Vietnamese)
 * Timeline: continuous vertical center line, circles on it,
 * horizontal connectors to alternating content blocks,
 * hover highlighting.
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
    image: '/images/srv-motion.png',
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

/* ─── Wave SVG background pattern ─── */
function WaveBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
      <svg className="absolute -top-20 -left-20 w-[600px] h-[600px]" viewBox="0 0 600 600" fill="none">
        <path d="M0 300C0 300 100 200 200 250S350 350 450 300S600 200 600 200" stroke="currentColor" strokeWidth="1.5" className="text-text" />
        <path d="M0 350C0 350 120 250 220 300S370 400 470 350S600 250 600 250" stroke="currentColor" strokeWidth="1" className="text-text" />
        <path d="M0 400C0 400 80 320 200 360S380 440 480 380S600 300 600 300" stroke="currentColor" strokeWidth="0.8" className="text-text" />
      </svg>
      <svg className="absolute -bottom-20 -right-20 w-[700px] h-[500px]" viewBox="0 0 700 500" fill="none">
        <path d="M0 200C100 150 200 250 300 200S500 100 600 180S700 250 700 250" stroke="currentColor" strokeWidth="1.5" className="text-text" />
        <path d="M0 250C80 200 180 300 280 250S450 150 560 220S700 300 700 300" stroke="currentColor" strokeWidth="1" className="text-text" />
      </svg>
      <svg className="absolute top-1/2 -left-10 w-[400px] h-[400px] -translate-y-1/2" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.6" className="text-text" opacity="0.5" />
        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.4" className="text-text" opacity="0.3" />
      </svg>
    </div>
  )
}

/* ─── Timeline Step (Desktop) ─── */
function TimelineStep({
  service,
  index,
  hoveredIndex,
  onHover,
}: {
  service: (typeof SERVICES)[number]
  index: number
  hoveredIndex: number | null
  onHover: (i: number | null) => void
}) {
  const isOdd = index % 2 === 0 // 01,03 = text LEFT; 02,04 = text RIGHT
  const isActive = hoveredIndex === index

  const contentBlock = (
    <div
      className={`transition-all duration-400 ${isActive ? 'opacity-100 scale-[1.01]' : hoveredIndex !== null ? 'opacity-60' : 'opacity-100'
        }`}
    >
      <h3
        className={`font-heading font-bold leading-[1.15] mb-1 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-text'
          }`}
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
      >
        {service.title}:
      </h3>
      <p
        className="font-heading font-bold text-text-muted mb-4"
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
      >
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

  const imageBlock = (
    <div
      className={`transition-all duration-400 ${isActive ? 'opacity-100 scale-[1.02]' : hoveredIndex !== null ? 'opacity-60' : 'opacity-100'
        }`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg group">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  )

  return (
    <div
      className="relative grid grid-cols-[1fr_80px_1fr] items-center"
      style={{ minHeight: '280px' }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* LEFT column */}
      <div className={`pr-6 ${isOdd ? '' : 'order-1'}`}>
        {isOdd ? contentBlock : imageBlock}
      </div>

      {/* CENTER — circle + horizontal connectors */}
      <div className="relative flex items-center justify-center order-2" style={{ width: '80px' }}>
        {/* Horizontal connector LEFT */}
        <div
          className={`absolute right-1/2 top-1/2 -translate-y-1/2 h-[2px] transition-colors duration-300 ${isActive ? 'bg-accent' : 'bg-border'
            }`}
          style={{ width: 'calc(50% - 28px)', right: 'calc(50% + 28px)', left: '0' }}
        />

        {/* Circle */}
        <div
          className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-[2.5px] transition-all duration-300 ${isActive
              ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20 scale-110'
              : 'border-text/25 bg-bg text-text'
            }`}
          style={{
            boxShadow: isActive
              ? undefined
              : '0 0 0 4px rgba(245,240,232,1), 0 0 0 6px rgba(0,0,0,0.05)',
          }}
        >
          <span className="font-heading text-sm font-bold">{service.num}</span>
        </div>

        {/* Horizontal connector RIGHT */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-y-1/2 h-[2px] transition-colors duration-300 ${isActive ? 'bg-accent' : 'bg-border'
            }`}
          style={{ width: 'calc(50% - 28px)', left: 'calc(50% + 28px)', right: '0' }}
        />
      </div>

      {/* RIGHT column */}
      <div className={`pl-6 ${isOdd ? 'order-3' : ''}`}>
        {isOdd ? imageBlock : contentBlock}
      </div>
    </div>
  )
}

export default function Services() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

          {/* ─── Timeline Section ─── */}
          <section className="px-6 max-w-7xl mx-auto mb-28 md:mb-36 relative z-10">
            {/* ─── Desktop Timeline ─── */}
            <div className="hidden lg:block relative">
              {/* ▌ Continuous vertical center line — runs the entire height */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-border"
                style={{ left: 'calc(50% - 1px)' }}
              />

              {/* Steps */}
              <div className="relative flex flex-col" style={{ gap: '60px', paddingTop: '40px', paddingBottom: '40px' }}>
                {SERVICES.map((service, i) => (
                  <TimelineStep
                    key={service.num}
                    service={service}
                    index={i}
                    hoveredIndex={hoveredIndex}
                    onHover={setHoveredIndex}
                  />
                ))}
              </div>
            </div>

            {/* ─── Mobile Timeline ─── */}
            <div className="lg:hidden flex flex-col gap-12">
              {SERVICES.map((service) => (
                <div key={service.num} className="srv-reveal">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full border-[2.5px] border-text/25 bg-bg shadow-[0_0_0_3px_rgba(245,240,232,1),0_0_0_5px_rgba(0,0,0,0.06)]">
                      <span className="font-heading text-base font-bold text-text">
                        {service.num}
                      </span>
                    </div>
                    <div className="flex-1 h-[2px] bg-border" />
                  </div>

                  <h3
                    className="font-heading font-bold text-text leading-[1.15] mb-1"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                  >
                    {service.title}:
                  </h3>
                  <p className="font-heading font-bold text-text-muted mb-4" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
                    {service.subtitle}
                  </p>
                  <p className="text-text-muted leading-relaxed text-[0.9375rem] mb-5">
                    {service.description}
                  </p>

                  <div className="relative overflow-hidden rounded-2xl shadow-lg mb-5">
                    <img src={service.image} alt={service.title} className="w-full h-auto object-cover" loading="lazy" />
                  </div>

                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-light mb-2">
                    Sản phẩm bàn giao:
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {service.deliverables}.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Why Us ─── */}
          <section className="bg-bg py-20 md:py-28 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="srv-reveal">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img src="/images/srv-whyus.png" alt="Cầu nối giữa Thiết Kế và Lập Trình" className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                </div>

                <div className="srv-reveal">
                  <h2
                    className="font-heading font-bold text-text leading-[1.1] mb-5"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
                  >
                    Tại Sao Chọn Chúng Tôi:
                    <br />
                    Cầu Nối Giữa{' '}
                    <span className="text-accent">Thiết Kế & Lập Trình</span>
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

          {/* ─── CTA ─── */}
          <section className="bg-[#1a1a18] py-20 md:py-28 px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center srv-reveal">
              <Link
                to="/bat-dau-du-an"
                className="btn-gold btn-press inline-flex text-lg"
              >
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
