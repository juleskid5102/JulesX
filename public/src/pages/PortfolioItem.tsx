import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

/**
 * PortfolioItem — Case Study Detail
 * Image-heavy editorial layout:
 *   Hero → Intro+Meta → 01 Strategy (3 images) →
 *   Gallery (4 portrait) → Tech Stack →
 *   02 Development (code+lighthouse+video) → Metrics →
 *   Extra gallery → CTA → Prev/Next
 */

/* ── Local Image Overrides ── */
const IMAGE_MAP: Record<string, string> = {
  'd-home': '/images/projects/dhome-hero.png',
  'dhome': '/images/projects/dhome-hero.png',
  'mam-cung-thanh-huan': '/images/projects/mamcung-hero.png',
  'mamcung': '/images/projects/mamcung-hero.png',
  'ha-vy-portfolio': '/images/projects/havy-hero.png',
  'havy': '/images/projects/havy-hero.png',
  'he-thong-quan-ly-phong-kham': '/images/projects/minhkhang-hero.png',
  'minh-khang-clinic': '/images/projects/minhkhang-hero.png',
  'minhkhang': '/images/projects/minhkhang-hero.png',
  'jules-atelier': '/images/projects/jules-atelier-hero.png',
  'jules-oasis': '/images/projects/jules-oasis-hero.png',
  'jules-ecosystem-hub': '/images/projects/jules-hub-hero.png',
}

const GALLERY_MAP: Record<string, string[]> = {
  'd-home': Array.from({ length: 6 }, (_, i) => `/images/projects/dhome-gallery-${i + 1}.jpg`),
  'dhome': Array.from({ length: 6 }, (_, i) => `/images/projects/dhome-gallery-${i + 1}.jpg`),
  'mam-cung-thanh-huan': Array.from({ length: 6 }, (_, i) => `/images/projects/mamcung-gallery-${i + 1}.jpg`),
  'mamcung': Array.from({ length: 6 }, (_, i) => `/images/projects/mamcung-gallery-${i + 1}.jpg`),
  'ha-vy-portfolio': Array.from({ length: 6 }, (_, i) => `/images/projects/havy-gallery-${i + 1}.jpg`),
  'havy': Array.from({ length: 6 }, (_, i) => `/images/projects/havy-gallery-${i + 1}.jpg`),
  'he-thong-quan-ly-phong-kham': Array.from({ length: 6 }, (_, i) => `/images/projects/minhkhang-gallery-${i + 1}.jpg`),
  'minh-khang-clinic': Array.from({ length: 6 }, (_, i) => `/images/projects/minhkhang-gallery-${i + 1}.jpg`),
  'minhkhang': Array.from({ length: 6 }, (_, i) => `/images/projects/minhkhang-gallery-${i + 1}.jpg`),
}

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
        const mapped: Project[] = list.map((p: any) => {
          const slug = p.slug || p.id || ''
          return {
            id: p.id || slug,
            slug,
            title: p.title || p.name || '',
            category: p.category || '',
            designStyle: p.designStyle || '',
            completedAt: p.completedAt || p.date || '',
            image: IMAGE_MAP[slug] || p.image || p.thumbnail || '',
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
            gallery: GALLERY_MAP[slug] || p.gallery || [],
            techTags: p.techTags || [],
            liveUrl: p.liveUrl || '',
          }
        })
        setAllProjects(mapped)
        setProject(mapped.find((p) => p.id === id || p.slug === id) || null)
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [id])

  // GSAP scroll-reveal
  useEffect(() => {
    if (!pageRef.current || !project) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      pageRef.current?.querySelectorAll('.cs-reveal')?.forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })
    }
    const t = setTimeout(init, 100)
    return () => clearTimeout(t)
  }, [project])

  if (loading) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div></>
  )

  if (!project) return (
    <><Navbar /><div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-6">
      <h1 className="font-heading text-4xl font-bold text-text">Dự án không tồn tại</h1>
      <Link to="/du-an" className="text-accent hover:underline font-medium">← Quay lại</Link>
    </div></>
  )

  const idx = allProjects.findIndex(p => p.id === id || p.slug === id)
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null

  const g = project.gallery || []
  const phase1Imgs = g.slice(0, 3)
  const showcaseImgs = g.slice(0, 4)
  const phase2Img = g[3] || g[0] || project.image
  const extraImgs = g.slice(4)

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
        <main className="pt-20 bg-bg">

          {/* ════════ HERO ════════ */}
          <section className="relative w-full aspect-[16/9] max-h-[80vh] overflow-hidden bg-bg-dark">
            <img
              className="w-full h-full object-cover opacity-70"
              src={project.image} alt={project.title} loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-20">
              <h1
                className="font-heading font-bold text-text-inverse leading-[1.0] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
              >
                {project.title}
              </h1>
              <p className="mt-3 text-text-inverse/50 text-lg font-body italic">— JulesX</p>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
              <div className="w-8 h-8 border border-text-inverse/30 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-text-inverse/50 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                </svg>
              </div>
            </div>
          </section>

          {/* ════════ INTRO + META ════════ */}
          <section className="cs-reveal px-6 md:px-10 py-16 md:py-20 max-w-6xl mx-auto">
            <p className="font-body text-text-muted leading-[1.8] italic mb-10"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)' }}>
              {project.overview || project.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-border pt-8">
              {project.field && <div><span className="label-caps text-text-light block mb-1">Lĩnh vực</span><span className="text-text font-semibold text-sm">{project.field}</span></div>}
              {project.completedAt && <div><span className="label-caps text-text-light block mb-1">Hoàn thành</span><span className="text-text font-semibold text-sm">{project.completedAt}</span></div>}
              {project.duration && <div><span className="label-caps text-text-light block mb-1">Thời gian</span><span className="text-text font-semibold text-sm">{project.duration}</span></div>}
              {project.designStyle && <div><span className="label-caps text-text-light block mb-1">Phong cách</span><span className="text-text font-semibold text-sm">{project.designStyle}</span></div>}
              {project.liveUrl && <div><span className="label-caps text-text-light block mb-1">Website</span>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="text-accent font-semibold text-sm hover:underline inline-flex items-center gap-1">
                  Xem trực tuyến <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a></div>}
            </div>
          </section>

          {/* ════════ 01 ──── CHIẾN LƯỢC & THIẾT KẾ ════════ */}
          <section className="px-6 md:px-10 pb-16 max-w-7xl mx-auto">
            <div className="cs-reveal flex items-center gap-4 mb-8">
              <span className="font-heading font-bold text-text" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1 }}>01</span>
              <div className="flex-1 h-[1px] bg-border" />
              <h2 className="font-heading text-base md:text-lg font-bold text-text uppercase tracking-[0.1em]">Chiến Lược & Thiết Kế</h2>
            </div>

            {/* 3-image strip */}
            <div className="cs-reveal grid grid-cols-1 md:grid-cols-3 gap-3">
              {phase1Imgs.length > 0 ? phase1Imgs.map((img, i) => (
                <div key={i} className="overflow-hidden aspect-[4/3] bg-bg-alt">
                  <img src={img} alt={`${project.title} design ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                </div>
              )) : (
                <div className="md:col-span-3 overflow-hidden aspect-[21/9] bg-bg-alt">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </section>

          {/* ════════ GALLERY SHOWCASE ════════ */}
          <section className="bg-bg-alt">
            {showcaseImgs.length > 0 && (
              <div className="cs-reveal px-6 md:px-10 py-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {showcaseImgs.map((img, i) => (
                    <div key={i} className="overflow-hidden aspect-[3/4] bg-bg">
                      <img src={img} alt={`${project.title} showcase ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack cards */}
            {project.techTags.length > 0 && (
              <div className="cs-reveal px-6 md:px-10 pb-16 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-5 border-t border-b border-border py-3">
                  <span className="label-caps text-text-muted tracking-[0.2em]">Tech Stack & Interaction</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {project.techTags.map((tag) => (
                    <div key={tag} className="flex-shrink-0 border border-border bg-bg px-5 py-3 hover:border-accent transition-colors duration-300">
                      <p className="label-caps text-text">{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ════════ 02 ──── PHÁT TRIỂN & HIỆU ỨNG ════════ */}
          <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
            <div className="cs-reveal flex items-center gap-4 mb-8">
              <span className="font-heading font-bold text-text" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1 }}>02</span>
              <div className="flex-1 h-[1px] bg-border" />
              <h2 className="font-heading text-base md:text-lg font-bold text-text uppercase tracking-[0.1em]">Phát Triển & Hiệu Ứng</h2>
            </div>

            {/* 3-panel: code + lighthouse + image */}
            <div className="cs-reveal grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Code editor */}
              <div className="bg-bg-dark p-6 aspect-[4/3] flex flex-col overflow-hidden">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 space-y-1.5 font-mono text-xs">
                  <p className="text-accent/70">{'// '}{project.title}</p>
                  <p className="text-text-inverse/40">import <span className="text-green-400/80">{'{ render }'}</span> from <span className="text-accent/60">'react-dom'</span></p>
                  <p className="text-text-inverse/40">import <span className="text-green-400/80">App</span> from <span className="text-accent/60">'./App'</span></p>
                  <p className="text-text-inverse/20 mt-2">{'// Performance optimized build'}</p>
                  <p className="text-text-inverse/40">const root = <span className="text-blue-400/70">createRoot</span>(...)</p>
                  <p className="text-text-inverse/40">root.<span className="text-blue-400/70">render</span>({'<'}<span className="text-accent/70">App</span>{' />'} )</p>
                  {project.stack && <p className="text-text-inverse/20 mt-2">{'// Stack: '}{project.stack}</p>}
                </div>
              </div>

              {/* Lighthouse */}
              <div className="bg-bg-alt flex flex-col items-center justify-center aspect-[4/3] p-8">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#E8E2D8" strokeWidth="4" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#22C55E" strokeWidth="4" strokeDasharray="339.3" strokeDashoffset="0" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-3xl font-bold text-green-600">{project.lighthouse || '100'}</span>
                  </div>
                </div>
                <p className="text-green-600 font-bold text-sm mt-3 uppercase tracking-wider">Perfect</p>
                <p className="font-heading text-xl font-bold text-text mt-1">100/100</p>
                <p className="label-caps text-text-light mt-1">Lighthouse Score</p>
              </div>

              {/* Video/image preview */}
              <div className="relative overflow-hidden aspect-[4/3] bg-bg-dark group cursor-pointer">
                <img src={phase2Img} alt={`${project.title} dev`}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-[1.05] transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-bg/80 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                    <svg className="w-5 h-5 text-text ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="cs-reveal grid grid-cols-3 gap-[1px] bg-border mt-3">
              <div className="bg-bg py-6 text-center">
                <p className="font-heading text-2xl md:text-3xl font-bold text-text">100%</p>
                <p className="label-caps text-text-light mt-1">Responsive</p>
              </div>
              <div className="bg-bg py-6 text-center">
                <p className="font-heading text-2xl md:text-3xl font-bold text-text">&lt;1s</p>
                <p className="label-caps text-text-light mt-1">Load Time</p>
              </div>
              <div className="bg-bg py-6 text-center">
                <p className="font-heading text-2xl md:text-3xl font-bold text-text">A+</p>
                <p className="label-caps text-text-light mt-1">Security</p>
              </div>
            </div>
          </section>

          {/* ════════ EXTRA GALLERY ════════ */}
          {extraImgs.length > 0 && (
            <section className="cs-reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {extraImgs.map((img, i) => (
                  <div key={i} className="overflow-hidden aspect-[16/10]">
                    <img src={img} alt={`${project.title} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════════ CTA ════════ */}
          <section className="bg-bg-dark px-6 md:px-10 py-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 cs-reveal">
              <h2 className="font-heading font-bold text-text-inverse leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                Sẵn sàng cho dự án<br /><span className="text-accent">tiếp theo?</span>
              </h2>
              <Link to="/bat-dau-du-an" className="btn-gold btn-press inline-flex flex-shrink-0">
                Bắt Đầu Dự Án
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* ════════ PREV / NEXT ════════ */}
          <section className="border-t border-border">
            <div className="max-w-7xl mx-auto grid grid-cols-2">
              {prev ? (
                <Link to={`/du-an/${prev.slug || prev.id}`}
                  className="group flex flex-col gap-2 p-8 md:p-12 border-r border-border hover:bg-bg-alt transition-colors">
                  <span className="label-caps text-text-light">← Trước đó</span>
                  <span className="font-heading text-lg font-bold text-text group-hover:text-accent transition-colors">{prev.title}</span>
                </Link>
              ) : <div className="p-8 md:p-12 border-r border-border" />}
              {next ? (
                <Link to={`/du-an/${next.slug || next.id}`}
                  className="group flex flex-col items-end gap-2 p-8 md:p-12 hover:bg-bg-alt transition-colors">
                  <span className="label-caps text-text-light">Tiếp theo →</span>
                  <span className="font-heading text-lg font-bold text-text group-hover:text-accent transition-colors">{next.title}</span>
                </Link>
              ) : <div className="p-8 md:p-12" />}
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
