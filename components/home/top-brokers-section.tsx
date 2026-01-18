"use client"

import Link from "next/link"
import { Section, SectionHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Mail, Handshake } from "lucide-react"
import { BrokerLogo, RegulatorBadge, StarRating, AutoRebateBadge, PriceLabel } from "@/lib/broker-utils"
import { activeBrokers, getNetCost, getSpreadCost, getRebate, type BrokerData } from "@/lib/broker-data"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

export function TopBrokersSection() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <Section>
      <SectionHeader
        title={t.brokers?.title || "Partner Brokers"}
        subtitle={t.brokers?.subtitle || "Compare trading costs across our partner network"}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
        {activeBrokers.map((broker) => (
          <ActiveBrokerCard key={broker.id} broker={broker} />
        ))}
      </div>

      <div className="mt-12">
        <Card className="p-8 bg-secondary/30 border-border/50 max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Handshake className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t.brokers?.partnershipTitle || "Partnership Opportunities"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t.brokers?.partnershipSubtitle ||
                "Interested in listing your broker on Cloud Speed? We partner with regulated brokers worldwide."}
            </p>
            <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="mailto:partner@cloudspeed.com">
                <Mail className="mr-2 h-4 w-4" />
                {t.brokers?.contactUs || "Contact us"}
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-full px-6 border-border bg-transparent hover:bg-secondary"
        >
          <Link href="/brokers">
            {t.common?.viewAllBrokers || "View all brokers"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  )
}

function ActiveBrokerCard({ broker }: { broker: BrokerData }) {
  const { t } = useLanguage()
  const router = useRouter()
  const spreadCost = getSpreadCost(broker)
  const rebate = getRebate(broker)
  const netCost = getNetCost(broker)

  return (
    <Card
      className="p-4 bg-card border-border hover:border-border-hover transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/brokers/${broker.id}`)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <BrokerLogo name={broker.name} logoInitials={broker.logoInitials} size={48} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground">{broker.name}</h3>
          <StarRating rating={broker.rating || 0} size="sm" />
        </div>
      </div>

      {/* Regulation */}
      <div className="flex flex-wrap gap-1 mb-3">
        {broker.regulation.slice(0, 3).map((reg) => (
          <RegulatorBadge key={reg} regulator={reg} size="sm" />
        ))}
      </div>

      {/* Cost Preview */}
      <div className="grid grid-cols-3 gap-2 p-2 bg-secondary/50 rounded-lg mb-3">
        <PriceLabel label={t.common?.spread || "Spread"} value={spreadCost} />
        <PriceLabel label={t.common?.rebate || "Rebate"} value={rebate} type="positive" />
        <PriceLabel label={t.common?.netCost || "Net"} value={netCost} type="cost" />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <AutoRebateBadge hasAutoRebate={broker.autoRebate} size="sm" />
        {broker.swapFreeAvailable && <span className="badge-swap-free text-xs px-1.5 py-0.5">Swap-free</span>}
        {broker.bonusAvailable && broker.bonusType !== "none" && (
          <span className="badge-bonus text-xs px-1.5 py-0.5">Bonus</span>
        )}
      </div>

      {/* CTA */}
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 h-9 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs font-medium"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/brokers/${broker.id}`)
          }}
        >
          {t.common?.viewBroker || "View broker"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-9 px-3 rounded-xl text-xs border-border bg-transparent"
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/compare?broker=${broker.id}`)
          }}
        >
          {t.common?.compare || "Compare"}
        </Button>
      </div>
    </Card>
  )
}
