"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { CTAButtons } from "@/components/cta-buttons"

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hello, I'm <span className="text-primary">Your Name</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A passionate developer creating beautiful, functional, and user-centered digital experiences.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
            <CTAButtons
              ctas={[
                { href: "#work", label: "View My Work" },
                { href: "#contact", label: "Get In Touch", variant: "outline" },
              ]}
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => {
              const aboutElement = document.getElementById("about")
              if (aboutElement) {
                const navbarHeight = 80
                const elementPosition = aboutElement.offsetTop - navbarHeight
                window.scrollTo({
                  top: elementPosition,
                  behavior: "smooth",
                })
              }
            }}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
