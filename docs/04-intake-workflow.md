---
description: Quy trình nhận dự án mới — từ liên hệ khách đến chuyển pipeline
---

# Intake Workflow — Quy trình nhận dự án

> **Ai đọc file này?** Antigravity đọc mỗi khi nhận yêu cầu phân tích dự án mới.
> File này mô tả quy trình vận hành, KHÔNG thay đổi theo dự án.

---

## Pipeline Files (theo thứ tự)

| # | File | Vai trò | Ai đọc |
|---|------|---------|--------|
| 01 | `docs/01-new-project.md` | Câu hỏi cho khách | Admin |
| 02 | `docs/02-feature-catalog.md` | 18 nhóm tính năng (source of truth) | Antigravity |
| 03 | `docs/03-stack-defaults.md` | Stack mặc định + hosting logic | Antigravity |
| 04 | `docs/04-intake-workflow.md` | Quy trình vận hành (file này) | Antigravity |
| 05 | `docs/05-design.md` | Stitch UI mockup | Antigravity |
| 06 | `docs/06-stitch-to-react.md` | Convert Stitch → React | Antigravity |
| 07 | `docs/07-architect.md` | Kiến trúc + schema + API | Antigravity |
| 08 | `docs/08-dev-setup.md` | Setup dự án mới | Antigravity |
| 09 | `docs/09-qa.md` | QA + Review | Antigravity |
| 10 | `docs/10-deploy.md` | Build + Deploy Cloudflare | Antigravity |

**Rule:** `.agents/rules/antigravity-webapp-pipeline.md`
**Workflow:** `.agents/workflows/new-project.md`

---

## Tổng quan

```
Khách liên hệ → Bạn chat hỏi cơ bản → Gửi cho Antigravity
→ Antigravity phân tích + recommend features + hỏi bổ sung
→ Bạn relay khách ↔ Antigravity cho đến khi đủ data
→ Chốt → Push Firebase + Xuất text
→ Bạn copy vào Word → Gửi khách
→ Chuyển pipeline: /design → /architect → /dev-setup → ...
```

---

## Giai đoạn 1: Thu thập thông tin (Bạn ↔ Khách)

### Câu hỏi cơ bản (bạn hỏi khách qua Zalo/Messenger/Email)

**A. Thông tin dự án (bắt buộc):**

**1. Tên website / dự án?**
> _[Điền tên]_

**2. Mô tả dự án** — khách mô tả theo các gợi ý sau:
- Lĩnh vực / ngành nghề gì?
- Bán sản phẩm / dịch vụ gì?
- Đối tượng khách hàng là ai? (B2B, B2C, nội bộ)
- Website giải quyết vấn đề gì?
- Có bao nhiêu sản phẩm / dịch vụ cần hiển thị?
- Cần những chức năng chính nào? (bán hàng, đặt lịch, blog, dashboard...)

**3. Website tham khảo** (link + thích điểm gì?)
> _[Paste link + ghi chú ngắn]_

**4. Có hosting riêng không?**
- [ ] Không (→ dùng Cloudflare mặc định)
- [ ] Có: _[tên hosting]_

**5. Domain?**
- [ ] Đã có: _[domain.com]_
- [ ] Chưa có, cần mua
- [ ] Chưa có, chưa cần

**6. Logo?**
- [ ] Đã có (gửi file)
- [ ] Chưa có, cần thiết kế
- [ ] Chưa có, chưa cần

**7. Deadline / Ngân sách?** _(không bắt buộc)_
> Deadline: _[Điền hoặc "Linh hoạt"]_
> Ngân sách: _[Điền hoặc "Chưa rõ"]_

---

**B. Phong cách thiết kế (không bắt buộc — nếu khách chưa rõ, Antigravity sẽ đề xuất):**

**8. Phong cách mong muốn?** — Chọn 1-2 style:

| | Phong cách | Ví dụ | Mô tả |
|---|------------|-------|-------|
| [ ] | **Minimalist** | Apple, Dropbox | Tối giản, nhiều khoảng trắng, tập trung nội dung |
| [ ] | **Glassmorphism** | macOS Big Sur, Spotify | Kính mờ, trong suốt, đổ bóng nhẹ |
| [ ] | **Neumorphism** | Stripe | Bóng mềm, nổi lên từ nền, cảm giác 3D nhẹ |
| [ ] | **Brutalist** | Craigslist, Gumroad | Thô, mạnh mẽ, typography lớn, ít trang trí |
| [ ] | **Corporate** | Microsoft, Salesforce | Chuyên nghiệp, đáng tin, bố cục rõ ràng |
| [ ] | **Luxury / Premium** | Chanel, Rolex | Cao cấp, serif font, màu trầm, khoảng trắng lớn |
| [ ] | **Bento Grid** | Apple keynote, Linear | Layout dạng hộp/lưới, mỗi ô 1 feature |
| [ ] | **Retro / Vintage** | Mailchimp cũ | Cổ điển, màu warm, texture giấy |
| [ ] | **Futuristic / Tech** | Tesla, SpaceX | Công nghệ, neon, dark mode, gradient |
| [ ] | **Organic / Natural** | Lush, The Body Shop | Tự nhiên, earth tone, hình organic |
| [ ] | **Playful / Colorful** | Notion, Figma | Vui tươi, nhiều màu sắc, illustration |
| [ ] | **Flat Design** | Google Material | Phẳng, màu sắc rõ ràng, không đổ bóng |
| [ ] | **Skeuomorphism** | iOS cũ (pre-2013) | Giống vật thật (da, gỗ, nút bấm nổi) |
| [ ] | **Art Deco** | The Great Gatsby | Hình học, đối xứng, vàng/đen, sang trọng |
| [ ] | **Swiss / Clean** | Notion, Linear | Lưới chặt, typography mạnh, rất gọn |
| [ ] | **Y2K / Cyber** | TikTok, Depop | Gradient neon, holographic, Gen Z |
| [ ] | **Editorial** | Medium, NYT | Tạp chí, typography lớn, đọc dễ chịu |
| [ ] | **Dark Mode Premium** | Figma, Vercel | Nền tối chủ đạo, accent sáng, dev-friendly |
| [ ] | **Sci-fi / HUD** | Dashboard SpaceX | Giao diện viễn tưởng, data-driven, xanh neon |
| [ ] | **Kawaii / Cute** | Sanrio, LINE | Dễ thương, pastel, illustration tròn |
| [ ] | **Industrial / Grunge** | Band pages, underground | Texture bẩn, font thô, raw |
| [ ] | **Neo-Memphis** | Figma community | Hình học vui, màu bold, pattern |
| [ ] | **Claymorphism** | Webflow showcase | 3D clay, bóng mềm, pastel, vui |

> **Gửi khách xem mẫu:** [godly.website](https://godly.website) · [dribbble.com](https://dribbble.com) · [awwwards.com](https://awwwards.com)

**9. Màu chủ đạo?** — Chọn hoặc gửi mã hex:

| | Palette | Phù hợp |
|---|---------|---------|
| [ ] | 🔵 Blue (xanh dương) | Tech, B2B, Finance |
| [ ] | 🟢 Green (xanh lá) | Health, Eco, Food |
| [ ] | 🟣 Purple (tím) | SaaS, AI, Creative |
| [ ] | 🟠 Orange (cam) | Startup, F&B, Sport |
| [ ] | 🔴 Red (đỏ) | E-commerce, Media |
| [ ] | 🩷 Pink (hồng) | Fashion, Beauty |
| [ ] | 🫧 Teal (xanh ngọc) | Medical, Travel |
| [ ] | ⚪ Neutral (trung tính) | Portfolio, Luxury |
| [ ] | 🌸 Pastel (nhẹ nhàng) | Kids, Wellness |
| [ ] | ⚫ Dark (tối) | Tech, Gaming |
| [ ] | 🎨 Custom hex: _#_______ + _#_______ | Tự chọn |

> Không chọn → Antigravity sẽ đề xuất palette dựa trên loại dự án + phong cách.

**10. Tông sáng hay tối?**
- [ ] Light mode (sáng)
- [ ] Dark mode (tối)
- [ ] Cả hai (tự chuyển đổi)
- [ ] Để AI đề xuất

---

**C. Hiệu ứng & Animation (không bắt buộc — chọn mức độ):**

| | Mức độ | Mô tả |
|---|--------|-------|
| [ ] | **Không hiệu ứng** | Trang tĩnh, tải nhanh nhất |
| [ ] | **Hiệu ứng nhẹ** _(đề xuất)_ | Hover buttons, fade-in khi scroll, loading skeleton |
| [ ] | **Hiệu ứng vừa** | Scroll reveal, page transitions, micro-interactions |
| [ ] | **Hiệu ứng mạnh** | Parallax scrolling, 3D nhẹ, cursor effects |
| [ ] | **3D / Immersive** | Three.js, WebGL, trải nghiệm cinematic |

> Không chọn → Mặc định **Hiệu ứng nhẹ** là đề xuất cho hầu hết dự án.

### Output giai đoạn 1
Bạn gửi cho Antigravity: **paste nguyên đoạn chat** hoặc tóm tắt câu trả lời của khách.

---

## Giai đoạn 2: Phân tích (Bạn ↔ Antigravity)

### Input Antigravity nhận
- Mô tả từ khách (text)
- Đọc `docs/02-feature-catalog.md` (source of truth)
- Đọc `docs/03-stack-defaults.md` (stack logic)

### Antigravity xử lý
1. **Xác định loại dự án** (Landing / Web DN / E-commerce / Web App / Blog / Booking / ...)
2. **Recommend features** từ `02-feature-catalog.md`:
   - 🟢 **Chắc chắn cần** — suy từ loại dự án + mô tả khách
   - 🟡 **Nên có** — phổ biến cho loại này, khách chưa nói rõ
   - ⚪ **Tùy chọn** — nâng cao, hỏi khách nếu cần
3. **Xác định stack** từ `03-stack-defaults.md`:
   - Có host → Scenario B
   - Không host → Scenario A (mặc định)
4. **Ước tính sơ bộ** (range ngày + giá)
5. **Liệt kê câu hỏi bổ sung** — chỉ hỏi những gì CHƯA RÕ

### Output Antigravity trả
```
## Phân tích dự án: [Tên]

### Loại: [E-commerce / Web App / ...]
### Stack: Scenario [A/B]

### Features Recommend:
🟢 Auth: Email/Password, Google Login, Forgot Password
🟢 E-commerce: Product Listing, Cart, Checkout, Bank Transfer
🟡 Search: Basic Search, Category Filter
🟡 Notification: Email Notification
⚪ Analytics: GA4, Revenue Reports

### Ước tính sơ bộ: X-Y ngày | X-Y triệu VNĐ

### Câu hỏi bổ sung:
1. Thanh toán online (VNPay/MoMo) hay chỉ chuyển khoản?
2. Cần app mobile hay chỉ web responsive?
3. ...
```

### Vòng lặp
```
Antigravity hỏi bổ sung → Bạn hỏi khách → Khách trả lời
→ Bạn gửi lại Antigravity → Cập nhật recommend
→ Lặp cho đến khi ĐỦ DATA
```

---

## Giai đoạn 3: Chốt & Lưu trữ

### Khi đủ data, Antigravity:

1. **Push lên Firebase** (collection `intake_projects`):
   ```json
   {
     "projectName": "...",
     "clientName": "...",
     "clientEmail": "...",
     "projectType": "ecommerce",
     "hosting": "cloudflare",
     "selectedFeatures": ["auth-email", "cart", "checkout", ...],
     "selectedPages": ["Home", "Products", "Cart", ...],
     "designBrief": { "style": "modern", "palette": "blue", ... },
     "estimatedDays": { "min": 20, "max": 30 },
     "estimatedPrice": { "min": 15000000, "max": 25000000 },
     "status": "draft",
     "createdAt": "...",
     "updatedAt": "..."
   }
   ```

2. **Xuất bảng tính năng** (text format):
   - Danh sách features đã chốt, gom theo nhóm
   - Bạn chụp màn hình hoặc copy gửi khách xem

3. **Xuất nội dung Overview** (text format):
   - Phạm vi dự án
   - Danh sách tính năng (tiếng Việt, đơn giản)
   - Timeline dự kiến
   - Chi phí
   → Bạn copy vào mẫu Word → gửi khách

---

## Giai đoạn 4: Chuyển Pipeline

Khi khách OK → Antigravity chuyển status `approved` và bắt đầu pipeline:

```
/design       → Stitch UI mockup
/architect    → Database schema, API spec, component tree
/dev-setup    → Init project, install deps
/code         → Build frontend + backend
/qa           → Test + review
/deploy       → Cloudflare Pages + Workers deploy
```

Mỗi phase sinh output docs vào `docs/`:
- `DESIGN.md`, `architecture.md`, `database_schema.md`, `api_spec.md`, `component_tree.md`
- `reports/qa_report.md`, `reports/deployment_log.md`

---

## Admin Board

**Mục đích:** Bạn vào xem + chỉnh sửa nhẹ. KHÔNG phải nơi nhập chính.

| Trang | Chức năng |
|-------|-----------|
| `/admin/intake` | Danh sách tất cả dự án intake |
| `/admin/intake/:id` | Xem chi tiết + chỉnh sửa |
| `/admin/settings` | Quản lý modules, system types |

---

## Lưu ý quan trọng

1. **Antigravity PHẢI đọc `02-feature-catalog.md` mỗi lần** → Đảm bảo recommend nhất quán
2. **Antigravity PHẢI đọc `03-stack-defaults.md`** → Đề xuất stack đúng scenario
3. **Không tự ý thêm feature** nếu không có trong `02-feature-catalog.md`
4. **Estimating:** Dựa trên data từ admin Settings (pricePerDay, module minDays/maxDays)
5. **Push Firebase** qua MCP tool, không cần bạn thao tác trên web

## Skills sử dụng

| Khi nào | Skill |
|---------|-------|
| Brainstorm ý tưởng cho dự án | `brainstorming` |
| Phân tích yêu cầu kinh doanh | `business-analyst` |
| Đề xuất phong cách thiết kế | `ui-ux-pro-max` |
| Ước tính chi phí | `startup-analyst` |

