import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal'
import { API_BASE } from '../../config/site'

/**
 * ProcessSection — From 01-homepage.html lines 75-101
 * Data fetched from /api/public/process-steps
 * 
 * No "Quy Trình Làm Việc" label.
 * Hover: number changes to primary color + scales up.
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
      <section className="bg-white py-32 px-6 md:px-24 border-b border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-12 md:px-10 animate-pulse space-y-4">
              <div className="h-12 w-16 bg-slate-100" />
              <div className="h-6 w-24 bg-slate-200" />
              <div className="h-4 w-full bg-slate-200" />
              <div className="h-4 w-5/6 bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (steps.length === 0) return null

  return (
    <section className="bg-white py-32 px-6 md:px-24 border-b border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 100}>
            <div className={`process-card py-12 md:px-10 ${index === 0 ? 'first:pl-0' : ''} ${index === steps.length - 1 ? 'last:pr-0' : ''}`}>
              <span
                className="process-number text-6xl font-bold text-slate-200 mb-6 transition-all duration-300 inline-flex items-baseline"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontFeatureSettings: "'tnum'" }}
              >
                {step.number}
              </span>
              <h3 className="text-2xl font-bold mb-4 font-heading uppercase">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-display">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
