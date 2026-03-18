import { useEffect, useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import { API_BASE } from '../../config/site'

/**
 * ProcessSection — Dark bg, staggered GSAP reveal
 * 4 steps with oversized numbers, dark theme
 */

interface ProcessStep {
  number: string
  title: string
  description: string
}

export default function ProcessSection() {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/public/process-steps`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setSteps(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        console.error('ProcessSection fetch error:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="bg-[#0a0a0a] py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-8 animate-pulse space-y-4">
              <div className="h-14 w-20 bg-white/5 rounded" />
              <div className="h-5 w-32 bg-white/10 rounded" />
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-4/5 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (steps.length === 0) return null

  return (
    <section className="bg-[#0a0a0a] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="mb-16">
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold">
            Quy Trình
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-white mt-4 tracking-tight">
            Cách Chúng Tôi Làm Việc
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={0.15} className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group py-8 ${
                index > 0 ? 'md:border-l md:border-white/10 md:pl-8' : ''
              }`}
            >
              <span
                className="text-6xl font-bold text-white/10 mb-6 block transition-all duration-500 group-hover:text-primary/60 group-hover:translate-y-[-4px]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontFeatureSettings: "'tnum'" }}
              >
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-white mb-4 font-heading uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="text-white/40 leading-relaxed font-display text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
