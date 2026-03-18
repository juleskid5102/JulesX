import { useEffect, useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import { API_BASE } from '../../config/site'

interface Testimonial {
  quote: string
  name: string
  role?: string
}

/**
 * TestimonialSection — Large serif quote, dark cinematic style
 * One featured testimonial, Oasis-inspired
 */
export default function TestimonialSection() {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)

  useEffect(() => {
    // Try fetching testimonials from site-settings (testimonials field)
    fetch(`${API_BASE}/api/public/site-settings`)
      .then(async (res) => {
        if (!res.ok) return
        const data = await res.json()
        const t = data.testimonials?.[0] || data.testimonial
        if (t) {
          setTestimonial({
            quote: t.quote || t.text || '',
            name: t.name || t.author || '',
            role: t.role || t.company || '',
          })
        }
      })
      .catch(() => {})
  }, [])

  // Fallback testimonial if API doesn't return one
  const display = testimonial || {
    quote: 'Jules Studio đã giúp chúng tôi tạo ra một website không chỉ đẹp mà còn mang lại hiệu quả kinh doanh thực sự.',
    name: 'Khách Hàng',
    role: 'CEO',
  }

  return (
    <section className="bg-[#050508] py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <ScrollReveal direction="none" duration={1.2} className="max-w-4xl mx-auto">
        <span className="text-6xl font-heading text-primary/30 mb-8 block">
          "
        </span>
        <blockquote className="font-heading text-2xl md:text-4xl text-white/90 leading-relaxed mb-12 font-light tracking-tight">
          {display.quote}
        </blockquote>
        <div className="w-12 h-px bg-primary mx-auto mb-6" />
        <cite className="not-italic uppercase tracking-[0.3em] text-sm text-white/40 font-semibold">
          {display.name}
          {display.role && <span className="text-white/20"> — {display.role}</span>}
        </cite>
      </ScrollReveal>
    </section>
  )
}
