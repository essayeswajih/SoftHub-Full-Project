"use client"

import { Code } from 'lucide-react'

export default function TechnologiesClient({
  technologies = [],
}: {
  technologies?: string[]
}) {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Technologies We Master</h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Cutting-edge tools and frameworks that power our solutions
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {technologies.map((tech, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl p-4 text-center border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:border-cyan-400/50 transition-colors"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 mb-2 grid place-items-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 grid place-items-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="relative z-10 text-white font-medium text-sm group-hover:text-cyan-300 transition-colors">
                  {tech}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">12+</div>
              <div className="text-white/70 text-sm">Technologies</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">5+</div>
              <div className="text-white/70 text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-400">100%</div>
              <div className="text-white/70 text-sm">Up to Date</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
