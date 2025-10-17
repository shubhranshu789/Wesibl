"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface TimelineEntry {
  id: number
  image: string
  alt: string
  title: string
  description: string
  layout: "left" | "right"
}

interface TimelineProps {
  entries: TimelineEntry[]
  className?: string
}

export function Timeline({ entries, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Central Timeline Line with Gradient */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e91e8c] to-[#5b4bff] transform -translate-x-1/2 hidden md:block" />

      {entries.map((entry, index) => (
        <TimelineItem key={entry.id} entry={entry} index={index} scrollProgress={scrollYProgress} />
      ))}
    </div>
  )
}

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
  scrollProgress: any
}

function TimelineItem({ entry, index, scrollProgress }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const isLeft = entry.layout === "left"

  return (
    <motion.div ref={itemRef} style={{ opacity, scale }} className="relative mb-20 md:mb-32">
      {/* Timeline Dot with Gradient */}
      <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-br from-[#e91e8c] to-[#5b4bff] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block shadow-lg shadow-[#e91e8c]/30" />

      <div className="container mx-auto px-6">
        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center", {
            "md:text-right": isLeft,
          })}
        >
          {/* Image - Original styling preserved */}
          <div
            className={cn("relative flex justify-center", {
              "md:order-2": isLeft,
              "md:order-1": !isLeft,
            })}
          >
            <div className="sticky top-20">
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 w-[100%] max-w-[500px] mx-auto aspect-[4/3]">
                <img
                  src={entry.image || "/placeholder.svg"}
                  alt={entry.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn("relative", {
              "md:order-1": isLeft,
              "md:order-2": !isLeft,
            })}
          >
            <div className={cn("sticky top-32", { "md:text-right": isLeft, "md:text-left": !isLeft })}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Title with Gradient */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide bg-gradient-to-r from-[#e91e8c] to-[#5b4bff] bg-clip-text text-transparent">
                  {entry.title}
                </h3>

                {/* Center on mobile, align to column side on md+ */}
                <p
                  className={cn(
                    "text-lg md:text-xl leading-relaxed text-gray-700 max-w-lg mx-auto text-center",
                    { "md:ml-auto md:mr-0 md:text-right": isLeft, "md:mr-auto md:ml-0 md:text-left": !isLeft }
                  )}
                >
                  {entry.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
