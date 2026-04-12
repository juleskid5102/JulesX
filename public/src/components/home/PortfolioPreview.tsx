import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, type Project } from '../../config/site'
import ScrollReveal from '../ui/ScrollReveal'
import RevealImage from '../ui/RevealImage'

/**
 * PortfolioPreview — v4 Premium with image reveal animations
 * Grayscale→color hover + GSAP clip-path reveal
 */
export default function PortfolioPreview() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio?featured=true`)
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res: any) => {
        const list = Array.isArray(res) ? res : res.data || []
        setProjects(list)
      })
      .catch(() => {})
  }, [])

  const displayProjects = projects.length > 0 ? projects : [
    { id: '1', title: 'Jules Oasis — Resort & Spa', category: 'Hospitality', image: '/images/projects/jules-oasis.jpg', description: 'Website resort & spa cao cấp với thiết kế tropical luxury', slug: 'jules-oasis', field: 'Hospitality', designStyle: 'Tropical Luxury', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
    { id: '2', title: 'Lumina Store', category: 'E-Commerce', image: '/images/projects/lumina-store.jpg', description: 'Cửa hàng trực tuyến với giao diện modern minimal', slug: 'lumina-store', field: 'E-Commerce', designStyle: 'Modern Minimal', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
    { id: '3', title: 'Zenith App', category: 'SaaS', image: '/images/projects/zenith-app.jpg', description: 'Ứng dụng SaaS với dashboard chuyên nghiệp', slug: 'zenith-app', field: 'SaaS', designStyle: 'Clean Professional', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
  ]

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-display">
            Portfolio
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display">
            Câu chuyện từ những
            <br />
            <span className="text-primary">dự án thật</span>
          </h3>
        </div>
        <Link
          to="/du-an"
          className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group font-display text-sm uppercase tracking-[0.1em]"
        >
          Xem tất cả dự án
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </ScrollReveal>

      {/* Featured project — large */}
      {displayProjects[0] && (
        <Link
          to={`/du-an/${displayProjects[0].slug || displayProjects[0].id}`}
          className="group block mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <RevealImage
                src={displayProjects[0].image}
                alt={displayProjects[0].title}
                delay={0}
                className="rounded-xl bg-stone-100 aspect-[16/10] border border-stone-200/50"
              />
            </div>
            <div className="md:col-span-5 md:pl-8">
              <span className="text-[10px] font-bold text-stone-400 tracking-[0.3em] uppercase block mb-3 font-display">
                01 / {displayProjects[0].field || displayProjects[0].category}
              </span>
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                {displayProjects[0].category}
              </span>
              <h4 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight group-hover:text-primary transition-colors font-display">
                {displayProjects[0].title}
              </h4>
              <p className="text-stone-500 leading-relaxed mb-6 line-clamp-3 font-display">
                {displayProjects[0].description}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-[0.1em]">
                <span>Xem chi tiết</span>
                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-2">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Remaining projects — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {displayProjects.slice(1).map((project, i) => (
          <Link
            key={project.id}
            to={`/du-an/${project.slug || project.id}`}
            className="group"
          >
            <RevealImage
              src={project.image}
              alt={project.title}
              delay={(i + 1) * 0.15}
              className="rounded-xl bg-stone-100 mb-5 aspect-[4/3] border border-stone-200/50"
            />
            <span className="text-[10px] font-bold text-stone-400 tracking-[0.3em] uppercase block mb-2 font-display">
              0{i + 2} / {project.field || project.category}
            </span>
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase mb-3">
              {project.category}
            </span>
            <h4 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors font-display">
              {project.title}
            </h4>
            <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 font-display">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
