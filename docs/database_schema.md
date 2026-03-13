# Jules Studio — Database Schema (Firestore)

## Collections Overview

```
jules-studio (Firestore)
├── users/               ← Firebase Auth users + profile
├── leads/               ← Contact form submissions
├── projects/            ← Client projects
├── orders/              ← Customer orders
├── settings/            ← System config (singleton docs)
├── intake_projects/     ← Intake workflow data
├── admin_devices/       ← FCM device tokens for admin push
└── notifications/       ← In-app notification log
```

---

## users

> Synced with Firebase Auth. Custom profile + role.

| Field | Type | Required | Notes |
|---|---|---|---|
| `uid` | string | ✅ | Firebase Auth UID (= doc ID) |
| `email` | string | ✅ | Email |
| `displayName` | string | ✅ | Tên hiển thị |
| `role` | string | ✅ | `admin` \| `customer` |
| `phone` | string | — | SĐT |
| `avatar` | string | — | URL ảnh |
| `createdAt` | timestamp | ✅ | |
| `updatedAt` | timestamp | ✅ | |

**Security:** Admin-only write for `role` field.

---

## leads

> Contact form submissions + Config Builder submissions.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | ✅ | Auto-generated (doc ID) |
| `shortId` | string | ✅ | 6-char tracking code (e.g. `JS-A1B2`) |
| `name` | string | ✅ | Tên khách |
| `email` | string | ✅ | Email |
| `phone` | string | — | SĐT |
| `message` | string | — | Nội dung tin nhắn |
| `source` | string | ✅ | `contact-form` \| `config-builder` |
| `status` | string | ✅ | `new` \| `contacted` \| `in-progress` \| `completed` \| `cancelled` |
| `configData` | map | — | Config Builder selections (nếu source = config-builder) |
| `estimatedPrice` | map | — | `{min, max}` ước tính từ configurator |
| `notes` | array | — | Admin notes `[{text, createdAt, authorId}]` |
| `attachments` | array | — | File URLs |
| `assignedTo` | string | — | Admin UID |
| `customerId` | string | — | Link to users (nếu khách đã đăng ký) |
| `createdAt` | timestamp | ✅ | |
| `updatedAt` | timestamp | ✅ | |

**Indexes:** `status` + `createdAt` DESC, `customerId`.

---

## projects

> Dự án đang thực hiện.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | ✅ | Doc ID |
| `shortId` | string | ✅ | 6-char (e.g. `PRJ-X1Y2`) |
| `name` | string | ✅ | Tên dự án |
| `clientName` | string | ✅ | |
| `clientEmail` | string | ✅ | |
| `clientPhone` | string | — | |
| `description` | string | — | Mô tả |
| `status` | string | ✅ | `draft` \| `in-progress` \| `review` \| `completed` \| `cancelled` |
| `progress` | number | ✅ | 0-100 (%) |
| `projectType` | string | — | Loại dự án |
| `features` | array | — | Danh sách features đã chốt |
| `timeline` | map | — | `{startDate, endDate, estimatedDays}` |
| `price` | map | — | `{amount, currency, status}` |
| `leadId` | string | — | Link to leads |
| `customerId` | string | — | Link to users |
| `createdAt` | timestamp | ✅ | |
| `updatedAt` | timestamp | ✅ | |

---

## orders

> Đơn hàng từ Config Builder hoặc admin tạo.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | ✅ | Doc ID |
| `shortId` | string | ✅ | 6-char (e.g. `ORD-Z3W4`) |
| `trackingToken` | string | ✅ | Public tracking URL token |
| `clientName` | string | ✅ | |
| `clientEmail` | string | ✅ | |
| `clientPhone` | string | — | |
| `items` | array | ✅ | `[{name, description, quantity, price}]` |
| `totalAmount` | number | ✅ | Tổng tiền |
| `status` | string | ✅ | `pending` \| `confirmed` \| `in-progress` \| `completed` \| `cancelled` |
| `paymentStatus` | string | ✅ | `unpaid` \| `partial` \| `paid` |
| `notes` | array | — | Admin notes |
| `customerId` | string | — | Link to users |
| `projectId` | string | — | Link to projects |
| `createdAt` | timestamp | ✅ | |
| `updatedAt` | timestamp | ✅ | |

---

## settings

> Singleton documents cho system config.

### `settings/general`

| Field | Type | Notes |
|---|---|---|
| `companyName` | string | Jules Studio |
| `email` | string | Contact email |
| `phone` | string | SĐT |
| `address` | string | Địa chỉ |
| `socialLinks` | map | `{facebook, zalo, github}` |
| `bankInfo` | map | `{bankName, accountNumber, accountName, qrCodeUrl}` |

### `settings/config`

| Field | Type | Notes |
|---|---|---|
| `systemTypes` | array | `[{id, name, description}]` |
| `modules` | array | `[{id, name, category, minDays, maxDays, price}]` |
| `pricePerDay` | number | Đơn giá / ngày |
| `safetyFactor` | number | Hệ số an toàn (e.g. 1.2) |

---

## admin_devices

> FCM device tokens cho push notification.

| Field | Type | Notes |
|---|---|---|
| `uid` | string | Admin UID (= doc ID) |
| `tokens` | array | `[{token, userAgent, createdAt}]` |
| `updatedAt` | timestamp | |

---

## notifications

> In-app notification log cho admin dashboard.

| Field | Type | Notes |
|---|---|---|
| `id` | string | Doc ID |
| `type` | string | `new-lead` \| `new-order` \| `order-update` |
| `title` | string | Notification title |
| `body` | string | Notification body |
| `data` | map | `{entityId, entityType, link}` |
| `read` | boolean | Đã đọc chưa |
| `recipientId` | string | Admin UID |
| `createdAt` | timestamp | |

**Indexes:** `recipientId` + `read` + `createdAt` DESC.

---

## intake_projects

> *(Already defined in intake workflow — see Giai đoạn 3)*  
> Doc ID: `jules-studio-rebuild` (current project).

---

## Security Rules Summary

| Collection | Read | Write |
|---|---|---|
| `users` | Own doc only | Own doc (except `role`) |
| `leads` | Admin only | Admin only (public create via API) |
| `projects` | Admin + linked customer | Admin only |
| `orders` | Admin + linked customer | Admin only (public create via API) |
| `settings` | Public (read) | Admin only |
| `admin_devices` | Admin only | Admin only |
| `notifications` | Admin only | System (API) |
| `intake_projects` | Admin only | System (API) |

> **Note:** All public write operations go through the Worker API (which uses the service account), NOT direct Firestore client writes. This ensures validation + business logic.
