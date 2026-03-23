# Jules Studio — Database Schema (Firestore)

> Đọc [how-it-works.md](how-it-works.md) trước để hiểu business context.

## Collections

```
jules-studio (Firestore)
├── leads/               ← Yêu cầu từ khách (contact + ConfigBuilder)
├── projects/            ← Dự án (tiến độ + thanh toán + portfolio)
├── users/               ← Firebase Auth users + profile
├── estimator_config/    ← Reference data (features, styles, web types, pricing)
├── site_settings/       ← Cấu hình site (hero, contact, social, FAB)
├── admin_devices/       ← FCM device tokens
└── notifications/       ← In-app notification log
```

---

## leads

> **Tất cả yêu cầu từ khách** — gộp Contact Form + ConfigBuilder.  
> Contact form: khách gửi message → admin bổ sung sau.  
> ConfigBuilder: khách chọn đầy đủ → admin review/sửa.  
> Admin là người quyết định cuối cùng.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | ✅ | Auto doc ID |
| `name` | string | ✅ | Tên khách |
| `email` | string | ✅ | Email |
| `phone` | string | — | SĐT |
| `company` | string | — | Công ty |
| `projectName` | string | — | Tên dự án khách muốn |
| `message` | string | — | Mô tả / ghi chú |
| `webTypeKey` | string | — | `"doanhnghiep"` — lookup tên từ estimator_config. null nếu contact form |
| `design` | map | — | `{ styleIds: ["glassmorphism", ...], note: "Tông pastel" }`. null nếu contact form |
| `features` | array | — | `[{id, name, cat, coeff}]` — snapshot. `[]` nếu contact form |
| `package` | string | — | `"basic"` \| `"standard"` \| `"advanced"`. null nếu contact form |
| `pricing` | map | — | `{ hours, days, price, coefficient, dailyRate }` — snapshot tại thời điểm gửi. null nếu contact form |
| `source` | string | ✅ | `"contact-form"` \| `"config-builder"` |
| `status` | string | ✅ | `"new"` → `"contacted"` → `"converted"` → `"cancelled"` |
| `customerId` | string | — | Link → users (nếu khách đã đăng ký) |
| `configVersion` | string | — | `"1.0"` — version estimator_config tại thời điểm tạo |
| `updatedBy` | string | — | UID admin đã sửa cuối |
| `history` | array | — | `[{ at, action, by, note }]` — log thay đổi |
| `createdAt` | string | ✅ | ISO timestamp |
| `updatedAt` | string | — | ISO timestamp |

**Indexes:** `status` + `createdAt` DESC, `customerId`, `email`

---

## projects

> **Dự án = tiến độ + thanh toán + portfolio.**  
> Tạo khi admin convert lead.  
> Lifecycle: `confirmed` → `in-progress` → `review` → `completed` → `published`.  
>  
> ⚠️ **Snapshot pattern:** Khi convert lead → copy data vào project. Sau đó project **độc lập** — lead sửa không ảnh hưởng project.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | ✅ | Auto doc ID |
| `leadId` | string | — | Link → leads (null cho demo projects). Chỉ để tra history, KHÔNG đọc data từ đây |
| `shortId` | string | ✅ | `"PRJ-X1Y2"` — tracking code |
| `trackingToken` | string | ✅ | Public tracking URL token |
| `slug` | string | — | URL-safe ID cho portfolio |
| `title` | string | ✅ | Tên dự án (admin đặt) |
| | | | |
| **Snapshot từ lead** *(copy lúc convert, không thay đổi theo lead)* | | | |
| `client` | map | ✅ | `{ name, email, phone, company }` |
| `webTypeKey` | string | — | `"doanhnghiep"` |
| `design` | map | — | `{ styleIds: [...], note: "..." }` |
| `features` | array | — | `[{id, name, cat, coeff}]` |
| `pricing` | map | — | `{ hours, days, price, coefficient, dailyRate }` |
| | | | |
| **Progress** | | | |
| `status` | string | ✅ | `"confirmed"` → `"in-progress"` → `"review"` → `"completed"` → `"published"` |
| `progress` | number | — | 0–100 (%) |
| | | | |
| **Payment** | | | |
| `payment` | map | — | Xem chi tiết bên dưới |
| | | | |
| **Portfolio** *(chỉ điền khi status = published)* | | | |
| `category` | string | — | `"Hospitality"` — lĩnh vực (admin gán) |
| `completedAt` | string | — | `"03/2026"` — tháng/năm hoàn thành |
| `duration` | string | — | `"8 tuần"` — thời gian thực tế |
| `image` | string | — | Hero/thumbnail URL |
| `gallery` | array | — | `[url, ...]` |
| `challenge` | string | — | Thách thức |
| `solution` | string | — | Giải pháp |
| `overview` | string | — | Mô tả chi tiết |
| `stack` | string | — | `"React, Hono, Firestore"` |
| `techTags` | array | — | `["React", "Hono", ...]` |
| `lighthouse` | string | — | `"98"` — performance score |
| `liveUrl` | string | — | Production URL |
| `featured` | boolean | — | Hiện ở trang chủ |
| `order` | number | — | Thứ tự sắp xếp |
| | | | |
| **Meta** | | | |
| `customerId` | string | — | Link → users |
| `configVersion` | string | — | `"1.0"` — version config tại thời điểm convert |
| `updatedBy` | string | — | UID admin đã sửa cuối |
| `history` | array | — | `[{ at, action, by, note }]` |
| `createdAt` | string | ✅ | ISO timestamp |
| `updatedAt` | string | — | ISO timestamp |

### Payment map chi tiết

```javascript
payment: {
  model: "one-time",              // "one-time" | "hybrid" (mở rộng sau)

  // Build payment (trả 1 lần)
  totalAmount: 15000000,          // tổng tiền chốt
  deposit: {
    amount: 6000000,              // 40%
    status: "paid",               // "unpaid" | "paid"
    paidAt: "2026-03-01"
  },
  final: {
    amount: 9000000,              // 60%
    status: "unpaid",
    paidAt: null
  }
}
```

**Indexes:** `status`, `trackingToken`, `customerId`, `leadId`

---

## users

> Synced với Firebase Auth. Profile + role.

| Field | Type | Required | Notes |
|---|---|---|---|
| `uid` | string | ✅ | Firebase Auth UID (= doc ID) |
| `email` | string | ✅ | Email |
| `displayName` | string | ✅ | Tên hiển thị |
| `role` | string | ✅ | `"admin"` \| `"customer"` |
| `phone` | string | — | SĐT |
| `avatar` | string | — | URL ảnh |
| `createdAt` | string | ✅ | ISO timestamp |
| `updatedAt` | string | — | ISO timestamp |

---

## estimator_config/main

> **Source of truth** cho features, styles, web types, pricing.  
> Seed từ `quotation-data.mjs` → `seed-estimator.mjs`.  
> Dùng bởi: ConfigBuilder, Admin, Quotation Excel, Portfolio Detail.

| Field | Type | Notes |
|---|---|---|
| `webTypes` | array | `[{key, name, icon, description, color}]` — 7 loại web |
| `designStyles` | array | `[{id, name, desc, icon, group, order}]` — 24 phong cách |
| `styleGroups` | array | `[{key, label, order}]` — 4 nhóm |
| `features` | array | `[{id, name, cat, catLabel, catIcon, coeff, note, priorities, order}]` — 63 tính năng |
| `categories` | array | `[{key, label, icon, order}]` — 9 danh mục |
| `pricing` | map | `{coefficient: 1.5, dailyRate: 1000000, deposit: 0.4}` |
| `priceRef` | array | `[{type, price, time, note}]` — 7 mức giá tham khảo |
| `version` | string | `"1.0"` — tăng khi thay đổi features/pricing |
| `updatedAt` | string | ISO timestamp |

---

## site_settings/main

| Field | Type | Notes |
|---|---|---|
| `heroTitle` | string | Hero heading |
| `heroSubtitle` | string | Hero subtitle |
| `email` | string | Contact email |
| `phone` | string | SĐT |
| `address` | string | Địa chỉ |
| `social` | map | `{dribbble, behance, linkedin, zalo, messenger}` |
| `fabChannels` | array | `[{name, icon, url, color}]` |
| `updatedAt` | string | ISO timestamp |

---

## admin_devices

| Field | Type | Notes |
|---|---|---|
| `uid` | string | Admin UID (= doc ID) |
| `tokens` | array | `[{token, userAgent, createdAt}]` |
| `updatedAt` | string | ISO timestamp |

---

## notifications

| Field | Type | Notes |
|---|---|---|
| `id` | string | Doc ID |
| `type` | string | `"new-lead"` \| `"project-update"` |
| `title` | string | Notification title |
| `body` | string | Notification body |
| `data` | map | `{entityId, entityType, link}` |
| `read` | boolean | Đã đọc chưa |
| `recipientId` | string | Admin UID |
| `createdAt` | string | ISO timestamp |

---

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Mọi write đều qua Worker API (service account → bypass rules)
    // Rules chỉ chặn truy cập trực tiếp từ client SDK

    match /estimator_config/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /site_settings/{doc} {
      allow read: if true;
      allow write: if false;
    }

    match /projects/{doc} {
      allow read: if resource.data.status == 'published';
      allow write: if false;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Data Flow

```
╔═══════════════════╗     ╔══════════════════╗     ╔═════════════════╗
║ quotation-data.mjs║     ║ ConfigBuilder    ║     ║ Portfolio Detail ║
║ (source of truth) ║     ║ (5-step wizard)  ║     ║ (case study)    ║
╚════════╤══════════╝     ╚════════╤═════════╝     ╚════════╤════════╝
         │ seed                    │ fetch+submit            │ fetch
         ▼                        ▼                         ▼
╔═══════════════════╗     ╔══════════════════╗  snapshot  ╔═════════════════╗
║ estimator_config  ║────▶║ leads            ║──────────▶║ projects        ║
║ (Firestore)       ║     ║ (Firestore)      ║  convert  ║ (Firestore)     ║
║                   ║     ║                  ║           ║                 ║
║ • 63 features     ║     ║ • client info    ║           ║ • snapshot data ║
║ • 24 styles       ║     ║ • features[]     ║           ║ • progress      ║
║ • 7 web types     ║     ║ • design{}       ║           ║ • payment{}     ║
║ • pricing config  ║     ║ • pricing{}      ║           ║ • portfolio{}   ║
║ • version: "1.0"  ║     ║ • history[]      ║           ║ • history[]     ║
╚═══════════════════╝     ╚══════════════════╝           ╚═════════════════╝
```
