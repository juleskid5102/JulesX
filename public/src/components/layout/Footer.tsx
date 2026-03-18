import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE, SITE } from '../../config/site'
import ScrollReveal from '../ui/ScrollReveal'

interface FooterData {
  email: string
  address: string
  social: Array<{ label: string; href: string }>
}

/**
 * Footer — Dark premium, ScrollReveal animated
 * Fetches contact + social from /api/public/site-settings
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
    <footer className="bg-[#0a0a0a] text-white py-24 px-6 overflow-hidden">
      <ScrollReveal className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Brand */}
          <div>
            <Link to="/">
              <h2 className="font-heading font-extrabold text-3xl tracking-tighter uppercase mb-2">
                JULES STUDIO
              </h2>
            </Link>
            <p className="text-white/40 text-sm max-w-xs font-display">
              {SITE.tagline}
            </p>
          </div>

          {/* Columns */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            {/* Social */}
            {data.social.length > 0 && (
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
                  Mạng xã hội
                </p>
                {data.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-primary transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">
                Liên hệ
              </p>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="text-sm text-white/60 hover:text-primary transition-colors duration-300"
                >
                  {data.email.toUpperCase()}
                </a>
              )}
              {data.address && (
                <p className="text-sm text-white/40">{data.address.toUpperCase()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between text-[10px] tracking-[0.2em] text-white/30 font-semibold uppercase">
          <p>{SITE.copyright()}</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/chinh-sach" className="hover:text-white transition-colors duration-300">
              Chính sách bảo mật
            </Link>
            <Link to="/dieu-khoan" className="hover:text-white transition-colors duration-300">
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}
