import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

/**
 * HeroSection — From 01-homepage.html lines 60-74
 * Hero text fetched from /api/public/site-settings
 */

interface HeroData {
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  heroCtaLink: string
}

const DEFAULT_HERO: HeroData = {
  heroTitle: 'CHÚNG TÔI KIẾN TẠO TRẢI NGHIỆM SỐ',
  heroSubtitle: 'Studio phát triển web chuyên xây dựng sản phẩm số cao cấp cho doanh nghiệp tiên phong.',
  heroCta: 'Xem Dự Án',
  heroCtaLink: '/du-an',
}

export default function HeroSection() {
  const [hero, setHero] = useState<HeroData>(DEFAULT_HERO)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/site-settings`)
      .then(async (res) => {
        if (!res.ok) return
        const data = await res.json()
        if (data.heroTitle || data.heroSubtitle) {
          setHero({
            heroTitle: data.heroTitle || DEFAULT_HERO.heroTitle,
            heroSubtitle: data.heroSubtitle || DEFAULT_HERO.heroSubtitle,
            heroCta: data.heroCta || DEFAULT_HERO.heroCta,
            heroCtaLink: data.heroCtaLink || DEFAULT_HERO.heroCtaLink,
          })
        }
      })
      .catch(() => { /* use defaults */ })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-background-dark px-6 md:px-24">
      <div className="max-w-6xl w-full">
        <Reveal>
          <h1 className="text-white text-5xl md:text-[7.5rem] font-extrabold leading-[0.9] tracking-tighter mb-10 font-heading uppercase md:w-[90%]">
            {hero.heroTitle}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-slate-400 text-lg md:text-xl max-w-md font-display">
              {hero.heroSubtitle}
            </p>
            <Link
              to={hero.heroCtaLink}
              className="bg-primary text-white px-12 py-5 text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-background-dark transition-all self-start"
            >
              {hero.heroCta}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
