"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Zap,
  Gift,
  DollarSign,
  TrendingDown,
  Star,
  ArrowRight,
  Filter,
  X,
  LayoutGrid,
  TableIcon,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react"
import {
  activeBrokers,
  getNetCost,
  getSpreadCost,
  getRebate,
  sortBrokers,
  type BrokerData,
} from "@/lib/broker-data"
import { BrokerLogo, RegulatorBadge, StarRating, AutoRebateBadge } from "@/lib/broker-utils"
import { useLanguage } from "@/lib/language-context"

type ViewMode = "browse" | "cost"

const filterOptions = {
  rebateType: [
    { value: "auto", label: "Auto Rebate", icon: Zap },
    { value: "manual", label: "Manual Rebate" },
  ],
  bonus: [
    { value: "no-deposit", label: "No-deposit Bonus", icon: Gift },
    { value: "deposit", label: "Deposit Bonus" },
  ],
  features: [{ value: "swap-free", label: "Swap-free" }],
  regulation: ["FCA", "CySEC", "ASIC", "NFA", "FSA", "VFSC", "FSC"],
  platform: ["MT4", "MT5", "cTrader"],
  instruments: ["Forex", "Gold", "Indices", "Crypto", "Commodities"],
}

const browseSortOptions = [
  { value: "best-rating", label: "Best Rating", icon: Star },
  { value: "most-regulated", label: "Most Regulated" },
  { value: "lowest-deposit", label: "Lowest Min Deposit" },
]

const costSortOptions = [
  { value: "lowest-cost", label: "Lowest Net Cost", icon: DollarSign },
  { value: "highest-rebate", label: "Highest Rebate", icon: TrendingDown },
  { value: "best-rating", label: "Top Rated", icon: Star },
]

export function BrokersPageClient() {
  const { t } = useLanguage()
  const router = useRouter()

  const [viewMode, setViewMode] = useState<ViewMode>("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<{
    rebateType: string[]
    bonus: string[]
    features: string[]
    regulation: string[]
    platform: string[]
    instruments: string[]
  }>({
    rebateType: [],
    bonus: [],
    features: [],
    regulation: [],
    platform: [],
    instruments: [],
  })
  const [sortBy, setSortBy] = useState("best-rating")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  // Toggle filter value
  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      rebateType: [],
      bonus: [],
      features: [],
      regulation: [],
      platform: [],
      instruments: [],
    })
    setSearchQuery("")
  }

  // Check if any filters are active
  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0) || searchQuery.length > 0

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    setSortBy(mode === "browse" ? "best-rating" : "lowest-cost")
  }

  const filteredBrokers = useMemo(() => {
    let result = [...activeBrokers]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((b) => b.name.toLowerCase().includes(query))
    }

    // Rebate type filter
    if (selectedFilters.rebateType.includes("auto")) {
      result = result.filter((b) => b.autoRebate)
    }
    if (selectedFilters.rebateType.includes("manual")) {
      result = result.filter((b) => !b.autoRebate)
    }

    // Bonus filter
    if (selectedFilters.bonus.length > 0) {
      result = result.filter((b) => selectedFilters.bonus.includes(b.bonusType || ""))
    }

    // Features filter
    if (selectedFilters.features.includes("swap-free")) {
      result = result.filter((b) => b.swapFree)
    }

    // Regulation filter
    if (selectedFilters.regulation.length > 0) {
      result = result.filter((b) => b.regulation.some((r) => selectedFilters.regulation.includes(r)))
    }

    // Platform filter
    if (selectedFilters.platform.length > 0) {
      result = result.filter((b) => b.platforms.some((p) => selectedFilters.platform.includes(p)))
    }

    // Instruments filter
    if (selectedFilters.instruments.length > 0) {
      result = result.filter((b) => b.markets.some((m) => selectedFilters.instruments.includes(m)))
    }

    // Sort
    return sortBrokers(result, sortBy)
  }, [searchQuery, selectedFilters, sortBy])

  const currentSortOptions = viewMode === "browse" ? browseSortOptions : costSortOptions

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground hero-title mb-4">
              {t.brokers?.title || "Partner Brokers"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.brokers?.subtitle || "Compare trading costs across our partner network"}
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex bg-secondary rounded-xl p-1 border border-border">
            <button
              onClick={() => handleViewModeChange("browse")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "browse"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              {t.brokers?.browseMode || "Browse"}
            </button>
            <button
              onClick={() => handleViewModeChange("cost")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "cost"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TableIcon className="h-4 w-4" />
              {t.brokers?.costMode || "Cost"}
            </button>
          </div>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search brokers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card border-border"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`gap-2 h-11 ${showFilters ? "bg-secondary" : ""}`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {Object.values(selectedFilters).flat().length}
                </span>
              )}
            </Button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {currentSortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="p-4 mb-6 border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Filter Brokers</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Rebate Type */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Rebate Type</p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.rebateType.map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={selectedFilters.rebateType.includes(opt.value) ? "default" : "outline"}
                      className={`cursor-pointer ${selectedFilters.rebateType.includes(opt.value) ? "" : "hover:bg-secondary"}`}
                      onClick={() => toggleFilter("rebateType", opt.value)}
                    >
                      {opt.icon && <opt.icon className="h-3 w-3 mr-1" />}
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bonus - only show in Cost Mode */}
              {viewMode === "cost" && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Bonus</p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.bonus.map((opt) => (
                      <Badge
                        key={opt.value}
                        variant={selectedFilters.bonus.includes(opt.value) ? "default" : "outline"}
                        className={`cursor-pointer ${selectedFilters.bonus.includes(opt.value) ? "" : "hover:bg-secondary"}`}
                        onClick={() => toggleFilter("bonus", opt.value)}
                      >
                        {opt.icon && <opt.icon className="h-3 w-3 mr-1" />}
                        {opt.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.features.map((opt) => (
                    <Badge
                      key={opt.value}
                      variant={selectedFilters.features.includes(opt.value) ? "default" : "outline"}
                      className={`cursor-pointer ${selectedFilters.features.includes(opt.value) ? "" : "hover:bg-secondary"}`}
                      onClick={() => toggleFilter("features", opt.value)}
                    >
                      {opt.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Regulation */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Regulation</p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.regulation.map((reg) => (
                    <Badge
                      key={reg}
                      variant={selectedFilters.regulation.includes(reg) ? "default" : "outline"}
                      className={`cursor-pointer ${selectedFilters.regulation.includes(reg) ? "" : "hover:bg-secondary"}`}
                      onClick={() => toggleFilter("regulation", reg)}
                    >
                      {reg}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.platform.map((p) => (
                    <Badge
                      key={p}
                      variant={selectedFilters.platform.includes(p) ? "default" : "outline"}
                      className={`cursor-pointer ${selectedFilters.platform.includes(p) ? "" : "hover:bg-secondary"}`}
                      onClick={() => toggleFilter("platform", p)}
                    >
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Instruments */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Instruments</p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.instruments.map((inst) => (
                    <Badge
                      key={inst}
                      variant={selectedFilters.instruments.includes(inst) ? "default" : "outline"}
                      className={`cursor-pointer ${selectedFilters.instruments.includes(inst) ? "" : "hover:bg-secondary"}`}
                      onClick={() => toggleFilter("instruments", inst)}
                    >
                      {inst}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredBrokers.length} broker{filteredBrokers.length !== 1 ? "s" : ""} found
        </p>

        {viewMode === "browse" ? (
          <BrowseModeGrid brokers={filteredBrokers} />
        ) : (
          <CostModeTable brokers={filteredBrokers} expandedRow={expandedRow} setExpandedRow={setExpandedRow} />
        )}

        {/* Partnership Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <Card className="p-8 bg-secondary/30 border-border/50 max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t.brokers?.partnershipTitle || "Partnership Opportunities"}
              </h3>
              <p className="text-muted-foreground mb-2 max-w-md">
                {t.brokers?.partnershipSubtitle ||
                  "Want your broker listed on Cloud Speed? We work with regulated brokers and pass most rebates back to traders."}
              </p>
              <ul className="text-sm text-muted-foreground mb-6 space-y-1">
                <li>{t.brokers?.partnerBenefit1 || "Regulated brokers only"}</li>
                <li>{t.brokers?.partnerBenefit2 || "Transparent rebate structure"}</li>
                <li>{t.brokers?.partnerBenefit3 || "Global trader network"}</li>
              </ul>
              <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="mailto:support@cloudspeed.cc">
                  <Mail className="mr-2 h-4 w-4" />
                  {t.brokers?.becomePartner || "Become a partner"}
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BrowseModeGrid({ brokers }: { brokers: BrokerData[] }) {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {brokers.map((broker) => {
        const spreadCost = getSpreadCost(broker)
        const rebate = getRebate(broker)
        const netCost = getNetCost(broker)

        return (
          <Card
            key={broker.id}
            className="p-5 bg-card border-border hover:border-border-hover transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            onClick={() => router.push(`/brokers/${broker.id}`)}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <BrokerLogo name={broker.name} logoInitials={broker.logoInitials} size={56} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground mb-1">{broker.name}</h3>
                <StarRating rating={broker.rating} size="sm" />
                <div className="flex flex-wrap gap-1 mt-2">
                  {broker.regulation.slice(0, 3).map((reg) => (
                    <RegulatorBadge key={reg} regulator={reg} size="sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.common?.minDeposit || "Min Deposit"}</span>
                <span className="font-medium">${broker.minDeposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.common?.platforms || "Platforms"}</span>
                <span className="font-medium">{broker.platforms.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.common?.accountTypes || "Account Types"}</span>
                <span className="font-medium">{broker.accountTypes.slice(0, 2).join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.common?.leverage || "Leverage"}</span>
                <span className="font-medium">{broker.leverage}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <AutoRebateBadge hasAutoRebate={broker.autoRebate} size="sm" />
              {broker.swapFreeAvailable && <span className="badge-swap-free text-xs px-1.5 py-0.5">Swap-free</span>}
              {broker.bonusAvailable && <span className="badge-bonus text-xs px-1.5 py-0.5">Bonus</span>}
            </div>

            {/* CTAs */}
            <div className="flex gap-2">
              <Button
                className="flex-1 h-10 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-medium"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/brokers/${broker.id}`)
                }}
              >
                {t.common?.viewBroker || "View broker"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-10 px-4 rounded-xl text-sm border-border bg-transparent"
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
      })}
    </div>
  )
}

function CostModeTable({
  brokers,
  expandedRow,
  setExpandedRow,
}: {
  brokers: BrokerData[]
  expandedRow: string | null
  setExpandedRow: (id: string | null) => void
}) {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card className="border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-semibold">Broker</TableHead>
                <TableHead className="text-center font-semibold">{t.common?.spread || "Spread"}</TableHead>
                <TableHead className="text-center font-semibold">{t.common?.rebate || "Rebate"}</TableHead>
                <TableHead className="text-center font-semibold">{t.common?.netCost || "Net Cost"}</TableHead>
                <TableHead className="text-center font-semibold">{t.common?.bonus || "Bonus"}</TableHead>
                <TableHead className="text-center font-semibold">Auto</TableHead>
                <TableHead className="text-right font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brokers.map((broker) => {
                const spreadCost = getSpreadCost(broker)
                const rebate = getRebate(broker)
                const netCost = getNetCost(broker)

                return (
                  <TableRow
                    key={broker.id}
                    className="hover:bg-secondary/30 cursor-pointer"
                    onClick={() => router.push(`/brokers/${broker.id}`)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <BrokerLogo name={broker.name} logoInitials={broker.logoInitials} size={40} />
                        <div>
                          <div className="font-medium text-foreground">{broker.name}</div>
                          <StarRating rating={broker.rating} size="sm" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-mono">${spreadCost.toFixed(1)}/lot</TableCell>
                    <TableCell className="text-center font-mono text-emerald-600">${rebate.toFixed(1)}/lot</TableCell>
                    <TableCell className="text-center">
                      <span className={`font-bold ${netCost <= 5 ? "text-emerald-600" : ""}`}>${netCost.toFixed(1)}/lot</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {broker.bonusAvailable ? <span className="badge-bonus text-xs px-1.5 py-0.5">Yes</span> : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      {broker.autoRebate ? (
                        <span className="badge-auto text-xs px-1.5 py-0.5">
                          <Zap className="h-3 w-3" />
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="h-8 rounded-lg text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/compare?broker=${broker.id}`)
                        }}
                      >
                        {t.common?.compare || "Compare"}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {brokers.map((broker) => {
          const spreadCost = getSpreadCost(broker)
          const rebate = getRebate(broker)
          const netCost = getNetCost(broker)
          const isExpanded = expandedRow === broker.id

          return (
            <Card key={broker.id} className="p-4 border-border">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedRow(isExpanded ? null : broker.id)}
              >
                <div className="flex items-center gap-3">
                  <BrokerLogo name={broker.name} logoInitials={broker.logoInitials} size={40} />
                  <div>
                    <div className="font-medium">{broker.name}</div>
                    <div className="text-sm text-muted-foreground">Net: ${netCost.toFixed(1)}/lot</div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="text-muted-foreground">Spread</div>
                      <div className="font-medium">${spreadCost.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Rebate</div>
                      <div className="font-medium text-emerald-600">${rebate.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Net</div>
                      <div className="font-bold">${netCost.toFixed(1)}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => router.push(`/compare?broker=${broker.id}`)}>
                      Compare
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => router.push(`/brokers/${broker.id}`)}>
                      View
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </>
  )
}
