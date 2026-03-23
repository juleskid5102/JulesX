import { useState, useEffect, useMemo } from 'react'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useApi } from '../hooks/useApi'

/**
 * ConfigBuilder — Multi-step project estimator with live pricing
 * Step 1: Choose system type
 * Step 2: Select features (checkbox grid, filtered by type)
 * Step 3: Contact info
 * Step 4: Summary + pricing
 */

interface Feature {
  id: string
  name: string
  category: string
  timeDev: number
  priority: '🟢' | '🟡' | '⚪'
  note?: string
}

interface PricingConfig {
  coefficient: number
  dailyRate: number
  hoursPerDay: number
  features: Feature[]
}

interface SystemType {
  icon: string
  title: string
  description: string
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

// Package definitions
type PackageType = 'basic' | 'standard' | 'advanced'
const PACKAGES: { key: PackageType; label: string; desc: string; priorities: string[] }[] = [
  { key: 'basic', label: 'Cơ Bản', desc: 'Chỉ tính năng thiết yếu', priorities: ['🟢'] },
  { key: 'standard', label: 'Phổ Thông', desc: 'Tính năng phổ biến cho loại dự án', priorities: ['🟢', '🟡'] },
  { key: 'advanced', label: 'Nâng Cao', desc: 'Đầy đủ tất cả tính năng', priorities: ['🟢', '🟡', '⚪'] },
]

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ'
}

export default function ConfigBuilder() {
  const api = useApi()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState(0)
  const [systemTypes, setSystemTypes] = useState<SystemType[]>(DEFAULT_TYPES)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Pricing data
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>({
    coefficient: 1.4,
    dailyRate: 500000,
    hoursPerDay: 8,
    features: [],
  })

  // Feature selection
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set())
  const [activePackage, setActivePackage] = useState<PackageType>('standard')

  // Contact info (step 3)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/public/settings`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null),
      fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/public/pricing-config`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null),
    ]).then(([settings, pricing]) => {
      if (settings?.systemTypes?.length > 0) {
        setSystemTypes(settings.systemTypes)
      }
      if (pricing?.features?.length > 0) {
        setPricingConfig(pricing)
      }
    }).finally(() => setLoading(false))
  }, [])

  // Auto-select features based on active package
  useEffect(() => {
    if (pricingConfig.features.length === 0) return
    const pkgDef = PACKAGES.find(p => p.key === activePackage)
    if (!pkgDef) return
    const newSelected = new Set<string>()
    for (const f of pricingConfig.features) {
      if (pkgDef.priorities.includes(f.priority)) {
        newSelected.add(f.id)
      }
    }
    setSelectedFeatures(newSelected)
  }, [activePackage, pricingConfig.features])

  // Calculate pricing for any set of features
  const calculatePricing = (featureIds: Set<string>) => {
    const { coefficient, dailyRate, hoursPerDay, features } = pricingConfig
    const selected = features.filter(f => featureIds.has(f.id))
    const timeDevTotal = selected.reduce((sum, f) => sum + f.timeDev, 0)
    const timeClient = timeDevTotal * coefficient
    const days = Math.ceil(timeClient / hoursPerDay)
    const price = days * dailyRate
    return { timeDevTotal, timeClient, days, price, count: selected.length }
  }

  // Current selection pricing
  const currentPricing = useMemo(() => calculatePricing(selectedFeatures), [selectedFeatures, pricingConfig])

  // Package pricings for comparison
  const packagePricings = useMemo(() => {
    return PACKAGES.map(pkg => {
      const ids = new Set<string>()
      for (const f of pricingConfig.features) {
        if (pkg.priorities.includes(f.priority)) ids.add(f.id)
      }
      return { ...pkg, ...calculatePricing(ids), featureIds: ids }
    })
  }, [pricingConfig])

  const toggleFeature = (id: string) => {
    const next = new Set(selectedFeatures)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedFeatures(next)
  }

  const handleSubmit = async () => {
    if (!contactName || !contactEmail) {
      setError('Vui lòng nhập tên và email')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const selectedList = pricingConfig.features.filter(f => selectedFeatures.has(f.id))
      await api.post('/api/public/submit-project', {
        systemType: systemTypes[selectedType]?.title || '',
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        description: contactMessage,
        features: selectedList.map(f => ({ name: f.name, timeDev: f.timeDev, priority: f.priority })),
        estimatedDays: currentPricing.days,
        estimatedPrice: currentPricing.price,
        package: activePackage,
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
    if (step === 2 && selectedFeatures.size === 0) return false
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
            <p className="text-xl text-slate-500 max-w-lg mx-auto mb-4">
              Chúng tôi sẽ liên hệ bạn trong 24 giờ để trao đổi chi tiết về dự án.
            </p>
            <div className="bg-slate-50 border border-slate-200 p-6 max-w-md mx-auto mb-12">
              <p className="text-sm text-slate-500 mb-2">Ước tính sơ bộ</p>
              <p className="text-3xl font-heading font-extrabold text-primary">{formatVND(currentPricing.price)}</p>
              <p className="text-xs text-slate-400 mt-1">{currentPricing.days} ngày • {currentPricing.count} tính năng</p>
            </div>
            <a href="/" className="bg-slate-900 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary transition-all inline-flex items-center">
              Về Trang Chủ
            </a>
          </Reveal>
        </main>
        <Footer />
      </div>
    )
  }

  // Group features by category
  const grouped: Record<string, Feature[]> = {}
  for (const f of pricingConfig.features) {
    if (!grouped[f.category]) grouped[f.category] = []
    grouped[f.category]!.push(f)
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
                          <span className={`material-symbols-outlined ${selectedType === index ? '' : 'text-slate-900 group-hover:text-primary'}`}>{type.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg mb-2 uppercase tracking-tight">{type.title}</h3>
                          <p className={`text-sm leading-relaxed ${selectedType === index ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Step 2: Feature Selection */}
            {step === 2 && (
              <Reveal delay={100}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-heading font-bold mb-3">Chọn tính năng cho dự án</h2>
                    <p className="text-sm text-slate-500">Chọn gói sẵn hoặc tùy chỉnh từng tính năng. Giá cập nhật realtime bên phải.</p>
                  </div>

                  {/* Package Selector */}
                  <div className="grid grid-cols-3 gap-4">
                    {packagePricings.map((pkg) => (
                      <button
                        key={pkg.key}
                        onClick={() => setActivePackage(pkg.key)}
                        className={`p-5 text-left transition-all ${
                          activePackage === pkg.key
                            ? 'border-2 border-primary bg-primary/5'
                            : 'border border-slate-200 hover:border-primary/50'
                        }`}
                      >
                        <p className="font-heading font-bold text-sm uppercase tracking-tight mb-1">{pkg.label}</p>
                        <p className="text-xs text-slate-400 mb-3">{pkg.desc}</p>
                        <p className="font-heading font-extrabold text-lg text-primary">{formatVND(pkg.price)}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{pkg.count} tính năng • {pkg.days} ngày</p>
                      </button>
                    ))}
                  </div>

                  {/* Feature Grid by Category */}
                  <div className="space-y-6">
                    {Object.entries(grouped).map(([category, catFeatures]) => (
                      <div key={category}>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2 mb-3">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {catFeatures.map((feature) => {
                            const isSelected = selectedFeatures.has(feature.id)
                            return (
                              <label
                                key={feature.id}
                                className={`flex items-center gap-3 p-3 cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-primary/5 border border-primary/20'
                                    : 'border border-slate-100 hover:border-slate-200'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleFeature(feature.id)}
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected ? 'border-primary bg-primary' : 'border-slate-300'
                                }`}>
                                  {isSelected && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium">{feature.name}</span>
                                  <span className="text-xs text-slate-400 ml-2">{feature.timeDev}h</span>
                                </div>
                                <span className="text-sm">{feature.priority}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
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

                  {/* Project Info */}
                  <div className="border border-slate-200 p-8 space-y-4">
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

                  {/* Selected Features */}
                  <div className="border border-slate-200 p-8 space-y-4">
                    <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-slate-400">Tính năng đã chọn ({selectedFeatures.size})</h3>
                    <div className="space-y-2">
                      {pricingConfig.features
                        .filter(f => selectedFeatures.has(f.id))
                        .map(f => (
                          <div key={f.id} className="flex justify-between items-center py-1 text-sm">
                            <span>{f.priority} {f.name}</span>
                            <span className="text-slate-400">{f.timeDev}h</span>
                          </div>
                        ))
                      }
                    </div>
                    <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Tổng time dev</span>
                        <span className="font-bold">{currentPricing.timeDevTotal}h</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Thời gian (× {pricingConfig.coefficient})</span>
                        <span className="font-bold">{currentPricing.timeClient.toFixed(1)}h → {currentPricing.days} ngày</span>
                      </div>
                      <div className="flex justify-between text-lg pt-2 border-t border-slate-100">
                        <span className="font-heading font-bold">Ước tính</span>
                        <span className="font-heading font-extrabold text-primary">{formatVND(currentPricing.price)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4">
                    <p className="text-[10px] leading-relaxed text-slate-500 uppercase tracking-tighter">
                      * Đây là báo giá sơ bộ. Giá cuối cùng sẽ được xác nhận sau khi đội ngũ trao đổi chi tiết với bạn.
                    </p>
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
                  disabled={!canGoNext()}
                  className="px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] bg-slate-900 text-white hover:bg-primary hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Tiếp Theo
                </button>
              )}
            </div>
          </div>

          {/* Sidebar — Live Pricing */}
          <aside className="lg:w-80">
            <Reveal delay={200}>
              <div className="sticky top-32 border border-slate-200 p-8 space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Ước Tính Chi Phí</p>
                  {pricingConfig.features.length > 0 && selectedFeatures.size > 0 ? (
                    <>
                      <p className="text-3xl font-heading font-extrabold tracking-tight text-primary">{formatVND(currentPricing.price)}</p>
                      <p className="text-xs text-slate-400 mt-1">{currentPricing.days} ngày • {currentPricing.count} tính năng</p>
                    </>
                  ) : (
                    <p className="text-xl font-heading font-extrabold tracking-tight">Chọn tính năng để xem giá</p>
                  )}
                </div>

                <div className="h-[1px] bg-slate-200" />

                {/* Quick Package Summary */}
                {pricingConfig.features.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">So Sánh Gói</p>
                    {packagePricings.map(pkg => (
                      <div key={pkg.key} className={`flex justify-between items-center py-1 text-xs ${activePackage === pkg.key ? 'text-primary font-bold' : 'text-slate-500'}`}>
                        <span>{pkg.label}</span>
                        <span>{formatVND(pkg.price)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="h-[1px] bg-slate-200" />

                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                    <span>Đã chọn</span>
                    <span className="text-primary">{selectedFeatures.size > 0 ? selectedFeatures.size : 1}</span>
                  </p>
                  <ul className="text-xs space-y-2 text-slate-500 max-h-48 overflow-y-auto">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[14px] mt-0.5">check</span>
                      {systemTypes[selectedType]?.title}
                    </li>
                    {pricingConfig.features
                      .filter(f => selectedFeatures.has(f.id))
                      .slice(0, 8)
                      .map(f => (
                        <li key={f.id} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[14px] mt-0.5">check</span>
                          {f.name}
                        </li>
                      ))
                    }
                    {selectedFeatures.size > 8 && (
                      <li className="text-primary font-bold">+{selectedFeatures.size - 8} tính năng khác</li>
                    )}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4">
                  <p className="text-[10px] leading-relaxed text-slate-500 uppercase tracking-tighter">
                    * Báo giá sơ bộ, giá cuối cùng sẽ được xác nhận sau khi trao đổi chi tiết.
                  </p>
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
