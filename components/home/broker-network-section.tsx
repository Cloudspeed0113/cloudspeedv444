import { content } from "@/lib/content"

export function BrokerNetworkSection() {
  const { brokerNetwork } = content

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-8">{brokerNetwork.title}</h2>

        {/* Broker logos grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {brokerNetwork.brokers.map((broker) => (
            <div
              key={broker}
              className="w-32 h-16 rounded-xl bg-card border border-border/50 flex items-center justify-center glow-hover"
            >
              <span className="text-sm font-medium text-muted-foreground">{broker}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground max-w-xl mx-auto">{brokerNetwork.note}</p>
      </div>
    </section>
  )
}
