# Design System Strategy: The Curated Void

## 1. Overview & Creative North Star
This design system is built upon the concept of **"The Curated Void."** In high-end editorial design, what you leave out is more important than what you put in. We are moving away from the "app" look—characterized by rounded corners, soft shadows, and contained modules—and moving toward a "gallery" look. 

The North Star of this system is **Architectural Silence**. We use massive negative space as a structural element rather than a lack of content. Layouts should feel intentional, sharp, and uncompromising. By stripping away traditional UI crutches like borders and shadows, we force the user to focus entirely on the typography and the portfolio imagery. The design does not "hold" the content; the content *is* the design.

---

## 2. Colors
The palette is a high-contrast study in monochrome. We utilize the depth of pure white and the authority of near-black to create a premium, museum-grade experience.

### The "No-Line" Rule
Traditional sectioning (1px borders) is strictly prohibited. Boundaries between content sections must be defined by:
1.  **Vast Vertical Space:** Using the Spacing Scale to separate ideas.
2.  **Tonal Shifts:** Transitioning from `surface` (#F9F9F9) to `surface-container-low` (#F3F3F4).
3.  **Edge-to-Edge Imagery:** Using full-bleed media to break the flow.

### Surface Hierarchy & Nesting
Even in a flat system, hierarchy is essential. We use the `surface-container` tokens to create "zones" of focus:
*   **Surface (#F9F9F9):** The default canvas.
*   **Surface-Container-Lowest (#FFFFFF):** Used for primary content focal points or "hero" zones to create a subtle, natural brightness without shadows.
*   **Surface-Container-High (#E8E8E8):** Used for utility areas like footer backgrounds or navigation overlays.

### Signature Texture
While the palette is flat, we introduce "soul" through subtle opacity. For secondary information or labels, use `on_surface_variant` (#474747) at 80% opacity to let the white background breathe through the type, softening the harshness of the near-black.

---

## 3. Typography
Typography is the primary visual driver of this design system. It is used as an architectural element to anchor the page.

*   **Display & Headlines (Epilogue):** Set at 120px+ with a weight of 800. These are not just titles; they are the "pillars" of the layout. Kerning should be slightly tightened (-2% to -4%) to create a dense, monolithic block of text.
*   **Body (Inter):** A clean, neutral sans-serif. It acts as the "connective tissue." Use generous line-height (1.6 or 1.8) to maintain the feeling of airiness.
*   **Labels (Inter):** Small, all-caps, with wide letter spacing (+10% to +15%). This creates a technical, curated feel, similar to captions in an art gallery.

---

## 4. Elevation & Depth
In this design system, "Elevation" is a misnomer. We do not elevate; we **layer**.

### The Layering Principle
Depth is achieved through the stacking of flat planes. 
*   **The Flat Stack:** A text element (`on_surface`) sitting directly on a `surface` background has 0px of elevation but 100% clarity.
*   **Ambient Presence:** If a floating element (like a mobile menu) is required, do not use a drop shadow. Use a **Glassmorphism** effect: `surface` color at 70% opacity with a `40px` backdrop blur. This maintains the "sharp" aesthetic while providing functional separation.
*   **The Ghost Border:** If a form field or button requires a container for accessibility, use a "Ghost Border." Apply the `outline_variant` (#C6C6C6) at 20% opacity. It should be barely visible—enough to guide the eye, but not enough to "enclose" the content.

---

## 5. Components

### Buttons
*   **Primary:** Rectangular (0px radius), `primary` (#000000) background with `on_primary` (#E5E2E1) text. No hover shadow; instead, use a 100% color inversion on hover.
*   **Secondary:** 1px "Ghost Border" (20% opacity), no background.

### Input Fields
*   **Structure:** No four-sided boxes. Use a single 1px bottom stroke using the `outline` token (#777777). 
*   **States:** On focus, the stroke becomes `primary` (#000000) and increases to 2px.

### Cards & Lists
*   **Rule:** Forbid the use of card containers. 
*   **Implementation:** Content should be separated by the Spacing Scale (e.g., 160px vertical gaps). Imagery should be flush with the typography, creating a "modular block" feel without the need for a physical border.

### Chips & Tags
*   **Design:** Small, mono-spaced or Inter labels. No background pill shape. Use a leading "/" or a small square bullet to indicate it is a tag.

### Navigation
*   **The Editorial Header:** Fixed at the top, `surface_container_lowest` (#FFFFFF) with 0% opacity until scroll, then transitioning to a backdrop blur.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Offset your headlines. Don't center everything. Use the negative space to "push" the user's eye toward the imagery.
*   **Use Massive Type:** If a headline feels too big, it’s probably just right for this system.
*   **Trust the White:** Allow elements to sit far apart. A 200px gap is not "wasted space"; it is "luxury."

### Don't:
*   **No Rounded Corners:** Any radius above 0px breaks the architectural integrity of the system.
*   **No Drop Shadows:** Shadows imply a light source that doesn't exist in a flat, editorial world. Use tonal shifts instead.
*   **No Clutter:** If an icon isn't strictly necessary for navigation, remove it. Favor text labels over icons to maintain the magazine aesthetic.
*   **No Dividers:** Avoid horizontal lines (`<hr>`) unless they are used as a deliberate stylistic "strike" through the page. Use space as your primary divider.

---

## 7. Token Reference Summary
*   **Background:** `surface` (#F9F9F9)
*   **Primary Text:** `on_surface` (#1A1C1C)
*   **Accent/Muted Text:** `on_surface_variant` (#474747)
*   **Border Radius:** `0px` (Strict)
*   **Shadows:** `None` (Strict)