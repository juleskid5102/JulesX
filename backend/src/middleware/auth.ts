import { Context, Next } from 'hono';
import { verifyIdToken } from '../utils/google-auth';

type Bindings = {
    ENVIRONMENT: string;
    FIREBASE_PROJECT_ID: string;
    ADMINISTRATOR_EMAIL: string;
};

type Variables = {
    user: any;
};

// Admin-only middleware: verifies token AND checks admin email
export const authMiddleware = async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = await verifyIdToken(token, c.env.FIREBASE_PROJECT_ID);
        if (c.env.ADMINISTRATOR_EMAIL && payload.email !== c.env.ADMINISTRATOR_EMAIL) {
            return c.json({ error: 'Forbidden' }, 403);
        }
        c.set('user', payload);
        await next();
    } catch (err: any) {
        return c.json({ error: 'Invalid token: ' + err.message }, 401);
    }
};

// Customer middleware: verifies token only (any authenticated user)
export const customerAuthMiddleware = async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = await verifyIdToken(token, c.env.FIREBASE_PROJECT_ID);
        c.set('user', payload);
        await next();
    } catch (err: any) {
        return c.json({ error: 'Invalid token: ' + err.message }, 401);
    }
};
