# Design System: Jules Studio — "The Product Gallery"

## 1. Overview & Creative North Star

**"The Product Gallery"** — Homepage = vertical scroll of product sections, each showcasing ONE client website. Like Apple.com presents iPhone → MacBook → iPad, we present Project 1 → Project 2 → Project 3.

**Layout: Header → Product 1 → Product 2 → ... → Footer**

## 2. Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Page Background | `#f5f5f7` | NOT white — slight blue-gray sophistication |
| Surface/Cards | `#ffffff` | Elevated containers, device frames |
| Text Primary | `#1d1d1f` | Headlines, body text |
| Text Secondary | `rgba(0,0,0,0.6)` | Descriptions, subtitles |
| Text Tertiary | `rgba(0,0,0,0.4)` | Labels, metadata |
| **Studio Indigo** | `#5048e5` | ONLY accent — CTAs, active states, highlights |
| Indigo Hover | `#4338ca` | Hover state |
| Indigo Light | `rgba(80,72,229,0.08)` | Tags, chips |
| Footer Dark | `#1d1d1f` | Footer background |

**Single Accent Rule**: Indigo is the ONLY chromatic color. No additional accents.
**No-Line Rule**: No 1px borders for sectioning. Use background shifts + whitespace.

## 3. Typography

- **Headlines**: `Syne` (geometric) + `Space Grotesk` Vietnamese fallback — weight 700, line-height 1.05-1.10, letter-spacing -0.02em
- **Body**: `Inter` — weight 400, line-height ≥1.5 (Vietnamese diacritics)
- **Labels**: `Inter` ALL-CAPS, weight 600, tracking 0.2-0.3em, 0.75rem

## 4. Components

### Navigation (Glass Light)
- `rgba(255,255,255,0.8)` + `backdrop-filter: saturate(180%) blur(20px)`
- Logo left, links center, CTA pill right
- Active: indigo pill, white text

### Product Hero Module (repeating)
1. Label: ALL-CAPS, indigo 70%, wide tracking
2. Title: Syne 3-4rem, weight 700
3. Descriptor: Inter, 60% opacity
4. Two pill CTAs: filled + outline
5. Device mockup with real screenshots

### Buttons
- Primary: pill (980px radius), `#5048e5`, white text
- Secondary: pill outline, transparent bg

### Footer
- Dark bg `#1d1d1f`, white logo, light text

## 5. Spacing
- Section padding: 128px vertical
- Content max-width: 1200px
- Base unit: 8px

## 6. Elevation
- Shadows rare — use tonal contrast
- Device shadow: `rgba(0,0,0,0.12) 0 8px 40px`
- Glass nav: `saturate(180%) blur(20px)`

## 7. Do's & Don'ts

**Do**: product gallery layout, `#f5f5f7` bg, indigo-only accent, pill CTAs, glass nav, real screenshots, Vietnamese line-height ≥1.5

**Don't**: About/Process/Why sections, extra accent colors, borders, textures/gradients, placeholder images, body line-height <1.5
