"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { TypedTitle } from "./typed-title"

// Computed once at module load so particles keep a stable path across re-renders.
const PARTICLES = Array.from({ length: 20 }, () => ({
  startX: Math.random() * window.innerWidth,
  startY: Math.random() * window.innerHeight,
  endX: Math.random() * window.innerWidth,
  endY: Math.random() * window.innerHeight,
  duration: Math.random() * 10 + 10,
}))

export function Hero() {
  const { t } = useLanguage()

  const scrollToEducation = () => {
    document.querySelector("#education")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-background via-background to-cyan-950/10 dark:to-cyan-500/5" />
        {PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-500/20 rounded-full"
            initial={{
              x: particle.startX,
              y: particle.startY,
            }}
            animate={{
              y: [null, particle.endY],
              x: [null, particle.endX],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent text-balance overflow-visible leading-[1.1] pb-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{ backgroundSize: "200% auto" }}
            >
              {/* Stable text for crawlers/screen readers — the typed animation never
                  holds the full string, so the h1 would otherwise read as empty. */}
              <span className="sr-only">Gabriel Pujol Amaral Gurgel Velosa — Full Stack Developer</span>
              <span aria-hidden="true">
                <TypedTitle words={["Gabriel Pujol Amaral Gurgel Velosa", "Full Stack Developer"]} />
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            {t("hero.description")}
          </motion.p>
        </div>
      </div>

      <motion.button
        aria-label="Scroll to education"
        onClick={scrollToEducation}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        data-cursor-text="SCROLL"
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </motion.button>
    </section>
  )
}
