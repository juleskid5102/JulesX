import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * 404 Not Found — Dark theme with GSAP reveal
 */
export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <ScrollReveal direction="none" duration={1} className="py-32">
          <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase block mb-8">
            LỖI 404
          </span>
          <h1 className="text-8xl md:text-[12rem] font-heading font-extrabold tracking-tighter mb-8 text-white/5">
            404
          </h1>
          <p className="text-xl text-white/40 max-w-lg mx-auto mb-12 font-display font-light">
            Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Link
            to="/"
            className="bg-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/80 transition-all inline-flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Về Trang Chủ
          </Link>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
