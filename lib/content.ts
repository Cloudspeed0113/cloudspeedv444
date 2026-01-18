export const content = {
  hero: {
    headline: "Reduce your trading costs and keep more of your profits.",
    subheadline:
      "Compare spreads, commissions, swaps and rebates across brokers — with rebates paid directly by the broker.",
    cta1: "Launch Compare",
    cta1Href: "/compare",
    cta2: "Learn about rebates",
    cta2Href: "#rebates",
  },
  costAwareness: {
    title: "Most traders pay full trading costs without realizing a portion can be returned as rebates.",
    formula: "Net execution cost = Spread + Commission – Rebate",
    example: {
      instrument: "XAUUSD (Gold)",
      spread: "50–60 points → ~$8.50 per lot",
      rebate: "-$6.00 per lot",
      netCost: "~$2.50 per lot (after rebates)",
    },
  },
  whatAreRebates: {
    title: "What are forex rebates?",
    points: [
      "Every trade has a built-in cost (spread + commission).",
      "Brokers share part of this cost with partners (IBs).",
      "Cloud Speed uses IB structures to negotiate high rebates.",
      "Most of that rebate is passed back to traders.",
      "Result: lower net trading cost, without changing how or where you trade.",
    ],
    note: "Cloud Speed does not hold client funds and does not execute trades. Rebates are processed directly by brokers via their IB programs.",
  },
  whyCloudSpeed: {
    title: "Why traders use Cloud Speed",
    cards: [
      {
        title: "Lower net trading costs",
        description: "Use rebates to reduce your effective spread and commission.",
      },
      {
        title: "Neutral broker comparison",
        description: "We compare multiple brokers and account types. You choose what fits you.",
      },
      {
        title: "No change to trading workflow",
        description: "You still trade directly with your broker. Same platforms, same accounts.",
      },
      {
        title: "Global coverage",
        description: "FX, Gold and Indices across major global brokers, with support for emerging markets.",
      },
      {
        title: "Safe structure",
        description: "Funds always remain with your broker. Cloud Speed never holds client deposits.",
      },
    ],
  },
  howItWorks: {
    title: "How Cloud Speed works",
    steps: [
      {
        step: "1",
        title: "Open an account via Cloud Speed",
        description: "Choose a broker and account type using our comparison.",
      },
      {
        step: "2",
        title: "Trade normally with your broker",
        description: "Use your usual platform (MT4 / MT5 / cTrader, etc.). Nothing changes in your execution.",
      },
      {
        step: "3",
        title: "Receive rebates automatically",
        description: "Brokers pay rebates automatically based on your trading volume.",
      },
    ],
    note: "Funds always remain with your broker. Cloud Speed does not hold or move client money.",
  },
  comparePreview: {
    title: "Find the best broker for your trading style",
    description: "Compare spreads, commissions, rebates and net costs on FX, Gold and Indices.",
    steps: ["What do you trade?", "How do you trade?", "Region & bonus preference", "Results"],
    cta: "Launch Compare",
  },
  brokerNetwork: {
    title: "Partner brokers",
    note: "Rebates are configured through official broker IB programs. Cloud Speed passes most of the rebate back to traders.",
    brokers: ["XM", "Exness", "IC Markets", "TMGM", "VT Markets"],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is this safe?",
        answer:
          "Yes. You always open accounts directly with brokers and fund them as usual. Cloud Speed does not hold client funds and does not execute trades.",
      },
      {
        question: "Why don't brokers just give me rebates directly?",
        answer:
          "High rebate levels are usually tied to IB partnerships and volume commitments. Cloud Speed leverages these relationships and passes most of the benefit back to traders.",
      },
      {
        question: "Do I need to change how I trade?",
        answer:
          "No. You keep your normal trading style, platform, and broker. Only your cost structure changes through rebates.",
      },
      {
        question: "How are rebates paid?",
        answer: "Rebates are paid automatically by the broker, according to their IB policy.",
      },
      {
        question: "Which regions are supported?",
        answer:
          "Cloud Speed aims for global coverage with a focus on emerging FX markets. Availability and bonus offers may vary by region and regulation.",
      },
    ],
  },
  finalCta: {
    text: "Compare brokers, understand your costs, and get rebates directly from brokers.",
    cta1: "Launch Compare",
    cta2: "Learn about rebates",
  },
  footer: {
    product: [
      { href: "/compare", label: "Compare" },
      { href: "/brokers", label: "Brokers" },
      { href: "/insights", label: "Insights" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/about#contact", label: "Contact" },
    ],
    legal: [
      { href: "#", label: "Terms" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Risk Warning" },
    ],
    disclaimer:
      "Cloud Speed is an independent IB/affiliate platform, not a broker. Trading leveraged products carries significant risk.",
  },
}
