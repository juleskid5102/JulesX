# Jules Studio — Project Overview

## Phạm vi dự án

Jules Studio là website portfolio + CRM quản lý khách hàng cho studio thiết kế web.  
Dự án gồm 2 website tách biệt và 1 API backend dùng chung:

1. **Public Site** (`julesstudio.pages.dev`) — Trang khách hàng: landing page, portfolio, order tracking, đăng ký/đăng nhập
2. **Admin Panel** (`admin-julesstudio.pages.dev`) — Quản trị: dashboard, leads, projects, settings, intake
3. **API Backend** (`worker-backend-julesstudio.juleskid5102.workers.dev`) — Xử lý dữ liệu, auth, email, push notification

## Tính năng chính

### Cho khách hàng (Public)
- Landing page với hero, quy trình làm việc, contact form
- Portfolio showcase các dự án đã thực hiện
- Config Builder (wizard step-by-step) — ước tính chi phí dự án
- Theo dõi đơn hàng (Order Tracking) qua link riêng
- Đăng ký/đăng nhập xem lịch sử đơn hàng
- PWA — cài đặt như app, hoạt động offline

### Cho admin (Admin Panel)
- Dashboard thống kê (leads, projects, revenue)
- Quản lý leads (thêm, sửa, xóa, ghi chú, trạng thái)
- Quản lý projects (theo dõi tiến độ)
- Push notification (FCM) khi có đơn hàng mới — cả trong dashboard và PWA
- Intake Form — nhận dự án mới từ trong admin
- Settings — cấu hình modules, system types, contact info

## Phong cách thiết kế

**Exaggerated Minimalism** — tối giản nhưng mạnh mẽ:
- Đen trắng + accent Indigo (#6366F1)
- Typography lớn, ấn tượng (Syne + Manrope)
- Asymmetric layouts, negative space có chủ đích
- Hiệu ứng: scroll reveals, cursor follow, page transitions

## Tech Stack

| | Công nghệ |
|---|---|
| Frontend | Vite 6, React 19, Tailwind CSS v4 |
| Backend | Cloudflare Workers, Hono Framework |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Push | Firebase Cloud Messaging (FCM v1) |
| Deploy | Cloudflare Pages (2 projects) + Workers |

## Timeline dự kiến

**25 – 35 ngày**

## Trạng thái

✅ **INTAKE APPROVED** — Sẵn sàng chuyển pipeline phát triển.
