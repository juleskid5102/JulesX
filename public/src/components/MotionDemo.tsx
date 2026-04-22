import { useEffect, useRef, useState } from 'react'

/**
 * MotionDemo — Live animation showcase for Step 04
 * 
 * Shows a mini dashboard with:
 * - Animated bar chart
 * - Floating card with hover tilt
 * - Pulsing status indicators
 * - Smooth looping animations via CSS
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
            (entries) => { if (entries[0]) setIsVisible(entries[0].isIntersecting) },
            { threshold: 0.2 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const bars = [
        { h: 60, delay: '0s', color: '#c9a96e' },
        { h: 85, delay: '0.15s', color: '#b8956a' },
        { h: 45, delay: '0.3s', color: '#d4b88c' },
        { h: 95, delay: '0.45s', color: '#c9a96e' },
        { h: 70, delay: '0.6s', color: '#a8845a' },
        { h: 55, delay: '0.75s', color: '#d4b88c' },
    ]

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-2xl bg-[#1a1a18] p-6 md:p-8 transition-all duration-500 ${isHovered ? 'shadow-2xl shadow-accent/10 scale-[1.01]' : 'shadow-lg'
                }`}
            style={{ minHeight: '300px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header bar */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-3 text-white/30 text-xs font-mono">motion-preview.jsx</span>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-[1fr_140px] gap-5">
                {/* Left: Bar chart */}
                <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Performance Metrics</p>
                    <div className="flex items-end gap-[6px] h-[100px]">
                        {bars.map((bar, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-t-sm origin-bottom"
                                style={{
                                    height: isVisible ? `${bar.h}%` : '0%',
                                    backgroundColor: bar.color,
                                    transition: `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${bar.delay}`,
                                    animation: isVisible ? `barPulse 3s ease-in-out ${bar.delay} infinite` : 'none',
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-white/20 text-[9px]">LCP</span>
                        <span className="text-white/20 text-[9px]">FID</span>
                        <span className="text-white/20 text-[9px]">CLS</span>
                        <span className="text-white/20 text-[9px]">TTI</span>
                        <span className="text-white/20 text-[9px]">TBT</span>
                        <span className="text-white/20 text-[9px]">SI</span>
                    </div>
                </div>

                {/* Right: Score card */}
                <div
                    className="rounded-xl p-4 flex flex-col items-center justify-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))',
                        border: '1px solid rgba(201,169,110,0.2)',
                        animation: isVisible ? 'cardFloat 4s ease-in-out infinite' : 'none',
                    }}
                >
                    <span
                        className="text-3xl font-bold font-heading"
                        style={{
                            background: 'linear-gradient(135deg, #c9a96e, #e8d5a8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: isVisible ? 'scoreCount 2s ease-out 0.5s both' : 'none',
                        }}
                    >
                        100
                    </span>
                    <span className="text-white/30 text-[10px] mt-1">Lighthouse</span>
                    <div
                        className="w-8 h-[2px] mt-2 rounded-full"
                        style={{
                            background: '#c9a96e',
                            animation: isVisible ? 'lineExpand 1.5s ease-out 1s both' : 'none',
                        }}
                    />
                </div>
            </div>

            {/* Bottom: Animated status row */}
            <div className="mt-5 flex items-center gap-3">
                {/* Pulsing dots */}
                {['Core Web Vitals', 'Animation FPS', 'Accessibility'].map((label, i) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div
                            className="w-2 h-2 rounded-full bg-green-400"
                            style={{
                                animation: isVisible
                                    ? `dotPulse 2s ease-in-out ${i * 0.3}s infinite`
                                    : 'none',
                            }}
                        />
                        <span className="text-white/30 text-[10px]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Hover overlay effect */}
            <div
                className={`absolute inset-0 bg-accent/5 rounded-2xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Floating cursor simulation on hover */}
            {isHovered && (
                <div
                    className="absolute w-4 h-4 border-2 border-accent/50 rounded-full pointer-events-none"
                    style={{
                        animation: 'cursorMove 3s ease-in-out infinite',
                        top: '40%',
                        left: '30%',
                    }}
                >
                    <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
                </div>
            )}

            {/* CSS Animations */}
            <style>{`
        @keyframes barPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes scoreCount {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to { width: 32px; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes cursorMove {
          0% { transform: translate(0, 0); }
          25% { transform: translate(60px, -20px); }
          50% { transform: translate(120px, 10px); }
          75% { transform: translate(40px, 30px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
        </div>
    )
}
