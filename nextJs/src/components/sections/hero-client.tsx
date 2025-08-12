"use client"

import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

export default function HeroClient() {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1 })
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
        )
      }
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
      }
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.15, ease: "power2.out" },
          "-=0.3",
        )
      }
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div ref={rootRef} className="container mx-auto text-center max-w-5xl">
        <h1
          ref={titleRef}
          className="opacity-0 text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight"
        >
          Secure. Build.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Innovate.
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
        >
          SoftHub delivers cutting-edge cybersecurity solutions, modern web applications, and innovative mobile
          experiences that drive your business forward.
        </p>
        <div ref={buttonsRef} className="mt-8 sm:mt-10 flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-white border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  )
}
