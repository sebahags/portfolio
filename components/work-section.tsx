"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDescription: "Modern e-commerce solution with React and Node.js",
    fullDescription:
      "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing with Stripe, inventory management, and an admin dashboard. The platform handles over 10,000 products and serves thousands of users daily.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    image: "/modern-ecommerce-interface.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    shortDescription: "Collaborative project management tool",
    fullDescription:
      "A comprehensive task management application that helps teams collaborate effectively. Built with Next.js and TypeScript, featuring real-time updates, drag-and-drop functionality, team collaboration tools, and detailed analytics. Supports multiple project views including Kanban boards and Gantt charts.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "Tailwind CSS"],
    image: "/task-management-dashboard.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "AI-Powered Analytics Dashboard",
    shortDescription: "Data visualization with machine learning insights",
    fullDescription:
      "An intelligent analytics dashboard that provides actionable insights using machine learning algorithms. Built with Python, React, and TensorFlow, it processes large datasets and presents findings through interactive visualizations. Features predictive analytics, anomaly detection, and automated reporting.",
    technologies: ["React", "Python", "TensorFlow", "D3.js", "FastAPI"],
    image: "/analytics-dashboard.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Mobile Banking App",
    shortDescription: "Secure mobile banking solution",
    fullDescription:
      "A secure mobile banking application built with React Native and Node.js. Features include account management, transaction history, bill payments, money transfers, and biometric authentication. The app follows strict security protocols and handles sensitive financial data with end-to-end encryption.",
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Plaid API"],
    image: "/mobile-banking-app.png",
    liveUrl: "#",
    githubUrl: "#",
  },
]

export function WorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  return (
    <section id="work" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">My Work</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning
            experience.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProject(project.id)}
                          className="text-primary hover:text-primary/80"
                        >
                          {expandedProject === project.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </Button>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{project.shortDescription}</p>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedProject === project.id ? "auto" : 0,
                          opacity: expandedProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground mb-4 leading-relaxed">{project.fullDescription}</p>
                      </motion.div>

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

                      <div className="flex gap-4">
                        <Button asChild className="bg-primary hover:bg-primary/90">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className="mr-2" />
                            Live Demo
                          </a>
                        </Button>
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
