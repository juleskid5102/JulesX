import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollReveal from '../components/ui/ScrollReveal'

/**
 * Services page — matched to Stitch v3 (centered hero, dark tech, blue CTA)
 */

const SERVICES = [
  {
    number: '01',
    title: 'Thiết Kế UI/UX',
    description:
      'Giao diện bắt mắt, trải nghiệm mượt mà — thiết kế dựa trên nghiên cứu người dùng và mục tiêu kinh doanh.',
    tags: ['Figma', 'Wireframe', 'Prototype', 'User Research'],
  },
  {
    number: '02',
    title: 'Phát Triển Web',
    description:
      'Website performance cao với React, hiệu ứng mượt, tốc độ tải nhanh. Responsive hoàn hảo trên mọi thiết bị di động.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Cloudflare'],
  },
  {
    number: '03',
    title: 'Mobile & PWA',
    description:
      'Ứng dụng di động và Progressive Web App — cài đặt như app gốc, chạy mượt mà với push notification thông minh.',
    tags: ['PWA', 'React Native', 'Flutter'],
  },
  {
    number: '04',
    title: 'SEO & Tối Ưu',
    description:
      'Tối ưu hiển thị trên Google, cải thiện tốc độ Core Web Vitals, tăng tỷ lệ chuyển đổi khách hàng tự nhiên.',
    tags: ['SEO', 'Analytics', 'Core Web Vitals', 'Performance'],
  },
]

const TECH_STACK = [
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-9.82 1.1c.54.22 1.1.42 1.69.59-.17-.6-.35-1.21-.48-1.84-.56.3-1.04.63-1.48.97l.27.28m12.54-8.72c-.54-.22-1.1-.42-1.69-.59.17.6.35 1.21.48 1.84.56-.3 1.04-.63 1.48-.97l-.27-.28m-12.54 0c.18-.16.37-.31.57-.43.2-.12.41-.23.62-.33-.64.17-1.23.38-1.76.62l.27.28.3-.14m3.15-2.44c-.36-.37-.75-.7-1.14-1-1.35 1.25-1.93 2.51-1.65 3.04l.04.06a22.52 22.52 0 0 1 2.43-.37c.11-.59.22-1.16.32-1.73"/></svg>
    ),
  },
  {
    name: 'Tailwind',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.3 10.74 14.37 12 16.5 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.2 7.26 14.13 6 12 6M7.5 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.8 16.74 9.87 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.7 13.26 9.63 12 7.5 12z"/></svg>
    ),
  },
  {
    name: 'Vite',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="m12 2-10 18h20L12 2zm0 4.5L17.5 17h-11L12 6.5z"/></svg>
    ),
  },
  {
    name: 'Hono',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    ),
  },
  {
    name: 'Cloudflare',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M16.5 17.5H6a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.78-1A3.5 3.5 0 0 1 20.5 12H21a2.5 2.5 0 0 1 0 5h-4.5zM6 11.5a2 2 0 0 0 0 4h14.5a.5.5 0 0 0 0-1H20a.5.5 0 0 1-.5-.5 1.5 1.5 0 0 0-2.92-.5.5.5 0 0 1-.5.33.5.5 0 0 1-.45-.37A3.5 3.5 0 0 0 9 11a.5.5 0 0 1-.42.5A2.5 2.5 0 0 0 6 11.5z"/></svg>
    ),
  },
  {
    name: 'Firebase',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M3.89 15.67L6.72 2.16a.5.5 0 0 1 .93-.08l3.04 5.71-1.15 2.17-5.65 5.71zm16.79 3.34L18.85 3.68a.5.5 0 0 1-.88-.14L15 9.79 12.97 5.8l-1.43 2.68 3.12 5.86 6.02-3.33zm-2.19.93l-2.26-13.75L12.97 12l-6.95-1.5L3.89 15.67l7.59 4.38c.33.19.73.19 1.06 0l6.95-4.01z"/></svg>
    ),
  },
  {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 2H8.5A3.5 3.5 0 0 0 5 5.5 3.5 3.5 0 0 0 8.5 9H12V2z M5 12a3.5 3.5 0 0 0 3.5 3.5H12V8.5H8.5A3.5 3.5 0 0 0 5 12zm0 6.5A3.5 3.5 0 0 0 8.5 22 3.5 3.5 0 0 0 12 18.5v-3H8.5A3.5 3.5 0 0 0 5 18.5zM12 2v7h3.5A3.5 3.5 0 0 0 19 5.5 3.5 3.5 0 0 0 15.5 2H12zm3.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>
    ),
  },
  {
    name: 'GSAP',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 4v8l5-4-5-4zm6 0v8h2v-3h2a2 2 0 0 0 0-4h-4zm2 2h1.5a.5.5 0 0 1 0 1H15v-1z"/></svg>
    ),
  },
]

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero — centered matching Stitch v3 */}
        <section className="px-6 max-w-7xl mx-auto text-center mb-20">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 font-display">
              Giải pháp thiết kế toàn diện
            </h1>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto font-display">
              Từ UI/UX đến development — Jules Studio đồng hành cùng bạn ở mọi giai đoạn để kiến tạo những sản phẩm kỹ thuật số vượt trội.
            </p>
          </ScrollReveal>
        </section>

        {/* Service Blocks — numbered rows matching Stitch v3 */}
        <section className="px-6 max-w-7xl mx-auto">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 80}>
              <div className="py-12 border-b border-stone-200 grid md:grid-cols-[100px_1fr_auto] gap-8 items-start service-row group">
                <div className="text-6xl font-black text-primary/10 group-hover:text-primary/20 transition-colors font-display">
                  {service.number}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-stone-900 service-title transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 max-w-xl leading-relaxed font-display">
                    {service.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium font-display"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        {/* Tech Stack — dark navy bg matching Stitch v3 */}
        <section className="mt-24 bg-[#101122] py-24 px-6">
          <ScrollReveal className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-extrabold text-stone-50 mb-12 font-display">
              Công Nghệ Sử Dụng
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center gap-4 py-8 px-4 border-r border-b border-white/10"
                >
                  <div className="text-primary">
                    {tech.icon}
                  </div>
                  <span className="text-stone-400 text-xs font-bold tracking-widest uppercase font-display">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* CTA — centered, blue button matching Stitch v3 */}
        <section className="py-24 px-6">
          <ScrollReveal className="max-w-7xl mx-auto text-center">
            <h3 className="text-2xl font-extrabold text-stone-900 mb-4 font-display">
              Cần giải pháp cho dự án?
            </h3>
            <p className="text-stone-500 mb-8 font-display">
              Đừng ngần ngại liên hệ để nhận tư vấn miễn phí về ý tưởng của bạn.
            </p>
            <Link
              to="/bat-dau-du-an"
              className="inline-block bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all font-display"
            >
              Liên Hệ Tư Vấn
            </Link>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
