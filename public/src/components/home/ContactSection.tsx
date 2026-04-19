import { useState, useEffect, useRef } from 'react'
import { API_BASE } from '../../config/site'

/**
 * ContactSection — JulesX Editorial
 * Reference: screen3.png bottom CTA
 * Giant "BẠN CẦN MỘT WEBSITE?" typography
 * Dark background, centered CTA button, contact form below.
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const sectionRef = useRef<HTMLElement>(null)

  // GSAP
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const els = sectionRef.current?.querySelectorAll('.contact-reveal')
      if (!els) return

      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: els[0], start: 'top 85%' },
        }
      )
    }

    init()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Vui lòng điền đầy đủ thông tin')
      setStatus('error')
      return
    }

    setLoading(true)
    setStatus('idle')
    setErrorMsg('')

    try {
      const res = await fetch(`${API_BASE}/api/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Gửi thất bại' }))
        throw new Error((err as any).error || 'Gửi thất bại')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err: any) {
      setErrorMsg(err.message || 'Có lỗi xảy ra, vui lòng thử lại')
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lien-he" ref={sectionRef} className="bg-[#0A0A0A] overflow-hidden">
      {/* Giant CTA Typography — matching screen3 */}
      <div className="contact-reveal py-24 md:py-32 px-6 text-center">
        <h2
          className="font-heading font-bold text-white leading-[0.95] tracking-[-0.04em] uppercase"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
        >
          BẠN CẦN
        </h2>
        <div className="flex items-center justify-center gap-6 md:gap-10 my-4 md:my-6">
          <span
            className="font-heading font-bold text-white leading-[0.95] tracking-[-0.04em] uppercase"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            MỘT
          </span>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-3 px-8 py-3 bg-accent text-[#0A0A0A] font-heading font-bold text-sm uppercase tracking-[0.15em] hover:bg-accent/90 transition-colors"
          >
            Liên hệ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <span
            className="font-heading font-bold text-white leading-[0.95] tracking-[-0.04em] uppercase"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            MỘT
          </span>
        </div>
        <h2
          className="font-heading font-bold text-white leading-[0.95] tracking-[-0.04em] uppercase"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
        >
          WEBSITE<span className="text-accent">?</span>
        </h2>
      </div>

      {/* Contact Form — minimal */}
      <div id="contact-form" className="max-w-2xl mx-auto px-6 pb-24 md:pb-32">
        <div className="contact-reveal">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-6 border border-accent flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">Đã gửi thành công!</h3>
              <p className="text-white/40 mb-8">Chúng tôi sẽ phản hồi trong 24 giờ.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-accent font-semibold text-sm uppercase tracking-[0.15em] hover:underline"
              >
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {status === 'error' && errorMsg && (
                <div className="p-4 border border-red-500/20 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="border-b border-white/10 focus-within:border-accent/50 transition-colors duration-300">
                <label className="label-caps text-white/30 block">Họ và tên</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border-none px-0 py-4 focus:ring-0 text-lg text-white placeholder:text-white/15 bg-transparent outline-none disabled:opacity-50"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="border-b border-white/10 focus-within:border-accent/50 transition-colors duration-300">
                <label className="label-caps text-white/30 block">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border-none px-0 py-4 focus:ring-0 text-lg text-white placeholder:text-white/15 bg-transparent outline-none disabled:opacity-50"
                  placeholder="email@vi-du.com"
                />
              </div>

              <div className="border-b border-white/10 focus-within:border-accent/50 transition-colors duration-300">
                <label className="label-caps text-white/30 block">Nội dung</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full border-none px-0 py-4 focus:ring-0 text-lg text-white placeholder:text-white/15 resize-none bg-transparent outline-none disabled:opacity-50"
                  placeholder="Mô tả về dự án của bạn..."
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold py-4 text-center disabled:opacity-50 disabled:cursor-not-allowed btn-press w-full"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi tin nhắn"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
