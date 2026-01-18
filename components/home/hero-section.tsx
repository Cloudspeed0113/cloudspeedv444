import Link from "next/link"
import { Button } from "@/components/ui/button"
import { content } from "@/lib/content"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="animate-fade-in-up">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              {content.hero.headline}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">{content.hero.subheadline}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12"
              >
                <Link href={content.hero.cta1Href}>
                  {content.hero.cta1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 border-border/50 hover:bg-secondary bg-transparent"
              >
                <Link href={content.hero.cta2Href}>{content.hero.cta2}</Link>
              </Button>
            </div>
          </div>

          {/* Right: Comparison preview mockup */}
          <div className="animate-fade-in-up animate-delay-200 hidden lg:block">
            <div className="glass-card rounded-2xl p-6 glow-hover">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Broker Comparison Preview
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-4 gap-2 px-4 mb-2">
                <span className="text-xs text-muted-foreground">Broker</span>
                <span className="text-xs text-muted-foreground text-right">Spread</span>
                <span className="text-xs text-muted-foreground text-right">Rebate</span>
                <span className="text-xs text-muted-foreground text-right">Net Cost</span>
              </div>

              <div className="space-y-2">
                {[
                  { name: "IC Markets", spread: "$12.00", rebate: "-$7.50", net: "$4.50", badge: true },
                  { name: "Exness", spread: "$16.00", rebate: "-$9.00", net: "$7.00", badge: false },
                  { name: "XM", spread: "$25.00", rebate: "-$8.50", net: "$16.50", badge: false },
                ].map((broker) => (
                  <div
                    key={broker.name}
                    className={`relative p-4 rounded-xl transition-all ${
                      broker.badge ? "bg-accent/10 border border-accent/30" : "bg-secondary/50 border border-border/30"
                    }`}
                  >
                    {broker.badge && (
                      <span className="absolute -top-2 right-4 px-2 py-0.5 text-xs font-semibold bg-accent text-accent-foreground rounded-full">
                        Best match
                      </span>
                    )}
                    <div className="grid grid-cols-4 gap-2 items-center">
                      <span className="font-medium text-foreground text-sm">{broker.name}</span>
                      <span className="text-sm text-muted-foreground text-right font-mono">{broker.spread}</span>
                      <span className="text-sm text-accent text-right font-mono">{broker.rebate}</span>
                      <span className="text-sm font-semibold text-foreground text-right font-mono">{broker.net}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/30 text-center">
                <span className="text-xs text-muted-foreground">XAUUSD (Gold) · Per Standard Lot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
