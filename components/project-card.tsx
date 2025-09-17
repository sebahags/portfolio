"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export type Project = {
  id: number
  title: string
  shortDescription: string
  fullDescription?: string
  technologies: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
}

type ProjectCardProps = {
  project: Project
  initialExpanded?: boolean
}

export function ProjectCard({ project, initialExpanded = false }: ProjectCardProps) {
  const [expanded, setExpanded] = useState<boolean>(initialExpanded)

  return (
    <Card className="bg-transparent backdrop-blur-sm border-transparent overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="relative overflow-hidden">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-64 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
              {(project.fullDescription || project.technologies?.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="text-primary hover:text-primary/80"
                >
                  {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </Button>
              )}
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">{project.shortDescription}</p>

            <motion.div
              initial={false}
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {project.fullDescription && (
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.fullDescription}</p>
              )}
            </motion.div>

            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/20 text-foreground px-3 py-1 rounded-full text-sm font-medium border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              {project.liveUrl && (
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} className="mr-2" />
                    Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


