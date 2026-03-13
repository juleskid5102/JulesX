---
description: Setup dự án mới — Vite + React + TypeScript + Tailwind + Cloudflare Workers + Firebase
---

# /dev-setup - Project Initialization

## Prerequisites
- Đã hoàn thành Phase 3 (`/architect`)
- Có file `docs/architecture.md`, `docs/DESIGN.md`, `docs/database_schema.md`
- Đọc `docs/03-stack-defaults.md` để biết scenario (A hoặc B)

## Bước 1: Khởi tạo Vite + React + TypeScript

// turbo
```bash
npx -y create-vite@latest ./ --template react-ts
```

// turbo
```bash
npm install
```

## Bước 2: Cài đặt dependencies

// turbo
### Core dependencies
```bash
npm install react-router-dom firebase zustand react-hook-form @hookform/resolvers zod
```

// turbo
### Dev dependencies
```bash
npm install -D @tailwindcss/vite tailwindcss @types/node
```

## Bước 3: Cấu hình Tailwind từ DESIGN.md

Đọc `docs/DESIGN.md` để lấy color palette, typography, spacing.

Cập nhật `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

Tạo `src/styles/index.css`:
```css
@import "tailwindcss";

@theme {
  /* Colors từ DESIGN.md */
  --color-primary: #[hex từ DESIGN.md];
  --color-secondary: #[hex từ DESIGN.md];
  --color-accent: #[hex từ DESIGN.md];
  --color-background: #[hex từ DESIGN.md];
  --color-surface: #[hex từ DESIGN.md];
  --color-text-primary: #[hex từ DESIGN.md];
  --color-text-secondary: #[hex từ DESIGN.md];

  /* Typography từ DESIGN.md */
  --font-heading: '[Font name]', sans-serif;
  --font-body: '[Font name]', sans-serif;

  /* Spacing & Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

## Bước 4: Setup Firebase

Tạo `src/services/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Tạo `.env.local`:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:8787
```

## Bước 5: Setup Cloudflare Workers (Backend)

### 5.1 Tạo backend folder

// turbo
```bash
mkdir -p backend/src
```

### 5.2 Init Workers project

Tạo `backend/package.json`:
```json
{
  "name": "backend",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "dependencies": {
    "hono": "^4.0.0"
  },
  "devDependencies": {
    "wrangler": "^3.0.0",
    "@cloudflare/workers-types": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

// turbo
```bash
cd backend && npm install && cd ..
```

### 5.3 Tạo Workers entry point

Tạo `backend/src/index.ts`:
```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Env = {
  FIREBASE_SERVICE_ACCOUNT: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: ['http://localhost:5173', 'https://[project].pages.dev'],
}));

app.get('/health', (c) => c.json({ status: 'ok' }));

// Add routes from docs/api_spec.md

export default app;
```

### 5.4 Tạo wrangler.toml

```toml
name = "backend-[project]"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
ENVIRONMENT = "development"
```

## Bước 6: Image Converter Utility

Tạo `backend/src/utils/image-converter.ts`:
```typescript
// Logic: Nhận file JPG/PNG → convert sang WebP
// Dùng cho Worker xử lý ảnh sản phẩm

export async function convertToWebP(
  imageBuffer: ArrayBuffer,
  quality: number = 80
): Promise<ArrayBuffer> {
  // Sử dụng Cloudflare Image Resizing hoặc wasm-based converter
  // Trả về WebP buffer
  // Lưu path vào Firestore
}

export function generateImagePath(
  projectId: string,
  filename: string
): string {
  const name = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  return `/images/${projectId}/${name}`;
}
```

## Bước 7: Tạo Folder Structure

// turbo
```bash
mkdir -p src/components/ui src/components/layout src/pages src/hooks src/services src/stores src/types src/utils src/data public/images
```

## Bước 8: Setup Router

Tạo `src/App.tsx` với routing cơ bản dựa trên `docs/sitemap.md`:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
// Import pages...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* Thêm routes từ sitemap.md */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## Bước 9: Tạo Base Components

Tạo shared UI components cơ bản từ DESIGN.md:
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Input.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MainLayout.tsx`

## Bước 10: Setup Firebase Security Rules

Tạo `firebase/firestore.rules` dựa trên `docs/database_schema.md`:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Rules từ database_schema.md
  }
}
```

## Bước 11: Verify Setup

// turbo
```bash
npm run dev
```

Mở terminal thứ 2 cho backend:
// turbo
```bash
cd backend && npm run dev
```

Kiểm tra:
- [ ] Frontend chạy được trên localhost:5173
- [ ] Backend chạy được trên localhost:8787
- [ ] Tailwind hoạt động (test 1 class)
- [ ] Firebase import không lỗi
- [ ] Router hoạt động
- [ ] API call từ frontend → backend hoạt động
- [ ] Folder structure đúng

> **Setup xong → chuyển sang convert Stitch designs: `/stitch-to-react`**

## Skills sử dụng

| Bước | Skill |
|------|-------|
| Bước 1-2: Init Vite + deps | `frontend-developer` |
| Bước 3: Tailwind config | `tailwind-patterns`, `frontend-design` |
| Bước 4: Firebase setup | `firebase` |
| Bước 5: Workers + Hono | `backend-patterns`, `nodejs-best-practices` |
| Bước 8: Router | `react-patterns` |
| Bước 9: Base components | `core-components`, `react-ui-patterns` |
| Bước 10: Security rules | `firebase`, `security-review` |

