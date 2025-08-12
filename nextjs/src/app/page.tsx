"use client"
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react"
import { useActionState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { Shield, Globe, Smartphone, Code, Server, Database, Zap, ArrowRight, Mail, Phone, MapPin, Github, Linkedin, CheckCircle, PhoneCall } from 'lucide-react'
import { sendContactEmail, type ContactState } from "./actions/send-emails"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "outline"
  size?: "default" | "lg" | "icon"
  className?: string
}

const CustomButton = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: CustomButtonProps) => {
  let buttonClass =
    "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"

  if (size === "lg") {
    buttonClass += " px-4 py-2.5 text-base"
  } else if (size === "icon") {
    buttonClass += " h-9 w-9"
  } else {
    buttonClass += " px-3 py-2 text-sm"
  }

  if (variant === "outline") {
    buttonClass += " border border-white/20 bg-transparent hover:bg-white/10 text-white"
  } else {
    buttonClass += " bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow hover:from-cyan-600 hover:to-purple-700"
  }

  buttonClass += ` ${className}`

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  )
}

interface CustomCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

const CustomCard = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <div className={`rounded-md border border-white/10 bg-white/5 text-white shadow-sm backdrop-blur-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

const CustomCardHeader = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CustomCardContent = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CustomCardTitle = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

const CustomCardDescription = ({ children, className = "", ...props }: CustomCardProps) => {
  return (
    <p className={`text-sm text-white/70 ${className}`} {...props}>
      {children}
    </p>
  )
}

interface CustomBadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: "default" | "secondary"
  className?: string
}

const CustomBadge = ({ children, variant = "default", className = "", ...props }: CustomBadgeProps) => {
  let badgeClass =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"

  if (variant === "secondary") {
    badgeClass += " border-white/20 bg-white/10 text-white/90 hover:bg-white/20"
  } else {
    badgeClass += " border-white/20 bg-white/5 text-white/90"
  }

  badgeClass += ` ${className}`

  return (
    <div className={badgeClass} {...props}>
      {children}
    </div>
  )
}

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)

  // Contact form plan select handling
  const planSelectRef = useRef<HTMLSelectElement>(null)
  const [successFlash, setSuccessFlash] = useState(false)

  useEffect(() => {
    // Prefill plan from URL
    const params = new URLSearchParams(window.location.search)
    const plan = params.get("plan")
    if (plan && planSelectRef.current) {
      planSelectRef.current.value = plan
    }
  }, [])

  const initialState: ContactState = useMemo(
    () => ({ ok: false, message: "" }),
    [],
  )
  const [state, action, isPending] = useActionState(sendContactEmail, initialState)

  useEffect(() => {
    if (state?.ok) {
      setSuccessFlash(true)
      const t = setTimeout(() => setSuccessFlash(false), 3000)
      return () => clearTimeout(t)
    }
  }, [state?.ok])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1 })
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 100, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        )
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
      }

      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
          "-=0.4",
        )
      }

      if (servicesRef.current) {
        const serviceCards = servicesRef.current.querySelectorAll(".service-card")
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 80, rotationX: 45, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: servicesRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" },
          },
        )
      }

      if (projectsRef.current) {
        const cards = projectsRef.current.querySelectorAll(".project-card")
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotation: index % 2 === 0 ? -5 : 5 },
            { opacity: 1, x: 0, rotation: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } },
          )
        })
      }

      if (techRef.current) {
        const badges = techRef.current.querySelectorAll(".tech-badge")
        gsap.fromTo(
          badges,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: { amount: 1.2, from: "random", ease: "power2.out" },
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: techRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          },
        )
        badges.forEach((b, i) => {
          gsap.to(b, { scale: 1.02, duration: 2 + Math.random(), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.1 })
          b.addEventListener("mouseenter", () => gsap.to(b, { scale: 1.1, y: -8, boxShadow: "0 10px 25px rgba(0, 255, 255, 0.3)", duration: 0.3, ease: "power2.out" }))
          b.addEventListener("mouseleave", () => gsap.to(b, { scale: 1, y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.3, ease: "power2.out" }))
        })
        ScrollTrigger.create({
          trigger: techRef.current,
          start: "top 60%",
          onEnter: () => gsap.to(badges, { y: -5, duration: 0.4, stagger: { amount: 0.8, from: "start" }, ease: "power2.out", yoyo: true, repeat: 1 }),
        })
        const stats = techRef.current.querySelectorAll(".tech-stat")
        stats.forEach((stat, index) => {
          const number = stat.querySelector("div:first-child")
          gsap.fromTo(
            stat,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, delay: index * 0.2 + 0.5, ease: "power2.out", scrollTrigger: { trigger: stat, start: "top 85%", toggleActions: "play none none reverse" } },
          )
          if (number) {
            const finalValue = number.textContent
            gsap.fromTo(
              number,
              { textContent: "0" },
              { textContent: finalValue, duration: 1.5, delay: index * 0.2 + 0.8, ease: "power2.out", snap: { textContent: 1 }, scrollTrigger: { trigger: stat, start: "top 85%", toggleActions: "play none none reverse" } },
            )
          }
        })
      }
      // Contact Section - 3D Card Flip and Form Animation
      if (contactRef.current) {
        const contactInfo = contactRef.current.querySelector(".contact-info")
        const contactForm = contactRef.current.querySelector(".contact-form")
        const contactItems = contactRef.current.querySelectorAll(".contact-item")
        const formInputs = contactRef.current.querySelectorAll(".form-input")
        const socialButtons = contactRef.current.querySelectorAll(".social-btn")

        // Contact info 3D entrance
        gsap.fromTo(
          contactInfo,
          {
            opacity: 0,
            rotationY: -90,
            x: -100,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationY: 0,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Contact form 3D entrance
        gsap.fromTo(
          contactForm,
          {
            opacity: 0,
            rotationY: 90,
            x: 100,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationY: 0,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Contact items staggered animation
        gsap.fromTo(
          contactItems,
          {
            opacity: 0,
            rotationX: 45,
            y: 30,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationX: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: contactInfo,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Form inputs 3D animation
        gsap.fromTo(
          formInputs,
          {
            opacity: 0,
            rotationX: 90,
            y: 20,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            rotationX: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactForm,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Social buttons 3D hover effects
        socialButtons.forEach((btn, index) => {
          gsap.set(btn, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          })

          // Continuous subtle rotation
          gsap.to(btn, {
            rotationY: Math.sin(index) * 5,
            rotationX: Math.cos(index) * 3,
            duration: 3 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2,
          })

          btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
              scale: 1.2,
              rotationY: 180,
              rotationX: 10,
              z: 20,
              duration: 0.6,
              ease: "back.out(1.7)",
            })
          })

          btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.4,
              ease: "power2.out",
            })
          })
        })

        // Form input focus effects
        formInputs.forEach((input) => {
          input.addEventListener("focus", () => {
            gsap.to(input, {
              scale: 1.02,
              rotationX: -2,
              z: 5,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          input.addEventListener("blur", () => {
            gsap.to(input, {
              scale: 1,
              rotationX: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })
      }
      
      if (pricingRef.current) {
        const cards = pricingRef.current.querySelectorAll(".pricing-card")
        const features = pricingRef.current.querySelectorAll(".pricing-feature")
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9, rotationY: 15, transformPerspective: 1000 },
          { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: pricingRef.current, start: "top 80%", toggleActions: "play none none reverse" } },
        )
        gsap.fromTo(
          features,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: pricingRef.current, start: "top 70%", toggleActions: "play none none reverse" } },
        )
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, y: -10, rotationY: 5, boxShadow: "0 20px 40px rgba(0, 255, 255, 0.2)", duration: 0.3, ease: "power2.out" }))
          card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, y: 0, rotationY: 0, boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.3, ease: "power2.out" }))
        })
      }

      if (aboutRef.current) {
        const icons = aboutRef.current.querySelectorAll(".tech-icon")
        const stats = aboutRef.current.querySelectorAll(".stat-item")
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.5, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: { amount: 1, grid: [3, 2], from: "center" }, ease: "back.out(1.7)", scrollTrigger: { trigger: aboutRef.current, start: "top 70%", toggleActions: "play none none reverse" } },
        )
        icons.forEach((icon) => {
          icon.addEventListener("mouseenter", () => gsap.to(icon, { scale: 1.1, y: -5, duration: 0.3, ease: "power2.out" }))
          icon.addEventListener("mouseleave", () => gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" }))
        })
        stats.forEach((stat, index) => {
          const number = stat.querySelector(".stat-number")
          gsap.fromTo(
            stat,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: index * 0.2, ease: "power2.out", scrollTrigger: { trigger: stat, start: "top 85%", toggleActions: "play none none reverse" } },
          )
          if (number) {
            const finalValue = number.textContent
            gsap.fromTo(
              number,
              { textContent: "0" },
              { textContent: finalValue, duration: 2, delay: index * 0.2 + 0.5, ease: "power2.out", snap: { textContent: 1 }, scrollTrigger: { trigger: stat, start: "top 85%", toggleActions: "play none none reverse" } },
            )
          }
        })
      }

      const serviceCards = document.querySelectorAll(".service-card")
      serviceCards.forEach((card) => {
        const icon = card.querySelector(".service-icon")
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.05, y: -10, rotationY: 5, duration: 0.3, ease: "power2.out" })
          gsap.to(icon, { rotation: 360, scale: 1.2, duration: 0.6, ease: "back.out(1.7)" })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, y: 0, rotationY: 0, duration: 0.3, ease: "power2.out" })
          gsap.to(icon, { rotation: 0, scale: 1, duration: 0.4, ease: "power2.out" })
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets",
      features: ["Penetration Testing", "Security Audits", "Threat Assessment", "Incident Response"],
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites and web applications",
      features: ["Angular/Next.js", "Full-Stack Development", "E-commerce", "API Integration"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      features: ["iOS & Android", "Flutter", "Kotlin", "Play Store Deployment"],
    },
  ]

  const projects = [
    {
      title: "Intrusion Detection System",
      category: "Cybersecurity",
      description: "A security tool that monitors web servers traffic and system activity for malicious activity",
      tech: ["Python", "FastApi", "Angular", "PostgreSQL", "Stripe", "SQLAlchemy", "ng2-charts"],
      image: "/las.png",
    },
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Sustainable e-commerce platform for beekeeping products",
      tech: ["Python", "FastApi", "Angular", "PostgreSQL", "Bootstrap", "Gsap", "Github Actions", "Docker"],
      image: "/apiculture.png",
    },
    {
      title: "PFE PFA Book",
      category: "Mobile Development",
      description: "Cross-platform for managing internships books",
      tech: ["Dart", "Flutter", "Firebase", "Github", "PlayStore Deployment", "Google Analytics"],
      image: "/pfepfa.jpeg",
    },
  ]

  const technologies = ["Angular", "Next.js", "FastAPI", "Spring Boot", "Node.js", "TypeScript", "Python", "PostgreSQL", "Kotlin", "Flutter", "Docker", "CI/CD"]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$1,200",
      period: "per project",
      description: "Perfect for small businesses and startups",
      features: [
        "Basic Security Assessment",
        "Simple Web Application (Angular/Next.js)",
        "Mobile App Prototype (Flutter)",
        "PostgreSQL Database Setup",
        "3 Revisions",
        "Email Support",
        "1 Month Support",
        "Basic CI/CD Setup",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      price: "$3,500",
      period: "per project",
      description: "Ideal for growing businesses with complex needs",
      features: [
        "Comprehensive Penetration Testing",
        "Full-Stack Web Platform (FastAPI + Angular)",
        "Cross-Platform Mobile App (Flutter + Kotlin)",
        "Advanced Database Design (PostgreSQL)",
        "Payment Integration (Stripe)",
        "Analytics Integration",
        "Unlimited Revisions",
        "Priority Support",
        "3 Months Support",
        "Docker Containerization",
        "Complete CI/CD Pipeline",
        "Performance Optimization",
      ],
      popular: true,
      buttonText: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations requiring enterprise solutions",
      features: [
        "Advanced Intrusion Detection System",
        "Enterprise Web Solutions (Microservices)",
        "Native Mobile Applications (iOS & Android)",
        "Multi-Database Architecture",
        "Custom API Development",
        "Advanced Security Audits",
        "Real-time Monitoring & Analytics",
        "Unlimited Revisions",
        "24/7 Dedicated Support",
        "12 Months Support",
        "Custom Integrations",
        "Training & Documentation",
        "Ongoing Maintenance",
        "Scalable Infrastructure",
      ],
      popular: false,
      buttonText: "Contact Sales",
    },
  ]

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={() => {window.location.hash = "";window.location.hash = "hero"}} className="flex items-center space-x-2 cursor-pointer" >
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SoftHub</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-white/80 hover:text-white transition-colors">
                Services
              </a>
              <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6" id="hero">
        <div className="container mx-auto text-center">
          <div>
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-6 opacity-0">
              Secure. Build.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Innovate.
              </span>
            </h1>
            <p ref={subtitleRef} className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              SoftHub delivers cutting-edge cybersecurity solutions, modern web applications, and innovative mobile
              experiences that drive your business forward.
            </p>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton
                size="lg"
                onClick={() => {
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </CustomButton>
              <CustomButton
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View Portfolio
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6" ref={servicesRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Expertise</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              We specialize in three core areas that form the foundation of modern digital solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <CustomCard
                key={index}
                className="service-card hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <CustomCardHeader>
                  <div className="service-icon w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CustomCardTitle className="text-white text-xl">{service.title}</CustomCardTitle>
                  <CustomCardDescription>{service.description}</CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-white/80">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-black/20" ref={projectsRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Showcasing our latest work across cybersecurity, web, and mobile development
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <CustomCard
                key={index}
                className="project-card overflow-hidden hover:scale-[1.01] transition-transform duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg?height=200&width=300&query=project+image"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                  <div className="absolute top-4 left-4">
                    <CustomBadge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0">
                      {project.category}
                    </CustomBadge>
                  </div>
                </div>
                <CustomCardHeader>
                  <CustomCardTitle className="text-white">{project.title}</CustomCardTitle>
                  <CustomCardDescription>{project.description}</CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <CustomBadge key={idx} variant="secondary">
                        {tech}
                      </CustomBadge>
                    ))}
                  </div>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6" ref={techRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technologies We Master</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Cutting-edge tools and frameworks that power our solutions
            </p>
          </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="tech-badge group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative z-10 mb-2">
                  <div className="w-8 h-8 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="relative z-10 text-white font-medium text-sm group-hover:text-cyan-300 transition-colors duration-300">
                  {tech}
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="tech-stat">
              <div className="text-3xl font-bold text-cyan-400 mb-2">12+</div>
              <div className="text-white/70">Technologies</div>
            </div>
            <div className="tech-stat">
              <div className="text-3xl font-bold text-purple-400 mb-2">5+</div>
              <div className="text-white/70">Years Experience</div>
            </div>
            <div className="tech-stat">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-white/70">Up to Date</div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-black/20" ref={pricingRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Flexible pricing options designed to scale with your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <CustomCard
                key={index}
                className={`pricing-card relative transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? "border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-purple-600/10"
                    : "hover:bg-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <CustomBadge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0 px-4 py-1">
                      Most Popular
                    </CustomBadge>
                  </div>
                )}

                <CustomCardHeader className="text-center">
                  <CustomCardTitle className="text-2xl mb-2">{plan.name}</CustomCardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/70 ml-2">{plan.period}</span>
                  </div>
                  <CustomCardDescription className="text-base">{plan.description}</CustomCardDescription>
                </CustomCardHeader>

                <CustomCardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="pricing-feature flex items-center text-white/80">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CustomButton
                    className="w-full"
                    onClick={() => {
                      // Prefill plan and scroll to contact
                      const params = new URLSearchParams(window.location.search)
                      params.set("plan", plan.name)
                      window.history.replaceState(null, "", `?${params.toString()}#contact`)
                      if (planSelectRef.current) {
                        planSelectRef.current.value = plan.name
                      }
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {plan.popular ? "Select Professional" : "Select Plan"}
                  </CustomButton>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/60 mb-4">All plans include free consultation and project planning</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                No Hidden Fees
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Money-Back Guarantee
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                Flexible Payment Terms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6" ref={aboutRef}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About SoftHub</h2>
              <p className="text-white/80 text-lg mb-6">
                We are a team of passionate developers and cybersecurity experts dedicated to creating secure,
                innovative digital solutions.
              </p>
              <p className="text-white/80 text-lg mb-8">
                Our mission is to help businesses thrive in the digital age by providing robust, scalable, and secure
                technology solutions that drive growth and protect valuable assets.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-cyan-400 mb-2">50+</div>
                  <div className="text-white/70">Projects Completed</div>
                </div>
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-purple-400 mb-2">5+</div>
                  <div className="text-white/70">Years Experience</div>
                </div>
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-white/70">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="icon-grid w-full h-96 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Server className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center cursor-pointer">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-black/20" ref={contactRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ready to secure and scale your digital presence? Get in touch with us today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="contact-info">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="contact-item flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-white/70">hello@softhub.com</div>
                  </div>
                </div>
                <div className="contact-item flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-white/70">+216 27 553 981</div>
                  </div>
                </div>
                <div className="contact-item flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Location</div>
                    <div className="text-white/70">Monastir, Tunisia</div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <CustomButton size="icon" variant="outline" onClick={() => window.open("https://github.com/essayeswajih", "_blank")} aria-label="GitHub">
                  <Github className="w-5 h-5 cursor-pointer" />
                </CustomButton>
                <CustomButton size="icon" variant="outline" onClick={() => window.open("https://www.linkedin.com/in/essayes-wajih/", "_blank")} aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 cursor-pointer" />
                </CustomButton>
                <CustomButton size="icon" variant="outline" onClick={() => window.open("https://wa.me/21627553981", "Whatsapp")} aria-label="Whatsapp">
                  <PhoneCall className="w-5 h-5 cursor-pointer" />
                </CustomButton>
              </div>
            </div>

            <CustomCard className="contact-form">
              <CustomCardHeader>
                <CustomCardTitle className="text-white">Send us a message</CustomCardTitle>
                <CustomCardDescription>We’ll reply within 1–2 business days.</CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent className="space-y-4">
                <form action={action} className="space-y-4" aria-describedby="form-status">
                  {/* Honeypot */}
                  <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="text-white/90 text-sm">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        required
                        className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                        placeholder="John"
                        aria-invalid={!!state?.errors?.firstName}
                        aria-describedby={state?.errors?.firstName ? "firstName-error" : undefined}
                      />
                      {state?.errors?.firstName && (
                        <p id="firstName-error" className="mt-1 text-xs text-red-300">{state.errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-white/90 text-sm">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        required
                        className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                        placeholder="Doe"
                        aria-invalid={!!state?.errors?.lastName}
                        aria-describedby={state?.errors?.lastName ? "lastName-error" : undefined}
                      />
                      {state?.errors?.lastName && (
                        <p id="lastName-error" className="mt-1 text-xs text-red-300">{state.errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-white/90 text-sm">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                      placeholder="john@example.com"
                      aria-invalid={!!state?.errors?.email}
                      aria-describedby={state?.errors?.email ? "email-error" : undefined}
                    />
                    {state?.errors?.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-300">{state.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="plan" className="text-white/90 text-sm">Plan</label>
                    <select
                      id="plan"
                      name="plan"
                      ref={planSelectRef}
                      className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                      defaultValue=""
                    >
                      <option value="">General Inquiry</option>
                      {pricingPlans.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-white/90 text-sm">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      minLength={10}
                      className="form-input w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
                      placeholder="Tell us about your project..."
                      aria-invalid={!!state?.errors?.message}
                      aria-describedby={state?.errors?.message ? "message-error" : undefined}
                    ></textarea>
                    {state?.errors?.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-300">{state.errors.message}</p>
                    )}
                  </div>

                  <CustomButton type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Sending..." : "Send Message"}
                  </CustomButton>

                  <div id="form-status" className={`text-sm mt-2 ${state?.ok ? "text-green-300" : "text-white/80"}`} aria-live="polite">
                    {state?.message}
                  </div>
                </form>
              </CustomCardContent>
            </CustomCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div onClick={() => {window.location.hash = "";window.location.hash = "hero"}} className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SoftHub</span>
            </div>
            <div className="text-white/60 text-sm">© 2025 SoftHub. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Success flash overlay */}
      {successFlash && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
          <div className="rounded-lg bg-emerald-500/90 text-white px-4 py-2 shadow-lg">
            Message sent successfully!
          </div>
        </div>
      )}
    </div>
  )
}
