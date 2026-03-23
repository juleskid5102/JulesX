import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

/**
 * PortfolioItem — Case Study detail page
 * Matched to Stitch v3 (03-case-study.html)
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
        const found = mapped.find((p) => p.id === id || p.slug === id)
        setProject(found || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-48">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </>
    )
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-stone-900 font-display">Dự án không tồn tại</h1>
            <Link to="/du-an" className="text-primary hover:underline font-display">← Quay lại danh sách dự án</Link>
          </div>
        </div>
      </>
    )
  }

  const projectIndex = allProjects.findIndex(p => p.id === id || p.slug === id)
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null
  const nextProject = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null

  // Extract category for italic display
  const titleParts = project.title.includes('—')
    ? project.title.split('—').map(s => s.trim())
    : project.title.includes('-')
    ? project.title.split('-').map(s => s.trim())
    : [project.title]

  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Hero Image with browser chrome — Stitch v3 */}
        <ScrollReveal>
          <section className="px-6 py-12 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-stone-100 shadow-2xl ring-1 ring-stone-200">
                <div className="flex h-8 w-full items-center gap-1.5 bg-stone-200 px-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                </div>
                <img
                  className="w-full h-[calc(100%-2rem)] object-cover"
                  alt={project.title}
                  src={project.image}
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Back link + Title + Tags + Stats — Stitch v3 */}
        <section className="px-6 py-10 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <Link
                to="/du-an"
                className="group inline-flex items-center text-sm font-medium text-stone-500 hover:text-primary transition-colors font-display"
              >
                <span className="material-symbols-outlined mr-2 text-base transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
                Tất cả dự án
              </Link>
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-4xl font-[800] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl font-display">
                    {titleParts[0]}
                    {titleParts[1] && (
                      <>
                        {' — '}
                        <span className="text-primary/80 italic">{titleParts[1]}</span>
                      </>
                    )}
                  </h1>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {project.designStyle && (
                      <span className="text-sm font-semibold text-stone-500 font-display">{project.designStyle}</span>
                    )}
                    {project.field && (
                      <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary font-display">
                        {project.field}
                      </span>
                    )}
                    {project.category && project.category !== project.field && (
                      <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary font-display">
                        {project.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-8 border-t border-stone-200 pt-6 lg:border-t-0 lg:pt-0">
                  {project.completedAt && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-display">Hoàn thành</span>
                      <span className="text-sm font-semibold text-stone-600 font-display">{project.completedAt}</span>
                    </div>
                  )}
                  {project.stack && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-display">Stack</span>
                      <span className="text-sm font-semibold text-stone-600 font-display">{project.stack}</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Overview + Stat Cards — Stitch v3 (6:4 grid) */}
        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-10">
              <ScrollReveal className="lg:col-span-6">
                <h3 className="text-2xl font-bold text-stone-900 font-display">Tổng Quan</h3>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-600 font-display">
                  <p>{project.description}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal className="grid grid-cols-2 gap-4 lg:col-span-4">
                {project.lighthouse && (
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400 font-display">Lighthouse</p>
                    <p className="mt-2 text-4xl font-black text-primary font-display">{project.lighthouse}</p>
                  </div>
                )}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 font-display">Số trang</p>
                  <p className="mt-2 text-4xl font-black text-primary font-display">12</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 font-display mb-3">Tính năng</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techTags.length > 0 ? (
                      project.techTags.map((tag) => (
                        <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary font-display">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary font-display">Responsive</span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary font-display">SEO</span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary font-display">PWA</span>
                      </>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Challenge & Solution — Stitch v3 (cards with icons) */}
        {(project.challenge || project.solution) && (
          <section className="bg-[#F5F5F0] px-6 py-24 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {project.challenge && (
                  <ScrollReveal>
                    <div className="rounded-2xl bg-white/50 p-8 lg:p-12">
                      <div className="flex w-12 h-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                        <span className="material-symbols-outlined">warning</span>
                      </div>
                      <h3 className="mt-6 text-2xl font-bold text-stone-900 font-display">Thách Thức</h3>
                      <p className="mt-4 leading-relaxed text-stone-600 font-display">{project.challenge}</p>
                    </div>
                  </ScrollReveal>
                )}
                {project.solution && (
                  <ScrollReveal delay={100}>
                    <div className="rounded-2xl bg-primary/5 p-8 lg:p-12">
                      <div className="flex w-12 h-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                        <span className="material-symbols-outlined">lightbulb</span>
                      </div>
                      <h3 className="mt-6 text-2xl font-bold text-stone-900 font-display">Giải Pháp</h3>
                      <p className="mt-4 leading-relaxed text-stone-600 font-display">{project.solution}</p>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Multi-platform Showcase — Stitch v3 */}
        <section className="px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl text-center">
            <ScrollReveal>
              <h3 className="text-3xl font-bold tracking-tight text-stone-900 font-display">Thiết Kế Đa Nền Tảng</h3>
              <p className="mt-4 text-stone-500 font-display">Trải nghiệm đồng nhất trên mọi thiết bị từ máy tính đến điện thoại di động.</p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="mt-16 flex flex-col items-end justify-center gap-8 md:flex-row md:items-center">
                {/* Tablet — left */}
                <div className="relative w-80 shrink-0 overflow-hidden rounded-2xl border-[4px] border-stone-800 bg-stone-800 shadow-xl md:order-1">
                  <div className="aspect-[4/3] w-full bg-stone-200">
                    <img
                      className="w-full h-full object-cover"
                      alt={`${project.title} — tablet`}
                      src={project.gallery?.[1] || project.image}
                    />
                  </div>
                </div>
                {/* Desktop — center */}
                <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-stone-100 shadow-2xl md:order-2">
                  <div className="bg-stone-200 px-4 py-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="aspect-video w-full">
                    <img
                      className="w-full h-full object-cover"
                      alt={`${project.title} — desktop`}
                      src={project.image}
                    />
                  </div>
                </div>
                {/* Mobile — right */}
                <div className="relative w-48 shrink-0 overflow-hidden rounded-[2.5rem] border-[6px] border-stone-900 bg-stone-900 shadow-2xl md:order-3">
                  <div className="aspect-[9/19.5] w-full bg-stone-200">
                    <img
                      className="w-full h-full object-cover"
                      alt={`${project.title} — mobile`}
                      src={project.gallery?.[2] || project.image}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tech Tags */}
        {project.techTags.length > 0 && (
          <ScrollReveal>
            <section className="max-w-7xl mx-auto px-6 py-16 flex flex-wrap gap-3 justify-center">
              {project.techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase hover:bg-primary hover:text-white transition-colors duration-300 font-display"
                >
                  {tag}
                </span>
              ))}
            </section>
          </ScrollReveal>
        )}

        {/* CTA — Có dự án tương tự? */}
        <section className="px-6 py-24 lg:px-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="text-3xl font-bold tracking-tight text-stone-900 font-display">Có dự án tương tự?</h3>
              <p className="mt-4 text-stone-500 font-display">Hãy chia sẻ ý tưởng của bạn — chúng tôi sẵn sàng tư vấn và hiện thực hóa.</p>
              <Link
                to="/bat-dau-du-an"
                className="mt-8 inline-block bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all font-display"
              >
                Bắt Đầu Dự Án
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Prev / Next Navigation — Stitch v3 */}
        <section className="border-y border-stone-200 px-6 py-12 lg:px-10">
          <div className="mx-auto flex max-w-7xl justify-between">
            {prevProject ? (
              <Link
                to={`/du-an/${prevProject.slug || prevProject.id}`}
                className="group flex flex-col items-start gap-2"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 font-display">Trước đó</span>
                <div className="flex items-center text-sm font-semibold text-stone-600 transition-colors group-hover:text-primary font-display">
                  <span className="material-symbols-outlined mr-2">arrow_back</span>
                  {prevProject.title}
                </div>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link
                to={`/du-an/${nextProject.slug || nextProject.id}`}
                className="group flex flex-col items-end gap-2"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 font-display">Tiếp theo</span>
                <div className="flex items-center text-sm font-semibold text-stone-600 transition-colors group-hover:text-primary font-display">
                  {nextProject.title}
                  <span className="material-symbols-outlined ml-2">arrow_forward</span>
                </div>
              </Link>
            ) : <div />}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
