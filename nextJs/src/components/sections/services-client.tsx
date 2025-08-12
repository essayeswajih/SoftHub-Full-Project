"use client"

import { Shield, Globe, Smartphone, CheckCircle } from 'lucide-react'

export type Service = {
  icon: "Shield" | "Globe" | "Smartphone"
  title: string
  description: string
  features: string[]
}

const iconMap = { Shield, Globe, Smartphone }

export default function ServicesClient({
  services = [],
}: {
  services?: Service[]
}) {
  return (
    <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Our Expertise</h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            We specialize in three core areas that form the foundation of modern digital solutions
          </p>
        </div>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Shield
            return (
              <div
                key={index}
                className="rounded-md border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 grid place-items-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-lg sm:text-xl font-semibold">{service.title}</h3>
                <p className="text-white/70 text-sm sm:text-base mt-1.5">{service.description}</p>
                <ul className="mt-4 space-y-2 text-white/80">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-[15px]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
