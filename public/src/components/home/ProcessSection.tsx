import Reveal from '../ui/Reveal'

/**
 * ProcessSection — EXACT from 01-homepage.html lines 75-101
 * 
 * Source: <section class="bg-white py-32 px-6 md:px-24 border-b border-slate-100">
 *   <span class="text-sm font-bold tracking-[0.3em] text-primary uppercase">
 *   Grid: grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200
 */
const steps = [
  {
    number: '(01)',
    title: 'Khám Phá',
    description: 'Xác định mục tiêu cốt lõi, yêu cầu kỹ thuật và phạm vi dự án thông qua nghiên cứu chuyên sâu.',
  },
  {
    number: '(02)',
    title: 'Thiết Kế',
    description: 'Tạo ra các giao diện tối giản, chất lượng cao và bản mẫu tập trung vào trải nghiệm người dùng.',
  },
  {
    number: '(03)',
    title: 'Phát Triển',
    description: 'Xây dựng hệ thống mạnh mẽ với mã nguồn sạch, có khả năng mở rộng và công nghệ hiện đại.',
  },
  {
    number: '(04)',
    title: 'Ra Mắt',
    description: 'Kiểm tra hiệu năng cuối cùng, tối ưu hóa và triển khai sản phẩm lên môi trường thực tế.',
  },
]

export default function ProcessSection() {
  return (
    <section className="bg-white py-32 px-6 md:px-24 border-b border-slate-100">
      <Reveal>
        <div className="mb-16">
          <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">Quy Trình Làm Việc</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 100}>
            <div className={`py-12 md:px-10 ${index === 0 ? 'first:pl-0' : ''} ${index === steps.length - 1 ? 'last:pr-0' : ''}`}>
              <span className="text-6xl font-extrabold text-slate-100 block mb-6 font-heading">
                {step.number}
              </span>
              <h3 className="text-2xl font-bold mb-4 font-heading uppercase">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-display">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
