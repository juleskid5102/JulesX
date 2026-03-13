import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/**
 * Services — EXACT from 07-services.html
 *
 * Structure:
 * - Hero: max-w-[1440px], text-5xl md:text-6xl lg:text-[5rem]
 * - Service rows with background images, hover effects via CSS (.service-row)
 * - Technology grid: opacity-70, font-heading text-2xl
 * - CTA: hover:scale-105 active:scale-95
 */

const services = [
  {
    number: '01',
    title: 'Thiết Kế Sản Phẩm',
    description: 'Chuyên thiết kế giao diện người dùng tinh tế, tối giản nhưng mang tính ứng dụng cao. Chúng tôi tập trung vào trải nghiệm người dùng để tạo ra những sản phẩm số không chỉ đẹp mắt mà còn hiệu quả.',
    tags: ['UI/UX Design', 'Prototyping', 'Design Systems', 'Wireframing'],
    bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    number: '02',
    title: 'Phát Triển Website',
    description: 'Xây dựng website chuẩn SEO, hiệu suất cao với các công nghệ hiện đại nhất. Từ trang web doanh nghiệp đến các ứng dụng web phức tạp, chúng tôi đảm bảo mã nguồn sạch và tối ưu.',
    tags: ['React & Next.js', 'Front-end Development', 'CMS Integration', 'Web Animations'],
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    number: '03',
    title: 'Hệ Thống Thương Mại',
    description: 'Giải pháp thương mại điện tử toàn diện giúp tăng doanh thu hiệu quả. Tích hợp thanh toán an toàn, quản lý kho hàng và tối ưu hóa quy trình mua sắm cho khách hàng.',
    tags: ['Shopify Custom', 'WooCommerce', 'Payment Gateways', 'Inventory Sync'],
    bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    number: '04',
    title: 'Giải Pháp SaaS',
    description: 'Thiết kế và phát triển các nền tảng phần mềm dưới dạng dịch vụ (SaaS) có khả năng mở rộng cao. Kiến trúc đa người dùng, bảo mật dữ liệu và hiệu năng tối đa.',
    tags: ['Full-stack Development', 'Cloud Architecture', 'API Development', 'Database Design'],
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  },
]

const technologies = ['React', 'Next.js', 'Tailwind', 'Node.js', 'Figma', 'TypeScript', 'Vercel', 'Prisma']

export default function Services() {
  return (
    <div className="bg-background-light text-slate-900 font-display min-h-screen antialiased">
      <Navbar />

      <main className="pt-32">
        {/* Hero — exact from 07-services.html lines 63-70 */}
        <section className="max-w-[1440px] mx-auto px-8 pt-32 pb-24">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-primary text-sm font-bold tracking-widest uppercase mb-6">Dịch Vụ</p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-slate-900">
                Giải Pháp Kỹ Thuật Số Toàn Diện
              </h1>
            </div>
          </Reveal>
        </section>

        {/* Service Rows — exact from 07-services.html lines 71-152 */}
        <section className="border-t border-slate-200">
          {services.map((service) => (
            <div key={service.number} className="service-row relative border-b border-slate-200 group transition-colors duration-500 overflow-hidden">
              <div
                className="service-bg absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 grayscale"
                style={{ backgroundImage: `url('${service.bgImage}')` }}
              />
              <div className="max-w-[1440px] mx-auto px-8 py-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                <div className="w-full lg:w-1/2 flex gap-8 items-start">
                  <span className="font-heading text-2xl font-semibold text-slate-400 mt-2">{service.number}</span>
                  <h3 className="service-title font-heading text-4xl lg:text-[2.5rem] font-bold text-slate-900 transition-colors duration-300">{service.title}</h3>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-8">
                  <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 border border-slate-200 text-sm font-medium text-slate-700">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Technology Grid — exact from 07-services.html lines 153-165 */}
        <Reveal>
          <section className="max-w-[1440px] mx-auto px-8 py-32 border-b border-slate-200">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-16 text-center">Công Nghệ Sử Dụng</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 max-w-4xl mx-auto opacity-70">
              {technologies.map((tech) => (
                <div key={tech} className="flex items-center justify-center font-heading text-2xl font-semibold tracking-wider uppercase">{tech}</div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* CTA — exact from 07-services.html lines 166-175 */}
        <Reveal>
          <section className="py-40 px-8 bg-white text-center">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-12">
                Sẵn sàng nâng tầm thương hiệu?
              </h2>
              <Link
                to="/#lien-he"
                className="h-16 px-12 bg-slate-900 text-white text-lg font-bold tracking-widest uppercase transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95 inline-flex items-center"
              >
                Liên Hệ Ngay
              </Link>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </div>
  )
}
