import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import { API_BASE, type Project } from '../../config/site'

/**
 * PortfolioPreview — Homepage section
 * Fetches random 2 projects via ?featured=true
 * Layout = Row 1 of Portfolio page (7-col + 5-col)
 */
export default function PortfolioPreview() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio?featured=true`)
      .then(async (res) => {
        if (!res.ok) throw new Error('API error')
        const data: any = await res.json()
        const list = Array.isArray(data) ? data : data.data || []
        setProjects(list.slice(0, 2).map((p: any): Project => ({
          id: p.id || p.slug || '',
          slug: p.slug || p.id || '',
          title: p.title || p.name || '',
          category: p.category || '',
          designStyle: p.designStyle || '',
          completedAt: p.completedAt || p.date || '',
          image: p.image || p.thumbnail || '',
          featured: p.featured,
          order: p.order,
          field: p.field || '',
          description: p.description || '',
          challenge: p.challenge || '',
          solution: p.solution || '',
          duration: p.duration || '',
          stack: p.stack || '',
          lighthouse: p.lighthouse || '',
          gallery: p.gallery || [],
          techTags: p.techTags || [],
        })))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading || projects.length === 0) {
    return null
  }

  const project1 = projects[0]!
  const project2 = projects[1]

  // Card subtitle: CATEGORY / DESIGN STYLE / COMPLETED_AT
  const subtitle = (p: Project) =>
    [p.category, p.designStyle, p.completedAt].filter(Boolean).join(' / ').toUpperCase()

  return (
    <section className="py-32 bg-white border-t border-slate-100">
      <div className="px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <h2
            className="text-5xl md:text-6xl font-bold tracking-tight leading-none uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Dự Án<br />Nổi Bật
          </h2>
          <Link
            to="/du-an"
            className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            Xem Tất Cả
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </Reveal>

      {/* Row 1 layout: 7-col + 5-col — matching Portfolio page */}
      <div className="grid grid-cols-12 gap-6">
        {/* Project 1 — 7 columns */}
        <Reveal className="col-span-12 md:col-span-7 group">
          <Link to={`/du-an/${project1.id}`} className="flex flex-col h-full border border-slate-200">
            <div className="flex-1 min-h-[280px] overflow-hidden border-b border-slate-200">
              <img
                alt={project1.title}
                className="w-full h-full object-cover grayscale-hover"
                src={project1.image}
              />
            </div>
            <div className="p-6 md:p-8 flex justify-between items-end">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-heading mb-1">{project1.title}</h3>
                <p className="text-primary font-bold text-xs tracking-widest uppercase">{subtitle(project1)}</p>
              </div>
              <span className="material-symbols-outlined text-3xl md:text-4xl text-slate-300 group-hover:text-primary transition-colors">north_east</span>
            </div>
          </Link>
        </Reveal>

        {/* Project 2 — 5 columns */}
        {project2 && (
          <Reveal className="col-span-12 md:col-span-5 group" delay={150}>
            <Link to={`/du-an/${project2.id}`} className="flex flex-col h-full border border-slate-200">
              <div className="flex-1 min-h-[280px] overflow-hidden border-b border-slate-200">
                <img
                  alt={project2.title}
                  className="w-full h-full object-cover grayscale-hover"
                  src={project2.image}
                />
              </div>
              <div className="p-6 md:p-8 flex justify-between items-end">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-heading mb-1">{project2.title}</h3>
                  <p className="text-primary font-bold text-xs tracking-widest uppercase">{subtitle(project2)}</p>
                </div>
                <span className="material-symbols-outlined text-3xl md:text-4xl text-slate-300 group-hover:text-primary transition-colors">north_east</span>
              </div>
            </Link>
          </Reveal>
        )}
      </div>
      </div>
    </section>
  )
}
