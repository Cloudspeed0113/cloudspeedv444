import { AiInsightsClient } from "@/components/ai-insights/ai-insights-client"
import { Section, SectionHeader } from "@/components/section"

export default function AiInsightsPage() {
  return (
    <Section className="pt-8">
      <SectionHeader
        title="AI-Powered Market Insights"
        description="Leverage machine learning to understand market conditions and identify opportunities"
        className="mb-8"
      />
      <AiInsightsClient />
    </Section>
  )
}
