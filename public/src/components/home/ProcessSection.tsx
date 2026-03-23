import ScrollReveal from '../ui/ScrollReveal'

/**
 * ProcessSection — matches Stitch HTML exactly
 * 4-step process with large numbered indicators
 */
export default function ProcessSection() {
  return (
    <section className="bg-[#F5F5F0] py-24 px-6">
      <ScrollReveal className="max-w-7xl mx-auto text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-extrabold text-stone-900 font-display">
          Từ ý tưởng đến sản phẩm
        </h3>
      </ScrollReveal>

      <ScrollReveal className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="relative group">
          <div className="text-7xl font-black text-primary/10 mb-6 group-hover:text-primary/20 transition-colors font-display">01</div>
          <h5 className="text-xl font-bold mb-3 font-display">Khám Phá</h5>
          <p className="text-stone-600 text-sm leading-relaxed font-display">Phân tích mục tiêu kinh doanh, đối tượng khách hàng và định vị thương hiệu.</p>
        </div>

        <div className="relative group">
          <div className="text-7xl font-black text-primary/10 mb-6 group-hover:text-primary/20 transition-colors font-display">02</div>
          <h5 className="text-xl font-bold mb-3 font-display">Thiết Kế</h5>
          <p className="text-stone-600 text-sm leading-relaxed font-display">Xây dựng wireframe và thiết kế UI/UX theo concept độc bản.</p>
        </div>

        <div className="relative group">
          <div className="text-7xl font-black text-primary/10 mb-6 group-hover:text-primary/20 transition-colors font-display">03</div>
          <h5 className="text-xl font-bold mb-3 font-display">Phát Triển</h5>
          <p className="text-stone-600 text-sm leading-relaxed font-display">Hiện thực hóa bản vẽ bằng mã nguồn tối ưu, tốc độ nhanh và chuẩn SEO.</p>
        </div>

        <div className="relative group">
          <div className="text-7xl font-black text-primary/10 mb-6 group-hover:text-primary/20 transition-colors font-display">04</div>
          <h5 className="text-xl font-bold mb-3 font-display">Ra Mắt</h5>
          <p className="text-stone-600 text-sm leading-relaxed font-display">Kiểm thử toàn diện, đào tạo vận hành và đồng hành phát triển lâu dài.</p>
        </div>
      </ScrollReveal>
    </section>
  )
}
