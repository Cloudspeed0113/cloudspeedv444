import type { Metadata } from "next"
import { DashboardClient } from "@/components/dashboard/dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard | Cloud Speed",
  description: "View your connected brokers, rebates, and payment history",
}

export default function DashboardPage() {
  return <DashboardClient />
}
