import { useState, useEffect } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import { API_BASE } from '../../config/site'

/**
 * ContactSection — Dark theme contact form + info
 * Maintains full form logic, updated styling for Oasis pattern
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

  // Contact info from API
  const [contactInfo, setContactInfo] = useState<{
    email: string
    phone: string
    address: string
  }>({ email: '', phone: '', address: '' })
  const [infoLoading, setInfoLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/site-settings`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setContactInfo({
          email: data.email || data.contactEmail || '',
          phone: data.phone || data.contactPhone || '',
          address: data.address || data.contactAddress || '',
        })
      })
      .catch(() => { /* silent */ })
      .finally(() => setInfoLoading(false))
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
    <section id="lien-he" className="bg-[#0a0a0a] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left — Info */}
        <ScrollReveal direction="left">
          <div>
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
              Liên Hệ
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-white tracking-tight leading-tight mb-8">
              Hãy bắt đầu<br />dự án của bạn.
            </h2>
            <p className="text-white/50 text-lg mb-12 font-display font-light">
              Gửi thông tin liên hệ, chúng tôi sẽ phản hồi trong 24 giờ.
            </p>

            {infoLoading ? (
              <div className="space-y-8 animate-pulse">
                <div className="h-4 w-40 bg-white/10" />
                <div className="h-4 w-32 bg-white/10" />
                <div className="h-4 w-48 bg-white/10" />
              </div>
            ) : (
              <div className="space-y-8">
                {contactInfo.email && (
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Email</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-lg text-white/80 hover:text-primary transition-colors font-display">
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.phone && (
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Điện thoại</span>
                    <p className="text-lg text-white/80 font-display">{contactInfo.phone}</p>
                  </div>
                )}
                {contactInfo.address && (
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Địa chỉ</span>
                    <p className="text-lg text-white/60 font-display">{contactInfo.address}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Right — Form */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12">
            {status === 'success' ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-primary text-[64px] mb-4 block">check_circle</span>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">Đã gửi thành công!</h3>
                <p className="text-white/50 mb-8">Chúng tôi sẽ phản hồi trong 24 giờ.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-primary font-bold text-sm uppercase tracking-[0.2em] hover:underline"
                >
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {status === 'error' && errorMsg && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="group border-b border-white/10 focus-within:border-primary transition-colors">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Họ và tên</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg text-white placeholder:text-white/20 bg-transparent outline-none disabled:opacity-50 font-display"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="group border-b border-white/10 focus-within:border-primary transition-colors">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg text-white placeholder:text-white/20 bg-transparent outline-none disabled:opacity-50 font-display"
                    placeholder="email@vi-du.com"
                  />
                </div>

                <div className="group border-b border-white/10 focus-within:border-primary transition-colors">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Số điện thoại</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg text-white placeholder:text-white/20 bg-transparent outline-none disabled:opacity-50 font-display"
                    placeholder="090 123 4567"
                  />
                </div>

                <div className="group border-b border-white/10 focus-within:border-primary transition-colors">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Nội dung tin nhắn</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg text-white placeholder:text-white/20 resize-none bg-transparent outline-none disabled:opacity-50 font-display"
                    placeholder="Hãy mô tả về dự án của bạn..."
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/80 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    'Gửi Tin Nhắn'
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
