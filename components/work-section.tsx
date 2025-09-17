"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ProjectCard, type Project } from "@/components/project-card"
import SectionWrapper from "@/components/section-wrapper"
import { CardGrid } from "@/components/card-grid"

const projects: Project[] = [
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
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <SectionWrapper
      id="work"
      title="My Work"
      subtitle="Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience."
    >
      <CardGrid className="gap-8" ref={ref as any}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </CardGrid>
    </SectionWrapper>
  )
}
