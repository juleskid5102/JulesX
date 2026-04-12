import ScrollReveal from '../ui/ScrollReveal'

const steps = [
  {
    num: '01',
    title: 'Khám Phá',
    desc: 'Phân tích mục tiêu kinh doanh, đối tượng khách hàng và định vị thương hiệu.',
  },
  {
    num: '02',
    title: 'Thiết Kế',
    desc: 'Xây dựng wireframe và thiết kế UI/UX theo concept độc bản.',
  },
  {
    num: '03',
    title: 'Phát Triển',
    desc: 'Hiện thực hóa bản vẽ bằng mã nguồn tối ưu, tốc độ nhanh và chuẩn SEO.',
  },
  {
    num: '04',
    title: 'Ra Mắt',
    desc: 'Kiểm thử toàn diện, đào tạo vận hành và đồng hành phát triển lâu dài.',
  },
]

/**
 * ProcessSection — v4 Premium with timeline animation + connecting line
 * Sequential reveal with number accent
 */
export default function ProcessSection() {
  return (
    <section className="bg-[#F5F5F0] py-32 px-6">
      <ScrollReveal className="max-w-7xl mx-auto text-center mb-20">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary/70 mb-4 font-display">
          Quy trình
        </p>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display">
          Từ ý tưởng đến <span className="text-primary">sản phẩm</span>
        </h3>
      </ScrollReveal>

      <ScrollReveal className="max-w-7xl mx-auto" stagger={0.15}>
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[12%] right-[12%] h-[1px] bg-stone-300/50" />

          {steps.map((step) => (
            <div key={step.num} className="relative group text-center md:text-left">
              {/* Number circle */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6 mx-auto md:mx-0">
                <div className="absolute inset-0 rounded-full bg-white border-2 border-stone-200 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-500" />
                <span className="relative z-10 text-2xl font-extrabold text-stone-300 group-hover:text-primary transition-colors duration-500 font-display">
                  {step.num}
                </span>
              </div>

              <h5 className="text-xl font-bold mb-3 font-display group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h5>
              <p className="text-stone-500 text-sm leading-relaxed font-display max-w-xs mx-auto md:mx-0">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
