// PWAInstallPrompt — "Cài đặt ứng dụng" prompt (beforeinstallprompt API)
// Adapted for Jules Studio — shows on admin pages
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [dismissed, setDismissed] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)
        }
        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    // Show on /admin pages only
    const isAdminPage = location.pathname.startsWith('/admin')
    if (!deferredPrompt || !isAdminPage || dismissed) return null

    const handleInstall = async () => {
        deferredPrompt.prompt()
        const result = await deferredPrompt.userChoice
        if (result.outcome === 'accepted') {
            setDeferredPrompt(null)
        }
    }

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3.5 shadow-2xl flex items-center gap-3 z-[9999] text-sm font-semibold animate-[fadeInUp_0.3s_ease] max-w-[calc(100vw-48px)]">
            <span className="material-symbols-outlined text-xl">install_mobile</span>
            <div className="flex-1">
                <div className="font-bold text-sm">Cài đặt ứng dụng</div>
                <div className="text-xs opacity-85 mt-0.5">Quản lý dự án nhanh hơn</div>
            </div>
            <button
                onClick={handleInstall}
                className="px-4 py-2 bg-white text-primary font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
                Cài đặt
            </button>
            <button
                onClick={() => setDismissed(true)}
                className="p-1 text-white/70 hover:text-white"
            >
                <span className="material-symbols-outlined text-lg">close</span>
            </button>
        </div>
    )
}
