"use client"

import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion"
import { useRef, useState, useMemo } from "react"
import { ExternalLink, Github, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"
import { useLanguage } from "../contexts/language-context"
import { getTechMeta } from "./tech-icon"
import { ProjectModal, type ProjectMeta } from "./project-modal"
import projectImgForniture from "../assets/forniture-project.webp"
import projectImgPringles from "../assets/pringles-project.webp"
// import projectImgProgress from "../assets/InProgress-project.webp"
import projectImgSnakeGame from "../assets/snakeGame-project.webp"
import projectImgCodeFlow from "../assets/codeFlow-project.webp"
import projectImgAwwwards from "../assets/awwwards-project.webp"
import projectImgCineRetro from "../assets/cineRetro-project.webp"

const projects: ProjectMeta[] = [
  {
    id: "awwwards",
    translationKey: "projectAwwwards",
    tech: ["React", "JavaScript", "Tailwind", "GSAP"],
    category: "landing",
    featured: true,
    year: "2025",
    gradient: "from-cyan-600 to-blue-600",
    image: projectImgAwwwards,
    codeLink: "https://github.com/GabrieIPujol/Awwwards",
    demoLink: "https://awwwards-flame.vercel.app/",
  },
  {
    id: "cineretro",
    translationKey: "projectCineRetro",
    tech: ["Vue", "JavaScript", "API"],
    category: "app",
    featured: true,
    year: "2025",
    gradient: "from-cyan-600 to-blue-600",
    image: projectImgCineRetro,
    codeLink: "https://github.com/GabrieIPujol/CineRetro",
    demoLink: "https://gabrieipujol.github.io/CineRetro/#/",
  },
  {
    id: "pringles",
    translationKey: "projectPringles",
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
    category: "landing",
    year: "2024",
    gradient: "from-blue-500 to-cyan-600",
    image: projectImgPringles,
    codeLink: "https://github.com/GabrieIPujol/Pringles-Project",
    demoLink: "https://gabrieipujol.github.io/Pringles-Project/Pringles/index.html",
  },
  {
    id: "codeflow",
    translationKey: "projectCodeFlow",
    tech: ["React", "TypeScript", "Tailwind"],
    category: "app",
    featured: true,
    year: "2025",
    gradient: "from-cyan-600 to-blue-600",
    image: projectImgCodeFlow,
    codeLink: "https://github.com/GabrieIPujol/CodeFlow",
    demoLink: "https://gabrieipujol.github.io/CodeFlow/",
  },
  {
    id: "snakegame",
    translationKey: "projectSnakeGame",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "game",
    year: "2024",
    gradient: "from-cyan-600 to-blue-600",
    image: projectImgSnakeGame,
    codeLink: "https://github.com/GabrieIPujol/Snake-Game",
    demoLink: "https://gabrieipujol.github.io/Snake-Game/",
  },
  {
    id: "forniture",
    translationKey: "projectForniture",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "app",
    status: "in-progress",
    year: "2025",
    gradient: "from-cyan-500 to-blue-500",
    image: projectImgForniture,
    codeLink: "https://github.com/GabrieIPujol/Furniture",
    demoLink: "https://gabrieipujol.github.io/Furniture/src/assets/html/index.html",
  },
]

// Computed once at module load so particles keep a stable position across re-renders.
const PARTICLES = Array.from({ length: 20 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 2,
}))

type Filter = "all" | ProjectMeta["category"]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const { t } = useLanguage()

  const [filter, setFilter] = useState<Filter>("all")
  const [selected, setSelected] = useState<ProjectMeta | null>(null)

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t("projects.ui.filterAll") },
    { value: "app", label: t("projects.ui.filterApp") },
    { value: "landing", label: t("projects.ui.filterLanding") },
    { value: "game", label: t("projects.ui.filterGame") },
  ]

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const selectedIndex = selected ? projects.findIndex((p) => p.id === selected.id) : -1

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32 relative bg-muted/30 overflow-hidden">
      <div className="absolute inset-0">
        {PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight bg-linear-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            {t("projects.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("projects.subtitle")}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          {filters.map((f) => {
            const active = filter === f.value
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                data-cursor-text={f.label}
                className={`cursor-hover relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500 to-blue-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            )
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                onOpen={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} index={selectedIndex} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isInView,
  onOpen,
}: {
  project: ProjectMeta
  index: number
  isInView: boolean
  onOpen: () => void
}) {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const title = t(`projects.${project.translationKey}.title`)
  const description = t(`projects.${project.translationKey}.description`)

  // Tilt + spotlight
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(6,182,212,0.18), transparent 45%)`

  const handleMove = (e: React.MouseEvent) => {
    if (reduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 12)
    rotateX.set((0.5 - py) * 12)
    glareX.set(px * 100)
    glareY.set(py * 100)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
      className="relative h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          resetTilt()
        }}
        onClick={() => {
          resetTilt()
          onOpen()
        }}
        data-cursor-text={t("projects.ui.open")}
        style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
        className="cursor-hover group relative h-full"
      >
        <motion.div
          className={`absolute -inset-[0.5px] bg-linear-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-[2px] transition duration-300 pointer-events-none`}
        />

        <div className="relative bg-card border-2 border-border rounded-3xl overflow-hidden h-full flex flex-col">
          {/* Spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          <div className={`h-2 bg-linear-to-r ${project.gradient}`} />

          <div className="p-6 relative z-10 flex-1 flex flex-col">
            <div className="mb-4">
              <motion.div
                layoutId={`project-media-${project.id}`}
                transition={{ type: "spring", stiffness: 220, damping: 30 }}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/30 aspect-16/10"
              >
                <motion.img
                  src={project.image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={isHovered ? { scale: 1.06 } : { scale: 1.01 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  {project.featured && (
                    <span className={`rounded-full bg-linear-to-r ${project.gradient} px-2.5 py-1 text-[10px] font-bold text-white shadow-lg`}>
                      ★ {t("projects.ui.featured")}
                    </span>
                  )}
                  {project.status === "in-progress" && (
                    <span className="flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-2.5 py-1 text-[10px] font-semibold text-amber-200 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                      {t("projects.ui.inProgress")}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="absolute top-4 right-4 pointer-events-none z-20"
              animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-6 h-6 text-cyan-500" />
            </motion.div>

            <div className="space-y-4 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold pr-10 leading-tight">
                <span className={`bg-linear-to-r ${project.gradient} bg-clip-text text-transparent`}>{title}</span>
              </h3>

              <p className="text-muted-foreground leading-relaxed min-h-16 line-clamp-3">{description}</p>

              <div className="mt-auto space-y-3">
                <div className="flex flex-wrap gap-2 py-2">
                  {project.tech.slice(0, 3).map((tech) => {
                    const { icon: Icon, color } = getTechMeta(tech)
                    return (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-semibold"
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color }} />
                        {tech}
                      </span>
                    )
                  })}
                  {project.tech.length > 3 && (
                    <span className="flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 pt-2 min-h-11 relative z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  {project.codeLink && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-cyan-500/50 hover:bg-cyan-500/10 bg-transparent cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.codeLink, "_blank")
                      }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                  )}

                  {project.demoLink && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-blue-500/50 hover:bg-blue-500/10 bg-transparent cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.demoLink, "_blank")
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={`absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t ${project.gradient} opacity-5 pointer-events-none`} />
        </div>
      </motion.div>
    </motion.div>
  )
}
