---
description: Tổng quan pipeline phát triển web — từ intake đến deploy
---

# Walkthrough: Jules Studio Pipeline

## Pipeline Flow

```
01-new-project → 02-feature-catalog → 03-stack-defaults → 04-intake-workflow
     ↓
05-design → 06-stitch-to-react → 07-architect → 08-dev-setup
     ↓
09-qa → 10-deploy
```

## Pipeline Files

| # | File | Phase | Mục đích | Skills |
|---|------|-------|----------|--------|
| 01 | `01-new-project.md` | Intake | Câu hỏi cho khách | — |
| 02 | `02-feature-catalog.md` | Intake | 18 nhóm tính năng (source of truth) | — |
| 03 | `03-stack-defaults.md` | Intake | Stack + hosting + media logic | — |
| 04 | `04-intake-workflow.md` | Intake | Quy trình vận hành A→Z | `brainstorming`, `business-analyst` |
| 05 | `05-design.md` | Design | Stitch UI mockup | `stitch-ui-design`, `enhance-prompt`, `design-md` |
| 06 | `06-stitch-to-react.md` | Convert | Stitch → React | `react:components`, `ui-visual-validator` |
| 07 | `07-architect.md` | Architecture | Kiến trúc + schema + API | `senior-architect`, `database-design` |
| 08 | `08-dev-setup.md` | Dev Setup | Init project | `frontend-developer`, `firebase` |
| 09 | `09-qa.md` | QA | QA + Security | `code-reviewer`, `find-bugs`, `playwright-skill` |
| 10 | `10-deploy.md` | Deploy | Cloudflare deploy | `deployment-procedures` |

## Workflows

| Command | Mục đích |
|---------|----------|
| `/new-project` | Intake → phân tích → push Firebase |
| `/design` | Stitch UI mockup + design system |
| `/architect` | Schema + API + component tree |
| `/dev-setup` | Init Vite + Workers + Firebase |
| `/qa` | Code review + security + performance |
| `/deploy` | Build + deploy Cloudflare |

## Rules

| File | Vai trò |
|------|---------|
| `antigravity-webapp-pipeline.md` | Pipeline stages + skill names |
| `antigravity-wrapper-pipeline.md` | Desktop/mobile wrapper |
| `always-apply-skills.md` | Bắt buộc dùng skill phù hợp |

## Hosting

| | Scenario A (90%) | Scenario B (10%) |
|---|---|---|
| Frontend | Cloudflare Pages | Host khách |
| Backend | Workers + Hono | Node.js host khách |
| Auth/DB | Firebase | Tùy đề xuất |
| Media | Pages static (WebP) + Cloudinary | Host khách |
