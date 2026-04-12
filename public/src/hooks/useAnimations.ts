import { useEffect, useRef } from 'react'

/**
 * GSAP ScrollTrigger — scroll-triggered reveal animations
 * Returns a ref to attach to the animated element.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number
    x?: number
    opacity?: number
    duration?: number
    delay?: number
    stagger?: number
    once?: boolean
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const {
        y = 60,
        x = 0,
        opacity = 0,
        duration = 1,
        delay = 0,
        once = true,
      } = options

      // Animate children if stagger is set, else animate element itself
      const targets = options.stagger ? el.children : el

      gsap.fromTo(
        targets,
        { y, x, opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          stagger: options.stagger ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
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
  }, [])

  return ref
}

/**
 * Parallax depth effect on elements
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        el,
        { y: -50 * speed },
        {
          y: 50 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }

    init()
  }, [speed])

  return ref
}

/**
 * CountUp animation — counts from 0 to target when element enters viewport.
 * Returns { ref, count } to display the animated number.
 */
export function useCountUp(target: number, duration: number = 2000) {
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry || !entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true

        let start = 0
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          // Ease out quad
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.floor(eased * target)
          el.textContent = current.toString()
          if (progress < 1) requestAnimationFrame(step)
          else el.textContent = target.toString()
        }
        requestAnimationFrame(step)
        observer.disconnect()
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return ref
}

/**
 * Stagger reveal for a grid of children on scroll
 */
export function useStaggerReveal<T extends HTMLElement>(
  stagger: number = 0.1,
  y: number = 80
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        el.children,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    init()
  }, [stagger, y])

  return ref
}
