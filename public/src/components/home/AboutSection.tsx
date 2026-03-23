import ScrollReveal from '../ui/ScrollReveal'

const stats = [
  { value: '50+', label: 'Dự án hoàn thành' },
  { value: '100%', label: 'Khách hàng hài lòng' },
  { value: '30 Ngày', label: 'Thời gian hoàn thiện' },
  { value: '24/7', label: 'Hỗ trợ tận tâm' },
]

/**
 * AboutSection — removed "Về Chúng Tôi" label per user request
 */
export default function AboutSection() {
  return (
    <section className="bg-[#F5F5F0] py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — Text */}
        <ScrollReveal className="space-y-6">
          <h3 className="text-3xl md:text-4xl font-extrabold text-stone-900 font-display">
            Thiết kế không chỉ để đẹp — mà để hoạt động
          </h3>
          <p className="text-stone-600 leading-relaxed text-lg font-display">
            Jules Studio là web design studio chuyên thiết kế website theo hướng trải nghiệm và storytelling. 
            Chúng tôi kết hợp giữa thẩm mỹ cao cấp và giải pháp kỹ thuật tối ưu để biến thương hiệu của bạn 
            thành một thực thể số đầy sức sống.
          </p>
        </ScrollReveal>

        {/* Right — Stats Bento Grid */}
        <ScrollReveal className="grid grid-cols-2 gap-4" delay={150}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-8 rounded-xl shadow-sm border border-stone-200/50 hover:shadow-md transition-shadow"
            >
              <p className="text-primary text-3xl font-extrabold mb-1 font-display">{stat.value}</p>
              <p className="text-stone-500 text-sm font-medium font-display">{stat.label}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
