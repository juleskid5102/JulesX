import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../config/site'

/**
 * Navbar — v3 Light theme, scroll-aware
 * Transparent at top, solid white on scroll
 * Dark text for light backgrounds
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-stone-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/favicon.svg" alt="Jules Studio" className="w-8 h-8" />
          <span className="text-lg font-bold tracking-tighter uppercase text-stone-900 font-display">
            Jules Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                location.pathname === link.href
                  ? 'text-primary'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Separator */}
          <div className="h-4 w-[1px] bg-stone-200" />

          <Link
            to="/dang-nhap"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors duration-300"
          >
            Đăng Nhập
          </Link>

          <Link
            to="/bat-dau-du-an"
            className="bg-primary text-white px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] rounded-lg hover:bg-primary/80 transition-all duration-300 shadow-sm shadow-primary/20"
          >
            Bắt Đầu Dự Án
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-stone-900"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-200/50 px-6 py-8">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.2em] py-1 transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-stone-200" />
            <Link
              to="/dang-nhap"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/bat-dau-du-an"
              className="mt-2 bg-primary text-white px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-center rounded-lg hover:bg-primary/80 transition-all"
            >
              Bắt Đầu Dự Án
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
