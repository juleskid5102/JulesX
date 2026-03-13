---
description: Build và Deploy — Cloudflare Pages (frontend) + Workers (backend) + Domain setup
---

# /deploy - Build & Deploy

## Prerequisites
- Phase 5 (`/qa`) đã pass
- Có `reports/qa_report.md` với status PASS
- Environment variables đã chuẩn bị cho production
- Đọc `docs/03-stack-defaults.md` để biết hosting scenario

## Bước 1: Pre-deploy Checklist

- [ ] QA report status = PASS
- [ ] Mọi issue High/Medium đã fix
- [ ] `.env` / `wrangler.toml` có đầy đủ production values
- [ ] Firebase project đã tạo trên console
- [ ] Domain đã sẵn sàng (nếu có)
- [ ] Ảnh sản phẩm đã convert WebP và nằm trong `public/images/`

## Bước 2: Production Build

// turbo
```bash
npm run build
```

Kiểm tra:
- [ ] Build thành công, không warning nghiêm trọng
- [ ] Folder `dist/` đã được tạo
- [ ] Thử preview local:

// turbo
```bash
npm run preview
```

## Bước 3: Deploy Frontend → Cloudflare Pages

### Option A: Git integration (khuyến nghị)
1. Push code lên GitHub
2. Vào Cloudflare Dashboard → Pages → Create project
3. Connect GitHub repo
4. Cấu hình:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: copy từ `.env`

### Option B: Direct upload (nhanh)
// turbo
```bash
npx -y wrangler pages deploy dist --project-name=[project-name]
```

URL: `https://[project-name].pages.dev`

## Bước 4: Deploy Backend → Cloudflare Workers

// turbo
```bash
npx -y wrangler deploy --config backend/wrangler.toml
```

URL: `https://backend-[project].[account].workers.dev`

### Setup Worker secrets
```bash
npx wrangler secret put FIREBASE_SERVICE_ACCOUNT --config backend/wrangler.toml
npx wrangler secret put JWT_SECRET --config backend/wrangler.toml
```

## Bước 5: Deploy Firebase Rules

### 5.1 Deploy Firestore Rules
```bash
npx firebase deploy --only firestore:rules
```

### 5.2 Deploy Storage Rules (nếu có)
```bash
npx firebase deploy --only storage
```

## Bước 6: Setup Domain (nếu có)

### Cloudflare Custom Domain
1. Vào Cloudflare Dashboard → Pages → Project → Custom domains
2. Thêm domain (domain phải nằm trên Cloudflare DNS)
3. SSL tự động provision

### Convention
```
Frontend khách:  [project].pages.dev → [domain.com]
Frontend admin:  admin-[project].pages.dev
Backend:         backend-[project].[account].workers.dev
```

## Bước 7: Post-deploy Verification

Truy cập production URL, kiểm tra:
- [ ] Homepage load thành công
- [ ] Navigation hoạt động
- [ ] Images hiển thị đúng (WebP format)
- [ ] Forms submit được
- [ ] Auth flow hoạt động (login/register)
- [ ] API calls đến Workers hoạt động
- [ ] Mobile responsive OK
- [ ] HTTPS hoạt động

## Bước 8: Generate Deployment Log

Tạo/cập nhật `reports/deployment_log.md`:

```markdown
# Deployment Log: [Tên dự án]

## Production URLs
- **Frontend:** [Pages URL]
- **Admin:** [Admin Pages URL]
- **Backend:** [Workers URL]
- **Custom Domain:** [Domain nếu có]
- **Firebase Console:** [Console URL]

## Deployment Details
- **Date:** [timestamp]
- **Cloudflare Pages:** [project name]
- **Cloudflare Workers:** [worker name]
- **Firebase Project:** [project ID]
- **Build time:** [X seconds]
- **Bundle size:** [X KB]

## Post-deploy Checks
- [ ] All pages accessible
- [ ] Auth working
- [ ] API operations working
- [ ] Images loading (WebP)
- [ ] SSL active
- [ ] Analytics connected (nếu có)

## Rollback Plan
- Pages: Revert to previous deployment in Cloudflare Dashboard
- Workers: `wrangler rollback` hoặc redeploy previous version
- Firebase: `firebase deploy --only firestore:rules` with previous rules
```

## Bước 9: Handoff cho khách

Chuẩn bị deliverables:
1. **Production URL** để khách truy cập
2. **Admin credentials** (nếu có admin panel)
3. **Docs hướng dẫn** sử dụng cơ bản
4. **Source code** (nếu khách yêu cầu)

> **🎉 DỰ ÁN HOÀN THÀNH!**
>
> Mọi tài liệu nằm trong:
> - `docs/` - Tài liệu dự án
> - `designs/` - Design assets
> - `reports/` - QA & deployment reports

## Skills sử dụng

| Bước | Skill |
|------|-------|
| Bước 1-2: Pre-deploy + build | `verification-before-completion` |
| Bước 3-4: Deploy Cloudflare | `deployment-procedures` |
| Bước 7: Post-deploy verify | `playwright-skill`, `ui-visual-validator` |
| Bước 9: Handoff | `readme` |

