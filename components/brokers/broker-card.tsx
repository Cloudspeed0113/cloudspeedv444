"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight } from "lucide-react"
import { BrokerLogo, RegulatorBadge, StarRating, AutoRebateBadge, PriceLabel, extractDomain } from "@/lib/broker-utils"

interface Broker {
  id: string
  slug: string
  name: string
  logo: string
  regulation: string[]
  instruments: string[]
  platforms: string[]
  minDeposit: number
  maxRebatePerLot: number
  serviceFeePercent: number
  regions: string[]
  hasAutoRebate: boolean
  trackingUrl: string
  notes: string
  rating: number
  featured: boolean
}

interface BrokerCardProps {
  broker: Broker
}

export function BrokerCard({ broker }: BrokerCardProps) {
  const router = useRouter()

  const spreadPips = 0.8
  const spreadCost = spreadPips * 10
  const netCost = spreadCost - broker.maxRebatePerLot
  const domain = extractDomain(broker.trackingUrl)

  return (
    <Card
      className="w-[360px] px-6 py-6 bg-card rounded-2xl flex flex-col gap-3
                 border border-border shadow-sm
                 transition-all duration-200 ease-out cursor-pointer
                 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 hover:border-border"
      onClick={() => router.push(`/brokers/${broker.slug}`)}
    >
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-card border border-border/50 flex items-center justify-center overflow-hidden p-2">
          <BrokerLogo name={broker.name} logo={broker.logo} domain={domain} size={64} />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <h3
            className="font-semibold text-lg tracking-tight text-foreground mb-1"
            style={{ textShadow: "0px 1px 2px rgba(200,200,200,0.35)" }}
          >
            {broker.name}
          </h3>

          <div className="mb-2">
            <StarRating rating={broker.rating} size="md" />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {broker.regulation.map((reg) => (
              <RegulatorBadge key={reg} regulator={reg} size="sm" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>Min Deposit: ${broker.minDeposit}</span>
        {broker.regions.length > 0 && (
          <>
            <span className="text-border">|</span>
            <span>{broker.regions.slice(0, 2).join(", ")}</span>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {broker.instruments.slice(0, 4).map((instrument) => (
          <span
            key={instrument}
            className="text-xs font-medium text-muted-foreground bg-secondary border border-border px-2.5 py-1 rounded-full"
          >
            {instrument}
          </span>
        ))}
        {broker.instruments.length > 4 && (
          <span className="text-xs text-muted-foreground">+{broker.instruments.length - 4}</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-secondary/50 rounded-xl border border-border/50">
        <PriceLabel label="Spread" value={spreadCost} type="neutral" />
        <PriceLabel label="Rebate" value={broker.maxRebatePerLot} type="positive" />
        <PriceLabel label="Net Cost" value={netCost} type="cost" />
      </div>

      <div className="mt-1 h-8 flex items-center justify-center">
        <AutoRebateBadge hasAutoRebate={broker.hasAutoRebate} size="sm" />
      </div>

      <div className="flex gap-2 mt-1">
        <Button
          className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 
                     rounded-xl text-sm font-semibold"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            router.push(`/brokers/${broker.slug}`)
          }}
        >
          View broker
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-11 px-4 rounded-xl text-sm font-medium border-border 
                     text-foreground hover:bg-secondary bg-transparent"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            window.open(broker.trackingUrl, "_blank", "noopener,noreferrer")
          }}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
