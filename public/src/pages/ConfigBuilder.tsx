import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useApi } from '../hooks/useApi'

/**
 * ConfigBuilder — Data-driven 5-step project estimator
 * ALL data fetched from /api/public/estimator-config (Firestore)
 *
 * Step 1: Choose website type (7 types)
 * Step 2: Choose design style (24 styles, 4 groups)
 * Step 3: Select features (53+ features, 9 categories, priority matrix)
 * Step 4: Contact info
 * Step 5: Summary + Submit
 */

// ─── Types ────────────────────────────────────────────

interface WebType {
  key: string; name: string; icon: string; description: string; color: string
}
interface DesignStyle {
  id: string; name: string; desc: string; icon: string; group: string; order: number
}
interface StyleGroup {
  key: string; label: string; order: number
}
interface Feature {
  id: string; name: string; cat: string; catLabel: string; catIcon: string
  coeff: number; note: string; priorities: Record<string, string>; order: number
}
interface Category {
  key: string; label: string; icon: string; order: number
}
interface PriceRef {
  type: string; price: string; time: string; note: string
}
interface EstimatorConfig {
  webTypes: WebType[]
  designStyles: DesignStyle[]
  styleGroups: StyleGroup[]
  features: Feature[]
  categories: Category[]
  pricing: { coefficient: number; dailyRate: number; deposit: number }
  priceRef: PriceRef[]
}

const STEPS = [
  { number: 1, label: 'Loại Website' },
  { number: 2, label: 'Phong Cách' },
  { number: 3, label: 'Tính Năng' },
  { number: 4, label: 'Thông Tin' },
  { number: 5, label: 'Tổng Kết' },
]

type PackageType = 'basic' | 'standard' | 'advanced'
const PACKAGES: { key: PackageType; label: string; desc: string; priorities: string[] }[] = [
  { key: 'basic', label: 'Cơ Bản', desc: 'Chỉ tính năng bắt buộc', priorities: ['g'] },
  { key: 'standard', label: 'Phổ Thông', desc: 'Bắt buộc + nên có', priorities: ['g', 'y'] },
  { key: 'advanced', label: 'Nâng Cao', desc: 'Tất cả tính năng', priorities: ['g', 'y', 'w'] },
]

function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ'
}

// ─── Main Component ────────────────────────────────────

export default function ConfigBuilder() {
  const api = useApi()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Config from API
  const [config, setConfig] = useState<EstimatorConfig>({
    webTypes: [], designStyles: [], styleGroups: [], features: [],
    categories: [], pricing: { coefficient: 1.5, dailyRate: 1000000, deposit: 0.4 }, priceRef: [],
  })

  // Step 1: Website type
  const [selectedTypeKey, setSelectedTypeKey] = useState('')

  // Step 2: Design styles (multi-select)
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set())
  const [styleNote, setStyleNote] = useState('')
  const [activeStyleGroup, setActiveStyleGroup] = useState('popular')

  // Step 3: Features
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set())
  const [activePackage, setActivePackage] = useState<PackageType>('standard')
  const [activeCat, setActiveCat] = useState('')

  // Step 4: Contact
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactProjectName, setContactProjectName] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  // ── Fetch config ──
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/public/estimator-config`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.webTypes?.length) {
          setConfig(data)
          setSelectedTypeKey(data.webTypes[0]?.key || '')
          if (data.categories?.length) setActiveCat(data.categories[0].key)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // ── Auto-select features when type or package changes ──
  useEffect(() => {
    if (!config.features.length || !selectedTypeKey) return
    const pkg = PACKAGES.find(p => p.key === activePackage)
    if (!pkg) return
    const newSelected = new Set<string>()
    for (const f of config.features) {
      const priority = f.priorities[selectedTypeKey]
      if (priority && priority !== '-' && pkg.priorities.includes(priority)) {
        newSelected.add(f.id)
      }
    }
    setSelectedFeatures(newSelected)
  }, [activePackage, selectedTypeKey, config.features])

  // ── Filtered features for current type ──
  const filteredFeatures = useMemo(() => {
    if (!selectedTypeKey) return config.features
    return config.features.filter(f => {
      const p = f.priorities[selectedTypeKey]
      return p && p !== '-'
    })
  }, [config.features, selectedTypeKey])

  // ── Pricing calculation ──
  const currentPricing = useMemo(() => {
    const { coefficient, dailyRate } = config.pricing
    const selected = config.features.filter(f => selectedFeatures.has(f.id))
    const totalHours = selected.reduce((sum, f) => sum + f.coeff, 0)
    const adjustedHours = totalHours * coefficient
    const days = Math.ceil(adjustedHours / 8)
    const price = days * dailyRate
    return { totalHours, adjustedHours, days, price, count: selected.length }
  }, [selectedFeatures, config])

  // ── Current price reference ──
  const currentPriceRef = useMemo(() => {
    const typeIdx = config.webTypes.findIndex(t => t.key === selectedTypeKey)
    return config.priceRef[typeIdx] || null
  }, [config, selectedTypeKey])

  // ── Feature count by category ──
  const catCounts = useMemo(() => {
    const counts: Record<string, { total: number; selected: number }> = {}
    for (const f of filteredFeatures) {
      if (!counts[f.cat]) counts[f.cat] = { total: 0, selected: 0 }
      counts[f.cat]!.total++
      if (selectedFeatures.has(f.id)) counts[f.cat]!.selected++
    }
    return counts
  }, [filteredFeatures, selectedFeatures])

  // ── Handlers ──
  const toggleFeature = (id: string) => {
    const f = config.features.find(feat => feat.id === id)
    if (!f) return
    // Don't allow deselecting required features
    const priority = f.priorities[selectedTypeKey]
    if (priority === 'g') return
    const next = new Set(selectedFeatures)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedFeatures(next)
  }

  const toggleStyle = (id: string) => {
    const next = new Set(selectedStyles)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedStyles(next)
  }

  const handleSubmit = async () => {
    if (!contactName || !contactEmail) {
      setError('Vui lòng nhập tên và email')
      return
    }
    setSubmitting(true); setError('')
    try {
      const selectedList = config.features.filter(f => selectedFeatures.has(f.id))
      await api.post('/api/public/submit-project', {
        webTypeKey: selectedTypeKey,
        designStyles: Array.from(selectedStyles),
        designNote: styleNote,
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        projectName: contactProjectName,
        description: contactMessage,
        features: selectedList.map(f => ({ id: f.id, name: f.name, coeff: f.coeff, cat: f.cat, catLabel: f.catLabel })),
        estimatedHours: currentPricing.totalHours,
        estimatedDays: currentPricing.days,
        estimatedPrice: currentPricing.price,
        package: activePackage,
        notes: '',
      })
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Gửi thất bại, vui lòng thử lại')
    } finally {
      setSubmitting(false)
    }
  }

  const canGoNext = () => {
    if (step === 1 && !selectedTypeKey) return false
    if (step === 3 && selectedFeatures.size === 0) return false
    if (step === 4 && (!contactName || !contactEmail)) return false
    return true
  }

  // ── Loading state ──
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-48">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    )
  }

  // ── Thank You screen ──
  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
          {/* Decorative blurs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: 'rgba(var(--primary-rgb), 0.08)' }} />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: 'rgba(var(--accent-rgb, 99, 102, 241), 0.06)' }} />

          <div className="max-w-2xl w-full text-center space-y-8">
            {/* Success icon */}
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-2xl rounded-full transform scale-150" style={{ background: 'rgba(var(--primary-rgb), 0.2)' }} />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center shadow-2xl rotate-3" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark, #3730a3))' }}>
                <span className="material-symbols-outlined text-white text-6xl md:text-7xl" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4" style={{ borderColor: 'var(--surface)' }}>
                <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Yêu cầu đã được gửi thành công!
              </h1>
              <p className="text-lg max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Cảm ơn bạn đã tin tưởng Jules Studio. Đội ngũ của chúng tôi sẽ xem xét thông tin và liên hệ với bạn trong vòng 24 giờ tới.
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
              <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center space-y-2" style={{ borderColor: 'var(--border-light)' }}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Loại Website</span>
                <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {config.webTypes.find(t => t.key === selectedTypeKey)?.name || ''}
                </span>
              </div>
              <div className="p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center space-y-2" style={{ background: 'var(--primary)', color: 'white' }}>
                <span className="text-xs font-semibold uppercase tracking-widest opacity-70">Tổng Ước Tính</span>
                <span className="text-2xl font-bold">{formatVND(currentPricing.price)}</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white/60 border p-8 rounded-3xl shadow-inner mt-8 text-left space-y-6" style={{ borderColor: 'var(--border-light)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(var(--primary-rgb), 0.08)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>mail</span>
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>Kiểm tra email của bạn</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Chúng tôi đã gửi bản tóm tắt ước tính chi tiết và các bước tiếp theo vào email.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(var(--primary-rgb), 0.08)' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>event_available</span>
                </div>
                <div>
                  <h4 className="font-bold" style={{ color: 'var(--text-primary)' }}>Lịch hẹn tư vấn</h4>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Chuyên viên của Jules sẽ gọi điện để xác nhận yêu cầu và tư vấn chi tiết.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/" className="w-full sm:w-auto px-8 py-4 font-bold rounded-xl transition-all active:scale-95 text-center text-white" style={{ background: 'var(--text-primary)' }}>
                Về Trang Chủ
              </Link>
              <Link to="/du-an" className="w-full sm:w-auto px-8 py-4 bg-white border font-bold rounded-xl transition-all active:scale-95 text-center" style={{ color: 'var(--primary)', borderColor: 'rgba(var(--primary-rgb), 0.15)' }}>
                Xem Dự Án
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── Main wizard ──
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface)', paddingTop: '80px' }}>
        {/* Header */}
        <header className="pt-16 pb-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Ước tính chi phí dự án
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {step === 1 && 'Chọn loại website phù hợp với nhu cầu'}
            {step === 2 && 'Chọn phong cách thiết kế yêu thích'}
            {step === 3 && 'Chọn tính năng cho dự án'}
            {step === 4 && 'Để lại thông tin để chúng tôi tư vấn chi tiết'}
            {step === 5 && 'Xác nhận thông tin và gửi yêu cầu'}
          </p>
        </header>

        {/* Progress indicator */}
        <div className="mb-10 max-w-3xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between relative">
            {/* Background track line */}
            <div className="absolute left-[20px] right-[20px] top-[20px] h-[2px]" style={{ background: 'var(--border-light)' }} />
            {/* Active progress line */}
            <div className="absolute left-[20px] top-[20px] h-[2px] transition-all duration-500" style={{
              background: 'var(--primary)',
              width: step === 1 ? '0%' : `calc(${((step - 1) / (STEPS.length - 1)) * 100}% - 40px * ${((step - 1) / (STEPS.length - 1))})`,
            }} />
            {STEPS.map(s => (
              <div key={s.number} className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                  style={{
                    background: step >= s.number ? 'var(--primary)' : 'white',
                    color: step >= s.number ? 'white' : 'var(--text-tertiary)',
                    border: step >= s.number ? '2px solid var(--primary)' : '2px solid var(--border-light)',
                    boxShadow: step === s.number ? '0 4px 14px rgba(var(--primary-rgb), 0.3)' : 'none',
                  }}
                >
                  {step > s.number ? (
                    <span className="material-symbols-outlined text-sm">check</span>
                  ) : s.number}
                </div>
                <span className="text-xs font-medium hidden sm:block" style={{
                  color: step >= s.number ? 'var(--primary)' : 'var(--text-tertiary)',
                  fontWeight: step === s.number ? 700 : 500,
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Step content (65%) */}
            <div className="lg:w-[65%]">
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex items-center justify-between border-t pt-8 mt-10" style={{ borderColor: 'var(--border-light)' }}>
                <button
                  onClick={() => step > 1 && setStep(step - 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border-2"
                  style={{
                    color: step === 1 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    borderColor: step === 1 ? 'var(--border-light)' : 'var(--text-primary)',
                    background: 'white',
                    cursor: step === 1 ? 'not-allowed' : 'pointer',
                    opacity: step === 1 ? 0.4 : 1,
                  }}
                  disabled={step === 1}
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                  Quay Lại
                </button>
                {step < 5 ? (
                  <button
                    onClick={() => canGoNext() && setStep(step + 1)}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg"
                    style={{
                      background: canGoNext() ? 'var(--primary)' : 'var(--text-tertiary)',
                      cursor: canGoNext() ? 'pointer' : 'not-allowed',
                      boxShadow: canGoNext() ? '0 4px 14px rgba(var(--primary-rgb), 0.3)' : 'none',
                    }}
                    disabled={!canGoNext()}
                  >
                    Tiếp Tục
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !canGoNext()}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg"
                    style={{ background: 'var(--primary)', boxShadow: '0 4px 14px rgba(var(--primary-rgb), 0.3)' }}
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Gửi Yêu Cầu
                        <span className="material-symbols-outlined text-xl">send</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {error}
                </p>
              )}
            </div>

            {/* Right: Sidebar (35%) */}
            <div className="lg:w-[35%]">
              {renderSidebar()}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )

  // ══════════════════════════════════════════════════════════════
  // RENDER FUNCTIONS
  // ══════════════════════════════════════════════════════════════

  function renderStepContent() {
    switch (step) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      default: return null
    }
  }

  // ── Step 1: Website Type ──
  function renderStep1() {
    return (
      <Reveal>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>web</span>
          Chọn loại website
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.webTypes.map(t => {
            const isActive = selectedTypeKey === t.key
            return (
              <label key={t.key} className="group cursor-pointer">
                <input type="radio" name="website_type" className="hidden peer" checked={isActive} onChange={() => setSelectedTypeKey(t.key)} />
                <div className="h-full p-6 rounded-xl transition-all border-2 relative" style={{
                  borderColor: isActive ? 'var(--primary)' : 'var(--border-light)',
                  background: isActive ? 'rgba(var(--primary-rgb), 0.06)' : 'white',
                  boxShadow: isActive ? '0 4px 20px rgba(var(--primary-rgb), 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}>
                  {isActive && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--primary)' }}>
                      <span className="material-symbols-outlined text-white text-sm">check</span>
                    </div>
                  )}
                  <span className="material-symbols-outlined mb-4 block text-3xl transition-colors" style={{
                    color: isActive ? 'var(--primary)' : 'var(--text-tertiary)',
                  }}>{t.icon}</span>
                  <h3 className="font-bold text-lg mb-2" style={{ color: isActive ? 'var(--primary)' : 'var(--text-primary)' }}>{t.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.description}</p>
                </div>
              </label>
            )
          })}
        </div>
      </Reveal>
    )
  }

  // ── Step 2: Design Style ──
  function renderStep2() {
    const groupedStyles = config.styleGroups
      .sort((a, b) => a.order - b.order)
      .map(g => ({
        ...g,
        styles: config.designStyles.filter(s => s.group === g.key).sort((a, b) => a.order - b.order),
      }))

    const currentGroup = groupedStyles.find(g => g.key === activeStyleGroup) || groupedStyles[0]

    return (
      <Reveal>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>palette</span>
          Chọn phong cách thiết kế
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          Chọn 1-2 phong cách yêu thích. Bạn có thể ghi chú thêm ở cuối.
        </p>

        {/* Style group tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {config.styleGroups.sort((a, b) => a.order - b.order).map(g => (
            <button
              key={g.key}
              onClick={() => setActiveStyleGroup(g.key)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: activeStyleGroup === g.key ? 'var(--primary)' : 'white',
                color: activeStyleGroup === g.key ? 'white' : 'var(--text-secondary)',
                border: activeStyleGroup === g.key ? 'none' : '1px solid var(--border-light)',
              }}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Style cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {currentGroup?.styles.map(s => (
            <div
              key={s.id}
              onClick={() => toggleStyle(s.id)}
              className="p-5 rounded-xl cursor-pointer transition-all border-2"
              style={{
                borderColor: selectedStyles.has(s.id) ? 'var(--primary)' : 'var(--border-light)',
                background: selectedStyles.has(s.id) ? 'rgba(var(--primary-rgb), 0.04)' : 'white',
                boxShadow: selectedStyles.has(s.id) ? '0 0 0 4px rgba(var(--primary-rgb), 0.08)' : 'none',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="material-symbols-outlined text-2xl" style={{
                  color: selectedStyles.has(s.id) ? 'var(--primary)' : 'var(--text-tertiary)',
                }}>{s.icon}</span>
                {selectedStyles.has(s.id) && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--primary)' }}>
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{s.name}</h3>
              {s.desc && <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>}
            </div>
          ))}
        </div>

        {/* Custom note */}
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border-light)', background: 'white' }}>
          <label className="text-sm font-semibold mb-2 block" style={{ color: 'var(--text-primary)' }}>
            Ghi chú thêm về phong cách <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>(tùy chọn)</span>
          </label>
          <textarea
            value={styleNote}
            onChange={e => setStyleNote(e.target.value)}
            placeholder="Ví dụ: Tông màu pastel, phong cách luxury, tham khảo website abc.com..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none text-sm"
            style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
          />
        </div>
      </Reveal>
    )
  }

  // ── Step 3: Features ──
  function renderStep3() {
    const visibleCategories = config.categories.filter(c => {
      const count = filteredFeatures.filter(f => f.cat === c.key).length
      return count > 0
    })

    const currentFeatures = filteredFeatures.filter(f => f.cat === activeCat)

    return (
      <Reveal>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>checklist</span>
          Chọn tính năng
        </h2>

        {/* Package selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {PACKAGES.map(pkg => (
            <button
              key={pkg.key}
              onClick={() => setActivePackage(pkg.key)}
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all"
              style={{
                background: activePackage === pkg.key ? 'var(--primary)' : 'white',
                color: activePackage === pkg.key ? 'white' : 'var(--text-secondary)',
                border: activePackage === pkg.key ? 'none' : '1px solid var(--border-light)',
                boxShadow: activePackage === pkg.key ? '0 4px 14px rgba(var(--primary-rgb), 0.2)' : 'none',
              }}
            >
              {pkg.label}
              <span className="block text-[10px] font-normal opacity-80">{pkg.desc}</span>
            </button>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
          {visibleCategories.map(c => {
            const counts = catCounts[c.key]
            return (
              <button
                key={c.key}
                onClick={() => setActiveCat(c.key)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: activeCat === c.key ? 'rgba(var(--primary-rgb), 0.08)' : 'transparent',
                  color: activeCat === c.key ? 'var(--primary)' : 'var(--text-secondary)',
                  border: activeCat === c.key ? '1px solid rgba(var(--primary-rgb), 0.2)' : '1px solid transparent',
                }}
              >
                <span className="material-symbols-outlined text-sm">{c.icon}</span>
                {c.label.replace(/^[^\s]+\s/, '')}
                {counts && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{
                    background: counts.selected > 0 ? 'var(--primary)' : 'var(--border-light)',
                    color: counts.selected > 0 ? 'white' : 'var(--text-tertiary)',
                  }}>
                    {counts.selected}/{counts.total}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentFeatures.map(f => {
            const priority = f.priorities[selectedTypeKey]
            const isSelected = selectedFeatures.has(f.id)
            const isRequired = priority === 'g'
            const priorityLabel = priority === 'g' ? '🟢 Bắt buộc' : priority === 'y' ? '🟡 Nên có' : '⚪ Tùy chọn'

            return (
              <div
                key={f.id}
                onClick={() => toggleFeature(f.id)}
                className="p-5 rounded-xl cursor-pointer transition-all border-2"
                style={{
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-light)',
                  background: isSelected ? 'rgba(var(--primary-rgb), 0.04)' : 'white',
                  boxShadow: isSelected ? '0 0 0 4px rgba(var(--primary-rgb), 0.06)' : 'none',
                  opacity: isRequired ? 1 : undefined,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg" style={{
                      color: isSelected ? 'var(--primary)' : 'var(--text-tertiary)',
                    }}>{f.catIcon}</span>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{f.name}</h3>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--primary)' }}>
                      <span className="material-symbols-outlined text-white text-xs">check</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span>{priorityLabel}</span>
                  <span>•</span>
                  <span>{f.coeff}h dev</span>
                </div>
                {f.note && <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{f.note}</p>}
              </div>
            )
          })}
        </div>

        {currentFeatures.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--text-tertiary)' }}>
            <span className="material-symbols-outlined text-4xl mb-2 block">inventory_2</span>
            Không có tính năng nào trong danh mục này cho loại website đã chọn
          </div>
        )}
      </Reveal>
    )
  }

  // ── Step 4: Contact ──
  function renderStep4() {
    return (
      <Reveal>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>person</span>
          Thông tin liên hệ
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          Để lại thông tin để chúng tôi có thể tư vấn chi tiết hơn về dự án.
        </p>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Họ và tên *</label>
              <input type="text" value={contactName} onChange={e => setContactName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
                placeholder="Nguyễn Văn A" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Email *</label>
              <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
                placeholder="example@gmail.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Số điện thoại</label>
              <input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
                placeholder="0901 234 567" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Tên dự án <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>(tùy chọn)</span>
              </label>
              <input type="text" value={contactProjectName} onChange={e => setContactProjectName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
                placeholder="Tên website / dự án" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Mô tả thêm về dự án</label>
            <textarea
              value={contactMessage} onChange={e => setContactMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none"
              style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
              placeholder="Chia sẻ thêm về yêu cầu đặc biệt hoặc tầm nhìn của bạn..."
              rows={4}
            />
          </div>
        </div>
      </Reveal>
    )
  }

  // ── Step 5: Review ──
  function renderStep5() {
    const selectedType = config.webTypes.find(t => t.key === selectedTypeKey)
    const selectedStyleList = config.designStyles.filter(s => selectedStyles.has(s.id))
    const selectedFeatureList = config.features.filter(f => selectedFeatures.has(f.id))

    // Group features by category for display
    const featuresByCategory: Record<string, Feature[]> = {}
    for (const f of selectedFeatureList) {
      if (!featuresByCategory[f.catLabel]) featuresByCategory[f.catLabel] = []
      featuresByCategory[f.catLabel]!.push(f)
    }

    return (
      <Reveal>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>description</span>
          Tổng kết dự án
        </h2>

        <div className="space-y-6">
          {/* Website Type */}
          <section className="bg-white p-6 rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Loại Website</h3>
              <button onClick={() => setStep(1)} className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>Sửa</button>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'rgba(var(--primary-rgb), 0.04)', border: '1px solid rgba(var(--primary-rgb), 0.1)' }}>
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center" style={{ color: 'var(--primary)' }}>
                <span className="material-symbols-outlined">{selectedType?.icon}</span>
              </div>
              <div>
                <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{selectedType?.name}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedType?.description}</p>
              </div>
            </div>
          </section>

          {/* Design Style */}
          <section className="bg-white p-6 rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Phong Cách Thiết Kế</h3>
              <button onClick={() => setStep(2)} className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>Sửa</button>
            </div>
            {selectedStyleList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedStyleList.map(s => (
                  <span key={s.id} className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5" style={{
                    background: 'rgba(var(--primary-rgb), 0.06)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(var(--primary-rgb), 0.15)',
                  }}>
                    <span className="material-symbols-outlined text-sm">{s.icon}</span>
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm italic" style={{ color: 'var(--text-tertiary)' }}>Chưa chọn phong cách</p>
            )}
            {styleNote && (
              <p className="mt-3 text-sm p-3 rounded-lg" style={{ background: 'var(--surface)', color: 'var(--text-secondary)' }}>
                <strong>Ghi chú:</strong> {styleNote}
              </p>
            )}
          </section>

          {/* Features */}
          <section className="bg-white p-6 rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                Tính Năng ({selectedFeatureList.length})
              </h3>
              <button onClick={() => setStep(3)} className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>Sửa</button>
            </div>
            <div className="space-y-4">
              {Object.entries(featuresByCategory).map(([cat, feats]) => (
                <div key={cat}>
                  <p className="text-xs font-bold mb-2" style={{ color: 'var(--text-secondary)' }}>{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {feats.map(f => (
                      <span key={f.id} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{
                        background: 'var(--surface)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-light)',
                      }}>
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white p-6 rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Thông Tin Liên Hệ</h3>
              <button onClick={() => setStep(4)} className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>Sửa</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Họ tên</label>
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{contactName || '—'}</p>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Email</label>
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{contactEmail || '—'}</p>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Số điện thoại</label>
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{contactPhone || '—'}</p>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Tên dự án</label>
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{contactProjectName || '—'}</p>
              </div>
            </div>
            {contactMessage && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Mô tả dự án</label>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{contactMessage}</p>
              </div>
            )}
          </section>
        </div>
      </Reveal>
    )
  }

  // ── Sidebar ──
  function renderSidebar() {
    return (
      <div className="sticky top-28 space-y-6">
        {/* Summary card */}
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>analytics</span>
            Tóm Tắt
          </h3>
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'var(--border-light)' }}>
            <div className="p-6 space-y-4">
              {/* Website type */}
              <div className="flex justify-between items-start">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loại website</span>
                <span className="font-bold text-sm text-right" style={{ color: 'var(--text-primary)' }}>
                  {config.webTypes.find(t => t.key === selectedTypeKey)?.name || '—'}
                </span>
              </div>

              {/* Design style */}
              {(step >= 2 && selectedStyles.size > 0) && (
                <>
                  <div className="h-px w-full" style={{ background: 'var(--border-light)' }} />
                  <div>
                    <span className="text-sm block mb-2" style={{ color: 'var(--text-secondary)' }}>Phong cách</span>
                    <div className="flex flex-wrap gap-1">
                      {config.designStyles.filter(s => selectedStyles.has(s.id)).map(s => (
                        <span key={s.id} className="text-xs px-2 py-1 rounded-md font-medium" style={{
                          background: 'rgba(var(--primary-rgb), 0.06)',
                          color: 'var(--primary)',
                        }}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Feature count */}
              {step >= 3 && (
                <>
                  <div className="h-px w-full" style={{ background: 'var(--border-light)' }} />
                  <div className="flex justify-between items-start">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tính năng</span>
                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{currentPricing.count} đã chọn</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Thời gian</span>
                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>~{currentPricing.days} ngày</span>
                  </div>
                </>
              )}

              <div className="h-px w-full" style={{ background: 'var(--border-light)' }} />

              {/* Price — reference for steps 1-2, calculated for steps 3+ */}
              <div className="pt-2">
                <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Tổng ước tính</p>
                {step >= 3 ? (
                  <p className="text-3xl font-extrabold" style={{ color: 'var(--primary)' }}>{formatVND(currentPricing.price)}</p>
                ) : currentPriceRef ? (
                  <p className="text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>{currentPriceRef.price}đ</p>
                ) : (
                  <p className="text-2xl font-extrabold" style={{ color: 'var(--text-tertiary)' }}>—</p>
                )}
                {step < 3 && currentPriceRef && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Thời gian: {currentPriceRef.time}</p>
                )}
              </div>
            </div>

            <div className="p-4 border-t" style={{ background: 'var(--surface)', borderColor: 'var(--border-light)' }}>
              <p className="text-xs italic flex items-start gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <span className="material-symbols-outlined text-sm shrink-0">info</span>
                {step >= 3 ? '* Giá tính theo tính năng đã chọn. Giá chính xác sẽ được xác nhận sau khi trao đổi.' : '* Giá tham khảo cho loại website đã chọn.'}
              </p>
            </div>
          </div>
        </div>

        {/* Help box */}
        <div className="p-6 rounded-xl border" style={{
          background: 'rgba(var(--primary-rgb), 0.04)',
          borderColor: 'rgba(var(--primary-rgb), 0.15)',
        }}>
          <h4 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Cần tư vấn thêm?</h4>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn lựa chọn giải pháp tối ưu.
          </p>
          <a href="tel:19001234" className="font-bold text-sm flex items-center gap-1" style={{ color: 'var(--primary)' }}>
            <span className="material-symbols-outlined text-sm">call</span>
            Liên hệ hotline: 1900 1234
          </a>
        </div>
      </div>
    )
  }
}
