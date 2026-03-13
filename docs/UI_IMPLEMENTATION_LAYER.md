# UI Implementation Layer — Jules Studio (Public Site)

> STATUS: **UI_LOCKED** — No layout modifications allowed beyond this point.

## Design System Source

| Token | Value |
|-------|-------|
| Font (heading) | `Space Grotesk` 400/500/600/700/800 |
| Font (body) | `Manrope` 300/400/500/600 |
| Color bg | `#FFFFFF` |
| Color bg-dark | `#0A0A0A` |
| Color accent | `#6366F1` (Indigo) |
| Color text | `#0A0A0A` |
| Color text-muted | `#6B7280` |
| Color border | `#E5E7EB` |
| Border-radius | `2px` (sharp) |
| Ease | `cubic-bezier(0.16, 1, 0.3, 1)` |

## Component Map

### Layout (Shared — Consistent Across All Pages)

| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `src/components/layout/Navbar.tsx` | Floating nav with scroll-blur, Vietnamese links: Dự Án, Dịch Vụ, Báo Giá, Liên Hệ, Đăng Nhập, "Bắt Đầu Dự Án" CTA. Mobile hamburger. |
| `Footer` | `src/components/layout/Footer.tsx` | Dark `bg-bg-dark`, logo, nav links, social links (Facebook, Zalo, GitHub), copyright. |

### UI Primitives

| Component | File | Description |
|-----------|------|-------------|
| `Reveal` | `src/components/ui/Reveal.tsx` | IntersectionObserver scroll-reveal animation. `opacity: 0 → 1`, `translateY(24px → 0)`. |

### Home Page Sections

| Component | File | Description |
|-----------|------|-------------|
| `HeroSection` | `src/components/home/HeroSection.tsx` | Dark bg, oversized Syne type (clamp 3-7rem), "TRẢI NGHIỆM SỐ" in accent. |
| `ProcessSection` | `src/components/home/ProcessSection.tsx` | 4-column grid with step numbers (01-04), vertical dividers. |
| `PortfolioPreview` | `src/components/home/PortfolioPreview.tsx` | 3 project cards, grayscale→color hover, card lift on hover. |
| `ContactSection` | `src/components/home/ContactSection.tsx` | Split layout: info (left) + form (right). Full form: name, email, phone, message. API-ready. |

### Pages

| Page | File | Route | Description |
|------|------|-------|-------------|
| `Home` | `src/pages/Home.tsx` | `/` | Hero + Process + PortfolioPreview + Contact |
| `Portfolio` | `src/pages/Portfolio.tsx` | `/du-an` | Asymmetric masonry grid (60/40, 40/60, 50/50 rows), 6 projects |
| `PortfolioItem` | `src/pages/PortfolioItem.tsx` | `/du-an/:id` | Full project case study: hero image, asymmetric 60/40 description, challenge/solution, gallery, tech tags, prev/next nav |
| `ConfigBuilder` | `src/pages/ConfigBuilder.tsx` | `/bao-gia` | Multi-step wizard: system type → modules → contact → summary + live price |
| `Services` | `src/pages/Services.tsx` | `/dich-vu` | Services overview with service rows (hover effects), technology grid |
| `Login` | `src/pages/Login.tsx` | `/dang-nhap` | Split panel: dark info (left) + login form (right), Google SSO |
| `Register` | `src/pages/Register.tsx` | `/dang-ky` | Split panel: dark benefits (left) + registration form (right), Google SSO |
| `OrderTracking` | `src/pages/OrderTracking.tsx` | `/theo-doi/:token` | Public order tracker: status timeline, documents, contact |

## Signature Design Elements

1. **Oversized Typography** — Hero uses `clamp(3rem, 8vw, 7rem)` with Syne 800
2. **Grayscale → Color** — Images start grayscale, reveal color on hover
3. **Dramatic White Space** — Sections: `py-24 md:py-32`, max-width `7xl`
4. **Minimal Borders** — `border-border` only, `border-radius: 2px`
5. **Scroll Reveal** — All content fades up on scroll with expo easing
6. **No Gradients, No Shadows** — Pure flat surfaces

## Routes (Design Status)

| Route | Page | Design | Status |
|-------|------|--------|--------|
| `/` | Home | `01-homepage.html` | ✅ Designed |
| `/du-an` | Portfolio | `02-portfolio.html` | ✅ Designed |
| `/du-an/:id` | PortfolioDetail | `09-portfolio-detail.html` | ✅ Designed |
| `/bao-gia` | Config Builder | `03-config-builder.html` | ✅ Designed |
| `/dich-vu` | Services | `07-services.html` | ✅ Designed |
| `/dang-nhap` | Login | `04-customer-login.html` | ✅ Designed |
| `/dang-ky` | Register | `10-register.html` | ✅ Designed |
| `/theo-doi/:token` | Order Tracking | `08-order-tracking-a.html` | ✅ Designed |

## Admin Routes (Design Status)

| Route | Page | Design | Status |
|-------|------|--------|--------|
| `/admin` | Dashboard | `05-admin-dashboard.html` | ✅ Designed |
| `/admin/leads` | Leads | `06-admin-leads.html` | ✅ Designed |
| `/admin/projects` | Projects | `11-admin-projects.html` | ✅ Designed |
| `/admin/orders` | Orders | `12-admin-orders.html` | ✅ Designed |
| `/admin/settings` | Settings | `13-admin-settings.html` | ✅ Designed |
