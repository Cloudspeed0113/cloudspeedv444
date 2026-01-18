import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-12 md:mb-16", className)}>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
      {description && <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{description}</p>}
    </div>
  )
}
