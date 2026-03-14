// useApi — shared fetch wrapper with auth token injection
import { useAuth } from './useAuth'
import { useCallback } from 'react'
import { API_BASE } from '../config/site'

interface ApiOptions extends Omit<RequestInit, 'body'> {
    body?: unknown
    auth?: boolean
}

/**
 * Shared API hook — automatically injects auth token for authenticated requests
 * Usage:
 *   const api = useApi()
 *   const data = await api.get('/api/public/portfolio')
 *   const result = await api.post('/api/admin/leads', { name: 'Test' })
 */
export function useApi() {
    const { getIdToken } = useAuth()

    const request = useCallback(async <T = unknown>(
        endpoint: string,
        options: ApiOptions = {},
    ): Promise<T> => {
        const { body, auth = false, headers: extraHeaders, ...rest } = options

        const headers: Record<string, string> = {
            ...(extraHeaders as Record<string, string>),
        }

        if (auth) {
            const token = await getIdToken()
            if (token) headers['Authorization'] = `Bearer ${token}`
        }

        if (body && !(body instanceof FormData)) {
            headers['Content-Type'] = 'application/json'
        }

        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...rest,
            headers,
            body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
        })

        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
            throw new Error((err as any).error || `Request failed: ${res.status}`)
        }

        return res.json() as Promise<T>
    }, [getIdToken])

    return {
        get: <T = unknown>(endpoint: string, auth = false) =>
            request<T>(endpoint, { method: 'GET', auth }),
        post: <T = unknown>(endpoint: string, body?: unknown, auth = false) =>
            request<T>(endpoint, { method: 'POST', body, auth }),
        patch: <T = unknown>(endpoint: string, body?: unknown, auth = false) =>
            request<T>(endpoint, { method: 'PATCH', body, auth }),
        del: <T = unknown>(endpoint: string, auth = false) =>
            request<T>(endpoint, { method: 'DELETE', auth }),
        request,
    }
}
