import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

/**
 * PortfolioItem — Project detail page
 * NOW WIRED to API with fallback to PROJECTS
 */
export default function PortfolioItem() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio`)
      .then(async (res) => {
        if (!res.ok) throw new Error('API error')
        const data: any = await res.json()
        const list = Array.isArray(data) ? data : data.projects || data.data || []
        const mapped = list.map((p: any) => ({
          id: p.id || p.slug || '',
          title: p.title || p.name || '',
          category: p.category || p.type || '',
          year: p.year || '',
          image: p.image || p.thumbnail || p.images?.[0] || '',
          colSpan: 7, aspect: 'aspect-video', showArrow: true,
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
        }))
        setAllProjects(mapped)
        setProject(mapped.find((p: Project) => p.id === id) || null)
      })
      .catch(() => {
        // No fallback — show not found
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="bg-white text-slate-900 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-48">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Dự án không tồn tại</h1>
          <Link to="/du-an" className="text-primary hover:underline">← Quay lại danh sách dự án</Link>
        </div>
      </div>
    )
  }

  const projectIndex = allProjects.findIndex(p => p.id === id)
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null
  const nextProject = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null

  return (
    <div className="bg-white text-slate-900">
      <Navbar />

      <main className="pt-20">
        {/* Hero Image */}
        <Reveal>
          <section className="w-full aspect-[16/9] overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${project.image}')` }}
            />
          </section>
        </Reveal>

        {/* Project Header */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <Reveal>
            <h2 className="font-heading font-bold text-6xl md:text-8xl mb-8">{project.title}</h2>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-1">Loại hình</span>
                <span className="text-sm font-medium tracking-widest uppercase">{project.type}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-1">Thời gian</span>
                <span className="text-sm font-medium tracking-widest uppercase">{project.date}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-1">Lĩnh vực</span>
                <span className="text-sm font-medium tracking-widest uppercase">{project.field}</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Description Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-16">
            <Reveal className="md:col-span-6">
              <h3 className="font-heading text-2xl mb-8 uppercase tracking-widest text-primary">Overview</h3>
              <p className="text-xl leading-relaxed text-slate-600">{project.description}</p>
            </Reveal>
            <Reveal className="md:col-span-4 space-y-8">
              <div className="border-l-2 border-slate-200 pl-6">
                <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-2">Duration</p>
                <p className="text-2xl font-bold font-heading">{project.duration}</p>
              </div>
              <div className="border-l-2 border-slate-200 pl-6">
                <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-2">Stack</p>
                <p className="text-2xl font-bold font-heading">{project.stack}</p>
              </div>
              <div className="border-l-2 border-slate-200 pl-6">
                <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-2">Lighthouse</p>
                <p className="text-2xl font-bold font-heading">{project.lighthouse} Score</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
          <Reveal>
            <h3 className="font-heading font-bold text-4xl mb-8 uppercase">THÁCH THỨC</h3>
            <p className="text-lg leading-relaxed text-slate-600">{project.challenge}</p>
          </Reveal>
          <Reveal>
            <h3 className="font-heading font-bold text-4xl mb-8 uppercase">GIẢI PHÁP</h3>
            <p className="text-lg leading-relaxed text-slate-600">{project.solution}</p>
          </Reveal>
        </section>

        {/* Gallery */}
        {project.gallery.length >= 3 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal className="md:col-span-2 aspect-[4/3] bg-slate-200 overflow-hidden">
                <img className="w-full h-full object-cover grayscale-hover" alt={`${project.title} — main`} src={project.gallery[0]} />
              </Reveal>
              <div className="flex flex-col gap-6">
                <Reveal className="flex-1 bg-slate-200 overflow-hidden">
                  <img className="w-full h-full object-cover grayscale-hover" alt={`${project.title} — detail`} src={project.gallery[1]} />
                </Reveal>
                <Reveal className="flex-1 bg-slate-200 overflow-hidden">
                  <img className="w-full h-full object-cover grayscale-hover" alt={`${project.title} — secondary`} src={project.gallery[2]} />
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* Tech Tags */}
        <Reveal>
          <section className="max-w-7xl mx-auto px-6 py-16 flex flex-wrap gap-4 justify-center">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="px-6 py-2 border border-slate-200 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-primary hover:text-white transition-colors"
              >
                {tag}
              </span>
            ))}
          </section>
        </Reveal>

        {/* Project Navigation */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200">
          <div className="grid grid-cols-2 gap-10">
            {prevProject ? (
              <Link to={`/du-an/${prevProject.id}`} className="group">
                <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-4">← DỰ ÁN TRƯỚC</p>
                <h4 className="font-heading font-bold text-2xl md:text-4xl group-hover:text-primary transition-colors">{prevProject.title}</h4>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link to={`/du-an/${nextProject.id}`} className="group text-right border-l border-slate-200">
                <p className="text-[10px] font-medium tracking-widest text-slate-400 uppercase mb-4">DỰ ÁN TIẾP →</p>
                <h4 className="font-heading font-bold text-2xl md:text-4xl group-hover:text-primary transition-colors">{nextProject.title}</h4>
              </Link>
            ) : <div />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
