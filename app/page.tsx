"use client"

import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkSection } from "@/components/work-section"
import { SocialSection } from "@/components/social-section"
import { ContactSection } from "@/components/contact-section"
import ScrollIndicator from "@/components/scroll-indicator"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ScrollIndicator />

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <main>
          <HeroSection />
          <AboutSection />
          <WorkSection />
          <SocialSection />
          <ContactSection />
        </main>
      </Suspense>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">© 2024 Your Name. Built with Next.js, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
