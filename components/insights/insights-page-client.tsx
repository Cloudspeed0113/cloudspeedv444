"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ExternalLink, BarChart3 } from "lucide-react"
import { BrokerLogo, RegulatorBadge, AutoRebateBadge } from "@/lib/broker-utils"
import { activeBrokers, getBestBrokerForInstrument, getNetCost, getSpreadCost, getRebate } from "@/lib/broker-data"

// TradingView Chart import
import TradingViewChart from "@/components/insights/TradingViewChart";

export function InsightsPageClient() {
  const { t } = useLanguage()
  const [selectedInstrument, setSelectedInstrument] = useState("XAUUSD")
  const [selectedTimeframe, setSelectedTimeframe] = useState("today")

  const instruments = [
    { value: "XAUUSD", label: "XAU/USD (Gold)" },
    { value: "EURUSD", label: "EUR/USD" },
    { value: "USDJPY", label: "USD/JPY" },
    { value: "GBPUSD", label: "GBP/USD" },
  ]

  const timeframes = [
    { value: "today", label: t.insights?.today || "Today" },
    { value: "week", label: t.insights?.thisWeek || "This week" },
  ]

  const bestBroker = useMemo(() => {
    return getBestBrokerForInstrument(selectedInstrument)
  }, [selectedInstrument])

  const insightCards = useMemo(() => {
    return [
      {
        id: 1,
        instrument: "XAUUSD",
        title: t.insights?.goldVolatility || "Gold showing increased volatility",
        analysis:
          t.insights?.goldAnalysis ||
          "XAU/USD has been ranging between $2,350-$2,420 with potential breakout signals. Higher volatility means tighter spread control becomes more important.",
        suggestedBroker: activeBrokers.find((b) => b.id === "icmarkets") || activeBrokers[0],
        tag: t.insights?.costAdvantage || "Cost advantage",
        tagType: "cost" as const,
      },
      {
        id: 2,
        instrument: "EURUSD",
        title: t.insights?.forexStability || "EUR/USD consolidating at key level",
        analysis:
          t.insights?.forexAnalysis ||
          "The pair is testing 1.0850 support with ECB policy in focus. Traders may benefit from swap-free accounts for longer holds.",
        suggestedBroker: activeBrokers.find((b) => b.id === "exness") || activeBrokers[1],
        tag: t.insights?.stableExecution || "Stable execution",
        tagType: "execution" as const,
      },
      {
        id: 3,
        instrument: "USDJPY",
        title: t.insights?.jpyWeakness || "USD/JPY approaching intervention zone",
        analysis:
          t.insights?.jpyAnalysis ||
          "With USD/JPY above 155, intervention risk is elevated. Consider brokers with strong regulatory oversight and execution quality.",
        suggestedBroker: activeBrokers.find((b) => b.id === "xm") || activeBrokers[2],
        tag: t.insights?.wellRegulated || "Well regulated",
        tagType: "regulation" as const,
      },
    ]
  }, [t, activeBrokers])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground hero-title">
            {t.insights?.title || "Cloud Speed Insights"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.insights?.subtitle || "Market context, cost analysis, and execution views powered by Cloud Speed."}
          </p>
        </div>
      </section>

      {/* Instrument & Timeframe Selector */}
      <section className="py-6 border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="relative">
              <select
                value={selectedInstrument}
                onChange={(e) => setSelectedInstrument(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {instruments.map((inst) => (
                  <option key={inst.value} value={inst.value}>
                    {inst.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            <div className="flex rounded-lg bg-card border border-border overflow-hidden">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setSelectedTimeframe(tf.value)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    selectedTimeframe === tf.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-2">
              <Card className="p-4 border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {t.insights?.marketView || "Cloud Speed Market View"}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {instruments.find((i) => i.value === selectedInstrument)?.label}
                  </span>
                </div>

                {/* TradingView Chart */}
                <TradingViewChart
                  symbol={selectedInstrument}
                  interval={selectedTimeframe === "today" ? "60" : "240"}
                  theme="dark"
                  height={420}
                />
              </Card>
            </div>

            {/* Cost Snapshot */}
            <div className="lg:col-span-1">
              <Card className="p-5 border-border bg-card h-full">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  {t.insights?.lowestCostOn || "Lowest net cost on"}{" "}
                  {instruments.find((i) => i.value === selectedInstrument)?.label?.split(" ")[0]}
                </h3>

                {bestBroker && (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <BrokerLogo name={bestBroker.name} logoInitials={bestBroker.logoInitials} size={48} />
                      <div>
                        <h4 className="font-semibold text-foreground">{bestBroker.name}</h4>
                        <div className="flex gap-1 mt-1">
                          {bestBroker.regulation.slice(0, 2).map((reg) => (
                            <RegulatorBadge key={reg} regulator={reg} size="sm" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 p-3 bg-secondary/50 rounded-lg mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t.common?.spread || "Spread"}</span>
                        <span className="font-mono text-foreground">
                          ~${getSpreadCost(bestBroker, selectedInstrument).toFixed(1)}/lot
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t.common?.rebate || "Rebate"}</span>
                        <span className="font-mono text-green-500">
                          -${getRebate(bestBroker, selectedInstrument).toFixed(1)}/lot
                        </span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-medium text-foreground">{t.common?.netCost || "Net cost"}</span>
                        <span className="font-mono font-semibold text-accent">
                          ~${getNetCost(bestBroker, selectedInstrument).toFixed(1)}/lot
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <AutoRebateBadge hasAutoRebate={bestBroker.autoRebate} size="sm" />
                      {bestBroker.swapFreeAvailable && <span className="badge-swap-free text-xs px-1.5 py-0.5">Swap-free</span>}
                    </div>

                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                      onClick={() => window.open(bestBroker.trackingUrl, "_blank")}
                    >
                      {t.common?.openWithRebate || "Open with rebate"}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Insight Cards */}
      <section className="py-8 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {t.insights?.marketInsights || "Market Insights"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {insightCards.map((card) => (
              <Card key={card.id} className="p-5 border-border hover:border-border-hover transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                    {card.instrument}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      card.tagType === "cost"
                        ? "bg-green-500/10 text-green-500"
                        : card.tagType === "execution"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{card.analysis}</p>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2">
                    {t.insights?.suggestedBroker || "Suggested broker"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BrokerLogo name={card.suggestedBroker.name} logoInitials={card.suggestedBroker.logoInitials} size={32} />
                      <span className="font-medium text-foreground text-sm">{card.suggestedBroker.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs rounded-lg border-border bg-transparent"
                      asChild
                    >
                      <a href={`/brokers/${card.suggestedBroker.id}`}>{t.common?.viewBroker || "View"}</a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            {t.insights?.readyToTrade || "Ready to reduce your trading costs?"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t.insights?.compareBrokers || "Compare brokers and find the lowest net cost for your trading style."}
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
              <a href="/compare">{t.common?.compare || "Compare brokers"}</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 border-border bg-transparent">
              <a href="/brokers">{t.common?.viewAllBrokers || "View all brokers"}</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
