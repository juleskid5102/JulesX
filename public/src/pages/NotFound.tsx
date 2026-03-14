import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * 404 Not Found page — matches design system (Exaggerated Minimalism)
 */
export default function NotFound() {
  return (
    <div className="bg-background-light text-slate-900 antialiased min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="py-24">
          <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase block mb-6">
            LỖI 404
          </span>
          <h1 className="text-7xl md:text-[9rem] font-heading font-extrabold tracking-tighter mb-8 text-slate-200">
            404
          </h1>
          <p className="text-xl text-slate-500 max-w-lg mx-auto mb-12">
            Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Link
            to="/"
            className="bg-slate-900 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary transition-all inline-flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Về Trang Chủ
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
