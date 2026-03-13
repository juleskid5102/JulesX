import { SignJWT, importPKCS8, jwtVerify, importX509 } from 'jose';

// Firebase Admin (Service Account) OAuth Token Generation
let cachedToken = '';
let tokenExpiration = 0;

export async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
    if (cachedToken && Date.now() < tokenExpiration) {
        return cachedToken;
    }

    const alg = 'RS256';
    const key = await importPKCS8(privateKey, alg);

    const jwt = await new SignJWT({
        iss: clientEmail,
        sub: clientEmail,
        aud: 'https://oauth2.googleapis.com/token',
        scope: 'https://www.googleapis.com/auth/datastore'
    })
        .setProtectedHeader({ alg, typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(key);

    const params = new URLSearchParams();
    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    params.append('assertion', jwt);

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${await response.text()}`);
    }

    const data: any = await response.json();
    cachedToken = data.access_token;
    tokenExpiration = Date.now() + (data.expires_in - 300) * 1000; // cache until 5 mins before expiry
    return cachedToken;
}

// Client ID Token Verification
let cachedCerts: Record<string, string> | null = null;
let certsExpiration = 0;

async function getGooglePublicKeys() {
    if (cachedCerts && Date.now() < certsExpiration) {
        return cachedCerts;
    }

    const res = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
    const cacheControl = res.headers.get('cache-control');
    let maxAge = 3600;
    if (cacheControl) {
        const match = cacheControl.match(/max-age=(\d+)/);
        if (match) maxAge = parseInt(match[1], 10);
    }

    cachedCerts = await res.json() as Record<string, string>;
    certsExpiration = Date.now() + (maxAge * 1000);
    return cachedCerts;
}

export async function verifyIdToken(token: string, projectId: string) {
    const certs = await getGooglePublicKeys();

    const headerB64 = token.split('.')[0];
    const headerStr = atob(headerB64.replace(/-/g, '+').replace(/_/g, '/'));
    const header = JSON.parse(headerStr);
    const kid = header.kid;

    const cert = certs[kid];
    if (!cert) throw new Error('Public key not found or expired');

    const publicKey = await importX509(cert, 'RS256');
    const { payload } = await jwtVerify(token, publicKey, {
        issuer: `https://securetoken.google.com/${projectId}`,
        audience: projectId,
    });

    return payload; // Returns decoded user info (uid, email, etc.)
}
