import { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'

/**
 * PricingConfig — Admin page to manage pricing parameters
 * - Coefficient (hệ số), daily rate (lương/ngày), hours/day
 * - Feature catalog: name, category, time_dev (hours), priority
 * - Export pricing-config.md for agent workflow
 */

interface Feature {
  id: string
  name: string
  category: string
  timeDev: number  // hours
  priority: '🟢' | '🟡' | '⚪'
  variants?: string
  note?: string
}

const CATEGORIES = [
  'Trang cơ bản',
  'Content & UI',
  'Biểu mẫu',
  'Thương mại',
  'Xác thực & Bảo mật',
  'Thông báo',
  'Dashboard & Quản trị',
  'Kỹ thuật',
  'Design Complexity',
  'Backend / API',
]

const DEFAULT_FEATURES: Feature[] = [
  // Trang cơ bản
  { id: 'homepage', name: 'Homepage', category: 'Trang cơ bản', timeDev: 3, priority: '🟢' },
  { id: 'about', name: 'About Page', category: 'Trang cơ bản', timeDev: 2, priority: '🟡' },
  { id: 'contact', name: 'Contact Page', category: 'Trang cơ bản', timeDev: 1.5, priority: '🟢' },
  { id: 'page404', name: '404 Page', category: 'Trang cơ bản', timeDev: 0.5, priority: '🟢' },
  { id: 'footer-header', name: 'Footer + Header', category: 'Trang cơ bản', timeDev: 2, priority: '🟢' },
  // Content & UI
  { id: 'services-list', name: 'Services/Products List', category: 'Content & UI', timeDev: 2, priority: '🟡' },
  { id: 'service-detail', name: 'Service/Product Detail', category: 'Content & UI', timeDev: 3, priority: '🟡' },
  { id: 'portfolio', name: 'Portfolio/Gallery', category: 'Content & UI', timeDev: 3, priority: '🟡' },
  { id: 'portfolio-detail', name: 'Portfolio Detail', category: 'Content & UI', timeDev: 4, priority: '⚪' },
  { id: 'blog', name: 'Blog', category: 'Content & UI', timeDev: 5, priority: '⚪' },
  { id: 'testimonials', name: 'Testimonials', category: 'Content & UI', timeDev: 2, priority: '🟡' },
  { id: 'faq', name: 'FAQ', category: 'Content & UI', timeDev: 1.5, priority: '⚪' },
  // Biểu mẫu
  { id: 'contact-form', name: 'Contact Form', category: 'Biểu mẫu', timeDev: 1.5, priority: '🟢' },
  { id: 'multi-step-form', name: 'Multi-step Form', category: 'Biểu mẫu', timeDev: 4, priority: '⚪' },
  { id: 'booking-form', name: 'Booking Form', category: 'Biểu mẫu', timeDev: 3, priority: '⚪' },
  { id: 'booking-system', name: 'Booking System', category: 'Biểu mẫu', timeDev: 8, priority: '⚪' },
  // Thương mại
  { id: 'shopping-cart', name: 'Shopping Cart', category: 'Thương mại', timeDev: 6, priority: '⚪' },
  { id: 'checkout-payment', name: 'Checkout + Payment', category: 'Thương mại', timeDev: 8, priority: '⚪' },
  { id: 'order-tracking', name: 'Order Tracking', category: 'Thương mại', timeDev: 4, priority: '⚪' },
  // Xác thực
  { id: 'login-register', name: 'Login/Register', category: 'Xác thực & Bảo mật', timeDev: 3, priority: '⚪' },
  { id: 'social-login', name: 'Social Login (Google)', category: 'Xác thực & Bảo mật', timeDev: 1.5, priority: '⚪' },
  // Thông báo
  { id: 'email-notification', name: 'Email Notification', category: 'Thông báo', timeDev: 2, priority: '🟡' },
  { id: 'fcm-push', name: 'FCM Push Notification', category: 'Thông báo', timeDev: 4, priority: '⚪' },
  // Dashboard
  { id: 'dashboard-admin', name: 'Dashboard Admin', category: 'Dashboard & Quản trị', timeDev: 6, priority: '⚪' },
  { id: 'dashboard-full', name: 'Dashboard Full (stats, charts)', category: 'Dashboard & Quản trị', timeDev: 10, priority: '⚪' },
  { id: 'site-config', name: 'Site Config Editor', category: 'Dashboard & Quản trị', timeDev: 4, priority: '⚪' },
  // Kỹ thuật
  { id: 'responsive', name: 'Responsive (mobile + tablet)', category: 'Kỹ thuật', timeDev: 1, priority: '🟢' },
  { id: 'seo-basic', name: 'SEO cơ bản (meta, sitemap)', category: 'Kỹ thuật', timeDev: 1, priority: '🟢' },
  { id: 'seo-advanced', name: 'SEO nâng cao (schema, OG)', category: 'Kỹ thuật', timeDev: 2, priority: '⚪' },
  { id: 'pwa', name: 'PWA (offline + install)', category: 'Kỹ thuật', timeDev: 3, priority: '⚪' },
  { id: 'multi-language', name: 'Multi-language (i18n)', category: 'Kỹ thuật', timeDev: 4, priority: '⚪' },
  { id: 'performance-opt', name: 'Performance optimization', category: 'Kỹ thuật', timeDev: 1, priority: '🟡' },
  // Design Complexity
  { id: 'gsap-animations', name: 'GSAP scroll animations', category: 'Design Complexity', timeDev: 4, priority: '⚪' },
  { id: 'smooth-scroll', name: 'Smooth scroll (Lenis)', category: 'Design Complexity', timeDev: 1.5, priority: '⚪' },
  { id: 'page-transitions', name: 'Page transitions', category: 'Design Complexity', timeDev: 3, priority: '⚪' },
  { id: 'micro-interactions', name: 'Micro-interactions', category: 'Design Complexity', timeDev: 3, priority: '⚪' },
  { id: '3d-elements', name: '3D elements (Three.js)', category: 'Design Complexity', timeDev: 8, priority: '⚪' },
  { id: 'parallax', name: 'Parallax effects', category: 'Design Complexity', timeDev: 2, priority: '⚪' },
  { id: 'dark-mode', name: 'Dark mode toggle', category: 'Design Complexity', timeDev: 2, priority: '⚪' },
  // Backend
  { id: 'worker-api', name: 'Worker API setup (Hono + CF)', category: 'Backend / API', timeDev: 2, priority: '⚪', note: 'Chỉ khi Stack Full' },
  { id: 'firestore-schema', name: 'Firestore schema + rules', category: 'Backend / API', timeDev: 2, priority: '⚪', note: 'Chỉ khi Stack Full' },
  { id: 'seed-script', name: 'Seed script', category: 'Backend / API', timeDev: 1, priority: '⚪', note: 'Chỉ khi Stack Full' },
  { id: 'image-upload', name: 'Image upload (WebP convert)', category: 'Backend / API', timeDev: 2, priority: '⚪' },
]

export default function PricingConfig() {
  const api = useApi()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Pricing parameters
  const [coefficient, setCoefficient] = useState(1.4)
  const [dailyRate, setDailyRate] = useState(500000)
  const [hoursPerDay, setHoursPerDay] = useState(8)

  // Feature catalog
  const [features, setFeatures] = useState<Feature[]>(DEFAULT_FEATURES)

  // Edit feature modal
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadConfig()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loadConfig = async () => {
    try {
      const data: any = await api.get('/api/admin/pricing-config', true)
      if (data) {
        if (data.coefficient) setCoefficient(data.coefficient)
        if (data.dailyRate) setDailyRate(data.dailyRate)
        if (data.hoursPerDay) setHoursPerDay(data.hoursPerDay)
        if (data.features?.length > 0) setFeatures(data.features)
      }
    } catch {
      // Use defaults
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      await api.patch('/api/admin/pricing-config', {
        coefficient,
        dailyRate,
        hoursPerDay,
        features,
      }, true)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Lưu thất bại')
    } finally {
      setSaving(false)
    }
  }

  const handleExportMd = () => {
    let md = `# Pricing Config — Antigravity\n\n`
    md += `> Cập nhật: ${new Date().toISOString().split('T')[0]}\n\n`
    md += `## Thông số cơ bản\n\n`
    md += `| Thông số | Giá trị |\n|----------|--------|\n`
    md += `| Hệ số (coefficient) | ${coefficient} |\n`
    md += `| Lương/ngày | ${dailyRate.toLocaleString('vi-VN')}đ |\n`
    md += `| Giờ/ngày | ${hoursPerDay}h |\n\n`
    md += `## Công thức\n\n`
    md += `\`\`\`\nTIME_DEV = Σ features.time_dev\nTIME_KHÁCH = TIME_DEV × ${coefficient}\nNGÀY = ceil(TIME_KHÁCH / ${hoursPerDay})\nGIÁ = NGÀY × ${dailyRate.toLocaleString('vi-VN')}đ\n\`\`\`\n\n`

    // Group features by category
    const grouped: Record<string, Feature[]> = {}
    for (const f of features) {
      if (!grouped[f.category]) grouped[f.category] = []
      grouped[f.category]!.push(f)
    }

    md += `## Feature Catalog\n\n`
    for (const [cat, feats] of Object.entries(grouped)) {
      md += `### ${cat}\n\n`
      md += `| Feature | Time Dev | Priority | Ghi chú |\n|---------|----------|----------|---------|\n`
      for (const f of feats) {
        md += `| ${f.name} | ${f.timeDev}h | ${f.priority} | ${f.note || f.variants || '—'} |\n`
      }
      md += `\n`
    }

    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pricing-config-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const deleteFeature = (id: string) => {
    setFeatures(prev => prev.filter(f => f.id !== id))
  }

  const addFeature = (feature: Feature) => {
    setFeatures(prev => [...prev, feature])
    setShowAddModal(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  // Group features by category for display
  const grouped: Record<string, Feature[]> = {}
  for (const f of features) {
    if (!grouped[f.category]) grouped[f.category] = []
    grouped[f.category]!.push(f)
  }

  // Stats
  const totalFeatures = features.length
  const totalHours = features.reduce((sum, f) => sum + f.timeDev, 0)

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-heading font-bold text-slate-900 uppercase tracking-tighter">Pricing Config</h2>
          <p className="text-sm text-slate-400 mt-1">Quản lý thông số báo giá — hệ số, lương/ngày, feature catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportMd}
            className="px-6 py-3 border border-slate-200 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Xuất MD
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang lưu...
              </>
            ) : 'Lưu thay đổi'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
      )}
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Đã lưu thành công!
        </div>
      )}

      {/* Parameters */}
      <section className="border border-[#f1f1f4] p-8 space-y-6">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">calculate</span>
          Thông số cơ bản
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Hệ số (coefficient)</label>
            <input
              className="w-full border border-[#f1f1f4] px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={coefficient}
              onChange={(e) => setCoefficient(parseFloat(e.target.value) || 1)}
            />
            <p className="text-xs text-slate-400 mt-1">Buffer cho testing, fix bugs, deploy, trao đổi</p>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Lương / ngày (VNĐ)</label>
            <input
              className="w-full border border-[#f1f1f4] px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              type="number"
              step="50000"
              min="0"
              value={dailyRate}
              onChange={(e) => setDailyRate(parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-slate-400 mt-1">{dailyRate.toLocaleString('vi-VN')}đ / ngày</p>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Giờ / ngày</label>
            <input
              className="w-full border border-[#f1f1f4] px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
              type="number"
              step="1"
              min="1"
              max="24"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseInt(e.target.value) || 8)}
            />
          </div>
        </div>

        {/* Formula preview */}
        <div className="bg-slate-50 border border-slate-100 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Công thức</p>
          <p className="text-sm text-slate-600 font-mono">
            TIME_KHÁCH = TIME_DEV × {coefficient} → NGÀY = ceil(TIME_KHÁCH / {hoursPerDay}) → GIÁ = NGÀY × {dailyRate.toLocaleString('vi-VN')}đ
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-[#f1f1f4] p-6 text-center">
          <p className="text-3xl font-heading font-extrabold text-primary">{totalFeatures}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Features</p>
        </div>
        <div className="border border-[#f1f1f4] p-6 text-center">
          <p className="text-3xl font-heading font-extrabold text-primary">{totalHours}h</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Tổng Time Dev</p>
        </div>
        <div className="border border-[#f1f1f4] p-6 text-center">
          <p className="text-3xl font-heading font-extrabold text-primary">{CATEGORIES.length}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Categories</p>
        </div>
      </div>

      {/* Feature Catalog */}
      <section className="border border-[#f1f1f4] p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">list_alt</span>
            Feature Catalog
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 border border-primary text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Thêm Feature
          </button>
        </div>

        {Object.entries(grouped).map(([category, catFeatures]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-[#f1f1f4] pb-2">{category}</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="py-2 pr-4">Feature</th>
                  <th className="py-2 pr-4 w-20">Time (h)</th>
                  <th className="py-2 pr-4 w-20">Priority</th>
                  <th className="py-2 pr-4">Ghi chú</th>
                  <th className="py-2 w-16"></th>
                </tr>
              </thead>
              <tbody>
                {catFeatures.map((feature) => (
                  <tr key={feature.id} className="border-b border-[#f1f1f4] last:border-0 group hover:bg-slate-50 transition-colors">
                    <td className="py-2 pr-4 font-medium">{feature.name}</td>
                    <td className="py-2 pr-4">
                      <input
                        className="w-16 border border-transparent hover:border-slate-200 focus:border-primary px-2 py-1 text-sm outline-none transition-all bg-transparent"
                        type="number"
                        step="0.5"
                        min="0"
                        value={feature.timeDev}
                        onChange={(e) => updateFeature(feature.id, { timeDev: parseFloat(e.target.value) || 0 })}
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <select
                        className="border border-transparent hover:border-slate-200 focus:border-primary px-2 py-1 text-sm outline-none transition-all bg-transparent cursor-pointer"
                        value={feature.priority}
                        onChange={(e) => updateFeature(feature.id, { priority: e.target.value as Feature['priority'] })}
                      >
                        <option value="🟢">🟢 Cần</option>
                        <option value="🟡">🟡 Nên</option>
                        <option value="⚪">⚪ Tùy</option>
                      </select>
                    </td>
                    <td className="py-2 pr-4 text-slate-400 text-xs">{feature.note || '—'}</td>
                    <td className="py-2">
                      <button
                        onClick={() => deleteFeature(feature.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {/* Add Feature Modal */}
      {showAddModal && (
        <AddFeatureModal
          categories={CATEGORIES}
          onAdd={addFeature}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Edit Feature Modal */}
      {editingFeature && (
        <EditFeatureModal
          feature={editingFeature}
          categories={CATEGORIES}
          onSave={(updated) => {
            updateFeature(updated.id, updated)
            setEditingFeature(null)
          }}
          onClose={() => setEditingFeature(null)}
        />
      )}
    </div>
  )
}

function AddFeatureModal({ categories, onAdd, onClose }: {
  categories: string[]
  onAdd: (f: Feature) => void
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState(categories[0] || '')
  const [timeDev, setTimeDev] = useState(1)
  const [priority, setPriority] = useState<Feature['priority']>('⚪')
  const [note, setNote] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return
    const noteVal = note.trim()
    onAdd({
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: name.trim(),
      category,
      timeDev,
      priority,
      ...(noteVal ? { note: noteVal } : {}),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white border border-[#f1f1f4] p-8 w-full max-w-md space-y-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-heading text-lg font-bold">Thêm Feature</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Tên Feature *</label>
            <input className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Newsletter Signup" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Category</label>
              <select className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Time Dev (h)</label>
              <input className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" type="number" step="0.5" min="0" value={timeDev} onChange={(e) => setTimeDev(parseFloat(e.target.value) || 0)} />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Priority</label>
            <select className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={priority} onChange={(e) => setPriority(e.target.value as Feature['priority'])}>
              <option value="🟢">🟢 Chắc chắn cần</option>
              <option value="🟡">🟡 Nên có</option>
              <option value="⚪">⚪ Tùy chọn</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Ghi chú</label>
            <input className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={note} onChange={(e) => setNote(e.target.value)} placeholder="VD: Chỉ khi Stack Full" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-slate-200 text-xs font-bold uppercase tracking-widest hover:bg-slate-50">Hủy</button>
          <button onClick={handleSubmit} disabled={!name.trim()} className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50">Thêm</button>
        </div>
      </div>
    </div>
  )
}

function EditFeatureModal({ feature, categories, onSave, onClose }: {
  feature: Feature
  categories: string[]
  onSave: (f: Feature) => void
  onClose: () => void
}) {
  const [name, setName] = useState(feature.name)
  const [category, setCategory] = useState(feature.category)
  const [timeDev, setTimeDev] = useState(feature.timeDev)
  const [priority, setPriority] = useState(feature.priority)
  const [note, setNote] = useState(feature.note || '')

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white border border-[#f1f1f4] p-8 w-full max-w-md space-y-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-heading text-lg font-bold">Sửa Feature</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Tên Feature</label>
            <input className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Category</label>
              <select className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Time Dev (h)</label>
              <input className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" type="number" step="0.5" value={timeDev} onChange={(e) => setTimeDev(parseFloat(e.target.value) || 0)} />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Priority</label>
            <select className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={priority} onChange={(e) => setPriority(e.target.value as Feature['priority'])}>
              <option value="🟢">🟢 Chắc chắn cần</option>
              <option value="🟡">🟡 Nên có</option>
              <option value="⚪">⚪ Tùy chọn</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">Ghi chú</label>
            <input className="w-full border border-[#f1f1f4] px-4 py-3 text-sm outline-none focus:border-primary" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-slate-200 text-xs font-bold uppercase tracking-widest hover:bg-slate-50">Hủy</button>
          <button onClick={() => onSave({ ...feature, name, category, timeDev, priority, note: note || undefined })} className="px-6 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90">Lưu</button>
        </div>
      </div>
    </div>
  )
}
