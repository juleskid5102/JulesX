import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScrollReveal from '../components/ui/ScrollReveal'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { API_BASE } from '../config/site'

/**
 * Services — Dark theme, service rows with hover effects
 * Maintains API data fetching, updated for Oasis style
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
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <main className="pt-32">
          <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-24 bg-white/10" />
              <div className="h-16 w-3/4 bg-white/5" />
            </div>
          </section>
          <section className="border-t border-white/10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-white/10 py-20 px-6 max-w-7xl mx-auto">
                <div className="animate-pulse flex gap-12">
                  <div className="w-1/2 space-y-4">
                    <div className="h-6 w-12 bg-white/10" />
                    <div className="h-10 w-3/4 bg-white/5" />
                  </div>
                  <div className="w-1/2 space-y-4">
                    <div className="h-4 w-full bg-white/5" />
                    <div className="h-4 w-5/6 bg-white/5" />
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
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <main className="pt-32">
          <section className="max-w-7xl mx-auto px-6 py-32 text-center">
            <span className="material-symbols-outlined text-red-400 text-[48px] mb-4 block">error</span>
            <p className="text-white/50">{error}</p>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="pt-32">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold block mb-6">
                Dịch Vụ
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight text-white">
                Giải Pháp Kỹ Thuật Số Toàn Diện
              </h1>
            </div>
          </ScrollReveal>
        </section>

        {/* Service Rows */}
        <section className="border-t border-white/10">
          {services.map((service) => (
            <ScrollReveal key={service.number}>
              <div className="service-row relative border-b border-white/10 group transition-colors duration-500 overflow-hidden">
                <div
                  className="service-bg absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 grayscale"
                  style={{ backgroundImage: `url('${service.bgImage}')` }}
                />
                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                  <div className="w-full lg:w-1/2 flex gap-8 items-start">
                    <span className="font-heading text-2xl font-semibold text-white/20 mt-2">{service.number}</span>
                    <h3 className="service-title font-heading text-4xl lg:text-[2.5rem] font-bold text-white transition-colors duration-300">{service.title}</h3>
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col gap-8">
                    <p className="text-white/50 text-lg leading-relaxed max-w-xl font-display">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {(service.tags || []).map((tag) => (
                        <span key={tag} className="px-4 py-2 border border-white/15 text-sm font-medium text-white/60">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </section>

        {/* Technology Grid */}
        {technologies.length > 0 && (
          <section className="bg-[#0a0a0a] py-32 px-6 overflow-hidden">
            <ScrollReveal className="max-w-7xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-white mb-16 text-center tracking-tight">
                Công Nghệ Sử Dụng
              </h2>
            </ScrollReveal>
            <ScrollReveal stagger={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 max-w-4xl mx-auto">
              {technologies.map((tech) => (
                <div key={tech} className="flex items-center justify-center font-heading text-xl font-semibold tracking-wider uppercase text-white/30 hover:text-primary transition-colors duration-300">
                  {tech}
                </div>
              ))}
            </ScrollReveal>
          </section>
        )}

        {/* CTA */}
        <section className="py-40 px-6 bg-black text-center overflow-hidden">
          <ScrollReveal direction="none" className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">
              Sẵn sàng nâng tầm thương hiệu?
            </h2>
            <Link
              to="/#lien-he"
              className="bg-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/80 transition-all inline-flex items-center gap-4"
            >
              Liên Hệ Ngay
            </Link>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </div>
  )
}
