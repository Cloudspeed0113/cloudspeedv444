// Mock data for the dashboard page

export interface ConnectedBroker {
  brokerName: string
  accountId: string
  totalVolume: number
  rebateRate: number
  rebateAmount: number
  lastPaymentStatus: "paid" | "pending" | "processing"
  lastPaymentDate: string
}

export interface PaymentHistory {
  id: string
  date: string
  broker: string
  amount: number
  status: "completed" | "pending" | "failed"
  method: string
}

export interface MonthlyRebate {
  month: string
  amount: number
}

export const mockConnectedBrokers: ConnectedBroker[] = [
  {
    brokerName: "Exness",
    accountId: "EX-78432156",
    totalVolume: 245.8,
    rebateRate: 0.7,
    rebateAmount: 1720.6,
    lastPaymentStatus: "paid",
    lastPaymentDate: "2024-01-12",
  },
  {
    brokerName: "IC Markets",
    accountId: "ICM-91234567",
    totalVolume: 189.3,
    rebateRate: 0.65,
    rebateAmount: 1230.45,
    lastPaymentStatus: "paid",
    lastPaymentDate: "2024-01-10",
  },
  {
    brokerName: "XM",
    accountId: "XM-45678901",
    totalVolume: 98.5,
    rebateRate: 0.6,
    rebateAmount: 591.0,
    lastPaymentStatus: "processing",
    lastPaymentDate: "2024-01-08",
  },
  {
    brokerName: "Pepperstone",
    accountId: "PP-23456789",
    totalVolume: 156.2,
    rebateRate: 0.55,
    rebateAmount: 859.1,
    lastPaymentStatus: "pending",
    lastPaymentDate: "2024-01-05",
  },
]

export const mockPaymentHistory: PaymentHistory[] = [
  {
    id: "PAY-001",
    date: "2024-01-12",
    broker: "Exness",
    amount: 1720.6,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "PAY-002",
    date: "2024-01-10",
    broker: "IC Markets",
    amount: 1230.45,
    status: "completed",
    method: "Crypto (USDT)",
  },
  {
    id: "PAY-003",
    date: "2024-01-08",
    broker: "XM",
    amount: 591.0,
    status: "pending",
    method: "Bank Transfer",
  },
  {
    id: "PAY-004",
    date: "2024-01-05",
    broker: "Pepperstone",
    amount: 859.1,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "PAY-005",
    date: "2023-12-28",
    broker: "Exness",
    amount: 1456.2,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "PAY-006",
    date: "2023-12-22",
    broker: "IC Markets",
    amount: 987.65,
    status: "completed",
    method: "Crypto (USDT)",
  },
]

export const mockMonthlyRebates: MonthlyRebate[] = [
  { month: "Aug", amount: 2840 },
  { month: "Sep", amount: 3120 },
  { month: "Oct", amount: 2950 },
  { month: "Nov", amount: 3680 },
  { month: "Dec", amount: 4210 },
  { month: "Jan", amount: 4401 },
]

export const mockTotalRebate = 4401.15
export const mockTotalVolume = 689.8
