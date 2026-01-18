import { HeroSection } from "@/components/home/hero-section"
import { CostAwarenessSection } from "@/components/home/cost-awareness-section"
import { WhatAreRebatesSection } from "@/components/home/what-are-rebates-section"
import { WhyCloudSpeedSection } from "@/components/home/why-cloud-speed-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { ComparePreviewSection } from "@/components/home/compare-preview-section"
import { BrokerNetworkSection } from "@/components/home/broker-network-section"
import { FaqSection } from "@/components/home/faq-section"
import { FinalCtaSection } from "@/components/home/final-cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CostAwarenessSection />
      <WhatAreRebatesSection />
      <WhyCloudSpeedSection />
      <HowItWorksSection />
      <ComparePreviewSection />
      <BrokerNetworkSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
