import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

/**
 * PortfolioItem — Case Study Detail
 * Reference: screen.png — editorial 2-column layout
 * Numbered sections (01 Strategy, 02 Development), tech stack cards,
 * Lighthouse score badge, gallery grid, CTA.
 */
export default function PortfolioItem() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const pageRef = useRef<HTMLDivElement>(null)

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
          overview: p.overview || '',
          challenge: p.challenge || '',
          solution: p.solution || '',
          duration: p.duration || '',
          stack: p.stack || '',
          lighthouse: p.lighthouse || '',
          gallery: p.gallery || [],
          techTags: p.techTags || [],
          liveUrl: p.liveUrl || '',
        }))
        setAllProjects(mapped)
        const found = mapped.find((p) => p.id === id || p.slug === id)
        setProject(found || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  // GSAP animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!pageRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const els = pageRef.current?.querySelectorAll('.case-reveal')
      if (!els) return

      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }

    init()
  }, [project])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-bg">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      </>
    )
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-6">
          <h1 className="font-heading text-4xl font-bold text-text">Dự án không tồn tại</h1>
          <Link to="/du-an" className="text-accent hover:underline font-medium">
            ← Quay lại danh sách dự án
          </Link>
        </div>
      </>
    )
  }

  const projectIndex = allProjects.findIndex(p => p.id === id || p.slug === id)
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null
  const nextProject = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null

  return (
    <>
      <Navbar />

      <div ref={pageRef}>
        <main className="pt-20 bg-bg">
          {/* ─── Hero ─── */}
          <section className="case-reveal">
            <div className="relative w-full aspect-[16/9] max-h-[70vh] overflow-hidden bg-bg-dark">
              <img
                className="w-full h-full object-cover opacity-80"
                alt={project.title}
                src={project.image}
                loading="eager"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-bg-dark/20 to-transparent" />
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                {project.field && (
                  <span className="label-caps text-accent mb-4 block">
                    {project.field}
                  </span>
                )}
                <h1
                  className="font-heading font-bold text-text-inverse leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  {project.title}
                </h1>
              </div>
            </div>
          </section>

          {/* ─── Back + Meta ─── */}
          <section className="px-6 md:px-10 py-10 max-w-7xl mx-auto case-reveal">
            <Link
              to="/du-an"
              className="group inline-flex items-center text-sm font-medium text-text-muted hover:text-accent transition-colors gap-2 mb-10"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Tất cả dự án
            </Link>

            {/* Meta row */}
            <div className="flex flex-wrap gap-8 border-b border-border pb-8">
              {project.completedAt && (
                <div>
                  <span className="label-caps text-text-light block mb-1">Hoàn thành</span>
                  <span className="text-text font-semibold text-sm">{project.completedAt}</span>
                </div>
              )}
              {project.field && (
                <div>
                  <span className="label-caps text-text-light block mb-1">Lĩnh vực</span>
                  <span className="text-text font-semibold text-sm">{project.field}</span>
                </div>
              )}
              {project.duration && (
                <div>
                  <span className="label-caps text-text-light block mb-1">Thời gian</span>
                  <span className="text-text font-semibold text-sm">{project.duration}</span>
                </div>
              )}
              {project.designStyle && (
                <div>
                  <span className="label-caps text-text-light block mb-1">Phong cách</span>
                  <span className="text-text font-semibold text-sm">{project.designStyle}</span>
                </div>
              )}
            </div>
          </section>

          {/* ─── 01 Overview ─── */}
          <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto case-reveal">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="font-heading text-5xl font-bold text-border">01</span>
                <h2 className="font-heading text-xl font-bold text-text mt-2">Strategy & Design</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-text-muted text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                {project.overview && (
                  <p className="text-text-muted leading-relaxed">
                    {project.overview}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ─── Challenge & Solution ─── */}
          {(project.challenge || project.solution) && (
            <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-border">
                {project.challenge && (
                  <div className="case-reveal bg-bg p-10 md:p-14">
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <h3 className="font-heading text-lg font-bold text-text">Thách Thức</h3>
                    </div>
                    <p className="text-text-muted leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="case-reveal bg-bg p-10 md:p-14">
                    <div className="flex items-center gap-3 mb-6">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                      <h3 className="font-heading text-lg font-bold text-text">Giải Pháp</h3>
                    </div>
                    <p className="text-text-muted leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ─── 02 Development ─── */}
          <section className="bg-bg-alt px-6 md:px-10 py-20 grain-overlay">
            <div className="max-w-7xl mx-auto">
              <div className="case-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                <div className="lg:col-span-4">
                  <span className="font-heading text-5xl font-bold text-border">02</span>
                  <h2 className="font-heading text-xl font-bold text-text mt-2">Development & Tech</h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-text-muted leading-relaxed">
                    Xây dựng trên nền tảng công nghệ hiện đại, tối ưu hiệu suất và khả năng mở rộng.
                    {project.stack && ` Tech stack: ${project.stack}.`}
                  </p>
                </div>
              </div>

              {/* Tech Tags as horizontal cards */}
              {project.techTags.length > 0 && (
                <div className="case-reveal flex flex-wrap gap-3 mb-16">
                  {project.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-3 border border-border bg-bg text-text text-sm font-semibold hover:border-accent hover:text-accent transition-colors duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Lighthouse + Stats */}
              <div className="case-reveal grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-border">
                {project.lighthouse && (
                  <div className="bg-bg p-8 text-center">
                    <p className="font-heading text-4xl font-bold text-accent">{project.lighthouse}</p>
                    <p className="label-caps text-text-light mt-2">Lighthouse</p>
                  </div>
                )}
                <div className="bg-bg p-8 text-center">
                  <p className="font-heading text-4xl font-bold text-text">100%</p>
                  <p className="label-caps text-text-light mt-2">Responsive</p>
                </div>
                <div className="bg-bg p-8 text-center">
                  <p className="font-heading text-4xl font-bold text-text">&lt;1s</p>
                  <p className="label-caps text-text-light mt-2">Load Time</p>
                </div>
                <div className="bg-bg p-8 text-center">
                  <p className="font-heading text-4xl font-bold text-text">A+</p>
                  <p className="label-caps text-text-light mt-2">Security</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Gallery ─── */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
              <div className="case-reveal mb-12">
                <p className="label-caps text-accent mb-4">Gallery</p>
                <h2 className="font-heading text-2xl font-bold text-text">Thiết Kế Đa Nền Tảng</h2>
              </div>
              <div className="case-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((img, i) => (
                  <div key={i} className={`overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}>
                    <img
                      src={img}
                      alt={`${project.title} — gallery ${i + 1}`}
                      className="w-full h-auto object-cover grayscale-hover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── CTA ─── */}
          <section className="bg-bg-dark py-24 px-6 grain-overlay">
            <div className="max-w-3xl mx-auto text-center case-reveal">
              <h2
                className="font-heading font-bold text-text-inverse mb-6 leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Ready for your next
                <br />
                <span className="text-accent">digital build?</span>
              </h2>
              <p className="text-text-inverse/40 mb-10 max-w-md mx-auto leading-relaxed">
                Hãy chia sẻ ý tưởng — chúng tôi sẵn sàng tư vấn và hiện thực hóa.
              </p>
              <Link
                to="/bat-dau-du-an"
                className="btn-gold btn-press inline-flex"
              >
                Bắt Đầu Dự Án
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* ─── Prev / Next ─── */}
          <section className="border-t border-border px-6 md:px-10 py-12">
            <div className="max-w-7xl mx-auto flex justify-between">
              {prevProject ? (
                <Link
                  to={`/du-an/${prevProject.slug || prevProject.id}`}
                  className="group flex flex-col items-start gap-2"
                >
                  <span className="label-caps text-text-light">Trước đó</span>
                  <div className="flex items-center text-sm font-semibold text-text-muted transition-colors group-hover:text-accent gap-2">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    {prevProject.title}
                  </div>
                </Link>
              ) : <div />}
              {nextProject ? (
                <Link
                  to={`/du-an/${nextProject.slug || nextProject.id}`}
                  className="group flex flex-col items-end gap-2"
                >
                  <span className="label-caps text-text-light">Tiếp theo</span>
                  <div className="flex items-center text-sm font-semibold text-text-muted transition-colors group-hover:text-accent gap-2">
                    {nextProject.title}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              ) : <div />}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
