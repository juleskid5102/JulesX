import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, SITE } from '../../config/site'

interface FooterData {
  email: string
  address: string
  social: Array<{ label: string; href: string }>
}

/**
 * Footer — Fetches contact + social from /api/public/site-settings
 */
export default function Footer() {
  const [data, setData] = useState<FooterData>({ email: '', address: '', social: [] })

  useEffect(() => {
    fetch(`${API_BASE}/api/public/site-settings`)
      .then(async (res) => {
        if (!res.ok) return
        const settings = await res.json()
        const social: Array<{ label: string; href: string }> = []
        if (settings.social?.dribbble) social.push({ label: 'DRIBBBLE', href: settings.social.dribbble })
        if (settings.social?.behance) social.push({ label: 'BEHANCE', href: settings.social.behance })
        if (settings.social?.linkedin) social.push({ label: 'LINKEDIN', href: settings.social.linkedin })

        setData({
          email: settings.email || settings.contactEmail || '',
          address: settings.address || settings.contactAddress || '',
          social,
        })
      })
      .catch(() => { /* silent */ })
  }, [])

  return (
    <footer className="bg-black text-white py-20 px-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Brand */}
        <div>
          <Link to="/">
            <h2 className="font-heading font-extrabold text-3xl tracking-tighter uppercase mb-2">
              JULES STUDIO
            </h2>
          </Link>
          <p className="text-slate-400 text-sm max-w-xs">
            {SITE.tagline}
          </p>
        </div>

        {/* Columns */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* Social */}
          {data.social.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold tracking-widest text-primary uppercase">
                Mạng xã hội
              </p>
              {data.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest text-primary uppercase">
              Liên hệ
            </p>
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="text-sm hover:text-primary transition-colors"
              >
                {data.email.toUpperCase()}
              </a>
            )}
            {data.address && (
              <p className="text-sm text-slate-400">{data.address.toUpperCase()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between text-[10px] tracking-widest text-slate-500 font-bold uppercase">
        <p>{SITE.copyright()}</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link to="/chinh-sach" className="hover:text-white transition-colors">
            Chính sách bảo mật
          </Link>
          <Link to="/dieu-khoan" className="hover:text-white transition-colors">
            Điều khoản dịch vụ
          </Link>
        </div>
      </div>
    </footer>
  )
}
