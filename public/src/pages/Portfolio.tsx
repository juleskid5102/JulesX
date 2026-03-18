import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

const ITEMS_PER_PAGE = 8

/**
 * Portfolio — Dark theme grid with Oasis-style image cards
 * Staggered reveals, grayscale→color hover, overlay gradients
 */
export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1'))

  const [projects, setProjects] = useState<Project[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/api/public/portfolio?page=${currentPage}&limit=${ITEMS_PER_PAGE}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Không thể tải dự án')
        const data: any = await res.json()
        const list = Array.isArray(data) ? data : data.data || []
        setProjects(list.map((p: any): Project => ({
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
          challenge: p.challenge || '',
          solution: p.solution || '',
          duration: p.duration || '',
          stack: p.stack || '',
          lighthouse: p.lighthouse || '',
          gallery: p.gallery || [],
          techTags: p.techTags || [],
        })))
        setTotalPages(data.totalPages || 1)
      })
      .catch((err) => setError(err.message || 'Lỗi kết nối'))
      .finally(() => setLoading(false))
  }, [currentPage])

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-48 pb-32">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-48 pb-32">
          <span className="material-symbols-outlined text-red-400 text-[48px] mb-4">error</span>
          <p className="text-white/50">{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <header className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold block mb-4">
            Portfolio
          </span>
          <h1 className="font-heading text-5xl md:text-7xl tracking-tight font-bold">
            Dự Án<br />Nổi Bật
          </h1>
        </ScrollReveal>
      </header>

      {/* Project Grid — 2-column cards with overlay */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <ScrollReveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/du-an/${project.id}`}
              className="relative group h-[450px] overflow-hidden cursor-pointer"
            >
              <img
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                src={project.image}
              />
              <div className="absolute inset-0 card-overlay flex flex-col justify-end p-8">
                <span className="bg-primary/90 text-white text-[10px] px-3 py-1 w-fit mb-4 uppercase tracking-[0.2em] font-bold">
                  {project.category || project.designStyle || 'Web'}
                </span>
                <h3 className="font-heading text-2xl text-white mb-1 font-bold">
                  {project.title}
                </h3>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
                  {[project.field, project.completedAt?.replace(/\//g, ' - ')].filter(Boolean).join(' — ')}
                </p>
              </div>
            </Link>
          ))}
        </ScrollReveal>

        {/* Pagination */}
        {totalPages > 1 && (
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 pt-16">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-12 h-12 border flex items-center justify-center text-sm font-bold transition-colors ${
                    page === currentPage
                      ? 'border-primary bg-primary text-white'
                      : 'border-white/20 hover:border-primary hover:text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </ScrollReveal>
        )}
      </main>

      {/* CTA */}
      <section className="py-32 bg-[#0a0a0a] text-center overflow-hidden">
        <ScrollReveal direction="none" className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-4xl md:text-5xl text-white tracking-tight mb-12">
            Muốn xem thêm?
          </h2>
          <Link
            to="/bao-gia"
            className="bg-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/80 transition-all inline-flex items-center gap-4 group"
          >
            BẮT ĐẦU DỰ ÁN CỦA BẠN
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  )
}
