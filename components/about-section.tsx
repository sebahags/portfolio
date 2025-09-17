"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import SectionWrapper from "@/components/section-wrapper"

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "AWS",
  "Docker",
  "Git",
  "Figma",
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <SectionWrapper id="about" title="About Me">
      <div className="grid lg:grid-cols-2 gap-12 items-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-transparent backdrop-blur-sm border-transparent">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">My Story</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that
                make a difference. I love turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or enjoying a good cup of coffee while reading about the latest trends in web development.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in writing clean, maintainable code and creating user experiences that are both functional
                and delightful.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-transparent backdrop-blur-sm border-transparent">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Skills & Technologies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-zinc-800/80 text-foreground border border-zinc-700 px-3 py-2 rounded-lg text-sm font-medium text-center hover:bg-zinc-700/80 transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
