"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  mockConnectedBrokers,
  mockPaymentHistory,
  mockMonthlyRebates,
  mockTotalRebate,
  mockTotalVolume,
  type ConnectedBroker,
  type PaymentHistory,
} from "@/data/dashboard-mock"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Wallet, BarChart3, Building2 } from "lucide-react"

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ElementType
}) {
  return (
    <Card className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    paid: "default",
    completed: "default",
    pending: "secondary",
    processing: "outline",
    failed: "destructive",
  }

  const labels: Record<string, string> = {
    paid: "Paid",
    completed: "Completed",
    pending: "Pending",
    processing: "Processing",
    failed: "Failed",
  }

  return (
    <Badge variant={variants[status] || "secondary"} className="text-xs">
      {labels[status] || status}
    </Badge>
  )
}

function BrokerRow({
  broker,
  isSelected,
  onClick,
}: { broker: ConnectedBroker; isSelected: boolean; onClick: () => void }) {
  return (
    <TableRow
      onClick={onClick}
      className={`cursor-pointer transition-colors duration-150 hover:bg-muted/50 ${isSelected ? "bg-muted/70" : ""}`}
    >
      <TableCell className="font-medium">{broker.brokerName}</TableCell>
      <TableCell className="font-mono text-sm text-muted-foreground">{broker.accountId}</TableCell>
      <TableCell className="text-right">{broker.totalVolume.toFixed(1)} lots</TableCell>
      <TableCell className="text-right">${broker.rebateRate}/lot</TableCell>
      <TableCell className="text-right font-medium text-accent">${broker.rebateAmount.toFixed(2)}</TableCell>
      <TableCell>
        <StatusBadge status={broker.lastPaymentStatus} />
      </TableCell>
      <TableCell className="text-muted-foreground">{broker.lastPaymentDate}</TableCell>
    </TableRow>
  )
}

function PaymentRow({ payment }: { payment: PaymentHistory }) {
  return (
    <TableRow className="transition-colors duration-150 hover:bg-muted/50">
      <TableCell className="font-mono text-sm text-muted-foreground">{payment.id}</TableCell>
      <TableCell>{payment.date}</TableCell>
      <TableCell className="font-medium">{payment.broker}</TableCell>
      <TableCell className="text-right font-medium">${payment.amount.toFixed(2)}</TableCell>
      <TableCell>
        <StatusBadge status={payment.status} />
      </TableCell>
      <TableCell className="text-muted-foreground">{payment.method}</TableCell>
    </TableRow>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="mt-2 h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <Building2 className="h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-semibold">No connected brokers</h3>
      <p className="mt-2 text-sm text-muted-foreground">Connect a broker to start tracking your rebates</p>
      <a
        href="/brokers"
        className="mt-4 inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Browse Brokers
      </a>
    </div>
  )
}

export function DashboardClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null)
  const [showEmpty, setShowEmpty] = useState(false)

  // Simulate loading state toggle for demo
  const brokers = showEmpty ? [] : mockConnectedBrokers
  const payments = showEmpty ? [] : mockPaymentHistory

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <LoadingSkeleton />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your rebates and connected broker accounts</p>
        </div>

        {brokers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Rebate (This Month)"
                value={`$${mockTotalRebate.toLocaleString()}`}
                subtitle="+12.5% from last month"
                icon={Wallet}
              />
              <StatCard
                title="Total Volume"
                value={`${mockTotalVolume.toFixed(1)} lots`}
                subtitle="Across all brokers"
                icon={BarChart3}
              />
              <StatCard
                title="Connected Brokers"
                value={brokers.length.toString()}
                subtitle="Active accounts"
                icon={Building2}
              />
              <StatCard title="Avg. Rebate Rate" value="$0.63/lot" subtitle="Weighted average" icon={TrendingUp} />
            </div>

            {/* Monthly Chart */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Monthly Rebates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockMonthlyRebates} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "13px",
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Rebate"]}
                      />
                      <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Connected Brokers Table */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Connected Brokers</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Broker</TableHead>
                      <TableHead>Account ID</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Rebate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brokers.map((broker) => (
                      <BrokerRow
                        key={broker.accountId}
                        broker={broker}
                        isSelected={selectedBrokerId === broker.accountId}
                        onClick={() =>
                          setSelectedBrokerId(selectedBrokerId === broker.accountId ? null : broker.accountId)
                        }
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Payment History Table */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-medium">Payment History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Broker</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <PaymentRow key={payment.id} payment={payment} />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
