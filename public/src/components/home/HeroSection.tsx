import ScrollReveal from '../ui/ScrollReveal'

/**
 * HeroSection — Multi-device showcase (laptop center, dashboard left, tablet right)
 * Style: overlapping mockups like a portfolio showcase.
 * Uses existing images from /images/ directory.
 */
export default function HeroSection() {
  return (
    <section className="pt-28 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal className="space-y-8">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-stone-900 leading-[1.1] font-display">
            Mỗi website
            <br />
            một câu chuyện
            <br />
            được thiết kế
          </h2>

          <p className="text-lg text-stone-600 max-w-xl leading-relaxed font-display">
            Jules Studio thiết kế và xây dựng website mang tính trải nghiệm — phù hợp với từng ngành và mục tiêu kinh doanh.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/du-an"
              className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all font-display"
            >
              Xem Dự Án
            </a>
            <a
              href="/#lien-he"
              className="border-2 border-stone-200 text-stone-700 px-8 py-4 rounded-xl font-bold hover:bg-stone-50 transition-all font-display"
            >
              Liên Hệ Tư Vấn
            </a>
          </div>
        </ScrollReveal>

        {/* Right — Multi-device showcase (laptop + dashboard + tablet overlay) */}
        <ScrollReveal className="relative flex items-center justify-center min-h-[480px]">
          {/* Main Laptop mockup — center */}
          <div className="relative z-10 w-[90%] ml-auto">
            {/* Browser chrome */}
            <div className="bg-white rounded-t-xl shadow-2xl border border-stone-200 overflow-hidden">
              <div className="h-7 bg-stone-100 flex items-center px-3 gap-1.5 border-b border-stone-200">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <div className="flex-1 mx-6">
                  <div className="bg-stone-200 rounded-full h-4 max-w-[200px] mx-auto" />
                </div>
              </div>
              <div className="aspect-[16/10] bg-stone-50">
                <img
                  className="w-full h-full object-cover"
                  src="/images/showcase-desktop.jpg"
                  alt="Desktop website showcase"
                />
              </div>
            </div>
            {/* Laptop base */}
            <div className="h-3 bg-gradient-to-b from-stone-200 to-stone-300 rounded-b-lg shadow-lg" />
          </div>

          {/* Dashboard panel — left, overlapping */}
          <div className="absolute z-20 left-[-24px] top-[15%] w-[40%] bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden">
            <div className="aspect-[4/5]">
              <img
                className="w-full h-full object-cover object-top"
                src="/images/projects/zenith-app.jpg"
                alt="Dashboard overview"
              />
            </div>
          </div>

          {/* Tablet — right bottom, overlapping */}
          <div className="absolute z-20 right-[-16px] bottom-[-8px] w-[35%] bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden">
            <div className="aspect-[3/4]">
              <img
                className="w-full h-full object-cover"
                src="/images/showcase-tablet.jpg"
                alt="Tablet website showcase"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
