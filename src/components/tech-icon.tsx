import { Atom, Braces, FileCode2, Wind, Triangle, Code2, Palette, Zap, Webhook, Boxes, type LucideIcon } from "lucide-react"

type TechMeta = { icon: LucideIcon; color: string }

const TECH_MAP: Record<string, TechMeta> = {
  react: { icon: Atom, color: "#61DAFB" },
  javascript: { icon: Braces, color: "#F7DF1E" },
  js: { icon: Braces, color: "#F7DF1E" },
  typescript: { icon: FileCode2, color: "#3178C6" },
  ts: { icon: FileCode2, color: "#3178C6" },
  tailwind: { icon: Wind, color: "#38BDF8" },
  vue: { icon: Triangle, color: "#42B883" },
  html: { icon: Code2, color: "#E34F26" },
  css: { icon: Palette, color: "#1572B6" },
  gsap: { icon: Zap, color: "#88CE02" },
  api: { icon: Webhook, color: "#06B6D4" },
  frameworks: { icon: Boxes, color: "#06B6D4" },
}

export function getTechMeta(tech: string): TechMeta {
  const key = tech.toLowerCase().replace(/[^a-z]/g, "")
  return TECH_MAP[key] ?? { icon: Code2, color: "#06B6D4" }
}
