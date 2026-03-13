---
description: Danh mục 18 nhóm tính năng — Source of truth cho Antigravity khi phân tích yêu cầu dự án
---

# Feature Catalog — Jules Studio

> **File này là source of truth.** Antigravity đọc file này mỗi lần nhận dự án mới để recommend features cho khách.
> **18 nhóm tính năng** — Chỉ sửa khi thêm/bỏ feature, KHÔNG sửa theo từng dự án.

---

## 1. Xác thực & Tài khoản (Authentication)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Email / Password | ⭐ | Login cơ bản |
| [ ] | Google Login | ⭐ | OAuth2 |
| [ ] | Facebook Login | ⭐ | OAuth2 |
| [ ] | Apple Login | ⭐⭐ | Cần Apple Developer |
| [ ] | Phone OTP (SMS) | ⭐⭐ | Firebase Auth Phone |
| [ ] | Magic Link (email) | ⭐⭐ | Passwordless |
| [ ] | Two-Factor Auth (2FA) | ⭐⭐⭐ | TOTP / SMS |
| [ ] | SSO / SAML | ⭐⭐⭐ | Enterprise |
| [ ] | Forgot Password | ⭐ | Email reset |
| [ ] | Email Verification | ⭐ | Xác nhận email |
| [ ] | Remember Me | ⭐ | Persistent session |

## 2. Quản lý User (User Management)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | User Profile (xem/sửa) | ⭐ | Tên, email, avatar |
| [ ] | Avatar Upload | ⭐ | Lưu file |
| [ ] | 2 roles: User + Admin | ⭐ | Phân quyền cơ bản |
| [ ] | Multi-role (Custom roles) | ⭐⭐ | RBAC system |
| [ ] | Team / Organization | ⭐⭐⭐ | Multi-tenant |
| [ ] | Invite Members | ⭐⭐ | Email invitation |
| [ ] | User Ban / Suspend | ⭐ | Admin action |
| [ ] | Activity Log | ⭐⭐ | Theo dõi hành động |

## 3. Nội dung & Blog (Content)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Static Pages | ⭐ | About, Contact,... |
| [ ] | Blog / Articles | ⭐⭐ | Danh sách + chi tiết |
| [ ] | Rich Text Editor | ⭐⭐ | TipTap / Quill |
| [ ] | Markdown Editor | ⭐ | MDX support |
| [ ] | Categories / Tags | ⭐ | Phân loại bài viết |
| [ ] | Media Gallery | ⭐⭐ | Upload + quản lý ảnh |
| [ ] | Draft / Publish status | ⭐ | Lưu nháp |
| [ ] | Scheduled Publishing | ⭐⭐ | Đặt lịch đăng |
| [ ] | SEO fields (meta, slug) | ⭐ | SEO cho mỗi bài |
| [ ] | Table of Contents | ⭐ | Tự sinh từ headings |
| [ ] | Reading Time | ⭐ | Ước lượng |
| [ ] | Related Posts | ⭐ | Bài liên quan |

## 4. E-commerce & Thanh toán

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Product Listing | ⭐ | Danh sách sản phẩm |
| [ ] | Product Detail | ⭐ | Ảnh, mô tả, giá |
| [ ] | Product Variants | ⭐⭐ | Size, color, etc. |
| [ ] | Shopping Cart | ⭐⭐ | Thêm/xóa/sửa |
| [ ] | Wishlist / Favorites | ⭐ | Yêu thích |
| [ ] | Checkout Flow | ⭐⭐ | Multi-step checkout |
| [ ] | Guest Checkout | ⭐ | Mua không cần đăng ký |
| [ ] | VNPay | ⭐⭐ | Thanh toán VN |
| [ ] | MoMo | ⭐⭐ | Thanh toán VN |
| [ ] | Stripe (Visa/Master) | ⭐⭐ | Thanh toán quốc tế |
| [ ] | Bank Transfer (manual) | ⭐ | Chuyển khoản + xác nhận |
| [ ] | COD (Ship thu tiền) | ⭐ | Cash on delivery |
| [ ] | Order Management | ⭐⭐ | Trạng thái đơn hàng |
| [ ] | Order Tracking | ⭐⭐ | Theo dõi vận chuyển |
| [ ] | Invoice / Receipt | ⭐⭐ | Xuất hóa đơn PDF |
| [ ] | Discount / Coupon | ⭐⭐ | Mã giảm giá |
| [ ] | Flash Sale / Timer | ⭐⭐ | Countdown khuyến mãi |
| [ ] | Inventory Management | ⭐⭐ | Quản lý tồn kho |
| [ ] | Subscription / Recurring | ⭐⭐⭐ | Thanh toán định kỳ |
| [ ] | Multi-vendor | ⭐⭐⭐ | Marketplace nhiều seller |

## 5. Tìm kiếm & Lọc (Search & Filter)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Basic Search | ⭐ | Tìm theo keyword |
| [ ] | Category Filter | ⭐ | Lọc theo danh mục |
| [ ] | Price Range Filter | ⭐ | Slider giá |
| [ ] | Multi-filter + Sort | ⭐⭐ | Kết hợp nhiều bộ lọc |
| [ ] | Autocomplete / Suggest | ⭐⭐ | Gợi ý khi gõ |
| [ ] | Full-text Search | ⭐⭐⭐ | Algolia / Meilisearch |
| [ ] | Search History | ⭐ | Lưu lịch sử tìm |
| [ ] | Voice Search | ⭐⭐⭐ | Web Speech API |

## 6. Thông báo (Notification)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | In-app Notification | ⭐ | Bell icon + dropdown |
| [ ] | Email Notification | ⭐⭐ | SendGrid / Resend |
| [ ] | Firebase Push | ⭐⭐ | FCM browser push |
| [ ] | Telegram Bot | ⭐⭐ | Gửi qua bot Telegram |
| [ ] | Zalo OA | ⭐⭐⭐ | Zalo Official Account API |
| [ ] | PWA Notification | ⭐⭐ | Service Worker push |
| [ ] | SMS (Twilio/Vonage) | ⭐⭐⭐ | Tin nhắn SMS |
| [ ] | WhatsApp | ⭐⭐⭐ | WhatsApp Business API |
| [ ] | Notification Preferences | ⭐⭐ | User tự chọn kênh |

## 7. Biểu mẫu & Nhập liệu (Forms)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Contact Form | ⭐ | Tên + email + message |
| [ ] | Multi-step Form | ⭐⭐ | Form nhiều bước |
| [ ] | File Upload | ⭐⭐ | Ảnh / tài liệu |
| [ ] | Drag & Drop Upload | ⭐⭐ | Kéo thả file |
| [ ] | Form Validation | ⭐ | Kiểm tra dữ liệu nhập |
| [ ] | CAPTCHA | ⭐ | reCAPTCHA / hCaptcha |
| [ ] | Dynamic Forms | ⭐⭐⭐ | Admin tạo form tuỳ chỉnh |
| [ ] | Survey / Quiz | ⭐⭐ | Khảo sát |
| [ ] | Rating / Review Form | ⭐⭐ | Star rating + text |

## 8. Bản đồ & Vị trí (Maps & Location)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Google Maps Embed | ⭐ | Hiển thị bản đồ |
| [ ] | Store Locator | ⭐⭐ | Tìm cửa hàng gần |
| [ ] | Address Autocomplete | ⭐⭐ | Google Places API |
| [ ] | Delivery Zone | ⭐⭐ | Khu vực giao hàng |
| [ ] | User Geolocation | ⭐⭐ | Xác định vị trí user |
| [ ] | Route / Direction | ⭐⭐ | Chỉ đường |

## 9. Social & Tương tác

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Social Share Buttons | ⭐ | Chia sẻ FB/Twitter/Zalo |
| [ ] | Like / Heart | ⭐ | Thích bài viết/sản phẩm |
| [ ] | Bookmark / Save | ⭐ | Lưu để xem sau |
| [ ] | Comments | ⭐⭐ | Bình luận dưới bài |
| [ ] | Nested Replies | ⭐⭐ | Reply comment |
| [ ] | Ratings / Reviews | ⭐⭐ | Đánh giá sao |
| [ ] | Follow / Subscribe | ⭐⭐ | Theo dõi user/topic |
| [ ] | Share via Link | ⭐ | Copy link nhanh |
| [ ] | Report / Flag | ⭐ | Báo cáo nội dung |

## 10. Realtime & Chat

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Live Chat Widget | ⭐⭐ | Chat support (Tawk.to/Tidio) |
| [ ] | In-app Chat (1:1) | ⭐⭐⭐ | Firestore realtime |
| [ ] | Group Chat | ⭐⭐⭐ | Chat nhóm |
| [ ] | Online Status | ⭐⭐ | Hiển thị online/offline |
| [ ] | Typing Indicator | ⭐⭐ | Đang nhập... |
| [ ] | Real-time Notifications | ⭐⭐ | Cập nhật không reload |
| [ ] | Real-time Dashboard | ⭐⭐⭐ | Data cập nhật live |
| [ ] | Collaborative Editing | ⭐⭐⭐ | Cùng sửa (như Google Docs) |

## 11. Xuất / Nhập dữ liệu (Import/Export)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Export CSV | ⭐ | Xuất danh sách |
| [ ] | Export Excel | ⭐⭐ | Xuất file .xlsx |
| [ ] | Export PDF | ⭐⭐ | Xuất báo cáo/hoá đơn |
| [ ] | Import CSV/Excel | ⭐⭐ | Nhập data hàng loạt |
| [ ] | Print View | ⭐ | Trang in ấn |
| [ ] | QR Code Generator | ⭐ | Tạo QR code |
| [ ] | Barcode Scanner | ⭐⭐⭐ | Camera scan barcode |

## 12. Booking & Lịch hẹn

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Calendar View | ⭐⭐ | Hiển thị lịch |
| [ ] | Booking Form | ⭐⭐ | Đặt lịch hẹn |
| [ ] | Time Slot Selection | ⭐⭐ | Chọn khung giờ |
| [ ] | Booking Confirmation | ⭐⭐ | Email xác nhận |
| [ ] | Recurring Events | ⭐⭐⭐ | Sự kiện lặp lại |
| [ ] | Google Calendar Sync | ⭐⭐⭐ | Đồng bộ GCal |
| [ ] | Availability Management | ⭐⭐ | Quản lý lịch trống |

## 13. Analytics & Báo cáo

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Google Analytics 4 | ⭐ | Tracking cơ bản |
| [ ] | Event Tracking | ⭐ | Track button clicks, etc. |
| [ ] | Facebook Pixel | ⭐ | Retargeting ads |
| [ ] | Admin Dashboard Charts | ⭐⭐ | Biểu đồ thống kê |
| [ ] | Revenue Reports | ⭐⭐ | Báo cáo doanh thu |
| [ ] | User Analytics | ⭐⭐ | Phân tích user behavior |
| [ ] | Heatmap (Hotjar/Clarity) | ⭐ | Bản đồ click |
| [ ] | A/B Testing | ⭐⭐⭐ | Thử nghiệm nhiều phiên bản |

## 14. SEO & Performance

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Meta Tags (title, desc) | ⭐ | SEO cơ bản |
| [ ] | Open Graph Tags | ⭐ | Ảnh khi share Facebook |
| [ ] | Sitemap.xml | ⭐ | Cho Google index |
| [ ] | Robots.txt | ⭐ | Kiểm soát crawler |
| [ ] | Schema Markup (JSON-LD) | ⭐⭐ | Rich snippets |
| [ ] | SSR / SSG | ⭐⭐ | Next.js (cần thay stack) |
| [ ] | Image Optimization | ⭐ | WebP, lazy load |
| [ ] | PWA (Progressive Web App) | ⭐⭐ | Offline, installable |
| [ ] | AMP Pages | ⭐⭐ | Trang tải siêu nhanh |

## 15. Bảo mật (Security)

> **Lưu ý:** Các mục ⭐ là mặc định (luôn có), không cần hỏi khách.

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [x] | HTTPS (SSL) | ⭐ | Tự động với Cloudflare |
| [x] | Input Validation | ⭐ | Zod schemas |
| [x] | XSS Protection | ⭐ | Sanitize input |
| [ ] | CSRF Protection | ⭐ | Token-based |
| [ ] | Rate Limiting | ⭐⭐ | Chống spam requests |
| [ ] | CAPTCHA | ⭐ | reCAPTCHA v3 |
| [ ] | Content Security Policy | ⭐⭐ | CSP headers |
| [ ] | Data Encryption | ⭐⭐ | Mã hóa dữ liệu nhạy cảm |
| [ ] | GDPR Compliance | ⭐⭐ | Cookie consent, privacy |
| [ ] | Audit Log | ⭐⭐ | Log mọi thay đổi |

## 16. Đa phương tiện & Media

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Image Gallery / Lightbox | ⭐ | Zoom ảnh fullscreen |
| [ ] | Video Embed (YouTube) | ⭐ | Nhúng video |
| [ ] | Video Player (tự host) | ⭐⭐ | Lưu file |
| [ ] | Audio Player | ⭐⭐ | Podcast / nhạc |
| [ ] | PDF Viewer | ⭐⭐ | Xem PDF inline |
| [ ] | 3D Viewer | ⭐⭐⭐ | Three.js model |
| [ ] | Image Editor / Crop | ⭐⭐ | Crop trước upload |
| [ ] | Carousel / Slider | ⭐ | Ảnh trượt |

## 17. Tích hợp bên thứ 3 (Integration)

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | Google Fonts | ⭐ | Font chữ |
| [ ] | Google reCAPTCHA | ⭐ | Chống bot |
| [ ] | Google Maps | ⭐ | Bản đồ |
| [ ] | Facebook SDK | ⭐ | Social login + share |
| [ ] | Zalo SDK | ⭐⭐ | Social VN |
| [ ] | Hotjar / Clarity | ⭐ | Heatmaps |
| [ ] | Sentry (Error tracking) | ⭐⭐ | Monitor lỗi production |
| [ ] | Cloudinary | ⭐⭐ | Image CDN (fallback upload) |
| [ ] | SendGrid/Resend | ⭐⭐ | Email service |
| [ ] | Shipping API (GHN/GHTK) | ⭐⭐ | Vận chuyển VN |
| [ ] | Zapier / Make | ⭐⭐ | Automation |
| [ ] | Webhook (custom) | ⭐⭐ | Event notification |
| [ ] | REST API cho 3rd party | ⭐⭐⭐ | API public |

## 18. AI & Automation

| | Tính năng | Độ phức tạp | Ghi chú |
|---|---|---|---|
| [ ] | AI Chatbot (FAQ) | ⭐⭐ | Dialogflow / OpenAI, trả lời tự động |
| [ ] | AI Chatbot (Custom) | ⭐⭐⭐ | RAG + knowledge base riêng |
| [ ] | AI Search (Semantic) | ⭐⭐⭐ | Tìm kiếm theo ý nghĩa, embeddings |
| [ ] | AI Content Generation | ⭐⭐ | Tự viết mô tả sản phẩm / blog |
| [ ] | AI Recommendation | ⭐⭐⭐ | Gợi ý sản phẩm / bài viết theo user |
| [ ] | AI Image Generation | ⭐⭐⭐ | Tạo banner, ảnh sản phẩm |
| [ ] | AI Translation | ⭐⭐ | Dịch đa ngôn ngữ tự động |
| [ ] | AI Summarization | ⭐⭐ | Tóm tắt nội dung dài |
| [ ] | AI Voice (TTS/STT) | ⭐⭐⭐ | Text-to-speech / Speech-to-text |
| [ ] | AI Sentiment Analysis | ⭐⭐⭐ | Phân tích cảm xúc review/feedback |
| [ ] | AI Auto-tag / Classify | ⭐⭐ | Tự gắn tag / phân loại nội dung |
| [ ] | AI Workflow Automation | ⭐⭐⭐ | Tự động hóa quy trình (n8n/Inngest) |

---

## Trang mặc định theo loại dự án

| Loại | Trang mặc định |
|------|---------------|
| Landing Page | Home, Contact, 404 |
| Website DN | Home, About, Contact, FAQ, Terms, 404 |
| E-commerce | Home, Products, Detail, Cart, Checkout, Login, Profile, Order History, Admin Dashboard |
| Blog | Home, Blog List, Blog Detail, About, Contact |
| Web App | Home, Login, Dashboard, Settings, 404 |
| Portfolio | Home, Gallery, About, Contact |
| Booking | Home, Calendar, Booking Form, About, Contact, Login |

---

## Mức cần thiết theo loại dự án

| # | Nhóm | Landing | Web DN | E-com | Web App | Blog |
|---|------|---------|--------|-------|---------|------|
| 1 | Auth | ❌ | ❌ | 🟢 | 🟢 | 🟡 |
| 2 | User Mgmt | ❌ | ❌ | 🟡 | 🟢 | ❌ |
| 3 | Content | ❌ | 🟡 | 🟡 | ❌ | 🟢 |
| 4 | E-commerce | ❌ | ❌ | 🟢 | ❌ | ❌ |
| 5 | Search | ❌ | ❌ | 🟢 | 🟡 | 🟡 |
| 6 | Notification | ❌ | ❌ | 🟡 | 🟢 | ❌ |
| 7 | Forms | 🟢 | 🟢 | ❌ | 🟡 | ❌ |
| 8 | Maps | ❌ | 🟡 | 🟡 | ❌ | ❌ |
| 9 | Social | ❌ | 🟡 | 🟡 | 🟡 | 🟢 |
| 10 | Realtime | ❌ | ❌ | ❌ | 🟡 | ❌ |
| 11 | Import/Export | ❌ | ❌ | 🟡 | 🟢 | ❌ |
| 12 | Booking | ❌ | ❌ | ❌ | 🟡 | ❌ |
| 13 | Analytics | 🟢 | 🟢 | 🟢 | 🟢 | 🟢 |
| 14 | SEO | 🟢 | 🟢 | 🟢 | ❌ | 🟢 |
| 15 | Security | 🟡 | 🟡 | 🟢 | 🟢 | 🟡 |
| 16 | Media | 🟡 | 🟡 | 🟢 | ❌ | 🟢 |
| 17 | Integration | 🟡 | 🟡 | 🟢 | 🟡 | 🟡 |
| 18 | AI & Automation | ❌ | ❌ | 🟡 | 🟡 | 🟡 |

> 🟢 = Chắc chắn cần | 🟡 = Tùy dự án | ❌ = Thường không cần
