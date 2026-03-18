import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  stagger?: number
  as?: React.ElementType
}

const dirMap: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
  none: {},
}

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

  useGSAP(
    () => {
      const targets = stagger ? ref.current?.children : ref.current
      if (!targets) return

      gsap.from(targets, {
        ...dirMap[direction],
        opacity: 0,
        duration,
        delay,
        stagger: stagger || undefined,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
