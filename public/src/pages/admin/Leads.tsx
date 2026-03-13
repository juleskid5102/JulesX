import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'

/**
 * AdminLeads — From 06-admin-leads.html
 * NOW WIRED to GET /api/admin/leads
 */

const STATUS_STYLES: Record<string, { dot: string; text: string; label: string }> = {
  'new': { dot: 'bg-emerald-500', text: 'text-emerald-600', label: 'New' },
  'contacted': { dot: 'bg-blue-500', text: 'text-blue-600', label: 'Contacted' },
  'in-progress': { dot: 'bg-primary', text: 'text-primary', label: 'In-Progress' },
  'converted': { dot: 'bg-emerald-600', text: 'text-emerald-700', label: 'Converted' },
  'lost': { dot: 'bg-slate-400', text: 'text-slate-500', label: 'Lost' },
}

const SOURCE_STYLES: Record<string, string> = {
  'config-builder': 'bg-primary/10 text-primary',
  'contact-form': 'bg-slate-100 text-slate-500',
}

export default function AdminLeads() {
  const api = useApi()
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('limit', String(pageSize))
        params.set('offset', String((page - 1) * pageSize))
        if (statusFilter !== 'all') params.set('status', statusFilter)

        const data: any = await api.get(`/api/admin/leads?${params}`, true)
        const list = Array.isArray(data) ? data : data.leads || data.data || []
        setLeads(list)
      } catch (err) {
        console.warn('Leads fetch error:', err)
        setLeads([])
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [page, statusFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (leadId: string, newStatus: string) => {
    try {
      await api.patch(`/api/admin/leads/${leadId}`, { status: newStatus }, true)
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))
    } catch (err) {
      console.warn('Update lead status failed:', err)
    }
  }

  return (
    <div className="space-y-0 -mx-8 -mt-8">
      {/* Page Header */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-4xl font-heading font-bold text-slate-900 uppercase tracking-tighter">Leads</h2>
          <button className="text-xs font-bold uppercase tracking-widest border border-slate-200 px-4 py-2 hover:bg-slate-50 transition-colors">
            Export Data
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 cursor-pointer border-r border-slate-200 pr-4">
            <span className="text-[10px] font-bold uppercase text-slate-400">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
              className="text-sm font-semibold border-none bg-transparent focus:ring-0 p-0 pr-6 cursor-pointer"
            >
              <option value="all">All Leads</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-progress">In-Progress</option>
              <option value="converted">Converted</option>
            </select>
          </div>
          <div className="flex-1" />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <th className="py-4 px-2 w-10"><input type="checkbox" className="border-slate-300 text-primary focus:ring-primary" /></th>
                <th className="py-4 px-4">ID</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Email</th>
                <th className="py-4 px-4">Source</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Created</th>
                <th className="py-4 px-4 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length > 0 ? leads.map((lead: any) => {
                const id = lead.id || lead.shortId || '—'
                const name = lead.name || lead.client_name || '—'
                const email = lead.email || lead.client_email || '—'
                const source = lead.source || 'contact-form'
                const status = STATUS_STYLES[lead.status] || STATUS_STYLES['new']!
                const sourceStyle = SOURCE_STYLES[source] ?? ''
                const date = lead.created_at ? new Date(lead.created_at).toLocaleDateString('vi-VN') : '—'

                return (
                  <tr key={id} className="h-[56px] hover:bg-slate-50 transition-colors group cursor-pointer">
                    <td className="px-2"><input type="checkbox" className="border-slate-300 text-primary focus:ring-primary" /></td>
                    <td className="px-4 font-mono text-xs font-bold">{id}</td>
                    <td className="px-4 text-sm font-bold">{name}</td>
                    <td className="px-4 text-sm text-slate-500">{email}</td>
                    <td className="px-4"><span className={`text-[10px] font-bold uppercase px-2 py-0.5 ${sourceStyle}`}>{source}</span></td>
                    <td className="px-4">
                      <button
                        onClick={() => {
                          const nextStatus: Record<string, string> = { new: 'contacted', contacted: 'in-progress', 'in-progress': 'converted' }
                          const next = nextStatus[lead.status]
                          if (next) updateStatus(id, next)
                        }}
                        className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                      >
                        <span className={`size-1.5 rounded-full ${status.dot}`} />
                        <span className={`text-[10px] font-bold uppercase ${status.text}`}>{status.label}</span>
                      </button>
                    </td>
                    <td className="px-4 text-xs text-right text-slate-400">{date}</td>
                    <td className="px-4"><span className="material-symbols-outlined text-slate-300 group-hover:text-slate-600 transition-colors">more_vert</span></td>
                  </tr>
                )
              }) : (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">Chưa có lead nào</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <footer className="h-16 px-8 flex items-center justify-between border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Trang <span className="font-bold text-slate-900">{page}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-1.5 border border-slate-200 text-xs font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={leads.length < pageSize}
            className="px-4 py-1.5 border border-slate-200 text-xs font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  )
}
