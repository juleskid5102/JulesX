import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

/**
 * Footer — blue background per user request, uses favicon logo
 */
export default function Footer() {
  return (
    <footer className="bg-[#101122] pt-20 pb-10 px-6">
      <ScrollReveal className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand — uses favicon.svg */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 text-white">
              <img src="/favicon.svg" alt="Jules Studio" className="w-7 h-7 invert brightness-0" style={{ filter: 'invert(1)' }} />
              <h2 className="text-lg font-extrabold tracking-tighter font-display">JULES STUDIO</h2>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-display">
              Kiến tạo trải nghiệm số vượt trội thông qua thiết kế tinh tế và công nghệ hiện đại. Studio thiết kế web cao cấp tại Việt Nam.
            </p>
          </div>

          {/* Menu */}
          <div className="space-y-6">
            <h5 className="text-white font-bold font-display">Menu</h5>
            <ul className="space-y-4">
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/">Trang chủ</Link></li>
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/du-an">Dự án</Link></li>
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/dich-vu">Dịch vụ</Link></li>
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/#lien-he">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Dịch Vụ */}
          <div className="space-y-6">
            <h5 className="text-white font-bold font-display">Dịch Vụ</h5>
            <ul className="space-y-4">
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/dich-vu">UI/UX Design</Link></li>
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/dich-vu">Web Development</Link></li>
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/dich-vu">Branding</Link></li>
              <li><Link className="text-white/60 hover:text-white transition-colors text-sm font-display" to="/dich-vu">Consulting</Link></li>
            </ul>
          </div>

          {/* Liên Hệ */}
          <div className="space-y-6">
            <h5 className="text-white font-bold font-display">Liên Hệ</h5>
            <p className="text-white/60 text-sm font-display">Quận 1, TP. Hồ Chí Minh</p>
            <p className="text-white/60 text-sm font-display">hello@julesstudio.vn</p>
            <p className="text-white/60 text-sm font-display">+84 901 234 567</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-display">© 2024 Jules Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <Link className="text-white/40 hover:text-white text-xs transition-colors font-display" to="/chinh-sach">
              Chính sách bảo mật
            </Link>
            <Link className="text-white/40 hover:text-white text-xs transition-colors font-display" to="/dieu-khoan">
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}
