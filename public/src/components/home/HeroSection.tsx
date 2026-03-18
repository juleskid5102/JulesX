import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

/**
 * HeroSection — Fullscreen with background image + gradient overlay
 * Oasis-style storytelling: image fills viewport, text reveals on scroll
 */
export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image + Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Jules Studio workspace"
          className="w-full h-full object-cover"
          src="/images/hero-studio.png"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <ScrollReveal direction="none" duration={1.2} className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16">
        <span className="block text-primary uppercase tracking-[0.4em] mb-6 text-sm font-semibold">
          Web Design Studio
        </span>
        <h1
          className="text-white text-5xl md:text-7xl lg:text-[6rem] font-extrabold leading-[0.95] tracking-tighter mb-8 uppercase"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          THIẾT KẾ WEBSITE<br />
          <span className="text-primary/80">HIỆN ĐẠI</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-display font-light">
          Studio thiết kế và phát triển website cao cấp — tối đa trải nghiệm, hiệu năng và khả năng mở rộng.
        </p>

        {/* Animated divider */}
        <div className="flex justify-center mb-12">
          <div className="w-px h-16 bg-primary/40" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/bao-gia"
            className="bg-primary text-white px-12 py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary/80 transition-all duration-300"
          >
            Bắt Đầu Dự Án
          </Link>
          <Link
            to="/du-an"
            className="text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-semibold border-b border-white/20 pb-1 hover:border-white/50"
          >
            Xem Portfolio
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
