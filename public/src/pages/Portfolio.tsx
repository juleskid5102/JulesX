import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, type Project } from '../config/site'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollReveal from '../components/ui/ScrollReveal'
import ProjectCard from '../components/ui/ProjectCard'

const CATEGORIES = ['Tất Cả', 'Hospitality', 'E-Commerce', 'SaaS', 'Startup']
const ITEMS_PER_PAGE = 6

/**
 * Portfolio — v3 Light theme
 * Filter tabs + 2-column grid with ProjectCard + pagination
 */
export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState('Tất Cả')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/portfolio`)
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res: any) => {
        const list = Array.isArray(res) ? res : res.data || []
        setProjects(list)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  const filtered = activeFilter === 'Tất Cả'
    ? projects
    : projects.filter((p) => p.field === activeFilter || p.category === activeFilter)

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedProjects = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Header */}
        <section className="px-6 max-w-7xl mx-auto text-center mb-16">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 font-display">
              Dự Án Nổi Bật
            </h1>
            <p className="text-stone-600 text-lg max-w-4xl mx-auto font-display">
              Mỗi dự án là một câu chuyện riêng — được thiết kế phù hợp với mục tiêu kinh doanh.
            </p>
          </ScrollReveal>
        </section>

        {/* Filter Tabs */}
        <section className="px-6 max-w-7xl mx-auto mb-12">
          <ScrollReveal className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all font-display ${
                  activeFilter === cat
                    ? 'bg-primary text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </section>

        {/* Projects Grid — using global ProjectCard */}
        <section className="px-6 max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-stone-100 rounded-xl aspect-[4/3] animate-pulse" />
              ))}
            </div>
          ) : paginatedProjects.length === 0 ? (
            <p className="text-center text-stone-500 py-20 font-display">Chưa có dự án nào.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {paginatedProjects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 80}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <section className="px-6 max-w-7xl mx-auto mt-16">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium font-display transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-stone-100 text-stone-600 hover:bg-stone-200"
              >
                ← Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold font-display transition-all ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium font-display transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-stone-100 text-stone-600 hover:bg-stone-200"
              >
                Tiếp →
              </button>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-24 bg-[#F5F5F0] py-16 px-6">
          <ScrollReveal className="max-w-7xl mx-auto text-center">
            <h3 className="text-2xl font-extrabold text-stone-900 mb-6 font-display">
              Có dự án cần thực hiện?
            </h3>
            <Link
              to="/bat-dau-du-an"
              className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all font-display"
            >
              Bắt Đầu Dự Án
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
