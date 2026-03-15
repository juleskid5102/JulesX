// Public API Routes — No auth required
// All data fetched from Firestore collections

import { Hono } from 'hono';
import { FirestoreClient } from '../lib/firestore';
import type { Env } from '../middleware/auth';

const publicRoutes = new Hono<Env>();

// Helper: create FirestoreClient from env
function getDb(c: any): FirestoreClient {
    return new FirestoreClient(
        c.env.FIREBASE_PROJECT_ID,
        c.env.FIREBASE_CLIENT_EMAIL,
        c.env.FIREBASE_PRIVATE_KEY
    );
}

// ─── Portfolio / Projects ────────────────────────────────────────

// Helper: map raw Firestore doc → public-safe project object
function mapPublicProject(p: any) {
    return {
        id: p.id,
        slug: p.slug || p.id,
        title: p.title || p.name || '',
        category: p.category || '',
        designStyle: p.designBrief?.style || p.designStyle || '',
        field: p.field || '',
        completedAt: p.completedAt || p.date || '',
        description: p.description || '',
        challenge: p.challenge || '',
        solution: p.solution || '',
        duration: p.duration || '',
        stack: p.stack || '',
        lighthouse: p.lighthouse || '',
        image: p.image || p.thumbnail || '',
        gallery: p.gallery || [],
        techTags: p.techTags || p.tags || [],
        featured: p.featured || false,
        order: p.order ?? 99,
    };
}

publicRoutes.get('/portfolio', async (c) => {
    const db = getDb(c);
    const allProjects = await db.list('projects');

    // Only published projects for public
    const published = allProjects
        .filter((p: any) => p.status === 'published')
        .sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99))
        .map(mapPublicProject);

    // If no published projects yet, fall back to all (backward compat)
    const projects = published.length > 0 ? published : allProjects
        .sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99))
        .map(mapPublicProject);

    // ?featured=true → random 2 published projects
    const featured = c.req.query('featured');
    if (featured === 'true') {
        const pool = projects.filter((p: any) => p.featured === true);
        const source = pool.length >= 2 ? pool : projects;
        // Shuffle and take 2
        const shuffled = [...source].sort(() => Math.random() - 0.5);
        return c.json({ data: shuffled.slice(0, 2) });
    }

    // Pagination: ?page=1&limit=7
    const page = Math.max(1, parseInt(c.req.query('page') || '1'));
    const limit = Math.min(21, Math.max(1, parseInt(c.req.query('limit') || '100')));
    const total = projects.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = projects.slice(start, start + limit);

    return c.json({ data: paginated, total, page, totalPages });
});

publicRoutes.get('/portfolio/:id', async (c) => {
    const db = getDb(c);
    const id = c.req.param('id');

    // Try direct ID first
    let project = await db.get('projects', id);

    // Try by slug/numeric id field
    if (!project) {
        const all = await db.list('projects');
        project = all.find((p: any) => p.id === id || p.slug === id) || null;
    }

    if (!project) {
        return c.json({ error: 'Project not found' }, 404);
    }

    return c.json(mapPublicProject(project));
});

// ─── Services ────────────────────────────────────────────────────

publicRoutes.get('/services', async (c) => {
    const db = getDb(c);
    const services = await db.list('services');
    services.sort((a: any, b: any) => {
        const numA = parseInt(a.number || '0');
        const numB = parseInt(b.number || '0');
        return numA - numB;
    });
    return c.json(services);
});

// ─── Technologies ────────────────────────────────────────────────

publicRoutes.get('/technologies', async (c) => {
    const db = getDb(c);
    const techs = await db.list('technologies');
    techs.sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99));
    return c.json(techs);
});

// ─── Process Steps ───────────────────────────────────────────────

publicRoutes.get('/process-steps', async (c) => {
    const db = getDb(c);
    const steps = await db.list('process_steps');
    steps.sort((a: any, b: any) => {
        const numA = parseInt((a.number || '(0)').replace(/[()]/g, ''));
        const numB = parseInt((b.number || '(0)').replace(/[()]/g, ''));
        return numA - numB;
    });
    return c.json(steps);
});

// ─── Site Settings ───────────────────────────────────────────────

publicRoutes.get('/site-settings', async (c) => {
    const db = getDb(c);
    const settings = await db.get('site_settings', 'main');
    if (!settings) {
        return c.json({ error: 'Settings not found' }, 404);
    }
    return c.json(settings);
});

// Backward compat: /settings also returns site_settings/main
publicRoutes.get('/settings', async (c) => {
    const db = getDb(c);
    const settings = await db.get('site_settings', 'main');
    if (!settings) {
        return c.json({ error: 'Settings not found' }, 404);
    }
    return c.json(settings);
});

// ─── Contact Form Submission ─────────────────────────────────────

publicRoutes.post('/contact', async (c) => {
    const body = await c.req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
        return c.json({ error: 'Thiếu thông tin bắt buộc (name, email, message)' }, 400);
    }

    const db = getDb(c);

    // Save contact to Firestore
    const contact = await db.create('contacts', {
        name,
        email,
        phone: phone || '',
        message,
        status: 'new',
        createdAt: new Date().toISOString(),
    });

    // Send FCM push to admins
    try {
        await db.notifyAdmins(
            '📩 Liên hệ mới!',
            `${name} — ${message.substring(0, 80)}${message.length > 80 ? '...' : ''}`
        );
    } catch (e) {
        console.error('FCM notification failed:', e);
    }

    return c.json({ success: true, id: contact.id });
});

// ─── Project Submission (ConfigBuilder) ──────────────────────────

// Whitelist: only these fields are stored from ConfigBuilder
const SUBMIT_PROJECT_FIELDS = [
    'name', 'email', 'phone', 'company',
    'systemType', 'budget', 'timeline', 'description',
    'designStyle', 'colorPalette', 'animationLevel',
    'referenceUrls', 'features', 'notes',
] as const;

publicRoutes.post('/submit-project', async (c) => {
    const raw = await c.req.json();

    // Pick only whitelisted fields
    const body: Record<string, unknown> = {};
    for (const key of SUBMIT_PROJECT_FIELDS) {
        if (raw[key] !== undefined) body[key] = raw[key];
    }

    if (!body.name || !body.email) {
        return c.json({ error: 'Thiếu thông tin bắt buộc (name, email)' }, 400);
    }

    const db = getDb(c);
    const submission = await db.create('project_submissions', {
        ...body,
        status: 'new',
        createdAt: new Date().toISOString(),
    });

    // Notify admins
    try {
        await db.notifyAdmins(
            '🚀 Yêu cầu dự án mới!',
            `${body.name || 'Khách'} — ${body.systemType || 'Website'}`
        );
    } catch (e) {
        console.error('FCM notification failed:', e);
    }

    return c.json({ success: true, id: submission.id });
});

// ─── Contact Info (for ContactFAB) ───────────────────────────────

publicRoutes.get('/contact-info', async (c) => {
    const db = getDb(c);
    const settings = await db.get('site_settings', 'main');
    if (!settings) {
        return c.json({});
    }
    // Return only contact + social fields
    return c.json({
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
        social: settings.social,
        fabChannels: settings.fabChannels,
    });
});

// ─── Guest Order (no auth needed) ────────────────────────────────

publicRoutes.post('/orders', async (c) => {
    const body = await c.req.json();
    const { name, email, phone, ...orderData } = body;

    if (!name || !email) {
        return c.json({ error: 'Thiếu thông tin bắt buộc (name, email)' }, 400);
    }

    const db = getDb(c);

    // 1. Look up or create guest profile
    let guestId: string;
    const existing = await db.query('guests', 'email', 'EQUAL', email, 1);

    if (existing.length > 0) {
        guestId = existing[0].id as string;
    } else {
        const guestDoc = await db.create('guests', {
            name, email, phone: phone || '',
            createdAt: new Date().toISOString(),
            linkedUserId: null,
        });
        guestId = guestDoc.id as string;
    }

    // 2. Create order linked to guest
    const order = await db.create('orders', {
        ...orderData,
        guestId,
        email, name, phone: phone || '',
        userId: null,
        status: 'pending',
        createdAt: new Date().toISOString(),
    });

    // 3. Notify admins
    try {
        await db.notifyAdmins(
            '🛒 Đơn hàng mới!',
            `${name} — ${orderData.systemType || orderData.service || 'Đơn hàng'}`
        );
    } catch (e) {
        console.error('FCM notification failed:', e);
    }

    return c.json({ success: true, orderId: order.id, guestId });
});

export default publicRoutes;
