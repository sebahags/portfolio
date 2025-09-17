"use client"

import { Button } from "@/components/ui/button"

type Cta = {
  href: string
  label: string
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

type CTAButtonsProps = {
  ctas: [Cta, ...Cta[]]
  className?: string
}

export function CTAButtons({ ctas, className = "" }: CTAButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
      {ctas.map((cta, index) => (
        <Button
          key={`${cta.href}-${index}`}
          variant={cta.variant}
          size={cta.size ?? "lg"}
          className={`${cta.variant === "outline" ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent" : "bg-primary hover:bg-primary/90 text-primary-foreground"} px-8 py-3 text-lg`}
          asChild
        >
          <a href={cta.href}>{cta.label}</a>
        </Button>
      ))}
    </div>
  )
}


