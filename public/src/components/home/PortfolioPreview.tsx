import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, type Project } from '../../config/site'

/**
 * PortfolioPreview — JulesX Editorial
 * Reference: screen.png editorial gallery style
 * Full-bleed featured project + 2-col grid remaining.
 * Uses real project screenshots.
 */
/* Override API images with real captured screenshots */
const IMAGE_MAP: Record<string, string> = {
  'd-home': '/images/projects/dhome-hero.png',
  'dhome': '/images/projects/dhome-hero.png',
  'mam-cung-thanh-huan': '/images/projects/mamcung-hero.png',
  'mamcung': '/images/projects/mamcung-hero.png',
  'ha-vy-portfolio': '/images/projects/havy-hero.png',
  'havy': '/images/projects/havy-hero.png',
  'minh-khang-clinic': '/images/projects/minhkhang-hero.png',
  'minhkhang': '/images/projects/minhkhang-hero.png',
  'jules-ecosystem-hub': '/images/projects/jules-hub-hero.png',
  'jules-atelier': '/images/projects/jules-atelier-hero.png',
  'jules-oasis': '/images/projects/jules-oasis-hero.png',
}

export default function PortfolioPreview() {
  const [projects, setProjects] = useState<Project[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio?featured=true`)
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res: any) => {
        const list = (Array.isArray(res) ? res : res.data || []).map((p: Project) => ({
          ...p,
          image: IMAGE_MAP[p.slug || ''] || IMAGE_MAP[p.id] || p.image,
        }))
        setProjects(list)
      })
      .catch(() => { })
  }, [])

  // GSAP scroll animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const cards = sectionRef.current?.querySelectorAll('.project-item')
      if (!cards) return

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )

        const img = card.querySelector('.project-image')
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }

    init()
  }, [projects])

  const displayProjects = projects.length > 0 ? projects : [
    { id: '1', title: 'D.HOME Interior', category: 'Interior Design', image: '/images/projects/dhome-hero.png', description: 'Website nội thất cao cấp với trải nghiệm thị giác đẳng cấp', slug: 'd-home', field: 'Interior Design', designStyle: 'Luxury Minimal', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
    { id: '2', title: 'Mâm Cúng Thanh Huân', category: 'E-Commerce', image: '/images/projects/mamcung-hero.png', description: 'Nền tảng đặt mâm cúng trực tuyến', slug: 'mam-cung-thanh-huan', field: 'F&B · E-commerce', designStyle: 'Traditional Modern', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
    { id: '3', title: 'Hà Vy Portfolio', category: 'Portfolio', image: '/images/projects/havy-hero.png', description: 'Portfolio cá nhân cho Strategic Storyteller', slug: 'ha-vy-portfolio', field: 'Personal Brand', designStyle: 'Editorial Warm', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
    { id: '4', title: 'Minh Khang Clinic', category: 'Web App', image: '/images/projects/minhkhang-hero.png', description: 'Hệ thống đặt lịch khám thông minh', slug: 'minh-khang-clinic', field: 'Healthcare', designStyle: 'Clean Medical', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
  ]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-bg-alt">
      <div className="max-w-7xl mx-auto">
        {/* Section header — asymmetric */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="label-caps text-accent mb-4">Dự Án Tiêu Biểu</p>
            <h2
              className="font-heading font-bold text-text tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Dự án thực tế
            </h2>
          </div>
          <Link
            to="/du-an"
            className="group inline-flex items-center gap-2 text-text text-sm font-semibold uppercase tracking-[0.1em] hover:text-accent transition-colors"
          >
            Xem tất cả
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Featured project — full width hero image */}
        {displayProjects[0] && (
          <Link
            to={`/du-an/${displayProjects[0].slug || displayProjects[0].id}`}
            className="project-item group block mb-12"
          >
            <div className="overflow-hidden bg-[#1A1A1A] mb-6">
              <img
                src={displayProjects[0].image}
                alt={displayProjects[0].title}
                className="project-image w-full aspect-[16/9] object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                loading="eager"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <span className="label-caps text-text-light block mb-2">
                  01 — {displayProjects[0].field || displayProjects[0].category}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-text group-hover:text-accent transition-colors duration-300">
                  {displayProjects[0].title}
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 text-text text-sm font-semibold uppercase tracking-[0.1em] group-hover:text-accent transition-colors shrink-0 md:mt-2">
                Xem
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        )}

        {/* Separator */}
        <div className="w-full h-[1px] bg-border mb-12" />

        {/* Remaining projects — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.slice(1).map((project, i) => (
            <Link
              key={project.id}
              to={`/du-an/${project.slug || project.id}`}
              className="project-item group"
            >
              <div className="overflow-hidden mb-5 bg-[#1A1A1A]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full aspect-[4/3] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <span className="label-caps text-text-light block mb-1.5">
                0{i + 2} — {project.field || project.category}
              </span>
              <h3 className="font-heading text-lg font-bold text-text group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
