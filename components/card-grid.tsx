"use client"

import type { ReactNode, ForwardedRef } from "react"
import { forwardRef } from "react"

export type CardGridProps = {
  children: ReactNode
  className?: string
  smCols?: 1 | 2 | 3 | 4
  mdCols?: 1 | 2 | 3 | 4
  lgCols?: 1 | 2 | 3 | 4
  xlCols?: 1 | 2 | 3 | 4
}

export const CardGrid = forwardRef<HTMLDivElement, CardGridProps>(function CardGrid(
  { children, className = "", smCols, mdCols, lgCols, xlCols }: CardGridProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const classes = [
    "grid",
    "gap-6",
    className,
    smCols ? `sm:grid-cols-${smCols}` : "",
    mdCols ? `md:grid-cols-${mdCols}` : "",
    lgCols ? `lg:grid-cols-${lgCols}` : "",
    xlCols ? `xl:grid-cols-${xlCols}` : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
})


