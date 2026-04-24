import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, type Project } from '../config/site'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * Portfolio — JulesX Editorial
 * Smart tag filters by service type + 2-col image-first grid
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

/* Map project slugs → tag keys for filtering */
const TAG_MAP: Record<string, TagKey> = {
  'd-home': 'landing',
  'dhome': 'landing',
  'mam-cung-thanh-huan': 'business',
  'mamcung': 'business',
  'ha-vy-portfolio': 'portfolio',
  'havy': 'portfolio',
  'he-thong-quan-ly-phong-kham': 'webapp',
  'minh-khang-clinic': 'webapp',
  'minhkhang': 'webapp',
  'jules-atelier': 'concept',
  'jules-oasis': 'concept',
  'jules-ecosystem-hub': 'concept',
}

/* Override API images with local screenshots */
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

/* Tag label for display on cards */
const TAG_LABEL: Record<TagKey, string> = {
  all: '',
  landing: 'Landing Page',
  business: 'Doanh Nghiệp',
  portfolio: 'Portfolio',
  webapp: 'Web App',
  concept: 'Concept Design',
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

  /* GSAP scroll-reveal for grid items */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!gridRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = gridRef.current?.querySelectorAll('.project-card')
      if (!items) return

      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        )
      })
    }

    const timer = setTimeout(init, 100)
    return () => clearTimeout(timer)
  }, [projects, activeTag])

  /* Filter projects by tag */
  const filtered = activeTag === 'all'
    ? projects
    : projects.filter((p) => {
      const slug = p.slug || p.id || ''
      return TAG_MAP[slug] === activeTag
    })

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-0 bg-bg min-h-screen">

        {/* ── Header ── */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto text-center mb-12">
          <h1
            className="font-heading font-bold text-text leading-[1.1] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Dự Án Nổi Bật
          </h1>
          <p className="mt-4 text-text-muted font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Mỗi dự án là một câu chuyện riêng — được thiết kế phù hợp với mục tiêu kinh doanh.
          </p>
        </section>

        {/* ── Smart Tag Filters ── */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto mb-14">
          <div className="flex flex-wrap gap-2 justify-center">
            {TAGS.map((tag) => (
              <button
                key={tag.key}
                onClick={() => setActiveTag(tag.key)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${activeTag === tag.key
                    ? 'bg-text text-bg shadow-sm'
                    : 'bg-bg-alt text-text-muted hover:text-text hover:bg-border-light'
                  }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Project Grid (2-col) ── */}
        <section className="px-6 md:px-10 max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-bg-alt aspect-[4/3] animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-text-light py-20 font-body">
              Chưa có dự án nào trong danh mục này.
            </p>
          ) : (
            <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
              {filtered.map((project) => {
                const slug = project.slug || project.id || ''
                const tagKey = TAG_MAP[slug] || 'all'
                return (
                  <Link
                    key={project.id}
                    to={`/du-an/${slug}`}
                    className="project-card group block"
                  >
                    {/* Image — full card, grayscale→color hover */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-bg-alt">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                        loading="lazy"
                      />
                      {/* Tag badge overlay */}
                      {tagKey !== 'all' && (
                        <span className="absolute top-4 left-4 bg-bg/80 backdrop-blur-sm text-text text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5">
                          {TAG_LABEL[tagKey]}
                        </span>
                      )}
                    </div>

                    {/* Title + meta below */}
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <h3 className="font-heading text-lg font-bold text-text group-hover:text-accent transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      {project.completedAt && (
                        <span className="label-caps text-text-light whitespace-nowrap mt-0.5">
                          {project.completedAt}
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-text-light font-body">
                      {project.field && <span>{project.field}</span>}
                      {project.designStyle && (
                        <>
                          <span className="text-border">·</span>
                          <span>{project.designStyle}</span>
                        </>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="mt-24 bg-bg-dark py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <h3
              className="font-heading font-bold text-text-inverse leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              Có dự án cần thực hiện?
            </h3>
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
      </main>
      <Footer />
    </>
  )
}
