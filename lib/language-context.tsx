"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Import locale files
import en from "@/locales/en.json"
import zh from "@/locales/zh.json"
import vn from "@/locales/vn.json"
import th from "@/locales/th.json"
import az from "@/locales/az.json"

export type Language = "en" | "zh" | "vn" | "th" | "az"

const translations = { en, zh, vn, th, az }

type TranslationKeys = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("cloudspeed-lang") as Language | null
    if (saved && translations[saved]) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("cloudspeed-lang", lang)
  }

  const t = translations[language] as TranslationKeys

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>{children}</div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  // Context will always have a value now due to the default value
  return context
}

export const languageNames: Record<Language, string> = {
  en: "EN",
  zh: "中文",
  vn: "VN",
  th: "TH",
  az: "AZ",
}
