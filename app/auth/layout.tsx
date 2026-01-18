import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account | Cloud Speed",
  description: "Sign in or create your Cloud Speed account to start earning forex rebates.",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth pages render without the global header/footer for a cleaner experience
  return <>{children}</>
}
