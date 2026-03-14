// Auth Middleware for Hono — Verify Firebase ID Token using Google JWK
// Uses Web Crypto API (native in Cloudflare Workers) for RS256 signature verification
// Adapted from .agents/patterns/worker-firebase/auth-middleware.ts

import { Context, Next } from 'hono';

// ─── Types ───────────────────────────────────────────────────────

export type Env = {
    Bindings: {
        FIREBASE_PROJECT_ID: string;
        FIREBASE_CLIENT_EMAIL: string;
        FIREBASE_PRIVATE_KEY: string;
    };
    Variables: {
        user: { uid: string; email?: string; emailVerified?: boolean; admin?: boolean };
    };
};

// ─── JWK Cache ───────────────────────────────────────────────────

interface CachedKeys {
    keys: Record<string, CryptoKey>;
    expiry: number;
}

let keyCache: CachedKeys | null = null;

async function getPublicKeys(): Promise<Record<string, CryptoKey>> {
    const now = Date.now();
    if (keyCache && now < keyCache.expiry) {
        return keyCache.keys;
    }

    const res = await fetch(
        'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch JWK keys: ${res.status}`);
    }

    const cacheControl = res.headers.get('cache-control') || '';
    const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) * 1000 : 3600_000;

    const jwks = (await res.json()) as { keys: Array<JsonWebKey & { kid: string }> };
    const keys: Record<string, CryptoKey> = {};

    for (const jwk of jwks.keys) {
        if (!jwk.kid) continue;
        try {
            const cryptoKey = await crypto.subtle.importKey(
                'jwk',
                jwk,
                { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
                false,
                ['verify']
            );
            keys[jwk.kid] = cryptoKey;
        } catch {
            // Skip malformed keys
        }
    }

    keyCache = { keys, expiry: now + maxAge };
    return keys;
}

// ─── JWT Helpers ─────────────────────────────────────────────────

function base64urlToArrayBuffer(b64url: string): ArrayBuffer {
    const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    const padded = pad ? b64 + '='.repeat(4 - pad) : b64;
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

function decodeJwtPart(part: string): any {
    const json = new TextDecoder().decode(new Uint8Array(base64urlToArrayBuffer(part)));
    return JSON.parse(json);
}

// ─── Token Verification ─────────────────────────────────────────

async function verifyFirebaseToken(
    idToken: string,
    projectId: string
): Promise<{ uid: string; email?: string; emailVerified?: boolean; admin?: boolean }> {
    const parts = idToken.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid token format');
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    // 1. Decode header to get kid
    const header = decodeJwtPart(headerB64);
    if (header.alg !== 'RS256') {
        throw new Error(`Unsupported algorithm: ${header.alg}`);
    }
    if (!header.kid) {
        throw new Error('Missing key ID in token header');
    }

    // 2. Get the matching public key
    let publicKeys = await getPublicKeys();
    let verifyKey = publicKeys[header.kid];

    if (!verifyKey) {
        // Keys might have rotated — force refresh
        keyCache = null;
        publicKeys = await getPublicKeys();
        verifyKey = publicKeys[header.kid];
        if (!verifyKey) {
            throw new Error('No matching public key found for token');
        }
    }

    // 3. Verify signature
    const signedContent = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const signature = new Uint8Array(base64urlToArrayBuffer(signatureB64));

    const isValid = await crypto.subtle.verify(
        'RSASSA-PKCS1-v1_5',
        verifyKey,
        signature,
        signedContent
    );

    if (!isValid) {
        throw new Error('Invalid token signature');
    }

    // 4. Validate claims
    const payload = decodeJwtPart(payloadB64);
    const now = Math.floor(Date.now() / 1000);

    if (!payload.exp || payload.exp < now) {
        throw new Error('Token expired');
    }

    if (!payload.iat || payload.iat > now + 300) {
        throw new Error('Token issued in the future');
    }

    const expectedIssuer = `https://securetoken.google.com/${projectId}`;
    if (payload.iss !== expectedIssuer) {
        throw new Error(`Invalid issuer: ${payload.iss}`);
    }

    if (payload.aud !== projectId) {
        throw new Error(`Invalid audience: ${payload.aud}`);
    }

    if (!payload.sub || typeof payload.sub !== 'string') {
        throw new Error('Missing subject');
    }

    return {
        uid: payload.sub,
        email: payload.email,
        emailVerified: payload.email_verified,
        admin: payload.admin === true,
    };
}

// ─── Hono Middleware ─────────────────────────────────────────────

/** Verify token + require admin claim */
export const adminAuth = async (c: Context<Env>, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized: Missing token' }, 401);
    }

    try {
        const token = authHeader.slice(7);
        const user = await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
        if (!user.admin) {
            return c.json({ error: 'Forbidden: Admin role required' }, 403);
        }
        c.set('user', user);
        await next();
    } catch (err: any) {
        console.error('Auth failed:', err.message);
        return c.json({ error: `Unauthorized: ${err.message}` }, 401);
    }
};

/** Verify token only (any authenticated user) */
export const customerAuth = async (c: Context<Env>, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized: Missing token' }, 401);
    }

    try {
        const token = authHeader.slice(7);
        const user = await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
        c.set('user', user);
        await next();
    } catch (err: any) {
        console.error('Auth failed:', err.message);
        return c.json({ error: `Unauthorized: ${err.message}` }, 401);
    }
};
