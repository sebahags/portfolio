"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type SectionProps = {
  id?: string
  title?: string
  subtitle?: string
  className?: string
  children: ReactNode
  headerAlign?: "center" | "left"
}

export function Section({ id, title, subtitle, className = "", children, headerAlign = "center" }: SectionProps) {
  const isCenter = headerAlign === "center"
  return (
    <section id={id} className={`py-20 relative ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`${isCenter ? "text-center" : "text-left"} mb-16`}
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{title}</h2>
            )}
            <div className={`${isCenter ? "mx-auto" : ""} w-20 h-1 bg-primary mb-8`} />
            {subtitle && (
              <p className={`${isCenter ? "mx-auto" : ""} text-xl text-muted-foreground max-w-2xl text-pretty`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  )
}


