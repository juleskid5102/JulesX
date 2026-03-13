import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import Projects from './pages/Projects'
import Orders from './pages/Orders'
import Settings from './pages/Settings'

import { PWAInstallPrompt } from './components/PWAInstallPrompt'

/**
 * Admin App — Standalone admin dashboard
 * All routes at root level (no /admin prefix)
 * Requires authentication + admin role
 */
export default function App() {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400 font-medium">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user || role !== 'admin') {
    // Redirect to public site login
    const publicUrl = import.meta.env.VITE_PUBLIC_URL || 'https://julesstudio.pages.dev'
    window.location.href = `${publicUrl}/dang-nhap`
    return null
  }

  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="projects" element={<Projects />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PWAInstallPrompt />
    </>
  )
}
