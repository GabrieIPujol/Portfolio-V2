"use client"

import { useState, useLayoutEffect, type ReactNode } from "react"
import { ThemeContext, type Theme } from "./theme-context"

/** Reads the persisted theme once at mount; defaults to dark. */
function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme") as Theme | null
  return saved ?? "dark"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Keep the <html> class in sync with the theme (before paint, so no flicker).
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
