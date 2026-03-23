/**
 * Seed estimator config to Firestore — all data for the 5-step wizard
 * Run: node scripts/seed-estimator.mjs
 * 
 * Source of truth: quotation-data.mjs
 * After seeding, the ConfigBuilder reads from API: GET /api/public/estimator-config
 * To update features/styles: edit this file → re-run seed
 */
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { DESIGN_STYLES, FEATURES, WEB_TYPES, PRICING, PRICE_REF } from './quotation-data.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const keyPath = resolve(__dirname, '..', 'jules-studio-firebase-adminsdk-fbsvc-f05ee766ad.json')
const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'))

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

// ═══════════════════════════════════════════════════════════
// PRIORITY MAP — embedded per feature for easy frontend usage
// Order: [Landing, GioiThieu, DoanhNghiep, Ecommerce, WebApp, Booking, Blog]
// ═══════════════════════════════════════════════════════════
const TYPE_KEYS = ['landing', 'gioithieu', 'doanhnghiep', 'ecommerce', 'webapp', 'booking', 'blog']

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
}

// ═══════════════════════════════════════════════════════════
// Build design styles with groups and icons
// ═══════════════════════════════════════════════════════════
const STYLE_ICONS = {
  'Minimalism (Tối giản)': 'filter_center_focus',
  'Exaggerated Minimalism': 'format_size',
  'Glassmorphism (Kính mờ)': 'blur_on',
  'Neumorphism (Soft UI)': 'bubble_chart',
  'Neubrutalism': 'dashboard',
  'Flat Design': 'crop_square',
  'Dark Mode (OLED)': 'dark_mode',
  'Bento Box Grid': 'grid_view',
  'Aurora UI': 'gradient',
  'Vibrant & Block-based': 'palette',
  'Claymorphism': 'toys',
  'Motion-Driven': 'animation',
  'Retro-Futurism / Y2K': 'auto_awesome',
  'Cyberpunk': 'terminal',
  'Organic / Biophilic': 'eco',
  'Swiss Modernism 2.0': 'view_module',
  'AI-Native UI': 'smart_toy',
  'Memphis Design': 'category',
  'E-Ink / Paper': 'menu_book',
  'Kinetic Typography': 'text_rotation_none',
  'Pixel Art / Retro': 'videogame_asset',
  'Spatial UI (VisionOS)': 'view_in_ar',
  'Storytelling-Driven': 'auto_stories',
  'Khác (ghi bên ghi chú)': 'edit_note',
}

const STYLE_GROUPS = {
  'Minimalism (Tối giản)': 'popular',
  'Exaggerated Minimalism': 'popular',
  'Glassmorphism (Kính mờ)': 'popular',
  'Dark Mode (OLED)': 'popular',
  'Flat Design': 'popular',
  'Bento Box Grid': 'popular',
  'Neumorphism (Soft UI)': 'creative',
  'Neubrutalism': 'creative',
  'Aurora UI': 'creative',
  'Vibrant & Block-based': 'creative',
  'Claymorphism': 'creative',
  'Memphis Design': 'creative',
  'Motion-Driven': 'technical',
  'Storytelling-Driven': 'technical',
  'Kinetic Typography': 'technical',
  'Swiss Modernism 2.0': 'technical',
  'AI-Native UI': 'technical',
  'Organic / Biophilic': 'technical',
  'Retro-Futurism / Y2K': 'special',
  'Cyberpunk': 'special',
  'E-Ink / Paper': 'special',
  'Pixel Art / Retro': 'special',
  'Spatial UI (VisionOS)': 'special',
  'Khác (ghi bên ghi chú)': 'special',
}

// ═══════════════════════════════════════════════════════════
// Category icons for feature groups
// ═══════════════════════════════════════════════════════════
const CAT_ICONS = {
  '⚙️ CORE (Trang cơ bản)': 'settings',
  '📝 NỘI DUNG': 'article',
  '🛒 BOOKING & THƯƠNG MẠI': 'shopping_cart',
  '📊 ADMIN & QUẢN TRỊ': 'analytics',
  '🔐 TÀI KHOẢN & BẢO MẬT': 'lock',
  '🔔 THÔNG BÁO': 'notifications',
  '🔧 KỸ THUẬT': 'build',
  '🎬 ĐỘ PHỨC TẠP THIẾT KẾ': 'animation',
  '✨ NÂNG CAO': 'auto_awesome',
}

const CAT_KEYS = {
  '⚙️ CORE (Trang cơ bản)': 'core',
  '📝 NỘI DUNG': 'content',
  '🛒 BOOKING & THƯƠNG MẠI': 'booking',
  '📊 ADMIN & QUẢN TRỊ': 'admin',
  '🔐 TÀI KHOẢN & BẢO MẬT': 'auth',
  '🔔 THÔNG BÁO': 'notification',
  '🔧 KỸ THUẬT': 'technical',
  '🎬 ĐỘ PHỨC TẠP THIẾT KẾ': 'design',
  '✨ NÂNG CAO': 'advanced',
}

// ═══════════════════════════════════════════════════════════
// Build & Seed
// ═══════════════════════════════════════════════════════════
async function seed() {
  console.log('🌱 Seeding estimator config...')

  // Build webTypes
  const webTypes = WEB_TYPES.map(t => ({
    key: t.key,
    name: t.name,
    icon: {
      landing: 'rocket_launch',
      gioithieu: 'info',
      doanhnghiep: 'business',
      ecommerce: 'shopping_cart',
      webapp: 'layers',
      booking: 'event',
      blog: 'article',
    }[t.key] || 'web',
    description: {
      landing: 'Trang đích giới thiệu sản phẩm/dịch vụ',
      gioithieu: 'Website giới thiệu thương hiệu, dịch vụ',
      doanhnghiep: 'Web doanh nghiệp với đầy đủ thông tin',
      ecommerce: 'Bán hàng trực tuyến với giỏ hàng và thanh toán',
      webapp: 'Ứng dụng web với tính năng phức tạp',
      booking: 'Hệ thống đặt lịch, đặt phòng trực tuyến',
      blog: 'Nền tảng nội dung và chia sẻ kiến thức',
    }[t.key] || '',
    color: t.color,
  }))

  // Build designStyles
  const designStyles = DESIGN_STYLES.map((s, i) => ({
    id: s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,''),
    name: s.name,
    desc: s.desc,
    icon: STYLE_ICONS[s.name] || 'palette',
    group: STYLE_GROUPS[s.name] || 'special',
    order: i,
  }))

  // Build features with embedded priorities
  const features = FEATURES.map((f, i) => {
    const priorityArr = PRIORITY_MAP[f.name]
    const priorities = {}
    if (priorityArr) {
      TYPE_KEYS.forEach((key, idx) => {
        priorities[key] = priorityArr[idx]
      })
    }
    return {
      id: f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,''),
      name: f.name,
      cat: CAT_KEYS[f.cat] || 'other',
      catLabel: f.cat,
      catIcon: CAT_ICONS[f.cat] || 'extension',
      coeff: f.coeff,
      note: f.note || '',
      priorities,
      order: i,
    }
  })

  // Build category list
  const categories = [...new Set(FEATURES.map(f => f.cat))].map((cat, i) => ({
    key: CAT_KEYS[cat] || 'other',
    label: cat,
    icon: CAT_ICONS[cat] || 'extension',
    order: i,
  }))

  // Build style groups
  const styleGroups = [
    { key: 'popular', label: 'Phổ biến', order: 0 },
    { key: 'creative', label: 'Sáng tạo', order: 1 },
    { key: 'technical', label: 'Kỹ thuật', order: 2 },
    { key: 'special', label: 'Đặc biệt', order: 3 },
  ]

  // Compose the config document
  const config = {
    webTypes,
    designStyles,
    styleGroups,
    features,
    categories,
    pricing: {
      coefficient: PRICING.coefficient,
      dailyRate: PRICING.dailyRate,
      deposit: PRICING.deposit,
    },
    priceRef: PRICE_REF,
    updatedAt: new Date().toISOString(),
  }

  // Write to Firestore
  await db.collection('estimator_config').doc('main').set(config)
  
  console.log(`✅ Seeded estimator_config/main:`)
  console.log(`   - ${webTypes.length} web types`)
  console.log(`   - ${designStyles.length} design styles (${styleGroups.length} groups)`)
  console.log(`   - ${features.length} features (${categories.length} categories)`)
  console.log(`   - Pricing: ${PRICING.dailyRate.toLocaleString()}đ/day, coefficient ${PRICING.coefficient}`)

  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
