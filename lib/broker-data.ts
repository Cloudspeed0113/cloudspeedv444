// Unified broker data utility - single source of truth
import brokersJson from "@/data/brokers.json"

export interface InstrumentCost {
  spread: number
  swap: number
  rebate: number
  netCost: number
}

export interface BrokerData {
  id: string
  name: string
  status: "active" | "pending"
  logoInitials: string
  global: boolean
  regulation: string[]
  platforms: string[]
  markets: string[]
  accountTypes: string[]
  leverage: string
  marginCall: string
  stopOut: string
  bonusAvailable: boolean
  bonusType: string
  swapFreeAvailable: boolean
  autoRebate: boolean
  minDeposit: number
  rating: number
  founded: number
  headquarters: string
  cost: Record<string, InstrumentCost>
  trackingUrl: string
  website: string
}

// All brokers from JSON
export const allBrokers: BrokerData[] = brokersJson as BrokerData[]

// Active brokers only
export const activeBrokers = allBrokers.filter((b) => b.status === "active")

// Get broker by ID
export function getBrokerById(id: string): BrokerData | undefined {
  return allBrokers.find((b) => b.id === id)
}

// Get cost data for a broker and instrument
export function getCostData(broker: BrokerData, instrument = "XAUUSD"): InstrumentCost {
  return broker.cost[instrument] || { spread: 0, swap: 0, rebate: 0, netCost: 0 }
}

// Calculate net cost for a broker and instrument
export function getNetCost(broker: BrokerData, instrument = "XAUUSD"): number {
  return getCostData(broker, instrument).netCost
}

// Get spread cost for a broker and instrument
export function getSpreadCost(broker: BrokerData, instrument = "XAUUSD"): number {
  return getCostData(broker, instrument).spread
}

// Get rebate for a broker and instrument
export function getRebate(broker: BrokerData, instrument = "XAUUSD"): number {
  return getCostData(broker, instrument).rebate
}

// Get swap for a broker and instrument
export function getSwap(broker: BrokerData, instrument = "XAUUSD"): number {
  return getCostData(broker, instrument).swap
}

// Get best broker for an instrument by lowest net cost
export function getBestBrokerForInstrument(instrument: string): BrokerData | undefined {
  return activeBrokers.reduce(
    (best, broker) => {
      const currentCost = getNetCost(broker, instrument)
      const bestCost = best ? getNetCost(best, instrument) : Number.POSITIVE_INFINITY
      return currentCost < bestCost ? broker : best
    },
    undefined as BrokerData | undefined,
  )
}

// Sort brokers by various criteria
export function sortBrokers(brokers: BrokerData[], sortBy: string, instrument = "XAUUSD"): BrokerData[] {
  const sorted = [...brokers]

  switch (sortBy) {
    case "lowest-cost":
      sorted.sort((a, b) => getNetCost(a, instrument) - getNetCost(b, instrument))
      break
    case "highest-rebate":
      sorted.sort((a, b) => getRebate(b, instrument) - getRebate(a, instrument))
      break
    case "best-rating":
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case "lowest-deposit":
      sorted.sort((a, b) => (a.minDeposit || 0) - (b.minDeposit || 0))
      break
    case "most-regulated":
      sorted.sort((a, b) => b.regulation.length - a.regulation.length)
      break
  }

  return sorted
}

// Calculate execution score (0-10)
export function calculateExecutionScore(broker: BrokerData): number {
  let score = 5 // Base score

  // Regulation (up to +2)
  score += Math.min(broker.regulation.length * 0.5, 2)

  // Platforms (up to +1.5)
  if (broker.platforms.includes("MT5")) score += 0.5
  if (broker.platforms.includes("cTrader")) score += 0.5
  if (broker.platforms.length >= 3) score += 0.5

  // Markets coverage (up to +1)
  score += Math.min(broker.markets.length * 0.2, 1)

  // Founded (up to +0.5)
  const yearsInBusiness = new Date().getFullYear() - broker.founded
  if (yearsInBusiness > 10) score += 0.5

  return Math.min(Math.round(score * 10) / 10, 10)
}

// Calculate cost score (0-10)
export function calculateCostScore(broker: BrokerData, instrument = "XAUUSD"): number {
  const cost = getCostData(broker, instrument)
  let score = 5 // Base score

  // Net cost impact (up to +3 or -2)
  if (cost.netCost < 5) score += 2
  else if (cost.netCost < 10) score += 1
  else if (cost.netCost > 15) score -= 1

  // Rebate impact (up to +2)
  if (cost.rebate > 7) score += 1.5
  else if (cost.rebate > 5) score += 1

  // Spread impact (up to +1)
  if (cost.spread < 15) score += 1
  else if (cost.spread < 20) score += 0.5

  // Auto rebate bonus
  if (broker.autoRebate) score += 0.5

  return Math.min(Math.round(score * 10) / 10, 10)
}

// Calculate match score based on user preferences
export interface MatchPreferences {
  instruments: string[]
  execution: string | null
  timeHorizon: string | null
  bonusPref: string
  wantSwapFree: boolean
}

export function calculateMatchScore(broker: BrokerData, prefs: MatchPreferences): number {
  let score = 5 // Base score
  const primaryInstrument = prefs.instruments[0] || "XAUUSD"

  // Instrument match (up to +2)
  const instrumentMatchCount = prefs.instruments.filter((inst) => broker.cost[inst]).length
  score += Math.min(instrumentMatchCount * 0.5, 2)

  // Execution method match (up to +1.5)
  if (prefs.execution === "ea" && broker.platforms.includes("MT5")) score += 1
  if (prefs.execution === "ea" && broker.platforms.includes("cTrader")) score += 0.5

  // Time horizon match (up to +1)
  if (prefs.timeHorizon === "scalping") {
    const cost = getCostData(broker, primaryInstrument)
    if (cost.spread < 15) score += 1
  }
  if (prefs.timeHorizon === "swing" || prefs.timeHorizon === "position") {
    if (broker.swapFreeAvailable) score += 0.5
  }

  // Bonus preference (up to +1)
  if (prefs.bonusPref === "prefer-bonus" && broker.bonusAvailable) score += 1
  if (prefs.bonusPref === "no-bonus" && !broker.bonusAvailable) score += 0.5

  // Swap-free requirement (+0.5)
  if (prefs.wantSwapFree && broker.swapFreeAvailable) score += 0.5

  // Auto rebate bonus (+0.5)
  if (broker.autoRebate) score += 0.5

  return Math.min(Math.round(score * 10) / 10, 10)
}
