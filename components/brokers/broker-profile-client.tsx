"use client"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Shield,
  Calendar,
  MapPin,
  Globe,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { BrokerDetails } from "@/data/broker-details"
import { BrokerLogo, RegulatorBadge, StarRating, extractDomain } from "@/lib/broker-utils"
import { useRouter } from "next/navigation"

interface Props {
  broker: BrokerDetails
}

export function BrokerProfileClient({ broker }: Props) {
  const router = useRouter()
  const minDeposit = broker.accountTypes[0]?.minDeposit || "N/A"
  const maxRebate = broker.rebateInfo.reduce((max, r) => {
    const val = Number.parseFloat(r.rebate.replace(/[^0-9.]/g, ""))
    return val > max ? val : max
  }, 0)
  const hasAutoRebate = broker.rebateInfo.some((r) => r.autoRebate)
  const instrumentCategories = broker.instruments.map((i) => i.category).slice(0, 5)
  const domain = extractDomain(broker.trackingUrl)
  const maxLeverage = broker.accountTypes[0]?.leverage || "1:500"

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Back Navigation */}
        <Link
          href="/brokers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Brokers
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column (70%) - Main content */}
          <div className="flex-1 lg:w-[70%] min-w-0">
            {/* Section 1: Broker Header */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-40 h-16 flex items-center justify-center">
                    <BrokerLogo
                      name={broker.name}
                      logo={broker.logo}
                      domain={domain}
                      size={64}
                      className="h-16 w-auto"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">{broker.name}</h1>
                    <div className="bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                      <StarRating rating={broker.rating} size="sm" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {broker.regulations.map((reg) => (
                      <RegulatorBadge key={reg} regulator={reg} size="md" />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Founded {broker.foundedYear}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="h-4 w-4" />
                      {broker.country}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {broker.headquarters}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{broker.description}</p>
            </Card>

            {/* Section 2: Trading Cost Overview */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <h2 className="text-lg font-semibold text-foreground mb-4">Trading Cost Overview</h2>
              <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="text-xs font-medium text-muted-foreground">Instrument</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Spread Cost</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Swap Long</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Swap Short</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Rebate</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground text-right">Net Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {broker.tradingCosts.map((cost, idx) => {
                      const spreadVal = Number.parseFloat(cost.avgSpread.replace(/[^0-9.-]/g, "")) || 0
                      const rebateVal = Number.parseFloat(cost.rebate.replace(/[^0-9.-]/g, "")) || 0
                      const traderNetCost = spreadVal - rebateVal
                      const netCostDisplay =
                        traderNetCost < 0
                          ? `-$${Math.abs(traderNetCost).toFixed(2)}/lot`
                          : `$${traderNetCost.toFixed(2)}/lot`

                      return (
                        <TableRow key={idx} className="border-border/30 hover:bg-muted/30 transition-colors">
                          <TableCell className="font-medium text-foreground text-sm">{cost.instrument}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{cost.avgSpread}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{cost.swapLong}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{cost.swapShort}</TableCell>
                          <TableCell className="text-sm font-medium text-emerald-600">{cost.rebate}</TableCell>
                          <TableCell
                            className={`text-sm font-semibold text-right ${traderNetCost <= 0 ? "text-emerald-600" : "text-foreground"}`}
                          >
                            {netCostDisplay}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Section 3: Account Types */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <h2 className="text-lg font-semibold text-foreground mb-4">Account Types</h2>
              <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="text-xs font-medium text-muted-foreground">Account Type</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Min Deposit</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Base Currency</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Leverage</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Commission</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Swap Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {broker.accountTypes.map((account, idx) => (
                      <TableRow key={idx} className="border-border/30 hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-foreground text-sm">{account.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{account.minDeposit}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {account.baseCurrency.join(", ")}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{account.leverage}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{account.commission}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{account.swapType}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Section 4: Execution Details */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">Execution Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Max Leverage</p>
                  <p className="text-lg font-semibold text-foreground">{maxLeverage}</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Margin Call / Stop-out</p>
                  <p className="text-lg font-semibold text-foreground">100% / 50%</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Execution Type</p>
                  <p className="text-lg font-semibold text-foreground">Market / Instant</p>
                </div>
              </div>

              {/* Trading Hours */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-foreground">Trading Hours (Server Time GMT+0)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded-md">
                    <span className="text-sm text-muted-foreground">Forex</span>
                    <span className="text-sm font-medium text-foreground">Sun 22:00 - Fri 22:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded-md">
                    <span className="text-sm text-muted-foreground">Gold/Silver</span>
                    <span className="text-sm font-medium text-foreground">Sun 23:00 - Fri 22:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded-md">
                    <span className="text-sm text-muted-foreground">Indices</span>
                    <span className="text-sm font-medium text-foreground">Mon 00:00 - Fri 21:00</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section 5: Platforms Supported */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <h2 className="text-lg font-semibold text-foreground mb-4">Platforms Supported</h2>
              <div className="flex flex-wrap gap-2">
                {broker.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="px-4 py-2 text-sm font-medium">
                    {platform}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Section 6: Instruments */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <h2 className="text-lg font-semibold text-foreground mb-4">Instruments</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {broker.instruments.map((inst) => (
                  <div key={inst.category} className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-semibold text-foreground mb-1">{inst.count}</p>
                    <p className="text-xs text-muted-foreground">{inst.category}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section 7: Rebate Section */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-semibold text-foreground">Rebate Details</h2>
              </div>
              <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="text-xs font-medium text-muted-foreground">Account</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Instrument</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Rebate</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Auto Rebate</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Payout Frequency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {broker.rebateInfo.map((rebate, idx) => (
                      <TableRow key={idx} className="border-border/30 hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-foreground text-sm">{rebate.account}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{rebate.instrument}</TableCell>
                        <TableCell className="text-sm font-medium text-emerald-600">{rebate.rebate}</TableCell>
                        <TableCell>
                          {rebate.autoRebate ? (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              Manual
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{rebate.payoutFrequency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Section 8: Regulation & Safety */}
            <Card className="p-6 sm:p-8 mb-6 border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">Regulation & Safety</h2>
              </div>
              <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="text-xs font-medium text-muted-foreground">Regulator</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Entity</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">License ID</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Jurisdiction</TableHead>
                      <TableHead className="text-xs font-medium text-muted-foreground">Protection</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {broker.regulationDetails.map((reg, idx) => (
                      <TableRow key={idx} className="border-border/30 hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-foreground text-sm">{reg.regulator}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{reg.entity}</TableCell>
                        <TableCell className="text-sm font-mono text-muted-foreground">{reg.licenseId}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{reg.jurisdiction}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{reg.protection}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Right Column (30%) - Sticky Sidebar */}
          <div className="hidden lg:block lg:w-[30%] flex-shrink-0">
            <div className="sticky top-24">
              <Card className="p-6 border-border/50">
                {/* Primary CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90 h-14 text-base font-semibold"
                >
                  <a href={broker.trackingUrl} target="_blank" rel="noopener noreferrer">
                    Open with rebate
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-3 rounded-xl h-11 bg-transparent"
                  onClick={() => router.push(`/compare?brokers=${broker.slug}`)}
                >
                  Compare
                </Button>

                <Button
                  variant="ghost"
                  className="w-full mt-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => window.open(`https://${domain}`, "_blank", "noopener,noreferrer")}
                >
                  View broker website
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </Button>

                {/* Summary Box */}
                <div className="mt-6 space-y-0">
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Auto Rebate</span>
                    <span className="text-sm font-medium text-foreground">
                      {hasAutoRebate ? (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Yes
                        </Badge>
                      ) : (
                        "No"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Max Rebate</span>
                    <span className="text-sm font-semibold text-emerald-600">${maxRebate.toFixed(2)}/lot</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Min Deposit</span>
                    <span className="text-sm font-medium text-foreground">{minDeposit}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Max Leverage</span>
                    <span className="text-sm font-medium text-foreground">{maxLeverage}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Platforms</span>
                    <span className="text-sm font-medium text-foreground">{broker.platforms.join(", ")}</span>
                  </div>
                  <div className="flex items-start justify-between py-3">
                    <span className="text-sm text-muted-foreground">Instruments</span>
                    <span className="text-sm font-medium text-foreground text-right">
                      {instrumentCategories.join(", ")}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-t border-border z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{broker.name}</p>
            <p className="text-sm text-emerald-600">Up to ${maxRebate.toFixed(2)}/lot rebate</p>
          </div>
          <Button asChild className="rounded-xl h-11 px-6">
            <a href={broker.trackingUrl} target="_blank" rel="noopener noreferrer">
              Open Account
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}
