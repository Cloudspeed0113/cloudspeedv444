import Link from "next/link"
import { Button } from "@/components/ui/button"
import { content } from "@/lib/content"
import { ArrowRight, Check } from "lucide-react"

export function ComparePreviewSection() {
  const { comparePreview } = content

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              {comparePreview.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{comparePreview.description}</p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12"
            >
              <Link href="/compare">
                {comparePreview.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right: Wizard preview illustration */}
          <div className="glass-card rounded-2xl p-6 glow-hover">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Compare Wizard Preview
            </div>

            <div className="space-y-3">
              {comparePreview.steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    i === 0 ? "bg-accent/10 border border-accent/30" : "bg-secondary/50 border border-border/30"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      i === 0 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < 3 ? i + 1 : <Check className="w-4 h-4" />}
                  </div>
                  <span className={`font-medium ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
