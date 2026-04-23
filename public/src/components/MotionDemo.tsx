import { useEffect, useRef, useState } from 'react'

/**
 * MotionDemo — Live animation showcase for Step 04
 * 
 * Semi-transparent glass background + height-based looping bar chart.
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

    const bars = [
        { name: 'bar1', color: '#c9a96e' },
        { name: 'bar2', color: '#b8956a' },
        { name: 'bar3', color: '#d4b88c' },
        { name: 'bar4', color: '#c9a96e' },
        { name: 'bar5', color: '#a8845a' },
        { name: 'bar6', color: '#d4b88c' },
    ]

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-2xl p-6 md:p-8 transition-shadow duration-500 ${isHovered ? 'shadow-2xl shadow-accent/15' : 'shadow-lg'
                }`}
            style={{
                background: 'rgba(30, 28, 24, 0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
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
                {/* Bar chart — height-based looping animation */}
                <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Performance Metrics</p>
                    <div className="flex items-end gap-[6px] h-[100px]">
                        {bars.map((bar) => (
                            <div
                                key={bar.name}
                                className="flex-1 rounded-t-sm"
                                style={{
                                    backgroundColor: bar.color,
                                    animation: isVisible ? `${bar.name}Loop 4s ease-in-out infinite` : 'none',
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

                {/* Score card */}
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
                    <div className="h-[1.5px] mt-1.5 rounded-full bg-[#c9a96e]"
                        style={{ animation: isVisible ? 'lineBreath 2.5s ease-in-out infinite' : 'none' }}
                    />
                </div>
            </div>

            {/* Status row */}
            <div className="mt-4 flex items-center gap-3">
                {['Core Web Vitals', 'Animation FPS', 'Accessibility'].map((label, i) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"
                            style={{ animation: isVisible ? `dotPulse 1.8s ease-in-out ${i * 0.3}s infinite` : 'none' }}
                        />
                        <span className="text-white/20 text-[9px]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Hover glow */}
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-400 pointer-events-none ${isHovered ? 'bg-accent/5 opacity-100' : 'opacity-0'
                }`} />

            {/* Keyframes: each bar has unique height loop */}
            <style>{`
        @keyframes bar1Loop {
          0%, 100% { height: 60%; }
          25% { height: 80%; }
          50% { height: 45%; }
          75% { height: 70%; }
        }
        @keyframes bar2Loop {
          0%, 100% { height: 85%; }
          25% { height: 55%; }
          50% { height: 90%; }
          75% { height: 65%; }
        }
        @keyframes bar3Loop {
          0%, 100% { height: 45%; }
          25% { height: 75%; }
          50% { height: 55%; }
          75% { height: 85%; }
        }
        @keyframes bar4Loop {
          0%, 100% { height: 95%; }
          25% { height: 70%; }
          50% { height: 80%; }
          75% { height: 50%; }
        }
        @keyframes bar5Loop {
          0%, 100% { height: 70%; }
          25% { height: 90%; }
          50% { height: 60%; }
          75% { height: 40%; }
        }
        @keyframes bar6Loop {
          0%, 100% { height: 55%; }
          25% { height: 40%; }
          50% { height: 75%; }
          75% { height: 90%; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes lineBreath {
          0%, 100% { width: 16px; opacity: 0.5; }
          50% { width: 36px; opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
      `}</style>
        </div>
    )
}
