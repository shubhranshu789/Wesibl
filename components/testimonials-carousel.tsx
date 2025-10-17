"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Head of Product",
    company: "TechFlow",
    quote: "This platform transformed how our team collaborates. The results speak for themselves.",
    avatar: "/professional-woman-headshot-brunette.jpg",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Engineering Director",
    company: "DataCore",
    quote: "Incredible performance gains and seamless integration. Our productivity increased by 40%.",
    avatar: "/professional-woman-headshot-brunette.jpg",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "VP of Operations",
    company: "CloudSync",
    quote: "The best investment we've made this year. Our entire workflow is now streamlined.",
    avatar: "/professional-woman-headshot-brunette.jpg",
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO",
    company: "InnovateLab",
    quote: "Outstanding support and features that actually solve real problems. Highly recommended.",
    avatar: "/professional-woman-headshot-brunette.jpg",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Product Manager",
    company: "ScaleUp",
    quote: "Game-changing technology that helped us scale from startup to enterprise seamlessly.",
    avatar: "/professional-woman-headshot-brunette.jpg",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setAnimationKey((prev) => prev + 1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setTimeout(() => setIsTransitioning(false), 1200)
    }, 10000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setIsTransitioning(true)
    setAnimationKey((prev) => prev + 1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlaying(true)
    }, 15000)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setIsTransitioning(true)
    setAnimationKey((prev) => prev + 1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlaying(true)
    }, 15000)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length
      visible.push({
        ...testimonials[index],
        position: i,
      })
    }
    return visible
  }

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-radial from-slate-800/50 via-slate-900/80 to-slate-900 pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">What our customers say</h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center min-h-[640px] relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 hover:border-blue-400/40 transition-all duration-500 ease-out text-white shadow-lg hover:shadow-blue-500/20"
          >
            <ChevronLeft className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 z-20 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 hover:border-blue-400/40 transition-all duration-500 ease-out text-white shadow-lg hover:shadow-blue-500/20"
          >
            <ChevronRight className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
          </Button>

          <div className="flex items-center justify-center gap-4 w-full">
            {getVisibleTestimonials().map((testimonial, index) => {
              const { position } = testimonial
              const isCenter = position === 0
              const isVisible = Math.abs(position) <= 2

              return (
                <div
                  key={`${testimonial.id}-${currentIndex}`}
                  className={cn(
                    "testimonial-card transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
                    isCenter ? "scale-100 z-10" : "scale-90 z-0",
                    Math.abs(position) === 1 && "blur-sm",
                    Math.abs(position) === 2 && "blur-md opacity-40",
                    isTransitioning && "transform-gpu will-change-transform",
                  )}
                  style={{
                    transform: `translateX(${position * 100}px) scale(${isCenter ? 1 : 0.9}) translateZ(0) ${isTransitioning && isCenter ? "rotateY(2deg)" : "rotateY(0deg)"}`,
                    transition:
                      "transform 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1000ms ease-out, filter 800ms ease-out",
                  }}
                >
                  <div className="w-[380px] h-[500px] relative group">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-3xl transition-all duration-1000 ease-out",
                        "bg-white/6 backdrop-blur-2xl",
                        "border border-white/12",
                        "shadow-2xl shadow-black/20",
                        isCenter &&
                          "hover:scale-105 hover:shadow-3xl hover:shadow-blue-500/20 hover:border-blue-400/30 hover:bg-white/8",
                        isTransitioning && isCenter && "animate-pulse",
                      )}
                    >
                      <div className="absolute inset-0 rounded-3xl shadow-inner shadow-white/5 transition-all duration-1000" />

                      <div className="relative p-8 h-full flex flex-col items-center justify-center text-center">
                        <div
                          key={`avatar-${animationKey}`}
                          className={cn(
                            "mb-8 relative",
                            "animate-in slide-in-from-top-4 fade-in duration-800 ease-out",
                            isCenter && "animation-delay-100",
                          )}
                        >
                          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-400/30 ring-offset-4 ring-offset-transparent transition-all duration-700 hover:ring-blue-400/50 hover:ring-4">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl -z-10 transition-all duration-1000 group-hover:bg-blue-400/30" />
                        </div>

                        <blockquote
                          key={`quote-${animationKey}`}
                          className={cn(
                            "text-white text-xl leading-relaxed font-medium mb-8 text-balance max-w-sm transition-all duration-700 group-hover:text-blue-50",
                            "animate-in slide-in-from-bottom-4 fade-in duration-1000 ease-out",
                            isCenter && "animation-delay-200",
                          )}
                        >
                          "{testimonial.quote}"
                        </blockquote>

                        <div
                          key={`author-${animationKey}`}
                          className={cn(
                            "mt-auto transition-all duration-700",
                            "animate-in slide-in-from-bottom-2 fade-in duration-1200 ease-out",
                            isCenter && "animation-delay-300",
                          )}
                        >
                          <cite className="not-italic">
                            <div className="text-white font-semibold text-lg mb-1 transition-colors duration-700 group-hover:text-blue-100">
                              {testimonial.name}
                            </div>
                            <div className="text-slate-300 text-sm leading-relaxed transition-colors duration-700 group-hover:text-slate-200">
                              {testimonial.role} at {testimonial.company}
                            </div>
                          </cite>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center mt-12 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
                setIsTransitioning(true)
                setAnimationKey((prev) => prev + 1)
                setTimeout(() => {
                  setIsTransitioning(false)
                  setIsAutoPlaying(true)
                }, 15000)
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-700 ease-out hover:scale-125",
                index === currentIndex
                  ? "bg-blue-400 w-8 shadow-lg shadow-blue-400/50"
                  : "bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
