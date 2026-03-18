import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../config/site'

/**
 * Navbar — Glassmorphism + Scroll-aware
 * Transparent at top, solid on scroll
 * Dark theme matching Oasis-style storytelling
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
        scrolled ? 'glass-nav-solid' : 'glass-nav'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary/90 flex items-center justify-center transition-colors group-hover:bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-5 h-5" fill="white">
              <path d="M480-80 120-280v-400l360-200 360 200v400L480-80Zm-40-406v316l40 22 40-22v-316l280-154-40-22-280 154-280-154-40 22 280 154Zm40 74 278-154v-160L480-572 202-726v160l278 154Z"/>
            </svg>
          </div>
          <span className="font-heading text-lg font-bold tracking-tighter uppercase text-white">
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
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Separator */}
          <div className="h-4 w-[1px] bg-white/20" />

          <Link
            to="/dang-nhap"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
          >
            Đăng Nhập
          </Link>

          <Link
            to="/bao-gia"
            className="bg-primary text-white px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-primary/80 transition-all duration-300"
          >
            Bắt Đầu Dự Án
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-8">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.2em] py-1 transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-[1px] bg-white/10" />
            <Link
              to="/dang-nhap"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              Đăng Nhập
            </Link>
            <Link
              to="/bao-gia"
              className="mt-2 bg-primary text-white px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-center hover:bg-primary/80 transition-all"
            >
              Bắt Đầu Dự Án
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
