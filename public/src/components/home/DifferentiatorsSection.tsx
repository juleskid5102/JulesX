import ScrollReveal from '../ui/ScrollReveal'

/**
 * DifferentiatorsSection — Vietnamese titles, blue background
 */
export default function DifferentiatorsSection() {
  return (
    <section className="bg-[#101122] py-24 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h3 className="text-4xl font-extrabold text-white mb-16 font-display">
            Tại sao chọn Jules?
          </h3>
        </ScrollReveal>

        <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/[0.15] transition-all">
            <span className="material-symbols-outlined text-white text-3xl mb-6 block">auto_awesome</span>
            <h5 className="text-xl font-bold mb-4 font-display">Kể Chuyện Thương Hiệu</h5>
            <p className="text-white/70 leading-relaxed text-sm font-display">Chúng tôi không chỉ code, chúng tôi kể câu chuyện về thương hiệu của bạn thông qua ngôn ngữ thiết kế.</p>
          </div>

          <div className="p-8 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/[0.15] transition-all">
            <span className="material-symbols-outlined text-white text-3xl mb-6 block">fit_screen</span>
            <h5 className="text-xl font-bold mb-4 font-display">Phù Hợp Ngành Nghề</h5>
            <p className="text-white/70 leading-relaxed text-sm font-display">Mỗi ngành nghề có một nhịp điệu riêng. Website của bạn sẽ được tối ưu hoàn hảo cho đặc thù đó.</p>
          </div>

          <div className="p-8 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/[0.15] transition-all">
            <span className="material-symbols-outlined text-white text-3xl mb-6 block">animation</span>
            <h5 className="text-xl font-bold mb-4 font-display">Thiết Kế & Chuyển Động</h5>
            <p className="text-white/70 leading-relaxed text-sm font-display">Hiệu ứng chuyển động mượt mà tạo nên cảm giác cao cấp và chuyên nghiệp trong từng cú click.</p>
          </div>

          <div className="p-8 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/[0.15] transition-all">
            <span className="material-symbols-outlined text-white text-3xl mb-6 block">view_carousel</span>
            <h5 className="text-xl font-bold mb-4 font-display">Nổi Bật Giá Trị</h5>
            <p className="text-white/70 leading-relaxed text-sm font-display">Sản phẩm và dịch vụ của bạn là trung tâm. Mọi yếu tố đều được thiết kế để làm nổi bật giá trị cốt lõi.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
