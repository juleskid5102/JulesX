// Admin API Routes — All require adminAuth middleware
// CRUD for: services, portfolio, site-settings, process-steps, technologies, contacts, claims, FCM

import { Hono } from 'hono';
import { FirestoreClient } from '../lib/firestore';
import { adminAuth, customerAuth } from '../middleware/auth';
import type { Env } from '../middleware/auth';

const adminRoutes = new Hono<Env>();

// All admin routes require admin auth
adminRoutes.use('/*', adminAuth);

function getDb(c: any): FirestoreClient {
    return new FirestoreClient(
        c.env.FIREBASE_PROJECT_ID,
        c.env.FIREBASE_CLIENT_EMAIL,
        c.env.FIREBASE_PRIVATE_KEY
    );
}

// ─── Generic CRUD factory ────────────────────────────────────────

function registerCrud(router: Hono<Env>, prefix: string, collection: string) {
    // List
    router.get(`/${prefix}`, async (c) => {
        const db = getDb(c);
        const docs = await db.list(collection);
        return c.json(docs);
    });

    // Create
    router.post(`/${prefix}`, async (c) => {
        const db = getDb(c);
        const body = await c.req.json();
        const docId = body.id; // optional custom ID
        delete body.id;
        body.updatedAt = new Date().toISOString();
        if (!body.createdAt) body.createdAt = new Date().toISOString();
        const doc = await db.create(collection, body, docId);
        return c.json(doc, 201);
    });

    // Get single
    router.get(`/${prefix}/:id`, async (c) => {
        const db = getDb(c);
        const id = c.req.param('id');
        const doc = await db.get(collection, id);
        if (!doc) return c.json({ error: 'Not found' }, 404);
        return c.json(doc);
    });

    // Update (partial)
    router.patch(`/${prefix}/:id`, async (c) => {
        const db = getDb(c);
        const id = c.req.param('id');
        const body = await c.req.json();
        delete body.id;
        body.updatedAt = new Date().toISOString();
        const doc = await db.update(collection, id, body);
        return c.json(doc);
    });

    // Delete
    router.delete(`/${prefix}/:id`, async (c) => {
        const db = getDb(c);
        const id = c.req.param('id');
        await db.delete(collection, id);
        return c.json({ success: true });
    });
}

// Register CRUD for all collections
registerCrud(adminRoutes, 'services', 'services');
registerCrud(adminRoutes, 'portfolio', 'projects');
registerCrud(adminRoutes, 'process-steps', 'process_steps');
registerCrud(adminRoutes, 'technologies', 'technologies');
registerCrud(adminRoutes, 'leads', 'leads');

// ─── Site Settings (single document) ─────────────────────────────

adminRoutes.get('/site-settings', async (c) => {
    const db = getDb(c);
    const settings = await db.get('site_settings', 'main');
    return c.json(settings || {});
});

adminRoutes.patch('/site-settings', async (c) => {
    const db = getDb(c);
    const body = await c.req.json();
    delete body.id;
    body.updatedAt = new Date().toISOString();
    const doc = await db.update('site_settings', 'main', body);
    return c.json(doc);
});

// ─── Admin User Settings (profile/business/notifs) ───────────────

adminRoutes.get('/settings', async (c) => {
    const db = getDb(c);
    const user = c.get('user');
    const settings = await db.get('admin_settings', user.uid);
    return c.json(settings || {});
});

adminRoutes.patch('/settings', async (c) => {
    const db = getDb(c);
    const user = c.get('user');
    const body = await c.req.json();
    delete body.id;
    body.updatedAt = new Date().toISOString();

    // Check if doc exists — create if not
    const existing = await db.get('admin_settings', user.uid);
    if (existing) {
        const doc = await db.update('admin_settings', user.uid, body);
        return c.json(doc);
    } else {
        body.createdAt = new Date().toISOString();
        const doc = await db.create('admin_settings', body, user.uid);
        return c.json(doc);
    }
});

// ─── Pricing Config (single document) ────────────────────────────

adminRoutes.get('/pricing-config', async (c) => {
    const db = getDb(c);
    const config = await db.get('pricing_config', 'main');
    return c.json(config || {
        coefficient: 1.4,
        dailyRate: 500000,
        hoursPerDay: 8,
        features: [],
    });
});

adminRoutes.patch('/pricing-config', async (c) => {
    const db = getDb(c);
    const body = await c.req.json();
    delete body.id;
    body.updatedAt = new Date().toISOString();

    const existing = await db.get('pricing_config', 'main');
    if (existing) {
        const doc = await db.update('pricing_config', 'main', body);
        return c.json(doc);
    } else {
        body.createdAt = new Date().toISOString();
        const doc = await db.create('pricing_config', body, 'main');
        return c.json(doc);
    }
});

// ─── Custom Claims ───────────────────────────────────────────────

adminRoutes.post('/users/:uid/claims', async (c) => {
    const db = getDb(c);
    const uid = c.req.param('uid');
    const body = await c.req.json();
    const { role, admin } = body;

    const claims: Record<string, unknown> = {};
    if (role !== undefined) claims.role = role;
    if (admin !== undefined) claims.admin = admin;

    await db.setCustomClaims(uid, claims);
    return c.json({ success: true, uid, claims });
});

// ─── Projects (existing Kanban view) ─────────────────────────────

adminRoutes.get('/projects', async (c) => {
    const db = getDb(c);
    const projects = await db.list('projects');
    return c.json(projects);
});

// ─── Leads ───────────────────────────────────────────────────────

adminRoutes.get('/leads', async (c) => {
    const db = getDb(c);
    const leads = await db.list('leads');
    leads.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA; // newest first
    });
    return c.json(leads);
});

export default adminRoutes;

// ─── FCM Routes (separate, uses customerAuth for registration) ──

export const fcmRoutes = new Hono<Env>();

fcmRoutes.post('/register-device', customerAuth, async (c) => {
    const db = getDb(c);
    const user = c.get('user');
    const { token } = await c.req.json();

    if (!token) {
        return c.json({ error: 'Missing FCM token' }, 400);
    }

    await db.saveFCMToken(user.uid, token);
    return c.json({ success: true });
});

// ─── Auth Sync Routes ────────────────────────────────────────────

export const authRoutes = new Hono<Env>();

authRoutes.post('/sync-guest', customerAuth, async (c) => {
    const db = getDb(c);
    const user = c.get('user');

    // Find guest profile by email
    const guests = await db.query('guests', 'email', 'EQUAL', user.email);
    if (guests.length === 0) return c.json({ synced: 0 });

    const guestId = guests[0].id as string;

    // Link guest → user
    await db.update('guests', guestId, { linkedUserId: user.uid });

    // Update all guest orders → link to userId
    const orders = await db.query('orders', 'guestId', 'EQUAL', guestId);
    let synced = 0;
    for (const order of orders) {
        await db.update('orders', order.id as string, { userId: user.uid });
        synced++;
    }

    return c.json({ synced, guestId });
});
