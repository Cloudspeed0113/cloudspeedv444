import { BrokersPageClient } from "@/components/brokers/brokers-page-client"
import brokersData from "@/data/brokers.json"

export const metadata = {
  title: "Brokers & Rebates | Cloud Speed",
  description: "Compare trading costs and rebates across our partner broker network",
}

export default function BrokersPage() {
  return <BrokersPageClient brokers={brokersData} />
}
