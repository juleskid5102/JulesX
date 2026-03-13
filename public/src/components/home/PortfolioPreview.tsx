import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'

/**
 * PortfolioPreview — EXACT from 01-homepage.html lines 102-134
 * 
 * Key differences from previous version:
 * - bg-background-light instead of bg-bg
 * - text-slate-900 instead of text-text
 * - Grayscale on container div: "grayscale hover:grayscale-0 transition-all duration-500"
 *   NOT on img with custom .grayscale-hover class
 */
const projects = [
  {
    id: '1',
    title: 'Lumina Platform',
    category: 'Thương mại điện tử',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKeiB2Fe5BjxXsp2fwzvlSM4ZvEtE8uIYAmfPEmhZhSoR-HC8ZIV8eFjE5KNP19cCl1JfVlqXg8dOB76xdflIXVY8WS3tBYAvQWyc65u7wVayrxic4rwWzXb8J1OooXKJ8pEnHgkibrCL5Cm-hflpyPIZvCzqXir4MaHq5D-ixFir6z4Zdcot7YQSb4-mIp6wXR7a4TGChZe8xuYNB7YneEdqizrHFKVdnveFvNVa8JCkcCMVDjGnWWDduqNvhLHUmT6lccURodS9C',
  },
  {
    id: '2',
    title: 'Apex Identity',
    category: 'Thương hiệu',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDurV_zK9maVFX_MABT-68zoKcZRv3zou_K29Ymm5uGmzVOBnQH08yNOZcGfWuSX0HxrVtJr6q36LWgcZy34qa4GfryX2lqgNaGsr3fGoVnb1IInqDVgdSHmh-Ez6lQ65Upw4mwfCVs6GPxgtRZLDM98khTgQlHPyaDz8s56b2ZQzBkG1RpVnUMKvv6mM8A_MoNtMZE8ThoVkvVl3KYYVNjDJKdOIyJeinJYXb_Eqlb_gig60H9tdvGZwcQV10kJB8JAmSdmW5aAsM5',
  },
]

export default function PortfolioPreview() {
  const project1 = projects[0]!
  const project2 = projects[1]!

  return (
    <section className="bg-background-light py-32 px-6 md:px-24">
      <Reveal>
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-5xl font-extrabold tracking-tighter font-heading uppercase">
            DỰ ÁN<br />NỔI BẬT
          </h2>
          <Link
            to="/du-an"
            className="group flex items-center gap-2 text-slate-900 font-bold tracking-widest uppercase text-sm"
          >
            <span>Xem Tất Cả Dự Án</span>
            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_right_alt</span>
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Project 1 — 8 columns */}
        <div className="md:col-span-8 group cursor-pointer">
          <Reveal>
            <div className="aspect-[16/10] bg-slate-100 border border-slate-200 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <img
                alt="Giao diện nền tảng Lumina"
                className="w-full h-full object-cover"
                src={project1.image}
              />
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold font-heading uppercase">{project1.title}</h3>
                <p className="text-slate-500 mt-1">{project1.category} • {project1.year}</p>
              </div>
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">arrow_outward</span>
            </div>
          </Reveal>
        </div>

        {/* Project 2 — 4 columns, offset */}
        <div className="md:col-span-4 group cursor-pointer md:mt-24">
          <Reveal delay={150}>
            <div className="aspect-[16/10] bg-slate-100 border border-slate-200 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <img
                alt="Nhận diện thương hiệu Apex"
                className="w-full h-full object-cover"
                src={project2.image}
              />
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold font-heading uppercase">{project2.title}</h3>
                <p className="text-slate-500 mt-1">{project2.category} • {project2.year}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
