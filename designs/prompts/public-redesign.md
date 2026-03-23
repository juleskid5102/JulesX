# Stitch Prompts — Jules Studio Public v3 (Light + Image-Rich)

**Stitch Project**: `6549969039174509853`
**Reference**: jules-oasis → Alternating light cream + dark navy sections, massive photography

---

## Design System (applies to ALL screens)

### Color Palette
- **Light Background**: Warm cream (#F5F0EB) — main content sections  
- **Dark Background**: Deep indigo-navy (#1A1A2E) — alternating sections & cards
- **Surface**: Soft grey (#F0ECEB) — subtle variation from cream
- **Primary Accent**: Indigo (#6366F1) — CTAs, links, highlights
- **Heading Text (on light)**: Deep navy (#1A1A2E)
- **Body Text (on light)**: Navy at 70% opacity
- **Heading Text (on dark)**: Warm cream (#F5F0EB)
- **Body Text (on dark)**: Cream at 60% opacity
- **Muted accent**: Soft indigo (#818CF8) for secondary elements

### Typography
- Headings: Elegant serif-style font (Vietnamese-compatible, like Playfair Display or similar)
- Body: Clean modern sans-serif (Vietnamese-compatible, like Inter or similar)
- Labels: Uppercase, wide letter-spacing, small size

### Style Rules
- Buttons: Indigo fill, slight border-radius (4px), uppercase tracking-wide
- Images: Full-bleed, high-quality photographs, NO placeholders or wireframes
- Cards: Slight border-radius (4px), shadow-lg on hover
- Sections alternate: cream bg → dark bg → cream bg → dark bg
- Generous white space and padding (py-32 minimum per section)

---

## Screen 1: Homepage — Storytelling (P0)
**Device:** DESKTOP
**Route:** `/`

Premium web development studio homepage — immersive visual storytelling with cinematic photography. Alternating warm cream and dark sections. Vietnamese content with proper diacritics.

### Sections (fullscreen scroll flow):

#### 1. Navbar (fixed, glassmorphism)
- Transparent background with backdrop-blur
- Logo "JULES STUDIO" in left — uppercase tracking-widest, elegant
- Nav links right: Dự Án | Dịch Vụ | Báo Giá — uppercase tracking-wide, small, navy text
- CTA button "Bắt Đầu Dự Án" indigo fill, white text, 4px radius

#### 2. Hero (100vh fullscreen)
- FULL-WIDTH BACKGROUND PHOTOGRAPH: Stunning high-quality image of a modern creative agency workspace — a designer working at a large ultrawide curved monitor showing a colorful beautiful website, warm LED ambient lighting, sleek minimalist desk with coffee cup and plant, modern office interior with floor-to-ceiling windows. PROFESSIONAL PHOTOGRAPHY QUALITY.
- Subtle dark gradient overlay at bottom for text readability
- Content centered vertically:
  - Small label "JULES STUDIO" in indigo, uppercase tracking-[0.4em]
  - Large serif heading "Kiến Tạo Trải Nghiệm Số Đẳng Cấp" in cream white, 5xl-7xl
  - Thin vertical line below as scroll indicator (animated)

#### 3. Introduction (cream bg #F5F0EB)
- Two-column layout with generous padding (py-32)
- LEFT: Small seafoam/indigo accent line, heading "Nghệ Thuật Số Từ Đam Mê" in navy serif (4xl), body text about Jules Studio philosophy in navy/70, italic serif quote below
- RIGHT: LARGE HIGH-QUALITY PHOTOGRAPH (600px tall) of a team brainstorming session — people gathered around a whiteboard covered in UI sketches and sticky notes, warm natural daylight from large windows, modern open-plan office. Shadow-2xl, slightly rounded.

#### 4. Portfolio Preview (dark bg #1A1A2E)
- Heading area: "Dự Án Nổi Bật" serif 4xl in cream, indigo label "Trải Nghiệm Của Chúng Tôi" above
- 4-column grid of tall cards (500px height each):
  - Card 1: PHOTO of a luxury fashion e-commerce website on a MacBook Pro in warm golden setting → "Lumina Fashion", "E-Commerce"
  - Card 2: PHOTO of a colorful SaaS analytics dashboard on a curved monitor → "Zenith Analytics", "SaaS Platform"  
  - Card 3: PHOTO of a restaurant/food delivery app on iPhone with food visible → "Aura Dining", "Mobile App"
  - Card 4: PHOTO of a fintech dark-UI app on smartphone with charts → "Vanguard Finance", "Fintech"
  - Each: full-bleed image, dark gradient overlay at bottom, title + tag, hover: scale(1.1) smooth
- "Xem Tất Cả Dự Án →" indigo text link below

#### 5. Parallax Feature (80vh)
- FULL-WIDTH PARALLAX PHOTOGRAPH: Dramatic close-up of hands typing on a MacBook keyboard, with beautiful colorful code visible on the MBP screen, warm moody desk lamp lighting, dark ambient background
- Dark overlay 20%
- Center: Large serif heading "Mỗi Pixel, Một Câu Chuyện" in cream white 5xl-6xl
- Body: "Chúng tôi tin vào sự hoàn hảo trong từng chi tiết" in cream/80
- CTA: "Khám Phá Quy Trình" indigo button

#### 6. Process Steps (cream bg #F5F0EB)
- Heading: "Quy Trình Làm Việc" large serif navy
- 4 horizontal cards with thin border separators:
  - 01 KHÁM PHÁ — "Hiểu sâu nhu cầu & mục tiêu"
  - 02 THIẾT KẾ — "Giao diện chuẩn mực, trải nghiệm mượt"
  - 03 PHÁT TRIỂN — "Code chất lượng, hiệu suất cao"
  - 04 RA MẮT — "Deploy & hỗ trợ liên tục"
- Large semi-transparent number behind each text (navy/5), turns indigo on hover

#### 7. Testimonial (dark bg #1A1A2E)
- Large indigo quotation marks icon
- Large italic serif quote in cream: "Jules Studio đã biến ý tưởng của chúng tôi thành hiện thực với một website tuyệt đẹp."
- Author: "NGUYỄN VĂN AN — CEO, LUXE FASHION" uppercase tracking-wide cream/40
- Dot indicators

#### 8. Final CTA (50vh)
- FULL-WIDTH BACKGROUND PHOTOGRAPH: Golden hour city skyline from a modern rooftop terrace, warm dramatic sunset, glass building reflections
- Dark gradient overlay
- Heading: "Sẵn Sàng Nâng Tầm Thương Hiệu?" large serif cream
- Subtitle: "Hãy để chúng tôi hiện thực hóa ý tưởng của bạn" cream/70
- "Bắt Đầu Dự Án" large indigo CTA button
- "Hoặc liên hệ trực tiếp →" text link

#### 9. Footer (deep dark #1A1A2E)
- 3 columns: Company info (Jules Studio + address + phone + email) | Menu links | Social icons (Dribbble, Behance, LinkedIn, Facebook)
- Logo + © 2026 bottom
- Minimal, warm cream/40 text

---

## Screen 2: Portfolio Grid (P0)
**Device:** DESKTOP

Same design system. Vietnamese content.

### Sections:
1. **Navbar**: Same glassmorphism
2. **Hero Header**: LARGE BACKGROUND PHOTOGRAPH of a designer's desk from above (flat-lay) — laptop with UI design visible, tablet, color swatches, pencils, coffee cup, notebook, warm natural lighting. Dark overlay. Label "PORTFOLIO" indigo, large serif heading "Dự Án Nổi Bật" cream.
3. **Grid (cream bg)**: 2-column grid of 6 tall project photo cards (500px). Each: FULL-BLEED PHOTOGRAPH of the project mockup (websites on laptops, apps on phones, dashboards on screens). Bottom dark gradient overlay with indigo tag + white title + date. Grayscale filter, full color + scale on hover.
4. **Pagination**: Square buttons, active = indigo
5. **CTA (dark bg)**: "Muốn xem thêm?" cream + indigo button  
6. **Footer**: Same

---

## Screen 3: Portfolio Detail / Case Study (P1)
**Device:** DESKTOP

Same design system. Vietnamese content.

### Sections:
1. **Navbar**
2. **Hero Image**: FULL-WIDTH PHOTO of beautiful laptop showing the project website, placed on a styled modern desk with plants and notebook, soft natural lighting, cinematic framing
3. **Header (cream bg)**: Large serif navy title "E-Commerce Thời Trang", horizontal metadata row below
4. **Overview (cream bg, border-top)**: 60/40 split — overview text navy/60 + stats column (Duration, Stack, Lighthouse)
5. **Challenge + Solution (cream bg)**: Two columns, navy text
6. **Gallery (dark bg)**: 3 images in grid — FULL-QUALITY lifestyle mockups (desktop, mobile, detail). Not flat screenshots.
7. **Tech Tags + Navigation (cream bg)**: Tag pills, project nav links
8. **Footer**

---

## Screen 4: Services (P1)
**Device:** DESKTOP

Same design system. Vietnamese content.

### Sections:
1. **Navbar**
2. **Hero Header**: LARGE BACKGROUND PHOTOGRAPH of modern tech team collaborating at standing desks, large monitors visible, glass walls, bright office lighting. Dark overlay. "DỊCH VỤ" indigo label + "Giải Pháp Kỹ Thuật Số Toàn Diện" large serif cream heading.
3. **Service Rows (cream bg)**: 4 rows with thin navy/10 border separators:
   - 01 Thiết Kế UI/UX — description + tags (Figma, Wireframe, Prototype)
   - 02 Phát Triển Web — description + tags (React, Next.js, Tailwind)
   - 03 Mobile App — description + tags (React Native, Flutter, PWA)
   - 04 SEO & Marketing — description + tags (Analytics, Content, Ads)
   Navy text on cream. Numbers in navy/10 large background.
4. **Tech Grid (dark bg)**: Grid of tech names, cream/30 text
5. **CTA (cream bg)**: "Sẵn sàng nâng tầm?" + indigo button
6. **Footer**

---

## Screen 5: Login (P1)
**Device:** DESKTOP

Same design system. Vietnamese content.

### Split Layout:
1. **Navbar**: Minimal glassmorphism
2. **LEFT panel (dark #1A1A2E)**: 
   - LARGE BACKGROUND PHOTOGRAPH of a designer's desk at night — monitor glowing with beautiful dashboard UI, ambient blue/purple LED lighting, keyboard and coffee cup. Subtle dark overlay.
   - Heading "Theo dõi dự án của bạn" large serif cream
   - Benefit list with indigo check icons: "Xem tiến độ realtime", "Tải hợp đồng & báo giá", "Theo dõi thanh toán"
3. **RIGHT panel (cream bg #F5F0EB)**:
   - Centered form, heading "Đăng Nhập" navy serif
   - Email + Password fields with clean styling
   - "Quên mật khẩu?" indigo link
   - Submit button "ĐĂNG NHẬP" indigo, full-width
   - "HOẶC" divider + Google sign-in bordered button
   - "Chưa có tài khoản? Đăng ký" link
4. **Footer**: Minimal

---

## Screen 6: Register (P1)
**Device:** DESKTOP

Same design system. Vietnamese content.

### Split Layout:
1. **Navbar**
2. **LEFT panel (dark #1A1A2E)**:
   - LARGE BACKGROUND PHOTOGRAPH of creative team workspace — multiple monitors showing UI designs, whiteboards with sketches, modern chairs, bright warm lighting. Dark overlay.
   - Large bold heading "TẠO TÀI KHOẢN" cream serif
   - Benefit list with indigo check icons
3. **RIGHT panel (cream bg #F5F0EB)**:
   - "Đăng Ký" navy heading
   - Form: Họ và Tên, Email, Số điện thoại, Mật khẩu, Xác nhận mật khẩu
   - Submit "ĐĂNG KÝ" indigo button
   - Google sign-up + link to login
4. **Footer**: Minimal

---

## Screen 7: 404 Not Found (P2)
**Device:** DESKTOP

Same design system. Vietnamese content.

### Layout:
1. **Navbar**
2. **Content (full viewport, centered)**:
   - Background: Subtle PHOTOGRAPH of an empty modern minimalist corridor with dramatic light beams and long shadows. Light cream overlay giving atmospheric feel.
   - "LỖI 404" indigo label
   - Ghost "404" oversized text in navy/5 (extremely large ~12rem)
   - "Trang bạn tìm không tồn tại hoặc đã được di chuyển." navy/40
   - "← Về Trang Chủ" indigo button
3. **Footer**: Minimal
