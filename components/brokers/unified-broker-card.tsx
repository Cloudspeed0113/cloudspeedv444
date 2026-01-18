"use client"

import {
  BrokerLogo,
  RegulatorBadge,
  InstrumentBadge,
  StarRating,
  AutoRebateBadge,
  BonusBadge,
  SwapFreeBadge,
  PlatformBadge,
  PriceLabel,
  BrokerCTAButtons,
  extractDomain,
  type BonusType,
} from "@/lib/broker-utils"

export interface UnifiedBrokerData {
  id: string
  slug: string
  name: string
  logo?: string
  domain: string
  rating: number
  // Trust
  regulation: string[]
  // Market
  instruments: string[]
  // Cost (primary layer)
  spreadCost: number
  rebate: number
  netCost: number
  // Incentives
  bonusType: BonusType
  swapFree: boolean | "region"
  // Execution
  platforms: string[]
  minDeposit: number
  hasAutoRebate: boolean
  trackingUrl: string
}

interface UnifiedBrokerCardProps {
  broker: UnifiedBrokerData
  variant?: "default" | "compact"
  mode?: "browse" | "compare"
}

export function UnifiedBrokerCard({ broker, variant = "default", mode = "browse" }: UnifiedBrokerCardProps) {
  const domain = broker.domain || extractDomain(broker.trackingUrl)

  return (
    <div
      className={`bg-card rounded-2xl border border-border flex flex-col
                 transition-all duration-200 ease-out
                 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-border-hover
                 ${variant === "compact" ? "p-4 w-full" : "p-5 w-[360px]"}`}
    >
      {/* IDENTITY: Logo + Name + Rating */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`flex-shrink-0 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center overflow-hidden p-1.5
                        ${variant === "compact" ? "w-12 h-12" : "w-16 h-16"}`}
        >
          <BrokerLogo name={broker.name} logo={broker.logo} domain={domain} size={variant === "compact" ? 40 : 56} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold tracking-tight text-foreground mb-1 truncate
                         ${variant === "compact" ? "text-sm" : "text-base"}`}
          >
            {broker.name}
          </h3>
          <StarRating rating={broker.rating} size="sm" />
        </div>
      </div>

      {/* TRUST: Regulation badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {broker.regulation.slice(0, 3).map((reg) => (
          <RegulatorBadge key={reg} regulator={reg} size="sm" />
        ))}
        {broker.regulation.length > 3 && (
          <span className="text-xs text-muted-foreground">+{broker.regulation.length - 3}</span>
        )}
      </div>

      {/* MARKET: Instruments */}
      <div className="flex flex-wrap gap-1 mb-3">
        {broker.instruments.slice(0, 4).map((inst) => (
          <InstrumentBadge key={inst} instrument={inst} />
        ))}
      </div>

      {/* COST: Primary layer - Spread, Rebate, Net Cost (highlighted) */}
      <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-secondary/30 rounded-xl border border-border/30 mb-3">
        <PriceLabel label="Spread" value={broker.spreadCost} type="neutral" />
        <PriceLabel label="Rebate" value={broker.rebate} type="positive" />
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Net Cost</span>
          <span
            className={`text-sm font-bold ${broker.netCost <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
          >
            {broker.netCost < 0 ? `-$${Math.abs(broker.netCost).toFixed(0)}` : `$${broker.netCost.toFixed(0)}`}/lot
          </span>
        </div>
      </div>

      {/* INCENTIVES: Bonus + Swap-free + Auto Rebate */}
      <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
        {broker.bonusType !== "none" && <BonusBadge type={broker.bonusType} size="sm" />}
        {broker.swapFree && <SwapFreeBadge available={broker.swapFree} size="sm" />}
        <AutoRebateBadge hasAutoRebate={broker.hasAutoRebate} size="sm" />
      </div>

      {/* EXECUTION: Platforms */}
      <div className="flex flex-wrap gap-1 mb-4">
        {broker.platforms.map((platform) => (
          <PlatformBadge key={platform} platform={platform} />
        ))}
        <span className="text-xs text-muted-foreground ml-1">Min: ${broker.minDeposit}</span>
      </div>

      {/* CTAs: Based on mode */}
      <div className="mt-auto">
        <BrokerCTAButtons
          trackingUrl={broker.trackingUrl}
          brokerSlug={broker.slug}
          mode={mode}
          variant={variant === "compact" ? "compact" : "full"}
        />
      </div>
    </div>
  )
}
