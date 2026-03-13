import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * AdminLayout — Sidebar + header for admin dashboard
 * Routes are at ROOT level (/ /leads /projects /orders /settings)
 * since this is a standalone admin app
 */

const NAV_ITEMS = [
  { to: '/', icon: 'grid_view', label: 'Dashboard', end: true },
  { to: '/leads', icon: 'person_add', label: 'Leads' },
  { to: '/projects', icon: 'work', label: 'Dự Án' },
  { to: '/orders', icon: 'shopping_cart', label: 'Đơn Hàng' },
  { to: '/services', icon: 'design_services', label: 'Dịch Vụ' },
  { to: '/content', icon: 'article', label: 'Nội Dung' },
  { to: '/site-settings', icon: 'language', label: 'Cài Đặt Web' },
  { to: '/settings', icon: 'settings', label: 'Cài Đặt' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    // Redirect to public site login
    window.location.href = import.meta.env.VITE_PUBLIC_URL || 'https://julesstudio.pages.dev/dang-nhap'
  }

  return (
    <div className="flex h-screen w-full bg-white text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] h-full flex flex-col border-r border-[#f1f1f4] bg-white z-20 shrink-0">
        <div className="p-8 pb-12">
          <h1 className="font-heading text-xl font-bold tracking-tight text-primary">JULES STUDIO</h1>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 font-medium group transition-colors ${
                  isActive
                    ? 'bg-primary/5 text-primary border-l-2 border-primary'
                    : 'text-slate-500 hover:text-primary hover:bg-slate-50'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-6 border-t border-[#f1f1f4]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-[#f1f1f4]">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">person</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">{user?.displayName || 'Admin'}</span>
              <span className="text-xs text-slate-400">{user?.email || 'admin@jules.studio'}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-500 transition-colors w-full"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b border-[#f1f1f4] bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input
              className="w-full border-none focus:ring-0 pl-8 text-sm placeholder:text-slate-400 bg-transparent outline-none"
              placeholder="Search across CRM..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer">
              <span className="material-symbols-outlined text-slate-600">notifications</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
            </div>
            <a
              href={import.meta.env.VITE_PUBLIC_URL || 'https://julesstudio.pages.dev'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-slate-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              Site
            </a>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-[1400px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
