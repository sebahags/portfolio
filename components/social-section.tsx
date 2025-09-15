"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Twitter, Instagram, ExternalLink } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    description: "Check out my code and open source contributions",
    icon: Github,
    url: "https://github.com",
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    description: "Connect with me professionally",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "hover:text-blue-400",
  },
  {
    name: "Twitter",
    description: "Follow my thoughts on tech and development",
    icon: Twitter,
    url: "https://twitter.com",
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    description: "See what I'm up to outside of coding",
    icon: Instagram,
    url: "https://instagram.com",
    color: "hover:text-pink-400",
  },
]

export function SocialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="social" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Across the Web
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find me on these platforms where I share my work, thoughts, and connect with the community.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="bg-transparent backdrop-blur-sm border-transparent hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <IconComponent size={32} className={`text-primary transition-colors ${social.color}`} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                        {social.name}
                        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{social.description}</p>
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
