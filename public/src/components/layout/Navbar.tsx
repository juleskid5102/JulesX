import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../config/site'

/**
 * Navbar — v4 Premium
 * Smart hide/show on scroll direction, pill navigation, fullscreen mobile menu
 * Inspired by havi-portfolio editorial header
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
        // Past hero — show on scroll up, hide on scroll down
        setIsVisible(goingUp || currentY < 200)
      } else {
        // In hero zone — always visible
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      } ${
        hasScrolled
          ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(28,25,23,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo — with animated underline */}
        <Link to="/" className="group relative flex items-center gap-3">
          <img src="/favicon.svg" alt="Jules Studio" className="w-8 h-8" />
          <span className="text-lg font-bold tracking-tighter uppercase text-stone-900 font-display">
            Jules Studio
          </span>
          <span className="absolute -bottom-1 left-11 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-[calc(100%-2.75rem)]" />
        </Link>

        {/* Desktop Nav — pill indicator */}
        <div className="hidden md:flex items-center gap-1 bg-stone-100/80 backdrop-blur-sm rounded-full px-2 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href ||
              (link.href !== '/' && location.pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right side — CTA + Login */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/dang-nhap"
            className="text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-400 hover:text-stone-900 transition-colors duration-300"
          >
            Đăng Nhập
          </Link>

          <Link
            to="/bat-dau-du-an"
            className="bg-primary text-white px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm shadow-primary/20 btn-press"
          >
            Bắt Đầu Dự Án
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-stone-100 text-stone-900 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu — Fullscreen overlay with stagger animation */}
      <div
        className={`md:hidden fixed inset-0 bg-white/[0.98] backdrop-blur-3xl transition-all duration-500 z-[60] ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-2 text-stone-900 hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-extrabold uppercase tracking-tight transition-all duration-500 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } ${
                location.pathname === link.href
                  ? 'text-primary'
                  : 'text-stone-300 hover:text-stone-900'
              }`}
              style={{ transitionDelay: isOpen ? `${i * 80}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-[1px] w-20 bg-stone-200 my-2" />

          <Link
            to="/dang-nhap"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-stone-400 hover:text-stone-900 transition-colors"
          >
            Đăng Nhập
          </Link>

          <Link
            to="/bat-dau-du-an"
            onClick={() => setIsOpen(false)}
            className="mt-2 bg-primary text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:bg-primary-hover transition-all shadow-md shadow-primary/20"
          >
            Bắt Đầu Dự Án
          </Link>
        </div>
      </div>
    </nav>
  )
}
