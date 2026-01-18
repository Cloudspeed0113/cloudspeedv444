// Mock detailed broker data for profile pages
export interface TradingCost {
  instrument: string
  avgSpread: string // Now in USD/lot format
  commission: string
  swapLong: string
  swapShort: string
  rebate: string
  netCost: string // Now in USD/lot format
}

export interface AccountType {
  name: string
  minDeposit: string
  baseCurrency: string[]
  leverage: string
  commission: string
  swapType: string
}

export interface RebateInfo {
  account: string
  instrument: string
  rebate: string
  autoRebate: boolean
  payoutFrequency: string
}

export interface Regulation {
  regulator: string
  entity: string
  licenseId: string
  jurisdiction: string
  protection: string
}

export interface BrokerDetails {
  id: string
  slug: string // Added slug field
  name: string
  logo: string
  rating: number
  regulations: string[]
  foundedYear: number
  country: string
  headquarters: string
  description: string
  tradingCosts: TradingCost[]
  accountTypes: AccountType[]
  platforms: string[]
  instruments: {
    category: string
    count: number
  }[]
  rebateInfo: RebateInfo[]
  regulationDetails: Regulation[]
  trackingUrl: string
}

export const brokerDetailsData: Record<string, BrokerDetails> = {
  "1": {
    id: "1",
    slug: "forexpro",
    name: "ForexPro",
    logo: "/forexpro-logo.jpg",
    rating: 4.8,
    regulations: ["CySEC", "ASIC"],
    foundedYear: 2010,
    country: "Cyprus",
    headquarters: "Limassol, Cyprus",
    description:
      "ForexPro is a leading multi-asset broker offering competitive spreads and advanced trading technology.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$8/lot",
        commission: "$0",
        swapLong: "-2.5",
        swapShort: "0.8",
        rebate: "$8/lot",
        netCost: "$0/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$12/lot",
        commission: "$0",
        swapLong: "-3.2",
        swapShort: "1.1",
        rebate: "$8/lot",
        netCost: "$4/lot",
      },
      {
        instrument: "Gold",
        avgSpread: "$25/lot",
        commission: "$0",
        swapLong: "-8.5",
        swapShort: "2.3",
        rebate: "$6/lot",
        netCost: "$19/lot",
      },
      {
        instrument: "US30",
        avgSpread: "$20/lot",
        commission: "$0",
        swapLong: "-5.0",
        swapShort: "1.5",
        rebate: "$5/lot",
        netCost: "$15/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$100",
        baseCurrency: ["USD", "EUR", "GBP"],
        leverage: "1:500",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "ECN",
        minDeposit: "$500",
        baseCurrency: ["USD", "EUR"],
        leverage: "1:200",
        commission: "$3/lot",
        swapType: "Reduced",
      },
      {
        name: "VIP",
        minDeposit: "$10,000",
        baseCurrency: ["USD"],
        leverage: "1:100",
        commission: "$1/lot",
        swapType: "Swap-free available",
      },
    ],
    platforms: ["MT4", "MT5", "WebTrader", "Mobile App"],
    instruments: [
      { category: "Forex", count: 60 },
      { category: "Indices", count: 15 },
      { category: "Commodities", count: 10 },
      { category: "Crypto", count: 20 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$8/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Gold", rebate: "$6/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "ECN", instrument: "Forex", rebate: "$5/lot", autoRebate: true, payoutFrequency: "Weekly" },
    ],
    regulationDetails: [
      {
        regulator: "CySEC",
        entity: "ForexPro Ltd",
        licenseId: "123/45",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
      {
        regulator: "ASIC",
        entity: "ForexPro AU Pty Ltd",
        licenseId: "456789",
        jurisdiction: "Australia",
        protection: "None",
      },
    ],
    trackingUrl: "https://forexpro.example.com/cloudspeed",
  },
  "2": {
    id: "2",
    slug: "globaltrade",
    name: "GlobalTrade",
    logo: "/globaltrade-logo.jpg",
    rating: 4.6,
    regulations: ["FCA", "CySEC"],
    foundedYear: 2008,
    country: "UK",
    headquarters: "London, UK",
    description: "GlobalTrade offers institutional-grade trading conditions for retail and professional clients.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$10/lot",
        commission: "$0",
        swapLong: "-2.8",
        swapShort: "0.6",
        rebate: "$7/lot",
        netCost: "$3/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$14/lot",
        commission: "$0",
        swapLong: "-3.5",
        swapShort: "1.0",
        rebate: "$7/lot",
        netCost: "$7/lot",
      },
      {
        instrument: "Gold",
        avgSpread: "$28/lot",
        commission: "$0",
        swapLong: "-9.0",
        swapShort: "2.5",
        rebate: "$5/lot",
        netCost: "$23/lot",
      },
      {
        instrument: "US30",
        avgSpread: "$22/lot",
        commission: "$0",
        swapLong: "-5.5",
        swapShort: "1.8",
        rebate: "$4/lot",
        netCost: "$18/lot",
      },
    ],
    accountTypes: [
      {
        name: "Classic",
        minDeposit: "$200",
        baseCurrency: ["USD", "EUR", "GBP"],
        leverage: "1:30 (Retail)",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Pro",
        minDeposit: "$2,000",
        baseCurrency: ["USD", "EUR"],
        leverage: "1:500",
        commission: "$2.5/lot",
        swapType: "Reduced",
      },
    ],
    platforms: ["MT4", "MT5", "cTrader", "WebTrader"],
    instruments: [
      { category: "Forex", count: 70 },
      { category: "Indices", count: 20 },
      { category: "Crypto", count: 30 },
      { category: "Shares", count: 500 },
    ],
    rebateInfo: [
      { account: "Classic", instrument: "Forex", rebate: "$7/lot", autoRebate: true, payoutFrequency: "Weekly" },
      { account: "Classic", instrument: "Gold", rebate: "$5/lot", autoRebate: true, payoutFrequency: "Weekly" },
      { account: "Pro", instrument: "Forex", rebate: "$4/lot", autoRebate: false, payoutFrequency: "Monthly" },
    ],
    regulationDetails: [
      {
        regulator: "FCA",
        entity: "GlobalTrade UK Ltd",
        licenseId: "FRN 123456",
        jurisdiction: "UK",
        protection: "£85,000 FSCS",
      },
      {
        regulator: "CySEC",
        entity: "GlobalTrade EU Ltd",
        licenseId: "234/56",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
    ],
    trackingUrl: "https://globaltrade.example.com/cloudspeed",
  },
  "3": {
    id: "3",
    slug: "primefx",
    name: "PrimeFX",
    logo: "/primefx-logo.jpg",
    rating: 4.5,
    regulations: ["ASIC"],
    foundedYear: 2012,
    country: "Australia",
    headquarters: "Sydney, Australia",
    description: "PrimeFX specializes in forex and commodities trading with competitive spreads.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$6/lot",
        commission: "$0",
        swapLong: "-2.2",
        swapShort: "0.5",
        rebate: "$6/lot",
        netCost: "$0/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$10/lot",
        commission: "$0",
        swapLong: "-3.0",
        swapShort: "0.8",
        rebate: "$6/lot",
        netCost: "$4/lot",
      },
      {
        instrument: "Gold",
        avgSpread: "$22/lot",
        commission: "$0",
        swapLong: "-7.5",
        swapShort: "2.0",
        rebate: "$5/lot",
        netCost: "$17/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$50",
        baseCurrency: ["USD", "AUD"],
        leverage: "1:500",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Raw",
        minDeposit: "$200",
        baseCurrency: ["USD", "AUD"],
        leverage: "1:500",
        commission: "$3.5/lot",
        swapType: "Standard",
      },
    ],
    platforms: ["MT4", "MT5"],
    instruments: [
      { category: "Forex", count: 50 },
      { category: "Commodities", count: 15 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$6/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Gold", rebate: "$5/lot", autoRebate: true, payoutFrequency: "Daily" },
    ],
    regulationDetails: [
      {
        regulator: "ASIC",
        entity: "PrimeFX Pty Ltd",
        licenseId: "AFSL 345678",
        jurisdiction: "Australia",
        protection: "Segregated accounts",
      },
    ],
    trackingUrl: "https://primefx.example.com/cloudspeed",
  },
  "4": {
    id: "4",
    slug: "alphamarkets",
    name: "AlphaMarkets",
    logo: "/alphamarkets-logo.jpg",
    rating: 4.7,
    regulations: ["FSA", "CySEC"],
    foundedYear: 2015,
    country: "Seychelles",
    headquarters: "Victoria, Seychelles",
    description: "AlphaMarkets offers the highest rebate rates and multi-asset trading.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$9/lot",
        commission: "$0",
        swapLong: "-2.6",
        swapShort: "0.7",
        rebate: "$9/lot",
        netCost: "$0/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$13/lot",
        commission: "$0",
        swapLong: "-3.3",
        swapShort: "1.0",
        rebate: "$9/lot",
        netCost: "$4/lot",
      },
      {
        instrument: "Gold",
        avgSpread: "$27/lot",
        commission: "$0",
        swapLong: "-8.8",
        swapShort: "2.4",
        rebate: "$7/lot",
        netCost: "$20/lot",
      },
      {
        instrument: "BTC/USD",
        avgSpread: "$50/lot",
        commission: "$0",
        swapLong: "-15.0",
        swapShort: "5.0",
        rebate: "$10/lot",
        netCost: "$40/lot",
      },
    ],
    accountTypes: [
      {
        name: "Micro",
        minDeposit: "$10",
        baseCurrency: ["USD"],
        leverage: "1:1000",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Standard",
        minDeposit: "$250",
        baseCurrency: ["USD", "EUR"],
        leverage: "1:500",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "ECN",
        minDeposit: "$1,000",
        baseCurrency: ["USD"],
        leverage: "1:200",
        commission: "$2/lot",
        swapType: "Reduced",
      },
    ],
    platforms: ["MT4", "MT5", "cTrader"],
    instruments: [
      { category: "Forex", count: 80 },
      { category: "Indices", count: 25 },
      { category: "Commodities", count: 20 },
      { category: "Crypto", count: 40 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$9/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Gold", rebate: "$7/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Crypto", rebate: "$10/lot", autoRebate: true, payoutFrequency: "Daily" },
    ],
    regulationDetails: [
      {
        regulator: "FSA",
        entity: "AlphaMarkets Ltd",
        licenseId: "SD 123",
        jurisdiction: "Seychelles",
        protection: "None",
      },
      {
        regulator: "CySEC",
        entity: "AlphaMarkets EU Ltd",
        licenseId: "345/67",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
    ],
    trackingUrl: "https://alphamarkets.example.com/cloudspeed",
  },
  "5": {
    id: "5",
    slug: "tradesphere",
    name: "TradeSphere",
    logo: "/tradesphere-logo.jpg",
    rating: 4.4,
    regulations: ["FCA"],
    foundedYear: 2018,
    country: "UK",
    headquarters: "London, UK",
    description: "TradeSphere is a UK-regulated broker focused on forex and indices trading.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$11/lot",
        commission: "$0",
        swapLong: "-2.9",
        swapShort: "0.6",
        rebate: "$5.50/lot",
        netCost: "$5.50/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$15/lot",
        commission: "$0",
        swapLong: "-3.6",
        swapShort: "1.1",
        rebate: "$5.50/lot",
        netCost: "$9.50/lot",
      },
      {
        instrument: "US30",
        avgSpread: "$24/lot",
        commission: "$0",
        swapLong: "-6.0",
        swapShort: "2.0",
        rebate: "$4/lot",
        netCost: "$20/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$100",
        baseCurrency: ["USD", "GBP", "EUR"],
        leverage: "1:30 (Retail)",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Professional",
        minDeposit: "$500",
        baseCurrency: ["USD", "GBP"],
        leverage: "1:500",
        commission: "$0",
        swapType: "Reduced",
      },
    ],
    platforms: ["MT4", "WebTrader"],
    instruments: [
      { category: "Forex", count: 40 },
      { category: "Indices", count: 12 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$5.50/lot", autoRebate: false, payoutFrequency: "Monthly" },
      { account: "Standard", instrument: "Indices", rebate: "$4/lot", autoRebate: false, payoutFrequency: "Monthly" },
    ],
    regulationDetails: [
      {
        regulator: "FCA",
        entity: "TradeSphere Ltd",
        licenseId: "FRN 789012",
        jurisdiction: "UK",
        protection: "£85,000 FSCS",
      },
    ],
    trackingUrl: "https://tradesphere.example.com/cloudspeed",
  },
  "6": {
    id: "6",
    slug: "metatrader-hub",
    name: "MetaTrader Hub",
    logo: "/metatrader-hub-logo.jpg",
    rating: 4.6,
    regulations: ["CySEC", "FSA"],
    foundedYear: 2014,
    country: "Cyprus",
    headquarters: "Nicosia, Cyprus",
    description: "MetaTrader Hub specializes in MT4/MT5 trading with extensive forex and crypto offerings.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$7.50/lot",
        commission: "$0",
        swapLong: "-2.4",
        swapShort: "0.6",
        rebate: "$7.50/lot",
        netCost: "$0/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$11/lot",
        commission: "$0",
        swapLong: "-3.1",
        swapShort: "0.9",
        rebate: "$7.50/lot",
        netCost: "$3.50/lot",
      },
      {
        instrument: "Gold",
        avgSpread: "$24/lot",
        commission: "$0",
        swapLong: "-8.0",
        swapShort: "2.2",
        rebate: "$6/lot",
        netCost: "$18/lot",
      },
      {
        instrument: "BTC/USD",
        avgSpread: "$45/lot",
        commission: "$0",
        swapLong: "-12.0",
        swapShort: "4.0",
        rebate: "$8/lot",
        netCost: "$37/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$150",
        baseCurrency: ["USD", "EUR"],
        leverage: "1:500",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Zero",
        minDeposit: "$500",
        baseCurrency: ["USD"],
        leverage: "1:500",
        commission: "$4/lot",
        swapType: "Standard",
      },
      {
        name: "Islamic",
        minDeposit: "$300",
        baseCurrency: ["USD"],
        leverage: "1:200",
        commission: "$0",
        swapType: "Swap-free",
      },
    ],
    platforms: ["MT4", "MT5"],
    instruments: [
      { category: "Forex", count: 55 },
      { category: "Commodities", count: 12 },
      { category: "Crypto", count: 35 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$7.50/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Gold", rebate: "$6/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Crypto", rebate: "$8/lot", autoRebate: true, payoutFrequency: "Weekly" },
    ],
    regulationDetails: [
      {
        regulator: "CySEC",
        entity: "MetaTrader Hub Ltd",
        licenseId: "456/78",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
      {
        regulator: "FSA",
        entity: "MTH Global Ltd",
        licenseId: "SD 456",
        jurisdiction: "Seychelles",
        protection: "None",
      },
    ],
    trackingUrl: "https://metatraderhub.example.com/cloudspeed",
  },
  "7": {
    id: "7",
    slug: "fxpro",
    name: "FxPro",
    logo: "https://logo.clearbit.com/fxpro.com",
    rating: 4.7,
    regulations: ["FCA", "CySEC"],
    foundedYear: 2006,
    country: "UK",
    headquarters: "London, UK",
    description:
      "FxPro is an award-winning broker offering CFD trading on forex, shares, indices, metals, energies and futures.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$8/lot",
        commission: "$0",
        swapLong: "-2.5",
        swapShort: "0.8",
        rebate: "$6/lot",
        netCost: "$2/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$12/lot",
        commission: "$0",
        swapLong: "-3.2",
        swapShort: "1.1",
        rebate: "$6/lot",
        netCost: "$6/lot",
      },
      {
        instrument: "XAU/USD",
        avgSpread: "$25/lot",
        commission: "$0",
        swapLong: "-8.5",
        swapShort: "2.3",
        rebate: "$5/lot",
        netCost: "$20/lot",
      },
      {
        instrument: "US30",
        avgSpread: "$20/lot",
        commission: "$0",
        swapLong: "-5.0",
        swapShort: "1.5",
        rebate: "$4/lot",
        netCost: "$16/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$100",
        baseCurrency: ["USD", "EUR", "GBP"],
        leverage: "1:30 (Retail)",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Raw+",
        minDeposit: "$1,000",
        baseCurrency: ["USD", "EUR"],
        leverage: "1:30 (Retail)",
        commission: "$3.5/lot",
        swapType: "Reduced",
      },
      {
        name: "Elite",
        minDeposit: "$30,000",
        baseCurrency: ["USD"],
        leverage: "1:500 (Pro)",
        commission: "$2/lot",
        swapType: "Reduced",
      },
    ],
    platforms: ["MT4", "MT5", "cTrader", "FxPro Edge"],
    instruments: [
      { category: "Forex", count: 70 },
      { category: "Metals", count: 8 },
      { category: "Indices", count: 20 },
      { category: "Crypto", count: 25 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$6/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Metals", rebate: "$5/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Raw+", instrument: "Forex", rebate: "$4/lot", autoRebate: true, payoutFrequency: "Weekly" },
    ],
    regulationDetails: [
      {
        regulator: "FCA",
        entity: "FxPro UK Limited",
        licenseId: "FRN 509956",
        jurisdiction: "UK",
        protection: "£85,000 FSCS",
      },
      {
        regulator: "CySEC",
        entity: "FxPro Financial Services Ltd",
        licenseId: "078/07",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
    ],
    trackingUrl: "https://www.fxpro.com/?ib=cloudspeed",
  },
  "8": {
    id: "8",
    slug: "forexcom",
    name: "FOREX.com",
    logo: "https://logo.clearbit.com/forex.com",
    rating: 4.5,
    regulations: ["CFTC", "NFA", "FCA"],
    foundedYear: 2001,
    country: "USA",
    headquarters: "New Jersey, USA",
    description:
      "FOREX.com is a leading global forex broker, part of StoneX Group Inc., offering competitive spreads and advanced trading tools.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$10/lot",
        commission: "$0",
        swapLong: "-2.8",
        swapShort: "0.6",
        rebate: "$7/lot",
        netCost: "$3/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$14/lot",
        commission: "$0",
        swapLong: "-3.5",
        swapShort: "1.0",
        rebate: "$7/lot",
        netCost: "$7/lot",
      },
      {
        instrument: "XAU/USD",
        avgSpread: "$30/lot",
        commission: "$0",
        swapLong: "-9.0",
        swapShort: "2.5",
        rebate: "$6/lot",
        netCost: "$24/lot",
      },
      {
        instrument: "US30",
        avgSpread: "$22/lot",
        commission: "$0",
        swapLong: "-5.5",
        swapShort: "1.8",
        rebate: "$5/lot",
        netCost: "$17/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$100",
        baseCurrency: ["USD"],
        leverage: "1:50 (US)",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Commission",
        minDeposit: "$100",
        baseCurrency: ["USD"],
        leverage: "1:50 (US)",
        commission: "$5/100k",
        swapType: "Standard",
      },
      {
        name: "DMA",
        minDeposit: "$25,000",
        baseCurrency: ["USD"],
        leverage: "1:50 (US)",
        commission: "$2.5/100k",
        swapType: "Reduced",
      },
    ],
    platforms: ["MT4", "MT5", "FOREX.com Web", "TradingView"],
    instruments: [
      { category: "Forex", count: 80 },
      { category: "Indices", count: 15 },
      { category: "Commodities", count: 12 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$7/lot", autoRebate: true, payoutFrequency: "Weekly" },
      { account: "Standard", instrument: "Metals", rebate: "$6/lot", autoRebate: true, payoutFrequency: "Weekly" },
    ],
    regulationDetails: [
      {
        regulator: "CFTC",
        entity: "GAIN Capital Group LLC",
        licenseId: "0339826",
        jurisdiction: "USA",
        protection: "SIPC Coverage",
      },
      {
        regulator: "NFA",
        entity: "GAIN Capital Group LLC",
        licenseId: "0339826",
        jurisdiction: "USA",
        protection: "None",
      },
      {
        regulator: "FCA",
        entity: "GAIN Capital UK Ltd",
        licenseId: "FRN 190864",
        jurisdiction: "UK",
        protection: "£85,000 FSCS",
      },
    ],
    trackingUrl: "https://www.forex.com/?ib=cloudspeed",
  },
  "9": {
    id: "9",
    slug: "fp-markets",
    name: "FP Markets",
    logo: "https://logo.clearbit.com/fpmarkets.com",
    rating: 4.4,
    regulations: ["ASIC", "CySEC"],
    foundedYear: 2005,
    country: "Australia",
    headquarters: "Sydney, Australia",
    description:
      "FP Markets is an Australian-regulated broker offering ECN pricing with tight spreads and fast execution.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$7/lot",
        commission: "$0",
        swapLong: "-2.2",
        swapShort: "0.5",
        rebate: "$5/lot",
        netCost: "$2/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$10/lot",
        commission: "$0",
        swapLong: "-3.0",
        swapShort: "0.8",
        rebate: "$5/lot",
        netCost: "$5/lot",
      },
      {
        instrument: "XAU/USD",
        avgSpread: "$22/lot",
        commission: "$0",
        swapLong: "-7.5",
        swapShort: "2.0",
        rebate: "$4/lot",
        netCost: "$18/lot",
      },
      {
        instrument: "US30",
        avgSpread: "$18/lot",
        commission: "$0",
        swapLong: "-4.5",
        swapShort: "1.4",
        rebate: "$3/lot",
        netCost: "$15/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$100",
        baseCurrency: ["USD", "AUD", "EUR"],
        leverage: "1:500",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Raw",
        minDeposit: "$100",
        baseCurrency: ["USD", "AUD"],
        leverage: "1:500",
        commission: "$3/lot",
        swapType: "Standard",
      },
      {
        name: "IRESS",
        minDeposit: "$1,000",
        baseCurrency: ["AUD"],
        leverage: "1:20",
        commission: "0.1%",
        swapType: "Standard",
      },
    ],
    platforms: ["MT4", "MT5", "IRESS", "cTrader"],
    instruments: [
      { category: "Forex", count: 60 },
      { category: "Metals", count: 6 },
      { category: "Indices", count: 14 },
      { category: "Shares", count: 10000 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$5/lot", autoRebate: false, payoutFrequency: "Monthly" },
      { account: "Standard", instrument: "Metals", rebate: "$4/lot", autoRebate: false, payoutFrequency: "Monthly" },
    ],
    regulationDetails: [
      {
        regulator: "ASIC",
        entity: "First Prudential Markets Pty Ltd",
        licenseId: "AFSL 286354",
        jurisdiction: "Australia",
        protection: "Segregated accounts",
      },
      {
        regulator: "CySEC",
        entity: "First Prudential Markets Ltd",
        licenseId: "371/18",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
    ],
    trackingUrl: "https://www.fpmarkets.com/?ib=cloudspeed",
  },
  "10": {
    id: "10",
    slug: "easymarkets",
    name: "easyMarkets",
    logo: "https://logo.clearbit.com/easymarkets.com",
    rating: 4.3,
    regulations: ["CySEC", "ASIC"],
    foundedYear: 2001,
    country: "Cyprus",
    headquarters: "Limassol, Cyprus",
    description:
      "easyMarkets offers fixed spreads, negative balance protection, and unique tools like dealCancellation.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$12/lot",
        commission: "$0",
        swapLong: "-3.0",
        swapShort: "0.7",
        rebate: "$8/lot",
        netCost: "$4/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$16/lot",
        commission: "$0",
        swapLong: "-3.8",
        swapShort: "1.2",
        rebate: "$8/lot",
        netCost: "$8/lot",
      },
      {
        instrument: "XAU/USD",
        avgSpread: "$35/lot",
        commission: "$0",
        swapLong: "-10.0",
        swapShort: "3.0",
        rebate: "$7/lot",
        netCost: "$28/lot",
      },
      {
        instrument: "BTC/USD",
        avgSpread: "$50/lot",
        commission: "$0",
        swapLong: "-15.0",
        swapShort: "5.0",
        rebate: "$8/lot",
        netCost: "$42/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$25",
        baseCurrency: ["USD", "EUR", "GBP"],
        leverage: "1:400",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Premium",
        minDeposit: "$2,000",
        baseCurrency: ["USD", "EUR"],
        leverage: "1:400",
        commission: "$0",
        swapType: "Reduced",
      },
      {
        name: "VIP",
        minDeposit: "$10,000",
        baseCurrency: ["USD"],
        leverage: "1:400",
        commission: "$0",
        swapType: "Swap-free available",
      },
    ],
    platforms: ["MT4", "MT5", "easyMarkets Web/App", "TradingView"],
    instruments: [
      { category: "Forex", count: 95 },
      { category: "Commodities", count: 20 },
      { category: "Crypto", count: 18 },
      { category: "Indices", count: 13 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$8/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Metals", rebate: "$7/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Crypto", rebate: "$8/lot", autoRebate: true, payoutFrequency: "Weekly" },
    ],
    regulationDetails: [
      {
        regulator: "CySEC",
        entity: "EF Worldwide Ltd",
        licenseId: "079/07",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
      {
        regulator: "ASIC",
        entity: "Easy Forex Pty Ltd",
        licenseId: "AFSL 246566",
        jurisdiction: "Australia",
        protection: "Segregated accounts",
      },
    ],
    trackingUrl: "https://www.easymarkets.com/?ib=cloudspeed",
  },
  "11": {
    id: "11",
    slug: "ic-markets",
    name: "IC Markets",
    logo: "https://logo.clearbit.com/icmarkets.com",
    rating: 4.6,
    regulations: ["ASIC", "FSA", "CySEC"],
    foundedYear: 2007,
    country: "Australia",
    headquarters: "Sydney, Australia",
    description:
      "IC Markets is a leading ECN broker known for ultra-low spreads, fast execution, and high-volume trading.",
    tradingCosts: [
      {
        instrument: "EUR/USD",
        avgSpread: "$6/lot",
        commission: "$0",
        swapLong: "-2.0",
        swapShort: "0.4",
        rebate: "$5/lot",
        netCost: "$1/lot",
      },
      {
        instrument: "GBP/USD",
        avgSpread: "$9/lot",
        commission: "$0",
        swapLong: "-2.8",
        swapShort: "0.7",
        rebate: "$5/lot",
        netCost: "$4/lot",
      },
      {
        instrument: "XAU/USD",
        avgSpread: "$20/lot",
        commission: "$0",
        swapLong: "-7.0",
        swapShort: "1.8",
        rebate: "$4/lot",
        netCost: "$16/lot",
      },
      {
        instrument: "US30",
        avgSpread: "$16/lot",
        commission: "$0",
        swapLong: "-4.0",
        swapShort: "1.2",
        rebate: "$3/lot",
        netCost: "$13/lot",
      },
    ],
    accountTypes: [
      {
        name: "Standard",
        minDeposit: "$200",
        baseCurrency: ["USD", "AUD", "EUR"],
        leverage: "1:500",
        commission: "$0",
        swapType: "Standard",
      },
      {
        name: "Raw Spread",
        minDeposit: "$200",
        baseCurrency: ["USD", "AUD"],
        leverage: "1:500",
        commission: "$3.5/lot",
        swapType: "Standard",
      },
      {
        name: "cTrader",
        minDeposit: "$200",
        baseCurrency: ["USD"],
        leverage: "1:500",
        commission: "$3/100k",
        swapType: "Standard",
      },
    ],
    platforms: ["MT4", "MT5", "cTrader"],
    instruments: [
      { category: "Forex", count: 61 },
      { category: "Metals", count: 7 },
      { category: "Indices", count: 25 },
      { category: "Crypto", count: 21 },
    ],
    rebateInfo: [
      { account: "Standard", instrument: "Forex", rebate: "$5/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Standard", instrument: "Metals", rebate: "$4/lot", autoRebate: true, payoutFrequency: "Daily" },
      { account: "Raw Spread", instrument: "Forex", rebate: "$3/lot", autoRebate: true, payoutFrequency: "Weekly" },
    ],
    regulationDetails: [
      {
        regulator: "ASIC",
        entity: "International Capital Markets Pty Ltd",
        licenseId: "AFSL 335692",
        jurisdiction: "Australia",
        protection: "Segregated accounts",
      },
      {
        regulator: "CySEC",
        entity: "IC Markets (EU) Ltd",
        licenseId: "362/18",
        jurisdiction: "Cyprus",
        protection: "€20,000 ICF",
      },
      {
        regulator: "FSA",
        entity: "IC Markets Global Ltd",
        licenseId: "SD 018",
        jurisdiction: "Seychelles",
        protection: "None",
      },
    ],
    trackingUrl: "https://www.icmarkets.com/?ib=cloudspeed",
  },
}

export function getBrokerByParam(param: string): BrokerDetails | null {
  // First try to find by numeric id
  const num = Number(param)
  if (!Number.isNaN(num)) {
    const broker = brokerDetailsData[param]
    if (broker) return broker
  }

  // Then try to find by slug
  for (const key in brokerDetailsData) {
    if (brokerDetailsData[key].slug === param) {
      return brokerDetailsData[key]
    }
  }

  return null
}

export function getBrokerDetails(id: string): BrokerDetails | null {
  return getBrokerByParam(id)
}

export function getAllBrokerParams(): { param: string }[] {
  const params: { param: string }[] = []
  for (const key in brokerDetailsData) {
    const broker = brokerDetailsData[key]
    params.push({ param: key })
    params.push({ param: broker.slug })
  }
  return params
}
