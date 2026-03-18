import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

/**
 * PortfolioItem — Project detail page, dark theme
 * Fetches from GET /api/public/portfolio
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
        const list = Array.isArray(data) ? data : data.data || []
        const mapped: Project[] = list.map((p: any) => ({
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
        }))
        setAllProjects(mapped)
        setProject(mapped.find((p) => p.id === id) || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-48">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <Navbar />
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
    <div className="bg-black text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero Image */}
        <ScrollReveal>
          <section className="w-full aspect-[16/9] overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${project.image}')` }}
            />
          </section>
        </ScrollReveal>

        {/* Project Header */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-5xl md:text-7xl mb-8">{project.title}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {project.category && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-1">Loại hình</span>
                  <span className="text-sm font-medium tracking-[0.15em] uppercase text-white/80">{project.category}</span>
                </div>
              )}
              {project.designStyle && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-1">Phong cách</span>
                  <span className="text-sm font-medium tracking-[0.15em] uppercase text-white/80">{project.designStyle}</span>
                </div>
              )}
              {project.completedAt && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-1">Hoàn thành</span>
                  <span className="text-sm font-medium tracking-[0.15em] uppercase text-white/80">{project.completedAt}</span>
                </div>
              )}
              {project.field && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-1">Lĩnh vực</span>
                  <span className="text-sm font-medium tracking-[0.15em] uppercase text-white/80">{project.field}</span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* Description Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-16">
            <ScrollReveal className="md:col-span-6">
              <h3 className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-8">Overview</h3>
              <p className="text-xl leading-relaxed text-white/60 font-display">{project.description}</p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1} className="md:col-span-4 space-y-8">
              {project.duration && (
                <div className="border-l-2 border-white/10 pl-6">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-2">Duration</p>
                  <p className="text-2xl font-bold font-heading">{project.duration}</p>
                </div>
              )}
              {project.stack && (
                <div className="border-l-2 border-white/10 pl-6">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-2">Stack</p>
                  <p className="text-2xl font-bold font-heading">{project.stack}</p>
                </div>
              )}
              {project.lighthouse && (
                <div className="border-l-2 border-white/10 pl-6">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-2">Lighthouse</p>
                  <p className="text-2xl font-bold font-heading">{project.lighthouse} Score</p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* Challenge & Solution */}
        {(project.challenge || project.solution) && (
          <section className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
            {project.challenge && (
              <ScrollReveal direction="left">
                <h3 className="font-heading font-bold text-3xl mb-8 uppercase tracking-tight">Thách Thức</h3>
                <p className="text-lg leading-relaxed text-white/50 font-display">{project.challenge}</p>
              </ScrollReveal>
            )}
            {project.solution && (
              <ScrollReveal direction="right" delay={0.15}>
                <h3 className="font-heading font-bold text-3xl mb-8 uppercase tracking-tight">Giải Pháp</h3>
                <p className="text-lg leading-relaxed text-white/50 font-display">{project.solution}</p>
              </ScrollReveal>
            )}
          </section>
        )}

        {/* Gallery */}
        {project.gallery.length >= 3 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <ScrollReveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 aspect-[4/3] overflow-hidden">
                <img className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt={`${project.title} — main`} src={project.gallery[0]} />
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex-1 overflow-hidden">
                  <img className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt={`${project.title} — detail`} src={project.gallery[1]} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <img className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt={`${project.title} — secondary`} src={project.gallery[2]} />
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Tech Tags */}
        {project.techTags.length > 0 && (
          <ScrollReveal>
            <section className="max-w-7xl mx-auto px-6 py-16 flex flex-wrap gap-4 justify-center">
              {project.techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-6 py-2 border border-white/15 text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </section>
          </ScrollReveal>
        )}

        {/* Project Navigation */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
          <div className="grid grid-cols-2 gap-10">
            {prevProject ? (
              <Link to={`/du-an/${prevProject.id}`} className="group">
                <p className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-4">← DỰ ÁN TRƯỚC</p>
                <h4 className="font-heading font-bold text-2xl md:text-3xl group-hover:text-primary transition-colors">{prevProject.title}</h4>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link to={`/du-an/${nextProject.id}`} className="group text-right border-l border-white/10">
                <p className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase mb-4">DỰ ÁN TIẾP →</p>
                <h4 className="font-heading font-bold text-2xl md:text-3xl group-hover:text-primary transition-colors">{nextProject.title}</h4>
              </Link>
            ) : <div />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
