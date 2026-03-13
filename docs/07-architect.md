---
description: Lên kiến trúc dự án - Tech stack, database schema, API design, component tree
---

# /architect - Architecture Planning

## Prerequisites
- Đã hoàn thành Phase 2 (`/design`)
- Có file `docs/DESIGN.md`, `docs/requirements.md`, `docs/sitemap.md`
- Đọc `docs/03-stack-defaults.md` để biết stack mặc định

## Bước 1: Phân tích yêu cầu kỹ thuật

Đọc các file:
- `docs/requirements.md` - Chức năng cần build
- `docs/sitemap.md` - Các pages
- `docs/DESIGN.md` - Design system

Phân loại chức năng thành:
- **Static**: Chỉ hiển thị (không cần backend)
- **Dynamic**: Cần đọc/ghi data (cần database)
- **Auth**: Cần authentication
- **Realtime**: Cần cập nhật realtime
- **Upload**: Cần file upload

## Bước 2: Chọn Tech Stack

### Frontend (Mặc định)
```
Framework:  Vite + React 19 + TypeScript
Styling:    Tailwind CSS (config từ DESIGN.md)
Routing:    React Router v7
State:      Zustand (nếu cần global state)
Forms:      React Hook Form + Zod validation
Hosting:    Cloudflare Pages
```

### Backend (Mặc định - Scenario A: Không có host)
```
API:        Cloudflare Workers + Hono
Auth:       Firebase Authentication
Database:   Cloud Firestore
Media:      Static files trên Pages (WebP) + Cloudinary fallback
Push:       Firebase Cloud Messaging (FCM)
```

### Backend (Scenario B: Khách có host)
```
API:        Node.js trên host khách (Express/Fastify)
Upload:     Qua host khách
Auth/DB:    Tùy đề xuất (Firebase hoặc Supabase)
```

> **Chi tiết stack:** xem `docs/03-stack-defaults.md`

### Điều chỉnh stack nếu cần
| Nếu dự án cần... | Thay đổi |
|---|---|
| SEO quan trọng | Dùng Next.js thay Vite |
| Chỉ landing page | Vite vanilla (không React) |
| Realtime chat | Thêm Firebase Realtime DB |
| Payment | Thêm VNPay/MoMo/Stripe integration |
| Email | Thêm SendGrid/Resend |
| Khách có host | Chuyển sang Scenario B |

Ghi quyết định vào `docs/architecture.md`.

## Bước 3: Thiết kế Database Schema

Dựa trên requirements, thiết kế Firestore collections:

Tạo file `docs/database_schema.md`:

```markdown
# Database Schema: [Tên dự án]

## Collections

### users
```json
{
  "uid": "string (Firebase Auth UID)",
  "displayName": "string",
  "email": "string",
  "role": "string (user | admin)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
Indexes: [email]

### [collection_name]
```json
{
  "field": "type (mô tả)",
  ...
}
```

## Security Rules Summary
- users: chỉ owner đọc/ghi profile mình
- [collection]: [rule mô tả]
```

**Lưu ý quan trọng:**
- Firestore là NoSQL → denormalize khi cần
- Tránh nested subcollections quá sâu (max 2 cấp)
- Luôn có `createdAt`, `updatedAt`
- Luôn plan security rules ngay từ đầu

## Bước 4: Thiết kế API Structure

Nếu dùng Cloud Functions, tạo `docs/api_spec.md`:

```markdown
# API Spec: [Tên dự án]

## Firebase Cloud Functions

### POST /api/[action]
- **Trigger:** HTTP callable
- **Auth:** Required
- **Input:** { field1, field2 }
- **Output:** { success, data }
- **Logic:** [Mô tả]

## Client-side Firestore Operations
### [Feature] 
- **Read:** `collection('items').where('userId', '==', uid)`
- **Write:** `collection('items').add({...})`
- **Delete:** `collection('items').doc(id).delete()`
```

## Bước 5: Thiết kế Component Tree

Phân tích Stitch screens → xác định components:

Tạo file `docs/component_tree.md`:

```markdown
# Component Tree: [Tên dự án]

## Shared Components (dùng chung mọi page)
- `Header` - Navigation bar
- `Footer` - Footer links
- `Button` - Primary, secondary, ghost variants
- `Card` - Content card
- `Input` - Form input field
- `Modal` - Dialog overlay
- `LoadingSpinner` - Loading state
- `ErrorMessage` - Error display

## Page Components
### Home
- `HeroSection`
- `FeatureGrid`
- `TestimonialCarousel`
- `CTASection`

### [Page Name]
- `[Component]`
...

## Layout Components
- `MainLayout` (Header + content + Footer)
- `AuthLayout` (cho login/register pages)
- `DashboardLayout` (sidebar + content)
```

**Quy tắc:**
- Component xuất hiện ≥2 pages → shared component
- Data không hardcode trong component → truyền qua props
- Style tuân theo DESIGN.md → Tailwind theme config

## Bước 6: Định nghĩa Folder Structure

Tạo folder structure vào `docs/architecture.md`:

```markdown
## Project Structure

src/
├── components/
│   ├── ui/              # Shared UI (Button, Card, Input, Modal)
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── [feature]/       # Feature-specific components
├── pages/               # Page components (1 file per route)
├── hooks/               # Custom React hooks
├── services/            # Firebase service layer
│   ├── firebase.ts      # Firebase config & init
│   ├── auth.ts          # Auth functions
│   ├── firestore.ts     # Firestore CRUD helpers
│   └── storage.ts       # Storage upload helpers
├── stores/              # Zustand stores (nếu cần)
├── types/               # TypeScript interfaces
├── utils/               # Utility functions
├── data/                # Static data, constants
├── styles/              # Global styles, Tailwind config
└── App.tsx              # Root + Router
```

## Bước 7: Review Architecture

Trước khi code, review lại:
- [ ] Tech stack phù hợp với requirements?
- [ ] Database schema cover hết chức năng?
- [ ] Security rules đã plan?
- [ ] Component tree cover hết Stitch screens?
- [ ] Không có component nào bị duplicate?

> **Khi architecture được confirm → chuyển sang Phase 4: `/dev-setup`**

## Skills sử dụng

| Bước | Skill |
|------|-------|
| Bước 1-2: Phân tích + chọn stack | `senior-architect`, `architecture` |
| Bước 3: Database schema | `database-design`, `firebase` |
| Bước 4: API design | `api-design-principles` |
| Bước 5-6: Component tree + folder | `frontend-developer`, `react-patterns` |
| Bước 7: Review architecture | `architect-review` |

