import Link from "next/link"
import { Code, Menu, X } from 'lucide-react'
import { useState } from "react"

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center gap-2" aria-label="SoftHub Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 grid place-items-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">SoftHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-white/80 hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">Portfolio</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <div className="absolute top-16 inset-x-0 bg-slate-900/95 border-b border-white/10">
          <nav className="container mx-auto px-4 py-4 grid gap-3">
            <a onClick={() => setOpen(false)} href="#services" className="text-white/90 hover:text-white">Services</a>
            <a onClick={() => setOpen(false)} href="#portfolio" className="text-white/90 hover:text-white">Portfolio</a>
            <a onClick={() => setOpen(false)} href="#about" className="text-white/90 hover:text-white">About</a>
            <a onClick={() => setOpen(false)} href="#contact" className="text-white/90 hover:text-white">Contact</a>
          </nav>
        </div>
      )}
    </div>
  )
}
