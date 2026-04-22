import { useEffect, useRef, useState } from 'react'

/**
 * MotionDemo — Live animation showcase for Step 04
 * 
 * PERFORMANCE: Uses transform:scaleY() instead of height for bar animation
 * (compositor-only, no layout recalc). CSS containment applied.
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
        { base: 60, anim: 'b1', color: '#c9a96e' },
        { base: 85, anim: 'b2', color: '#b8956a' },
        { base: 45, anim: 'b3', color: '#d4b88c' },
        { base: 95, anim: 'b4', color: '#c9a96e' },
        { base: 70, anim: 'b5', color: '#a8845a' },
        { base: 55, anim: 'b6', color: '#d4b88c' },
    ]

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-2xl bg-[#1a1a18] p-6 md:p-8 transition-shadow duration-500 ${isHovered ? 'shadow-2xl shadow-accent/15' : 'shadow-lg'
                }`}
            style={{ contain: 'layout style paint', minHeight: '280px' }}
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
                {/* Bar chart — uses scaleY for perf */}
                <div>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Performance</p>
                    <div className="flex items-end gap-1 h-[90px]">
                        {bars.map((bar) => (
                            <div
                                key={bar.anim}
                                className="flex-1 rounded-t-sm origin-bottom"
                                style={{
                                    height: `${bar.base}%`,
                                    backgroundColor: bar.color,
                                    willChange: 'transform',
                                    animation: isVisible ? `${bar.anim} 4s ease-in-out infinite` : 'none',
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-1.5">
                        {['LCP', 'FID', 'CLS', 'TTI', 'TBT', 'SI'].map(l => (
                            <span key={l} className="text-white/15 text-[8px]">{l}</span>
                        ))}
                    </div>
                </div>

                {/* Score card */}
                <div
                    className="rounded-lg p-3 flex flex-col items-center justify-center"
                    style={{
                        background: 'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.04))',
                        border: '1px solid rgba(201,169,110,0.15)',
                        willChange: 'transform',
                        animation: isVisible ? 'cardF 3.5s ease-in-out infinite' : 'none',
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
                        style={{ animation: isVisible ? 'lineB 2.5s ease-in-out infinite' : 'none' }}
                    />
                </div>
            </div>

            {/* Status row */}
            <div className="mt-4 flex items-center gap-3">
                {['Web Vitals', 'FPS', 'A11y'].map((label, i) => (
                    <div key={label} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"
                            style={{ animation: isVisible ? `dotP 1.8s ease-in-out ${i * 0.3}s infinite` : 'none' }}
                        />
                        <span className="text-white/20 text-[9px]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Hover overlay */}
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-400 pointer-events-none ${isHovered ? 'bg-accent/5 opacity-100' : 'opacity-0'
                }`} />

            {/* Perf-optimized keyframes: use scaleY instead of height */}
            <style>{`
        @keyframes b1{0%,100%{transform:scaleY(1)}25%{transform:scaleY(1.35)}50%{transform:scaleY(0.75)}75%{transform:scaleY(1.15)}}
        @keyframes b2{0%,100%{transform:scaleY(1)}25%{transform:scaleY(0.65)}50%{transform:scaleY(1.1)}75%{transform:scaleY(0.8)}}
        @keyframes b3{0%,100%{transform:scaleY(1)}25%{transform:scaleY(1.6)}50%{transform:scaleY(1.2)}75%{transform:scaleY(1.8)}}
        @keyframes b4{0%,100%{transform:scaleY(1)}25%{transform:scaleY(0.7)}50%{transform:scaleY(0.85)}75%{transform:scaleY(0.55)}}
        @keyframes b5{0%,100%{transform:scaleY(1)}25%{transform:scaleY(1.3)}50%{transform:scaleY(0.85)}75%{transform:scaleY(0.6)}}
        @keyframes b6{0%,100%{transform:scaleY(1)}25%{transform:scaleY(0.75)}50%{transform:scaleY(1.4)}75%{transform:scaleY(1.6)}}
        @keyframes cardF{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes lineB{0%,100%{width:16px;opacity:.5}50%{width:36px;opacity:1}}
        @keyframes dotP{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.7)}}
      `}</style>
        </div>
    )
}
