import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, type Project } from '../config/site'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * Portfolio — JulesX Editorial v2
 * Featured hero (first project full-width) + alternating grid
 */

/* ── Tag Config ──────────────────────────────────────────────── */
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
  portfolio: 'Portfolio', webapp: 'Web App', concept: 'Concept Design',
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeTag, setActiveTag] = useState<TagKey>('all')
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!gridRef.current) return
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gridRef.current?.querySelectorAll('.p-card')?.forEach((el, i) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
    }
    setTimeout(init, 100)
  }, [projects, activeTag])

  const filtered = activeTag === 'all'
    ? projects
    : projects.filter((p) => TAG_MAP[p.slug || p.id || ''] === activeTag)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-0 bg-bg min-h-screen">

        {/* ── Header ── */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto mb-6">
          <p className="label-caps text-accent mb-3">Portfolio</p>
          <h1 className="font-heading font-bold text-text leading-[1.0] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Dự Án<br className="hidden md:block" /> Nổi Bật
          </h1>
          <p className="mt-4 text-text-muted font-body text-base md:text-lg max-w-xl leading-relaxed">
            Mỗi dự án là một câu chuyện riêng — được thiết kế phù hợp với mục tiêu kinh doanh.
          </p>
        </section>

        {/* ── Smart Tag Filters ── */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag.key}
                onClick={() => setActiveTag(tag.key)}
                className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 border ${activeTag === tag.key
                    ? 'bg-text text-bg border-text'
                    : 'bg-transparent text-text-muted border-border hover:border-text hover:text-text'
                  }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Featured Project (hero-size) ── */}
        {loading ? (
          <section className="px-6 md:px-10 max-w-7xl mx-auto">
            <div className="bg-bg-alt aspect-[16/9] animate-pulse" />
          </section>
        ) : filtered.length === 0 ? (
          <section className="px-6 md:px-10 max-w-7xl mx-auto">
            <p className="text-center text-text-light py-20 font-body">Chưa có dự án nào trong danh mục này.</p>
          </section>
        ) : (
          <div ref={gridRef}>
            {/* Featured card — full width cinematic */}
            {featured && (
              <section className="px-6 md:px-10 max-w-7xl mx-auto mb-3">
                <Link to={`/du-an/${featured.slug || featured.id}`}
                  className="p-card group block relative overflow-hidden aspect-[16/7] bg-bg-dark">
                  <img src={featured.image} alt={featured.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    {TAG_MAP[featured.slug || ''] && (
                      <span className="label-caps text-accent mb-2 block">{TAG_LABEL[TAG_MAP[featured.slug || ''] || 'all']}</span>
                    )}
                    <h2 className="font-heading text-2xl md:text-4xl font-bold text-text-inverse group-hover:text-accent transition-colors duration-300">{featured.title}</h2>
                    <div className="flex items-center gap-3 mt-3">
                      {featured.field && <span className="text-text-inverse/50 text-sm">{featured.field}</span>}
                      {featured.completedAt && <><span className="text-text-inverse/20">·</span><span className="text-text-inverse/50 text-sm">{featured.completedAt}</span></>}
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Remaining — alternating 2-col layout */}
            <section className="px-6 md:px-10 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-3">
                {rest.map((project, i) => {
                  const slug = project.slug || project.id || ''
                  const tagKey = TAG_MAP[slug] || 'all'
                  /* Alternate: odd items are taller */
                  const isTall = i % 3 === 0
                  return (
                    <Link key={project.id} to={`/du-an/${slug}`}
                      className={`p-card group block relative overflow-hidden bg-bg-alt ${isTall ? 'aspect-[3/4] md:row-span-2' : 'aspect-[4/3]'}`}>
                      <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                        loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {tagKey !== 'all' && (
                          <span className="label-caps text-accent block mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{TAG_LABEL[tagKey]}</span>
                        )}
                        <h3 className="font-heading text-lg font-bold text-text-inverse opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.title}</h3>
                      </div>
                      {/* Always visible title below on mobile */}
                      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-bg-dark/80 p-4">
                        <p className="font-heading text-sm font-bold text-text-inverse">{project.title}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          </div>
        )}

        {/* ── CTA ── */}
        <section className="mt-16 bg-bg-dark py-24 px-6">
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
