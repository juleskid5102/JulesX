import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

interface OrderData {
  shortId: string
  status: string
  project_name: string
  project_type: string
  created_at: number
  estimated_delivery?: string
  timeline: { title: string; date: string }[]
  attachments: { name: string; url?: string }[]
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  new: { label: 'Mới tiếp nhận', color: 'bg-emerald-100 text-emerald-600' },
  'in-progress': { label: 'Đang thực hiện', color: 'bg-primary/10 text-primary' },
  designing: { label: 'Đang thiết kế', color: 'bg-blue-100 text-blue-600' },
  developing: { label: 'Đang phát triển', color: 'bg-purple-100 text-purple-600' },
  review: { label: 'Đang review', color: 'bg-amber-100 text-amber-600' },
  completed: { label: 'Hoàn thành', color: 'bg-emerald-100 text-emerald-600' },
  delivered: { label: 'Đã bàn giao', color: 'bg-slate-100 text-slate-500' },
}

const PROGRESS_STEPS = ['Tiếp nhận', 'Thiết kế', 'Phát triển', 'Bàn giao']

function getStepState(status: string) {
  const map: Record<string, number> = {
    new: 0, designing: 1, 'in-progress': 2, developing: 2, review: 2, completed: 3, delivered: 4,
  }
  return map[status] ?? 0
}

export default function OrderTracking() {
  const { token } = useParams<{ token: string }>()
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) { setError('Thiếu mã theo dõi'); setLoading(false); return }

    fetch(`${API_BASE}/api/public/track/${token}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Không tìm thấy đơn hàng')
        return res.json()
      })
      .then((data: any) => {
        setOrder({
          shortId: data.shortId || data.short_id || token,
          status: data.status || 'new',
          project_name: data.project_name || 'Dự án',
          project_type: data.project_type || '',
          created_at: data.created_at || Date.now(),
          estimated_delivery: data.estimated_delivery,
          timeline: Array.isArray(data.timeline) ? data.timeline : [],
          attachments: Array.isArray(data.attachments) ? data.attachments : [],
        })
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  const currentStep = order ? getStepState(order.status) : 0
  const statusInfo = order ? STATUS_MAP[order.status] || { label: order.status, color: 'bg-slate-100 text-slate-500' } : null

  return (
    <div className="bg-background-light text-slate-900 font-display min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 pt-32">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <span className="material-symbols-outlined text-[72px] text-slate-300 mb-4 block">search_off</span>
            <h2 className="font-heading text-3xl font-bold mb-2">Không tìm thấy đơn hàng</h2>
            <p className="text-slate-500">{error}</p>
          </div>
        ) : order ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Header */}
              <div>
                <h1 className="font-heading text-4xl lg:text-5xl mb-4 tracking-tight">Theo Dõi Đơn Hàng</h1>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <span className="text-slate-500">Mã đơn hàng: #{order.shortId}</span>
                  {statusInfo && (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusInfo.color}`}>{statusInfo.label}</span>
                  )}
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between relative px-2">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" />
                {PROGRESS_STEPS.map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-3">
                    {i < currentStep ? (
                      <div className="size-6 rounded-full bg-primary text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </div>
                    ) : i === currentStep ? (
                      <div className="size-6 rounded-full border-2 border-primary bg-background-light flex items-center justify-center">
                        <div className="size-2 rounded-full bg-primary" />
                      </div>
                    ) : (
                      <div className="size-6 rounded-full border-2 border-slate-300 bg-background-light" />
                    )}
                    <span className={`text-sm font-semibold ${i === currentStep ? 'text-primary' : i < currentStep ? '' : 'text-slate-400'}`}>{step}</span>
                  </div>
                ))}
              </div>

              {/* Project Info Card */}
              <div className="border border-slate-200 rounded-lg p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-heading text-xl mb-1">{order.project_name}</h3>
                  <p className="text-sm text-slate-500">{order.project_type}</p>
                </div>
                {order.estimated_delivery && (
                  <div className="text-right">
                    <p className="text-sm font-medium">Dự kiến: <span className="text-primary font-bold">{order.estimated_delivery}</span></p>
                  </div>
                )}
              </div>

              {/* Timeline */}
              {order.timeline.length > 0 && (
                <div>
                  <h4 className="font-heading text-lg mb-6">Tiến độ chi tiết</h4>
                  <div className="flex flex-col gap-6 relative pl-6">
                    <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-200 -z-10" />
                    {order.timeline.map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[29px] top-1 size-3 rounded-full bg-primary ring-4 ring-background-light" />
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-slate-500 mt-1">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit border border-slate-200 rounded-lg p-6 bg-white flex flex-col gap-8">
              {order.attachments.length > 0 && (
                <div>
                  <h4 className="font-heading text-lg mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">folder_open</span>
                    Tải tài liệu
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {order.attachments.map((doc, i) => (
                      <li key={i}>
                        <a className="flex items-center justify-between group" href={doc.url || '#'} target="_blank" rel="noopener noreferrer">
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{doc.name}</span>
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-[18px]">download</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 px-4 rounded transition-colors">
                <span className="material-symbols-outlined">support_agent</span>
                Liên hệ support
              </button>
            </aside>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}
