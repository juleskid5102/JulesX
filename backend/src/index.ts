// Jules Studio Backend — Cloudflare Worker with Hono
// Entry point: CORS + public routes + admin routes + FCM + auth sync

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import publicRoutes from './routes/public';
import adminRoutes, { fcmRoutes, authRoutes } from './routes/admin';
import type { Env } from './middleware/auth';

const app = new Hono<Env>();

// ─── CORS ────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
    'https://julesstudio.pages.dev',
    'https://admin-julesstudio.pages.dev',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:3001',
];

app.use('/*', cors({
    origin: (origin) => {
        if (!origin) return ALLOWED_ORIGINS[0];
        if (ALLOWED_ORIGINS.includes(origin)) return origin;
        // Allow only julesstudio preview deploys
        if (origin.endsWith('.julesstudio.pages.dev') || origin.endsWith('.admin-julesstudio.pages.dev')) return origin;
        return ALLOWED_ORIGINS[0];
    },
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Health Check ────────────────────────────────────────────────

app.get('/', (c) => c.json({
    name: 'backend-julesstudio',
    status: 'running',
    timestamp: new Date().toISOString(),
}));

// ─── Routes ──────────────────────────────────────────────────────

app.route('/api/public', publicRoutes);
app.route('/api/admin', adminRoutes);
app.route('/api/fcm', fcmRoutes);
app.route('/api/auth', authRoutes);

// ─── 404 ─────────────────────────────────────────────────────────

app.notFound((c) => c.json({ error: 'Not Found' }, 404));

// ─── Error Handler ───────────────────────────────────────────────

app.onError((err, c) => {
    console.error('Unhandled error:', err);
    return c.json({ error: err.message || 'Internal Server Error' }, 500);
});

export default app;
