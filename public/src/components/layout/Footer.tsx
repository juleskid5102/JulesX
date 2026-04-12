import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

/**
 * Footer — v4 Premium with scroll reveal and hover effects
 * Year auto-updates
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#101122] pt-20 pb-10 px-6">
      <ScrollReveal className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand — uses favicon.svg */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 text-white group">
              <img src="/favicon.svg" alt="Jules Studio" className="w-7 h-7 invert brightness-0" style={{ filter: 'invert(1)' }} />
              <h2 className="text-lg font-extrabold tracking-tighter font-display group-hover:text-primary transition-colors duration-300">JULES STUDIO</h2>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs font-display">
              Kiến tạo trải nghiệm số vượt trội thông qua thiết kế tinh tế và công nghệ hiện đại. Studio thiết kế web cao cấp tại Việt Nam.
            </p>
          </div>

          {/* Menu */}
          <div className="space-y-6">
            <h5 className="text-white font-bold font-display text-sm uppercase tracking-[0.15em]">Menu</h5>
            <ul className="space-y-4">
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/">Trang chủ</Link></li>
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/du-an">Dự án</Link></li>
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/dich-vu">Dịch vụ</Link></li>
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/#lien-he">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Dịch Vụ */}
          <div className="space-y-6">
            <h5 className="text-white font-bold font-display text-sm uppercase tracking-[0.15em]">Dịch Vụ</h5>
            <ul className="space-y-4">
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/dich-vu">UI/UX Design</Link></li>
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/dich-vu">Web Development</Link></li>
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/dich-vu">Branding</Link></li>
              <li><Link className="text-white/50 hover:text-primary transition-colors text-sm font-display hover:translate-x-1 inline-block duration-300" to="/dich-vu">Consulting</Link></li>
            </ul>
          </div>

          {/* Liên Hệ */}
          <div className="space-y-6">
            <h5 className="text-white font-bold font-display text-sm uppercase tracking-[0.15em]">Liên Hệ</h5>
            <p className="text-white/50 text-sm font-display">Quận 1, TP. Hồ Chí Minh</p>
            <p className="text-white/50 text-sm font-display hover:text-primary transition-colors">
              <a href="mailto:hello@julesstudio.vn">hello@julesstudio.vn</a>
            </p>
            <p className="text-white/50 text-sm font-display">+84 901 234 567</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-display">© {currentYear} Jules Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <Link className="text-white/30 hover:text-white/60 text-xs transition-colors font-display" to="/chinh-sach">
              Chính sách bảo mật
            </Link>
            <Link className="text-white/30 hover:text-white/60 text-xs transition-colors font-display" to="/dieu-khoan">
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}
