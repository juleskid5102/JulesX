import { useRef, useEffect } from 'react'

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

/**
 * ScrollReveal — simple CSS-based reveal on mount.
 * No GSAP dependency. Elements are always visible.
 * Adds a subtle fade-up animation via CSS transitions.
 */
export default function ScrollReveal({
  children,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '1'
      ref.current.style.transform = 'translateY(0)'
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {children}
    </Tag>
  )
}
