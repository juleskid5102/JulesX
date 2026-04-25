import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * HorizontalGallery — THE WOW MOMENT
 * 
 * GSAP ScrollTrigger: pinned horizontal scroll.
 * Scrolling DOWN moves projects LEFT.
 * Each card = cinematic 16/9 project screenshot.
 * Grayscale → color on center card.
 * 
 * Skills: gsap-animations (pattern #6 horizontal scroll)
 */

const GALLERY_PROJECTS = [
    { slug: 'jules-atelier', title: 'Jules Atelier', category: 'Concept · Landing Page', image: '/images/projects/jules-atelier-hero.png' },
    { slug: 'ha-vy-portfolio', title: 'Hà Vy Portfolio', category: 'Personal Brand · Portfolio', image: '/images/projects/havy-hero.png' },
    { slug: 'mam-cung-thanh-huan', title: 'Mâm Cúng Thanh Huân', category: 'F&B · E-commerce', image: '/images/projects/mamcung-hero.png' },
    { slug: 'd-home', title: 'D.HOME Interior', category: 'Interior · Landing Page', image: '/images/projects/dhome-hero.png' },
    { slug: 'minh-khang-clinic', title: 'Minh Khang Clinic', category: 'Healthcare · Web App', image: '/images/projects/minhkhang-hero.png' },
    { slug: 'jules-oasis', title: 'Jules Oasis', category: 'Concept · Resort', image: '/images/projects/jules-oasis-hero.png' },
]

export default function HorizontalGallery() {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        if (!containerRef.current || !trackRef.current) return

        const init = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)

            const track = trackRef.current!
            const totalScroll = track.scrollWidth - window.innerWidth

            gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${totalScroll}`,
                    invalidateOnRefresh: true,
                },
            })

            // Parallax on each card image
            track.querySelectorAll('.gallery-img').forEach((img) => {
                gsap.to(img, {
                    xPercent: -15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        scrub: true,
                    },
                })
            })
        }

        setTimeout(init, 200)
    }, [])

    return (
        <section className="bg-bg overflow-hidden">
            {/* Section header */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-12">
                <div className="flex items-center gap-4">
                    <p className="label-caps text-accent">Dự Án Tiêu Biểu</p>
                    <div className="flex-1 h-[1px] bg-border" />
                    <Link to="/du-an" className="text-text-muted text-xs font-semibold uppercase tracking-[0.15em] hover:text-accent transition-colors">
                        Xem tất cả →
                    </Link>
                </div>
            </div>

            {/* Horizontal scroll container */}
            <div ref={containerRef} className="relative h-screen">
                <div ref={trackRef} className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-6 px-6 md:px-10 will-change-transform"
                    style={{ width: 'max-content' }}>
                    {GALLERY_PROJECTS.map((project) => (
                        <Link
                            key={project.slug}
                            to={`/du-an/${project.slug}`}
                            className="gallery-card group relative flex-shrink-0 overflow-hidden cursor-pointer"
                            style={{ width: 'clamp(320px, 45vw, 700px)' }}
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-bg-alt">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="gallery-img w-[115%] h-full object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-700 will-change-transform"
                                    loading="lazy"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-text/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Title — always visible below image */}
                            <div className="pt-4 pb-2">
                                <p className="text-text-light text-[10px] uppercase tracking-[0.2em] mb-1.5 font-body">{project.category}</p>
                                <h3 className="font-heading text-lg md:text-xl font-bold text-text group-hover:text-accent transition-colors duration-300">
                                    {project.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
