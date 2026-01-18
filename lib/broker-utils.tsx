"use client"
import { Zap, Gift, Moon, ExternalLink, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Regulator to country flag mapping
export const regulatorFlags: Record<string, { flag: string; country: string }> = {
  // Tier 1 Regulators
  ASIC: { flag: "🇦🇺", country: "Australia" },
  FCA: { flag: "🇬🇧", country: "UK" },
  NFA: { flag: "🇺🇸", country: "USA" },
  CFTC: { flag: "🇺🇸", country: "USA" },
  BaFin: { flag: "🇩🇪", country: "Germany" },
  FINMA: { flag: "🇨🇭", country: "Switzerland" },
  MAS: { flag: "🇸🇬", country: "Singapore" },
  JFSA: { flag: "🇯🇵", country: "Japan" },
  // Tier 2 Regulators
  CySEC: { flag: "🇨🇾", country: "Cyprus" },
  DFSA: { flag: "🇦🇪", country: "Dubai" },
  FSCA: { flag: "🇿🇦", country: "South Africa" },
  SCB: { flag: "🇧🇸", country: "Bahamas" },
  FSA: { flag: "🇸🇨", country: "Seychelles" },
  VFSC: { flag: "🇻🇺", country: "Vanuatu" },
  FSC: { flag: "🇧🇿", country: "Belize" },
  IFSC: { flag: "🇧🇿", country: "Belize" },
  CMA: { flag: "🇰🇪", country: "Kenya" },
  // Default
  default: { flag: "🌐", country: "International" },
}

// Get regulator display info
export function getRegulatorInfo(regulator: string): { flag: string; label: string; country: string } {
  const info = regulatorFlags[regulator] || regulatorFlags.default
  return {
    flag: info.flag,
    label: regulator,
    country: info.country,
  }
}

// Regulator Badge Component
interface RegulatorBadgeProps {
  regulator: string
  size?: "sm" | "md"
  showFlag?: boolean
}

export function RegulatorBadge({ regulator, size = "sm", showFlag = true }: RegulatorBadgeProps) {
  const { flag, label } = getRegulatorInfo(regulator)
  const sizeClasses = size === "sm" ? "text-xs px-1.5 py-0.5 gap-1" : "text-xs px-2 py-1 gap-1.5"

  return (
    <span className={`badge-regulation ${sizeClasses}`}>
      {showFlag && <span className="text-xs">{flag}</span>}
      <span>{label}</span>
    </span>
  )
}

// Platform Badge Component
interface PlatformBadgeProps {
  platform: string
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  return <span className="badge-platform">{platform}</span>
}

// Broker Logo Component - uses logoInitials from broker data
interface BrokerLogoProps {
  name: string
  logoInitials?: string
  size?: number
  className?: string
  pending?: boolean
}

export function BrokerLogo({ name, logoInitials, size = 40, className = "", pending = false }: BrokerLogoProps) {
  const fontSize = size * 0.4
  const bgClass = pending
    ? "bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800"
    : "bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30"
  const textClass = pending ? "text-neutral-500 dark:text-neutral-400" : "text-primary dark:text-primary"

  // Use the logoInitials if provided, otherwise generate from name
  const displayCode = logoInitials || name.substring(0, 2).toUpperCase()

  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-border/50 transition-shadow hover:shadow-md ${bgClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <span className={`font-bold tracking-tight ${textClass}`} style={{ fontSize }}>
        {displayCode}
      </span>
    </div>
  )
}

// Star Rating Component
interface StarRatingProps {
  rating: number
  size?: "sm" | "md"
  showValue?: boolean
}

export function StarRating({ rating, size = "sm", showValue = true }: StarRatingProps) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"
  const textSize = size === "sm" ? "text-xs" : "text-sm"

  return (
    <div className="flex items-center gap-1">
      <svg className={`${iconSize} fill-amber-400 text-amber-500`} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      {showValue && (
        <span className={`${textSize} font-semibold text-amber-600 dark:text-amber-400`}>{rating.toFixed(1)}</span>
      )}
    </div>
  )
}

// Auto Rebate Badge Component
interface AutoRebateBadgeProps {
  hasAutoRebate: boolean
  size?: "sm" | "md"
}

export function AutoRebateBadge({ hasAutoRebate, size = "sm" }: AutoRebateBadgeProps) {
  if (hasAutoRebate) {
    return (
      <span className={`badge-auto ${size === "sm" ? "text-xs px-2 py-0.5" : ""}`}>
        <Zap className="h-3 w-3 mr-1" />
        Auto Rebate
      </span>
    )
  }
  return <span className={`badge-manual ${size === "sm" ? "text-xs px-2 py-0.5" : ""}`}>Manual</span>
}

// Bonus Badge Component
export type BonusType = "no-deposit" | "deposit" | "trade" | "cashback" | "loyalty" | "none"

interface BonusBadgeProps {
  type: BonusType
  size?: "sm" | "md"
}

const bonusLabels: Record<BonusType, string> = {
  "no-deposit": "No-deposit",
  deposit: "Deposit",
  trade: "Trade",
  cashback: "Cashback",
  loyalty: "Loyalty",
  none: "None",
}

export function BonusBadge({ type, size = "sm" }: BonusBadgeProps) {
  if (type === "none") return null

  return (
    <span className={`badge-bonus ${size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-1"}`}>
      <Gift className="h-3 w-3 mr-0.5" />
      {bonusLabels[type]}
    </span>
  )
}

// Swap-Free Badge Component
interface SwapFreeBadgeProps {
  available: boolean | "region"
  size?: "sm" | "md"
}

export function SwapFreeBadge({ available, size = "sm" }: SwapFreeBadgeProps) {
  if (!available) return null

  const label = available === "region" ? "Swap-free (Region)" : "Swap-free"

  return (
    <span className={`badge-swap-free ${size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-1"}`}>
      <Moon className="h-3 w-3 mr-0.5" />
      {label}
    </span>
  )
}

// Instrument Badge Component
interface InstrumentBadgeProps {
  instrument: string
}

export function InstrumentBadge({ instrument }: InstrumentBadgeProps) {
  return (
    <span className="text-xs font-medium text-muted-foreground bg-secondary/70 px-2 py-0.5 rounded">{instrument}</span>
  )
}

interface NetCostLabelProps {
  value: number
  size?: "sm" | "md" | "lg"
}

export function NetCostLabel({ value, size = "md" }: NetCostLabelProps) {
  const isProfit = value <= 0
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Net Cost</span>
      <span
        className={`font-bold ${sizeClasses[size]} ${isProfit ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
      >
        {value < 0 ? `-$${Math.abs(value).toFixed(0)}` : `$${value.toFixed(0)}`}
        <span className="text-xs font-normal text-muted-foreground">/lot</span>
      </span>
    </div>
  )
}

// Price Label Component
interface PriceLabelProps {
  label: string
  value: number
  type?: "neutral" | "positive" | "cost"
  format?: "currency" | "percentage"
}

export function PriceLabel({ label, value, type = "neutral", format = "currency" }: PriceLabelProps) {
  const formattedValue =
    format === "currency"
      ? value < 0
        ? `-$${Math.abs(value).toFixed(0)}/lot`
        : `$${value.toFixed(0)}/lot`
      : `${value}%`

  const valueColor =
    type === "positive"
      ? "text-emerald-600 dark:text-emerald-400"
      : type === "cost" && value <= 0
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-foreground"

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">{label}</span>
      <span className={`text-sm font-semibold ${valueColor}`}>{formattedValue}</span>
    </div>
  )
}

interface BrokerCTAProps {
  trackingUrl: string
  brokerSlug: string
  mode?: "browse" | "detail" | "compare"
  variant?: "full" | "compact"
  labels?: {
    primary?: string
    secondary?: string
    tertiary?: string
  }
}

export function BrokerCTAButtons({
  trackingUrl,
  brokerSlug,
  mode = "browse",
  variant = "full",
  labels,
}: BrokerCTAProps) {
  // Browse layer: Primary = "View broker", Secondary = external link
  // Detail layer: Primary = "Open with rebate"
  // Compare layer: Primary = "Open with rebate", no view broker

  if (mode === "detail") {
    // Detail layer - primary CTA is "Open with rebate"
    const primaryLabel = labels?.primary || "Open with rebate"
    return (
      <Button
        className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-semibold"
        onClick={() => window.open(trackingUrl, "_blank", "noopener,noreferrer")}
      >
        {primaryLabel}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    )
  }

  if (mode === "compare") {
    // Compare layer - primary CTA is "Open with rebate"
    const primaryLabel = labels?.primary || "Open with rebate"
    return (
      <Button
        size={variant === "compact" ? "sm" : "default"}
        className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium ${variant === "compact" ? "h-9 text-xs" : "h-11 text-sm"}`}
        onClick={() => window.open(trackingUrl, "_blank", "noopener,noreferrer")}
      >
        {primaryLabel}
        <ExternalLink className={`ml-1.5 ${variant === "compact" ? "h-3 w-3" : "h-4 w-4"}`} />
      </Button>
    )
  }

  // Browse layer (default) - primary CTA is "View broker"
  const primaryLabel = labels?.primary || "View broker"

  if (variant === "compact") {
    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 h-9 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs font-medium"
          asChild
        >
          <Link href={`/brokers/${brokerSlug}`}>
            {primaryLabel}
            <Eye className="ml-1.5 h-3 w-3" />
          </Link>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-9 px-3 rounded-xl text-xs font-medium border-border bg-transparent"
          onClick={() => window.open(trackingUrl, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-semibold"
        asChild
      >
        <Link href={`/brokers/${brokerSlug}`}>
          {primaryLabel}
          <Eye className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="outline"
        className="h-11 px-4 rounded-xl text-sm font-medium border-border bg-transparent"
        onClick={() => window.open(trackingUrl, "_blank", "noopener,noreferrer")}
      >
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Domain extraction helper
export function extractDomain(url: string): string | undefined {
  try {
    const hostname = new URL(url).hostname
    return hostname.replace("www.", "")
  } catch {
    return undefined
  }
}
