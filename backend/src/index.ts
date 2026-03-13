import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { toFirestore, fromFirestore } from './utils/firestore';
import { getAccessToken } from './utils/google-auth';
import { authMiddleware, customerAuthMiddleware } from './middleware/auth';
import { sendEmail, buildConfirmationEmail, buildAdminNotificationEmail } from './utils/email';

export type Bindings = {
    ENVIRONMENT: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
    ADMINISTRATOR_EMAIL: string;
    EMAIL_API_KEY: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS — only allow known origins
const ALLOWED_ORIGINS = [
    'https://julesstudio.pages.dev',
    'https://admin-julesstudio.pages.dev',
    'http://localhost:5173',
    'http://localhost:5174',
];

app.use('/*', cors({
    origin: (origin) => {
        if (!origin) return ALLOWED_ORIGINS[0];
        if (ALLOWED_ORIGINS.includes(origin)) return origin;
        if (origin.endsWith('.pages.dev')) return origin; // preview deploys
        return ALLOWED_ORIGINS[0];
    },
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization']
}));

// Helper to generate project ID: JS-YYYY-XXXX
async function generateProjectId(c: any): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `JS-${year}-`;
    try {
        const data: any = await firestoreRequest(c, 'GET', '/projects?pageSize=1000');
        const count = (data.documents || []).length;
        const nextNum = String(count + 1).padStart(4, '0');
        return `${prefix}${nextNum}`;
    } catch {
        return `${prefix}0001`;
    }
}

// Generate tracking token
function generateTrackingToken(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 24; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Helper to get firestore API URL
const firestoreUrl = (projectId: string, path: string = '') =>
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents${path}`;

async function firestoreRequest(c: any, method: string, path: string, body?: any) {
    if (!c.env.FIREBASE_PROJECT_ID || !c.env.FIREBASE_PRIVATE_KEY) {
        throw new Error('Missing Firebase credentials in worker environment');
    }

    const token = await getAccessToken(c.env.FIREBASE_CLIENT_EMAIL, c.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'));
    const url = firestoreUrl(c.env.FIREBASE_PROJECT_ID, path);
    const res = await fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
        console.error('Firestore Error:', await res.text());
        throw new Error('Firestore request failed');
    }
    return res.json();
}

// --------------------------------------------------------
// PUBLIC ROUTES
// --------------------------------------------------------

// ── Public: Portfolio (showcase projects) ──
app.get('/api/public/portfolio', async (c) => {
    try {
        const url = new URL(c.req.url);
        const type = url.searchParams.get('type') || 'all';
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '9');

        const data: any = await firestoreRequest(c, 'GET', '/showcase_projects?pageSize=1000');
        let projects = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });

        projects = projects.filter((p: any) => p.status === 'completed');

        if (type !== 'all') {
            projects = projects.filter((p: any) => p.category === type);
        }

        projects.sort((a: any, b: any) => {
            const timeA = a.completionDate ? new Date(a.completionDate).getTime() : (a.createdAt || 0);
            const timeB = b.completionDate ? new Date(b.completionDate).getTime() : (b.createdAt || 0);
            return timeB - timeA;
        });

        const total = projects.length;
        const totalPages = Math.ceil(total / limit) || 1;
        const start = (page - 1) * limit;
        const paginated = projects.slice(start, start + limit);

        return c.json({
            data: {
                projects: paginated,
                total,
                totalPages,
                currentPage: page
            }
        });
    } catch (e: any) {
        console.error(e);
        return c.json({ data: { projects: [], total: 0, totalPages: 0 } });
    }
});

app.get('/api/public/projects', async (c) => {
    try {
        const url = new URL(c.req.url);
        const type = url.searchParams.get('type') || 'all';
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '9');

        const data: any = await firestoreRequest(c, 'GET', '/projects?pageSize=1000');
        let projects = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });

        projects = projects.filter((p: any) => p.status === 'Completed' && p.isPublic === true);

        if (type !== 'all') {
            projects = projects.filter((p: any) => p.project_type === type || p.systemType === type);
        }

        projects.sort((a: any, b: any) => {
            const timeA = a.completedAt ? new Date(a.completedAt).getTime() : a.created_at;
            const timeB = b.completedAt ? new Date(b.completedAt).getTime() : b.created_at;
            return timeB - timeA;
        });

        const totalPages = Math.ceil(projects.length / limit) || 1;
        const start = (page - 1) * limit;
        const paginated = projects.slice(start, start + limit);

        return c.json({
            projects: paginated,
            totalPages,
            currentPage: page
        });
    } catch (e: any) {
        console.error(e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

// Public settings (config + contact info merged)
app.get('/api/public/settings', async (c) => {
    try {
        const [configData, contactData]: any = await Promise.all([
            firestoreRequest(c, 'GET', '/settings/config').catch(() => null),
            firestoreRequest(c, 'GET', '/settings/contact_info').catch(() => null),
        ]);
        const config = configData ? fromFirestore(configData) : { systemTypes: [], modules: [] };
        const contact = contactData ? fromFirestore(contactData) : {};
        return c.json({ data: { ...config, contact } });
    } catch {
        return c.json({ data: { systemTypes: [], modules: [], contact: {} } });
    }
});

// Legacy: Public config endpoint (backward compat)
app.get('/api/config', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', '/settings/config');
        const config = fromFirestore(data);
        return c.json({ data: config });
    } catch {
        return c.json({ data: { systemTypes: [], modules: [] } });
    }
});

// ── Public: Contact Info (legacy) ──
app.get('/api/public/contact-info', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', '/settings/contact_info');
        return c.json({ data: fromFirestore(data) });
    } catch {
        return c.json({
            data: {
                email: 'hello@julesstudio.vn',
                phone: '(+84) 90 123 4567',
                zalo: '',
                messenger: '',
                address: 'Saigon Centre, Quận 1, TP.HCM',
            }
        });
    }
});

// ── Public: Order Tracking ──
app.get('/api/public/track/:token', async (c) => {
    try {
        const token = c.req.param('token');
        // Search leads collection for matching trackingToken
        const data: any = await firestoreRequest(c, 'GET', '/leads?pageSize=1000');
        const leads = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });

        const lead = leads.find((l: any) => l.trackingToken === token);
        if (!lead) {
            return c.json({ error: 'Không tìm thấy đơn hàng' }, 404);
        }

        // Return limited data for public view
        return c.json({
            data: {
                status: lead.status,
                customerName: lead.customerName || lead.name,
                projectDescription: lead.projectDescription || lead.message,
                systemTypeName: lead.systemTypeName,
                startDate: lead.startDate,
                estimatedEndDate: lead.estimatedEndDate,
                attachments: (lead.attachments || []).map((a: any) => ({
                    id: a.id,
                    type: a.type,
                    fileName: a.fileName,
                    fileUrl: a.fileUrl,
                    uploadedAt: a.uploadedAt,
                })),
                statusHistory: lead.statusHistory || [],
                createdAt: lead.created_at || lead.createdAt,
                updatedAt: lead.updated_at || lead.updatedAt,
            }
        });
    } catch (e: any) {
        console.error(e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

// ── V3: Auth Routes (Public) ──
app.post('/api/auth/check-role', async (c) => {
    try {
        const authHeader = c.req.header('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return c.json({ role: 'customer' });
        }
        const token = authHeader.split(' ')[1];
        const { verifyIdToken } = await import('./utils/google-auth');
        const payload = await verifyIdToken(token, c.env.FIREBASE_PROJECT_ID);

        // Check if user is admin
        if (c.env.ADMINISTRATOR_EMAIL && payload.email === c.env.ADMINISTRATOR_EMAIL) {
            return c.json({ role: 'admin' });
        }
        return c.json({ role: 'customer' });
    } catch {
        return c.json({ role: 'customer' });
    }
});

app.post('/api/auth/register', async (c) => {
    try {
        const authHeader = c.req.header('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        const token = authHeader.split(' ')[1];
        const { verifyIdToken } = await import('./utils/google-auth');
        const payload = await verifyIdToken(token, c.env.FIREBASE_PROJECT_ID);

        const body = await c.req.json();
        const now = Date.now();

        const customerData = {
            uid: payload.sub || payload.user_id,
            email: payload.email || body.email,
            displayName: body.displayName || '',
            phone: body.phone || '',
            company: body.company || '',
            createdAt: now,
        };

        const firestoreDoc = { fields: toFirestore(customerData).mapValue.fields };
        const uid = payload.sub || payload.user_id;
        // Use PATCH to upsert (create or update)
        const allKeys = Object.keys(firestoreDoc.fields);
        const maskQuery = allKeys.map(k => `updateMask.fieldPaths=${k}`).join('&');
        await firestoreRequest(c, 'PATCH', `/customers/${uid}?${maskQuery}`, firestoreDoc);

        return c.json({ success: true });
    } catch (e: any) {
        console.error(e);
        return c.json({ error: e.message }, 500);
    }
});

// ── Public: Contact Form (submit lead) ──
app.post('/api/public/contact', async (c) => {
    try {
        const body = await c.req.json();

        const customerName = body.customerName || body.name || '';
        const email = body.email || '';

        if (!customerName || !email) {
            return c.json({ error: 'Missing required fields: name and email' }, 400);
        }

        const now = Date.now();
        const trackingToken = generateTrackingToken();

        // Check if user is authenticated (optional)
        let customerId = '';
        const authHeader = c.req.header('Authorization');
        if (authHeader?.startsWith('Bearer ')) {
            try {
                const token = authHeader.split(' ')[1];
                const { verifyIdToken } = await import('./utils/google-auth');
                const payload = await verifyIdToken(token, c.env.FIREBASE_PROJECT_ID);
                customerId = payload.sub || payload.user_id || '';
            } catch { /* not authenticated, that's fine */ }
        }

        const leadData = {
            name: customerName,
            customerName: customerName,
            email: email,
            phone: body.phone || '',
            company: body.company || '',
            website_type: body.website_type || body.websiteType || body.businessType || '',
            message: body.message || body.projectDescription || '',
            projectDescription: body.projectDescription || body.message || '',
            systemTypeId: body.systemTypeId || '',
            systemTypeName: body.systemTypeName || '',
            complexityLevel: body.complexityLevel || '',
            selectedModules: body.selectedModules || [],
            totalMinPrice: body.totalMinPrice || 0,
            totalMaxPrice: body.totalMaxPrice || 0,
            totalMinDays: body.totalMinDays || 0,
            totalMaxDays: body.totalMaxDays || 0,
            status: body.status || 'new',
            language: body.language || 'vi',
            environment: body.environment || c.env.ENVIRONMENT || 'development',
            notes: [],
            trackingToken: trackingToken,
            customerId: customerId,
            startDate: 0,
            estimatedEndDate: 0,
            attachments: [],
            statusHistory: [],
            cancelReason: '',
            created_at: now,
            updated_at: now,
        };

        const firestoreDoc = { fields: toFirestore(leadData).mapValue.fields };
        await firestoreRequest(c, 'POST', '/leads', firestoreDoc);

        return c.json({
            success: true,
            message: 'Lead submitted successfully',
            trackingToken: trackingToken,
        }, 200);
    } catch (e: any) {
        console.error(e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

// ── Public: Submit Project (from Configurator) ──
app.post('/api/public/submit-project', async (c) => {
    try {
        const body = await c.req.json();
        const { clientInfo, websiteType, websiteTypeName, selectedFeatures,
            estimatedTimeMin, estimatedTimeMax, estimatedPriceMin, estimatedPriceMax } = body;

        if (!clientInfo?.name || !clientInfo?.email || !clientInfo?.phone || !websiteType) {
            return c.json({ error: 'Missing required fields' }, 400);
        }

        const projectId = await generateProjectId(c);
        const now = Date.now();

        const projectData = {
            project_id: projectId,
            project_type: websiteType,
            project_type_name: websiteTypeName || '',
            selected_features: selectedFeatures || [],
            estimated_time_min: estimatedTimeMin || 0,
            estimated_time_max: estimatedTimeMax || 0,
            estimated_price_min: estimatedPriceMin || 0,
            estimated_price_max: estimatedPriceMax || 0,
            status: 'new',
            client_name: clientInfo.name,
            client_email: clientInfo.email,
            client_phone: clientInfo.phone,
            project_name: clientInfo.projectName || '',
            project_description: clientInfo.description || '',
            notes: [],
            planner_data: null,
            design_final_url: '',
            versions: [],
            created_at: now,
            updated_at: now,
        };

        const firestoreDoc = { fields: toFirestore(projectData).mapValue.fields };
        await firestoreRequest(c, 'POST', '/projects', firestoreDoc);

        const emailData = {
            clientName: clientInfo.name,
            clientEmail: clientInfo.email,
            websiteTypeName: websiteTypeName || websiteType,
            selectedFeatures: selectedFeatures || [],
            estimatedTimeMin,
            estimatedTimeMax,
            estimatedPriceMin,
            estimatedPriceMax,
            projectId,
            projectName: clientInfo.projectName,
        };

        const confirmEmail = buildConfirmationEmail(emailData);
        await sendEmail(c.env.EMAIL_API_KEY, confirmEmail);

        if (c.env.ADMINISTRATOR_EMAIL) {
            const adminEmail = buildAdminNotificationEmail(emailData, c.env.ADMINISTRATOR_EMAIL);
            await sendEmail(c.env.EMAIL_API_KEY, adminEmail);
        }

        return c.json({ success: true, project_id: projectId }, 200);
    } catch (e: any) {
        console.error(e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

// --------------------------------------------------------
// V3: CUSTOMER ROUTES (requires auth, any user)
// --------------------------------------------------------
const customerApp = new Hono<{ Bindings: Bindings; Variables: { user: any } }>();
customerApp.use('/*', customerAuthMiddleware);

// Get customer's orders
customerApp.get('/orders', async (c) => {
    try {
        const user: any = c.get('user');
        const uid = user.sub || user.user_id;

        const data: any = await firestoreRequest(c, 'GET', '/leads?pageSize=1000');
        const leads = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });

        // Filter by customerId matching this user's UID
        const customerLeads = leads.filter((l: any) => l.customerId === uid);
        customerLeads.sort((a: any, b: any) => (b.created_at || 0) - (a.created_at || 0));

        // Return limited data
        const orders = customerLeads.map((l: any) => ({
            id: l.id,
            status: l.status,
            customerName: l.customerName || l.name,
            projectDescription: l.projectDescription || l.message,
            systemTypeName: l.systemTypeName,
            startDate: l.startDate,
            estimatedEndDate: l.estimatedEndDate,
            trackingToken: l.trackingToken,
            attachments: l.attachments || [],
            statusHistory: l.statusHistory || [],
            createdAt: l.created_at || l.createdAt,
            updatedAt: l.updated_at || l.updatedAt,
        }));

        return c.json({ data: orders });
    } catch (e: any) {
        console.error(e);
        return c.json({ error: e.message }, 500);
    }
});

// Get single order detail
customerApp.get('/orders/:id', async (c) => {
    try {
        const user: any = c.get('user');
        const uid = user.sub || user.user_id;
        const id = c.req.param('id');

        const currentData: any = await firestoreRequest(c, 'GET', `/leads/${id}`);
        const lead = fromFirestore(currentData);

        // Verify ownership
        if (lead.customerId !== uid) {
            return c.json({ error: 'Forbidden' }, 403);
        }

        return c.json({
            data: {
                id,
                status: lead.status,
                customerName: lead.customerName || lead.name,
                email: lead.email,
                phone: lead.phone,
                company: lead.company,
                projectDescription: lead.projectDescription || lead.message,
                systemTypeName: lead.systemTypeName,
                startDate: lead.startDate,
                estimatedEndDate: lead.estimatedEndDate,
                trackingToken: lead.trackingToken,
                attachments: lead.attachments || [],
                statusHistory: lead.statusHistory || [],
                createdAt: lead.created_at || lead.createdAt,
                updatedAt: lead.updated_at || lead.updatedAt,
            }
        });
    } catch (e: any) {
        console.error(e);
        return c.json({ error: e.message }, 500);
    }
});

app.route('/api/customer', customerApp);

// --------------------------------------------------------
// ADMIN ROUTES
// --------------------------------------------------------

const adminApp = new Hono<{ Bindings: Bindings; Variables: { user: any } }>();
adminApp.use('/*', authMiddleware);

adminApp.get('/leads', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', '/leads?pageSize=100');
        const leads = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });

        leads.sort((a: any, b: any) => (b.created_at || 0) - (a.created_at || 0));
        return c.json(leads);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.get('/leads/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const data: any = await firestoreRequest(c, 'GET', `/leads/${id}`);
        return c.json({ id, ...fromFirestore(data) });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.get('/stats', async (c) => {
    try {
        const [leadsData, projectsData]: any = await Promise.all([
            firestoreRequest(c, 'GET', '/leads?pageSize=1000').catch(() => ({ documents: [] })),
            firestoreRequest(c, 'GET', '/projects?pageSize=1000').catch(() => ({ documents: [] }))
        ]);

        const leads = (leadsData.documents || []).map(fromFirestore);
        const projects = (projectsData.documents || []).map(fromFirestore);

        const totalLeads = leads.length;
        const newLeads = leads.filter((l: any) => l.status === 'new').length;
        const acceptedLeads = leads.filter((l: any) => l.status === 'accepted').length;
        const inProgressLeads = leads.filter((l: any) =>
            ['contract', 'briefing', 'designing'].includes(l.status)
        ).length;
        const completedProjects = leads.filter((l: any) => l.status === 'completed').length;
        const totalRevenue = projects.reduce((sum: number, p: any) => sum + (Number(p.estimated_price_min) || 0), 0);

        return c.json({
            data: {
                totalLeads,
                newLeads,
                acceptedLeads,
                inProgressLeads,
                completedProjects,
                totalRevenue
            }
        });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// V3: Enhanced lead update — supports status, dates, cancelReason
adminApp.patch('/leads/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const user: any = c.get('user');

        const allowedFields = ['status', 'startDate', 'estimatedEndDate', 'cancelReason'];
        const fields: any = { updated_at: { integerValue: Date.now().toString() } };
        const masks = ['updated_at'];

        // If status is changing, record in statusHistory
        if (body.status) {
            // Fetch current lead to get old status
            const currentData: any = await firestoreRequest(c, 'GET', `/leads/${id}`);
            const currentLead = fromFirestore(currentData);
            const oldStatus = currentLead.status || 'new';

            if (oldStatus !== body.status) {
                const history = Array.isArray(currentLead.statusHistory) ? currentLead.statusHistory : [];
                history.push({
                    from: oldStatus,
                    to: body.status,
                    changedBy: user.email,
                    changedAt: Date.now(),
                    reason: body.cancelReason || '',
                });
                fields.statusHistory = { arrayValue: { values: history.map(toFirestore) } };
                masks.push('statusHistory');
            }
        }

        for (const key of allowedFields) {
            if (body[key] !== undefined) {
                fields[key] = toFirestore(body[key]);
                masks.push(key);
            }
        }

        const maskQuery = masks.map(m => `updateMask.fieldPaths=${m}`).join('&');
        const result = await firestoreRequest(c, 'PATCH', `/leads/${id}?${maskQuery}`, { fields });
        return c.json({ success: true, id, ...fromFirestore(result) });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.post('/leads/:id/note', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const user: any = c.get('user');

        if (!body.content) return c.json({ error: 'Missing note content' }, 400);

        const currentData: any = await firestoreRequest(c, 'GET', `/leads/${id}`);
        const lead = fromFirestore(currentData);
        const notes = Array.isArray(lead.notes) ? lead.notes : [];

        const newNote = {
            content: body.content,
            created_by: user.email,
            created_at: Date.now()
        };
        notes.push(newNote);

        const updateData = {
            fields: {
                notes: { arrayValue: { values: notes.map(toFirestore) } },
                updated_at: { integerValue: Date.now().toString() }
            }
        };

        const path = `/leads/${id}?updateMask.fieldPaths=notes&updateMask.fieldPaths=updated_at`;
        await firestoreRequest(c, 'PATCH', path, updateData);
        return c.json({ success: true, note: newNote });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// V3: Upload attachment (contract/brief/design) to lead
adminApp.post('/leads/:id/attachment', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const user: any = c.get('user');

        if (!body.fileName || !body.fileUrl || !body.type) {
            return c.json({ error: 'Missing fileName, fileUrl, or type' }, 400);
        }

        const currentData: any = await firestoreRequest(c, 'GET', `/leads/${id}`);
        const lead = fromFirestore(currentData);
        const attachments = Array.isArray(lead.attachments) ? lead.attachments : [];

        const newAttachment = {
            id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            type: body.type,
            fileName: body.fileName,
            fileUrl: body.fileUrl,
            uploadedAt: Date.now(),
            uploadedBy: user.email,
        };
        attachments.push(newAttachment);

        const updateData = {
            fields: {
                attachments: { arrayValue: { values: attachments.map(toFirestore) } },
                updated_at: { integerValue: Date.now().toString() }
            }
        };

        const path = `/leads/${id}?updateMask.fieldPaths=attachments&updateMask.fieldPaths=updated_at`;
        await firestoreRequest(c, 'PATCH', path, updateData);
        return c.json({ success: true, attachment: newAttachment });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// V3: Delete attachment from lead
adminApp.delete('/leads/:id/attachment/:attachmentId', async (c) => {
    try {
        const id = c.req.param('id');
        const attachmentId = c.req.param('attachmentId');

        const currentData: any = await firestoreRequest(c, 'GET', `/leads/${id}`);
        const lead = fromFirestore(currentData);
        const attachments = Array.isArray(lead.attachments) ? lead.attachments : [];

        const filtered = attachments.filter((a: any) => a.id !== attachmentId);

        const updateData = {
            fields: {
                attachments: filtered.length > 0
                    ? { arrayValue: { values: filtered.map(toFirestore) } }
                    : { arrayValue: { values: [] } },
                updated_at: { integerValue: Date.now().toString() }
            }
        };

        const path = `/leads/${id}?updateMask.fieldPaths=attachments&updateMask.fieldPaths=updated_at`;
        await firestoreRequest(c, 'PATCH', path, updateData);
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// ── ADMIN: Projects ──

adminApp.get('/projects', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', '/projects?pageSize=200');
        const projects = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });
        projects.sort((a: any, b: any) => (b.created_at || 0) - (a.created_at || 0));
        return c.json(projects);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.get('/projects/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const data: any = await firestoreRequest(c, 'GET', `/projects/${id}`);
        return c.json({ id, ...fromFirestore(data) });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.patch('/projects/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const allowedFields = ['status', 'project_name', 'project_description', 'project_type',
            'project_type_name', 'selected_features', 'estimated_time_min', 'estimated_time_max',
            'estimated_price_min', 'estimated_price_max', 'planner_data', 'design_final_url', 'versions',
            'isPublic', 'completedAt', 'systemType', 'websiteUrl'];

        const fields: any = { updated_at: { integerValue: Date.now().toString() } };
        const masks = ['updated_at'];

        for (const key of allowedFields) {
            if (body[key] !== undefined) {
                fields[key] = toFirestore(body[key]);
                masks.push(key);
            }
        }

        const maskQuery = masks.map(m => `updateMask.fieldPaths=${m}`).join('&');
        const result = await firestoreRequest(c, 'PATCH', `/projects/${id}?${maskQuery}`, { fields });
        return c.json({ success: true, id, ...fromFirestore(result) });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.post('/projects', async (c) => {
    try {
        const body = await c.req.json();
        const projectId = await generateProjectId(c);
        const now = Date.now();

        const projectData = {
            project_id: projectId,
            project_type: body.project_type || 'custom',
            project_type_name: body.project_type_name || 'Dự án tùy chỉnh',
            selected_features: body.selected_features || [],
            estimated_time_min: body.estimated_time_min || 0,
            estimated_time_max: body.estimated_time_max || 0,
            estimated_price_min: body.estimated_price_min || 0,
            estimated_price_max: body.estimated_price_max || 0,
            status: 'new',
            client_name: body.client_name || '',
            client_email: body.client_email || '',
            client_phone: body.client_phone || '',
            project_name: body.project_name || '',
            project_description: body.project_description || '',
            notes: [],
            planner_data: null,
            design_final_url: '',
            versions: [],
            created_at: now,
            updated_at: now,
        };

        const firestoreDoc = { fields: toFirestore(projectData).mapValue.fields };
        await firestoreRequest(c, 'POST', '/projects', firestoreDoc);
        return c.json({ success: true, project_id: projectId }, 201);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.post('/projects/:id/note', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const user: any = c.get('user');

        if (!body.content) return c.json({ error: 'Missing note content' }, 400);

        const currentData: any = await firestoreRequest(c, 'GET', `/projects/${id}`);
        const project = fromFirestore(currentData);
        const notes = Array.isArray(project.notes) ? project.notes : [];

        const newNote = { content: body.content, created_by: user.email, created_at: Date.now() };
        notes.push(newNote);

        const updateData = {
            fields: {
                notes: { arrayValue: { values: notes.map(toFirestore) } },
                updated_at: { integerValue: Date.now().toString() }
            }
        };

        const path = `/projects/${id}?updateMask.fieldPaths=notes&updateMask.fieldPaths=updated_at`;
        await firestoreRequest(c, 'PATCH', path, updateData);
        return c.json({ success: true, note: newNote });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// ── ADMIN: Showcase Projects (portfolio CRUD) ──

adminApp.get('/showcase-projects', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', '/showcase_projects?pageSize=500');
        const projects = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });
        projects.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
        return c.json(projects);
    } catch (e: any) {
        return c.json([]);
    }
});

adminApp.post('/showcase-projects', async (c) => {
    try {
        const body = await c.req.json();
        const now = Date.now();

        const projectData = {
            title: body.title || '',
            link: body.link || '',
            description: body.description || '',
            category: body.category || '',
            previewImage: body.previewImage || '',
            status: body.status || 'coming_soon',
            completionDate: body.completionDate || '',
            createdAt: now,
            updatedAt: now,
        };

        const firestoreDoc = { fields: toFirestore(projectData).mapValue.fields };
        const result = await firestoreRequest(c, 'POST', '/showcase_projects', firestoreDoc);
        const id = result.name?.split('/').pop() || '';
        return c.json({ success: true, id }, 201);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.patch('/showcase-projects/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const allowedFields = ['title', 'link', 'description', 'category', 'previewImage', 'status', 'completionDate'];

        const fields: any = { updatedAt: { integerValue: Date.now().toString() } };
        const masks = ['updatedAt'];

        for (const key of allowedFields) {
            if (body[key] !== undefined) {
                fields[key] = toFirestore(body[key]);
                masks.push(key);
            }
        }

        const maskQuery = masks.map(m => `updateMask.fieldPaths=${m}`).join('&');
        const result = await firestoreRequest(c, 'PATCH', `/showcase_projects/${id}?${maskQuery}`, { fields });
        return c.json({ success: true, id, ...fromFirestore(result) });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.delete('/showcase-projects/:id', async (c) => {
    try {
        const id = c.req.param('id');
        await firestoreRequest(c, 'DELETE', `/showcase_projects/${id}`);
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// ── ADMIN: Settings ──

adminApp.get('/contact-info', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', `/settings/contact_info`);
        return c.json({ data: fromFirestore(data) });
    } catch {
        return c.json({ data: { email: '', phone: '', zalo: '', messenger: '', address: '' } });
    }
});

adminApp.put('/contact-info', async (c) => {
    try {
        const body = await c.req.json();
        const fields = toFirestore(body).mapValue?.fields || toFirestore({ data: body }).mapValue.fields;
        const allKeys = Object.keys(fields);
        const maskQuery = allKeys.map(k => `updateMask.fieldPaths=${k}`).join('&');
        await firestoreRequest(c, 'PATCH', `/settings/contact_info?${maskQuery}`, { fields });
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.get('/config', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', `/settings/config`);
        return c.json({ data: fromFirestore(data) });
    } catch {
        return c.json({ data: { systemTypes: [], modules: [] } });
    }
});

adminApp.get('/settings/:key', async (c) => {
    try {
        const key = c.req.param('key');
        const data: any = await firestoreRequest(c, 'GET', `/settings/${key}`);
        return c.json(fromFirestore(data));
    } catch {
        return c.json({});
    }
});

adminApp.patch('/config', async (c) => {
    try {
        const body = await c.req.json();
        const fields = toFirestore(body).mapValue?.fields || toFirestore({ data: body }).mapValue.fields;

        const allKeys = Object.keys(fields);
        const maskQuery = allKeys.map(k => `updateMask.fieldPaths=${k}`).join('&');
        await firestoreRequest(c, 'PATCH', `/settings/config?${maskQuery}`, { fields });
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.put('/settings/:key', async (c) => {
    try {
        const key = c.req.param('key');
        const body = await c.req.json();
        const fields = toFirestore(body).mapValue?.fields || toFirestore({ data: body }).mapValue.fields;

        const allKeys = Object.keys(fields);
        const maskQuery = allKeys.map(k => `updateMask.fieldPaths=${k}`).join('&');
        await firestoreRequest(c, 'PATCH', `/settings/${key}?${maskQuery}`, { fields });
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// ── ADMIN: AI Proxy ──
adminApp.post('/ai/clarify', async (c) => {
    try {
        const body = await c.req.json();
        const context = body.context;

        let aiSettings: any = null;
        try {
            const data: any = await firestoreRequest(c, 'GET', '/settings/ai');
            aiSettings = fromFirestore(data);
        } catch { }

        if (!aiSettings || !aiSettings.api_key) {
            return c.json({ error: 'Chưa cấu hình API Key. Vui lòng cập nhật trong Cài đặt.' }, 400);
        }

        const provider = aiSettings.provider || 'openai';
        const apiKey = aiSettings.api_key;

        const systemPrompt = `Bạn là một chuyên gia phân tích nghiệp vụ phần mềm (Business Analyst). Đọc mô tả dự án và liệt kê 3 đến 5 câu hỏi cực kỳ cụ thể cần làm rõ với khách hàng. Không hỏi các câu chung chung. Trả về đúng định dạng JSON: { "questions": ["Câu 1...", "Câu 2..."] }`;
        const userPrompt = `Mô tả dự án:\n${context}`;

        let textResponse = '';

        if (provider === 'openai') {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    response_format: { type: "json_object" },
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ]
                })
            });
            if (!res.ok) throw new Error('OpenAI API Error');
            const data = await res.json();
            textResponse = data.choices[0].message.content;
        } else if (provider === 'google') {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: { text: systemPrompt } },
                    contents: [{ parts: [{ text: userPrompt }] }],
                    generationConfig: { responseMimeType: "application/json" }
                })
            });
            if (!res.ok) throw new Error('Gemini API Error');
            const data = await res.json();
            textResponse = data.candidates[0].content.parts[0].text;
        } else if (provider === 'anthropic') {
            const res = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'claude-3-5-sonnet-latest',
                    max_tokens: 1000,
                    system: systemPrompt,
                    messages: [{ role: 'user', content: userPrompt }]
                })
            });
            if (!res.ok) throw new Error('Anthropic API Error');
            const data = await res.json();
            textResponse = data.content[0].text;
        }

        try {
            const jsonStart = textResponse.indexOf('{');
            const jsonEnd = textResponse.lastIndexOf('}') + 1;
            const cleanJson = textResponse.slice(jsonStart, jsonEnd);
            const parsed = JSON.parse(cleanJson);
            return c.json(parsed);
        } catch {
            return c.json({ error: 'AI trả về định dạng không hợp lệ.', raw: textResponse }, 500);
        }
    } catch (e: any) {
        console.error(e);
        return c.json({ error: e.message || 'Lỗi gọi AI API' }, 500);
    }
});

// ── ADMIN: Upload & Export ──
adminApp.post('/projects/:id/upload-design', async (c) => {
    try {
        const id = c.req.param('id');
        const formData = await c.req.parseBody();
        const file = formData['file'] as File;

        if (!file) return c.json({ error: 'No file uploaded' }, 400);

        const bucket = (c.env as any).DESIGN_BUCKET;
        if (!bucket) return c.json({ error: 'R2 Bucket not configured' }, 500);

        const path = `projects/${id}/${Date.now()}_${file.name}`;
        await bucket.put(path, await file.arrayBuffer(), {
            httpMetadata: { contentType: file.type }
        });

        const fields = { design_final_url: { stringValue: path }, updated_at: { integerValue: Date.now().toString() } };
        await firestoreRequest(c, 'PATCH', `/projects/${id}?updateMask.fieldPaths=design_final_url&updateMask.fieldPaths=updated_at`, { fields });

        return c.json({ success: true, url: path });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.post('/projects/:id/send-brief', async (c) => {
    try {
        const id = c.req.param('id');
        const currentData: any = await firestoreRequest(c, 'GET', `/projects/${id}`);
        const project = fromFirestore(currentData);

        const body = await c.req.json().catch(() => ({}));

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #6d28d9;">Technical Brief: ${project.project_name || 'Dự án Jules Studio'}</h2>
                <p>Chào <strong>${project.client_name}</strong>,</p>
                <p>Chúng tôi gửi bạn bản đặc tả kỹ thuật (Technical Brief) cho dự án của bạn.</p>
                <p>Vui lòng xem file đính kèm để biết thêm chi tiết về phạm vi, tính năng, và thông số kỹ thuật.</p>
                <br/>
                <p>Trân trọng,<br/><strong>Jules Studio Team</strong></p>
            </div>
        `;

        const attachments = body.md ? [{
            filename: 'Technical_Brief.md',
            content: btoa(unescape(encodeURIComponent(body.md)))
        }] : [];

        await sendEmail(c.env.EMAIL_API_KEY, {
            to: project.client_email,
            subject: `[Jules Studio] Technical Brief - Dự án ${project.project_name || id}`,
            html: htmlContent,
            attachments
        });

        const fields = { status: { stringValue: 'brief_sent' }, updated_at: { integerValue: Date.now().toString() } };
        await firestoreRequest(c, 'PATCH', `/projects/${id}?updateMask.fieldPaths=status&updateMask.fieldPaths=updated_at`, { fields });

        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// ── ADMIN: Intake Projects (Project Intake Module) ──

adminApp.get('/intake-projects', async (c) => {
    try {
        const data: any = await firestoreRequest(c, 'GET', '/intake_projects?pageSize=500');
        const projects = (data.documents || []).map((doc: any) => {
            const id = doc.name.split('/').pop();
            return { id, ...fromFirestore(doc) };
        });
        projects.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
        return c.json({ data: projects });
    } catch (e: any) {
        return c.json({ data: [] });
    }
});

adminApp.get('/intake-projects/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const data: any = await firestoreRequest(c, 'GET', `/intake_projects/${id}`);
        return c.json({ data: { id, ...fromFirestore(data) } });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.post('/intake-projects', async (c) => {
    try {
        const body = await c.req.json();
        const now = Date.now();

        const intakeData = {
            projectName: body.projectName || '',
            clientName: body.clientName || '',
            clientEmail: body.clientEmail || '',
            clientCompany: body.clientCompany || '',
            description: body.description || '',
            referenceUrls: body.referenceUrls || [],
            domain: body.domain || '',
            deadline: body.deadline || 0,
            systemTypeId: body.systemTypeId || '',
            systemTypeName: body.systemTypeName || '',
            selectedPages: body.selectedPages || [],
            selectedModuleIds: body.selectedModuleIds || [],
            designBrief: body.designBrief || {
                style: '', colorScheme: '', font: '',
                layout: '', animations: [], responsive: '',
            },
            totalMinDays: body.totalMinDays || 0,
            totalMaxDays: body.totalMaxDays || 0,
            totalMinPrice: body.totalMinPrice || 0,
            totalMaxPrice: body.totalMaxPrice || 0,
            pricePerDay: body.pricePerDay || 0,
            status: body.status || 'draft',
            createdAt: now,
            updatedAt: now,
        };

        const firestoreDoc = { fields: toFirestore(intakeData).mapValue.fields };
        const result = await firestoreRequest(c, 'POST', '/intake_projects', firestoreDoc);
        const id = result.name?.split('/').pop() || '';
        return c.json({ success: true, id }, 201);
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.patch('/intake-projects/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const allowedFields = [
            'projectName', 'clientName', 'clientEmail', 'clientCompany',
            'description', 'referenceUrls', 'domain', 'deadline',
            'systemTypeId', 'systemTypeName', 'selectedPages', 'selectedModuleIds',
            'designBrief', 'totalMinDays', 'totalMaxDays',
            'totalMinPrice', 'totalMaxPrice', 'pricePerDay', 'status',
        ];

        const fields: any = { updatedAt: { integerValue: Date.now().toString() } };
        const masks = ['updatedAt'];

        for (const key of allowedFields) {
            if (body[key] !== undefined) {
                fields[key] = toFirestore(body[key]);
                masks.push(key);
            }
        }

        const maskQuery = masks.map(m => `updateMask.fieldPaths=${m}`).join('&');
        const result = await firestoreRequest(c, 'PATCH', `/intake_projects/${id}?${maskQuery}`, { fields });
        return c.json({ success: true, id, ...fromFirestore(result) });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

adminApp.delete('/intake-projects/:id', async (c) => {
    try {
        const id = c.req.param('id');
        await firestoreRequest(c, 'DELETE', `/intake_projects/${id}`);
        return c.json({ success: true });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// ── ADMIN: Upload Image to Cloudinary ──
adminApp.post('/upload-image', async (c) => {
    try {
        const contentType = c.req.header('Content-Type') || '';
        let imageBlob: Blob;
        let folder = 'julesstudio';

        if (contentType.includes('multipart/form-data')) {
            const formData = await c.req.formData();
            const file = formData.get('file');
            folder = (formData.get('folder') as string) || folder;
            if (!file || !(file instanceof Blob)) {
                return c.json({ error: 'Missing file' }, 400);
            }
            imageBlob = file;
        } else {
            // Raw binary body (WebP blob)
            const buffer = await c.req.arrayBuffer();
            if (buffer.byteLength === 0) {
                return c.json({ error: 'Empty body' }, 400);
            }
            folder = c.req.query('folder') || folder;
            imageBlob = new Blob([buffer], { type: 'image/webp' });
        }

        if (imageBlob.size > 5 * 1024 * 1024) {
            return c.json({ error: 'File quá lớn (tối đa 5MB)' }, 400);
        }

        // Generate Cloudinary signature
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const paramsToSign = `folder=${folder}&timestamp=${timestamp}${c.env.CLOUDINARY_API_SECRET}`;

        const encoder = new TextEncoder();
        const data = encoder.encode(paramsToSign);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // Upload to Cloudinary
        const uploadForm = new FormData();
        uploadForm.append('file', imageBlob, `upload-${Date.now()}.webp`);
        uploadForm.append('api_key', c.env.CLOUDINARY_API_KEY);
        uploadForm.append('timestamp', timestamp);
        uploadForm.append('signature', signature);
        uploadForm.append('folder', folder);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
        const res = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: uploadForm,
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error('Cloudinary error:', errText);
            return c.json({ error: 'Upload failed' }, 500);
        }

        const result: any = await res.json();
        return c.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
        });
    } catch (e: any) {
        console.error('Upload error:', e);
        return c.json({ error: e.message || 'Upload failed' }, 500);
    }
});

app.route('/api/admin', adminApp);

export default app;
