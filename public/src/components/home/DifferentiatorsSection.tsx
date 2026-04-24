import { useEffect, useRef, useState } from 'react'

/**
 * DifferentiatorsSection — JulesX Editorial
 * Reference: screen3.png "Performance & Tech" section
 * Left: Lighthouse 100/100 score circle
 * Right: 3×3 tech logos grid (dark cards)
 * Light warm background.
 */

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = target + suffix
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 2000
          const step = (ts: number) => {
            if (!start) start = ts
            const progress = Math.min((ts - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.floor(eased * target) + suffix
            if (progress < 1) requestAnimationFrame(step)
            else el.textContent = target + suffix
          }
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, hasAnimated])

  return <span ref={ref}>0{suffix}</span>
}

/* Tech stack items with SVG icons matching screen3 dark grid */
const techStack = [
  {
    name: 'Next.js',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.049-.106.006-4.703.007-4.705.073-.091a.637.637 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" />
      </svg>
    ),
  },
  {
    name: 'React',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.846.192a1.999 1.999 0 00-.838 1.028c-.494 1.07-.394 2.73.248 4.708C3.525 8.644 2.4 10.222 2.4 12.004c0 1.782 1.125 3.36 3.068 4.746-.642 1.978-.742 3.637-.248 4.708.168.365.462.648.838 1.028.253.124.535.192.846.192 1.345 0 3.107-.96 4.888-2.622 1.78 1.653 3.542 2.602 4.887 2.602.31 0 .592-.068.846-.192a2 2 0 00.838-1.028c.494-1.07.394-2.73-.249-4.708 1.944-1.386 3.068-2.964 3.068-4.746 0-1.782-1.124-3.36-3.068-4.746.643-1.978.743-3.638.249-4.708a2 2 0 00-.838-1.028 1.93 1.93 0 00-.846-.192zM12 16.92a4.92 4.92 0 110-9.84 4.92 4.92 0 010 9.84z" />
      </svg>
    ),
  },
  {
    name: 'GSAP',
    icon: (
      <span className="font-heading text-sm font-bold tracking-wider">GSAP</span>
    ),
  },
  {
    name: 'Cloudflare',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.5752-.498-.9531-.5264l-8.3789-.1123c-.0537-.0029-.0967-.0283-.1182-.0654-.0215-.0371-.0244-.083-.0088-.126.0244-.0615.083-.1064.1504-.1143l8.4727-.1133c1.0605-.0606 2.2061-.916 2.6475-1.9736l.5605-1.3428a.2798.2798 0 00.0195-.1797C19.2539 7.1719 15.8809 4 11.6914 4 7.9062 4 4.7012 6.5957 3.8438 10.0898c-.749-.5537-1.6572-.8535-2.6133-.7744C.3008 9.3975-.269 10.1816.104 11.1406c.2881.7295.957 1.2295 1.7256 1.3037l.0439.002h10.2754c.0537 0 .0967.0273.1182.0654.0215.037.0244.083.0088.126-.0244.0615-.083.1064-.1504.1143l-8.5225.1133c-1.0605.0606-2.2061.916-2.6475 1.9736l-.1875.4492c-.0449.1074.0391.2197.1562.2197h15.7647c.0781 0 .1445-.0508.1641-.1211z" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <span className="font-heading text-xs font-bold">TS</span>
    ),
  },
  {
    name: 'Tailwind',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'Hono',
    icon: (
      <span className="text-2xl">🔥</span>
    ),
  },
  {
    name: 'Vite',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.805 2.658L12.39 21.573a.525.525 0 01-.943.032L2.12 2.716a.524.524 0 01.525-.773l9.123 1.628a.524.524 0 00.187 0l8.97-1.636a.525.525 0 01.578.723z" />
      </svg>
    ),
  },
]

export default function DifferentiatorsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const els = sectionRef.current?.querySelectorAll('.diff-item')
      if (!els) return

      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: els[0], start: 'top 80%' },
        }
      )
    }

    init()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header — simple like screen3 */}
        <div className="diff-item mb-12">
          <h2
            className="font-heading font-bold text-text tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Hiệu Suất & Công Nghệ
          </h2>
        </div>

        {/* Layout: Lighthouse Score + Tech Grid — matching screen3 */}
        <div className="diff-item grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Lighthouse Score on dark card */}
          <div className="bg-[#1A1A1A] p-10 md:p-14 flex flex-col justify-center items-start">
            {/* Score circle */}
            <div className="relative mb-8">
              <div
                className="w-28 h-28 border-[3px] border-[#4ADE80] flex items-center justify-center"
                style={{ borderRadius: '50%' }}
              >
                <span className="font-heading text-4xl font-bold text-[#4ADE80]">
                  <CountUp target={100} />
                </span>
              </div>
            </div>
            <p className="font-heading text-2xl font-bold text-white mb-1">
              <span className="text-[#4ADE80]">100</span>/100
            </p>
            <p className="text-white/40 text-sm uppercase tracking-[0.15em]">
              Lighthouse Score
            </p>
          </div>

          {/* Right — Tech Stack 3×3 grid on dark cards */}
          <div className="grid grid-cols-3 gap-2">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-[#1A1A1A] aspect-square flex flex-col items-center justify-center gap-2 group hover:bg-[#252525] transition-colors duration-300 cursor-default"
              >
                <span className="text-white/60 group-hover:text-white transition-colors duration-300">
                  {tech.icon}
                </span>
                <span className="text-white/30 text-[10px] uppercase tracking-wider group-hover:text-white/50 transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
