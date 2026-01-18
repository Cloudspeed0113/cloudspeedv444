"use client"

import type React from "react"
import { useState, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CheckCircle2,
  ArrowUpDown,
  ChevronRight,
  TrendingDown,
  Award,
  Coins,
  Star,
  ExternalLink,
  Gift,
  Moon,
  Zap,
  ChevronDown,
  X,
} from "lucide-react"
import {
  BrokerLogo,
  RegulatorBadge,
  PlatformBadge,
  StarRating,
  AutoRebateBadge,
  BonusBadge,
  SwapFreeBadge,
  BrokerCTAButtons,
} from "@/lib/broker-utils"
import { UnifiedBrokerCard, type UnifiedBrokerData } from "@/components/brokers/unified-broker-card"
import type { RebateRow, TopRatedBroker } from "@/data/rebates-data"
import { uniqueBrokers } from "@/data/rebates-data"
import { useLanguage } from "@/lib/language-context"

interface TopPicks {
  bestForGold: RebateRow[]
  bestForForex: RebateRow[]
  lowestNetCost: RebateRow[]
}

interface RebatesPageClientProps {
  data: RebateRow[]
  topPicks: TopPicks
  topRatedBrokers: TopRatedBroker[]
}

type Category = "All" | "Forex" | "Gold" | "Indices"
type SortField = "netCost" | "spreadCost" | "rebate"

export function RebatesPageClient({ data, topPicks, topRatedBrokers }: RebatesPageClientProps) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [sortField, setSortField] = useState<SortField>("netCost")
  const [sortAsc, setSortAsc] = useState(true)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mobileDrawerRow, setMobileDrawerRow] = useState<RebateRow | null>(null)

  const categories: Category[] = ["All", "Forex", "Gold", "Indices"]
  const filterOptions = [
    { key: "bonus", label: t.rebates.bonusAvailable, icon: Gift },
    { key: "swapFree", label: t.common.swapFree, icon: Moon },
    { key: "auto", label: t.rebates.autoRebate, icon: Zap },
  ]

  const filteredAndSortedData = useMemo(() => {
    let filtered = data

    if (selectedCategory !== "All") {
      filtered = filtered.filter((row) => row.category === selectedCategory)
    }

    if (activeFilters.includes("bonus")) {
      filtered = filtered.filter((row) => row.bonusType !== "none")
    }
    if (activeFilters.includes("swapFree")) {
      filtered = filtered.filter((row) => row.swapFree)
    }
    if (activeFilters.includes("auto")) {
      filtered = filtered.filter((row) => row.hasAutoRebate)
    }

    return [...filtered].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      return sortAsc ? aVal - bVal : bVal - aVal
    })
  }, [data, selectedCategory, sortField, sortAsc, activeFilters])

  // Transform uniqueBrokers to UnifiedBrokerData
  const brokerCards: UnifiedBrokerData[] = uniqueBrokers.map((b) => ({
    id: b.id,
    slug: b.id,
    name: b.name,
    domain: b.domain,
    rating: b.rating,
    regulation: b.regulation,
    instruments: b.instruments,
    spreadCost: b.spreadEurusd * 10,
    rebate: b.maxRebate,
    netCost: b.spreadEurusd * 10 - b.maxRebate,
    bonusType: b.bonusType,
    swapFree: b.swapFree,
    platforms: b.platforms,
    minDeposit: b.minDeposit,
    hasAutoRebate: b.hasAutoRebate,
    trackingUrl: b.trackingUrl,
  }))

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]))
  }

  const handleCardClick = (category: Category) => {
    setSelectedCategory(category)
  }

  const formatUsd = (value: number) => {
    if (value < 0) return `-$${Math.abs(value).toFixed(2)}/lot`
    return `$${value.toFixed(2)}/lot`
  }

  const renderTopPickCard = (
    title: string,
    icon: React.ReactNode,
    items: RebateRow[],
    highlight: "netCost" | "rebate",
    clickCategory?: Category,
  ) => (
    <div
      className={`card-base p-4 cursor-pointer glow-hover ${hoveredCard === title ? "scale-[1.02]" : ""}`}
      onClick={() => clickCategory && handleCardClick(clickCategory)}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-4">{idx + 1}.</span>
              <span className="font-medium text-foreground">{item.broker}</span>
              <span className="text-muted-foreground text-xs">{item.instrument}</span>
            </div>
            <span
              className={`font-semibold ${
                highlight === "netCost"
                  ? item.netCost <= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-foreground"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {highlight === "netCost" ? formatUsd(item.netCost) : formatUsd(item.rebate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTopRatedCard = (title: string, icon: React.ReactNode, brokers: TopRatedBroker[]) => (
    <div
      className={`card-base p-4 glow-hover ${hoveredCard === title ? "scale-[1.02]" : ""}`}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
      </div>
      <div className="space-y-2">
        {brokers.map((broker, idx) => (
          <Link
            key={broker.name}
            href={`/brokers/${broker.slug}`}
            className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0 hover:bg-secondary/50 -mx-2 px-2 rounded transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-4">{idx + 1}.</span>
              <BrokerLogo name={broker.name} domain={broker.domain} size={20} className="rounded" />
              <span className="font-medium text-foreground">{broker.name}</span>
            </div>
            <StarRating rating={broker.rating} size="sm" />
          </Link>
        ))}
      </div>
    </div>
  )

  const MobileRowCard = ({ row }: { row: RebateRow }) => {
    const traderNetCost = row.spreadCost - row.rebate
    return (
      <div className="card-base p-4 mb-3" onClick={() => setMobileDrawerRow(row)}>
        {/* Identity + Net Cost */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BrokerLogo name={row.broker} domain={row.domain} size={32} className="rounded" />
            <div>
              <span className="font-medium text-foreground text-sm">{row.broker}</span>
              <span className="text-xs text-muted-foreground ml-2">{row.instrument}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Net Cost</div>
            <div className={`font-bold text-sm ${traderNetCost <= 0 ? "text-emerald-600" : "text-foreground"}`}>
              {traderNetCost < 0 ? `-$${Math.abs(traderNetCost).toFixed(2)}` : `$${traderNetCost.toFixed(2)}`}/lot
            </div>
          </div>
        </div>

        {/* Incentives */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {row.bonusType !== "none" && <BonusBadge type={row.bonusType} size="sm" />}
          {row.swapFree && <SwapFreeBadge available={row.swapFree} size="sm" />}
          <AutoRebateBadge hasAutoRebate={row.hasAutoRebate} size="sm" />
        </div>

        {/* Expand hint */}
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <ChevronDown className="h-3 w-3 mr-1" />
          Tap for details
        </div>
      </div>
    )
  }

  const MobileDrawer = ({ row, onClose }: { row: RebateRow; onClose: () => void }) => {
    const traderNetCost = row.spreadCost - row.rebate
    return (
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
        <div
          className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BrokerLogo name={row.broker} domain={row.domain} size={48} className="rounded-lg" />
              <div>
                <h3 className="font-semibold text-foreground">{row.broker}</h3>
                <span className="text-sm text-muted-foreground">{row.instrument}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cost breakdown */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-secondary/50 rounded-xl mb-4">
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase">Spread</div>
              <div className="font-semibold">${row.spreadCost.toFixed(2)}/lot</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase">Rebate</div>
              <div className="font-semibold text-emerald-600">${row.rebate.toFixed(2)}/lot</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground uppercase">Net Cost</div>
              <div className={`font-bold ${traderNetCost <= 0 ? "text-emerald-600" : "text-foreground"}`}>
                {traderNetCost < 0 ? `-$${Math.abs(traderNetCost).toFixed(2)}` : `$${traderNetCost.toFixed(2)}`}/lot
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Regulation</span>
              <div className="flex gap-1">
                {row.regulation.map((reg) => (
                  <RegulatorBadge key={reg} regulator={reg} size="sm" showFlag={false} />
                ))}
              </div>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Platforms</span>
              <div className="flex gap-1">
                {row.platforms.map((p) => (
                  <PlatformBadge key={p} platform={p} />
                ))}
              </div>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Bonus</span>
              <span>{row.bonusType !== "none" ? <BonusBadge type={row.bonusType} /> : "-"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Swap-free</span>
              <span>{row.swapFree ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Auto Rebate</span>
              <span>{row.hasAutoRebate ? "Yes" : "No"}</span>
            </div>
          </div>

          {/* CTA */}
          <BrokerCTAButtons trackingUrl={row.trackingUrl} brokerSlug={row.brokerSlug} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page title */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">{t.rebates.title}</h2>
        <p className="text-muted-foreground text-sm mb-6">{t.rebates.subtitle}</p>
      </section>

      <section>
        <h3 className="text-lg font-medium text-foreground mb-4">Partner Brokers</h3>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {brokerCards.map((broker) => (
            <UnifiedBrokerCard key={broker.id} broker={broker} />
          ))}
        </div>
      </section>

      {/* Top picks section */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderTopPickCard(
            t.rebates.bestForGold,
            <Coins className="h-4 w-4 text-amber-500" />,
            topPicks.bestForGold,
            "netCost",
            "Gold",
          )}
          {renderTopPickCard(
            t.rebates.bestForForex,
            <TrendingDown className="h-4 w-4 text-blue-500" />,
            topPicks.bestForForex,
            "netCost",
            "Forex",
          )}
          {renderTopPickCard(
            t.rebates.lowestNetCost,
            <Award className="h-4 w-4 text-emerald-500" />,
            topPicks.lowestNetCost,
            "netCost",
            "All",
          )}
          {renderTopRatedCard(t.rebates.topRated, <Star className="h-4 w-4 text-amber-500" />, topRatedBrokers)}
        </div>
      </section>

      {/* Filters */}
      <section className="card-base p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{t.rebates.category}:</span>
            <div className="flex flex-wrap gap-2 mobile-scroll-chips sm:flex-nowrap">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === "All"
                    ? t.rebates.all
                    : cat === "Forex"
                      ? t.rebates.forex
                      : cat === "Gold"
                        ? t.rebates.gold
                        : t.rebates.indices}
                </Badge>
              ))}
            </div>
          </div>

          <div className="hidden sm:block w-px h-6 bg-border" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{t.rebates.filterBy}:</span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(({ key, label, icon: Icon }) => (
                <Badge
                  key={key}
                  variant={activeFilters.includes(key) ? "default" : "outline"}
                  className={`filter-chip ${activeFilters.includes(key) ? "active" : ""}`}
                  onClick={() => toggleFilter(key)}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="hidden sm:block w-px h-6 bg-border" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{t.rebates.sortBy}:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { field: "netCost" as SortField, label: t.common.netCost },
                { field: "spreadCost" as SortField, label: t.common.spread },
                { field: "rebate" as SortField, label: t.common.rebate },
              ].map(({ field, label }) => (
                <Badge
                  key={field}
                  variant={sortField === field ? "default" : "outline"}
                  className={`filter-chip ${sortField === field ? "active" : ""}`}
                  onClick={() => handleSort(field)}
                >
                  {label}
                  {sortField === field && <ArrowUpDown className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* Desktop Table */}
        <div className="hidden md:block card-base overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="font-semibold text-foreground">Broker</TableHead>
                  <TableHead className="font-semibold text-foreground">Instrument</TableHead>
                  <TableHead className="font-semibold text-foreground">{t.common.regulation}</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">{t.common.spread}</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">{t.common.rebate}</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">{t.common.netCost}</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">{t.common.bonus}</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">{t.common.swapFree}</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">Auto</TableHead>
                  <TableHead className="font-semibold text-foreground">{t.common.platforms}</TableHead>
                  <TableHead className="font-semibold text-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((row, idx) => {
                  const traderNetCost = row.spreadCost - row.rebate
                  return (
                    <TableRow
                      key={row.id}
                      className={`table-row-hover transition-colors border-border/30 ${idx % 2 === 0 ? "" : "table-row-zebra"}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BrokerLogo name={row.broker} domain={row.domain} size={28} className="rounded" />
                          <span className="font-medium text-foreground">{row.broker}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.instrument}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {row.regulation.slice(0, 2).map((reg) => (
                            <RegulatorBadge key={reg} regulator={reg} size="sm" showFlag={false} />
                          ))}
                          {row.regulation.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{row.regulation.length - 2}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-foreground">${row.spreadCost.toFixed(2)}/lot</TableCell>
                      <TableCell className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
                        ${row.rebate.toFixed(2)}/lot
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          traderNetCost <= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                        }`}
                      >
                        {traderNetCost < 0
                          ? `-$${Math.abs(traderNetCost).toFixed(2)}/lot`
                          : `$${traderNetCost.toFixed(2)}/lot`}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.bonusType !== "none" ? (
                          <BonusBadge type={row.bonusType} size="sm" />
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.swapFree ? (
                          <CheckCircle2 className="h-4 w-4 text-blue-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.hasAutoRebate ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {row.platforms.slice(0, 2).map((p) => (
                            <PlatformBadge key={p} platform={p} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" className="cta-primary text-xs px-3 h-7" asChild>
                          <a href={row.trackingUrl} target="_blank" rel="noopener noreferrer">
                            Open
                            <ChevronRight className="h-3 w-3 ml-0.5" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-0">
          {filteredAndSortedData.map((row) => (
            <MobileRowCard key={row.id} row={row} />
          ))}
        </div>
      </section>

      {/* How rebates work - explanation section */}
      <section className="card-base p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">How Rebates Work</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-primary">1</span>
            </div>
            <h4 className="font-medium text-foreground mb-2">Open Account</h4>
            <p className="text-sm text-muted-foreground">
              Register with a partner broker through Cloud Speed to activate rebates.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-primary">2</span>
            </div>
            <h4 className="font-medium text-foreground mb-2">Trade Normally</h4>
            <p className="text-sm text-muted-foreground">
              Execute trades as usual. Rebates are calculated automatically based on your volume.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-primary">3</span>
            </div>
            <h4 className="font-medium text-foreground mb-2">Receive Rebates</h4>
            <p className="text-sm text-muted-foreground">
              Get cash back into your trading account or wallet, reducing your net trading costs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA funnel */}
      <section className="text-center py-8">
        <h3 className="text-xl font-semibold text-foreground mb-3">Ready to reduce your trading costs?</h3>
        <p className="text-muted-foreground mb-6">Compare brokers and find the best rebate for your trading style.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild className="rounded-full px-8">
            <Link href="/compare">
              Compare Brokers
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-8 bg-transparent">
            <Link href="/brokers">View All Brokers</Link>
          </Button>
        </div>
      </section>

      {/* Mobile drawer */}
      {mobileDrawerRow && <MobileDrawer row={mobileDrawerRow} onClose={() => setMobileDrawerRow(null)} />}

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border z-40">
        <Button asChild className="w-full h-12 rounded-xl text-sm font-semibold">
          <Link href="/compare">
            Compare & Open with Rebate
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
