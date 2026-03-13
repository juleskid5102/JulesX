import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { PROJECTS, type Project } from '../config/site'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Portfolio — Grid layout (12-column)
 * NOW WIRED to GET /api/public/portfolio with fallback to PROJECTS
 */
export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio`)
      .then(async (res) => {
        if (!res.ok) throw new Error('API error')
        const data: any = await res.json()
        const list = Array.isArray(data) ? data : data.projects || data.data || []
        if (list.length > 0) {
          setProjects(list.map((p: any) => ({
            id: p.id || p.slug || '',
            title: p.title || p.name || '',
            category: p.category || p.type || '',
            year: p.year || String(new Date(p.created_at || p.createdAt || Date.now()).getFullYear()),
            image: p.image || p.thumbnail || p.images?.[0] || '',
            colSpan: 7,
            aspect: 'aspect-video',
            showArrow: true,
            type: p.type || p.category || '',
            date: p.date || '',
            field: p.field || '',
            description: p.description || '',
            challenge: p.challenge || '',
            solution: p.solution || '',
            duration: p.duration || '',
            stack: p.stack || '',
            lighthouse: p.lighthouse || '',
            gallery: p.gallery || p.images || [],
            techTags: p.techTags || p.tags || [],
          })))
        }
      })
      .catch(() => {
        // Silently fall back to hardcoded PROJECTS
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-[#f6f6f8] text-slate-900 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-48 pb-32">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  // Static Tailwind class map — MUST use literal strings for Tailwind purge
  const COL_CLASS: Record<number, string> = {
    4: 'col-span-12 md:col-span-4',
    5: 'col-span-12 md:col-span-5',
    7: 'col-span-12 md:col-span-7',
  }

  // Assign grid patterns
  const gridProjects = projects.map((p, i) => {
    const patterns = [
      { colSpan: 7, aspect: 'aspect-video', showArrow: true, pSize: 'large' },
      { colSpan: 5, aspect: 'aspect-video md:aspect-square', showArrow: false, pSize: 'large' },
      { colSpan: 5, aspect: 'aspect-video md:aspect-square', showArrow: false, pSize: 'large' },
      { colSpan: 7, aspect: 'aspect-video', showArrow: true, pSize: 'large' },
      { colSpan: 4, aspect: 'aspect-square', showArrow: false, pSize: 'small' },
      { colSpan: 4, aspect: 'aspect-square', showArrow: false, pSize: 'small' },
      { colSpan: 4, aspect: 'aspect-square', showArrow: false, pSize: 'small' },
    ]
    const pat = patterns[i % patterns.length]!
    return { ...p, ...pat }
  })

  return (
    <div className="bg-[#f6f6f8] text-slate-900">
      <Navbar />

      <header className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-primary font-bold text-xs tracking-widest mb-4 uppercase">DỰ ÁN CỦA CHÚNG TÔI</p>
          <h2 className="font-heading font-[700] text-7xl md:text-8xl tracking-tight leading-none">
            Dự Án<br />Nổi Bật
          </h2>
        </Reveal>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-12 gap-6">
          {gridProjects.map((project) => (
            <Reveal key={project.id} className={`${COL_CLASS[project.colSpan] || 'col-span-12'} border border-slate-200 p-0 group`}>
              <Link to={`/du-an/${project.id}`} className="block">
                <div className={`${project.aspect} overflow-hidden border-b border-slate-200`}>
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-hover"
                    src={project.image}
                  />
                </div>
                <div className={`${project.pSize === 'large' ? 'p-8' : 'p-6'} ${project.showArrow ? 'flex justify-between items-end' : ''}`}>
                  <div>
                    <h3 className={`font-heading font-[600] ${project.pSize === 'large' ? 'text-3xl' : 'text-2xl'} mb-1`}>{project.title}</h3>
                    <p className="text-primary font-bold text-xs tracking-widest uppercase">{project.category} / {project.year}</p>
                  </div>
                  {project.showArrow && (
                    <span className="material-symbols-outlined text-4xl font-light">north_east</span>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>

      <section className="py-32 bg-white border-y border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="font-heading font-[700] text-5xl md:text-6xl tracking-tight mb-12 uppercase">Muốn xem thêm?</h2>
            <Link
              to="/bao-gia"
              className="bg-slate-900 text-white px-12 py-6 text-lg font-bold hover:bg-primary transition-all inline-flex items-center gap-4 group"
            >
              BẮT ĐẦU DỰ ÁN CỦA BẠN
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
