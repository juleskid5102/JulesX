import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import { API_BASE, type Project } from '../../config/site'

/**
 * PortfolioPreview — Dark theme, image cards with grayscale→color + overlay
 * Oasis-style staggered reveal
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
        setProjects(list.slice(0, 4).map((p: any): Project => ({
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

  if (loading) {
    return (
      <section className="bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[400px] bg-white/5 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (projects.length === 0) return null

  return (
    <section className="bg-black py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
                Portfolio
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-white mt-4 tracking-tight">
                Dự Án Nổi Bật
              </h2>
            </div>
            <Link
              to="/du-an"
              className="hidden md:block text-primary border-b border-primary/30 pb-1 hover:border-primary transition-all uppercase tracking-[0.2em] text-xs font-bold"
            >
              Xem Tất Cả
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/du-an/${project.id}`}
              className="relative group h-[450px] overflow-hidden cursor-pointer"
            >
              <img
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                src={project.image}
              />
              <div className="absolute inset-0 card-overlay flex flex-col justify-end p-8">
                <span className="bg-primary/90 text-white text-[10px] px-3 py-1 w-fit mb-4 uppercase tracking-[0.2em] font-bold">
                  {project.category || project.designStyle || 'Web'}
                </span>
                <h3 className="font-heading text-2xl text-white mb-2 font-bold">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.field || project.description?.slice(0, 80) || ''}
                </p>
              </div>
            </Link>
          ))}
        </ScrollReveal>

        {/* Mobile "View All" */}
        <div className="md:hidden text-center mt-10">
          <Link
            to="/du-an"
            className="text-primary border-b border-primary/30 pb-1 uppercase tracking-[0.2em] text-xs font-bold"
          >
            Xem Tất Cả Dự Án
          </Link>
        </div>
      </div>
    </section>
  )
}
