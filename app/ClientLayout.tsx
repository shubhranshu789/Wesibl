"use client"

import type React from "react"

import { useEffect, useState } from "react"
// import { AnimatePresence, motion } from "framer-motion"

import { motion, useMotionValue, useTransform, AnimatePresence, animate } from "framer-motion";
import { Howl } from "howler";
import { useRef } from "react";

const enterSfx = new Howl({
  src: ["/sounds/EntryReack.mp3", "/sounds/EntryReack.mp3"],
  volume: 0.6,
  preload: true,
});





export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [showMain, setShowMain] = useState(false);

  const [launched, setLaunched] = useState(false);
  const rocketRef = useRef<SVGSVGElement>(null);

  // cursor parallax for idle
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const rx = useTransform(cx, [-100, 100], [-6, 6]); // rotateY-ish via translateX
  const ry = useTransform(cy, [-60, 60], [4, -4]);   // rotateX-ish via translateY
  const idleY = useTransform(cy, [-60, 60], [-2, 2]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = rocketRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      cx.set(Math.max(-100, Math.min(100, (x / rect.width) * 200)));
      cy.set(Math.max(-60, Math.min(60, (y / rect.height) * 120)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [cx, cy]);

  // Launch along path using an animated offset
  const [offset, setOffset] = useState(0); // 0..1 path progress

  function handleLaunch() {
    if (launched) return;
    setLaunched(true);
    animate(0, 1, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setOffset(v),
      onComplete: () => setLaunched(false),
    });
  }

  // Simple cubic Bezier for the curve
  function pathPoint(t: number) {
    // start at bottom center, curve up and slightly right
    const p0 = { x: 0, y: 0 };
    const p1 = { x: 60, y: -40 };
    const p2 = { x: 90, y: -120 };
    const p3 = { x: 0, y: -160 };
    const x =
      Math.pow(1 - t, 3) * p0.x +
      3 * Math.pow(1 - t, 2) * t * p1.x +
      3 * (1 - t) * Math.pow(t, 2) * p2.x +
      Math.pow(t, 3) * p3.x;
    const y =
      Math.pow(1 - t, 3) * p0.y +
      3 * Math.pow(1 - t, 2) * t * p1.y +
      3 * (1 - t) * Math.pow(t, 2) * p2.y +
      Math.pow(t, 3) * p3.y;
    return { x, y };
  }

  const p = pathPoint(offset);



  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-50, 50], [8, -8]); // tilt up/down
  const rotateY = useTransform(mx, [-100, 100], [-10, 10]); // tilt left/right
  const glow = useTransform([mx, my], ([x, y]) => {
    const px = 50 + (x / 2); // 0–100
    const py = 50 + (y / 2);
    return `radial-gradient(650px 200px at ${px}% ${py}%, rgba(99,102,241,0.25), transparent 60%)`;
  });

  function handlePointerMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mx.set(Math.max(-100, Math.min(100, (x / rect.width) * 200)));
    my.set(Math.max(-50, Math.min(50, (y / rect.height) * 100)));
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  function onEnter() {
    enterSfx.stop();
    enterSfx.play();
    setShowMain(true);
  }

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.45 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => prev + 1)
    }, 2000) // Slightly faster for better rhythm


    const timer = setTimeout(() => {
      clearInterval(interval)
      setTimeout(() => setDone(true), 2000) // Perfect hold time for impact
    }, 1000 * 7)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1], // Custom easing for ultra-smooth feel
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(15px)",
      y: -50,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      rotateY: 45,
      scale: 0.5,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  }

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
      rotateY: 180,
      rotateZ: 45,
      filter: "blur(30px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      filter: "blur(0px)",
      transition: {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 60,
        damping: 15,
      },
    },
  }

  const appVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3,
      },
    },
  }




  return (
    <AnimatePresence mode="wait">
      {!done ? (
        <motion.div
          key="preloader"
          className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 0.8, 1.2, 1],
                x: [0, 50, -30, 20, 0],
                y: [0, -20, 40, -10, 0],
                opacity: [0.1, 0.4, 0.2, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 0.8, 1.5, 1, 1.2],
                x: [0, -40, 60, -20, 0],
                y: [0, 30, -50, 15, 0],
                opacity: [0.1, 0.3, 0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"
              animate={{
                scale: [0.8, 1.3, 1, 0.9, 0.8],
                rotate: [0, 180, 360],
                opacity: [0.05, 0.25, 0.15, 0.2, 0.05],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 4,
              }}
            />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {step < 3 ? (
            <motion.div
              className="flex gap-8 perspective-1000 relative z-10"
              initial="hidden"
              animate="visible"
              layout
              transition={{ layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
            >
              {step >= 0 && (
                <motion.span
                  layout
                  className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-default relative"
                  initial={{ opacity: 0, scale: 0.5, rotateX: -90, filter: "blur(10px)" }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateY: 10,
                    textShadow: "0 0 30px rgba(255,255,255,0.8)",
                    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))",
                  }}
                >
                  Smart
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur-xl -z-10"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.span>
              )}
              {step >= 1 && (
                <motion.span
                  layout
                  className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-default relative"
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90, filter: "blur(10px)" }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateY: -10,
                    textShadow: "0 0 30px rgba(59,130,246,0.8)",
                    filter: "drop-shadow(0 0 20px rgba(59,130,246,0.6))",
                  }}
                >
                  Secure
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent rounded-lg blur-xl -z-10"
                    animate={{
                      opacity: [0, 0.4, 0],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                </motion.span>
              )}
              {step >= 2 && (
                <motion.span
                  layout
                  className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-default relative"
                  initial={{ opacity: 0, scale: 0.5, rotateX: 90, filter: "blur(10px)" }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateY: 10,
                    filter: "drop-shadow(0 0 40px rgba(59,130,246,1)) drop-shadow(0 0 80px rgba(147,51,234,0.5))",
                  }}
                >
                  Seamless
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent rounded-lg blur-xl -z-10"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.8, 1.4, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </motion.span>
              )}
            </motion.div>
          ) : (
            <motion.div className="relative z-10" variants={logoVariants} initial="hidden" animate="visible">
              <motion.h1
                className="text-4xl font-extrabold tracking-widest bg-gradient-to-r from-blue-400 via-purple-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-default relative"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  opacity: { duration: 1, ease: "easeOut" },
                  scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  filter: { duration: 1, ease: "easeOut" },
                  backgroundPosition: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                }}
                whileHover={{
                  scale: 0.9,
                  rotateY: 5,
                  filter: "drop-shadow(0 0 40px rgba(59,130,246,1)) drop-shadow(0 0 80px rgba(147,51,234,0.5))",
                }}
                style={{
                  backgroundSize: "300% 300%",
                }}
              >
                WēSIBL.com
                <motion.div
                  className="absolute inset-0 text-8xl font-extrabold tracking-widest text-blue-400/30 blur-sm -z-10"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 text-8xl font-extrabold tracking-widest text-purple-400/20 blur-md -z-20"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.h1>
            </motion.div>
          )}

          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex space-x-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 1, 0.4],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

      ) : !showMain ? (


        // <motion.section
        //   key="button-section"
        //   variants={container}
        //   initial="hidden"
        //   animate="show"
        //   exit="exit"
        //   className="
        //     relative flex flex-col items-center justify-center min-h-screen
        //     text-white
        //     bg-[#0b0e17]
        //     bg-[radial-gradient(ellipse_at_bottom,_rgba(79,70,229,0.25),_transparent_55%)]
        //     overflow-hidden
        //   "
        // >
        //   {/* subtle star field */}
        //   <div
        //     aria-hidden
        //     className="pointer-events-none absolute inset-0 opacity-40"
        //     style={{
        //       backgroundImage:
        //         "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8) 50%, transparent 51%), radial-gradient(2px 2px at 70% 20%, rgba(255,255,255,0.7) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 40% 70%, rgba(255,255,255,0.6) 50%, transparent 51%), radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.5) 50%, transparent 51%)",
        //       backgroundSize: "600px 600px, 700px 700px, 500px 500px, 800px 800px",
        //       backgroundRepeat: "repeat",
        //     }}
        //   />

        //   <motion.h1 variants={item} className="text-4xl font-bold mb-4 text-center">
        //     Ready to Continue?
        //   </motion.h1>

        //   <motion.div
        //     variants={item}
        //     className="
        //       mt-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md
        //       px-6 py-4 shadow-[0_10px_40px_-10px_rgba(79,70,229,0.45)]
        //     "
        //   >
        //     <motion.button
        //       variants={item}
        //       onClick={() => setShowMain(true)}
        //       whileHover={{ scale: 1.05 }}
        //       whileTap={{ scale: 0.96 }}
        //       className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-all duration-300"
        //     >
        //       Enter Experience
        //     </motion.button>
        //   </motion.div>

        //   {/* bottom glow accent */}
        //   <div className="pointer-events-none absolute -bottom-16 left-1/2 h-24 w-64 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-2xl" />
        // </motion.section>


        <motion.section
          key="button-section"
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className="
        relative flex flex-col items-center justify-center min-h-screen
        text-white
        bg-[#0b0e17]
        bg-[radial-gradient(ellipse_at_bottom,_rgba(79,70,229,0.25),_transparent_55%)]
        overflow-hidden
      "
        >
          {/* star field */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8) 50%, transparent 51%), radial-gradient(2px 2px at 70% 20%, rgba(255,255,255,0.7) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 40% 70%, rgba(255,255,255,0.6) 50%, transparent 51%), radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.5) 50%, transparent 51%)",
              backgroundSize: "600px 600px, 700px 700px, 500px 500px, 800px 800px",
              backgroundRepeat: "repeat",
            }}
          />

          {/* <motion.div variants={item} initial="hidden" className="mb-8">
            <motion.img
              src="/logo.png"
              alt="WēSIBL Logo"
              width={150}
              height={150}
              
              
              style={{
                transformStyle: "preserve-3d",
              }}
            />
          </motion.div> */}


          {/* Heading */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="text-center space-y-8"
          >
            {/* Logo - Mountain with water waves */}
            <div className="flex justify-center mb-8">
              <img src="/logo.png" alt="WēSIBL Logo" className="w-32 h-32" />
            </div>

            <h1 className="text-4xl md:text-6xl font-light text-white">
              Welcome to
            </h1>

            <motion.h1
              className="text-5xl md:text-6xl font-light"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="text-white">W</span>
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                style={{ backgroundSize: "200% 200%" }}
              >
                ē
              </span>
              <span className="text-white">SIBL WORLD</span>
            </motion.h1>

          </motion.div>


          <div className="flex justify-center mt-12">
            <motion.button
              onClick={onEnter}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Outer pulsing ring */}
              <motion.div
                className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Secondary pulse ring */}
              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-60 blur-md"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

              {/* Button content */}
              <div
                className="
        relative inline-flex items-center justify-center 
        px-10 py-4 rounded-xl font-bold text-white text-lg tracking-wide
        bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600
        shadow-[0_0_30px_rgba(168,85,247,0.4)]
        transition-all duration-300
        group-hover:shadow-[0_0_40px_rgba(236,72,153,0.7),0_0_60px_rgba(59,130,246,0.5)]
        overflow-hidden
      "
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />

                {/* Button text */}
                <button className="relative z-10 flex items-center gap-3 rounded-full">
                  Start the Experience
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </button>
              </div>
            </motion.button>
          </div>










          {/* ------------------------------------------------------------------------------------------------------------ */}

          {/* ------------------------------------------------------------------------------------------------------------ */}





        </motion.section>

      ) : (
        // 🌈 Main Layout (children)
        <motion.div
          key="main-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
