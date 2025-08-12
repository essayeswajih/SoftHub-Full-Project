"use client"

import { Shield, Code, Smartphone, Database, Server, Zap } from 'lucide-react'

export default function AboutClient() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 sm:gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">About SoftHub</h2>
          <p className="text-white/80 text-base sm:text-lg mb-4 sm:mb-6">
            We are a team of passionate developers and cybersecurity experts dedicated to creating secure,
            innovative digital solutions. With years of experience, we understand the critical importance of
            functionality and security in today’s digital landscape.
          </p>
          <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8">
            Our mission is to help businesses thrive by providing robust, scalable, and secure technology
            solutions that drive growth and protect valuable assets.
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">50+</div>
              <div className="text-white/70 text-xs sm:text-sm">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">5+</div>
              <div className="text-white/70 text-xs sm:text-sm">Years</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">100%</div>
              <div className="text-white/70 text-xs sm:text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="w-full h-72 sm:h-80 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl grid place-items-center">
            <div className="grid grid-cols-3 gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600 grid place-items-center">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 grid place-items-center">
                <Code className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-green-400 to-green-600 grid place-items-center">
                <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 grid place-items-center">
                <Database className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-red-400 to-red-600 grid place-items-center">
                <Server className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 grid place-items-center">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
