import { useEffect, useState, useCallback } from 'react'
import { useApi } from '../hooks/useApi'

interface FabChannel {
  name: string; icon: string; url: string; color: string
}

interface Settings {
  // Hero
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  heroCtaLink: string
  // Contact
  email: string
  phone: string
  address: string
  // Social
  social: {
    dribbble: string; behance: string; linkedin: string
    zalo: string; messenger: string
  }
  // FAB
  fabChannels: FabChannel[]
  // System types (for ConfigBuilder)
  systemTypes: string[]
}

const DEFAULT: Settings = {
  heroTitle: '', heroSubtitle: '', heroCta: '', heroCtaLink: '',
  email: '', phone: '', address: '',
  social: { dribbble: '', behance: '', linkedin: '', zalo: '', messenger: '' },
  fabChannels: [],
  systemTypes: [],
}

/**
 * AdminSiteSettings — Manage site_settings/main document
 * Uses /api/admin/site-settings (GET | PATCH)
 */
export default function AdminSiteSettings() {
  const api = useApi()
  const [form, setForm] = useState<Settings>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState<'hero' | 'contact' | 'social' | 'fab'>('hero')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data: any = await api.get('/api/admin/site-settings', true)
      setForm({ ...DEFAULT, ...data })
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }, [api])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true); setError(''); setSuccess('')
    try {
      await api.patch('/api/admin/site-settings', form, true)
      setSuccess('Đã lưu cài đặt')
    } catch (e: any) { setError(e.message) }
    setSaving(false)
  }

  const updateSocial = (key: string, value: string) => {
    setForm(f => ({ ...f, social: { ...f.social, [key]: value } }))
  }

  const addFabChannel = () => {
    setForm(f => ({ ...f, fabChannels: [...f.fabChannels, { name: '', icon: '', url: '', color: '#000000' }] }))
  }

  const updateFabChannel = (idx: number, key: keyof FabChannel, value: string) => {
    setForm(f => ({
      ...f,
      fabChannels: f.fabChannels.map((ch, i) => i === idx ? { ...ch, [key]: value } : ch)
    }))
  }

  const removeFabChannel = (idx: number) => {
    setForm(f => ({ ...f, fabChannels: f.fabChannels.filter((_, i) => i !== idx) }))
  }

  const TABS = [
    { id: 'hero' as const, label: 'Hero', icon: 'view_headline' },
    { id: 'contact' as const, label: 'Liên hệ', icon: 'mail' },
    { id: 'social' as const, label: 'Mạng xã hội', icon: 'share' },
    { id: 'fab' as const, label: 'FAB Channels', icon: 'chat_bubble' },
  ]

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-2xl font-bold">Cài Đặt Website</h2>
          <p className="text-sm text-slate-400 mt-1">Quản lý nội dung hiển thị trên trang công khai</p>
        </div>
        <button onClick={save} disabled={saving} className="bg-primary text-white px-5 py-2.5 text-sm font-bold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-colors">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span className="material-symbols-outlined text-[18px]">save</span>}
          Lưu thay đổi
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-3 text-sm mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">error</span>{error}</div>}
      {success && <div className="bg-green-50 text-green-600 px-4 py-3 text-sm mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span>{success}</div>}

      {/* Tabs */}
      <div className="flex gap-0 mb-8 border-b border-[#f1f1f4]">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === 'hero' && (
        <div className="max-w-2xl space-y-5">
          <Field label="Tiêu đề Hero" value={form.heroTitle} onChange={v => setForm(f => ({ ...f, heroTitle: v }))} placeholder="CHÚNG TÔI KIẾN TẠO TRẢI NGHIỆM SỐ" />
          <Field label="Mô tả Hero" value={form.heroSubtitle} onChange={v => setForm(f => ({ ...f, heroSubtitle: v }))} placeholder="Xây dựng sự xuất sắc..." textarea />
          <div className="grid grid-cols-2 gap-4">
            <Field label="CTA Text" value={form.heroCta} onChange={v => setForm(f => ({ ...f, heroCta: v }))} placeholder="KHÁM PHÁ DỰ ÁN" />
            <Field label="CTA Link" value={form.heroCtaLink} onChange={v => setForm(f => ({ ...f, heroCtaLink: v }))} placeholder="/du-an" />
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="max-w-2xl space-y-5">
          <Field label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="hello@jules.studio" />
          <Field label="Số điện thoại" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="+84 (0) 900 123 456" />
          <Field label="Địa chỉ" value={form.address} onChange={v => setForm(f => ({ ...f, address: v }))} placeholder="TP. Hồ Chí Minh, Việt Nam" />
        </div>
      )}

      {/* Social Tab */}
      {activeTab === 'social' && (
        <div className="max-w-2xl space-y-5">
          <Field label="Dribbble URL" value={form.social.dribbble} onChange={v => updateSocial('dribbble', v)} placeholder="https://dribbble.com/..." />
          <Field label="Behance URL" value={form.social.behance} onChange={v => updateSocial('behance', v)} placeholder="https://behance.net/..." />
          <Field label="LinkedIn URL" value={form.social.linkedin} onChange={v => updateSocial('linkedin', v)} placeholder="https://linkedin.com/..." />
          <Field label="Zalo URL" value={form.social.zalo} onChange={v => updateSocial('zalo', v)} placeholder="https://zalo.me/..." />
          <Field label="Messenger URL" value={form.social.messenger} onChange={v => updateSocial('messenger', v)} placeholder="https://m.me/..." />
        </div>
      )}

      {/* FAB Tab */}
      {activeTab === 'fab' && (
        <div className="max-w-2xl">
          <p className="text-sm text-slate-400 mb-4">Cấu hình các kênh liên hệ hiển thị trên nút FAB (Floating Action Button) của trang công khai</p>
          <div className="space-y-4">
            {form.fabChannels.map((ch, idx) => (
              <div key={idx} className="border border-[#f1f1f4] p-4 relative">
                <button onClick={() => removeFabChannel(idx)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Tên" value={ch.name} onChange={v => updateFabChannel(idx, 'name', v)} placeholder="Zalo" small />
                  <Field label="Icon" value={ch.icon} onChange={v => updateFabChannel(idx, 'icon', v)} placeholder="chat" small />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-3">
                    <Field label="URL" value={ch.url} onChange={v => updateFabChannel(idx, 'url', v)} placeholder="https://zalo.me/..." small />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">Màu</label>
                    <input type="color" value={ch.color} onChange={e => updateFabChannel(idx, 'color', e.target.value)} className="w-full h-[38px] border border-[#f1f1f4] cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addFabChannel} className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/70 transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Thêm kênh liên hệ
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Field component ──────────────────────────────────────
function Field({ label, value, onChange, placeholder, textarea, small }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; textarea?: boolean; small?: boolean
}) {
  const cls = `w-full border border-[#f1f1f4] px-3 ${small ? 'py-2 text-xs' : 'py-2.5 text-sm'} focus:outline-none focus:border-primary`
  return (
    <div>
      <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={`${cls} resize-none`} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      )}
    </div>
  )
}
