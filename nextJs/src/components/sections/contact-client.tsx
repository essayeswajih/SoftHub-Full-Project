"use client"

import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { useActionState, useEffect, useMemo, useRef, useState } from "react"
import { sendContactEmail, type ContactState } from "@/app/actions/send-emails"

export default function ContactClient() {
  const planSelectRef = useRef<HTMLSelectElement>(null)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const plan = params.get("plan")
    if (plan && planSelectRef.current) {
      planSelectRef.current.value = plan
    }
  }, [])

  const initial: ContactState = useMemo(() => ({ ok: false, message: "" }), [])
  const [state, action, isPending] = useActionState(sendContactEmail, initial)

  useEffect(() => {
    if (state?.ok) {
      setFlash(true)
      const t = setTimeout(() => setFlash(false), 2500)
      return () => clearTimeout(t)
    }
  }, [state?.ok])

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Let’s Work Together</h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Ready to secure and scale your digital presence? Get in touch with us today.
          </p>
        </div>
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 items-start">
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <ContactItem icon={<Mail className="w-6 h-6 text-white" />} label="Email" value="hello@softhub.com" />
              <ContactItem icon={<Phone className="w-6 h-6 text-white" />} label="Phone" value="+216 27 553 981" />
              <ContactItem icon={<MapPin className="w-6 h-6 text-white" />} label="Location" value="Monastir, Tunisia" />
            </div>
            <div className="flex gap-3 mt-6">
              <SocialLink href="#" label="GitHub" icon={<Github className="w-5 h-5" />} />
              <SocialLink href="#" label="LinkedIn" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="#" label="Twitter/X" icon={<Twitter className="w-5 h-5" />} />
            </div>
          </div>

          <div className="rounded-md border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="p-6">
              <h4 className="text-white text-lg font-semibold">Send us a message</h4>
              <p className="text-white/70 text-sm mt-1">We’ll reply within 1–2 business days.</p>
            </div>
            <div className="px-6 pb-6">
              <form action={action} className="space-y-4" aria-describedby="form-status">
                <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    error={state?.errors?.firstName}
                    required
                  />
                  <Field
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    error={state?.errors?.lastName}
                    required
                  />
                </div>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="john@example.com"
                  error={state?.errors?.email}
                  required
                />
                <div>
                  <label htmlFor="plan" className="text-white/90 text-sm">Plan</label>
                  <select
                    id="plan"
                    name="plan"
                    ref={planSelectRef}
                    className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                    defaultValue=""
                  >
                    <option value="">General Inquiry</option>
                    <option value="Starter">Starter</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <Field
                  as="textarea"
                  rows={4}
                  id="message"
                  name="message"
                  label="Message"
                  placeholder="Tell us about your project..."
                  error={state?.errors?.message}
                  required
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex w-full items-center justify-center rounded-md px-5 py-2.5 text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
                <div id="form-status" className={`text-sm ${state?.ok ? "text-emerald-300" : "text-white/80"}`} aria-live="polite">
                  {state?.message}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {flash && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
          <div className="rounded-lg bg-emerald-500/90 text-white px-4 py-2 shadow-lg">Message sent successfully!</div>
        </div>
      )}
    </section>
  )
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 grid place-items-center" aria-hidden>
        {icon}
      </div>
      <div>
        <div className="text-white font-medium">{label}</div>
        <div className="text-white/70 text-sm">{value}</div>
      </div>
    </div>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center rounded-md p-2 text-white border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
    >
      {icon}
    </a>
  )
}

function Field(props: any) {
  const {
    as = "input",
    id,
    name,
    type = "text",
    label,
    placeholder,
    error,
    rows,
    required,
  } = props
  const Tag = as as any
  const describedBy = error ? `${id}-error` : undefined
  return (
    <div>
      <label htmlFor={id} className="text-white/90 text-sm">{label}</label>
      <Tag
        id={id}
        name={name}
        type={type}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-300">{error}</p>
      )}
    </div>
  )
}
