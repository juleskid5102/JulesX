import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import { API_BASE } from '../../config/site'

/**
 * PortfolioPreview — From 01-homepage.html lines 102-134
 * Featured projects fetched from /api/public/portfolio?featured=true
 */

interface Project {
  id: string
  title: string
  category: string
  year: string
  image: string
}

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio?featured=true`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load')
        const json = await res.json()
        const list = Array.isArray(json) ? json : json.data || json.projects || []
        setProjects(list.slice(0, 2))
      })
      .catch((err) => {
        console.error('PortfolioPreview fetch error:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="bg-background-light py-32 px-6 md:px-24">
        <div className="flex justify-between items-end mb-16">
          <div className="animate-pulse">
            <div className="h-12 w-48 bg-slate-200 mb-2" />
            <div className="h-12 w-36 bg-slate-200" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="aspect-[16/10] bg-slate-200 animate-pulse" />
          </div>
          <div className="md:col-span-4 md:mt-24">
            <div className="aspect-[16/10] bg-slate-200 animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) return null

  const project1 = projects[0]!
  const project2 = projects.length > 1 ? projects[1]! : null

  return (
    <section className="bg-background-light py-32 px-6 md:px-24">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Dự Án<br />Nổi Bật
          </h2>
          <Link
            to="/du-an"
            className="group flex items-center gap-2 text-slate-900 font-bold tracking-widest uppercase text-sm shrink-0"
          >
            <span>Xem Tất Cả Dự Án</span>
            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_right_alt</span>
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Project 1 — 8 columns */}
        <div className="md:col-span-8 group cursor-pointer">
          <Reveal>
            <Link to={`/du-an/${project1.id}`} className="block border border-slate-200">
              <div className="aspect-[16/10] overflow-hidden border-b border-slate-200">
                <img
                  alt={project1.title}
                  className="w-full h-full object-cover grayscale-hover"
                  src={project1.image}
                />
              </div>
              <div className="p-8 flex justify-between items-end">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading mb-1">{project1.title}</h3>
                  <p className="text-primary font-bold text-xs tracking-widest uppercase">{project1.category} / {project1.year}</p>
                </div>
                <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:translate-x-2 transition-transform">north_east</span>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* Project 2 — 4 columns, offset */}
        {project2 && (
          <div className="md:col-span-4 group cursor-pointer md:mt-24">
            <Reveal delay={150}>
              <Link to={`/du-an/${project2.id}`} className="block border border-slate-200">
                <div className="aspect-[16/10] overflow-hidden border-b border-slate-200">
                  <img
                    alt={project2.title}
                    className="w-full h-full object-cover grayscale-hover"
                    src={project2.image}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold font-heading mb-1">{project2.title}</h3>
                  <p className="text-primary font-bold text-xs tracking-widest uppercase">{project2.category} / {project2.year}</p>
                </div>
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
