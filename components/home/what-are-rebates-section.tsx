import { content } from "@/lib/content"
import { Check, Info } from "lucide-react"

export function WhatAreRebatesSection() {
  const { whatAreRebates } = content

  return (
    <section id="rebates" className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground text-center mb-12">
          {whatAreRebates.title}
        </h2>

        <div className="space-y-4 mb-8">
          {whatAreRebates.points.map((point, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/30">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-accent" />
              </div>
              <p className="text-foreground">{point}</p>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/30">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">{whatAreRebates.note}</p>
        </div>
      </div>
    </section>
  )
}
