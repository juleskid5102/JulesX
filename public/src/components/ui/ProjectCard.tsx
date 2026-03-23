import { Link } from 'react-router-dom'
import type { Project } from '../../config/site'

/**
 * ProjectCard — Global reusable card. Same size/shape everywhere.
 * - Image: aspect-[4/3], grayscale → full color on hover
 * - Layout: title (left) + metadata row (category · date · style)
 */
interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/du-an/${project.slug || project.id}`}
      className="group cursor-pointer block"
    >
      {/* Image — grayscale→color on hover */}
      <div className="bg-stone-100 rounded-xl overflow-hidden mb-4 border border-stone-200 relative aspect-[4/3]">
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 z-10" />
        <img
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
          src={project.image}
          loading="lazy"
        />
      </div>

      {/* Title + metadata */}
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-lg font-bold text-stone-900 font-display leading-tight">
          {project.title}
        </h4>
        {project.completedAt && (
          <span className="text-xs text-stone-400 font-display whitespace-nowrap mt-1">
            {project.completedAt}
          </span>
        )}
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-stone-400 font-display">
        <span>{project.category || project.field}</span>
        {project.designStyle && (
          <>
            <span className="text-stone-300">·</span>
            <span>{project.designStyle}</span>
          </>
        )}
      </div>
    </Link>
  )
}
