"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X, ExternalLink, Github, Check } from "lucide-react"
import { Button } from "./ui/button"
import { getTechMeta } from "./tech-icon"
import { useLanguage } from "../contexts/language-context"

export type ProjectMeta = {
  id: string
  translationKey: string
  tech: string[]
  category: "app" | "landing" | "game"
  featured?: boolean
  status?: "in-progress"
  year: string
  gradient: string
  image: string
  codeLink?: string
  demoLink?: string
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function ProjectModal({ project, index, onClose }: { project: ProjectMeta; index: number; onClose: () => void }) {
  const { t, tRaw } = useLanguage()

  const base = `projects.${project.translationKey}`
  const title = t(`${base}.title`)
  const longDescription = t(`${base}.longDescription`)
  const features = (tRaw(`${base}.features`) as string[] | undefined) ?? []

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-border bg-card shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          data-cursor-text={t("projects.ui.close")}
          className="cursor-hover absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/70"
          aria-label={t("projects.ui.close")}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero media — shared layout morph from the card */}
        <motion.div
          layoutId={`project-media-${project.id}`}
          className="relative aspect-video w-full overflow-hidden"
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
        >
          <img src={project.image} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
          <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-linear-to-r ${project.gradient}`} />

          {/* Badges */}
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {project.featured && (
              <span className={`rounded-full bg-linear-to-r ${project.gradient} px-3 py-1 text-xs font-bold text-white shadow-lg`}>
                ★ {t("projects.ui.featured")}
              </span>
            )}
            {project.status === "in-progress" && (
              <span className="flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                {t("projects.ui.inProgress")}
              </span>
            )}
          </div>

          {/* Title + index */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
            <h3 className="text-3xl font-bold leading-tight sm:text-4xl">
              <span className={`bg-linear-to-r ${project.gradient} bg-clip-text text-transparent`}>{title}</span>
            </h3>
            <span className="hidden select-none text-6xl font-black leading-none text-white/5 sm:block">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Body */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 p-6 sm:p-8">
          {/* Meta row */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1 font-medium">{project.year}</span>
            <span className="rounded-full border border-border px-3 py-1 font-medium capitalize">{project.category}</span>
          </motion.div>

          {/* About */}
          <motion.div variants={item} className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-cyan-500">{t("projects.ui.about")}</h4>
            <p className="text-lg leading-relaxed text-foreground/90">{longDescription}</p>
          </motion.div>

          {/* Highlights */}
          {features.length > 0 && (
            <motion.div variants={item} className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-cyan-500">{t("projects.ui.highlights")}</h4>
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-r ${project.gradient}`}>
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Tech stack */}
          <motion.div variants={item} className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-cyan-500">{t("projects.ui.techStack")}</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => {
                const { icon: Icon, color } = getTechMeta(tech)
                return (
                  <span
                    key={tech}
                    className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-sm font-medium"
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                    {tech}
                  </span>
                )
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={item} className="flex flex-col gap-3 pt-2 sm:flex-row">
            {project.codeLink && (
              <Button
                className="cursor-hover gap-2 border-cyan-500/50 bg-transparent hover:bg-cyan-500/10"
                variant="outline"
                size="lg"
                onClick={() => window.open(project.codeLink, "_blank")}
              >
                <Github className="h-5 w-5" />
                {t("projects.ui.viewCode")}
              </Button>
            )}
            {project.demoLink && (
              <Button
                className={`cursor-hover gap-2 bg-linear-to-r ${project.gradient} text-white hover:opacity-90`}
                size="lg"
                onClick={() => window.open(project.demoLink, "_blank")}
              >
                <ExternalLink className="h-5 w-5" />
                {t("projects.ui.viewDemo")}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>,
    document.body,
  )
}
