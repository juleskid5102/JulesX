import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../config/site'

/**
 * Navbar — v4 Premium (Warm Editorial)
 * Smart hide/show on scroll direction, pill navigation, fullscreen mobile menu
 * Colors updated for warm cream palette — structure preserved
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const goingUp = currentY < lastScrollY.current
      const pastThreshold = currentY > 100

      setHasScrolled(pastThreshold)

      if (pastThreshold) {
        setIsVisible(goingUp || currentY < 200)
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible
        ? 'translate-y-0 opacity-100'
        : '-translate-y-full opacity-0'
        } ${hasScrolled
          ? 'glass-nav shadow-[0_1px_0_rgba(232,226,216,0.5)]'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo — JulesX wordmark image */}
        <Link to="/" className="group relative flex items-center">
          <img
            src="/images/logo-full.png"
            alt="JulesX"
            className="h-11 w-auto"
          />
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop Nav — pill indicator */}
        <div className="hidden md:flex items-center gap-1 bg-bg-alt/80 backdrop-blur-sm rounded-full px-2 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href ||
              (link.href !== '/' && location.pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${isActive
                  ? 'bg-text text-bg shadow-sm'
                  : 'text-text-muted hover:text-text hover:bg-border-light'
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right side — CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/bat-dau-du-an"
            className="bg-text text-bg px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-accent hover:text-text active:scale-95 transition-all duration-300 btn-press"
          >
            Bắt Đầu Dự Án
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu — Fullscreen overlay with stagger animation */}
      <div
        className={`md:hidden fixed inset-0 bg-bg/[0.98] backdrop-blur-3xl transition-all duration-500 z-[60] ${isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-2 text-text hover:text-accent transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-extrabold uppercase tracking-tight transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${location.pathname === link.href
                  ? 'text-accent'
                  : 'text-border hover:text-text'
                }`}
              style={{ transitionDelay: isOpen ? `${i * 80}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-[1px] w-20 bg-border my-2" />

          <Link
            to="/dang-nhap"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-text-light hover:text-text transition-colors"
          >
            Đăng Nhập
          </Link>

          <Link
            to="/bat-dau-du-an"
            onClick={() => setIsOpen(false)}
            className="mt-2 bg-text text-bg px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-accent hover:text-text transition-all"
          >
            Bắt Đầu Dự Án
          </Link>
        </div>
      </div>
    </nav>
  )
}
