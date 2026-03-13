---
description: Stack mặc định và logic hosting/media cho mọi dự án Jules Studio
---

# Stack Defaults — Jules Studio

> **File này là reference cố định.** Antigravity đọc file này để biết stack nào dùng cho scenario nào.
> Chỉ sửa khi thay đổi stack mặc định.

---

## Scenario A: Khách KHÔNG có hosting (mặc định — 90%)

| Layer | Công nghệ | Ghi chú |
|-------|-----------|---------|
| **Frontend** | Vite + React + TypeScript + Tailwind CSS | SPA, deploy Cloudflare Pages |
| **Backend** | Cloudflare Workers + Hono | Serverless API |
| **Auth** | Firebase Authentication | Email, Google, Phone OTP |
| **Database** | Cloud Firestore | NoSQL, realtime |
| **Notification** | Firebase Cloud Messaging (FCM) | Push notification |
| **Hosting FE** | Cloudflare Pages | `[project].pages.dev` |
| **Hosting BE** | Cloudflare Workers | `[project].workers.dev` |

### Media Handling (Scenario A)

**Lần đầu (90% trường hợp):**
```
Bạn thu thập ảnh sản phẩm từ khách
→ Worker nhận file JPG/PNG
→ Convert sang WebP (sharp hoặc wasm)
→ Lưu file vào thư mục static deploy cùng Pages
→ Lưu đường dẫn (path) vào Firestore
```

**Bổ sung sau (10% trường hợp):**
```
Khách up ảnh mới qua Admin Dashboard
→ Upload lên Cloudinary (free tier)
→ Cloudinary tự convert sang WebP
→ Lưu URL Cloudinary vào Firestore
```

> **Tại sao không dùng R2?** Cần add thẻ tín dụng. Cloudflare Pages static files + Cloudinary free tier đủ dùng.

---

## Scenario B: Khách CÓ hosting

| Layer | Thay đổi | Ghi chú |
|-------|----------|---------|
| **Frontend** | Cloudflare Pages hoặc host khách | Tùy yêu cầu |
| **Backend** | Chuyển sang host khách | Node.js (Express/Fastify) hoặc PHP |
| **Upload** | Qua host khách | Disk storage hoặc S3 |
| **Auth/DB** | Tùy đề xuất | Firebase hoặc Supabase hoặc self-hosted |

---

## Config cố định (mọi dự án)

| Hạng mục | Giá trị | Không đổi |
|----------|---------|-----------|
| Language | TypeScript | ✅ |
| Validation | Zod | ✅ |
| Router | React Router v7 | ✅ |
| State (nếu cần) | Zustand | ✅ |
| Forms | React Hook Form + Zod | ✅ |
| Loading states | Bắt buộc mọi API call | ✅ |
| Error states | Bắt buộc mọi API call | ✅ |
| SEO cơ bản | Meta tags, OG, sitemap | ✅ |
| Bảo mật cơ bản | Input validation, XSS, HTTPS | ✅ |
| Image format | WebP (convert từ JPG/PNG) | ✅ |

## Config thay đổi theo dự án

| Hạng mục | Ví dụ | Quyết định khi |
|----------|-------|---------------|
| Auth method | Email/Google/OTP/Magic Link | Intake |
| Payment gateway | VNPay/MoMo/Stripe/CK | Intake |
| Features | Tick từ 02-feature-catalog.md | Intake |
| Design style | Minimalist/Glass/Luxury/... | Design |
| Color palette | Tùy thương hiệu khách | Design |
| Font | Tùy style | Design |
| SSR/SSG | Next.js thay Vite nếu cần SEO nặng | Architect |

---

## Folder Structure mặc định

```
[project]/
├── src/
│   ├── components/
│   │   ├── ui/              # Shared UI (Button, Card, Input, Modal)
│   │   ├── layout/          # Layout (Header, Footer, Sidebar)
│   │   └── [feature]/       # Feature-specific components
│   ├── pages/               # Page components (1 file / route)
│   ├── hooks/               # Custom React hooks
│   ├── services/
│   │   ├── firebase.ts      # Firebase config & init
│   │   ├── api.ts           # API calls to Workers
│   │   └── cloudinary.ts    # Cloudinary upload (nếu cần)
│   ├── stores/              # Zustand stores
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Utility functions
│   ├── data/                # Static data, constants
│   └── styles/              # index.css (Tailwind theme)
├── backend/
│   └── src/
│       ├── index.ts         # Hono app + routes
│       ├── middleware/       # Auth, CORS, etc.
│       └── utils/           # Helpers (image convert, etc.)
├── docs/                    # Pipeline docs (MD files)
├── public/                  # Static assets
│   └── images/              # Product images (WebP)
└── wrangler.toml            # Cloudflare Workers config
```

---

## Deploy URLs Convention

```
Frontend khách:  [project].pages.dev
Frontend admin:  admin-[project].pages.dev
Backend:         backend-[project].[account].workers.dev
Custom domain:   [domain.com] → CNAME → [project].pages.dev
```
