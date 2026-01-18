"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, type ReactNode } from "react"

export function ScrollResetProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Skip scroll reset on initial mount to avoid FOUC
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // Use instant scroll to avoid layout shift
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return <>{children}</>
}
