"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CardGrid } from "@/components/card-grid"
import type { ComponentType } from "react"

type SocialLink = {
  name: string
  description: string
  icon: ComponentType<{ size?: number; className?: string }>
  url: string
  colorClass?: string
}

type SocialLinksProps = {
  links: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <CardGrid smCols={2} lgCols={4}>
      {links.map((social, index) => {
        const IconComponent = social.icon
        return (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
                      <IconComponent size={32} className={`text-primary transition-colors ${social.colorClass ?? ""}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                    {social.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{social.description}</p>
                </motion.a>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </CardGrid>
  )
}

export type { SocialLink }


