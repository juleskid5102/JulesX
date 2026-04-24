import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

/**
 * PortfolioItem — Chi Tiết Dự Án (Case Study)
 *
 * Layout editorial IMAGE-HEAVY theo reference screen.png:
 *   Hero → Intro ngắn → 01 Strategy (gallery strip 3 ảnh)
 *   → 02 Design (full gallery) → Tech Stack cards
 *   → 03 Development (code + lighthouse + video)
 *   → 04 Motion (dark section)
 *   → CTA → Prev/Next
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
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [id])

  // GSAP scroll-reveal
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

  /* ── Loading ── */
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

  /* ── Not Found ── */
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

  /* Gallery split for phases */
  const g = project.gallery || []
  const phaseDesignImages = g.slice(0, 3)    // First 3 for Phase 01
  const phaseDevImages = g.slice(3, 6)       // Next 3 for Phase 02
  const remainingImages = g.slice(6)         // Rest for gallery

  return (
    <>
      <Navbar />

      <div ref={pageRef}>
        <main className="pt-20 bg-bg">

          {/* ═══════════════════════════════════════
              HERO — Immersive Cover (like reference)
              ═══════════════════════════════════════ */}
          <section className="case-reveal">
            <div className="relative w-full aspect-[16/9] max-h-[80vh] overflow-hidden bg-bg-dark">
              <img
                className="w-full h-full object-cover opacity-70"
                alt={project.title}
                src={project.image}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-20">
                <h1
                  className="font-heading font-bold text-text-inverse leading-[1.0] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
                >
                  {project.title}
                </h1>
                <p className="mt-3 text-text-inverse/50 text-lg font-body italic">
                  — JulesX
                </p>
              </div>
              {/* Scroll chevron */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
                <div className="w-8 h-8 border border-text-inverse/30 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-text-inverse/50 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              INTRO — Short description (2-3 lines max)
              ═══════════════════════════════════════ */}
          <section className="px-6 md:px-10 py-16 md:py-24 max-w-5xl mx-auto case-reveal">
            <p
              className="font-body text-text-muted leading-[1.8] italic"
              style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' }}
            >
              {project.overview || project.description}
            </p>
          </section>

          {/* ═══════════════════════════════════════
              01 STRATEGY & DESIGN — Gallery strip
              ═══════════════════════════════════════ */}
          <section className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
            {/* Phase header — big number + title like reference */}
            <div className="case-reveal flex items-baseline gap-4 mb-8">
              <span
                className="font-heading font-bold text-text leading-none"
                style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}
              >
                01
              </span>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-text uppercase tracking-[0.05em]">
                Chiến Lược & Thiết Kế
              </h2>
            </div>

            {/* 3-image strip — landscape / mockup / detail (like reference) */}
            <div className="case-reveal grid grid-cols-1 md:grid-cols-3 gap-3">
              {phaseDesignImages.length > 0 ? (
                phaseDesignImages.map((img, i) => (
                  <div key={i} className="overflow-hidden aspect-[4/3] bg-bg-alt">
                    <img
                      src={img}
                      alt={`${project.title} — design ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                ))
              ) : (
                /* Fallback: use hero image in different crops */
                <>
                  <div className="overflow-hidden aspect-[4/3] bg-bg-alt">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-left hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="overflow-hidden aspect-[4/3] bg-bg-alt">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="overflow-hidden aspect-[4/3] bg-bg-alt">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-right hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ═══════════════════════════════════════
              RIGHT COLUMN AREA — Gallery + Tech Stack
              Mimics the reference right-side with
              gallery strip above + tech cards below
              ═══════════════════════════════════════ */}
          <section className="bg-bg-alt">
            {/* Top gallery strip — phone mockups style */}
            {g.length > 0 && (
              <div className="case-reveal px-6 md:px-10 pt-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {g.slice(0, 4).map((img, i) => (
                    <div key={i} className="overflow-hidden aspect-[3/4] bg-bg">
                      <img
                        src={img}
                        alt={`${project.title} — showcase ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TECH STACK & INTERACTION — horizontal cards (like reference) */}
            {project.techTags.length > 0 && (
              <div className="case-reveal px-6 md:px-10 py-12 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6 border-t border-b border-border py-3">
                  <span className="label-caps text-text-muted tracking-[0.2em]">Tech Stack & Interaction</span>
                  <div className="flex gap-2">
                    <span className="text-text-light">←</span>
                    <span className="text-text-light">→</span>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {project.techTags.map((tag) => (
                    <div
                      key={tag}
                      className="flex-shrink-0 w-44 border border-border bg-bg p-5 hover:border-accent transition-colors duration-300"
                    >
                      {/* Tech icon placeholder */}
                      <div className="w-full aspect-[16/10] bg-bg-alt mb-3 flex items-center justify-center">
                        <span className="text-text-light text-xs uppercase tracking-wider">{tag.charAt(0)}</span>
                      </div>
                      <p className="label-caps text-text text-center">{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ═══════════════════════════════════════
              02 DEVELOPMENT & MOTION
              Code editor + Lighthouse + Video (like reference)
              ═══════════════════════════════════════ */}
          <section className="px-6 md:px-10 py-20 md:py-28 max-w-7xl mx-auto">
            {/* Phase header */}
            <div className="case-reveal flex items-baseline gap-4 mb-8">
              <span
                className="font-heading font-bold text-text leading-none"
                style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}
              >
                02
              </span>
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-text uppercase tracking-[0.05em]">
                  Phát Triển
                </h2>
                <p className="font-heading text-xl md:text-2xl font-bold text-text uppercase tracking-[0.05em]">
                  & Hiệu Ứng
                </p>
              </div>
            </div>

            {/* 3-column visual grid: code + lighthouse + video (like reference) */}
            <div className="case-reveal grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Code editor visual */}
              <div className="bg-bg-dark p-6 md:col-span-1 aspect-[4/3] flex flex-col justify-between overflow-hidden">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60"></div>
                </div>
                <div className="flex-1 space-y-2 font-mono text-xs">
                  <p className="text-accent/70">{'// ' + project.title}</p>
                  <p className="text-text-inverse/40">import <span className="text-green-400/80">{'{ render }'}</span> from <span className="text-accent/60">'react-dom'</span></p>
                  <p className="text-text-inverse/40">import <span className="text-green-400/80">App</span> from <span className="text-accent/60">'./App'</span></p>
                  <p className="text-text-inverse/20 mt-2">{'// Performance optimized'}</p>
                  <p className="text-text-inverse/40">const root = <span className="text-blue-400/70">createRoot</span>(<span className="text-accent/60">document.getElementById</span>(<span className="text-green-400/60">'root'</span>))</p>
                  <p className="text-text-inverse/40">root.<span className="text-blue-400/70">render</span>({'<'}<span className="text-accent/70">App</span> {'/>'} )</p>
                  {project.stack && (
                    <p className="text-text-inverse/20 mt-3">{'// Stack: '}{project.stack}</p>
                  )}
                </div>
              </div>

              {/* Lighthouse score badge */}
              <div className="bg-bg-alt flex flex-col items-center justify-center aspect-[4/3] p-8">
                {/* Circular score */}
                <div className="relative w-28 h-28 md:w-32 md:h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#E8E2D8" strokeWidth="4" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#22C55E" strokeWidth="4" strokeDasharray="339.3" strokeDashoffset="0" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-3xl md:text-4xl font-bold text-green-600">
                      {project.lighthouse || '100'}
                    </span>
                  </div>
                </div>
                <p className="text-green-600 font-bold text-sm mt-4 uppercase tracking-wider">Perfect</p>
                <p className="font-heading text-2xl font-bold text-text mt-1">100/100</p>
                <p className="label-caps text-text-light mt-2">Lighthouse Score</p>
              </div>

              {/* Video/motion preview */}
              <div className="relative overflow-hidden aspect-[4/3] bg-bg-dark group cursor-pointer">
                {phaseDevImages.length > 0 ? (
                  <img
                    src={phaseDevImages[0]}
                    alt={`${project.title} — development`}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-[1.05] transition-transform duration-700"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-[1.05] transition-transform duration-700"
                    loading="lazy"
                  />
                )}
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-bg/80 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                    <svg className="w-5 h-5 text-text ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stats row */}
            <div className="case-reveal grid grid-cols-3 gap-[1px] bg-border mt-3">
              <div className="bg-bg py-6 text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-text">100%</p>
                <p className="label-caps text-text-light mt-1">Responsive</p>
              </div>
              <div className="bg-bg py-6 text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-text">&lt;1s</p>
                <p className="label-caps text-text-light mt-1">Load Time</p>
              </div>
              <div className="bg-bg py-6 text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-text">A+</p>
                <p className="label-caps text-text-light mt-1">Security</p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              EXTRA GALLERY — Remaining images
              Full-bleed image grid
              ═══════════════════════════════════════ */}
          {remainingImages.length > 0 && (
            <section className="case-reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {remainingImages.map((img, i) => (
                  <div key={i} className="overflow-hidden aspect-[16/10]">
                    <img
                      src={img}
                      alt={`${project.title} — gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════
              META — Project info sidebar
              ═══════════════════════════════════════ */}
          <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto case-reveal">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-border py-8">
              {project.field && (
                <div>
                  <span className="label-caps text-text-light block mb-1">Lĩnh vực</span>
                  <span className="text-text font-semibold text-sm">{project.field}</span>
                </div>
              )}
              {project.completedAt && (
                <div>
                  <span className="label-caps text-text-light block mb-1">Hoàn thành</span>
                  <span className="text-text font-semibold text-sm">{project.completedAt}</span>
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
              {project.liveUrl && (
                <div>
                  <span className="label-caps text-text-light block mb-1">Website</span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Xem trực tuyến
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* ═══════════════════════════════════════
              CTA — Ready for your next build?
              (like reference: text left, button right, dark bg)
              ═══════════════════════════════════════ */}
          <section className="bg-bg-dark px-6 md:px-10 py-20 md:py-28">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 case-reveal">
              <h2
                className="font-heading font-bold text-text-inverse leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
              >
                Sẵn sàng cho dự án<br />
                <span className="text-accent">tiếp theo?</span>
              </h2>
              <Link
                to="/bat-dau-du-an"
                className="btn-gold btn-press inline-flex flex-shrink-0"
              >
                Bắt Đầu Dự Án
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              PREV / NEXT — Project Navigation
              ═══════════════════════════════════════ */}
          <section className="border-t border-border">
            <div className="max-w-7xl mx-auto grid grid-cols-2">
              {prevProject ? (
                <Link
                  to={`/du-an/${prevProject.slug || prevProject.id}`}
                  className="group flex flex-col gap-3 p-8 md:p-12 border-r border-border hover:bg-bg-alt transition-colors duration-300"
                >
                  <span className="label-caps text-text-light">← Trước đó</span>
                  <span className="font-heading text-lg font-bold text-text group-hover:text-accent transition-colors">
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div className="p-8 md:p-12 border-r border-border" />
              )}
              {nextProject ? (
                <Link
                  to={`/du-an/${nextProject.slug || nextProject.id}`}
                  className="group flex flex-col items-end gap-3 p-8 md:p-12 hover:bg-bg-alt transition-colors duration-300"
                >
                  <span className="label-caps text-text-light">Tiếp theo →</span>
                  <span className="font-heading text-lg font-bold text-text group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div className="p-8 md:p-12" />
              )}
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
