import { Link } from 'react-router-dom'
import { SITE, CONTACT, SOCIAL } from '../../config/site'

/**
 * Footer — EXACT copy from 02-portfolio.html (Stitch)
 * 
 * Source HTML:
 * <footer class="bg-black text-white py-20 px-6">
 *   <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
 *     <div>
 *       <h2 class="font-syne font-[800] text-3xl tracking-tighter mb-2">JULES STUDIO</h2>
 *       <p class="text-slate-400 text-sm max-w-xs">...</p>
 *     </div>
 *     <div class="flex flex-col md:flex-row gap-10 md:gap-20">
 *       <div class="flex flex-col gap-4">
 *         <p class="text-xs font-bold tracking-widest text-primary uppercase">Mạng xã hội</p>
 *         <a class="text-sm hover:text-primary transition-colors">DRIBBBLE</a>
 *         ...
 *       </div>
 *       <div class="flex flex-col gap-4">
 *         <p class="text-xs font-bold tracking-widest text-primary uppercase">Liên hệ</p>
 *         <a class="text-sm hover:text-primary transition-colors">HELLO@JULES.STUDIO</a>
 *         <p class="text-sm text-slate-400">TP. HỒ CHÍ MINH, VN</p>
 *       </div>
 *     </div>
 *   </div>
 *   <div class="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between text-[10px] tracking-widest text-slate-500 font-bold uppercase">
 *     <p>© 2026 Jules Studio. Mọi quyền được bảo lưu.</p>
 *     <div class="flex gap-8 mt-4 md:mt-0">
 *       <a>Chính sách bảo mật</a>
 *       <a>Điều khoản dịch vụ</a>
 *     </div>
 *   </div>
 * </footer>
 */
export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 px-6">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Brand */}
        <div>
          <Link to="/">
            <h2 className="font-heading font-[800] text-3xl tracking-tighter mb-2">
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
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest text-primary uppercase">
              Mạng xã hội
            </p>
            {Object.values(SOCIAL).map((s) => (
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

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-widest text-primary uppercase">
              Liên hệ
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-sm hover:text-primary transition-colors"
            >
              {CONTACT.email.toUpperCase()}
            </a>
            <p className="text-sm text-slate-400">{CONTACT.address.toUpperCase()}</p>
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
