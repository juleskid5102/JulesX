import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, type Project } from '../../config/site'
import ScrollReveal from '../ui/ScrollReveal'
import ProjectCard from '../ui/ProjectCard'

/**
 * PortfolioPreview — Homepage section using global ProjectCard (grid-3)
 * Grayscale→color hover, consistent with Portfolio page
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
    { id: '1', title: 'Jules Oasis — Resort & Spa', category: 'Hospitality', image: '/images/projects/jules-oasis.jpg', description: '', slug: 'jules-oasis', field: 'Hospitality', designStyle: 'Tropical Luxury', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
    { id: '2', title: 'Lumina Store', category: 'E-Commerce', image: '/images/projects/lumina-store.jpg', description: '', slug: 'lumina-store', field: 'E-Commerce', designStyle: 'Modern Minimal', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
    { id: '3', title: 'Zenith App', category: 'SaaS', image: '/images/projects/zenith-app.jpg', description: '', slug: 'zenith-app', field: 'SaaS', designStyle: 'Clean Professional', completedAt: '2024', featured: true, challenge: '', solution: '', duration: '', stack: '', lighthouse: '', gallery: [], techTags: [] },
  ]

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl font-extrabold text-stone-900 font-display">
            Câu chuyện từ những dự án thật
          </h3>
        </div>
        <Link
          to="/du-an"
          className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group font-display"
        >
          Xem tất cả dự án
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </ScrollReveal>

      <ScrollReveal className="grid md:grid-cols-3 gap-8">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ScrollReveal>
    </section>
  )
}
