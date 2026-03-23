# Jules Studio Public Site — Design Brief v2

## Brand Identity

**Jules Studio** = Web design studio chuyên thiết kế và phát triển website theo hướng **storytelling** và trải nghiệm người dùng.

### Core Message
> "Mỗi website là một câu chuyện được thiết kế"

**Sub**: Jules Studio thiết kế và xây dựng website mang tính trải nghiệm, phù hợp với từng ngành và mục tiêu kinh doanh.

### About (tiếng Việt)
Jules Studio là một web design studio chuyên thiết kế và phát triển website theo hướng trải nghiệm và storytelling. Thay vì tạo ra những website giống nhau, Jules tập trung xây dựng sản phẩm phù hợp với từng mô hình kinh doanh — từ resort, nhà hàng đến startup và thương hiệu cá nhân. Mỗi dự án là sự kết hợp giữa thiết kế, chuyển động và logic vận hành — đảm bảo không chỉ đẹp mà còn hoạt động hiệu quả.

### Target Audience
- Startup, doanh nghiệp nhỏ, thương hiệu đang xây dựng hình ảnh
- Không rành tech, muốn web "đẹp + có gu"
- Cuối cùng vẫn cần ra tiền / ra khách

### Differentiation (4 cột)
1. **Story-driven web** — mỗi web là một trải nghiệm kể chuyện, không phải template
2. **Industry-fit structure** — web resort ≠ web bán hàng ≠ web portfolio, build đúng logic từng ngành
3. **Design + Motion + Logic** — không chỉ UI đẹp, mà animation mượt, flow hợp lý, có mục tiêu chuyển đổi
4. **Showcase chất lượng cao** — mini Awwwards-style showcase

---

## Design Direction

### Style
- **Primary**: Light & Elegant (Stripe / Linear vibe)
- **Secondary**: Studio/Creative (Awwwards agencies vibe)
- Nền sáng, clean, premium
- Animation + layout creative

### Color Palette (đề xuất)
- **Background**: `#FAFAF9` (warm white) — chính
- **Surface**: `#F5F5F0` (subtle warm gray) — cards, sections
- **Dark sections**: `#1C1917` (stone-900) — contrast sections
- **Primary accent**: `#4F46E5` (indigo-600) — CTAs, links
- **Secondary accent**: `#0EA5E9` (sky-500) — hover states  
- **Text**: `#1C1917` (stone-900) — headings
- **Text muted**: `#78716C` (stone-500) — body
- **Border**: `#E7E5E4` (stone-200)

### Typography (đề xuất — Vietnamese-compatible)
- **Heading**: **Plus Jakarta Sans** (700/800) — geometric, modern, hỗ trợ tiếng Việt tốt
- **Body**: **Inter** (400/500) — readable, clean, Vietnamese excellent
- **Alternative heading**: **Outfit** hoặc **Be Vietnam Pro** nếu muốn thuần Việt hơn

### Hero Style
- Screenshot sản phẩm (website mockups)
- Typography lớn, bold
- Motion nhẹ (scroll reveals, subtle parallax)

### Animation & Interaction (kiểu Oasis)
- **Grayscale → Color**: Hình ảnh mặc định grayscale, hover full color (700ms)
- **Card zoom**: hover scale(1.05) mượt (700ms)
- **Scroll reveal**: fade-up on scroll
- **Card lift**: hover -translate-y-1 + shadow-lg

---

## Screen Plan

| # | Screen | Priority | Route | Mô tả |
|---|--------|----------|-------|--------|
| 1 | Homepage | P0 | `/` | Landing page storytelling — hero, about, portfolio, differentiators, process, contact, CTA |
| 2 | Portfolio Grid | P0 | `/du-an` | Gallery dự án với filter/categories |
| 3 | Portfolio Detail | P1 | `/du-an/:id` | Case study chi tiết cho từng dự án |
| 4 | Services | P1 | `/dich-vu` | Dịch vụ cung cấp |
| 5 | Config Builder | P1 | `/bao-gia` | Multi-step wizard: chọn loại web → modules → contact → summary + giá |
| 6 | Login | P1 | `/dang-nhap` | Đăng nhập khách hàng |
| 7 | Register | P1 | `/dang-ky` | Đăng ký tài khoản |
| 8 | 404 | P2 | `*` | Trang lỗi |

### Homepage Sections (đề xuất)
1. **Hero** — Tagline lớn + browser mockup screenshot + CTA
2. **About** — Giới thiệu ngắn Jules Studio + stats bento grid
3. **Portfolio** — 3 dự án nổi bật (grayscale→color hover)
4. **Differentiators** — 4 điểm khác biệt (dark section)
5. **Process** — Quy trình làm việc 4 bước
6. **Contact** — Form liên hệ nhanh (cho khách cần tư vấn ngay)
7. **CTA** — Call to action cuối trang
8. **Footer**

### 2 Luồng Khách Hàng
- **Luồng 1** (nhanh): Khách cần tư vấn → điền Contact form trên Homepage
- **Luồng 2** (tự chọn): Khách tự chọn config → Config Builder (`/bao-gia`) → điền thông tin → nhận báo giá
