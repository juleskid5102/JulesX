# Jules Studio — Component Tree

## Shared Components (cả Public + Admin)

```
shared/
├── components/
│   ├── ui/
│   │   ├── Button.tsx           ← Primary, Secondary, Ghost, Icon variants
│   │   ├── Input.tsx            ← Text, Email, Password, Textarea
│   │   ├── Select.tsx           ← Dropdown
│   │   ├── Badge.tsx            ← Status badges (color-coded)
│   │   ├── Modal.tsx            ← Dialog overlay
│   │   ├── Toast.tsx            ← Notification toast
│   │   ├── Spinner.tsx          ← Loading indicator
│   │   ├── Skeleton.tsx         ← Loading skeleton
│   │   └── EmptyState.tsx       ← Empty data state
│   └── icons/
│       └── Icons.tsx            ← SVG icon components (Lucide)
├── hooks/
│   ├── useAuth.ts               ← Firebase auth state
│   ├── useApi.ts                ← API fetch wrapper
│   └── useFCM.ts                ← FCM token management
├── services/
│   ├── api.ts                   ← Base API client
│   ├── auth.ts                  ← Firebase auth helpers
│   └── fcm.ts                   ← FCM registration
├── types/
│   └── index.ts                 ← Shared TypeScript types
└── utils/
    ├── formatters.ts            ← Date, currency formatters
    └── validators.ts            ← Form validation
```

---

## Public Site Components

```
public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           ← Floating nav (B&W, scroll effect)
│   │   │   ├── Footer.tsx           ← Minimal footer (links, social)
│   │   │   └── PageTransition.tsx   ← Smooth route transitions
│   │   ├── home/
│   │   │   ├── HeroSection.tsx      ← Full-viewport hero, oversized type
│   │   │   ├── ProcessSection.tsx   ← How we work (3-4 steps)
│   │   │   ├── PortfolioPreview.tsx ← Featured projects (3-4 cards)
│   │   │   └── ContactSection.tsx   ← Contact form + info
│   │   ├── portfolio/
│   │   │   ├── ProjectGrid.tsx      ← Asymmetric masonry layout
│   │   │   ├── ProjectCard.tsx      ← Hover overlay with details
│   │   │   └── ProjectDetail.tsx    ← Full project page
│   │   ├── config-builder/
│   │   │   ├── ConfigWizard.tsx     ← Multi-step wizard container
│   │   │   ├── StepSystemType.tsx   ← Step 1: choose system type
│   │   │   ├── StepModules.tsx      ← Step 2: select modules
│   │   │   ├── StepContact.tsx      ← Step 3: contact info
│   │   │   ├── StepSummary.tsx      ← Step 4: review & submit
│   │   │   └── PriceEstimate.tsx    ← Live price calculation
│   │   ├── tracking/
│   │   │   └── OrderStatus.tsx      ← Public order tracker
│   │   └── auth/
│   │       ├── LoginForm.tsx        ← Email + Google login
│   │       ├── RegisterForm.tsx     ← Customer registration
│   │       └── ForgotPassword.tsx   ← Password reset
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Portfolio.tsx
│   │   ├── PortfolioItem.tsx
│   │   ├── ConfigBuilder.tsx
│   │   ├── OrderTracking.tsx
│   │   ├── CustomerOrders.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ForgotPassword.tsx
│   ├── App.tsx                      ← Router + layout
│   ├── main.tsx                     ← Entry point
│   └── index.css                    ← Tailwind + custom styles
```

---

## Admin Panel Components

```
admin/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          ← Collapsible sidebar nav
│   │   │   ├── TopBar.tsx           ← Search, notifications bell, profile
│   │   │   ├── AdminLayout.tsx      ← Sidebar + TopBar + content area
│   │   │   └── NotificationBell.tsx ← Bell icon with badge + dropdown
│   │   ├── dashboard/
│   │   │   ├── StatCard.tsx         ← Metric card (number + trend)
│   │   │   ├── RecentLeads.tsx      ← Latest leads table
│   │   │   ├── RecentOrders.tsx     ← Latest orders table
│   │   │   └── ActivityChart.tsx    ← Line chart (leads/orders over time)
│   │   ├── leads/
│   │   │   ├── LeadTable.tsx        ← Paginated table
│   │   │   ├── LeadFilters.tsx      ← Status, date, search filters
│   │   │   ├── LeadDetail.tsx       ← Full detail view
│   │   │   ├── LeadNotes.tsx        ← Notes section (add/view)
│   │   │   └── LeadStatusBadge.tsx  ← Color-coded status
│   │   ├── projects/
│   │   │   ├── ProjectTable.tsx     ← Paginated table
│   │   │   ├── ProjectForm.tsx      ← Create/edit form
│   │   │   └── ProjectProgress.tsx  ← Progress bar
│   │   ├── orders/
│   │   │   ├── OrderTable.tsx       ← Paginated table
│   │   │   ├── OrderForm.tsx        ← Create/edit form
│   │   │   └── OrderTimeline.tsx    ← Status timeline
│   │   ├── settings/
│   │   │   ├── GeneralSettings.tsx  ← Company info form
│   │   │   ├── ConfigSettings.tsx   ← System types + modules manager
│   │   │   └── ModuleEditor.tsx     ← Add/edit modules
│   │   ├── intake/
│   │   │   ├── IntakeList.tsx       ← List intake projects
│   │   │   └── IntakeForm.tsx       ← Create/edit intake
│   │   └── shared/
│   │       ├── DataTable.tsx        ← Reusable table (sort, paginate)
│   │       ├── FormSection.tsx      ← Form grouping
│   │       ├── ConfirmDialog.tsx    ← Delete confirmation
│   │       └── FileUpload.tsx       ← Drag & drop upload
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Leads.tsx
│   │   ├── LeadDetail.tsx
│   │   ├── Projects.tsx
│   │   ├── Orders.tsx
│   │   ├── Settings.tsx
│   │   ├── IntakeList.tsx
│   │   ├── IntakeForm.tsx
│   │   └── Login.tsx
│   ├── App.tsx                      ← Router + AdminLayout
│   ├── main.tsx                     ← Entry point + FCM init
│   └── index.css                    ← Tailwind + admin styles
```

---

## Backend Worker Structure

```
backend/
├── src/
│   ├── index.ts                     ← Hono app entry
│   ├── routes/
│   │   ├── public.ts                ← /api/public/*
│   │   ├── auth.ts                  ← /api/auth/*
│   │   ├── customer.ts              ← /api/customer/*
│   │   ├── admin.ts                 ← /api/admin/*
│   │   └── fcm.ts                   ← /api/fcm/*
│   ├── middleware/
│   │   ├── cors.ts                  ← CORS for 2 origins
│   │   ├── auth.ts                  ← Firebase token verification
│   │   └── adminAuth.ts             ← Admin role check
│   ├── services/
│   │   ├── firestore.ts             ← Firestore REST helpers
│   │   ├── fcm.ts                   ← FCM v1 HTTP API
│   │   └── email.ts                 ← Email notification
│   ├── utils/
│   │   ├── idGenerator.ts           ← Short ID generation
│   │   └── validators.ts            ← Input validation
│   └── types.ts                     ← TypeScript types
├── wrangler.toml
└── package.json
```
