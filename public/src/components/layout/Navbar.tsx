import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../config/site'

/**
 * Navbar — EXACT copy from 03-config-builder.html (Stitch)
 * 
 * Source HTML structure:
 * <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
 *   <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
 *     <div class="flex items-center gap-2">
 *       <div class="w-8 h-8 bg-black flex items-center justify-center">
 *         <span class="material-symbols-outlined text-white text-xl">deployed_code</span>
 *       </div>
 *       <span class="font-heading text-xl font-bold tracking-tighter uppercase">Jules Studio</span>
 *     </div>
 *     <div class="hidden md:flex items-center gap-8">
 *       <a class="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">...</a>
 *       <div class="h-4 w-[1px] bg-slate-200"></div>
 *       <a>Đăng Nhập</a>
 *       <button class="bg-black text-white px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
 *         Bắt Đầu Dự Án
 *       </button>
 *     </div>
 *   </div>
 * </nav>
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-7 h-7" fill="currentColor">
            <path d="M480-80 120-280v-400l360-200 360 200v400L480-80Zm-40-406v316l40 22 40-22v-316l280-154-40-22-280 154-280-154-40 22 280 154Zm40 74 278-154v-160L480-572 202-726v160l278 154Z"/>
          </svg>
          <span className="font-heading text-xl font-bold tracking-tighter uppercase">Jules Studio</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Separator — exact from 03-config-builder.html line 56 */}
          <div className="h-4 w-[1px] bg-slate-200" />

          <Link
            to="/dang-nhap"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Đăng Nhập
          </Link>

          <Link
            to="/bao-gia"
            className="bg-slate-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
          >
            Bắt Đầu Dự Án
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs font-bold uppercase tracking-widest py-2 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-slate-200" />
            <Link
              to="/dang-nhap"
              className="text-[10px] font-bold uppercase tracking-widest py-2 hover:text-primary transition-colors"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/bao-gia"
              className="mt-2 bg-slate-900 text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-center hover:bg-primary transition-all"
            >
              Bắt Đầu Dự Án
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
