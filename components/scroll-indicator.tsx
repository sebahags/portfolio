"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "work", name: "Work" },
  { id: "social", name: "Social" },
  { id: "contact", name: "Contact" },
]

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleIndicatorClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80 // Account for navbar height
      const elementPosition = element.offsetTop - navbarHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map(({ id, name }, index) => (
          <motion.button
            key={id}
            onClick={() => handleIndicatorClick(id)}
            className="group relative w-3 h-3 rounded-full border-2 border-foreground/30 transition-all duration-300 hover:border-foreground/60"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to ${name} section`}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-foreground"
              initial={false}
              animate={{
                scale: activeSection === id ? 1 : 0,
                opacity: activeSection === id ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Tooltip */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-zinc-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap border border-zinc-700">
                {name}
              </div>
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900"></div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
