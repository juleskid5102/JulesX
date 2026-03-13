---
description: Thu thập thông tin cơ bản từ khách hàng — Phần câu hỏi đơn giản
---

# New Project — Client Intake Form

> **Ai dùng file này?** Bạn (admin) dùng để hỏi khách hàng.
> **Tính năng chi tiết** → xem `02-feature-catalog.md`
> **Stack kỹ thuật** → xem `03-stack-defaults.md`
> **Quy trình vận hành** → xem `04-intake-workflow.md`

---

## PHẦN 1: THÔNG TIN DỰ ÁN

### 1.1 Thông tin cơ bản

| Câu hỏi | Trả lời |
|----------|---------|
| **Tên dự án** | _[Điền]_ |
| **Mô tả ngắn** (1-2 câu: bán gì, làm gì?) | _[Điền]_ |
| **Đối tượng người dùng** | _[vd: Sinh viên, Doanh nghiệp]_ |
| **Website tham khảo** (link + thích điểm gì?) | _[URL + note]_ |

### 1.2 Loại dự án

Chọn 1:

- [ ] Landing Page (1 trang, giới thiệu sản phẩm/dịch vụ)
- [ ] Website doanh nghiệp (nhiều trang, giới thiệu công ty)
- [ ] E-commerce (bán hàng online)
- [ ] Blog / Tin tức
- [ ] Web Application (SaaS, dashboard, tool)
- [ ] Portfolio (cá nhân/agency)
- [ ] Booking / Đặt lịch
- [ ] Marketplace (nhiều người bán)
- [ ] Social Platform (mạng xã hội)
- [ ] Khác: ___________

---

## PHẦN 2: HOSTING & TÀI NGUYÊN

| Câu hỏi | Trả lời |
|----------|---------|
| **Khách có hosting riêng?** | Có / Không |
| **Nếu có, hosting nào?** | _[vd: VPS, shared hosting]_ |
| **Đã có domain?** | Có: _________ / Chưa |
| **Cần mua domain?** | Có / Không |
| **Đã có logo?** | Có / Chưa |
| **Đã có ảnh sản phẩm?** | Có (gửi file) / Chưa |

> **Logic hosting:**
> - Không có host → Cloudflare Pages + Workers (mặc định)
> - Có host → Chuyển backend sang host khách

---

## PHẦN 3: TIMELINE & NGÂN SÁCH

| Câu hỏi | Trả lời |
|----------|---------|
| **Deadline** (nếu có) | _[Điền]_ |
| **Ngân sách khoảng** | _[Điền hoặc "Chưa rõ"]_ |
| **Ai sẽ dùng website?** | Khách hàng / Nhân viên / Cả hai |
| **Cần admin panel?** | Có / Không |
| **Cần đa ngôn ngữ?** | Không / Song ngữ / Nhiều ngôn ngữ |

---

## PHẦN 4: THIẾT KẾ (Design Brief)

### 4.1 Phong cách tổng thể

Chọn 1-2:

- [ ] Minimalist (tối giản, nhiều khoảng trắng)
- [ ] Modern (hiện đại, clean)
- [ ] Glassmorphism (kính mờ, trong suốt)
- [ ] Neumorphism (bóng mềm, nổi)
- [ ] Brutalist (thô, mạnh mẽ, typography lớn)
- [ ] Corporate / Professional (doanh nghiệp, đáng tin)
- [ ] Playful / Colorful (vui tươi, nhiều màu)
- [ ] Luxury / Premium (cao cấp, sang trọng)
- [ ] Retro / Vintage (cổ điển)
- [ ] Tech / Futuristic (công nghệ, sci-fi)
- [ ] Organic / Natural (tự nhiên, earth tone)
- [ ] Bento Grid (layout dạng lưới)

### 4.2 Bảng màu

| | Palette | Ví dụ | Phù hợp |
|---|---|---|---|
| [ ] | Blue / Professional | #2563eb, #1e40af | B2B, Tech, Finance |
| [ ] | Green / Nature | #16a34a, #15803d | Health, Eco, Food |
| [ ] | Purple / Creative | #7c3aed, #6d28d9 | SaaS, AI, Creative |
| [ ] | Orange / Energetic | #ea580c, #c2410c | Food, Sports, Startup |
| [ ] | Red / Bold | #dc2626, #b91c1c | E-commerce, Media |
| [ ] | Pink / Soft | #ec4899, #db2777 | Fashion, Beauty |
| [ ] | Teal / Fresh | #0d9488, #0f766e | Medical, Travel |
| [ ] | Neutral / Monochrome | #374151, #6b7280 | Portfolio, Luxury |
| [ ] | Pastel | #fbbf24, #a78bfa, #f9a8d4 | Playful, Kids |
| [ ] | Dark Mode | #1f2937, #111827 | Tech, Gaming |
| [ ] | Custom | Primary: _#_______ Secondary: _#_______ | _[Tự chọn]_ |

### 4.3 Typography

| | Font Style | Ví dụ | Phù hợp |
|---|---|---|---|
| [ ] | Sans-serif (clean) | Inter, Roboto, Open Sans | Đa năng |
| [ ] | Geometric Sans | Outfit, Poppins, Montserrat | Modern |
| [ ] | Rounded | Nunito, Quicksand | Friendly |
| [ ] | Serif (classic) | Playfair Display, Merriweather | Luxury, Blog |
| [ ] | Monospace | JetBrains Mono, Fira Code | Tech, Dev |
| [ ] | Tiếng Việt tối ưu | Be Vietnam Pro, Lexend | VN projects |

### 4.4 Layout

- [ ] Full-width (tràn viền)
- [ ] Contained (max-width, centered)
- [ ] Sidebar Layout (cho dashboard/admin)
- [ ] Card-based (nội dung trong cards)
- [ ] Single Column (1 cột, focused)

### 4.5 Animation

| | Effect | Ghi chú |
|---|---|---|
| [ ] | Hover effects | Buttons, cards phản hồi hover |
| [ ] | Scroll animations | Fade in khi scroll |
| [ ] | Page transitions | Smooth chuyển trang |
| [ ] | Loading skeleton | Placeholder khi load data |
| [ ] | Parallax scrolling | Background chạy chậm hơn |
| [ ] | Micro-interactions | Nút thích đổi trạng thái |
| [ ] | Không animation | Giữ đơn giản |

### 4.6 Responsive

- [ ] Mobile-first (ưu tiên mobile)
- [ ] Desktop-first (ưu tiên desktop)
- [ ] Mobile + Desktop (cân bằng)
- [ ] Chỉ Desktop (không cần mobile)

---

## XỬ LÝ SAU KHI THU THẬP

1. Bạn gửi thông tin cho Antigravity (paste chat hoặc bảng trên)
2. Antigravity đọc `02-feature-catalog.md` → recommend features
3. Antigravity hỏi bổ sung nếu thiếu data
4. Chốt → push Firebase + xuất text
5. Bạn copy vào mẫu Word → gửi khách

> **Xem chi tiết quy trình:** `docs/04-intake-workflow.md`
