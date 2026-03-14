# Jules Studio — DESIGN.md

## Aesthetic Direction

**Style:** Exaggerated Minimalism  
**Tone:** Confident, professional, high-end creative agency  
**Inspiration:** Locomotive.ca, Basic.agency, award-winning studio sites

### Differentiator
> "If this were screenshotted with the logo removed, the oversized typography and dramatic negative space would immediately identify it as a design studio that masters white space."

---

## Color System

### Tokens

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-alt` | `#FAFAFA` | Section alternate bg |
| `--color-bg-dark` | `#0A0A0A` | Dark sections (hero, footer) |
| `--color-text` | `#0A0A0A` | Primary text |
| `--color-text-muted` | `#6B7280` | Secondary text |
| `--color-text-inverse` | `#FFFFFF` | Text on dark bg |
| `--color-accent` | `#6366F1` | Indigo accent (links, CTAs, highlights) |
| `--color-accent-hover` | `#4F46E5` | Accent hover state |
| `--color-border` | `#E5E7EB` | Default border |
| `--color-border-dark` | `#1F2937` | Border on dark bg |

### Usage Rules
- **70% white/black** — dominant, clean canvas
- **20% grays** — muted text, borders, subtle backgrounds
- **10% indigo accent** — CTAs, links, active states only
- NO violet/cyan gradients. No glassmorphism. No color noise.

---

## Typography

### Font Stack

| Role | Font | Weight(s) | Source |
|---|---|---|---|
| Heading | **Syne** | 400, 500, 600, 700, 800 | Local woff2 (Latin-ext + Latin) |
| Heading (VN fallback) | **Space Grotesk** | 400–800 | Local woff2 — fills ồ, ề, ễ via unicode-range |
| Body | **Manrope** | 300, 400, 500, 600, 700 | Local woff2 (Vietnamese + Latin) |

> **Unicode-range fallback:** Syne lacks Vietnamese combining diacritics (U+1EA0-1EF9). Space Grotesk fills that gap under the same `font-family: 'Syne'` using `unicode-range`. Browser auto-switches per character.

### Scale (fluid clamp)

| Element | Size | Weight | Letter Spacing |
|---|---|---|---|
| Hero Heading | `clamp(3rem, 8vw, 7rem)` | 800 | `-0.03em` |
| Section Heading | `clamp(2rem, 5vw, 4rem)` | 700 | `-0.02em` |
| Card Title | `clamp(1.25rem, 2vw, 1.75rem)` | 600 | `-0.01em` |
| Body | `1rem (16px)` | 400 | `0` |
| Small / Label | `0.875rem (14px)` | 500 | `0.025em` |
| Caption | `0.75rem (12px)` | 400 | `0.05em` |

### Rules
- Line height: `1.1` for headings, `1.6` for body
- Max line width: `65ch` for paragraphs
- Headings are uppercase ONLY for labels/captions, NOT for main titles

---

## Spacing System

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `0.5rem` | 8px — tight gaps |
| `--space-sm` | `1rem` | 16px — component padding |
| `--space-md` | `2rem` | 32px — section gaps |
| `--space-lg` | `4rem` | 64px — section padding |
| `--space-xl` | `8rem` | 128px — hero/major spacing |
| `--space-2xl` | `12rem` | 192px — dramatic white space |

### Layout

- **Max width:** `max-w-7xl` (1280px) for content areas
- **Page padding:** `px-6` mobile → `px-12` desktop
- **Section padding:** `py-24` (96px) → `py-32` (128px) for dramatic breathing room
- **Asymmetric layouts:** Allowed and encouraged for visual interest

---

## Motion & Animation

### Philosophy
> Motion is sparse and high-impact. Every animation has a purpose.

### Allowed Effects

| Effect | Duration | Easing | When |
|---|---|---|---|
| Scroll reveal (fade-up) | `600ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering viewport |
| Page transition | `400ms` | `ease-out` | Route change |
| Hover: opacity | `200ms` | `ease` | Links, cards |
| Hover: translate-y | `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Cards lift `-4px` |
| Cursor follow dot | continuous | `lerp` | Optional: custom cursor on desktop |

### Forbidden
- ❌ Parallax (too common)
- ❌ Gradient animations
- ❌ Pulse/breathe loops
- ❌ Micro-animation spam
- ❌ Loading spinners in hero (use skeleton)

### `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Patterns

### Card (Project Card)

```css
.project-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  cursor: pointer;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-card__image {
  aspect-ratio: 16/10;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 400ms ease;
}

.project-card:hover .project-card__image {
  filter: grayscale(0%);
}
```

**Key:** Images are grayscale by default, reveal color on hover. This is the signature element.

### Button

```css
.btn-primary {
  background: var(--color-text);    /* Black on white */
  color: var(--color-bg);           /* White text */
  padding: 0.875rem 2rem;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 200ms ease;
}

.btn-primary:hover {
  background: var(--color-accent);  /* Indigo on hover */
}
```

### Floating Navbar

```css
.navbar {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  z-index: 50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### Admin Panel

The admin panel uses a **clean, functional** variant:
- Left sidebar: `width: 260px`, collapsible
- White background throughout
- Indigo accent for active states
- Tables use `border-y` (horizontal lines only, no vertical)
- Cards have subtle `border` only, no shadows

---

## Responsive Breakpoints

| Name | Width | Notes |
|---|---|---|
| `mobile` | `< 768px` | Single column, stacked, hamburger menu |
| `tablet` | `768px – 1024px` | 2 columns where appropriate |
| `desktop` | `> 1024px` | Full layout, sidebar visible |
| `wide` | `> 1440px` | Max-width container kicks in |

---

## Anti-Patterns (Forbidden)

| ❌ Don't | ✅ Do Instead |
|---|---|
| Glassmorphism / glass cards | Clean solid backgrounds |
| Violet/cyan gradients | Black + white + indigo accent |
| Inter / Roboto fonts | Syne + Manrope |
| Symmetrical grid layouts | Asymmetric composition |
| Emoji icons | SVG icons (Lucide) |
| Rounded everything (`rounded-2xl`) | Subtle rounding (`rounded-sm`) or sharp corners |
| Box shadows everywhere | Borders or subtle `shadow-sm` only |
| Gradient text | Solid text color |

---

## Signature Elements

1. **Grayscale → Color on hover** — Project images are B&W, reveal color on interaction
2. **Oversized typography** — Hero headings use `clamp(3rem, 8vw, 7rem)` Syne 800
3. **Dramatic white space** — `12rem+` spacing between major sections
4. **Horizontal rules** — `1px` lines as section dividers (not padding)
5. **Uppercase labels** — Small caps for categories/labels only
