"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import SectionWrapper from "@/components/section-wrapper"
import { SocialLinks, type SocialLink } from "@/components/social-links"

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    description: "Check out my code and open source contributions",
    icon: Github,
    url: "https://github.com",
    colorClass: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    description: "Connect with me professionally",
    icon: Linkedin,
    url: "https://linkedin.com",
    colorClass: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    description: "Follow my thoughts on tech and development",
    icon: Twitter,
    url: "https://twitter.com",
    colorClass: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    description: "See what I'm up to outside of coding",
    icon: Instagram,
    url: "https://instagram.com",
    colorClass: "hover:text-pink-400",
  },
]

export function SocialSection() {
  return (
    <SectionWrapper
      id="social"
      title="Across the Web"
      subtitle="Find me on these platforms where I share my work, thoughts, and connect with the community."
    >
      <SocialLinks links={socialLinks} />
    </SectionWrapper>
  )
}
