"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, TrendingUp, Zap, BarChart2, Target, Flame } from "lucide-react"

const timeframes = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
]

const markets = [
  { value: "forex", label: "Forex" },
  { value: "indices", label: "Indices" },
  { value: "commodities", label: "Commodities" },
  { value: "crypto", label: "Crypto" },
]

const insights = [
  {
    id: 1,
    title: "Asia Session Volatility Snapshot",
    description:
      "JPY pairs showed elevated volatility during Tokyo open. USD/JPY range expanded 40 pips above average.",
    icon: Activity,
    tags: ["High impact", "JPY pairs"],
    market: "forex",
    timeframe: "today",
  },
  {
    id: 2,
    title: "Most Traded Pairs This Week",
    description: "EUR/USD leads with 23% of total volume. GBP/USD and USD/JPY follow closely behind.",
    icon: BarChart2,
    tags: ["Trending", "Volume analysis"],
    market: "forex",
    timeframe: "week",
  },
  {
    id: 3,
    title: "Momentum Watchlist",
    description: "Strong bullish momentum detected in AUD/USD and NZD/USD. RSI approaching overbought levels.",
    icon: TrendingUp,
    tags: ["Momentum", "Technical"],
    market: "forex",
    timeframe: "today",
  },
  {
    id: 4,
    title: "S&P 500 Range Analysis",
    description: "Index trading in tight range ahead of Fed decision. Breakout expected with increased volume.",
    icon: Target,
    tags: ["Range-bound", "US markets"],
    market: "indices",
    timeframe: "week",
  },
  {
    id: 5,
    title: "Gold Price Action Alert",
    description: "XAU/USD testing key resistance at $2,050. Previous attempts failed, but momentum building.",
    icon: Zap,
    tags: ["High impact", "Commodities"],
    market: "commodities",
    timeframe: "today",
  },
  {
    id: 6,
    title: "Bitcoin Weekly Summary",
    description: "BTC maintained support at $42,000. On-chain metrics suggest accumulation phase continuing.",
    icon: Flame,
    tags: ["Trending", "Crypto"],
    market: "crypto",
    timeframe: "week",
  },
]

export function AiInsightsClient() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today")
  const [selectedMarket, setSelectedMarket] = useState("forex")

  const filteredInsights = insights.filter(
    (insight) =>
      (selectedTimeframe === "month" || insight.timeframe === selectedTimeframe) && insight.market === selectedMarket,
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 p-6 bg-card rounded-2xl border border-border/50">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-foreground">Timeframe</p>
          <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <TabsList className="w-full sm:w-auto">
              {timeframes.map((tf) => (
                <TabsTrigger key={tf.value} value={tf.value} className="flex-1 sm:flex-none">
                  {tf.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-foreground">Market</p>
          <Tabs value={selectedMarket} onValueChange={setSelectedMarket}>
            <TabsList className="w-full sm:w-auto">
              {markets.map((m) => (
                <TabsTrigger key={m.value} value={m.value} className="flex-1 sm:flex-none">
                  {m.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsights.map((insight) => (
          <Card
            key={insight.id}
            className="p-6 bg-card border-border/50 rounded-2xl hover:shadow-md transition-shadow group"
          >
            <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 group-hover:bg-primary transition-colors">
              <insight.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{insight.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{insight.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {insight.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`text-xs ${
                    tag === "High impact"
                      ? "bg-red-100 text-red-700"
                      : tag === "Trending"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Badge variant="outline" className="text-xs text-muted-foreground">
              AI-generated mock data
            </Badge>
          </Card>
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No insights available for the selected filters.</p>
        </div>
      )}
    </div>
  )
}
