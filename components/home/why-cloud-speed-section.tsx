import { content } from "@/lib/content"
import { TrendingDown, Scale, Workflow, Globe, Shield } from "lucide-react"

const icons = [TrendingDown, Scale, Workflow, Globe, Shield]

export function WhyCloudSpeedSection() {
  const { whyCloudSpeed } = content

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground text-center mb-12">
          {whyCloudSpeed.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyCloudSpeed.cards.map((card, i) => {
            const Icon = icons[i] || Shield
            return (
              <div key={i} className="glass-card rounded-2xl p-6 glow-hover">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
