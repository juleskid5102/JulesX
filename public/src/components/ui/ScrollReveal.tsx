import { useEffect, useRef, type ReactNode, type ElementType } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  stagger?: number
  as?: ElementType
}

/**
 * ScrollReveal — v4 GSAP-powered scroll-triggered animation
 * Real animations with ScrollTrigger, respect reduced-motion
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  stagger = 0,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const directionMap = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { y: 0, x: -60 },
        right: { y: 0, x: 60 },
        none: { y: 0, x: 0 },
      }

      const { y, x } = directionMap[direction]
      const targets = stagger > 0 ? el.children : el

      gsap.fromTo(
        targets,
        { y, x, opacity: 0 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      cleanup = () => {
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === el)
          .forEach((t) => t.kill())
      }
    }

    init()

    return () => {
      cleanup?.()
    }
  }, [direction, delay, duration, stagger])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Tag>
  )
}
