import Link from "next/link"
import { Button } from "@/components/ui/button"
import { content } from "@/lib/content"
import { ArrowRight } from "lucide-react"

export function FinalCtaSection() {
  const { finalCta } = content

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl md:text-2xl text-foreground font-medium mb-8 max-w-2xl mx-auto">{finalCta.text}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12"
          >
            <Link href="/compare">
              {finalCta.cta1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 h-12 border-border/50 hover:bg-secondary bg-transparent"
          >
            <Link href="#rebates">{finalCta.cta2}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
