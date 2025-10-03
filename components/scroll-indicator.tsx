"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
  const [isIdleAnimation, setIsIdleAnimation] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTimeRef = useRef<number>(Date.now())
  const isScrollingRef = useRef<boolean>(false)

  // Track scroll state
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      lastScrollTimeRef.current = Date.now()
      isScrollingRef.current = true
      
      // Clear any existing idle animation
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
        idleTimeoutRef.current = null
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
        animationIntervalRef.current = null
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current)
        restartTimeoutRef.current = null
      }
      
      setIsIdleAnimation(false)
      setAnimationStep(0)
      
      // Set scrolling to false after 150ms of no scroll
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Start idle animation after 5 seconds of no scrolling
  useEffect(() => {
    if (!isScrollingRef.current) {
      idleTimeoutRef.current = setTimeout(() => {
        if (!isScrollingRef.current) {
          startIdleAnimation()
        }
      }, 5000)
    }

    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
    }
  }, [activeSection])

  const startIdleAnimation = useCallback(() => {
    setIsIdleAnimation(true)
    setAnimationStep(0)
    setDirection(1)
    
    let currentStep = 0
    
    animationIntervalRef.current = setInterval(() => {
      if (isScrollingRef.current) {
        // Stop animation if user is scrolling
        clearInterval(animationIntervalRef.current!)
        setIsIdleAnimation(false)
        setAnimationStep(0)
        return
      }
      
      currentStep++
      setAnimationStep(currentStep)
    }, 30) // 200ms per step
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
      if (animationIntervalRef.current) clearInterval(animationIntervalRef.current)
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current)
    }
  }, [])

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

  // Calculate animation position and tail effects
  const getAnimationState = (index: number) => {
    if (!isIdleAnimation) {
      return {
        isActive: activeSection === sections[index].id,
        opacity: activeSection === sections[index].id ? 1 : 0,
        scale: activeSection === sections[index].id ? 1 : 0,
      }
    }

    // Calculate current position in animation with bouncing
    const stepsPerPosition = 5
    const totalPositions = sections.length
    const cycleLength = (totalPositions - 1) * 2 // Full cycle: 0->4->0 = 8 steps
    const cycleStep = animationStep % cycleLength
    
    let targetPosition
    if (cycleStep < totalPositions) {
      // Moving forward: 0, 1, 2, 3, 4
      targetPosition = cycleStep
    } else {
      // Moving backward: 3, 2, 1, 0
      targetPosition = cycleLength - cycleStep
    }

    const isActive = index === targetPosition
    const isTail1 = index === targetPosition - 1 && targetPosition > 0
    const isTail2 = index === targetPosition - 2 && targetPosition > 1

    return {
      isActive,
      opacity: isActive ? 1 : (isTail1 ? 0.34 : isTail2 ? 0.12 : 0),
      scale: isActive ? 1 : (isTail1 ? 0.8 : isTail2 ? 0.6 : 0),
    }
  }

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map(({ id, name }, index) => {
          const animationState = getAnimationState(index)
          
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
                  scale: animationState.scale,
                  opacity: animationState.opacity,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
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
