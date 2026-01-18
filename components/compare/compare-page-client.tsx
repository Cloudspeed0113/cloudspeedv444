"use client"

import React from "react"

import { useState, useMemo } from "react"
import { ExternalLink, Check, ChevronRight, ArrowRight, ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BrokerLogo, RegulatorBadge, AutoRebateBadge } from "@/lib/broker-utils"
import {
  activeBrokers,
  calculateExecutionScore,
  calculateCostScore,
  calculateMatchScore,
  type BrokerData,
  type MatchPreferences,
} from "@/lib/broker-data"
import { useLanguage } from "@/lib/language-context"

// Step 1 - Instruments
const instrumentOptions = [
  { value: "Forex", label: "Forex" },
  { value: "Gold", label: "Gold" },
  { value: "Indices", label: "Indices" },
  { value: "Crypto", label: "Crypto" },
  { value: "Stocks", label: "Stocks CFD" },
  { value: "Commodities", label: "Commodities" },
]

// Step 2 - Trading styles
const styleOptions = [
  { value: "scalping", label: "Scalping" },
  { value: "ea", label: "EA / Algo" },
  { value: "swing", label: "Swing" },
  { value: "position", label: "Position" },
  { value: "copy", label: "Copy trading" },
  { value: "islamic", label: "Islamic (Swap-free)" },
  { value: "bonus", label: "Bonus / Low-deposit" },
  { value: "high-leverage", label: "High leverage" },
]

// Step 3 - Cost preferences
const costPrefOptions = [
  { value: "spread", label: "Spread priority" },
  { value: "rebate", label: "Rebate priority" },
  { value: "swap-free", label: "Swap-free priority" },
  { value: "bonus", label: "Bonus priority" },
  { value: "execution", label: "Execution stability priority" },
]

export function ComparePageClient() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Instruments (multi-select)
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])

  // Step 2: Trading styles (multi-select)
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  // Step 3: Cost preferences (multi-select)
  const [selectedCostPrefs, setSelectedCostPrefs] = useState<string[]>([])

  // Results
  const [showResults, setShowResults] = useState(false)

  const canProceedStep1 = selectedInstruments.length > 0
  const canProceedStep2 = selectedStyles.length > 0

  const recommendations = useMemo(() => {
    if (!showResults) return null

    // Build preferences object
    const prefs: MatchPreferences = {
      instruments: selectedInstruments.map((i) => {
        if (i === "Gold") return "XAUUSD"
        if (i === "Forex") return "EURUSD"
        return i
      }),
      execution: selectedStyles.includes("ea") ? "ea" : selectedStyles.includes("copy") ? "copy" : "manual",
      timeHorizon: selectedStyles.includes("scalping")
        ? "scalping"
        : selectedStyles.includes("swing")
          ? "swing"
          : selectedStyles.includes("position")
            ? "position"
            : "day",
      bonusPref: selectedStyles.includes("bonus") ? "prefer-bonus" : "no-preference",
      wantSwapFree: selectedStyles.includes("islamic") || selectedCostPrefs.includes("swap-free"),
    }

    const primaryInstrument = prefs.instruments[0] || "XAUUSD"

    const scored = activeBrokers
      .filter((b) => {
        // Filter by swap-free requirement
        if (prefs.wantSwapFree && !b.swapFreeAvailable) return false
        // Filter by bonus preference
        if (prefs.bonusPref === "prefer-bonus" && !b.bonusAvailable) return false
        return true
      })
      .map((broker) => {
        const executionScore = calculateExecutionScore(broker)
        const costScore = calculateCostScore(broker, primaryInstrument)
        const matchScore = calculateMatchScore(broker, prefs)

        // Generate tags based on selection
        const tags: string[] = []
        if (selectedInstruments.includes("Gold") && broker.cost.XAUUSD) tags.push("Gold")
        if (selectedInstruments.includes("Forex") && broker.cost.EURUSD) tags.push("Forex")
        if (selectedStyles.includes("ea") && broker.platforms.includes("MT5")) tags.push("EA-ready")
        if (selectedStyles.includes("islamic") && broker.swapFreeAvailable) tags.push("Swap-free")
        if (selectedCostPrefs.includes("rebate") && broker.autoRebate) tags.push("Auto rebate")
        if (broker.bonusAvailable) tags.push("Bonus")

        return {
          ...broker,
          executionScore,
          costScore,
          matchScore,
          totalScore: (executionScore + costScore + matchScore) / 3,
          tags: tags.slice(0, 4),
          primaryInstrument,
        }
      })
      .sort((a, b) => b.totalScore - a.totalScore)

    const recommended = scored.slice(0, 2)
    const suitable = scored.slice(2, 5)

    return { recommended, suitable, primaryInstrument }
  }, [showResults, selectedInstruments, selectedStyles, selectedCostPrefs])

  const handleToggle = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSeeResults = () => {
    setShowResults(true)
    setCurrentStep(4)
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSelectedInstruments([])
    setSelectedStyles([])
    setSelectedCostPrefs([])
    setShowResults(false)
  }

  const stepLabels = [
    t.compare?.step1 || "Instruments",
    t.compare?.step2 || "Trading style",
    t.compare?.step3 || "Cost preference",
    t.compare?.step4 || "Results",
  ]

  return (
    <TooltipProvider>
      <main className="min-h-screen py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {t.compare?.title || "Find Your Ideal Broker"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.compare?.subtitle || "Answer a few questions and we'll recommend the best match"}
            </p>
          </div>

          {/* Progress stepper */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {stepLabels.map((label, i) => {
              const stepNum = i + 1
              const isActive = currentStep === stepNum
              const isCompleted = currentStep > stepNum

              return (
                <div key={i} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-accent/20 text-accent"
                          : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isCompleted ? "bg-accent text-accent-foreground" : ""
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : stepNum}
                    </span>
                    <span className="text-sm font-medium hidden sm:inline">{label}</span>
                  </div>
                  {i < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
                </div>
              )
            })}
          </div>

          {/* Step content */}
          {!showResults ? (
            <Card className="rounded-2xl p-8 bg-card border-border">
              {/* STEP 1: Select instruments */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {t.compare?.selectInstruments || "Select instrument(s)"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t.compare?.instrumentsSubtitle || "What do you primarily trade?"}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {instrumentOptions.map((opt) => {
                      const isSelected = selectedInstruments.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleToggle(opt.value, selectedInstruments, setSelectedInstruments)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-accent bg-accent/10"
                              : "border-border/50 hover:border-border bg-secondary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                                <Check className="w-3 h-3 text-accent-foreground" />
                              </div>
                            )}
                            <span className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                              {opt.label}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNextStep}
                      disabled={!canProceedStep1}
                      className="bg-primary text-primary-foreground rounded-full px-8"
                    >
                      {t.common?.continue || "Continue"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select trading style(s) */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {t.compare?.selectStyles || "Select trading style(s)"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t.compare?.stylesSubtitle || "How do you trade? Select all that apply."}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {styleOptions.map((opt) => {
                      const isSelected = selectedStyles.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleToggle(opt.value, selectedStyles, setSelectedStyles)}
                          className={`p-3 rounded-xl border-2 transition-all text-sm ${
                            isSelected
                              ? "border-accent bg-accent/10"
                              : "border-border/50 hover:border-border bg-secondary/30"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-accent-foreground" />
                              </div>
                            )}
                            <span className={isSelected ? "text-foreground" : "text-muted-foreground"}>{opt.label}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={handlePrevStep} className="rounded-full">
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      {t.common?.back || "Back"}
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!canProceedStep2}
                      className="bg-primary text-primary-foreground rounded-full px-8"
                    >
                      {t.common?.continue || "Continue"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Cost preferences */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {t.compare?.selectCostPrefs || "Cost preference"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t.compare?.costPrefsSubtitle || "What matters most to you? Select all that apply."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {costPrefOptions.map((opt) => {
                      const isSelected = selectedCostPrefs.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleToggle(opt.value, selectedCostPrefs, setSelectedCostPrefs)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-accent bg-accent/10"
                              : "border-border/50 hover:border-border bg-secondary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                                <Check className="w-3 h-3 text-accent-foreground" />
                              </div>
                            )}
                            <span className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                              {opt.label}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" onClick={handlePrevStep} className="rounded-full">
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      {t.common?.back || "Back"}
                    </Button>
                    <Button onClick={handleSeeResults} className="bg-primary text-primary-foreground rounded-full px-8">
                      {t.compare?.showResults || "Show Results"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            /* RESULTS */
            <div className="animate-fade-in space-y-8">
              {recommendations && (
                <>
                  {/* Recommended brokers */}
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm">
                        1
                      </span>
                      {t.compare?.recommendedBrokers || "Recommended broker(s)"}
                    </h2>
                    <div className="space-y-4">
                      {recommendations.recommended.map((broker, idx) => (
                        <BrokerResultCard key={broker.id} broker={broker} isTop={idx === 0} t={t} />
                      ))}
                    </div>
                  </div>

                  {/* Other suitable brokers */}
                  {recommendations.suitable.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-4">
                        {t.compare?.otherSuitable || "Other suitable brokers"}
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recommendations.suitable.map((broker) => (
                          <BrokerResultCardCompact key={broker.id} broker={broker} t={t} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reset button */}
                  <div className="text-center pt-4">
                    <Button variant="ghost" onClick={handleReset} className="rounded-full">
                      {t.compare?.startOver || "Start over"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </TooltipProvider>
  )
}

interface ScoredBroker extends BrokerData {
  executionScore: number
  costScore: number
  matchScore: number
  totalScore: number
  tags: string[]
  primaryInstrument: string
}

function ScoreWithTooltip({
  label,
  score,
  tooltip,
}: {
  label: string
  score: number
  tooltip: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className="text-sm font-semibold text-foreground">{score.toFixed(1)}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-3.5 h-3.5 text-muted-foreground/70 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

function BrokerResultCard({
  broker,
  isTop,
  t,
}: {
  broker: ScoredBroker
  isTop: boolean
  t: Record<string, unknown>
}) {
  return (
    <Card className={`p-6 bg-card ${isTop ? "border-2 border-accent/30" : "border-border"}`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Broker info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <BrokerLogo name={broker.name} logoInitials={broker.logoInitials} size={56} />
            <div>
              <h3 className="text-xl font-semibold text-foreground">{broker.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {broker.regulation.slice(0, 3).map((reg) => (
                  <RegulatorBadge key={reg} regulator={reg} size="sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {broker.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                {tag}
              </span>
            ))}
            <AutoRebateBadge hasAutoRebate={broker.autoRebate} size="sm" />
          </div>

          {/* Scores */}
          <div className="flex flex-wrap gap-4 p-3 bg-secondary/50 rounded-lg">
            <ScoreWithTooltip
              label={(t.compare as Record<string, string>)?.executionScore || "Execution"}
              score={broker.executionScore}
              tooltip={
                (t.compare as Record<string, string>)?.executionScoreTooltip ||
                "Based on platforms, regulation, symbol availability and execution features."
              }
            />
            <ScoreWithTooltip
              label={(t.compare as Record<string, string>)?.costScoreLabel || "Cost"}
              score={broker.costScore}
              tooltip={
                (t.compare as Record<string, string>)?.costScoreTooltip ||
                "Based on spread, swap, rebate and net execution cost."
              }
            />
            <ScoreWithTooltip
              label={(t.compare as Record<string, string>)?.matchScoreLabel || "Match"}
              score={broker.matchScore}
              tooltip={
                (t.compare as Record<string, string>)?.matchScoreTooltip ||
                "Based on alignment with selected instrument, style and cost preference."
              }
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 md:w-48">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
            onClick={() => window.open(broker.trackingUrl, "_blank")}
          >
            {(t.common as Record<string, string>)?.openWithRebate || "Open account"}
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full rounded-xl border-border bg-transparent" asChild>
            <a href={`/brokers/${broker.id}`}>{(t.common as Record<string, string>)?.viewBroker || "View broker"}</a>
          </Button>
        </div>
      </div>
    </Card>
  )
}

function BrokerResultCardCompact({
  broker,
  t,
}: {
  broker: ScoredBroker
  t: Record<string, unknown>
}) {
  return (
    <Card className="p-4 bg-card border-border hover:border-border-hover transition-all">
      <div className="flex items-center gap-3 mb-3">
        <BrokerLogo name={broker.name} logoInitials={broker.logoInitials} size={40} />
        <div>
          <h3 className="font-semibold text-foreground text-sm">{broker.name}</h3>
          <div className="flex gap-1 mt-0.5">
            {broker.regulation.slice(0, 2).map((reg) => (
              <RegulatorBadge key={reg} regulator={reg} size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Mini scores */}
      <div className="grid grid-cols-3 gap-2 p-2 bg-secondary/50 rounded-lg mb-3 text-center">
        <div>
          <p className="text-[10px] text-muted-foreground">Exec</p>
          <p className="text-xs font-semibold">{broker.executionScore.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Cost</p>
          <p className="text-xs font-semibold">{broker.costScore.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Match</p>
          <p className="text-xs font-semibold">{broker.matchScore.toFixed(1)}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 bg-primary text-primary-foreground rounded-xl text-xs"
          onClick={() => window.open(broker.trackingUrl, "_blank")}
        >
          Open
        </Button>
        <Button size="sm" variant="outline" className="rounded-xl text-xs border-border bg-transparent" asChild>
          <a href={`/brokers/${broker.id}`}>View</a>
        </Button>
      </div>
    </Card>
  )
}
