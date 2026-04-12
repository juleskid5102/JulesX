import ScrollReveal from '../ui/ScrollReveal'

/**
 * DifferentiatorsSection — v4 Premium with glow cards
 * Dark background with glass-morphic cards that glow on hover
 */
export default function DifferentiatorsSection() {
  const items = [
    {
      icon: 'auto_awesome',
      title: 'Kể Chuyện Thương Hiệu',
      desc: 'Chúng tôi không chỉ code, chúng tôi kể câu chuyện về thương hiệu của bạn thông qua ngôn ngữ thiết kế.',
    },
    {
      icon: 'fit_screen',
      title: 'Phù Hợp Ngành Nghề',
      desc: 'Mỗi ngành nghề có một nhịp điệu riêng. Website của bạn sẽ được tối ưu hoàn hảo cho đặc thù đó.',
    },
    {
      icon: 'animation',
      title: 'Thiết Kế & Chuyển Động',
      desc: 'Hiệu ứng chuyển động mượt mà tạo nên cảm giác cao cấp và chuyên nghiệp trong từng cú click.',
    },
    {
      icon: 'view_carousel',
      title: 'Nổi Bật Giá Trị',
      desc: 'Sản phẩm và dịch vụ của bạn là trung tâm. Mọi yếu tố đều được thiết kế để làm nổi bật giá trị cốt lõi.',
    },
  ]

  return (
    <section className="bg-[#101122] py-32 px-6 text-white overflow-hidden grain-overlay">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary/70 mb-4 font-display">
            Tại sao chọn chúng tôi
          </p>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-16 font-display leading-tight">
            Tại sao chọn{' '}
            <span className="text-primary">Jules?</span>
          </h3>
        </ScrollReveal>

        <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {items.map((item) => (
            <div
              key={item.title}
              className="glow-card p-8 bg-white/[0.05] border border-white/[0.08] rounded-2xl backdrop-blur-sm group cursor-default"
            >
              {/* Icon with animated background */}
              <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-all duration-500 group-hover:scale-110" />
                <span className="material-symbols-outlined text-white text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
              </div>

              <h5 className="text-xl font-bold mb-4 font-display group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h5>
              <p className="text-white/50 leading-relaxed text-sm font-display group-hover:text-white/70 transition-colors duration-500">
                {item.desc}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
