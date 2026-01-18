export const dynamic = 'force-dynamic';
import { RebatesPageClient } from "@/components/rebates/rebates-page-client"
import { rebatesData, topPicks, topRatedBrokers } from "@/data/rebates-data"

export const metadata = {
  title: "Brokers | Cloud Speed",
  description: "Compare trading costs across brokers and find the lowest net cost with Cloud Speed rebates.",
}

export default function RebatesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">Partner Brokers</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compare trading costs across our partner network. Find the lowest net cost with rebates.
          </p>
        </div>

        <RebatesPageClient data={rebatesData} topPicks={topPicks} topRatedBrokers={topRatedBrokers} />
      </div>
    </main>
  )
}
