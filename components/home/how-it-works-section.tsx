import { content } from "@/lib/content"
import { UserPlus, TrendingUp, Wallet, Info } from "lucide-react"

const icons = [UserPlus, TrendingUp, Wallet]

export function HowItWorksSection() {
  const { howItWorks } = content

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground text-center mb-16">
          {howItWorks.title}
        </h2>

        {/* 3-step horizontal layout */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-border via-accent/30 to-border" />

          {howItWorks.steps.map((step, i) => {
            const Icon = icons[i] || Wallet
            return (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Step number with icon */}
                <div className="relative z-10 w-24 h-24 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 glow-hover">
                  <Icon className="w-10 h-10 text-accent" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">{step.description}</p>
              </div>
            )
          })}
        </div>

        {/* Info note */}
        <div className="mt-12 flex items-start justify-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/30 max-w-2xl mx-auto">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">{howItWorks.note}</p>
        </div>
      </div>
    </section>
  )
}
