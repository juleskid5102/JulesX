/**
 * Seed 3 showcase projects to Firestore — v3 Stitch content
 * Run: node scripts/seed-projects.mjs
 */
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const keyPath = resolve(__dirname, '..', 'jules-studio-firebase-adminsdk-fbsvc-f05ee766ad.json')
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'))

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

const projects = [
  {
    id: 'jules-oasis',
    slug: 'jules-oasis',
    title: 'Jules Oasis — Resort & Spa',
    category: 'Hospitality',
    field: 'Hospitality',
    webTypeKey: 'booking',
    designStyle: 'Exaggerated Minimalism, Storytelling-Driven',
    designStyleIds: ['exaggerated-minimalism', 'storytelling-driven'],
    completedAt: '03/2025',
    image: '/images/projects/jules-oasis.jpg',
    featured: true,
    order: 1,
    status: 'published',
    description: 'Jules Oasis là một khu nghỉ dưỡng cao cấp tọa lạc tại vùng biển miền Trung, định hướng mang lại trải nghiệm tĩnh lặng và sang trọng tuyệt đối cho khách hàng. Thách thức lớn nhất là chuyển tải được sự tinh tế của không gian thực tế lên môi trường kỹ thuật số thông qua ngôn ngữ thiết kế và trải nghiệm người dùng mượt mà.',
    overview: 'Chúng tôi đã tiếp cận dự án bằng cách tập trung vào "Visual Storytelling", sử dụng những hình ảnh khổ lớn chất lượng cao kết hợp với hệ thống typography thanh mảnh, tạo cảm giác thư giãn ngay từ lần đầu truy cập.',
    challenge: 'Trang web cũ của resort có tốc độ tải trang chậm, hệ thống đặt phòng phức tạp và không phản ánh đúng định vị cao cấp. Tỷ lệ thoát trang trên thiết bị di động lên tới 65%, gây thất thoát doanh thu trực tiếp.',
    solution: 'Chúng tôi xây dựng lại toàn bộ cấu trúc thông tin, tối giản hóa quy trình đặt phòng chỉ còn 3 bước. Sử dụng công nghệ SSR để tối ưu tốc độ và triển khai giao diện "Mobile-first" giúp trải nghiệm trên điện thoại trở nên hoàn hảo.',
    duration: '8 tuần',
    stack: 'React, SSR, Tailwind CSS',
    lighthouse: '98',
    gallery: ['/images/projects/jules-oasis.jpg', '/images/projects/jules-oasis.jpg', '/images/projects/jules-oasis.jpg'],
    techTags: ['React', 'SSR', 'Tailwind CSS', 'GSAP', 'Cloudflare Workers'],
    features: [
      { id: 'homepage', name: 'Homepage (hero + sections + CTA)', cat: 'core' },
      { id: 'about-page', name: 'About Page', cat: 'core' },
      { id: 'contact-page', name: 'Contact Page (form + map + info)', cat: 'core' },
      { id: 'footer-header', name: 'Footer + Header', cat: 'core' },
      { id: 'fab', name: 'FAB (Floating Action Button)', cat: 'core' },
      { id: 'services-list', name: 'Services/Products List', cat: 'content' },
      { id: 'portfolio-grid', name: 'Portfolio/Gallery Grid', cat: 'content' },
      { id: 'testimonials', name: 'Testimonials Section', cat: 'content' },
      { id: 'booking-form', name: 'Booking Form (đơn giản)', cat: 'booking' },
      { id: 'responsive', name: 'Responsive (mobile + tablet)', cat: 'technical' },
      { id: 'seo-basic', name: 'SEO cơ bản (meta, sitemap, robots)', cat: 'technical' },
      { id: 'gsap-animations', name: 'GSAP scroll animations', cat: 'design' },
      { id: 'smooth-scroll', name: 'Smooth scroll (Lenis)', cat: 'design' },
      { id: 'parallax', name: 'Parallax effects', cat: 'design' },
    ],
  },
  {
    id: 'lumina-store',
    slug: 'lumina-store',
    title: 'Lumina Store',
    category: 'E-Commerce',
    field: 'E-Commerce',
    webTypeKey: 'ecommerce',
    designStyle: 'Minimalism, Flat Design',
    designStyleIds: ['minimalism-toi-gian', 'flat-design'],
    completedAt: '01/2025',
    image: '/images/projects/lumina-store.jpg',
    featured: true,
    order: 2,
    status: 'published',
    description: 'Nền tảng mua sắm thời trang trực tuyến với giao diện tối giản, tập trung vào sản phẩm. Trải nghiệm mượt mà từ duyệt sản phẩm đến thanh toán.',
    challenge: 'Xây dựng một trải nghiệm mua sắm cạnh tranh với các nền tảng lớn, nhưng vẫn giữ bản sắc riêng và tốc độ vượt trội.',
    solution: 'Thiết kế grid sản phẩm linh hoạt, quick-view modal, và giỏ hàng mini. Tối ưu hình ảnh sản phẩm với format WebP và CDN edge caching.',
    duration: '6 tuần',
    stack: 'React, Hono, Firestore',
    lighthouse: '94',
    gallery: ['/images/projects/lumina-store.jpg', '/images/projects/lumina-store.jpg', '/images/projects/lumina-store.jpg'],
    techTags: ['React', 'Hono', 'Firestore', 'Stripe', 'Cloudflare Workers'],
    features: [
      { id: 'homepage', name: 'Homepage (hero + sections + CTA)', cat: 'core' },
      { id: 'contact-page', name: 'Contact Page (form + map + info)', cat: 'core' },
      { id: 'footer-header', name: 'Footer + Header', cat: 'core' },
      { id: 'services-list', name: 'Services/Products List', cat: 'content' },
      { id: 'service-detail', name: 'Service/Product Detail', cat: 'content' },
      { id: 'shopping-cart', name: 'Shopping Cart', cat: 'booking' },
      { id: 'checkout-payment', name: 'Checkout + Payment (Stripe/VNPay)', cat: 'booking' },
      { id: 'order-tracking', name: 'Order Tracking', cat: 'booking' },
      { id: 'login-register', name: 'Login/Register (Firebase Auth)', cat: 'auth' },
      { id: 'dashboard-admin', name: 'Dashboard Admin (CRUD cơ bản)', cat: 'admin' },
      { id: 'responsive', name: 'Responsive (mobile + tablet)', cat: 'technical' },
      { id: 'seo-basic', name: 'SEO cơ bản (meta, sitemap, robots)', cat: 'technical' },
      { id: 'email-notification', name: 'Email notification', cat: 'notification' },
    ],
  },
  {
    id: 'zenith-app',
    slug: 'zenith-app',
    title: 'Zenith App',
    category: 'SaaS',
    field: 'SaaS',
    webTypeKey: 'webapp',
    designStyle: 'Bento Box Grid, Dark Mode',
    designStyleIds: ['bento-box-grid', 'dark-mode-oled'],
    completedAt: '12/2024',
    image: '/images/projects/zenith-app.jpg',
    featured: true,
    order: 3,
    status: 'published',
    description: 'Giải pháp quản lý dự án thông minh với dashboard trực quan, biểu đồ real-time, và workflow tự động hóa cho doanh nghiệp vừa và nhỏ.',
    challenge: 'Biến một ứng dụng phức tạp với nhiều tính năng thành giao diện dễ sử dụng cho cả người dùng kỹ thuật và phi kỹ thuật.',
    solution: 'Thiết kế progressive disclosure — hiển thị thông tin theo cấp độ, dashboard tuỳ chỉnh, và onboarding hướng dẫn từng bước.',
    duration: '8 tuần',
    stack: 'React, TypeScript, D3.js',
    lighthouse: '92',
    gallery: ['/images/projects/zenith-app.jpg', '/images/projects/zenith-app.jpg', '/images/projects/zenith-app.jpg'],
    techTags: ['React', 'TypeScript', 'D3.js', 'Firebase', 'Zustand'],
    features: [
      { id: 'homepage', name: 'Homepage (hero + sections + CTA)', cat: 'core' },
      { id: 'footer-header', name: 'Footer + Header', cat: 'core' },
      { id: 'login-register', name: 'Login/Register (Firebase Auth)', cat: 'auth' },
      { id: 'social-login', name: 'Social Login (Google/Facebook)', cat: 'auth' },
      { id: 'role-based-access', name: 'Role-based Access', cat: 'auth' },
      { id: 'dashboard-full', name: 'Dashboard Full (CRUD + analytics)', cat: 'admin' },
      { id: 'user-management', name: 'User Management', cat: 'admin' },
      { id: 'site-config-editor', name: 'Site Config Editor', cat: 'admin' },
      { id: 'export-reports', name: 'Xuất báo cáo (Excel, PDF)', cat: 'admin' },
      { id: 'fcm-push', name: 'FCM Push Notification', cat: 'notification' },
      { id: 'in-app-notification', name: 'In-app Notification', cat: 'notification' },
      { id: 'responsive', name: 'Responsive (mobile + tablet)', cat: 'technical' },
      { id: 'pwa', name: 'PWA (offline + install)', cat: 'technical' },
      { id: 'dark-mode', name: 'Dark mode toggle', cat: 'design' },
      { id: 'card-animations', name: 'Card/section animations', cat: 'design' },
    ],
  },
]

async function seed() {
  for (const project of projects) {
    const { id, ...data } = project
    await db.collection('projects').doc(id).set(data, { merge: true })
    console.log(`✅ Seeded: ${project.title} (${id})`)
  }
  console.log('\n🎉 All 3 projects seeded successfully!')
}

seed().catch(console.error)
