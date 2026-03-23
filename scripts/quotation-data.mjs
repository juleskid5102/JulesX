/**
 * Data definitions for Jules Studio Quotation Excel
 * Extracted from pricing-config.md (source of truth)
 */

// ═══════════════════════════════════════════════════════════
// COLOR PALETTE
// ═══════════════════════════════════════════════════════════
export const C = {
  brand: '6366F1',
  brandLight: 'EEF2FF',
  dark: '1E293B',
  darkText: '0F172A',
  white: 'FFFFFF',
  headerText: 'FFFFFF',
  sectionBg: 'F1F5F9',
  sectionText: '334155',
  border: 'CBD5E1',
  lightBorder: 'E2E8F0',
  zebra: 'F8FAFC',
  greenBg: 'DCFCE7', greenText: '166534',
  orangeBg: 'FFF7ED', orangeText: 'C2410C',
  yellowBg: 'FEF9C3', yellowText: '854D0E',
  blueBg: 'DBEAFE', blueText: '1E40AF',
  redBg: 'FEE2E2', redText: 'B91C1C',
};

export const FONT = 'Segoe UI';

// ═══════════════════════════════════════════════════════════
// PRICING CONSTANTS
// ═══════════════════════════════════════════════════════════
export const PRICING = {
  dailyRate: 1_000_000,
  coefficient: 1.5,
  deposit: 0.4,  // 40% cọc
};

// ═══════════════════════════════════════════════════════════
// DESIGN STYLES — đầy đủ từ ui-ux-pro-max
// ═══════════════════════════════════════════════════════════
export const DESIGN_STYLES = [
  { name: 'Minimalism (Tối giản)', desc: 'Sạch, nhiều khoảng trống, tập trung nội dung' },
  { name: 'Exaggerated Minimalism', desc: 'Tối giản mạnh mẽ, chữ to, contrast cao' },
  { name: 'Glassmorphism (Kính mờ)', desc: 'Hiệu ứng kính mờ, backdrop blur, trong suốt' },
  { name: 'Neumorphism (Soft UI)', desc: 'Nổi/lõm nhẹ, pastel, mềm mại' },
  { name: 'Neubrutalism', desc: 'Viền đen đậm, shadow cứng, màu sáng, Gen Z' },
  { name: 'Flat Design', desc: '2D, không shadow, màu sắc tươi sáng' },
  { name: 'Dark Mode (OLED)', desc: 'Nền đen, chữ sáng, tiết kiệm pin OLED' },
  { name: 'Bento Box Grid', desc: 'Lưới module kiểu Apple, thẻ bo tròn' },
  { name: 'Aurora UI', desc: 'Gradient mượt kiểu cực quang, mesh gradient' },
  { name: 'Vibrant & Block-based', desc: 'Màu neon, block layout, năng động' },
  { name: 'Claymorphism', desc: '3D mềm, kiểu đồ chơi, playful' },
  { name: 'Motion-Driven', desc: 'Animation nhiều, scroll effects, parallax' },
  { name: 'Retro-Futurism / Y2K', desc: 'Neon 80-90s, chrome, synthwave' },
  { name: 'Cyberpunk', desc: 'Neon, dark, terminal, HUD sci-fi' },
  { name: 'Organic / Biophilic', desc: 'Thiên nhiên, bo tròn, xanh lá, wellness' },
  { name: 'Swiss Modernism 2.0', desc: 'Grid system, typography mạnh, rational' },
  { name: 'AI-Native UI', desc: 'Chatbot, conversational, minimal chrome' },
  { name: 'Memphis Design', desc: 'Hình học 80s, playful, postmodern' },
  { name: 'E-Ink / Paper', desc: 'Giống giấy, matte, tĩnh lặng, đọc sách' },
  { name: 'Kinetic Typography', desc: 'Chữ chuyển động, animation text' },
  { name: 'Pixel Art / Retro', desc: '8-bit, game cổ điển, nostalgic' },
  { name: 'Spatial UI (VisionOS)', desc: 'Kiểu Apple Vision Pro, depth, glass' },
  { name: 'Storytelling-Driven', desc: 'Layout kể chuyện, scroll narrative' },
  { name: 'Khác (ghi bên ghi chú)', desc: '' },
];

// ═══════════════════════════════════════════════════════════
// ALL FEATURES — master list with coefficients (= dev hours)
// ═══════════════════════════════════════════════════════════
export const FEATURES = [
  // --- 1. Core ---
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'Homepage (hero + sections + CTA)', coeff: 4, note: '' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'About Page', coeff: 2, note: '' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'Contact Page (form + map + info)', coeff: 2.5, note: '' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: '404 Page', coeff: 0.5, note: '' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'Footer + Header', coeff: 2, note: 'Responsive nav, logo' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'Form liên hệ (gửi email)', coeff: 1.5, note: '' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'FAB (Floating Action Button)', coeff: 1, note: 'Nút nổi: gọi/Zalo/Messenger' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'Google Maps nhúng', coeff: 0.5, note: '' },
  { cat: '⚙️ CORE (Trang cơ bản)', name: 'Nút gọi điện / Zalo / Messenger', coeff: 0.5, note: 'Nếu không dùng FAB' },

  // --- 2. Content ---
  { cat: '📝 NỘI DUNG', name: 'Services/Products List', coeff: 3, note: 'Danh sách dịch vụ/sản phẩm' },
  { cat: '📝 NỘI DUNG', name: 'Service/Product Detail', coeff: 3, note: 'Trang chi tiết' },
  { cat: '📝 NỘI DUNG', name: 'Portfolio/Gallery Grid', coeff: 3, note: 'Lưới dự án/album ảnh' },
  { cat: '📝 NỘI DUNG', name: 'Portfolio Detail', coeff: 2, note: 'Chi tiết dự án' },
  { cat: '📝 NỘI DUNG', name: 'Blog List + Detail', coeff: 6, note: 'Bài viết + phân loại + tag' },
  { cat: '📝 NỘI DUNG', name: 'FAQ Page', coeff: 1.5, note: 'Accordion Q&A' },
  { cat: '📝 NỘI DUNG', name: 'Testimonials Section', coeff: 1.5, note: 'Đánh giá khách hàng' },
  { cat: '📝 NỘI DUNG', name: 'Video nhúng (YouTube, Vimeo)', coeff: 0.5, note: '' },
  { cat: '📝 NỘI DUNG', name: 'Banner / Slider quản lý', coeff: 2, note: 'Admin quản lý banner' },
  { cat: '📝 NỘI DUNG', name: 'Đánh giá / Review sản phẩm', coeff: 2, note: 'Rating + comment' },

  // --- 3. Booking & E-commerce ---
  { cat: '🛒 BOOKING & THƯƠNG MẠI', name: 'Booking Form (đơn giản)', coeff: 2, note: 'Form đặt lịch cơ bản' },
  { cat: '🛒 BOOKING & THƯƠNG MẠI', name: 'Booking System (calendar + slots)', coeff: 6, note: 'Hệ thống đặt lịch đầy đủ' },
  { cat: '🛒 BOOKING & THƯƠNG MẠI', name: 'Shopping Cart', coeff: 5, note: 'Giỏ hàng' },
  { cat: '🛒 BOOKING & THƯƠNG MẠI', name: 'Checkout + Payment (Stripe/VNPay)', coeff: 8, note: 'Thanh toán online' },
  { cat: '🛒 BOOKING & THƯƠNG MẠI', name: 'Order Tracking', coeff: 4, note: 'Theo dõi đơn hàng' },
  { cat: '🛒 BOOKING & THƯƠNG MẠI', name: 'Mã giảm giá / Voucher', coeff: 3, note: 'Coupon system' },

  // --- 4. Admin ---
  { cat: '📊 ADMIN & QUẢN TRỊ', name: 'Dashboard Admin (CRUD cơ bản)', coeff: 8, note: 'Quản lý dữ liệu' },
  { cat: '📊 ADMIN & QUẢN TRỊ', name: 'Dashboard Full (CRUD + analytics)', coeff: 15, note: 'Charts, KPIs, reports' },
  { cat: '📊 ADMIN & QUẢN TRỊ', name: 'Site Config Editor', coeff: 3, note: 'Cài đặt hệ thống' },
  { cat: '📊 ADMIN & QUẢN TRỊ', name: 'User Management', coeff: 4, note: 'Quản lý tài khoản' },
  { cat: '📊 ADMIN & QUẢN TRỊ', name: 'Xuất báo cáo (Excel, PDF)', coeff: 3, note: 'Export reports' },

  // --- 5. Auth ---
  { cat: '🔐 TÀI KHOẢN & BẢO MẬT', name: 'Login/Register (Firebase Auth)', coeff: 3, note: '' },
  { cat: '🔐 TÀI KHOẢN & BẢO MẬT', name: 'Social Login (Google/Facebook)', coeff: 1.5, note: 'OAuth2' },
  { cat: '🔐 TÀI KHOẢN & BẢO MẬT', name: 'Role-based Access', coeff: 2, note: 'Phân quyền Admin/User/Staff' },

  // --- 6. Notifications ---
  { cat: '🔔 THÔNG BÁO', name: 'Email notification', coeff: 1.5, note: 'SendGrid' },
  { cat: '🔔 THÔNG BÁO', name: 'Admin dashboard notification', coeff: 3, note: 'Chuông thông báo' },
  { cat: '🔔 THÔNG BÁO', name: 'FCM Push Notification', coeff: 5, note: 'Push trình duyệt' },
  { cat: '🔔 THÔNG BÁO', name: 'SMS Notification', coeff: 2, note: '' },
  { cat: '🔔 THÔNG BÁO', name: 'In-app Notification', coeff: 3, note: 'Thông báo trong app' },

  // --- 7. Technical ---
  { cat: '🔧 KỸ THUẬT', name: 'Responsive (mobile + tablet)', coeff: 1.5, note: '' },
  { cat: '🔧 KỸ THUẬT', name: 'SEO cơ bản (meta, sitemap, robots)', coeff: 1, note: '' },
  { cat: '🔧 KỸ THUẬT', name: 'SEO nâng cao (schema markup)', coeff: 1.5, note: 'Rich snippets' },
  { cat: '🔧 KỸ THUẬT', name: 'Open Graph (share Facebook đẹp)', coeff: 0.5, note: '' },
  { cat: '🔧 KỸ THUẬT', name: 'Google Analytics / Tag Manager', coeff: 0.5, note: '' },
  { cat: '🔧 KỸ THUẬT', name: 'Facebook Pixel', coeff: 0.5, note: '' },
  { cat: '🔧 KỸ THUẬT', name: 'SSL Certificate (HTTPS)', coeff: 0, note: 'Miễn phí (Cloudflare)' },
  { cat: '🔧 KỸ THUẬT', name: 'PWA (offline + install)', coeff: 3, note: '' },
  { cat: '🔧 KỸ THUẬT', name: 'Multi-language (i18n)', coeff: 4, note: 'VI / EN' },
  { cat: '🔧 KỸ THUẬT', name: 'Performance optimization', coeff: 1, note: 'Lighthouse, lazy load' },
  { cat: '🔧 KỸ THUẬT', name: 'Schema Markup (Rich Snippets)', coeff: 1, note: '' },

  // --- 8. Design Complexity ---
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'GSAP scroll animations', coeff: 4, note: 'ScrollTrigger, reveal, parallax' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Smooth scroll (Lenis)', coeff: 1.5, note: '' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Page transitions', coeff: 3, note: 'Framer Motion' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Micro-interactions', coeff: 3, note: 'Hover tilt, magnetic cursor' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: '3D elements (Three.js)', coeff: 8, note: 'Product viewer, 3D hero' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Parallax effects', coeff: 2, note: '' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Card/section animations', coeff: 2, note: 'Fade-in, stagger khi scroll' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Glassmorphism + blur', coeff: 1, note: '' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Dark mode toggle', coeff: 2, note: '' },
  { cat: '🎬 ĐỘ PHỨC TẠP THIẾT KẾ', name: 'Custom cursor', coeff: 1.5, note: '' },

  // --- 9. Nâng cao ---
  { cat: '✨ NÂNG CAO', name: 'Live Chat (Tawk.to, Crisp)', coeff: 0.5, note: 'Embed widget' },
  { cat: '✨ NÂNG CAO', name: 'AI Chatbot', coeff: 6, note: '' },
  { cat: '✨ NÂNG CAO', name: 'Multi-step Form (Wizard)', coeff: 3, note: '' },
  { cat: '✨ NÂNG CAO', name: 'Form đặt hàng / Enquiry nâng cao', coeff: 2, note: '' },
];

// ═══════════════════════════════════════════════════════════
// PRIORITY MATRIX — per website type
// Keys: 'g' = 🟢, 'y' = 🟡, 'w' = ⚪, '-' = N/A
// ═══════════════════════════════════════════════════════════
const P = { g: '🟢 Bắt buộc', y: '🟡 Nên có', w: '⚪ Tùy chọn', '-': '—' };

// Order: [Landing, GioiThieu, DoanhNghiep, Ecommerce, WebApp, Booking, Blog]
const PRIORITY_MAP = {
  'Homepage (hero + sections + CTA)':      ['g','g','g','g','g','g','g'],
  'About Page':                            ['w','g','g','y','w','y','y'],
  'Contact Page (form + map + info)':      ['g','g','g','y','w','g','w'],
  '404 Page':                              ['g','g','g','g','g','g','g'],
  'Footer + Header':                       ['g','g','g','g','g','g','g'],
  'Form liên hệ (gửi email)':             ['g','g','g','y','w','y','w'],
  'FAB (Floating Action Button)':          ['y','y','y','y','w','y','w'],
  'Google Maps nhúng':                     ['w','y','y','w','-','y','-'],
  'Nút gọi điện / Zalo / Messenger':      ['y','y','y','y','w','y','w'],
  'Services/Products List':                ['-','g','g','g','-','g','-'],
  'Service/Product Detail':                ['-','y','y','g','-','y','-'],
  'Portfolio/Gallery Grid':                ['y','g','g','w','w','y','w'],
  'Portfolio Detail':                      ['w','y','y','w','w','w','w'],
  'Blog List + Detail':                    ['w','w','y','w','w','w','g'],
  'FAQ Page':                              ['w','w','y','y','w','y','w'],
  'Testimonials Section':                  ['y','y','y','y','w','y','w'],
  'Video nhúng (YouTube, Vimeo)':          ['w','w','w','w','w','w','w'],
  'Banner / Slider quản lý':              ['w','w','y','y','w','w','w'],
  'Đánh giá / Review sản phẩm':           ['-','-','w','y','w','y','w'],
  'Booking Form (đơn giản)':              ['w','w','w','-','-','g','-'],
  'Booking System (calendar + slots)':     ['-','-','-','-','-','y','-'],
  'Shopping Cart':                         ['-','-','-','g','w','-','-'],
  'Checkout + Payment (Stripe/VNPay)':     ['-','-','-','g','w','w','-'],
  'Order Tracking':                        ['-','-','-','y','w','w','-'],
  'Mã giảm giá / Voucher':                ['-','-','-','y','w','-','-'],
  'Dashboard Admin (CRUD cơ bản)':        ['w','w','y','y','g','y','w'],
  'Dashboard Full (CRUD + analytics)':     ['-','-','w','w','y','w','-'],
  'Site Config Editor':                    ['-','w','w','w','y','w','w'],
  'User Management':                       ['-','-','w','y','y','w','w'],
  'Xuất báo cáo (Excel, PDF)':            ['-','-','w','y','y','w','-'],
  'Login/Register (Firebase Auth)':        ['-','w','w','g','g','y','w'],
  'Social Login (Google/Facebook)':        ['-','w','w','y','y','w','w'],
  'Role-based Access':                     ['-','-','w','y','y','w','w'],
  'Email notification':                    ['y','y','y','y','y','y','w'],
  'Admin dashboard notification':          ['-','w','y','y','y','y','w'],
  'FCM Push Notification':                 ['w','w','w','y','y','w','w'],
  'SMS Notification':                      ['-','-','w','w','w','w','-'],
  'In-app Notification':                   ['-','-','w','w','y','w','-'],
  'Responsive (mobile + tablet)':          ['g','g','g','g','g','g','g'],
  'SEO cơ bản (meta, sitemap, robots)':    ['g','g','g','g','y','g','g'],
  'SEO nâng cao (schema markup)':          ['w','w','y','y','w','y','y'],
  'Open Graph (share Facebook đẹp)':       ['y','y','y','y','w','y','y'],
  'Google Analytics / Tag Manager':        ['y','y','y','y','y','y','y'],
  'Facebook Pixel':                        ['w','w','w','y','w','w','w'],
  'SSL Certificate (HTTPS)':              ['g','g','g','g','g','g','g'],
  'PWA (offline + install)':               ['w','w','w','y','y','w','w'],
  'Multi-language (i18n)':                 ['w','w','w','w','w','w','w'],
  'Performance optimization':              ['y','y','y','y','y','y','y'],
  'Schema Markup (Rich Snippets)':         ['w','w','y','y','w','y','y'],
  'GSAP scroll animations':               ['w','w','w','w','w','w','w'],
  'Smooth scroll (Lenis)':                ['w','w','w','w','w','w','w'],
  'Page transitions':                      ['w','w','w','w','w','w','w'],
  'Micro-interactions':                    ['w','w','w','w','w','w','w'],
  '3D elements (Three.js)':               ['w','w','w','w','w','w','w'],
  'Parallax effects':                      ['w','w','w','w','w','w','w'],
  'Card/section animations':              ['w','w','w','w','w','w','w'],
  'Glassmorphism + blur':                  ['w','w','w','w','w','w','w'],
  'Dark mode toggle':                      ['w','w','w','w','w','w','w'],
  'Custom cursor':                         ['w','w','w','w','w','w','w'],
  'Live Chat (Tawk.to, Crisp)':            ['w','w','w','y','w','w','w'],
  'AI Chatbot':                            ['w','w','w','w','w','w','w'],
  'Multi-step Form (Wizard)':              ['w','w','w','w','w','w','-'],
  'Form đặt hàng / Enquiry nâng cao':     ['w','w','w','y','w','y','-'],
};

// Website type definitions
export const WEB_TYPES = [
  { key: 'landing',     name: 'Landing Page',        idx: 0, color: 'FF6B6B' },
  { key: 'gioithieu',   name: 'Web Giới Thiệu',     idx: 1, color: '4ECDC4' },
  { key: 'doanhnghiep', name: 'Web Doanh Nghiệp',   idx: 2, color: '45B7D1' },
  { key: 'ecommerce',   name: 'E-commerce',          idx: 3, color: 'F7DC6F' },
  { key: 'webapp',      name: 'Web App',             idx: 4, color: 'BB8FCE' },
  { key: 'booking',     name: 'Booking',             idx: 5, color: '82E0AA' },
  { key: 'blog',        name: 'Blog - Tạp Chí',     idx: 6, color: 'F0B27A' },
];

// Reference pricing table
export const PRICE_REF = [
  { type: 'Landing Page (1 trang)', price: '5,000,000 – 8,000,000', time: '5 – 7 ngày', note: 'Responsive, Form, SEO, FAB' },
  { type: 'Website Giới Thiệu (3-6 trang)', price: '5,000,000 – 12,000,000', time: '5 – 12 ngày', note: 'Portfolio, Testimonials, Blog' },
  { type: 'Website Doanh Nghiệp (5-10 trang)', price: '8,000,000 – 18,000,000', time: '8 – 18 ngày', note: 'CMS, Dashboard, SEO nâng cao' },
  { type: 'E-commerce', price: '15,000,000 – 35,000,000', time: '15 – 35 ngày', note: 'Cart, Payment, Admin, Auth' },
  { type: 'Web App (ứng dụng web)', price: '20,000,000 – 60,000,000+', time: '20 – 60 ngày', note: 'Auth, CRUD, Dashboard, API' },
  { type: 'Booking (đặt lịch)', price: '10,000,000 – 25,000,000', time: '10 – 25 ngày', note: 'Calendar, Payment, Admin' },
  { type: 'Blog / Tạp Chí', price: '5,000,000 – 10,000,000', time: '5 – 10 ngày', note: 'CMS, SEO, Categories' },
];

/**
 * Get features for a specific web type with priorities
 * Only includes features where priority !== '-' (N/A)
 */
export function getFeaturesForType(typeIdx) {
  const result = [];
  let currentCat = '';
  for (const feat of FEATURES) {
    const pArr = PRIORITY_MAP[feat.name];
    if (!pArr) continue;
    const pKey = pArr[typeIdx];
    if (pKey === '-') continue;
    result.push({
      ...feat,
      priority: P[pKey],
      priorityKey: pKey,
      isNewCat: feat.cat !== currentCat,
    });
    currentCat = feat.cat;
  }
  return result;
}
