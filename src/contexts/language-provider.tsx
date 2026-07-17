"use client"

import { useState, type ReactNode } from "react"
import { LanguageContext, translations, type Language } from "./language-context"

/** Walks a dot-separated key path (e.g. "projects.ui.close") through the translation tree. */
function resolve(language: Language, key: string): unknown {
  let value: unknown = translations[language]

  for (const k of key.split(".")) {
    if (typeof value !== "object" || value === null) return undefined
    value = (value as Record<string, unknown>)[k]
  }

  return value
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"))
  }

  const t = (key: string): string => {
    const value = resolve(language, key)
    return typeof value === "string" && value ? value : key
  }

  const tRaw = (key: string): unknown => resolve(language, key)

  return <LanguageContext.Provider value={{ language, toggleLanguage, t, tRaw }}>{children}</LanguageContext.Provider>
}
