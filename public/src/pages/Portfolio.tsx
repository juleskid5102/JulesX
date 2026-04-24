import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, type Project } from '../config/site'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * Portfolio — JulesX Editorial v3
 * Featured hero + even 2-col grid + always-visible titles + pagination
 */

type TagKey = 'all' | 'landing' | 'business' | 'portfolio' | 'webapp' | 'concept'

const TAGS: { key: TagKey; label: string }[] = [
  { key: 'all', label: 'Tất Cả' },
  { key: 'landing', label: 'Landing Page' },
  { key: 'business', label: 'Doanh Nghiệp' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'webapp', label: 'Web App' },
  { key: 'concept', label: 'Concept' },
]

const TAG_MAP: Record<string, TagKey> = {
  'd-home': 'landing', 'dhome': 'landing',
  'mam-cung-thanh-huan': 'business', 'mamcung': 'business',
  'ha-vy-portfolio': 'portfolio', 'havy': 'portfolio',
  'he-thong-quan-ly-phong-kham': 'webapp', 'minh-khang-clinic': 'webapp', 'minhkhang': 'webapp',
  'jules-atelier': 'concept', 'jules-oasis': 'concept', 'jules-ecosystem-hub': 'concept',
}

const IMAGE_MAP: Record<string, string> = {
  'd-home': '/images/projects/dhome-hero.png', 'dhome': '/images/projects/dhome-hero.png',
  'mam-cung-thanh-huan': '/images/projects/mamcung-hero.png', 'mamcung': '/images/projects/mamcung-hero.png',
  'ha-vy-portfolio': '/images/projects/havy-hero.png', 'havy': '/images/projects/havy-hero.png',
  'he-thong-quan-ly-phong-kham': '/images/projects/minhkhang-hero.png', 'minh-khang-clinic': '/images/projects/minhkhang-hero.png', 'minhkhang': '/images/projects/minhkhang-hero.png',
  'jules-atelier': '/images/projects/jules-atelier-hero.png',
  'jules-oasis': '/images/projects/jules-oasis-hero.png',
  'jules-ecosystem-hub': '/images/projects/jules-hub-hero.png',
}

const TAG_LABEL: Record<TagKey, string> = {
  all: '', landing: 'Landing Page', business: 'Doanh Nghiệp',
  portfolio: 'Portfolio', webapp: 'Web App', concept: 'Concept',
}

const PER_PAGE = 6

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeTag, setActiveTag] = useState<TagKey>('all')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio`)
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res: any) => {
        const list = (Array.isArray(res) ? res : res.data || []).map((p: any) => ({
          ...p,
          slug: p.slug || p.id || '',
          image: IMAGE_MAP[p.slug || ''] || IMAGE_MAP[p.id] || p.image || p.thumbnail || '',
        }))
        setProjects(list)
      })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [])

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [activeTag])

  // GSAP scroll-reveal
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!gridRef.current) return
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gridRef.current?.querySelectorAll('.p-card')?.forEach((el, i) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
    }
    setTimeout(init, 100)
  }, [projects, activeTag, page])

  const filtered = activeTag === 'all'
    ? projects
    : projects.filter((p) => TAG_MAP[p.slug || p.id || ''] === activeTag)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const featured = page === 1 ? filtered[0] : null
  const gridItems = page === 1 ? filtered.slice(1, PER_PAGE) : filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-0 bg-bg min-h-screen">

        {/* ── Header ── */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto mb-6">
          <p className="label-caps text-accent mb-3">Portfolio</p>
          <h1 className="font-heading font-bold text-text leading-[1.0] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Dự Án Nổi Bật
          </h1>
          <p className="mt-4 text-text-muted font-body text-base md:text-lg max-w-xl leading-relaxed">
            Mỗi dự án là một câu chuyện riêng — được thiết kế phù hợp với mục tiêu kinh doanh.
          </p>
        </section>

        {/* ── Smart Tag Filters ── */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button key={tag.key} onClick={() => setActiveTag(tag.key)}
                className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 border ${activeTag === tag.key
                    ? 'bg-text text-bg border-text'
                    : 'bg-transparent text-text-muted border-border hover:border-text hover:text-text'
                  }`}>
                {tag.label}
              </button>
            ))}
          </div>
        </section>

        {loading ? (
          <section className="px-6 md:px-10 max-w-7xl mx-auto">
            <div className="bg-bg-alt aspect-[16/7] animate-pulse mb-3" />
            <div className="grid md:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => <div key={i} className="bg-bg-alt aspect-[4/3] animate-pulse" />)}
            </div>
          </section>
        ) : filtered.length === 0 ? (
          <section className="px-6 md:px-10 max-w-7xl mx-auto">
            <p className="text-center text-text-light py-20 font-body">Chưa có dự án nào trong danh mục này.</p>
          </section>
        ) : (
          <div ref={gridRef}>

            {/* ── Featured (page 1 only) ── */}
            {featured && (
              <section className="px-6 md:px-10 max-w-7xl mx-auto mb-3">
                <Link to={`/du-an/${featured.slug || featured.id}`} className="p-card group block relative overflow-hidden aspect-[16/7] bg-bg-dark">
                  <img src={featured.image} alt={featured.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    {TAG_MAP[featured.slug || ''] && (
                      <span className="label-caps text-accent mb-2 block">{TAG_LABEL[TAG_MAP[featured.slug || ''] || 'all']}</span>
                    )}
                    <h2 className="font-heading text-2xl md:text-4xl font-bold text-text-inverse">{featured.title}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      {featured.field && <span className="text-text-inverse/50 text-sm">{featured.field}</span>}
                      {featured.completedAt && <><span className="text-text-inverse/20">·</span><span className="text-text-inverse/50 text-sm">{featured.completedAt}</span></>}
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* ── Even 2-col grid — always-visible titles ── */}
            <section className="px-6 md:px-10 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-3">
                {gridItems.map((project) => {
                  const slug = project.slug || project.id || ''
                  const tagKey = TAG_MAP[slug] || 'all'
                  return (
                    <Link key={project.id} to={`/du-an/${slug}`} className="p-card group block">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-bg-alt">
                        <img src={project.image} alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" loading="lazy" />
                        {tagKey !== 'all' && (
                          <span className="absolute top-3 left-3 bg-bg/85 backdrop-blur-sm text-text text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5">{TAG_LABEL[tagKey]}</span>
                        )}
                      </div>
                      {/* Title — always visible */}
                      <div className="pt-4 pb-2">
                        <h3 className="font-heading text-base font-bold text-text group-hover:text-accent transition-colors duration-300 leading-tight">{project.title}</h3>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-text-light font-body">
                          {project.field && <span>{project.field}</span>}
                          {project.completedAt && <><span className="text-border">·</span><span>{project.completedAt}</span></>}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <section className="px-6 md:px-10 max-w-7xl mx-auto mt-14 mb-8">
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === 1}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted border border-border hover:border-text hover:text-text transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    ← Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`w-9 h-9 text-xs font-bold transition-all ${page === p ? 'bg-text text-bg' : 'text-text-muted hover:text-text hover:bg-bg-alt'
                        }`}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text-muted border border-border hover:border-text hover:text-text transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    Tiếp →
                  </button>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ── CTA ── */}
        <section className="mt-8 bg-bg-dark py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="font-heading font-bold text-text-inverse leading-[1.05]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              Có ý tưởng?<br /><span className="text-accent">Hãy bắt đầu ngay.</span>
            </h3>
            <p className="mt-3 text-text-inverse/40 text-sm font-body max-w-md mx-auto">
              Từ ý tưởng đến sản phẩm hoàn chỉnh — mỗi dự án đều được đầu tư tâm huyết.
            </p>
            <Link to="/bat-dau-du-an" className="btn-gold btn-press inline-flex mt-8">
              Bắt Đầu Dự Án
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
