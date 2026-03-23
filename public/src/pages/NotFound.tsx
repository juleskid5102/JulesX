import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

/**
 * NotFound — v3 Light theme
 * Minimal 404 page with large watermark number
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center relative">
          {/* Large watermark */}
          <div className="text-[12rem] md:text-[16rem] font-black text-stone-100 leading-none select-none font-display">
            404
          </div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-stone-900 mb-4 font-display">
              Trang không tìm thấy
            </h1>
            <p className="text-stone-500 max-w-md mb-8 font-display">
              Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:translate-y-[-2px] transition-all font-display"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </main>
      
      {/* Minimal footer */}
      <footer className="text-center py-6">
        <p className="text-stone-400 text-xs font-display">© {new Date().getFullYear()} Jules Studio</p>
      </footer>
    </>
  )
}
