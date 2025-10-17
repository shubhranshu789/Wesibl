"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorEffect() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      clearTimeout(timeout)
      timeout = setTimeout(() => setIsMoving(false), 150)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isMoving ? 1.2 : 1,
          opacity: isMoving ? 0.8 : 0.4,
        }}
        transition={{
          x: { type: "spring", stiffness: 200, damping: 25 },
          y: { type: "spring", stiffness: 200, damping: 25 },
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30 blur-md" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{
          x: pos.x - 14,
          y: pos.y - 14,
          scale: isMoving ? 1.1 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 250, damping: 22 },
          y: { type: "spring", stiffness: 250, damping: 22 },
          scale: { duration: 0.15 },
        }}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400/50 via-purple-400/50 to-blue-400/50 blur-sm" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{
          x: pos.x - 10,
          y: pos.y - 10,
          scale: isMoving ? 0.9 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 20 },
          y: { type: "spring", stiffness: 300, damping: 20 },
          scale: { duration: 0.1 },
        }}
      >
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 border border-white/30 shadow-lg shadow-purple-500/50" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        animate={{
          x: pos.x - 2,
          y: pos.y - 2,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 18,
        }}
      >
        <div className="w-1 h-1 rounded-full bg-white shadow-sm" />
      </motion.div>
    </>
  )
}
