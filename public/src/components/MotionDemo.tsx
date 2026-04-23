import { useEffect, useRef, useState } from 'react'

/**
 * MotionDemo — Live animation showcase for Step 04
 *
 * CROSS-DEVICE SAFE VERSION:
 * - Bars have STATIC heights (no height animation = no layout thrashing)
 * - All animations use ONLY compositor-safe properties: transform + opacity
 * - No backdrop-filter (causes GPU issues on some machines)
 * - Staggered fade-in on scroll, gentle opacity breathing on bars
 */
export default function MotionDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            (entries) => { const e = entries[0]; if (e) setIsVisible(e.isIntersecting) },
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // Fixed bar heights — no height animation at all
    const bars = [
        { h: 60, color: '#c9a96e', delay: '0s' },
        { h: 85, color: '#b8956a', delay: '0.5s' },
        { h: 45, color: '#d4b88c', delay: '1s' },
        { h: 95, color: '#c9a96e', delay: '1.5s' },
        { h: 70, color: '#a8845a', delay: '2s' },
        { h: 55, color: '#d4b88c', delay: '2.5s' },
    ]

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-2xl p-6 md:p-8 transition-shadow duration-500 bg-[#1e1c18]/90 ${isHovered ? 'shadow-2xl shadow-accent/15' : 'shadow-lg'
                }`}
            style={{
                border: '1px solid rgba(201, 169, 110, 0.12)',
                minHeight: '280px',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-white/20 text-[11px] font-mono">motion.jsx</span>
            </div>

            <div className="grid grid-cols-[1fr_120px] gap-4">
                {/* Bar chart — STATIC heights, staggered fade-in + gentle opacity pulse */}
                <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Performance Metrics</p>
                    <div className="flex items-end gap-[6px] h-[100px]">
                        {bars.map((bar, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-t-sm"
                                style={{
                                    height: `${bar.h}%`,
                                    backgroundColor: bar.color,
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                                    transition: `opacity 0.6s ease ${bar.delay}, transform 0.6s ease ${bar.delay}`,
                                    animation: isVisible ? `barBreath 3s ease-in-out ${bar.delay} infinite` : 'none',
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-2">
                        {['LCP', 'FID', 'CLS', 'TTI', 'TBT', 'SI'].map(l => (
                            <span key={l} className="text-white/15 text-[9px]">{l}</span>
                        ))}
                    </div>
                </div>

                {/* Score card — transform-only float */}
                <div
                    className="rounded-xl p-3 flex flex-col items-center justify-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.04))',
                        border: '1px solid rgba(201,169,110,0.15)',
                        animation: isVisible ? 'cardFloat 3.5s ease-in-out infinite' : 'none',
                    }}
                >
                    <span
                        className="text-2xl font-bold font-heading"
                        style={{
                            background: 'linear-gradient(135deg, #c9a96e, #e8d5a8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >100</span>
                    <span className="text-white/25 text-[9px] mt-0.5">Lighthouse</span>
                    <div className="w-5 h-[1.5px] mt-1.5 rounded-full bg-[#c9a96e]"
                        style={{ animation: isVisible ? 'lineGlow 2.5s ease-in-out infinite' : 'none' }}
                    />
                </div>
            </div>

            {/* Status row */}
            <div className="mt-4 flex items-center gap-3">
                {['Core Web Vitals', 'Animation FPS', 'Accessibility'].map((label, i) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"
                            style={{ animation: isVisible ? `dotPulse 2s ease-in-out ${i * 0.4}s infinite` : 'none' }}
                        />
                        <span className="text-white/20 text-[9px]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Hover glow — opacity only */}
            <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400 ${isHovered ? 'opacity-100' : 'opacity-0'
                }`} style={{ background: 'rgba(201,169,110,0.04)' }} />

            {/* ALL keyframes use ONLY opacity + transform (compositor-safe) */}
            <style>{`
        @keyframes barBreath {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes lineGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
      `}</style>
        </div>
    )
}
