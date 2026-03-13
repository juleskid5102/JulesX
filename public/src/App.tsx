import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import PortfolioItem from './pages/PortfolioItem'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import ConfigBuilder from './pages/ConfigBuilder'
import OrderTracking from './pages/OrderTracking'

import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLeads from './pages/admin/Leads'
import AdminProjects from './pages/admin/Projects'
import AdminOrders from './pages/admin/Orders'
import AdminSettings from './pages/admin/Settings'
import ProtectedRoute from './components/auth/ProtectedRoute'

import { ContactFAB } from './components/ContactFAB'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/du-an" element={<Portfolio />} />
        <Route path="/du-an/:id" element={<PortfolioItem />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/dich-vu" element={<Services />} />
        <Route path="/bao-gia" element={<ConfigBuilder />} />
        <Route path="/theo-doi/:token" element={<OrderTracking />} />

        {/* Admin Routes — Protected, requires auth + admin role */}
        <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      {/* Global Components */}
      <ContactFAB />
      <PWAInstallPrompt />
    </>
  )
}
