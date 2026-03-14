import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE } from '../config/site'

/**
 * Services — EXACT layout from 07-services.html
 * Data fetched from /api/public/services + /api/public/technologies
 */

interface Service {
  id?: string
  number: string
  title: string
  description: string
  tags: string[]
  bgImage: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [technologies, setTechnologies] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [svcRes, techRes] = await Promise.all([
          fetch(`${API_BASE}/api/public/services`),
          fetch(`${API_BASE}/api/public/technologies`),
        ])
        if (!svcRes.ok) throw new Error('Failed to load services')
        if (!techRes.ok) throw new Error('Failed to load technologies')

        const svcData = await svcRes.json()
        const techData = await techRes.json()

        setServices(Array.isArray(svcData) ? svcData : [])
        setTechnologies(
          Array.isArray(techData)
            ? techData.map((t: any) => t.name || t.title || t)
            : []
        )
      } catch (err: any) {
        setError(err.message || 'Không thể tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="bg-background-light text-slate-900 font-display min-h-screen antialiased">
        <Navbar />
        <main className="pt-32">
          <section className="max-w-[1440px] mx-auto px-8 pt-32 pb-24">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-24 bg-slate-200" />
              <div className="h-16 w-3/4 bg-slate-200" />
            </div>
          </section>
          <section className="border-t border-slate-200">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-slate-200 py-20 px-8 max-w-[1440px] mx-auto">
                <div className="animate-pulse flex gap-12">
                  <div className="w-1/2 space-y-4">
                    <div className="h-6 w-12 bg-slate-200" />
                    <div className="h-10 w-3/4 bg-slate-200" />
                  </div>
                  <div className="w-1/2 space-y-4">
                    <div className="h-4 w-full bg-slate-200" />
                    <div className="h-4 w-5/6 bg-slate-200" />
                    <div className="flex gap-3">
                      <div className="h-8 w-24 bg-slate-200" />
                      <div className="h-8 w-24 bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-background-light text-slate-900 font-display min-h-screen antialiased">
        <Navbar />
        <main className="pt-32">
          <section className="max-w-[1440px] mx-auto px-8 py-32 text-center">
            <span className="material-symbols-outlined text-red-400 text-[48px] mb-4 block">error</span>
            <p className="text-slate-500">{error}</p>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-background-light text-slate-900 font-display min-h-screen antialiased">
      <Navbar />

      <main className="pt-32">
        {/* Hero — exact from 07-services.html lines 63-70 */}
        <section className="max-w-[1440px] mx-auto px-8 pt-32 pb-24">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-primary text-sm font-bold tracking-widest uppercase mb-6">Dịch Vụ</p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-slate-900">
                Giải Pháp Kỹ Thuật Số Toàn Diện
              </h1>
            </div>
          </Reveal>
        </section>

        {/* Service Rows */}
        <section className="border-t border-slate-200">
          {services.map((service) => (
            <div key={service.number} className="service-row relative border-b border-slate-200 group transition-colors duration-500 overflow-hidden">
              <div
                className="service-bg absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 grayscale"
                style={{ backgroundImage: `url('${service.bgImage}')` }}
              />
              <div className="max-w-[1440px] mx-auto px-8 py-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                <div className="w-full lg:w-1/2 flex gap-8 items-start">
                  <span className="font-heading text-2xl font-semibold text-slate-400 mt-2">{service.number}</span>
                  <h3 className="service-title font-heading text-4xl lg:text-[2.5rem] font-bold text-slate-900 transition-colors duration-300">{service.title}</h3>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-8">
                  <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {(service.tags || []).map((tag) => (
                      <span key={tag} className="px-4 py-2 border border-slate-200 text-sm font-medium text-slate-700">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Technology Grid */}
        {technologies.length > 0 && (
          <Reveal>
            <section className="max-w-[1440px] mx-auto px-8 py-32 border-b border-slate-200">
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-16 text-center">Công Nghệ Sử Dụng</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 max-w-4xl mx-auto opacity-70">
                {technologies.map((tech) => (
                  <div key={tech} className="flex items-center justify-center font-heading text-2xl font-semibold tracking-wider uppercase">{tech}</div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal>
          <section className="py-40 px-8 bg-white text-center">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-12">
                Sẵn sàng nâng tầm thương hiệu?
              </h2>
              <Link
                to="/#lien-he"
                className="h-16 px-12 bg-slate-900 text-white text-lg font-bold tracking-widest uppercase transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95 inline-flex items-center"
              >
                Liên Hệ Ngay
              </Link>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />
    </div>
  )
}
