import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import PortfolioItem from './pages/PortfolioItem'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import ConfigBuilder from './pages/ConfigBuilder'
import OrderTracking from './pages/OrderTracking'
import NotFound from './pages/NotFound'

import { ContactFAB } from './components/ContactFAB'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'
import ScrollToTop from './components/ScrollToTop'

/**
 * Public App — Customer-facing pages only
 * Admin dashboard is at admin-julesstudio.pages.dev
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/du-an" element={<Portfolio />} />
        <Route path="/du-an/:id" element={<PortfolioItem />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/dich-vu" element={<Services />} />
        <Route path="/bao-gia" element={<ConfigBuilder />} />
        <Route path="/theo-doi/:token" element={<OrderTracking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global Components */}
      <ContactFAB />
      <PWAInstallPrompt />
    </>
  )
}
