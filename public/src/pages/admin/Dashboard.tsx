import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'

/**
 * AdminDashboard — From 05-admin-dashboard.html
 * NOW WIRED to GET /api/admin/stats + GET /api/admin/leads
 */
export default function AdminDashboard() {
  const api = useApi()
  const [stats, setStats] = useState({ leads: 0, projects: 0, orders: 0, revenue: '0' })
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, leadsRes] = await Promise.allSettled([
          api.get<any>('/api/admin/stats', true),
          api.get<any>('/api/admin/leads?limit=5', true),
        ])

        if (statsRes.status === 'fulfilled') {
          const s = statsRes.value
          setStats({
            leads: s.totalLeads ?? s.leads ?? 0,
            projects: s.activeProjects ?? s.projects ?? 0,
            orders: s.pendingOrders ?? s.orders ?? 0,
            revenue: s.revenue ? `${Math.round(s.revenue / 1_000_000)}M VND` : '0',
          })
        }

        if (leadsRes.status === 'fulfilled') {
          const data = leadsRes.value
          const leads = Array.isArray(data) ? data : data.leads || []
          setRecentLeads(leads.slice(0, 4))
          // Orders from leads that have order status
          setRecentOrders(leads.filter((l: any) => l.order_status || l.orderStatus).slice(0, 4))
        }
      } catch (err) {
        console.warn('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="New Leads" value={String(stats.leads)} trend="+12%" up />
        <StatCard label="Active Projects" value={String(stats.projects)} trend="+8%" up />
        <StatCard label="Pending Orders" value={String(stats.orders)} trend="0%" />
        <StatCard label="Revenue" value={stats.revenue} trend="+12%" up small />
      </div>

      {/* Main Section: Leads Table + Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Recent Leads Table */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold">Recent Leads</h2>
            <a href="/admin/leads" className="text-xs font-bold text-primary hover:underline">View All</a>
          </div>
          <div className="border border-[#f1f1f4] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f1f4]">
                {recentLeads.length > 0 ? recentLeads.map((lead: any, i: number) => (
                  <LeadRow
                    key={i}
                    name={lead.name || lead.client_name || '—'}
                    email={lead.email || lead.client_email || '—'}
                    status={lead.status || 'new'}
                    date={lead.created_at ? new Date(lead.created_at).toLocaleDateString('vi-VN') : '—'}
                  />
                )) : (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-400">Chưa có lead nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold">Recent Orders</h2>
            <a href="/admin/orders" className="text-xs font-bold text-primary hover:underline">View All</a>
          </div>
          <div className="border border-[#f1f1f4] p-0 divide-y divide-[#f1f1f4]">
            {recentOrders.length > 0 ? recentOrders.map((order: any, i: number) => (
              <OrderRow
                key={i}
                id={`#${order.shortId || order.short_id || `ORD-${i}`}`}
                name={order.project_name || order.name || 'Dự án'}
                amount={order.amount ? `${(order.amount / 1_000_000).toFixed(1)}M VND` : '—'}
                status={order.order_status || order.orderStatus || order.status || 'Processing'}
                color={order.status === 'completed' ? 'text-emerald-500' : 'text-primary'}
              />
            )) : (
              <div className="px-6 py-8 text-center text-sm text-slate-400">Chưa có đơn hàng nào</div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="space-y-4">
        <h2 className="font-heading text-lg font-bold">Leads &amp; Orders Activity (30 Days)</h2>
        <div className="w-full h-64 border border-[#f1f1f4] bg-slate-50/30 p-8 flex flex-col justify-end relative overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
            <line stroke="#f1f1f4" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50" />
            <line stroke="#f1f1f4" strokeWidth="1" x1="0" x2="1000" y1="100" y2="100" />
            <line stroke="#f1f1f4" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150" />
            <path d="M0,160 L100,140 L200,170 L300,110 L400,130 L500,80 L600,100 L700,60 L800,90 L900,40 L1000,70" fill="none" stroke="#6366F1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d="M0,180 L100,160 L200,175 L300,150 L400,160 L500,140 L600,155 L700,130 L800,140 L900,120 L1000,135" fill="none" stroke="#94a3b8" strokeDasharray="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <div className="flex justify-between mt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Oct 01</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Oct 15</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Oct 30</span>
          </div>
          <div className="absolute top-6 right-8 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-primary" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-slate-300" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function StatCard({ label, value, trend, up, small }: {
  label: string; value: string; trend: string; up?: boolean; small?: boolean
}) {
  return (
    <div className="p-6 border border-[#f1f1f4] bg-white flex flex-col justify-between">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <div className="mt-4 flex items-end justify-between">
        <span className={`font-heading ${small ? 'text-2xl' : 'text-4xl'} font-bold text-slate-900 whitespace-nowrap`}>{value}</span>
        <span className={`flex items-center ${up ? 'text-emerald-500' : 'text-slate-400'} text-sm font-bold`}>
          <span className="material-symbols-outlined text-[18px]">{up ? 'trending_up' : 'remove'}</span>
          {trend}
        </span>
      </div>
    </div>
  )
}

function Th({ children }: { children: string }) {
  return (
    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#f1f1f4]">
      {children}
    </th>
  )
}

function LeadRow({ name, email, status, date }: {
  name: string; email: string; status: string; date: string
}) {
  const statusStyles: Record<string, string> = {
    'new': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'contacted': 'bg-blue-50 text-blue-600 border-blue-100',
    'in-progress': 'bg-primary/10 text-primary border-primary/20',
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-6 py-4 text-sm font-bold text-slate-900">{name}</td>
      <td className="px-6 py-4 text-sm text-slate-500">{email}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusStyles[status] ?? ''}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-400">{date}</td>
    </tr>
  )
}

function OrderRow({ id, name, amount, status, color }: {
  id: string; name: string; amount: string; status: string; color: string
}) {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
      <div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{id}</p>
        <p className="text-sm font-bold text-slate-900">{name}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-slate-900">{amount}</p>
        <span className={`text-[9px] font-bold uppercase ${color} tracking-widest`}>{status}</span>
      </div>
    </div>
  )
}
