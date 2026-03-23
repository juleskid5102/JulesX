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
        designStyleIds: p.designStyleIds || [],
        webTypeKey: p.webTypeKey || '',
        field: p.field || '',
        completedAt: p.completedAt || '',
        description: p.description || '',
        overview: p.overview || '',
        challenge: p.challenge || '',
        solution: p.solution || '',
        duration: p.duration || '',
        stack: p.stack || '',
        lighthouse: p.lighthouse || '',
        image: p.image || p.thumbnail || '',
        gallery: p.gallery || [],
        techTags: p.techTags || p.tags || [],
        features: p.features || [],
        featured: p.featured || false,
        order: p.order ?? 99,
        liveUrl: p.liveUrl || '',
    };
}

publicRoutes.get('/portfolio', async (c) => {
    const db = getDb(c);
    const allProjects = await db.list('projects');

    // Only published projects for public — no fallback
    const projects = allProjects
        .filter((p: any) => p.status === 'published')
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

// ─── Pricing Config (for Config Builder) ────────────────────────

publicRoutes.get('/pricing-config', async (c) => {
    const db = getDb(c);
    const config = await db.get('pricing_config', 'main');
    if (!config) {
        return c.json({
            coefficient: 1.4,
            dailyRate: 500000,
            hoursPerDay: 8,
            features: [],
        });
    }
    // Return public-safe fields only (no internal notes)
    return c.json({
        coefficient: config.coefficient,
        dailyRate: config.dailyRate,
        hoursPerDay: config.hoursPerDay,
        features: config.features || [],
    });
});

// ─── Estimator Config (for 5-step wizard) ───────────────────────

publicRoutes.get('/estimator-config', async (c) => {
    const db = getDb(c);
    const config = await db.get('estimator_config', 'main');
    if (!config) {
        return c.json({
            webTypes: [],
            designStyles: [],
            styleGroups: [],
            features: [],
            categories: [],
            pricing: { coefficient: 1.5, dailyRate: 1000000, deposit: 0.4 },
            priceRef: [],
        });
    }
    return c.json({
        webTypes: config.webTypes || [],
        designStyles: config.designStyles || [],
        styleGroups: config.styleGroups || [],
        features: config.features || [],
        categories: config.categories || [],
        pricing: config.pricing || { coefficient: 1.5, dailyRate: 1000000, deposit: 0.4 },
        priceRef: config.priceRef || [],
    });
});

// ─── Contact Form → leads (source: contact-form) ────────────────

publicRoutes.post('/contact', async (c) => {
    const body = await c.req.json();
    const { name, email, phone, message, company, projectName } = body;

    if (!name || !email || !message) {
        return c.json({ error: 'Thiếu thông tin bắt buộc (name, email, message)' }, 400);
    }

    const db = getDb(c);

    const lead = await db.create('leads', {
        name,
        email,
        phone: phone || '',
        company: company || '',
        projectName: projectName || '',
        message,
        webTypeKey: null,
        design: null,
        features: [],
        package: null,
        pricing: null,
        source: 'contact-form',
        status: 'new',
        customerId: null,
        configVersion: null,
        updatedBy: null,
        history: [],
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

    return c.json({ success: true, id: lead.id });
});

// ─── ConfigBuilder → leads (source: config-builder) ─────────────

const LEAD_FIELDS = [
    'name', 'email', 'phone', 'company', 'projectName',
    'webTypeKey', 'description',
    'designStyles', 'designNote',
    'features', 'package', 'notes',
    'estimatedHours', 'estimatedDays', 'estimatedPrice',
] as const;

publicRoutes.post('/submit-project', async (c) => {
    const raw = await c.req.json();

    // Pick only whitelisted fields
    const body: Record<string, unknown> = {};
    for (const key of LEAD_FIELDS) {
        if (raw[key] !== undefined) body[key] = raw[key];
    }

    if (!body.name || !body.email) {
        return c.json({ error: 'Thiếu thông tin bắt buộc (name, email)' }, 400);
    }

    const db = getDb(c);

    // Fetch current config version
    let configVersion: string | null = null;
    try {
        const config = await db.get('estimator_config', 'main');
        configVersion = config?.version || '1.0';
    } catch (e) { /* ignore */ }

    const lead = await db.create('leads', {
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        company: body.company || '',
        projectName: body.projectName || '',
        message: body.description || body.notes || '',
        webTypeKey: body.webTypeKey || null,
        design: {
            styleIds: Array.isArray(body.designStyles) ? body.designStyles : [],
            note: (body.designNote as string) || '',
        },
        features: body.features || [],
        package: body.package || null,
        pricing: body.estimatedDays ? {
            hours: body.estimatedHours || 0,
            days: body.estimatedDays || 0,
            price: body.estimatedPrice || 0,
            coefficient: 1.5,  // snapshot current
            dailyRate: 1000000, // snapshot current
        } : null,
        source: 'config-builder',
        status: 'new',
        customerId: null,
        configVersion,
        updatedBy: null,
        history: [],
        createdAt: new Date().toISOString(),
    });

    // Notify admins
    try {
        const typeName = body.webTypeKey || 'Website';
        await db.notifyAdmins(
            '🚀 Yêu cầu dự án mới!',
            `${body.name || 'Khách'} — ${typeName}`
        );
    } catch (e) {
        console.error('FCM notification failed:', e);
    }

    return c.json({ success: true, id: lead.id });
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

export default publicRoutes;
