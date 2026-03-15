import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

/**
 * HeroSection — Matched exactly to Stitch 00-hero.html (Vietnamese version)
 * Black bg, oversized heading, Space Grotesk for Vietnamese support
 */

const HERO = {
  title: 'THIẾT KẾ WEBSITE HIỆN ĐẠI',
  subtitle: 'Studio thiết kế và phát triển website tối ưu trải nghiệm, hiệu năng và khả năng mở rộng.',
  cta: 'Khám Phá Jules Studio',
  ctaLink: '/du-an',
}

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-black px-6 md:px-24 pt-28">
      <div className="max-w-6xl w-full">
        <Reveal>
          <h1
            className="text-white text-5xl md:text-[7.5rem] font-extrabold leading-[0.9] tracking-tighter mb-10 uppercase md:w-[90%]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {HERO.title}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-slate-400 text-lg md:text-xl max-w-md font-display">
              {HERO.subtitle}
            </p>
            <Link
              to={HERO.ctaLink}
              className="bg-white text-slate-900 px-12 py-5 text-lg font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all self-start"
            >
              {HERO.cta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
