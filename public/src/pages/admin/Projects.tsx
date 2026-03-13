import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'

/**
 * AdminProjects — Kanban board
 * NOW WIRED to GET /api/admin/projects
 */

interface ProjectCard {
  id: string; name: string; client: string; progress: number; deadline: string; value: string; status: string
}

const COLUMN_DEF = [
  { title: 'Pending', status: 'pending' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Review', status: 'review' },
  { title: 'Completed', status: 'completed' },
]

const COLUMN_COLORS: Record<string, string> = {
  'pending': 'bg-slate-400',
  'in-progress': 'bg-primary',
  'review': 'bg-amber-500',
  'completed': 'bg-emerald-500',
}

export default function AdminProjects() {
  const api = useApi()
  const [projects, setProjects] = useState<ProjectCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data: any = await api.get('/api/admin/projects', true)
        const list = Array.isArray(data) ? data : data.projects || data.data || []
        setProjects(list.map((p: any) => ({
          id: p.id || p.shortId || '',
          name: p.name || p.title || p.project_name || '',
          client: p.client || p.client_name || '',
          progress: p.progress ?? 0,
          deadline: p.deadline || p.estimated_delivery || '—',
          value: p.value || (p.amount ? `${(p.amount / 1_000_000).toFixed(1)}M` : '—'),
          status: p.status || 'pending',
        })))
      } catch (err) {
        console.warn('Projects fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  const columns = COLUMN_DEF.map(col => ({
    ...col,
    projects: projects.filter(p => p.status === col.status),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-heading font-bold text-slate-900 uppercase tracking-tighter">Projects</h2>
        <button className="bg-primary text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Project
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((col) => (
          <div key={col.status} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
              <div className={`w-2 h-2 rounded-full ${COLUMN_COLORS[col.status]}`} />
              <span className="text-sm font-bold uppercase tracking-widest">{col.title}</span>
              <span className="text-xs font-bold text-slate-400 ml-auto">{col.projects.length}</span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {col.projects.length > 0 ? col.projects.map((project) => (
                <div key={project.id} className="border border-[#f1f1f4] p-5 bg-white hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{project.id}</span>
                    <span className="material-symbols-outlined text-slate-300 text-[18px] group-hover:text-slate-600">more_horiz</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{project.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{project.client}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100">
                      <div
                        className={`h-full ${COLUMN_COLORS[col.status]}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {project.deadline}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{project.value} VND</span>
                  </div>
                </div>
              )) : (
                <div className="text-center text-xs text-slate-400 py-8 border border-dashed border-slate-200">
                  Chưa có dự án
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
