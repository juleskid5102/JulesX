# Jules Studio — API Spec

## Base URL

```
https://worker-backend-julesstudio.juleskid5102.workers.dev
```

## Authentication

All protected routes require:
```
Authorization: Bearer <Firebase ID Token>
```

## Routes Overview

| Group | Prefix | Auth | Used By |
|---|---|---|---|
| Public | `/api/public` | ❌ | Public Site |
| Auth | `/api/auth` | ❌/✅ | Both |
| Customer | `/api/customer` | ✅ Customer | Public Site |
| Admin | `/api/admin` | ✅ Admin | Admin Panel |
| FCM | `/api/fcm` | ✅ Admin | Admin Panel |

---

## Public Routes

### `GET /api/public/portfolio`
Danh sách dự án showcase.

**Response:**
```json
{
  "projects": [
    {
      "id": "...",
      "name": "...",
      "description": "...",
      "thumbnail": "...",
      "tags": ["web", "ecommerce"],
      "url": "..."
    }
  ]
}
```

### `GET /api/public/settings`
Thông tin cấu hình (contact info, social links, bank info, system types, modules).

### `POST /api/public/contact`
Submit contact form → tạo lead.

**Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string",
  "message": "string (required)"
}
```

**Response:** `{ "success": true, "trackingId": "JS-A1B2" }`

### `POST /api/public/submit-project`
Submit Config Builder → tạo lead + order.

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "systemType": "string",
  "selectedModules": ["module-id-1", "module-id-2"],
  "notes": "string"
}
```

**Response:** `{ "success": true, "trackingId": "JS-X1Y2", "estimatedPrice": { "min": 10000000, "max": 15000000 } }`

### `GET /api/public/track/:token`
Tra cứu trạng thái đơn hàng bằng tracking token.

**Response:**
```json
{
  "shortId": "ORD-Z3W4",
  "status": "in-progress",
  "clientName": "...",
  "items": [...],
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Auth Routes

### `POST /api/auth/check-role`
Check role của user từ Firebase token.

**Auth:** ✅  
**Response:** `{ "role": "admin" | "customer", "uid": "..." }`

### `POST /api/auth/register`
Đăng ký customer mới (set custom claim `role: customer`).

**Body:** `{ "uid": "string", "email": "string", "displayName": "string" }`  
**Response:** `{ "success": true }`

---

## Customer Routes

### `GET /api/customer/orders`
Danh sách đơn hàng của customer đang login.

**Auth:** ✅ (customer)  
**Response:** `{ "orders": [...] }`

### `GET /api/customer/orders/:id`
Chi tiết 1 đơn hàng.

---

## Admin Routes

### Dashboard
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/stats` | Dashboard statistics (counts, revenue) |

### Leads
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/leads` | List leads (paginated, filterable) |
| `GET` | `/api/admin/leads/:id` | Lead detail |
| `PUT` | `/api/admin/leads/:id` | Update lead |
| `DELETE` | `/api/admin/leads/:id` | Delete lead |
| `POST` | `/api/admin/leads/:id/notes` | Add note to lead |

**Query params (list):** `?status=new&page=1&limit=20&sort=createdAt&order=desc`

### Projects
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/projects` | List projects |
| `GET` | `/api/admin/projects/:id` | Project detail |
| `POST` | `/api/admin/projects` | Create project |
| `PUT` | `/api/admin/projects/:id` | Update project |
| `DELETE` | `/api/admin/projects/:id` | Delete project |

### Orders
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/orders` | List orders |
| `GET` | `/api/admin/orders/:id` | Order detail |
| `POST` | `/api/admin/orders` | Create order (admin-initiated) |
| `PUT` | `/api/admin/orders/:id` | Update order |

### Settings
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/settings` | Get all settings |
| `PUT` | `/api/admin/settings/:docId` | Update settings doc |

### Intake
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/intake` | List intake projects |
| `GET` | `/api/admin/intake/:id` | Intake detail |
| `POST` | `/api/admin/intake` | Create intake |
| `PUT` | `/api/admin/intake/:id` | Update intake |

---

## FCM Routes

### `POST /api/fcm/register-device`
Register admin FCM token.

**Auth:** ✅ (admin)  
**Body:** `{ "token": "string", "userAgent": "string" }`

### `DELETE /api/fcm/unregister-device`
Remove FCM token.

**Auth:** ✅ (admin)  
**Body:** `{ "token": "string" }`

---

## Error Format

All errors return:
```json
{
  "error": true,
  "message": "Human readable error",
  "code": "ERROR_CODE"
}
```

## Pagination Format

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```
