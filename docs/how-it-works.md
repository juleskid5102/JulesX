# Jules Studio — Cách Hoạt Động

## Jules Studio là gì?

Jules Studio là **studio thiết kế & phát triển website** chuyên nghiệp. Khách hàng là doanh nghiệp, cá nhân cần website — từ landing page đơn giản đến web app phức tạp.

Hệ thống gồm:
- **Website công khai** — khách xem portfolio, ước tính chi phí, gửi yêu cầu, theo dõi dự án
- **Admin panel** — quản lý leads, dự án, tiến độ, thanh toán, tính năng, nội dung
- **API backend** — xử lý logic, auth, thông báo push
- **Công cụ nội bộ** — xuất báo giá Excel, seed dữ liệu, Antigravity AI build web cho khách

---

## Quy trình làm việc

### Bước 1: Khách tìm đến Jules Studio

Khách vào website → xem **portfolio** (các dự án mẫu) + **dịch vụ** → ấn tượng → muốn làm web.

### Bước 2: Khách gửi yêu cầu (2 luồng)

**Luồng A — Contact Form (đơn giản):**
```
Khách chỉ điền: tên, email, SĐT, message mô tả sơ
→ Lưu vào leads (source: "contact-form")
→ Admin nhận push notification → chủ động liên hệ khách
→ Admin trao đổi → hiểu nhu cầu → TỰ BỔ SUNG features, phong cách, giá vào lead
```

**Luồng B — ConfigBuilder (chi tiết):**
```
Khách tự chọn qua wizard 5 bước:
  Bước 1: Chọn loại web (7 loại: Landing, Doanh nghiệp, E-commerce, Web App, Booking, Blog, Giới thiệu)
  Bước 2: Chọn phong cách thiết kế (24 styles, chọn 1-2)
  Bước 3: Chọn tính năng (63 features, tự động gợi ý theo loại web + gói)
  Bước 4: Điền thông tin liên hệ (tên, email, SĐT, mô tả)
  Bước 5: Review tổng quan + gửi

→ Giá tự động tính theo công thức (xem phần Pricing bên dưới)
→ Lưu vào leads (source: "config-builder")
→ Admin nhận push → review → trao đổi → SỬA TRỰC TIẾP features/giá nếu cần
```

> **Admin là người quyết định cuối cùng** — khách chọn không chuẩn hoặc không rõ → admin sửa lại.

### Bước 3: Chốt và tạo dự án

```
Admin trao đổi xong → chốt features + giá → Convert lead thành project
→ Tạo tracking code (PRJ-X1Y2) + link theo dõi
→ Gửi QR/link cho khách
→ Thu tiền cọc (40%)
```

### Bước 4: Phát triển

```
Admin (hoặc Antigravity AI) dùng thông tin từ lead để build:
  → Thiết kế UI trên Stitch (dựa vào phong cách + tính năng đã chốt)
  → Convert Stitch → React components
  → Kết nối backend
  → Khách review → sửa → duyệt

Tiến độ cập nhật trên project (0-100%)
→ Khách theo dõi qua link tracking hoặc trang cá nhân
```

### Bước 5: Bàn giao + Thanh toán

```
Hoàn thành → Khách nghiệm thu → Thanh toán phần còn lại (60%)
→ Project status: "completed"
```

### Bước 6: Đăng Portfolio

```
Dự án đẹp → Admin thêm thông tin portfolio (challenge, solution, screenshots)
→ Project status: "published"
→ Hiện trên trang portfolio cho khách mới xem
```

---

## Hệ thống tính giá

### Source of truth: `estimator_config/main`

Lưu trên Firebase — admin có thể sửa bất kỳ lúc nào.

### 63 tính năng, 9 danh mục

| Danh mục | Ví dụ | Hệ số (giờ dev) |
|---------|-------|-----------------|
| ⚙️ Core | Homepage, About, Contact, 404, Header/Footer | 0.5 – 4 |
| 📝 Nội dung | Services, Portfolio, Blog, FAQ, Testimonials | 1.5 – 6 |
| 🛒 Booking & Thương mại | Booking, Cart, Checkout, Order Tracking | 2 – 8 |
| 📊 Admin & Quản trị | Dashboard, User Mgmt, Reports | 3 – 15 |
| 🔐 Tài khoản | Login, Social Login, RBAC | 1.5 – 3 |
| 🔔 Thông báo | Email, FCM Push, SMS, In-app | 1.5 – 5 |
| 🔧 Kỹ thuật | SEO, PWA, i18n, Analytics | 0 – 4 |
| 🎬 Thiết kế phức tạp | GSAP, 3D, Parallax, Dark mode | 1 – 8 |
| ✨ Nâng cao | AI Chatbot, Wizard form | 0.5 – 6 |

### Priority Matrix

Mỗi tính năng có **mức ưu tiên khác nhau** tùy loại website:

| Ký hiệu | Ý nghĩa | Gói áp dụng |
|---------|---------|-------------|
| 🟢 | Bắt buộc — không thể thiếu | Tất cả gói |
| 🟡 | Nên có — nâng trải nghiệm | Phổ thông + Nâng cao |
| ⚪ | Tùy chọn — thêm nếu muốn | Nâng cao |
| — | Không áp dụng | Ẩn |

### Công thức

```
Σ hệ số (features đã chọn)
  × coefficient (1.5 — buffer quản lý, QA, phát sinh)
  ÷ 8 (giờ/ngày)
  = số ngày
  × dailyRate (1,000,000 VNĐ/ngày)
  = giá dự kiến

Cọc 40% trước khi bắt đầu. Thanh toán 60% khi nghiệm thu.
```

### Bảng giá tham khảo

| Loại | Giá từ | Thời gian |
|------|--------|-----------|
| Landing Page | 5 – 8 triệu | 5 – 7 ngày |
| Web Giới Thiệu | 5 – 12 triệu | 5 – 12 ngày |
| Web Doanh Nghiệp | 8 – 18 triệu | 8 – 18 ngày |
| E-commerce | 15 – 35 triệu | 15 – 35 ngày |
| Web App | 20 – 60 triệu+ | 20 – 60 ngày |
| Booking | 10 – 25 triệu | 10 – 25 ngày |
| Blog / Tạp Chí | 5 – 10 triệu | 5 – 10 ngày |

---

## Khách hàng

### 2 loại

| Loại | Mô tả |
|------|-------|
| **Guest (vãn lai)** | Chưa đăng ký. Gửi yêu cầu → nhận tracking link |
| **User (đã đăng ký)** | Đăng nhập → xem tiến độ, lịch sử trên trang cá nhân |

### Luồng Guest → User

```
Guest gửi form (contact hoặc ConfigBuilder)
  → Check SĐT: trùng? → yêu cầu đăng nhập
  → Chưa có? → hoàn thành form → hỏi "Muốn đăng ký?"
  → Nếu muốn: chỉ cần thêm mật khẩu + xác nhận (email/SĐT đã có)
  → Tự động merge leads + projects vào tài khoản mới
```

### Theo dõi dự án

Khách theo dõi tiến độ qua 2 cách:
1. **Link/QR code** — nhận sau khi hoàn thành form hoặc khi admin tạo project
2. **Trang cá nhân** (`/tai-khoan`) — đăng nhập → xem tất cả dự án + lịch sử

---

## Tech Stack

| Layer | Công nghệ |
|-------|----------|
| Frontend | React 19, Vite 6, Tailwind CSS v4 |
| Backend | Cloudflare Workers, Hono |
| Database | Firebase Firestore (REST qua Worker) |
| Auth | Firebase Authentication (Email + Google) |
| Push | Firebase Cloud Messaging (FCM v1) |
| Deploy | Cloudflare Pages (2 apps) + Workers |

---

## Nơi dùng dữ liệu chung

### Features (63 tính năng)

| Nơi | Cách dùng |
|-----|----------|
| Quotation Excel | Liệt kê đầy đủ + hệ số + priority per loại web |
| ConfigBuilder | Khách chọn → tính giá |
| Lead detail (admin) | Admin review + sửa |
| Project (admin) | Xem features đã chốt |
| Portfolio Detail | Hiện chips tính năng cho khách xem |

### Design Styles (24 phong cách)

| Nơi | Cách dùng |
|-----|----------|
| Quotation Excel | Checklist chọn |
| ConfigBuilder | Cards chọn 1-2 |
| Lead detail | Admin review |
| Portfolio Detail | Hiện phong cách |

### Pricing Constants

| Nơi | Cách dùng |
|-----|----------|
| Firebase (`estimator_config`) | Lưu trữ, admin sửa |
| ConfigBuilder | Tính giá realtime |
| Quotation Excel | Tính giá |
| Admin Lead detail | Hiện giá ước tính |
