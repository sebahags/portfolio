"use client"

import { useState, useEffect, useRef } from "react"
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
  const [isIdle, setIsIdle] = useState(false)
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const directionRef = useRef(1) // 1 = forward, -1 = backward

  // --- Intersection Observer (normal scroll tracking) ---
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
          setAnimatingIndex(null) // stop animation, sync with scroll
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // --- Idle detection ---
  useEffect(() => {
    const handleScroll = () => {
      setIsIdle(false)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current)

      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true)
      }, 5000) // 5s idle threshold
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // initialize

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current)
    }
  }, [])

  // --- Animation loop when idle ---
  useEffect(() => {
    if (isIdle) {
      let index = sections.findIndex((s) => s.id === activeSection)
      if (index === -1) index = 0
      setAnimatingIndex(index)

      animationIntervalRef.current = setInterval(() => {
        index += directionRef.current
        if (index >= sections.length) {
          directionRef.current = -1
          index = sections.length - 2
        } else if (index < 0) {
          directionRef.current = 1
          index = 1
        }
        setAnimatingIndex(index)
      }, 200) // speed of step

      return () => {
        if (animationIntervalRef.current) clearInterval(animationIntervalRef.current)
      }
    }
  }, [isIdle, activeSection])

  const handleIndicatorClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
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
        {sections.map(({ id, name }, index) => {
          const isActive = animatingIndex !== null ? animatingIndex === index : activeSection === id
          const isTail1 = animatingIndex !== null && animatingIndex - 1 === index
          const isTail2 = animatingIndex !== null && animatingIndex - 2 === index

          return (
            <motion.button
              key={id}
              onClick={() => handleIndicatorClick(id)}
              className="group relative w-4 h-4 rounded-full border-2 border-foreground/30 transition-all duration-300 hover:border-foreground/60"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${name} section`}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : isTail1 ? 0.34 : isTail2 ? 0.12 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {/* Tooltip */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-zinc-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap border border-zinc-700">
                  {name}
                </div>
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900"></div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
