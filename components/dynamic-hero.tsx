"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Star {
    id: number
    x: number
    y: number
    size: number
    opacity: number
}

interface FloatingStar {
    id: number
    y: number
    size: number
    speed: number
}

export default function DynamicHero() {
    const [stars, setStars] = useState<Star[]>([])
    const [floatingStars, setFloatingStars] = useState<FloatingStar[]>([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        // Generate static twinkling stars
        const generateStars = () => {
            const newStars: Star[] = []
            for (let i = 0; i < 150; i++) {
                newStars.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.8 + 0.2,
                })
            }
            setStars(newStars)
        }

        // Generate floating stars
        const generateFloatingStars = () => {
            const newFloatingStars: FloatingStar[] = []
            for (let i = 0; i < 8; i++) {
                newFloatingStars.push({
                    id: i,
                    y: Math.random() * 100,
                    size: Math.random() * 4 + 2,
                    speed: Math.random() * 20 + 15,
                })
            }
            setFloatingStars(newFloatingStars)
        }

        generateStars()
        generateFloatingStars()
    }, [])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])


    const scrollToSection = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setIsMenuOpen(false)
    }


    return (
        <div className="relative min-h-screen bg-slate-900 overflow-hidden flex items-center justify-center">
            {/* Static twinkling stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute star rounded-full bg-white animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
                        transition: "transform 0.3s ease-out",
                    }}
                />
            ))}

            {/* Floating stars */}
            {floatingStars.map((star) => (
                <div
                    key={`floating-${star.id}`}
                    className="absolute floating-star rounded-full bg-gradient-to-r from-pink-400 to-purple-500 animate-pulse"
                    style={{
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDuration: `${star.speed}s`,
                    }}
                />
            ))}

            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(236, 72, 153, 0.15), rgba(147, 51, 234, 0.1), transparent 50%)`,
                    transition: "background 0.3s ease-out",
                }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="logo-entrance mb-8 group cursor-pointer">
                    <div className="relative inline-block transform transition-all duration-500 hover:scale-110 hover:rotate-2">
                        <svg
                            width="192"
                            height="192"
                            viewBox="0 0 200 200"
                            className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-2xl"
                            style={{
                                filter: "drop-shadow(0 0 30px rgba(236, 72, 153, 0.5))",
                            }}
                        >
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="50%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                            {/* 3D W shape */}
                            <path
                                d="M30 50 L50 150 L70 100 L90 150 L110 100 L130 150 L150 100 L170 150 L190 50 L160 50 L140 120 L120 80 L100 120 L80 80 L60 120 L40 50 Z"
                                fill="url(#logoGradient)"
                                className="animate-pulse"
                            />
                            {/* Highlight effect */}
                            <path
                                d="M40 60 L55 140 L65 100 L75 130 L85 100 L95 130 L105 100 L115 130 L125 100 L135 140 L150 60"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="2"
                                fill="none"
                                className="opacity-70"
                            />
                        </svg>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                    </div>
                </div>

                {/* Welcome text */}
                <div className="content-entrance space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance">
                        Welcome to
                        <br />
                        <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                            W<span className="text-pink-400">e</span>SIBL WORLD
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-pretty leading-relaxed">
                        {"Discover infinite possibilities in our digital universe where innovation meets imagination"}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-8">
                        <Button
                            onClick={() => scrollToSection("#mission")}
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 border-0 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10">EXPLORE THE WORLD</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    )
}
