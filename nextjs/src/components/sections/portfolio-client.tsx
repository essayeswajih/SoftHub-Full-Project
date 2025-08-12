"use client"

import { Code } from 'lucide-react'

export type Project = {
  title: string
  category: string
  description: string
  tech: string[]
  image?: string
}

export default function PortfolioClient({
  projects = [],
}: {
  projects?: Project[]
}) {
  return (
    <section id="portfolio" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Featured Projects</h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Showcasing our latest work across cybersecurity, web, and mobile development
          </p>
        </div>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={index}
              className="rounded-md border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:scale-[1.01] transition-transform"
            >
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg?height=200&width=300&query=project+image"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading={index > 1 ? "lazy" : "eager"}
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 text-white text-xs font-medium px-2.5 py-1">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                <p className="text-white/70 text-sm mt-1.5">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="inline-flex items-center rounded-full border border-white/20 bg-white/10 text-white/90 text-xs px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
