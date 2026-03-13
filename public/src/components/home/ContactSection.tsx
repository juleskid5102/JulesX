import { useState } from 'react'
import Reveal from '../ui/Reveal'
import { CONTACT } from '../../config/site'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

/**
 * ContactSection — From 01-homepage.html
 * NOW WIRED to POST /api/public/contact
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
    <section id="lien-he" className="bg-white py-32 px-6 md:px-24 border-t border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left — Info */}
        <Reveal>
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter font-heading uppercase leading-none mb-8">
              Hãy bắt đầu<br />dự án của bạn.
            </h2>
            <p className="text-xl text-slate-500 mb-12">
              Gửi thông tin liên hệ, chúng tôi sẽ phản hồi trong 24 giờ.
            </p>

            <div className="space-y-8">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</span>
                <p className="text-xl font-medium">{CONTACT.email}</p>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Điện thoại</span>
                <p className="text-xl font-medium">{CONTACT.phone}</p>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Địa chỉ</span>
                <p className="text-xl font-medium">{CONTACT.address}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right — Form */}
        <Reveal delay={150}>
          <div className="bg-white border border-slate-200 p-8 md:p-12">
            {status === 'success' ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-primary text-[64px] mb-4 block">check_circle</span>
                <h3 className="font-heading text-2xl font-bold mb-3">Đã gửi thành công!</h3>
                <p className="text-slate-500 mb-8">Chúng tôi sẽ phản hồi trong 24 giờ.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
                >
                  Gửi tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {status === 'error' && errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="group border-b border-slate-200 focus-within:border-primary transition-colors">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">Họ và tên</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg placeholder:text-slate-300 bg-transparent outline-none disabled:opacity-50"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="group border-b border-slate-200 focus-within:border-primary transition-colors">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg placeholder:text-slate-300 bg-transparent outline-none disabled:opacity-50"
                    placeholder="email@vi-du.com"
                  />
                </div>

                <div className="group border-b border-slate-200 focus-within:border-primary transition-colors">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">Số điện thoại</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg placeholder:text-slate-300 bg-transparent outline-none disabled:opacity-50"
                    placeholder="090 123 4567"
                  />
                </div>

                <div className="group border-b border-slate-200 focus-within:border-primary transition-colors">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400">Nội dung tin nhắn</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full border-none px-0 py-4 focus:ring-0 text-lg placeholder:text-slate-300 resize-none bg-transparent outline-none disabled:opacity-50"
                    placeholder="Hãy mô tả về dự án của bạn..."
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-900 text-white py-6 text-sm font-bold uppercase tracking-widest hover:bg-primary transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
        </Reveal>
      </div>
    </section>
  )
}
