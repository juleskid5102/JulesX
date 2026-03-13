---
description: Thiết kế UI với Stitch - Tạo, review, chỉnh sửa và xuất design system
---

# /design - Design Phase với Stitch

## Prerequisites
- Đã hoàn thành Phase 1 (`/new-project`)
- Có file `docs/design_brief.md` và `docs/requirements.md`

## Bước 1: Đọc context

Đọc các file sau để hiểu dự án:
- `docs/project_brief.md` - Tổng quan
- `docs/design_brief.md` - Hướng thiết kế
- `docs/requirements.md` - Chức năng (để biết cần thiết kế những trang nào)

## Bước 2: Tạo Stitch Project

1. Đọc skill `stitch-ui-design` để nắm best practices cho prompts
2. Tạo project trên Stitch:

```
Gọi mcp_StitchMCP_create_project với title = "[Tên dự án]"
```

3. Lưu Project ID vào `designs/stitch.json`:
```json
{
  "projectId": "[ID từ Stitch]",
  "projectName": "[Tên dự án]",
  "createdAt": "[timestamp]"
}
```

## Bước 3: Tạo prompts cho từng screen

Sử dụng skill `enhance-prompt` để biến `design_brief.md` thành Stitch-optimized prompts.

Cho mỗi page trong sitemap:
1. Viết prompt mô tả page đó
2. Include thông tin từ design brief (màu sắc, phong cách)
3. Thêm page structure (sections, components)
4. Lưu vào `designs/prompts/[page-name].md`

**Format prompt chuẩn:**
```markdown
[Mô tả 1 dòng về page và mood]

**DESIGN SYSTEM:**
- Platform: Web, [Desktop/Mobile]-first
- Theme: [Light/Dark], [style keywords]
- Background: [Color] (#hex)
- Primary: [Color] (#hex) for [role]
- Text: [Color] (#hex)
- Buttons: [Shape], [color]
- Cards: [Corners], [shadow]

**Page Structure:**
1. **Header:** [Mô tả]
2. **[Section]:** [Mô tả]
3. **Footer:** [Mô tả]
```

## Bước 4: Generate screens trên Stitch

Cho mỗi prompt đã chuẩn bị:

```
Gọi mcp_StitchMCP_generate_screen_from_text:
  - projectId: [ID]
  - prompt: [nội dung prompt]
  - deviceType: DESKTOP (hoặc MOBILE)
```

Lưu screen IDs vào `designs/stitch.json`.

## Bước 5: Review Loop với khách

**Đây là vòng lặp** - lặp lại cho đến khi khách hài lòng:

### 5.1 Trình bày cho khách
- Show screenshots từ Stitch
- Giải thích từng section

### 5.2 Nhận feedback
Phân loại feedback thành:
- **Chỉnh nhỏ** → Dùng `edit_screens` trên Stitch
- **Thay đổi lớn** → Dùng `generate_variants` để tạo phương án khác
- **Thêm screen mới** → Quay lại bước 3-4

### 5.3 Áp dụng chỉnh sửa
```
Gọi mcp_StitchMCP_edit_screens:
  - projectId: [ID]
  - selectedScreenIds: [IDs cần sửa]
  - prompt: [mô tả chỉnh sửa]
```

### 5.4 Khách confirm?
- ❌ Chưa OK → Quay lại 5.2
- ✅ OK → Sang bước 6

## Bước 6: Xuất Design System

Khi TẤT CẢ screens đã được duyệt:

1. Đọc skill `design-md` 
2. Phân tích Stitch project → sinh `docs/DESIGN.md`
3. File này chứa:
   - Color palette với hex codes
   - Typography rules
   - Component styles (buttons, cards, inputs)
   - Layout principles
   - Spacing system

## Bước 7: Tạo Sitemap chính thức

Cập nhật `docs/sitemap.md` với danh sách các pages đã thiết kế:

```markdown
# Sitemap: [Tên dự án]

## Pages
- [x] Home - Screen ID: [id]
- [x] About - Screen ID: [id]
- [x] Contact - Screen ID: [id]
...

## Flows
- Home → Products → Product Detail → Cart → Checkout
- Home → Login → Dashboard
```

## Output

Sau phase này, thư mục `designs/` sẽ có:
```
designs/
├── stitch.json           # Project ID + screen IDs
├── prompts/              # Prompt cho mỗi page
│   ├── home.md
│   ├── about.md
│   └── ...
└── screens/              # Screenshots tham khảo
    ├── home.png
    └── ...
```

Và trong `docs/`:
```
docs/
├── DESIGN.md             # Design system (MỚI)
└── sitemap.md            # Sitemap chính thức (CẬP NHẬT)
```

> **Khi hoàn tất → chuyển sang Phase 3: `/architect`**
