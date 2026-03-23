# Stitch Prompts — Jules Studio Public v3 (Clean)

**Stitch Project**: `3192753699023490029` (Jules Studio Public v3)
**Design Brief**: `designs/design-brief-v2.md`

---

## Design System (áp dụng cho TẤT CẢ screens)

### Color Palette
- **Background**: Warm white (#FAFAF9) — nền chính
- **Surface**: Subtle warm gray (#F5F5F0) — cards, alternate sections
- **Dark sections**: Rich stone (#1C1917) — contrast sections, footer
- **Primary accent**: Indigo (#4F46E5) — CTAs, links, highlights
- **Text heading**: Stone-900 (#1C1917)
- **Text body**: Stone-600 (#57534E)
- **Text muted**: Stone-400 (#A8A29E)
- **Border**: Stone-200 (#E7E5E4)

### Typography
- **Headings**: Plus Jakarta Sans 700/800 (hoặc font mà Stitch chọn — phải hỗ trợ tiếng Việt tốt)  
- **Body**: Inter 400/500
- **Labels/Tags**: Uppercase, letter-spacing wide, nhỏ

### Style Rules
- Nền sáng, clean, premium — kiểu Stripe/Linear
- Layout creative nhưng không quá experimental
- Buttons: Indigo fill, border-radius 8px, font-weight 600
- Cards: bg-white, subtle border, border-radius 12px, shadow-sm on hover
- Sections alternate: warm white → surface gray → warm white (đôi khi dark section để tạo contrast)
- Generous white space: py-24 tối thiểu mỗi section
- Motion nhẹ nhưng mượt: scroll reveals, hover lifts — kiểu Oasis
- Hình ảnh: screenshots sản phẩm (websites trên laptop/desktop mockups), KHÔNG dùng stock photo người
- **Grayscale → Color on hover**: Hình ảnh mặc định grayscale nhẹ, hover thì hiện full color (transition 700ms)
- **Card image zoom**: hover thì ảnh scale(1.05-1.1) mượt (transition 700ms)
- **Scroll reveal**: content fade-up khi scroll vào viewport
- **Button hover**: transition-all 300ms

### Animation & Interaction Tokens
| Pattern | CSS |
|---------|-----|
| Grayscale reveal | `grayscale hover:grayscale-0 transition-all duration-700` |
| Card image zoom | `transition-transform duration-700 group-hover:scale-105` |
| Button hover | `hover:bg-indigo-700 transition-all duration-300` |
| Scroll reveal | `opacity-0 → 1, translateY(20px → 0), cubic-bezier(0.16,1,0.3,1)` |
| Card lift | `hover:-translate-y-1 hover:shadow-lg transition-all duration-300` |

---

## Screen 1: Homepage (P0)
**Device:** DESKTOP

Web design studio homepage — clean, premium, storytelling. Nền sáng warm white. Tiếng Việt toàn bộ, có dấu đúng.

### Sections:

#### 1. Navbar (fixed, clean)
- Background white, subtle border-bottom
- Logo "JULES STUDIO" bên trái — weight 800, letter-spacing tight
- Nav links phải: Dự Án | Dịch Vụ | Liên Hệ — weight 500, neutral gray
- CTA button "Bắt Đầu Dự Án" — indigo fill, white text, rounded-lg

#### 2. Hero (large, clean — KHÔNG phải fullscreen 100vh)
- Nền warm white (#FAFAF9), padding lớn (py-32)
- Layout 2 phần:
  - **LEFT**: Text content
    - Tag nhỏ: "WEB DESIGN STUDIO" — uppercase, letter-spacing wide, indigo text, nhỏ
    - **Heading lớn**: "Mỗi website là một câu chuyện được thiết kế" — font 4xl-6xl, weight 800, stone-900, line-height tight
    - **Sub**: "Jules Studio thiết kế và xây dựng website mang tính trải nghiệm — phù hợp với từng ngành và mục tiêu kinh doanh." — font lg, stone-600, max-width 500px
    - 2 buttons: "Xem Dự Án" (indigo fill) + "Liên Hệ Tư Vấn" (outline stone border)
  - **RIGHT**: Browser window mockup showing a beautiful website screenshot (a luxury resort website with hero image, warm colors, elegant typography). Mockup có thanh browser bar nhỏ ở trên (dots + URL bar). Slight shadow, rounded-xl.

#### 3. About (surface gray bg #F5F5F0)
- 2-column layout, generous padding
- **LEFT**: 
  - Tag nhỏ: "VỀ CHÚNG TÔI" indigo uppercase
  - Heading: "Thiết kế không chỉ để đẹp — mà để hoạt động" — 3xl, weight 700
  - Body text: "Jules Studio là web design studio chuyên thiết kế website theo hướng trải nghiệm và storytelling. Thay vì tạo ra những website giống nhau, Jules tập trung xây dựng sản phẩm phù hợp với từng mô hình kinh doanh." — stone-600
- **RIGHT**: Bento grid 2x2 các con số thống kê (số liệu)
  - "5+" — Dự án hoàn thành
  - "100%" — Khách hàng hài lòng  
  - "30" — Ngày trung bình
  - "24/7" — Hỗ trợ kỹ thuật
  - Mỗi ô: bg-white, rounded-xl, padding, số lớn font-bold indigo, label nhỏ stone-500

#### 4. Portfolio Preview (warm white bg)
- Tag: "DỰ ÁN NỔI BẬT" indigo uppercase
- Heading: "Câu chuyện từ những dự án thật" — 3xl stone-900
- 3-column grid project cards:
  - Card 1: Browser mockup screenshot of a resort/hotel website (warm colors, hero image of a beach/pool) → "Jules Oasis" — Resort & Spa, tag "Hospitality"
  - Card 2: Browser mockup screenshot of an e-commerce fashion website (clean grid of products, minimal design) → "Lumina Store" — Thời Trang, tag "E-Commerce"
  - Card 3: Browser mockup screenshot of a SaaS dashboard (dark mode, charts and data visualization) → "Zenith App" — Nền Tảng SaaS, tag "Web App"
  - Mỗi card: bg-white, rounded-xl, overflow hidden, shadow-sm
  - **Hình ảnh mặc định grayscale**, hover → full color + scale(1.05) (transition 700ms, kiểu Oasis)
  - Hover: shadow-lg + card lift (-translate-y-1)
  - Screenshot chiếm 70% card, info phía dưới.
- CTA link: "Xem tất cả dự án →" indigo text

#### 5. Differentiators (dark bg #1C1917)
- Heading: "Tại sao chọn Jules?" — cream/white, 3xl
- 4 feature cards ngang (horizontal row):
  - 🎯 "Story-Driven" + "Mỗi website là một trải nghiệm kể chuyện, không phải template"
  - 🏗️ "Industry-Fit" + "Thiết kế đúng logic từng ngành — resort, bán hàng, portfolio"
  - ✨ "Design + Motion" + "UI đẹp, animation mượt, flow hợp lý, mục tiêu chuyển đổi"
  - 🏆 "Showcase" + "Sản phẩm chất lượng cao — không phải website bình thường"
  - Mỗi card: bg-white/5, border white/10, rounded-xl, icon/emoji to, heading white, body white/60
  - DÙNG svg icons đơn giản thay emoji nếu có thể

#### 6. Process (surface gray bg #F5F5F0)
- Tag: "QUY TRÌNH" indigo
- Heading: "Từ ý tưởng đến sản phẩm" — 3xl
- 4 bước horizontal:
  - 01 → Khám Phá: "Tìm hiểu sâu nhu cầu và mục tiêu dự án"
  - 02 → Thiết Kế: "Tạo giao diện phù hợp với thương hiệu"
  - 03 → Phát Triển: "Code chất lượng, hiệu suất cao"
  - 04 → Ra Mắt: "Deploy và hỗ trợ liên tục"
  - Mỗi bước: số lớn (01-04) indigo/20, heading bold, description stone-600
  - Có đường kẻ ngang hoặc arrow giữa các bước

#### 7. Contact Section (surface gray bg #F5F5F0)
- Tag: "LIÊN HỆ" indigo
- Heading: "Cần tư vấn ngay?" — 3xl
- 2-column layout:
  - **LEFT**: Contact info — phone, email, address, social links (icon + text)
  - **RIGHT**: Quick contact form — Họ tên, Email, Số điện thoại, Tin nhắn (textarea), Submit "Gửi Tin Nhắn" indigo button
  - Form: bg-white, rounded-xl, shadow-sm, padding

#### 8. CTA Section (warm white bg)
- Content centered:
  - Heading: "Sẵn sàng kể câu chuyện của bạn?" — 3xl, stone-900
  - Sub: "Liên hệ ngay để nhận tư vấn miễn phí từ Jules Studio." — stone-500
  - CTA button lớn: "Bắt Đầu Dự Án" indigo fill + "Hoặc gọi: 0123 456 789" text link

#### 9. Footer (dark bg #1C1917)
- 4 columns:
  - Col 1: Logo JULES STUDIO + mô tả ngắn + social icons (Facebook, Zalo, LinkedIn)
  - Col 2: Menu — Dự Án, Dịch Vụ, Liên Hệ
  - Col 3: Dịch Vụ — Thiết Kế UI/UX, Phát Triển Web, Mobile App, SEO
  - Col 4: Liên Hệ — email, phone, address
- Bottom: © 2026 Jules Studio. All rights reserved.
- Text cream/40, links cream/60 hover:cream

---

## Screen 2: Portfolio Grid (P0)
**Device:** DESKTOP

Gallery dự án với thumbnails lớn. Nền sáng. Tiếng Việt.

### Sections:
1. **Navbar**: Same
2. **Header** (warm white bg, centered):
   - Tag: "PORTFOLIO" indigo uppercase
   - Heading: "Dự Án Nổi Bật" — 4xl, stone-900
   - Sub: "Mỗi dự án là một câu chuyện riêng — được thiết kế phù hợp với mục tiêu kinh doanh."
3. **Filter tabs** (optional): All | Hospitality | E-Commerce | SaaS | Mobile — horizontal, active tab = indigo underline
4. **Grid (warm white bg)**: 2-column grid, 6 project cards:
   - Mỗi card: browser mockup screenshot lớn (80% card), bên dưới: project name + category tag + year. bg-white, rounded-xl, shadow-sm.
   - **Hình ảnh mặc định grayscale**, hover → full color + scale(1.05) (transition 700ms) + shadow-lg + card lift
   - Card 1: Resort website (warm, beach imagery) → "Jules Oasis" | Hospitality | 2026
   - Card 2: Fashion e-commerce (clean product grid) → "Lumina Store" | E-Commerce | 2026
   - Card 3: Analytics dashboard (dark mode, charts) → "Zenith Analytics" | SaaS | 2025
   - Card 4: Restaurant website (food imagery, elegant) → "Aura Dining" | F&B | 2025
   - Card 5: Startup landing page (vibrant, modern tech) → "Velocity App" | Startup | 2025
   - Card 6: Real estate website (property photos, modern) → "Horizon Living" | Real Estate | 2025
5. **Pagination**: Simple — "← Trước" + "1 2 3" + "Sau →" — indigo active
6. **CTA (surface gray bg)**: "Có dự án cần thực hiện?" + "Liên Hệ Tư Vấn" indigo button
7. **Footer**: Same

---

## Screen 3: Portfolio Detail / Case Study (P1)
**Device:** DESKTOP

Case study chi tiết. Nền sáng. Tiếng Việt.

### Sections:
1. **Navbar**
2. **Hero image**: Full-width browser mockup screenshot of the project website (a beautiful resort site), rounded-xl, shadow, over warm white bg. Generous padding.
3. **Project Header (warm white)**:
   - Back link: "← Tất cả dự án" stone-500
   - Heading: "Jules Oasis — Resort & Spa" — 4xl stone-900
   - Tags: "Hospitality" "Web Design" "Storytelling" — small pills, indigo/10 bg, indigo text
   - Metadata row: Năm: 2026 | Thời gian: 45 ngày | Stack: React, Tailwind, Hono
4. **Overview (warm white, border-top)**:
   - 60/40 split: 
   - LEFT: Heading "Tổng Quan" + body text mô tả dự án, mục tiêu, context
   - RIGHT: Stats cards — Lighthouse Score: 98, Trang: 12, Responsive: ✓
5. **Challenge + Solution (surface gray bg)**:
   - 2 columns equal width
   - LEFT: "Thách Thức" heading + body text
   - RIGHT: "Giải Pháp" heading + body text
6. **Gallery (warm white)**: 
   - 3 images grid: desktop mockup, tablet mockup, mobile mockup — all showing the same project at different breakpoints. Rounded-xl, shadow.
7. **Navigation (warm white, border-top)**: 
   - "← Dự Án Trước" + "Dự Án Sau →" — simple text links, stone-500
8. **Footer**

---

## Screen 4: Services (P1)
**Device:** DESKTOP

Trang dịch vụ. Nền sáng. Tiếng Việt.

### Sections:
1. **Navbar**
2. **Header (warm white, centered)**:
   - Tag: "DỊCH VỤ" indigo
   - Heading: "Giải pháp thiết kế toàn diện" — 4xl
   - Sub: "Từ UI/UX đến development — Jules Studio đồng hành cùng bạn ở mọi giai đoạn."
3. **Service Cards (warm white)**: 4 service blocks stacked vertically, mỗi block separated bằng subtle border:
   - **01 — Thiết Kế UI/UX**: "Giao diện bắt mắt, trải nghiệm mượt mà — thiết kế dựa trên nghiên cứu người dùng và mục tiêu kinh doanh." Tags: Figma, Wireframe, Prototype, User Research
   - **02 — Phát Triển Web**: "Website performance cao với React, hiệu ứng mượt, tốc độ tải nhanh. Responsive trên mọi thiết bị." Tags: React, Tailwind CSS, Vite, Cloudflare
   - **03 — Mobile & PWA**: "Ứng dụng di động và Progressive Web App — cài như app, chạy mượt, push notification." Tags: PWA, React Native, Flutter
   - **04 — SEO & Tối Ưu**: "Tối ưu hiển thị trên Google, cải thiện tốc độ, tăng chuyển đổi tự nhiên." Tags: SEO, Analytics, Core Web Vitals, Performance
   - Layout mỗi service: số lớn (01-04) indigo/10, heading 2xl, description stone-600, tag pills bên dưới
4. **Tech Stack (dark bg #1C1917)**: Grid nhỏ hiển thị các technology logos/names: React, Tailwind, Vite, Hono, Cloudflare, Firebase, Figma, GSAP — cream/40 text, grid 4x2
5. **CTA (warm white)**: "Cần giải pháp cho dự án?" + indigo button
6. **Footer**

---

## Screen 5: Config Builder / Báo Giá (P1)
**Device:** DESKTOP

Multi-step wizard báo giá. Nền sáng. Tiếng Việt. Giữ bố cục wizard hiện tại, chỉ cập nhật màu sắc + style cho phù hợp design system mới.

### Layout:
1. **Navbar**
2. **Header (warm white, centered)**:
   - Tag: "BÁO GIÁ" indigo
   - Heading: "Ước tính chi phí dự án" — 4xl
   - Sub: "Chọn loại website và tính năng — nhận báo giá tức thì."
3. **Wizard Steps (warm white)**: Progress indicator trên cùng (4 steps)
   - **Step 1 — Loại Website**: Grid cards chọn loại (Landing Page, Portfolio, E-Commerce, Web App, Blog). Mỗi card: icon + tên + mô tả ngắn. Active = indigo border.
   - **Step 2 — Tính Năng**: Checkbox grid chọn modules (Auth, CMS, Payment, SEO, PWA, Analytics...). Mỗi module: icon + tên + giá estimate. Selected = indigo check.
   - **Step 3 — Thông Tin**: Form liên hệ: Họ tên, Email, SĐT, Mô tả dự án (textarea)
   - **Step 4 — Tổng Kết**: Summary card: loại web + modules đã chọn + tổng giá ước tính + "Gửi Yêu Cầu" CTA
   - Navigation: "← Quay Lại" ghost button + "Tiếp Tục →" indigo button
   - Sidebar phải (sticky): Live price summary card — bg-white, rounded-xl, shadow, hiển thị tổng giá realtime
4. **Footer**

---

## Screen 6: Login (P1)
**Device:** DESKTOP

Đăng nhập. Nền sáng. Tiếng Việt.

### Layout: Split 50/50
1. **LEFT panel (warm white #FAFAF9)**:
   - Centered form card (max-width 400px)
   - Heading: "Đăng Nhập" — 3xl, stone-900
   - Sub: "Truy cập tài khoản để theo dõi dự án của bạn"
   - Fields: Email, Mật khẩu — clean inputs, rounded-lg, border stone-200
   - "Quên mật khẩu?" — indigo text link, right-aligned
   - Submit: "Đăng Nhập" indigo button full-width
   - Divider: "hoặc"
   - Google button: "Đăng nhập với Google" — bordered, Google logo
   - Bottom: "Chưa có tài khoản? Đăng ký" — stone-500 + indigo link
   
2. **RIGHT panel (dark bg #1C1917)**:
   - Browser mockup screenshot of a beautiful project dashboard or website
   - Overlay text: "Theo dõi dự án realtime" — cream large heading
   - 3 benefit items: ✓ Xem tiến độ dự án | ✓ Tải hợp đồng & tài liệu | ✓ Quản lý thanh toán

---

## Screen 7: Register (P1)
**Device:** DESKTOP

Đăng ký. Nền sáng. Tiếng Việt.

### Layout: Split 50/50 (giống Login nhưng more fields)
1. **LEFT panel (warm white)**:
   - Heading: "Tạo Tài Khoản" — 3xl
   - Sub: "Đăng ký để theo dõi dự án và quản lý tài khoản"
   - Fields: Họ và tên, Email, Số điện thoại, Mật khẩu, Xác nhận mật khẩu
   - Submit: "Đăng Ký" indigo button full-width
   - Google button + link to login
   
2. **RIGHT panel (dark bg)**: Same style as Login right panel

---

## Screen 8: 404 Not Found (P2)
**Device:** DESKTOP

Trang lỗi. Clean. Tiếng Việt.

### Layout:
1. **Navbar** (minimal)
2. **Content (centered, full viewport height)**:
   - Warm white bg
   - "404" — oversized text, font-size ~12rem, stone-100 (rất nhạt, background element)
   - Heading: "Trang không tìm thấy" — 2xl, stone-900
   - Sub: "Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển." — stone-500
   - CTA: "← Về Trang Chủ" indigo button
3. **Footer** (minimal)
