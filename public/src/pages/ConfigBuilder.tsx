import { useState, useEffect } from 'react'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useApi } from '../hooks/useApi'

/**
 * ConfigBuilder — Multi-step project estimator
 * NOW WIRED to GET /api/public/settings + POST /api/public/submit-project
 */

interface SystemType {
  icon: string
  title: string
  description: string
  base_price?: number
}

const DEFAULT_TYPES: SystemType[] = [
  { icon: 'bolt', title: 'Landing Page', description: 'Trang giới thiệu sản phẩm, dịch vụ' },
  { icon: 'business', title: 'Website Doanh Nghiệp', description: 'Website đa trang cho công ty, tổ chức' },
  { icon: 'shopping_bag', title: 'Thương Mại Điện Tử', description: 'Cửa hàng online, thanh toán, quản lý đơn' },
  { icon: 'layers', title: 'Ứng Dụng Web', description: 'Hệ thống quản lý, dashboard, SaaS' },
]

const STEPS = [
  { number: 1, label: 'Loại Hệ Thống' },
  { number: 2, label: 'Tính Năng' },
  { number: 3, label: 'Thông Tin' },
  { number: 4, label: 'Tổng Kết' },
]

export default function ConfigBuilder() {
  const api = useApi()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState(0)
  const [systemTypes, setSystemTypes] = useState<SystemType[]>(DEFAULT_TYPES)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Contact info (step 3)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/public/settings`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Settings unavailable')
        const data: any = await res.json()
        if (data.systemTypes && Array.isArray(data.systemTypes) && data.systemTypes.length > 0) {
          setSystemTypes(data.systemTypes)
        }
      })
      .catch(() => {/* Use defaults */})
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async () => {
    if (!contactName || !contactEmail) {
      setError('Vui lòng nhập tên và email')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await api.post('/api/public/submit-project', {
        system_type: systemTypes[selectedType]?.title || '',
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        message: contactMessage,
        source: 'config-builder',
      })
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Gửi thất bại, vui lòng thử lại')
    } finally {
      setSubmitting(false)
    }
  }

  const canGoNext = () => {
    if (step === 3 && (!contactName || !contactEmail)) return false
    return true
  }

  if (loading) {
    return (
      <div className="bg-background-light text-slate-900 antialiased min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-48">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="bg-background-light text-slate-900 antialiased min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
          <Reveal>
            <span className="material-symbols-outlined text-primary text-[80px] mb-6 block">check_circle</span>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold tracking-tight mb-6">Đã Gửi Thành Công!</h1>
            <p className="text-xl text-slate-500 max-w-lg mx-auto mb-12">
              Chúng tôi sẽ liên hệ bạn trong 24 giờ để trao đổi chi tiết về dự án.
            </p>
            <a href="/" className="bg-slate-900 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary transition-all inline-flex items-center">
              Về Trang Chủ
            </a>
          </Reveal>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-background-light text-slate-900 antialiased">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <Reveal>
              <div className="mb-12">
                <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase block mb-4">BÁO GIÁ DỰ ÁN</span>
                <h1 className="text-5xl md:text-6xl font-heading font-extrabold tracking-tight mb-8">Thiết Kế Dự Án Của Bạn</h1>

                {/* Step Wizard */}
                <div className="relative flex items-center justify-between max-w-md mb-12">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -z-10" />
                  {STEPS.map((s, i) => (
                    <div
                      key={s.number}
                      className={`flex flex-col items-center gap-3 bg-background-light ${i === 0 ? 'pr-4' : i === STEPS.length - 1 ? 'pl-4' : 'px-4'}`}
                    >
                      <div className={`w-10 h-10 ${step >= s.number ? 'border-2 border-primary bg-primary text-white' : 'border-2 border-slate-200 bg-background-light text-slate-400'} flex items-center justify-center font-bold`}>
                        {step > s.number ? <span className="material-symbols-outlined text-[18px]">check</span> : s.number}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter ${step >= s.number ? 'text-primary' : 'text-slate-400'}`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Step 1: System Type Selection */}
            {step === 1 && (
              <Reveal delay={100}>
                <div className="space-y-8">
                  <h2 className="text-2xl font-heading font-bold">Chọn loại hệ thống của bạn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {systemTypes.map((type, index) => (
                      <div
                        key={type.title}
                        onClick={() => setSelectedType(index)}
                        className={`cursor-pointer p-8 transition-all flex flex-col gap-6 relative ${
                          selectedType === index
                            ? 'border-2 border-primary bg-primary/5'
                            : 'group border border-slate-200 hover:border-primary'
                        }`}
                      >
                        {selectedType === index && (
                          <div className="absolute top-4 right-4">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                          </div>
                        )}
                        <div className={`w-12 h-12 flex items-center justify-center ${
                          selectedType === index
                            ? 'border border-primary bg-primary text-white'
                            : 'border border-slate-200 group-hover:border-primary group-hover:bg-primary/5'
                        } transition-colors`}>
                          <span className={`material-symbols-outlined ${
                            selectedType === index ? '' : 'text-slate-900 group-hover:text-primary'
                          }`}>{type.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg mb-2 uppercase tracking-tight">{type.title}</h3>
                          <p className={`text-sm leading-relaxed ${
                            selectedType === index ? 'text-slate-700 font-medium' : 'text-slate-500'
                          }`}>{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Step 2: Features (placeholder for future) */}
            {step === 2 && (
              <Reveal delay={100}>
                <div className="space-y-8">
                  <h2 className="text-2xl font-heading font-bold">Chọn tính năng</h2>
                  <p className="text-slate-500">Tính năng sẽ được tùy chỉnh sau khi trao đổi chi tiết.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Responsive Design', 'CMS Integration', 'SEO Optimization', 'Analytics Dashboard', 'Multi-language', 'Payment Gateway', 'User Authentication', 'Email Notifications'].map((f) => (
                      <label key={f} className="flex items-center gap-3 p-4 border border-slate-200 hover:border-primary cursor-pointer transition-colors">
                        <input type="checkbox" className="border-slate-300 text-primary focus:ring-primary rounded" />
                        <span className="text-sm font-medium">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <Reveal delay={100}>
                <div className="space-y-8">
                  <h2 className="text-2xl font-heading font-bold">Thông tin liên hệ</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Họ và Tên *</label>
                      <input
                        className="w-full border border-slate-200 px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Email *</label>
                      <input
                        className="w-full border border-slate-200 px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Số điện thoại</label>
                      <input
                        className="w-full border border-slate-200 px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="090 123 4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Mô tả dự án</label>
                    <textarea
                      className="w-full border border-slate-200 px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Mô tả ngắn gọn về dự án..."
                    />
                  </div>
                </div>
              </Reveal>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <Reveal delay={100}>
                <div className="space-y-8">
                  <h2 className="text-2xl font-heading font-bold">Tổng kết dự án</h2>
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
                  )}
                  <div className="border border-slate-200 p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <span className="text-sm text-slate-500">Loại hệ thống</span>
                      <span className="text-sm font-bold">{systemTypes[selectedType]?.title}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <span className="text-sm text-slate-500">Họ và Tên</span>
                      <span className="text-sm font-bold">{contactName}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <span className="text-sm text-slate-500">Email</span>
                      <span className="text-sm font-bold">{contactEmail}</span>
                    </div>
                    {contactPhone && (
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <span className="text-sm text-slate-500">Số điện thoại</span>
                        <span className="text-sm font-bold">{contactPhone}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-primary text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ĐANG GỬI...
                      </>
                    ) : (
                      'GỬI YÊU CẦU BÁO GIÁ'
                    )}
                  </button>
                </div>
              </Reveal>
            )}

            {/* Navigation Buttons */}
            <div className="mt-16 flex items-center gap-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] border border-transparent hover:border-slate-200 transition-all text-slate-400"
                >
                  Quay Lại
                </button>
              )}
              {step < 4 && (
                <button
                  onClick={() => { if (canGoNext()) setStep(s => s + 1) }}
                  className="px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] bg-slate-900 text-white hover:bg-primary hover:text-white transition-all"
                >
                  Tiếp Theo
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <Reveal delay={200}>
              <div className="sticky top-32 border border-slate-200 p-8 space-y-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Ước Tính Chi Phí</p>
                  <p className="text-xl font-heading font-extrabold tracking-tight">Liên hệ để báo giá</p>
                </div>
                <div className="h-[1px] bg-slate-200" />
                <div className="bg-slate-50 p-4">
                  <p className="text-[10px] leading-relaxed text-slate-500 uppercase tracking-tighter">
                    * Báo giá sơ bộ, giá cuối cùng sẽ được xác nhận sau khi trao đổi chi tiết.
                  </p>
                </div>
                <div className="space-y-4 pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                    <span>Đã chọn</span>
                    <span className="text-primary">1</span>
                  </p>
                  <ul className="text-xs space-y-2 text-slate-500">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[14px] mt-0.5">check</span>
                      {systemTypes[selectedType]?.title}
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
