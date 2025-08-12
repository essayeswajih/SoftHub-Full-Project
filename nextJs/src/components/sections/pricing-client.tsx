"use client"

import { CheckCircle } from 'lucide-react'

export type PricingPlan = {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  buttonText?: string
}

export default function PricingClient({
  plans = [],
}: {
  plans?: PricingPlan[]
}) {
  return (
    <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Choose Your Plan</h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Flexible pricing options designed to scale with your business needs
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <article
              key={i}
              className={`relative rounded-md border backdrop-blur-sm p-6 transition-transform hover:scale-[1.01] ${
                plan.popular
                  ? "border-cyan-400/50 bg-gradient-to-br from-cyan-500/10 to-purple-600/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-medium px-3 py-1">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-white text-xl font-semibold text-center">{plan.name}</h3>
              <div className="text-center my-3">
                <span className="text-white text-3xl sm:text-4xl font-bold">{plan.price}</span>
                <span className="text-white/70 ml-2 text-sm">{plan.period}</span>
              </div>
              <p className="text-white/70 text-sm sm:text-base text-center">{plan.description}</p>
              <ul className="mt-4 sm:mt-6 space-y-2">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/90">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-[15px]">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => {
                  const params = new URLSearchParams(window.location.search)
                  params.set("plan", plan.name)
                  window.history.replaceState(null, "", `?${params.toString()}#contact`)
                }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-md px-5 py-2.5 text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {plan.popular ? "Select Professional" : plan.buttonText || "Select Plan"}
              </a>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <p className="text-white/60 mb-3 sm:mb-4 text-sm sm:text-base">
            All plans include free consultation and project planning
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/70">
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
  )
}
