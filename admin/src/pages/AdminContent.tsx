import { useEffect, useState, useCallback } from 'react'
import { useApi } from '../hooks/useApi'

// ─── Types ────────────────────────────────────────────────
interface ProcessStep { id?: string; number: string; title: string; description: string; order?: number }
interface Technology { id?: string; name: string; category: string; icon?: string; order?: number }
interface Contact { id?: string; name: string; email: string; phone?: string; message: string; service?: string; createdAt?: string }

type Tab = 'process' | 'tech' | 'contacts'

/**
 * AdminContent — Tabs: Process Steps / Technologies / Contact Submissions
 * Uses /api/admin/process-steps, /api/admin/technologies, /api/admin/contacts
 */
export default function AdminContent() {
  const [activeTab, setActiveTab] = useState<Tab>('process')

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'process', label: 'Quy trình', icon: 'timeline' },
    { id: 'tech', label: 'Công nghệ', icon: 'code' },
    { id: 'contacts', label: 'Liên hệ', icon: 'mail' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold">Nội Dung</h2>
        <p className="text-sm text-slate-400 mt-1">Quản lý quy trình làm việc, công nghệ và tin nhắn liên hệ</p>
      </div>

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

      {activeTab === 'process' && <ProcessStepsTab />}
      {activeTab === 'tech' && <TechTab />}
      {activeTab === 'contacts' && <ContactsTab />}
    </div>
  )
}

// ─── Process Steps Tab ────────────────────────────────────
function ProcessStepsTab() {
  const api = useApi()
  const [items, setItems] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<ProcessStep | null>(null)
  const [form, setForm] = useState<ProcessStep>({ number: '', title: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data: any = await api.get('/api/admin/process-steps', true)
      setItems(Array.isArray(data) ? data : data.data || [])
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }, [api])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true); setError('')
    try {
      if (editing?.id) {
        await api.patch(`/api/admin/process-steps/${editing.id}`, form, true)
      } else {
        await api.post('/api/admin/process-steps', form, true)
      }
      setEditing(null); setForm({ number: '', title: '', description: '' })
      load()
    } catch (e: any) { setError(e.message) }
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Xóa bước này?')) return
    try { await api.del(`/api/admin/process-steps/${id}`, true); load() }
    catch (e: any) { setError(e.message) }
  }

  if (loading) return <Spinner />

  return (
    <div>
      {error && <Alert type="error" message={error} />}

      {/* Inline form */}
      <div className="border border-[#f1f1f4] p-4 mb-6">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">{editing?.id ? 'Sửa bước' : 'Thêm bước mới'}</h4>
        <div className="grid grid-cols-12 gap-3">
          <input value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} className="col-span-2 border border-[#f1f1f4] px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="01" />
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="col-span-3 border border-[#f1f1f4] px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Tên bước" />
          <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="col-span-5 border border-[#f1f1f4] px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Mô tả bước" />
          <div className="col-span-2 flex gap-2">
            <button onClick={save} disabled={saving || !form.title} className="flex-1 bg-primary text-white px-3 py-2 text-sm font-bold disabled:opacity-50 hover:bg-primary/90 transition-colors">
              {saving ? '...' : editing?.id ? 'Lưu' : 'Thêm'}
            </button>
            {editing?.id && <button onClick={() => { setEditing(null); setForm({ number: '', title: '', description: '' }) }} className="px-3 py-2 text-sm text-slate-400 hover:text-slate-900">Hủy</button>}
          </div>
        </div>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <EmptyState icon="timeline" label="Chưa có bước quy trình nào" />
      ) : (
        <div className="space-y-2">
          {items.map(step => (
            <div key={step.id} className="flex items-center border border-[#f1f1f4] px-4 py-3 hover:bg-slate-50/50 transition-colors">
              <span className="text-primary font-bold text-sm w-12">{step.number}</span>
              <div className="flex-1">
                <span className="font-bold text-sm">{step.title}</span>
                <span className="text-slate-400 text-xs ml-3">{step.description}</span>
              </div>
              <button onClick={() => { setEditing(step); setForm(step) }} className="p-1.5 text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
              <button onClick={() => remove(step.id!)} className="p-1.5 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Technologies Tab ─────────────────────────────────────
function TechTab() {
  const api = useApi()
  const [items, setItems] = useState<Technology[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Technology | null>(null)
  const [form, setForm] = useState<Technology>({ name: '', category: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data: any = await api.get('/api/admin/technologies', true)
      setItems(Array.isArray(data) ? data : data.data || [])
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }, [api])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true); setError('')
    try {
      if (editing?.id) {
        await api.patch(`/api/admin/technologies/${editing.id}`, form, true)
      } else {
        await api.post('/api/admin/technologies', form, true)
      }
      setEditing(null); setForm({ name: '', category: '' })
      load()
    } catch (e: any) { setError(e.message) }
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Xóa công nghệ này?')) return
    try { await api.del(`/api/admin/technologies/${id}`, true); load() }
    catch (e: any) { setError(e.message) }
  }

  if (loading) return <Spinner />

  return (
    <div>
      {error && <Alert type="error" message={error} />}

      <div className="border border-[#f1f1f4] p-4 mb-6">
        <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">{editing?.id ? 'Sửa công nghệ' : 'Thêm công nghệ'}</h4>
        <div className="grid grid-cols-12 gap-3">
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="col-span-4 border border-[#f1f1f4] px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="React" />
          <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="col-span-3 border border-[#f1f1f4] px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Frontend" />
          <input value={form.icon || ''} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="col-span-3 border border-[#f1f1f4] px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Icon URL (optional)" />
          <div className="col-span-2 flex gap-2">
            <button onClick={save} disabled={saving || !form.name} className="flex-1 bg-primary text-white px-3 py-2 text-sm font-bold disabled:opacity-50 hover:bg-primary/90 transition-colors">
              {saving ? '...' : editing?.id ? 'Lưu' : 'Thêm'}
            </button>
            {editing?.id && <button onClick={() => { setEditing(null); setForm({ name: '', category: '' }) }} className="px-3 py-2 text-sm text-slate-400 hover:text-slate-900">Hủy</button>}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState icon="code" label="Chưa có công nghệ nào" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map(tech => (
            <div key={tech.id} className="border border-[#f1f1f4] p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
              <div>
                <div className="font-bold text-sm">{tech.name}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">{tech.category}</div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(tech); setForm(tech) }} className="p-1 text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                <button onClick={() => remove(tech.id!)} className="p-1 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[16px]">delete</span></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Contacts Tab (Read-only) ─────────────────────────────
function ContactsTab() {
  const api = useApi()
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data: any = await api.get('/api/admin/contacts', true)
      setItems(Array.isArray(data) ? data : data.data || [])
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }, [api])

  useEffect(() => { load() }, [load])

  if (loading) return <Spinner />

  return (
    <div>
      {error && <Alert type="error" message={error} />}

      {items.length === 0 ? (
        <EmptyState icon="mail" label="Chưa có tin nhắn liên hệ nào" />
      ) : (
        <div className="border border-[#f1f1f4] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase">Tên</th>
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase">Email</th>
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase hidden md:table-cell">Tin nhắn</th>
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase hidden lg:table-cell">Dịch vụ</th>
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase w-32">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {items.map(c => (
                <tr key={c.id} className="border-t border-[#f1f1f4] hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-bold">{c.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${c.email}`} className="text-primary hover:underline">{c.email}</a>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="line-clamp-1 text-slate-500">{c.message}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-400">{c.service || '—'}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString('vi-VN') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Shared UI ────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

function Alert({ type, message }: { type: 'error' | 'success'; message: string }) {
  const colors = type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
  const icon = type === 'error' ? 'error' : 'check_circle'
  return <div className={`${colors} px-4 py-3 text-sm mb-4 flex items-center gap-2`}><span className="material-symbols-outlined text-[18px]">{icon}</span>{message}</div>
}

function EmptyState({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="text-center py-16 text-slate-400">
      <span className="material-symbols-outlined text-[48px] mb-4 block">{icon}</span>
      <p className="text-lg font-medium">{label}</p>
    </div>
  )
}
