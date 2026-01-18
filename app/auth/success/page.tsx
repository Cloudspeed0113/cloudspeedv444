"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Cloud Speed</h1>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-border/50">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>

            {/* Content */}
            <h2 className="text-xl font-semibold text-foreground mb-3">{"You're all set!"}</h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Your account has been successfully created. You can now explore our partner brokers and start earning
              rebates on your trades.
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full h-11 rounded-lg font-medium">
                <Link href="/brokers">Browse Brokers</Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-11 rounded-lg font-medium bg-transparent">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help getting started?{" "}
          <Link href="/about" className="text-foreground hover:underline">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}
