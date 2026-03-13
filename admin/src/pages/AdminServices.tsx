import { useEffect, useState, useCallback } from 'react'
import { useApi } from '../hooks/useApi'

interface Service {
  id?: string
  number: string
  title: string
  description: string
  tags: string[]
  bgImage: string
}

const EMPTY: Service = { number: '', title: '', description: '', tags: [], bgImage: '' }

/**
 * AdminServices — CRUD for services collection
 * Uses /api/admin/services (GET | POST | PATCH | DELETE)
 */
export default function AdminServices() {
  const api = useApi()
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Modal
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState<Service>(EMPTY)
  const [tagInput, setTagInput] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data: any = await api.get('/api/admin/services', true)
      setItems(Array.isArray(data) ? data : data.data || [])
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }, [api])

  useEffect(() => { load() }, [load])

  const openCreate = () => { setEditing(null); setForm(EMPTY); setTagInput('') }
  const openEdit = (s: Service) => { setEditing(s); setForm({ ...s }); setTagInput('') }
  const close = () => { setEditing(null); setForm(EMPTY) }

  const addTag = () => {
    if (!tagInput.trim()) return
    setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim().toUpperCase()] }))
    setTagInput('')
  }

  const removeTag = (idx: number) => {
    setForm(f => ({ ...f, tags: f.tags.filter((_, i) => i !== idx) }))
  }

  const save = async () => {
    setSaving(true); setError(''); setSuccess('')
    try {
      if (editing?.id) {
        await api.patch(`/api/admin/services/${editing.id}`, form, true)
        setSuccess('Đã cập nhật dịch vụ')
      } else {
        await api.post('/api/admin/services', form, true)
        setSuccess('Đã tạo dịch vụ mới')
      }
      close()
      load()
    } catch (e: any) { setError(e.message) }
    setSaving(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Xóa dịch vụ này?')) return
    try {
      await api.del(`/api/admin/services/${id}`, true)
      setSuccess('Đã xóa dịch vụ')
      load()
    } catch (e: any) { setError(e.message) }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-2xl font-bold">Dịch Vụ</h2>
          <p className="text-sm text-slate-400 mt-1">Quản lý danh sách dịch vụ trên trang công khai</p>
        </div>
        <button onClick={openCreate} className="bg-primary text-white px-5 py-2.5 text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Thêm dịch vụ
        </button>
      </div>

      {/* Alerts */}
      {error && <div className="bg-red-50 text-red-600 px-4 py-3 text-sm mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">error</span>{error}</div>}
      {success && <div className="bg-green-50 text-green-600 px-4 py-3 text-sm mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">check_circle</span>{success}</div>}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <span className="material-symbols-outlined text-[48px] mb-4 block">design_services</span>
          <p className="text-lg font-medium">Chưa có dịch vụ nào</p>
          <p className="text-sm mt-1">Nhấn "Thêm dịch vụ" để bắt đầu</p>
        </div>
      ) : (
        <div className="border border-[#f1f1f4] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase w-16">#</th>
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase">Tên dịch vụ</th>
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase hidden md:table-cell">Tags</th>
                <th className="px-4 py-3 font-bold text-[10px] tracking-widest text-slate-400 uppercase w-28 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-t border-[#f1f1f4] hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-primary">{s.number}</td>
                  <td className="px-4 py-4">
                    <div className="font-bold">{s.title}</div>
                    <div className="text-slate-400 text-xs mt-1 line-clamp-1">{s.description}</div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {s.tags?.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold tracking-wider uppercase">{t}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => openEdit(s)} className="p-1.5 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button onClick={() => remove(s.id!)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {(editing !== null || form.title || form === EMPTY) && editing !== undefined && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={close}>
          <div className="bg-white w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-[#f1f1f4] flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">{editing?.id ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}</h3>
              <button onClick={close} className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">Số</label>
                  <input value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} className="w-full border border-[#f1f1f4] px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="01" />
                </div>
                <div className="col-span-3">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">Tên dịch vụ</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-[#f1f1f4] px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Thiết kế Website" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">Mô tả</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-[#f1f1f4] px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.tags.map((t, i) => (
                    <span key={i} className="bg-slate-100 px-2 py-1 text-xs font-bold flex items-center gap-1">
                      {t}
                      <button onClick={() => removeTag(i)} className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className="flex-1 border border-[#f1f1f4] px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="Thêm tag..." />
                  <button onClick={addTag} className="px-3 py-2 bg-slate-100 text-sm font-bold hover:bg-slate-200 transition-colors">+</button>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">Ảnh nền (URL)</label>
                <input value={form.bgImage} onChange={e => setForm(f => ({ ...f, bgImage: e.target.value }))} className="w-full border border-[#f1f1f4] px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="https://..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#f1f1f4] flex justify-end gap-3">
              <button onClick={close} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Hủy</button>
              <button onClick={save} disabled={saving || !form.title} className="bg-primary text-white px-6 py-2.5 text-sm font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-2">
                {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {editing?.id ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
