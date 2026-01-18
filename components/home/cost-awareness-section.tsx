import { content } from "@/lib/content"

export function CostAwarenessSection() {
  const { costAwareness } = content

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight max-w-4xl mx-auto">
            {costAwareness.title}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            <code className="px-3 py-1 bg-secondary rounded-lg text-sm font-mono">{costAwareness.formula}</code>
          </p>
        </div>

        {/* Example card */}
        <div className="max-w-lg mx-auto">
          <div className="glass-card rounded-2xl p-8 glow-hover">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium">
                {costAwareness.example.instrument}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border/30">
                <span className="text-muted-foreground">Spread</span>
                <span className="font-medium text-foreground">{costAwareness.example.spread}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/30">
                <span className="text-muted-foreground">Rebate</span>
                <span className="font-medium text-accent">{costAwareness.example.rebate}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-foreground font-medium">Net cost</span>
                <span className="text-xl font-bold text-foreground">{costAwareness.example.netCost}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
