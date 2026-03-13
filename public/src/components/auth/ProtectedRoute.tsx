import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * ProtectedRoute — Redirects to login if not authenticated
 * Optionally checks for admin role
 *
 * Usage:
 *   <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
 */
export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode
  requireAdmin?: boolean
}) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/dang-nhap" replace />
  }

  if (requireAdmin && role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
