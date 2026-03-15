import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE, type Project } from '../config/site'

const ITEMS_PER_PAGE = 7

/**
 * Portfolio — 3-row grid (7+5, 5+7, 4+4+4) with pagination
 * Wired to GET /api/public/portfolio?page=N&limit=7
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
      <div className="bg-[#f6f6f8] text-slate-900 min-h-screen">
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
      <div className="bg-[#f6f6f8] text-slate-900 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-48 pb-32">
          <span className="material-symbols-outlined text-red-400 text-[48px] mb-4">error</span>
          <p className="text-slate-500">{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  // 3-row grid pattern: Row1(7+5), Row2(5+7), Row3(4+4+4) = 7 items
  const row1 = projects.slice(0, 2) // 7-col + 5-col
  const row2 = projects.slice(2, 4) // 5-col + 7-col
  const row3 = projects.slice(4, 7) // 4-col + 4-col + 4-col

  // Card subtitle: CATEGORY / DESIGN STYLE / COMPLETED_AT
  const subtitle = (p: Project) =>
    [p.category, p.designStyle, p.completedAt].filter(Boolean).join(' / ').toUpperCase()

  return (
    <div className="bg-[#f6f6f8] text-slate-900">
      <Navbar />

      <header className="pt-48 pb-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <p className="text-primary font-bold text-xs tracking-widest mb-4 uppercase">DỰ ÁN CỦA CHÚNG TÔI</p>
          <h2 className="font-heading font-[700] text-7xl md:text-8xl tracking-tight leading-none">
            Dự Án<br />Nổi Bật
          </h2>
        </Reveal>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32 space-y-10">
        {/* Row 1: 7 + 5 */}
        {row1.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            {row1.map((project, i) => (
              <Reveal key={project.id} className={`${i === 0 ? 'col-span-12 md:col-span-7' : 'col-span-12 md:col-span-5'} group`}>
                <Link to={`/du-an/${project.id}`} className="block border border-slate-200">
                  <div className={`${i === 0 ? 'aspect-video' : 'aspect-video md:aspect-square'} overflow-hidden border-b border-slate-200`}>
                    <img alt={project.title} className="w-full h-full object-cover grayscale-hover" src={project.image} />
                  </div>
                  <div className={`${i === 0 ? 'p-8 flex justify-between items-end' : 'p-6'}`}>
                    <div>
                      <h3 className={`font-heading font-[600] ${i === 0 ? 'text-3xl' : 'text-2xl'} mb-1`}>{project.title}</h3>
                      <p className="text-primary font-bold text-xs tracking-widest uppercase">{subtitle(project)}</p>
                    </div>
                    {i === 0 && <span className="material-symbols-outlined text-4xl font-light">north_east</span>}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Row 2: 5 + 7 */}
        {row2.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            {row2.map((project, i) => (
              <Reveal key={project.id} className={`${i === 0 ? 'col-span-12 md:col-span-5' : 'col-span-12 md:col-span-7'} group`}>
                <Link to={`/du-an/${project.id}`} className="block border border-slate-200">
                  <div className={`${i === 0 ? 'aspect-video md:aspect-square' : 'aspect-video'} overflow-hidden border-b border-slate-200`}>
                    <img alt={project.title} className="w-full h-full object-cover grayscale-hover" src={project.image} />
                  </div>
                  <div className={`${i === 1 ? 'p-8 flex justify-between items-end' : 'p-6'}`}>
                    <div>
                      <h3 className={`font-heading font-[600] ${i === 1 ? 'text-3xl' : 'text-2xl'} mb-1`}>{project.title}</h3>
                      <p className="text-primary font-bold text-xs tracking-widest uppercase">{subtitle(project)}</p>
                    </div>
                    {i === 1 && <span className="material-symbols-outlined text-4xl font-light">north_east</span>}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Row 3: 4 + 4 + 4 */}
        {row3.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            {row3.map((project) => (
              <Reveal key={project.id} className="col-span-12 md:col-span-4 group">
                <Link to={`/du-an/${project.id}`} className="block border border-slate-200">
                  <div className="aspect-square overflow-hidden border-b border-slate-200">
                    <img alt={project.title} className="w-full h-full object-cover grayscale-hover" src={project.image} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-[600] text-2xl mb-1">{project.title}</h3>
                    <p className="text-primary font-bold text-xs tracking-widest uppercase">{subtitle(project)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Reveal>
            <div className="flex items-center justify-center gap-3 pt-16">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-12 h-12 border border-slate-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
                      : 'border-slate-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-12 h-12 border border-slate-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </Reveal>
        )}
      </main>

      <section className="py-32 bg-white border-y border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="font-heading font-[700] text-5xl md:text-6xl tracking-tight mb-12 uppercase">Muốn xem thêm?</h2>
            <Link
              to="/bao-gia"
              className="bg-slate-900 text-white px-12 py-6 text-lg font-bold hover:bg-primary transition-all inline-flex items-center gap-4 group"
            >
              BẮT ĐẦU DỰ ÁN CỦA BẠN
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
