"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "zh-CN" | "zh-TW" | "vi" | "th" | "az";

type Dict = Record<string, any>;

type LanguageContextValue = {
  lang: Language;
  t: Dict;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const dictionaries: Record<Language, Dict> = {
  "en": () => require("../locales/en.json"),
  "zh-CN": () => require("../locales/zh-CN.json"),
  "zh-TW": () => require("../locales/zh-TW.json"),
  "vi": () => require("../locales/vi.json"),
  "th": () => require("../locales/th.json"),
  "az": () => require("../locales/az.json")
} as any;

function loadDict(lang: Language): Dict {
  try {
    const mod = dictionaries[lang]();
    return mod.default || mod;
  } catch {
    const mod = dictionaries["en"]();
    return mod.default || mod;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [dict, setDict] = useState<Dict>(() => loadDict("en"));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("cloudspeed-lang") as Language | null;
    if (stored && dictionaries[stored]) {
      setLang(stored);
      setDict(loadDict(stored));
    }
  }, []);

  const setLanguage = (language: Language) => {
    setLang(language);
    setDict(loadDict(language));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cloudspeed-lang", language);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, t: dict, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
