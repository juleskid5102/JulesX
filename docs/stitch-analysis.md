# Stitch HTML Analysis — Inconsistencies & Data Classification

> **Mục đích**: Phân tích toàn bộ 6 file HTML từ Stitch, liệt kê các điểm không đồng nhất giữa các trang, phân loại database vs hardcode. **Bạn chọn phương án cho từng mục, sau đó mình sẽ refactor chính xác từ HTML.**

---

## 1. INCONSISTENCIES — CẦN BẠN CHỌN

### 1.1 NAVBAR — 6 kiểu khác nhau!

| Trang | Position | Background | Logo | Nav Links | CTA | Border-radius |
|-------|----------|------------|------|-----------|-----|---------------|
| 01-homepage | `fixed top-6 left-6 right-6` (floating) | `bg-white/90 backdrop-blur-md border border-slate-200` | Text only: `JULES STUDIO` | `text-sm font-bold uppercase tracking-widest` | `bg-slate-900` pill | `0px` (sharp) |
| 02-portfolio | `fixed top-0 left-0 right-0` (full-width) | `bg-white/80 backdrop-blur-md border-b border-slate-200` | Icon `interests` + Text | `text-sm font-semibold` (không uppercase tracking) | `bg-primary` pill | `0rem` (sharp) |
| 03-config-builder | `fixed top-0 left-0 right-0` (full-width) | `bg-white/80 backdrop-blur-md border-b border-slate-200` | Icon `deployed_code` in black box + Text | `text-[10px] font-bold uppercase tracking-widest` + divider `\|` | `bg-black` pill | `0px` (sharp) |
| 04-customer-login | `fixed top-0, flex justify-center p-4` (floating centered) | `bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl` | SVG diamond + Text | `text-sm font-medium` (không uppercase) | `bg-primary rounded-lg` | `rounded-xl` card! |
| 07-services | `fixed top-0 inset-x-0` (full-width) | `bg-white/80 backdrop-blur-md border-b border-slate-200` | SVG diamond + Text | `text-sm font-semibold tracking-wide uppercase` | `bg-slate-900 h-12` | `0.125rem` |
| 08-order-tracking | `sticky top-0` | `bg-background-light/90 backdrop-blur-md border-b border-slate-200` | SVG leaf + Text (không uppercase) | `text-sm font-medium` | `bg-primary rounded` | `0.125rem` |

> [!IMPORTANT]
> **Bạn đã chốt**: Header từ `03-config-builder.html`
> 
> → Confirm lại: dùng navbar từ **03-config-builder.html** cho TẤT CẢ các trang? (full-width, icon `deployed_code` in black box, `text-[10px]` nav links, `bg-black` CTA)

---

### 1.2 FOOTER — 5 kiểu khác nhau!

| Trang | Background | Layout | Content |
|-------|------------|--------|---------|
| 01-homepage | `bg-background-dark (#0A0A0A)` | 1 row: Logo `/` Copyright + Social links (Facebook, Zalo, GitHub) | Minimal |
| 02-portfolio | `bg-black` | 2 sections: Top (logo + description + social/contact columns), Bottom (copyright + policy links) | **Full - nhiều info nhất** |
| 03-config-builder | `bg-black` | 1 row centered: Logo icon + Copyright + Icon links (language, mail) | Minimal |
| 04-customer-login | `bg-black` | 1 row centered: Copyright + Policy links | Minimal nhất |
| 07-services | `bg-slate-950` | 1 row: Logo + Nav links + Copyright | Medium |
| 08-order-tracking | `bg-slate-950` | 1 row: SVG logo + Copyright | Minimal |

> [!IMPORTANT]
> **Bạn đã chốt**: Footer từ `02-portfolio.html`
> 
> → Confirm lại: dùng footer **02-portfolio.html** cho TẤT CẢ các trang? (black bg, 2 sections, social columns DRIBBBLE/BEHANCE/LINKEDIN, contact HELLO@JULES.STUDIO, bottom copyright + policy links)

---

### 1.3 TAILWIND CONFIG — Không đồng nhất

| Setting | 01-homepage | 02-portfolio | 03-config | 04-login | 07-services | 08-tracking |
|---------|-------------|--------------|-----------|----------|-------------|-------------|
| `primary` | `#6366F1` | `#6366F1` | `#6366F1` | `#6366f2` ⚠️ | `#6366F1` | `#6366f1` |
| `background-light` | `#ffffff` | `#f6f6f8` ⚠️ | `#ffffff` | `#f6f6f8` ⚠️ | `#ffffff` | `#f6f6f8` ⚠️ |
| `background-dark` | `#0A0A0A` | `#101122` ⚠️ | `#101122` | `#101122` | `#101122` | `#101122` |
| `borderRadius DEFAULT` | `0px` | `0rem` | `0px` | `0.125rem` ⚠️ | `0.125rem` ⚠️ | `0.125rem` ⚠️ |
| `font-heading alias` | `syne` | `syne` | `heading` ⚠️ | `syne` | `heading` ⚠️ | `heading` ⚠️ |

> [!CAUTION]
> **Cần chọn 1 config thống nhất:**
> 
> A. `background-light`: `#ffffff` (trắng tinh) hay `#f6f6f8` (xám nhạt)?  
> B. `background-dark`: `#0A0A0A` (đen tuyệt đối) hay `#101122` (đen xanh)?  
> C. `borderRadius DEFAULT`: `0px` (vuông hoàn toàn) hay `0.125rem` (hơi bo nhẹ)?  
> D. Font heading alias: `font-syne` hay `font-heading`? (chỉ ảnh hưởng tên class)

---

### 1.4 BODY STYLES

| Trang | Body class đặc biệt |
|-------|---------------------|
| 01-homepage | `antialiased` |
| 02-portfolio | Không `antialiased` |
| 03-config-builder | `antialiased` |
| 04-customer-login | Không `antialiased`, có `min-h-screen flex flex-col` |
| 07-services | `antialiased selection:bg-primary/30 selection:text-primary` ✨ |
| 08-order-tracking | `min-h-screen flex flex-col` |

> **Đề xuất**: Dùng `antialiased` + `selection:bg-primary/30 selection:text-primary` (từ 07-services) cho toàn bộ.

---

## 2. DATA CLASSIFICATION

### 2.1 DATABASE (dynamic — lấy từ Firestore)

| Data | Trang | Collection |
|------|-------|------------|
| Portfolio projects (tên, mô tả, ảnh, loại, năm) | 01-homepage, 02-portfolio | `projects` |
| Order tracking info (mã đơn, trạng thái, timeline, tài liệu) | 08-order-tracking | `orders` |
| Config builder options (loại hệ thống, tính năng, giá) | 03-config-builder | `config_options` / `pricing` |
| Contact form submissions | 01-homepage | `leads` |
| User login credentials | 04-customer-login | Firebase Auth |
| Customer documents (hợp đồng, hóa đơn) | 08-order-tracking | `orders/{id}/documents` |

### 2.2 HARDCODE (static — viết trực tiếp trong code)

| Content | Trang |
|---------|-------|
| Company name: "JULES STUDIO" | All |
| Tagline: "Xây dựng sự xuất sắc..." | 02-portfolio footer |
| Contact info: hello@jules.studio, +84 (0) 900 123 456, TP. HCM | 01-homepage, 02-portfolio |
| Social links: Dribbble, Behance, LinkedIn | 02-portfolio footer |
| Process steps: Khám Phá → Thiết Kế → Phát Triển → Ra Mắt | 01-homepage |
| Hero text: "CHÚNG TÔI KIẾN TẠO TRẢI NGHIỆM SỐ" | 01-homepage |
| Service rows (01-04): titles, descriptions, tags | 07-services |
| Technology grid: React, Next.js, Tailwind, Node.js, Figma, TypeScript, Vercel, Prisma | 07-services |
| Nav links: Dự Án, Dịch Vụ, Báo Giá, Liên Hệ, Đăng Nhập | All |
| Login page benefits: "Xem tiến độ realtime", "Tải hợp đồng", "Theo dõi đơn hàng" | 04-login |
| Copyright: "© 2026 Jules Studio" | All |
| Policy links: Chính sách bảo mật, Điều khoản dịch vụ | 02-portfolio, 04-login |

### 2.3 CONFIG (từ `site.ts` — dễ thay đổi nhưng không phải DB)

| Content | Recommendation |
|---------|---------------|
| Company name, email, phone, address | `site.ts` |
| Social links (URLs) | `site.ts` |
| Nav menu items | `site.ts` |
| Copyright year | `site.ts` (auto from `new Date()`) |

---

## 3. SPECIAL CSS/EFFECTS CẦN GIỮ NGUYÊN

| Effect | Trang | CSS |
|--------|-------|-----|
| Grayscale hover on images | 01-homepage, 02-portfolio | `grayscale hover:grayscale-0 transition-all duration-500` |
| Service row hover bg | 07-services | `.service-row:hover .service-bg { opacity: 0.05 }` + `.service-row:hover .service-title { color: #6366F1 }` |
| Selection color | 07-services | `selection:bg-primary/30 selection:text-primary` |
| Form focus effect | 01-homepage | `group border-b border-slate-200 focus-within:border-primary transition-colors` (underline inputs) |
| Login rounded card | 04-login | `rounded-2xl shadow-2xl` (card container) |

---

## 4. TÓM TẮT — CẦN BẠN TRẢLỜI

1. **Navbar**: Confirm dùng `03-config-builder.html` cho tất cả trang? ✅/❌
2. **Footer**: Confirm dùng `02-portfolio.html` cho tất cả trang? ✅/❌
3. **Background light**: `#ffffff` hay `#f6f6f8`?
4. **Background dark**: `#0A0A0A` hay `#101122`?
5. **Border radius**: `0px` (vuông) hay `0.125rem` (bo nhẹ)?
6. **Font alias**: `font-syne` hay `font-heading`? (chỉ ảnh hưởng class name)
7. **Body extras**: Thêm `selection:bg-primary/30` cho toàn bộ? ✅/❌
8. **Login page**: Giữ nguyên style `rounded-2xl shadow-2xl` (khác tone với các trang khác) hay chuyển về vuông (consistent)?
