import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

/**
 * HeroSection — EXACT from 01-homepage.html lines 60-74
 * 
 * Source: <section class="relative min-h-screen flex flex-col justify-center bg-background-dark px-6 md:px-24">
 *   <h1 class="text-white text-5xl md:text-[7.5rem] font-extrabold leading-[0.9] tracking-tighter mb-10 font-syne uppercase md:w-[90%]">
 *   <button class="bg-primary text-white px-12 py-5 text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-background-dark transition-all self-start">
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-background-dark px-6 md:px-24">
      <div className="max-w-6xl w-full">
        <Reveal>
          <h1 className="text-white text-5xl md:text-[7.5rem] font-extrabold leading-[0.9] tracking-tighter mb-10 font-heading uppercase md:w-[90%]">
            CHÚNG TÔI KIẾN TẠO TRẢI NGHIỆM SỐ
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-slate-400 text-lg md:text-xl max-w-md font-display">
              Studio phát triển web chuyên xây dựng sản phẩm số cao cấp cho doanh nghiệp tiên phong.
            </p>
            <Link
              to="/du-an"
              className="bg-primary text-white px-12 py-5 text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-background-dark transition-all self-start"
            >
              Xem Dự Án
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
