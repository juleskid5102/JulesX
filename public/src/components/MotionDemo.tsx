import { useEffect, useRef, useState } from 'react'

/**
 * MotionDemo — Live animation showcase for Step 04
 *
 * Features:
 * - Bar chart with LOOPING height animation
 * - Floating score card (continuous float)
 * - Progress ring animation
 * - Pulsing status indicators
 * - Hover interaction: cursor sim, accent overlay
 *
 * Only animates when in viewport (IntersectionObserver)
 */
export default function MotionDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry) setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.2 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-2xl bg-[#1a1a18] p-6 md:p-8 transition-all duration-500 cursor-pointer ${isHovered ? 'shadow-2xl shadow-accent/15 scale-[1.01]' : 'shadow-lg'
                }`}
            style={{ minHeight: '300px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Window controls */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-3 text-white/25 text-xs font-mono">motion-preview.jsx</span>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-[1fr_130px] gap-5">
                {/* Left: Animated bar chart */}
                <div>
                    <p className="text-white/35 text-[10px] uppercase tracking-widest mb-3">Performance Metrics</p>
                    <div className="flex items-end gap-[6px] h-[100px]">
                        {[
                            { name: 'bar1', color: '#c9a96e' },
                            { name: 'bar2', color: '#b8956a' },
                            { name: 'bar3', color: '#d4b88c' },
                            { name: 'bar4', color: '#c9a96e' },
                            { name: 'bar5', color: '#a8845a' },
                            { name: 'bar6', color: '#d4b88c' },
                        ].map((bar) => (
                            <div
                                key={bar.name}
                                className="flex-1 rounded-t-sm"
                                style={{
                                    backgroundColor: bar.color,
                                    animation: isVisible
                                        ? `${bar.name}Loop 4s ease-in-out infinite`
                                        : 'none',
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-2">
                        {['LCP', 'FID', 'CLS', 'TTI', 'TBT', 'SI'].map((l) => (
                            <span key={l} className="text-white/20 text-[9px]">{l}</span>
                        ))}
                    </div>
                </div>

                {/* Right: Floating score card */}
                <div
                    className="rounded-xl p-4 flex flex-col items-center justify-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))',
                        border: '1px solid rgba(201,169,110,0.2)',
                        animation: isVisible ? 'cardFloat 3s ease-in-out infinite' : 'none',
                    }}
                >
                    <span
                        className="text-3xl font-bold font-heading"
                        style={{
                            background: 'linear-gradient(135deg, #c9a96e, #e8d5a8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        100
                    </span>
                    <span className="text-white/30 text-[10px] mt-1">Lighthouse</span>
                    {/* Animated underline */}
                    <div
                        className="h-[2px] mt-2 rounded-full bg-[#c9a96e]"
                        style={{
                            animation: isVisible ? 'lineBreath 2s ease-in-out infinite' : 'none',
                        }}
                    />
                </div>
            </div>

            {/* Bottom status row with pulsing dots */}
            <div className="mt-5 flex items-center gap-4">
                {['Core Web Vitals', 'Animation FPS', 'Accessibility'].map((label, i) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div
                            className="w-2 h-2 rounded-full bg-green-400"
                            style={{
                                animation: isVisible
                                    ? `dotPulse 1.5s ease-in-out ${i * 0.4}s infinite`
                                    : 'none',
                            }}
                        />
                        <span className="text-white/25 text-[10px]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Hover overlay */}
            <div
                className={`absolute inset-0 bg-accent/5 rounded-2xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Hover cursor sim */}
            {isHovered && (
                <div
                    className="absolute w-4 h-4 border-2 border-accent/50 rounded-full pointer-events-none"
                    style={{ animation: 'cursorMove 3s ease-in-out infinite', top: '40%', left: '25%' }}
                >
                    <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
                </div>
            )}

            {/* 
        CSS Keyframes — each bar has its own unique loop with different heights 
        so the chart constantly shifts like a live dashboard
      */}
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
          50% { transform: translateY(-8px); }
        }
        @keyframes lineBreath {
          0%, 100% { width: 20px; opacity: 0.6; }
          50% { width: 40px; opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes cursorMove {
          0% { transform: translate(0, 0); }
          25% { transform: translate(60px, -15px); }
          50% { transform: translate(120px, 8px); }
          75% { transform: translate(40px, 25px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
        </div>
    )
}
