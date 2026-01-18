import Link from "next/link"
import { Section, SectionHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { content } from "@/lib/content"
import { ArrowRight, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

const symbolData = [
  { symbol: "EURUSD", direction: "up", note: "Momentum building above 1.0850" },
  { symbol: "XAUUSD", direction: "down", note: "Resistance at 2040 holding" },
  { symbol: "GBPUSD", direction: "range", note: "Consolidating near 1.2650" },
  { symbol: "USDJPY", direction: "up", note: "Breaking above 150.50" },
]

const directionConfig = {
  up: { label: "Up", icon: ArrowUpRight, className: "bg-emerald-50 text-emerald-700" },
  down: { label: "Down", icon: ArrowDownRight, className: "bg-red-50 text-red-700" },
  range: { label: "Range", icon: Minus, className: "bg-amber-50 text-amber-700" },
}

export function AiInsightsPreviewSection() {
  return (
    <Section>
      <SectionHeader title={content.aiSnapshot.title} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {symbolData.map((item) => {
          const config = directionConfig[item.direction as keyof typeof directionConfig]
          const Icon = config.icon
          return (
            <div key={item.symbol} className="p-4 bg-card border border-border/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">{item.symbol}</span>
                <Badge className={`${config.className} border-0 text-xs flex items-center gap-1 px-2 py-0.5`}>
                  <Icon className="h-3 w-3" />
                  {config.label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-8 text-center">
        <Button asChild variant="outline" size="sm" className="rounded-full px-6 border-border bg-transparent">
          <Link href="/ai-insights">
            Open AI Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  )
}
