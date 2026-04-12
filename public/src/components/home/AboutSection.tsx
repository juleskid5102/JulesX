import { useRef, useEffect } from 'react'
import ScrollReveal from '../ui/ScrollReveal'

/**
 * CountUpStat — Animated number counting from 0 to target
 */
function CountUpStat({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = numRef.current
    if (!el || hasAnimated.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value + suffix
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        let start = 0
        const duration = 2000
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.floor(eased * value)
          el.textContent = current + suffix
          if (progress < 1) requestAnimationFrame(step)
          else el.textContent = value + suffix
        }
        requestAnimationFrame(step)
        observer.disconnect()
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, suffix])

  return (
    <div className="bg-white p-8 rounded-xl border border-stone-200/50 hover-lift group cursor-default">
      <p className="text-primary text-3xl lg:text-4xl font-extrabold mb-1 font-display">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="text-stone-500 text-sm font-medium font-display group-hover:text-stone-700 transition-colors">
        {label}
      </p>
    </div>
  )
}

const stats = [
  { value: 50, suffix: '+', label: 'Dự án hoàn thành' },
  { value: 100, suffix: '%', label: 'Khách hàng hài lòng' },
  { value: 30, suffix: ' Ngày', label: 'Thời gian hoàn thiện' },
  { value: 24, suffix: '/7', label: 'Hỗ trợ tận tâm' },
]

/**
 * AboutSection — v4 with CountUp animated stats
 */
export default function AboutSection() {
  return (
    <section className="bg-[#F5F5F0] py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — Text */}
        <ScrollReveal className="space-y-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display leading-tight">
            Thiết kế không chỉ để đẹp — mà để{' '}
            <span className="text-primary">hoạt động</span>
          </h3>
          <p className="text-stone-600 leading-relaxed text-lg font-display max-w-xl">
            Jules Studio là web design studio chuyên thiết kế website theo hướng trải nghiệm và storytelling. 
            Chúng tôi kết hợp giữa thẩm mỹ cao cấp và giải pháp kỹ thuật tối ưu để biến thương hiệu của bạn 
            thành một thực thể số đầy sức sống.
          </p>
        </ScrollReveal>

        {/* Right — Animated Stats Bento Grid */}
        <ScrollReveal className="grid grid-cols-2 gap-4" stagger={0.1}>
          {stats.map((stat) => (
            <CountUpStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
