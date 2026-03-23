import { useState } from 'react'
import { API_BASE } from '../../config/site'
import ScrollReveal from '../ui/ScrollReveal'

/**
 * ContactSection — matches Stitch HTML exactly
 * 2-column: contact info + social left, form right
 */
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectName: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API_BASE}/api/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', phone: '', projectName: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="lien-he" className="bg-[#F5F5F0] py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — Contact Info */}
        <ScrollReveal className="space-y-12">
          <h3 className="text-4xl font-extrabold text-stone-900 leading-tight font-display">
            Cần tư vấn ngay cho dự án của bạn?
          </h3>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <p className="text-stone-400 text-sm font-display">Điện thoại</p>
                <p className="text-stone-900 font-bold font-display">+84 901 234 567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="text-stone-400 text-sm font-display">Email</p>
                <p className="text-stone-900 font-bold font-display">hello@julesstudio.vn</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-stone-400 text-sm font-display">Địa chỉ</p>
                <p className="text-stone-900 font-bold font-display">Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            <a className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 shadow-sm hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-xl">language</span>
            </a>
            <a className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-600 shadow-sm hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-xl">camera</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Right — Contact Form */}
        <ScrollReveal>
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-stone-200/50 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase font-display">Họ tên</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase font-display">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase font-display">Số điện thoại</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                  placeholder="0901 234 567"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase font-display">Tên dự án</label>
                <input
                  type="text"
                  value={form.projectName}
                  onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                  className="w-full border border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                  placeholder="Tên website / dự án"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase font-display">Tin nhắn</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-stone-200 rounded-lg focus:ring-primary focus:border-primary px-4 py-3 bg-stone-50 font-display"
                placeholder="Chia sẻ về dự án của bạn..."
                rows={4}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all font-display disabled:opacity-50"
            >
              {status === 'sending' ? 'Đang gửi...' : status === 'sent' ? '✓ Đã gửi thành công!' : 'Gửi yêu cầu tư vấn'}
            </button>
            {status === 'error' && (
              <p className="text-red-500 text-sm text-center font-display">Có lỗi xảy ra, vui lòng thử lại.</p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}
