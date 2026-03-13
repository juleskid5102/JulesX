# Jules Studio — Architecture

## Tổng quan kiến trúc

```
┌─────────────────────┐     ┌─────────────────────┐
│   Public Site        │     │   Admin Panel        │
│   (CF Pages)         │     │   (CF Pages)         │
│   julesstudio.       │     │   admin-julesstudio. │
│   pages.dev          │     │   pages.dev          │
│                      │     │                      │
│   Vite + React 19    │     │   Vite + React 19    │
│   Tailwind CSS v4    │     │   Tailwind CSS v4    │
└──────────┬───────────┘     └──────────┬───────────┘
           │                            │
           ▼                            ▼
┌─────────────────────────────────────────────────────┐
│              Shared Worker API                       │
│              (Cloudflare Workers + Hono)              │
│              worker-backend-julesstudio.              │
│              juleskid5102.workers.dev                 │
│                                                       │
│   Routes:                                             │
│   /api/public/*    ← Public site calls                │
│   /api/auth/*      ← Auth (both apps)                 │
│   /api/customer/*  ← Customer routes (public)         │
│   /api/admin/*     ← Admin routes (admin panel)       │
│   /api/fcm/*       ← FCM push triggers                │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Firebase                                 │
│                                                       │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│   │  Firestore   │  │    Auth     │  │    FCM      │ │
│   │  Database    │  │(Email+Google│  │  Push       │ │
│   │              │  │ 2 roles)    │  │  Messaging  │ │
│   └─────────────┘  └─────────────┘  └─────────────┘ │
│   Project ID: jules-studio                            │
└───────────────────────────────────────────────────────┘
```

## Stack (Scenario A)

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React | 19 |
| Build Tool | Vite | 6 |
| CSS | Tailwind CSS | v4 |
| Backend Runtime | Cloudflare Workers | — |
| Backend Framework | Hono | 4.x |
| Database | Firebase Firestore | — |
| Auth | Firebase Authentication | — |
| Push Notifications | Firebase Cloud Messaging (FCM v1 HTTP API) | — |
| Deploy | Cloudflare Pages + Workers | — |

## CORS Configuration

Worker phải cho phép 2 origins:
- `https://julesstudio.pages.dev`
- `https://admin-julesstudio.pages.dev`

## Auth Flow

```
1. User login → Firebase Auth (client SDK)
2. Get ID Token → Send to Worker API (Authorization header)
3. Worker verifies token → Extract role (custom claims)
4. Route based on role:
   - role === 'admin' → /api/admin/* routes
   - role === 'customer' → /api/customer/* routes
   - no role → /api/public/* routes only
```

## FCM Flow

```
1. Admin opens Admin Panel → Service Worker registers for FCM
2. FCM token sent to Worker → Stored in Firestore (admin_devices)
3. Customer submits order → Worker saves to Firestore
4. Worker calls FCM v1 HTTP API → Push to all admin devices
5. Admin receives push notification (browser/PWA)
```

## Deployment

| App | Platform | Build | Output |
|---|---|---|---|
| Public | CF Pages | `npm run build` | `dist/` |
| Admin | CF Pages | `npm run build` | `dist/` |
| Worker | CF Workers | `wrangler deploy` | — |
