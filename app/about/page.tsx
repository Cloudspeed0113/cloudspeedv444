import { Section, SectionHeader } from "@/components/section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Shield, Users, Globe, XCircle, Mail } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Transparency First",
    description: "We believe traders deserve complete clarity on how rebates work and what they can earn.",
  },
  {
    icon: Users,
    title: "Trader Independence",
    description: "Our recommendations are based purely on trader benefits, not broker relationships.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "We work with brokers worldwide to ensure traders everywhere can benefit from rebates.",
  },
]

const notList = [
  "We are NOT a forex broker",
  "We do NOT hold client funds",
  "We do NOT provide investment advice",
  "We do NOT execute trades on your behalf",
  "We do NOT manage portfolios or accounts",
]

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8">
        <SectionHeader title="About Cloud Speed" description="Helping traders reduce costs since 2020" />
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Cloud Speed was founded with a simple mission: help traders keep more of their profits. We noticed that
            while brokers offer referral commissions, most traders never benefit from these programs. We changed that by
            building a transparent platform that shares rebates directly with traders.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Today, we partner with leading regulated brokers worldwide and have helped thousands of traders save on
            their trading costs. Our AI-powered insights complement our rebate service by helping traders make more
            informed decisions.
          </p>
        </div>
      </Section>

      <Section className="bg-card">
        <SectionHeader title="Our Values" />
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="p-6 bg-background border-border/50 rounded-2xl text-center">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-6 md:p-8 bg-card border-border/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">What Cloud Speed is NOT</h3>
            </div>
            <ul className="space-y-4">
              {notList.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 md:p-8 bg-card border-border/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Contact Us</h3>
            </div>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="rounded-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help?" rows={4} className="rounded-lg resize-none" />
              </div>
              <Button
                type="button"
                className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full"
              >
                Send Message
              </Button>
            </form>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Or email us directly at{" "}
              <a href="mailto:support@cloudspeed.com" className="text-primary hover:underline">
                support@cloudspeed.com
              </a>
            </p>
          </Card>
        </div>
      </Section>
    </>
  )
}
