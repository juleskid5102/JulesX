import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

/**
 * PortfolioItem — Case Study v2
 * Restructured layout (no redundant galleries):
 *   Hero → Intro+Meta
 *   → 01 Strategy (text-left + single image-right)
 *   → 02 Design (full-bleed 3-image strip)
 *   → 03 Development (code typing + stats + tech stack)
 *   → Full Gallery (masonry-style)
 *   → CTA → Prev/Next
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

/* ── CountUp hook ── */
function useCountUp(end: number, duration = 2000, trigger = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const startTime = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      start = Math.round(eased * end)
      setVal(start)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, trigger])
  return val
}

/* ── Typing Code Animation ── */
function CodeTyping({ title, stack }: { title: string; stack: string }) {
  const [lines, setLines] = useState<string[]>([])
  const elRef = useRef<HTMLDivElement>(null)

  const codeLines = [
    `// ${title}`,
    `import { createApp } from 'framework'`,
    `import { router } from './routes'`,
    `import { store } from './store'`,
    ``,
    `// Performance optimized build`,
    `const app = createApp({`,
    `  router,`,
    `  store,`,
    `  ssr: true,`,
    `  prefetch: true,`,
    `})`,
    ``,
    stack ? `// Stack: ${stack}` : `// Production ready`,
    `app.mount('#root')`,
  ]

  useEffect(() => {
    if (!elRef.current) return
    let idx = 0
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          const timer = setInterval(() => {
            if (idx < codeLines.length) {
              const line = codeLines[idx] ?? ''
              setLines((prev) => [...prev, line])
              idx++
            } else {
              clearInterval(timer)
            }
          }, 120)
          observer.disconnect()
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(elRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={elRef} className="bg-[#0D0D0D] p-6 md:p-8 h-full flex flex-col overflow-hidden font-mono text-xs md:text-sm">
      <div className="flex gap-1.5 mb-5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex-1 space-y-1 overflow-hidden">
        {lines.map((line, i) => (
          <p key={i} className="whitespace-pre" style={{ animationDelay: `${i * 50}ms` }}>
            <span className="text-text-inverse/20 select-none mr-3 inline-block w-5 text-right">{i + 1}</span>
            {line.startsWith('//') ? (
              <span className="text-text-inverse/30">{line}</span>
            ) : line.includes('import') ? (
              <>
                <span className="text-[#C678DD]">import </span>
                <span className="text-[#E5C07B]">{line.split('import ')[1]?.split(' from')[0]}</span>
                <span className="text-text-inverse/50"> from </span>
                <span className="text-[#98C379]">{line.split("from ")[1]}</span>
              </>
            ) : line.includes(':') && !line.startsWith('//') ? (
              <>
                <span className="text-[#ABB2BF]">  {line.split(':')[0]?.trim()}</span>
                <span className="text-text-inverse/30">: </span>
                <span className="text-[#D19A66]">{line.split(':')[1]?.trim()}</span>
              </>
            ) : (
              <span className="text-[#ABB2BF]">{line}</span>
            )}
          </p>
        ))}
        <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-8" />
      </div>
    </div>
  )
}

export default function PortfolioItem() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [statsVisible, setStatsVisible] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio`)
      .then(async (res) => {
        if (!res.ok) throw new Error('API error')
        const data: any = await res.json()
        const list = Array.isArray(data) ? data : data.data || []
        const mapped: Project[] = list.map((p: any) => {
          const slug = p.slug || p.id || ''
          return {
            id: p.id || slug, slug,
            title: p.title || p.name || '',
            category: p.category || '', designStyle: p.designStyle || '',
            completedAt: p.completedAt || p.date || '',
            image: IMAGE_MAP[slug] || p.image || p.thumbnail || '',
            featured: p.featured, order: p.order,
            field: p.field || '', description: p.description || '',
            overview: p.overview || '', challenge: p.challenge || '',
            solution: p.solution || '', duration: p.duration || '',
            stack: p.stack || '', lighthouse: p.lighthouse || '',
            gallery: GALLERY_MAP[slug] || p.gallery || [],
            techTags: p.techTags || [], liveUrl: p.liveUrl || '',
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
    setTimeout(init, 100)
  }, [project])

  // Stats intersection observer (for count-up)
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver((entries) => { const e = entries[0]; if (e && e.isIntersecting) { setStatsVisible(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [project])

  const lighthouseVal = useCountUp(parseInt(project?.lighthouse || '100') || 100, 1500, statsVisible)
  const responsiveVal = useCountUp(100, 1200, statsVisible)
  const loadVal = useCountUp(95, 1400, statsVisible)

  if (loading) return (
    <><Navbar /><div className="min-h-screen flex items-center justify-center bg-bg"><div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div></>
  )
  if (!project) return (
    <><Navbar /><div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-6"><h1 className="font-heading text-4xl font-bold text-text">Dự án không tồn tại</h1><Link to="/du-an" className="text-accent hover:underline font-medium">← Quay lại</Link></div></>
  )

  const idx = allProjects.findIndex(p => p.id === id || p.slug === id)
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx < allProjects.length - 1 ? allProjects[idx + 1] : null
  const g = project.gallery || []

  return (
    <>
      <Navbar />
      <div ref={pageRef}>
        <main className="pt-20 bg-bg">

          {/* ════════════════════════════════════════════
              HERO — cinematic full-width
              ════════════════════════════════════════════ */}
          <section className="relative w-full aspect-[16/9] max-h-[85vh] overflow-hidden bg-bg-dark">
            <img className="w-full h-full object-cover" src={project.image} alt={project.title} loading="eager"
              style={{ filter: 'brightness(0.55) contrast(1.1)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-bg-dark/30" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
              <p className="label-caps text-accent mb-3">{project.field || project.category}</p>
              <h1 className="font-heading font-bold text-text-inverse leading-[0.95] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
                {project.title}
              </h1>
              <p className="mt-4 text-text-inverse/40 text-lg font-body">— JulesX Case Study</p>
            </div>
          </section>

          {/* ════════════════════════════════════════════
              INTRO + META
              ════════════════════════════════════════════ */}
          <section className="cs-reveal px-6 md:px-10 py-16 md:py-24 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20">
              <div>
                <p className="font-heading text-text leading-[1.6] text-lg md:text-xl">
                  {project.overview || project.description}
                </p>
                {project.challenge && (
                  <p className="mt-6 text-text-muted font-body leading-[1.8]">{project.challenge}</p>
                )}
              </div>
              <div className="space-y-5 border-l border-border pl-8">
                {project.field && <div><span className="label-caps text-text-light block mb-1">Lĩnh vực</span><span className="text-text font-semibold text-sm">{project.field}</span></div>}
                {project.completedAt && <div><span className="label-caps text-text-light block mb-1">Hoàn thành</span><span className="text-text font-semibold text-sm">{project.completedAt}</span></div>}
                {project.duration && <div><span className="label-caps text-text-light block mb-1">Thời gian</span><span className="text-text font-semibold text-sm">{project.duration}</span></div>}
                {project.designStyle && <div><span className="label-caps text-text-light block mb-1">Phong cách</span><span className="text-text font-semibold text-sm">{project.designStyle}</span></div>}
                {project.liveUrl && <div><span className="label-caps text-text-light block mb-1">Website</span>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="text-accent font-semibold text-sm hover:underline inline-flex items-center gap-1">
                    Xem trực tuyến ↗
                  </a></div>}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════
              01 ──── CHIẾN LƯỢC & NGHIÊN CỨU
              Text left + single hero image right
              ════════════════════════════════════════════ */}
          <section className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
            <div className="cs-reveal flex items-center gap-4 mb-12">
              <span className="font-heading font-bold text-accent/20" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.85 }}>01</span>
              <div className="flex-1 h-[1px] bg-border" />
              <h2 className="font-heading text-sm md:text-base font-bold text-text uppercase tracking-[0.15em]">Chiến Lược & Nghiên Cứu</h2>
            </div>
            <div className="cs-reveal grid md:grid-cols-[1fr_1.5fr] gap-10 items-start">
              <div>
                <p className="font-body text-text-muted leading-[1.8]">
                  {project.solution || 'Nghiên cứu sâu, phân tích người dùng và xác định logic cốt lõi trước khi bắt đầu thiết kế. Mỗi quyết định đều dựa trên dữ liệu và mục tiêu thực tế của khách hàng.'}
                </p>
                {project.techTags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.techTags.slice(0, 6).map((tag) => (
                      <span key={tag} className="border border-border px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-accent hover:text-accent transition-colors duration-300">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="overflow-hidden bg-bg-alt">
                <img src={g[0] || project.image} alt={`${project.title} strategy`}
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════
              02 ──── THIẾT KẾ GIAO DIỆN
              Full-bleed 3-image strip
              ════════════════════════════════════════════ */}
          <section className="bg-bg-alt py-20">
            <div className="px-6 md:px-10 max-w-7xl mx-auto">
              <div className="cs-reveal flex items-center gap-4 mb-12">
                <span className="font-heading font-bold text-accent/20" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.85 }}>02</span>
                <div className="flex-1 h-[1px] bg-border" />
                <h2 className="font-heading text-sm md:text-base font-bold text-text uppercase tracking-[0.15em]">Thiết Kế Giao Diện</h2>
              </div>
            </div>
            <div className="cs-reveal grid grid-cols-1 md:grid-cols-3 gap-2 px-2">
              {(g.length >= 3 ? g.slice(0, 3) : [g[0] || project.image, g[1] || project.image, g[2] || project.image]).map((img, i) => (
                <div key={i} className="overflow-hidden aspect-[4/3]">
                  <img src={img} alt={`${project.title} design ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════
              03 ──── PHÁT TRIỂN & KỸ THUẬT
              Code typing animation + Lighthouse count-up + Full video
              ════════════════════════════════════════════ */}
          <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
            <div className="cs-reveal flex items-center gap-4 mb-12">
              <span className="font-heading font-bold text-accent/20" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.85 }}>03</span>
              <div className="flex-1 h-[1px] bg-border" />
              <h2 className="font-heading text-sm md:text-base font-bold text-text uppercase tracking-[0.15em]">Phát Triển & Kỹ Thuật</h2>
            </div>

            {/* Code editor (wide) + Lighthouse (compact) */}
            <div className="cs-reveal grid md:grid-cols-[2fr_1fr] gap-3 mb-3">
              <CodeTyping title={project.title} stack={project.stack} />
              <div className="bg-bg-alt flex flex-col items-center justify-center p-8">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#E8E2D8" strokeWidth="3" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#22C55E" strokeWidth="3"
                      strokeDasharray="326.7"
                      strokeDashoffset={326.7 - (326.7 * lighthouseVal / 100)}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.1s ease-out' }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-4xl font-bold text-green-600">{lighthouseVal}</span>
                  </div>
                </div>
                <p className="font-heading text-lg font-bold text-text">Lighthouse Score</p>
                <p className="text-text-muted text-xs mt-1">Performance · SEO · Accessibility</p>
              </div>
            </div>

            {/* Video section — full width cinematic */}
            <div className="cs-reveal relative overflow-hidden aspect-[21/9] bg-bg-dark group cursor-pointer mb-3">
              <img src={g[3] || g[0] || project.image} alt={`${project.title} showcase`}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-[1.03] transition-all duration-700" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-accent/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                  <svg className="w-7 h-7 text-bg-dark ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <div className="absolute bottom-6 left-8">
                <p className="text-text-inverse font-heading font-bold text-lg">Xem Demo Dự Án</p>
                <p className="text-text-inverse/50 text-sm">Trải nghiệm đầy đủ tính năng</p>
              </div>
            </div>

            {/* Stats with count-up */}
            <div ref={statsRef} className="cs-reveal grid grid-cols-3 gap-[1px] bg-border">
              <div className="bg-bg py-8 text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-text">{responsiveVal}%</p>
                <p className="label-caps text-text-light mt-2">Responsive</p>
              </div>
              <div className="bg-bg py-8 text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-text">0.{loadVal < 10 ? '0' : ''}{loadVal}s</p>
                <p className="label-caps text-text-light mt-2">Tốc Độ Tải</p>
              </div>
              <div className="bg-bg py-8 text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-accent">A+</p>
                <p className="label-caps text-text-light mt-2">Bảo Mật</p>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════
              GALLERY — full-bleed masonry-style
              ════════════════════════════════════════════ */}
          {g.length > 3 && (
            <section className="cs-reveal">
              <div className={`grid gap-[2px] ${g.length > 4 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
                {g.slice(3).map((img, i) => (
                  <div key={i} className={`overflow-hidden ${i === 0 && g.length > 4 ? 'md:row-span-2 aspect-auto' : 'aspect-[4/3]'}`}>
                    <img src={img} alt={`${project.title} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════
              CTA — dark section
              ════════════════════════════════════════════ */}
          <section className="bg-bg-dark px-6 md:px-10 py-24">
            <div className="max-w-7xl mx-auto cs-reveal text-center md:text-left md:flex md:items-center md:justify-between gap-8">
              <div>
                <h2 className="font-heading font-bold text-text-inverse leading-[1.05]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  Sẵn sàng cho dự án<br /><span className="text-accent">tiếp theo?</span>
                </h2>
                <p className="mt-3 text-text-inverse/40 text-sm font-body">Từ ý tưởng đến sản phẩm hoàn chỉnh — chỉ cần bắt đầu.</p>
              </div>
              <Link to="/bat-dau-du-an" className="btn-gold btn-press inline-flex flex-shrink-0 mt-6 md:mt-0">
                Bắt Đầu Dự Án
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>

          {/* ════════════════════════════════════════════
              PREV / NEXT
              ════════════════════════════════════════════ */}
          <section className="border-t border-border">
            <div className="max-w-7xl mx-auto grid grid-cols-2">
              {prev ? (
                <Link to={`/du-an/${prev.slug || prev.id}`}
                  className="group flex items-center gap-5 p-8 md:p-14 border-r border-border hover:bg-bg-alt transition-colors">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-bg-alt">
                    <img src={IMAGE_MAP[prev.slug || ''] || prev.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="label-caps text-text-light block mb-1">← Trước đó</span>
                    <span className="font-heading font-bold text-text group-hover:text-accent transition-colors">{prev.title}</span>
                  </div>
                </Link>
              ) : <div className="p-8 md:p-14 border-r border-border" />}
              {next ? (
                <Link to={`/du-an/${next.slug || next.id}`}
                  className="group flex items-center justify-end gap-5 p-8 md:p-14 hover:bg-bg-alt transition-colors text-right">
                  <div>
                    <span className="label-caps text-text-light block mb-1">Tiếp theo →</span>
                    <span className="font-heading font-bold text-text group-hover:text-accent transition-colors">{next.title}</span>
                  </div>
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-bg-alt">
                    <img src={IMAGE_MAP[next.slug || ''] || next.image} alt="" className="w-full h-full object-cover" />
                  </div>
                </Link>
              ) : <div className="p-8 md:p-14" />}
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  )
}
