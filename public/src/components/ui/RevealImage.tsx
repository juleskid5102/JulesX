import { useEffect, useRef } from 'react'

/**
 * RevealImage — GSAP clip-path reveal animation
 * Image slides in from bottom with inner scale-down effect.
 */
export default function RevealImage({
  src,
  alt,
  className = '',
  delay = 0,
}: {
  src: string
  alt: string
  className?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.clipPath = 'inset(0% 0% 0% 0%)'
      return
    }

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Clip-path reveal — bottom to top
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Inner image scale-down
      const img = el.querySelector('img')
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.6,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }

    init()
  }, [delay])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  )
}
