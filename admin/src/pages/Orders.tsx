import { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'

/**
 * AdminOrders — Orders table
 * NOW WIRED to GET /api/admin/orders (or /api/admin/leads with order filter)
 */

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  'processing': { bg: 'bg-primary/10', text: 'text-primary', label: 'Processing' },
  'completed': { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Completed' },
  'review': { bg: 'bg-blue-50', text: 'text-blue-600', label: 'In Review' },
  'new': { bg: 'bg-slate-100', text: 'text-slate-500', label: 'New' },
  'cancelled': { bg: 'bg-red-50', text: 'text-red-500', label: 'Cancelled' },
}

interface Order {
  id: string; project: string; client: string; amount: string; status: string; date: string
}

export default function AdminOrders() {
  const api = useApi()
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({ total: 0, processing: 0, completed: 0, revenue: '0' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Try /api/admin/orders first, fallback to /api/admin/leads
        let data: any
        try {
          data = await api.get('/api/admin/orders', true)
        } catch {
          data = await api.get('/api/admin/leads', true)
        }

        const list = Array.isArray(data) ? data : data.orders || data.leads || data.data || []
        const mapped: Order[] = list.map((o: any) => ({
          id: o.shortId || o.short_id || o.id || '—',
          project: o.project_name || o.name || o.project || '—',
          client: o.client_name || o.client || o.name || '—',
          amount: o.amount ? `${(o.amount / 1_000_000).toFixed(1)}M VND` : (o.value || '—'),
          status: o.order_status || o.orderStatus || o.status || 'new',
          date: o.created_at ? new Date(o.created_at).toLocaleDateString('vi-VN') : (o.date || '—'),
        }))
        setOrders(mapped)

        // Calculate stats
        const total = mapped.length
        const processing = mapped.filter(o => o.status === 'processing' || o.status === 'in-progress').length
        const completed = mapped.filter(o => o.status === 'completed').length
        setStats({ total, processing, completed, revenue: data.totalRevenue ? `${(data.totalRevenue / 1_000_000).toFixed(1)}M VND` : '—' })
      } catch (err) {
        console.warn('Orders fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-heading font-bold text-slate-900 uppercase tracking-tighter">Orders</h2>
        <button className="bg-primary text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Order
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 border border-[#f1f1f4]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Orders</span>
          <p className="font-heading text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="p-6 border border-[#f1f1f4]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Processing</span>
          <p className="font-heading text-3xl font-bold text-primary mt-2">{stats.processing}</p>
        </div>
        <div className="p-6 border border-[#f1f1f4]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completed</span>
          <p className="font-heading text-3xl font-bold text-emerald-500 mt-2">{stats.completed}</p>
        </div>
        <div className="p-6 border border-[#f1f1f4]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Revenue</span>
          <p className="font-heading text-2xl font-bold mt-2 whitespace-nowrap">{stats.revenue}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-[#f1f1f4] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4]">Order ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4]">Project</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4]">Client</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4]">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4]">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4]">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4] w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f1f4]">
            {orders.length > 0 ? orders.map((order) => {
              const s = STATUS_STYLES[order.status] || STATUS_STYLES['new']!
              return (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 text-sm font-bold font-mono text-primary">#{order.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.project}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.client}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${s.bg} ${s.text}`}>
                      {s.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-600 transition-colors">more_vert</span>
                  </td>
                </tr>
              )
            }) : (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-400">Chưa có đơn hàng nào</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

