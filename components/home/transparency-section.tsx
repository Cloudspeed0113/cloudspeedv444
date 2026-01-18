import { Section } from "@/components/section"
import { content } from "@/lib/content"
import { ShieldCheck } from "lucide-react"

export function TransparencySection() {
  return (
    <Section>
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-2 bg-secondary rounded-lg mb-4">
          <ShieldCheck className="h-5 w-5 text-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">{content.transparency.title}</h2>
        <ul className="space-y-2 mb-8">
          {content.transparency.items.map((item, index) => (
            <li key={index} className="text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground/70 max-w-xl mx-auto">{content.transparency.riskWarning}</p>
      </div>
    </Section>
  )
}
