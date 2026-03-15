import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

/**
 * HeroSection — Redesigned to match Stitch 00-hero.html
 * Black bg (matching footer), oversized Syne heading, Vietnamese text
 * Text is hardcoded — not fetched from API
 */

const HERO = {
  title: 'THIẾT KẾ\nWEBSITE\nHIỆN ĐẠI',
  subtitle: 'Thiết kế và phát triển website chuyên nghiệp, tối ưu trải nghiệm người dùng, hiệu năng cao và khả năng mở rộng linh hoạt.',
  cta: 'Khám Phá Jules Studio',
  ctaLink: '/du-an',
}

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-black px-6 md:px-24 pt-28">
      <div className="max-w-6xl w-full">
        <Reveal>
          <h1
            className="text-white text-6xl md:text-[8rem] font-extrabold leading-[0.9] tracking-tighter mb-16 uppercase md:w-[80%] whitespace-pre-line"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {HERO.title}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <p className="text-slate-400 text-lg md:text-xl max-w-md font-display leading-relaxed">
              {HERO.subtitle}
            </p>
            <Link
              to={HERO.ctaLink}
              className="bg-white text-slate-900 px-12 py-5 text-base font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 self-start"
            >
              {HERO.cta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
