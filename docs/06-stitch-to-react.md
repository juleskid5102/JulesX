---
description: Convert Stitch HTML thành React components - Tách component, extract data, đồng bộ style
---

# /stitch-to-react - Stitch → React Component Conversion

## Prerequisites
- Đã hoàn thành Phase 4a (`/dev-setup`) - project đã setup
- Có `designs/stitch.json` với screen IDs
- Có `docs/component_tree.md` từ `/architect`
- Có `docs/DESIGN.md` cho style reference

## Nguyên tắc chuyển đổi

> **KHÔNG copy-paste HTML từ Stitch!** Stitch HTML là tham khảo thiết kế, không phải code production.

| Stitch output | React component |
|---|---|
| Inline styles | Tailwind classes từ DESIGN.md |
| Hardcoded text | Props hoặc data file |
| Monolithic HTML | Tách thành component tree |
| Hardcoded images | Import hoặc URL từ data |
| Duplicate elements | Map over array |

## Bước 1: Retrieve Stitch screens

Cho mỗi screen đã được duyệt:

```
Gọi mcp_StitchMCP_get_screen:
  - projectId: [từ stitch.json]
  - screenId: [ID cần convert]
```

Download HTML endpoint để phân tích cấu trúc (KHÔNG để dùng trực tiếp).

## Bước 2: Phân tích screen → Component mapping

Nhìn vào HTML và screenshot từ Stitch, đối chiếu với `docs/component_tree.md`:

Cho mỗi screen, tạo mapping table:

```markdown
## Screen: Home

| Phần trong Stitch | Component | Props |
|---|---|---|
| Navigation bar | `Header` | links, logo |
| Hero section | `HeroSection` | title, subtitle, ctaText, bgImage |
| Feature cards | `FeatureGrid` | features[] |
| Testimonials | `TestimonialCarousel` | testimonials[] |
| Footer | `Footer` | links, socials |
```

## Bước 3: Extract design tokens

Từ Stitch HTML, extract và MAP vào Tailwind config:

| Stitch CSS | Tailwind class |
|---|---|
| `background: #2563eb` | `bg-primary` (đã config) |
| `border-radius: 12px` | `rounded-lg` |
| `font-size: 36px` | `text-4xl` |
| `padding: 24px 32px` | `py-6 px-8` |
| `box-shadow: ...` | `shadow-lg` |

## Bước 4: Extract static data

Tất cả text, URLs, danh sách trong Stitch → chuyển vào `src/data/`:

Tạo `src/data/siteData.ts`:
```typescript
export const siteConfig = {
  name: '[Tên website]',
  description: '[Mô tả]',
  logo: '/logo.svg',
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // ...
];

export const heroContent = {
  title: '[Tiêu đề từ Stitch]',
  subtitle: '[Phụ đề]',
  ctaText: '[Text nút]',
  ctaLink: '/[link]',
};

// ... tương tự cho mỗi section
```

## Bước 5: Build components

Theo thứ tự từ `component_tree.md`:

### 5.1 Shared UI components trước
```
src/components/ui/
├── Button.tsx       # Variants: primary, secondary, ghost, outline
├── Card.tsx         # Reusable card container  
├── Input.tsx        # Form input với label + error
├── Badge.tsx        # Status badges
├── Avatar.tsx       # User avatar
└── index.ts         # Barrel export
```

### 5.2 Layout components
```
src/components/layout/
├── Header.tsx       # Navigation + logo
├── Footer.tsx       # Footer links + socials
├── MainLayout.tsx   # Header + Outlet + Footer
├── Sidebar.tsx      # (nếu cần)
└── index.ts
```

### 5.3 Page-specific components
Cho mỗi page, tạo folder:
```
src/components/home/
├── HeroSection.tsx
├── FeatureGrid.tsx
└── index.ts
```

### Quy tắc component

1. **Props interface:**
```typescript
interface FeatureGridProps {
  readonly features: ReadonlyArray<{
    icon: string;
    title: string;
    description: string;
  }>;
}
```

2. **Không hardcode:**
```tsx
// ❌ SAI
<h1>Welcome to MyShop</h1>

// ✅ ĐÚNG
<h1>{title}</h1>
```

3. **Tailwind từ theme:**
```tsx
// ❌ SAI
<button className="bg-[#2563eb]">

// ✅ ĐÚNG  
<button className="bg-primary text-white rounded-md px-4 py-2">
```

## Bước 6: Assemble Pages

Tạo page components bằng cách compose shared + page-specific components:

```typescript
// src/pages/Home.tsx
import { HeroSection, FeatureGrid } from '@/components/home';
import { heroContent, features } from '@/data/siteData';

export function Home() {
  return (
    <>
      <HeroSection {...heroContent} />
      <FeatureGrid features={features} />
    </>
  );
}
```

## Bước 7: Visual Verification

So sánh output với Stitch screenshots:

1. Chạy `npm run dev`
2. Mở browser, so sánh từng page với screenshot
3. Dùng skill `ui-visual-validator` nếu cần
4. Chỉnh sửa cho match design

## Bước 8: Tích hợp Backend

Sau khi UI xong, thêm Firebase logic:

### Auth
```typescript
// src/hooks/useAuth.ts
import { auth } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
```

### Firestore CRUD
```typescript
// src/services/firestore.ts
// Tạo functions theo docs/database_schema.md
```

## Checklist

- [ ] Mọi text đều từ data file, không hardcode
- [ ] Mọi style đều dùng Tailwind theme classes
- [ ] Components có TypeScript interfaces
- [ ] Shared components dùng được across pages
- [ ] Firebase services tách riêng
- [ ] Pages compose từ components
- [ ] Visual match với Stitch screenshots

> **Khi code xong → chuyển sang Phase 5: `/qa`**
