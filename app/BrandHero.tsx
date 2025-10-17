// components/BrandHero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BrandHero() {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMx(x / rect.width);
      setMy(y / rect.height);
    };

    const onLeave = () => {
      setMx(0);
      setMy(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      aria-label="brand"
      className="relative isolate min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 mt-10"
    >
      <div
        ref={containerRef}
        className="group relative w-full max-w-6xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        {/* Ambient gradient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-20 rounded-[30%] blur-3xl opacity-40 transition-opacity duration-500 space-y-20"
          style={{
            background:
              "radial-gradient(600px 300px at 20% 30%, rgba(99,102,241,.35), transparent 60%), radial-gradient(600px 300px at 80% 70%, rgba(16,185,129,.35), transparent 60%)",
            transform: `translate3d(${mx * 20}px, ${my * 20}px, 0)`,
          }}
        />

        {/* Main content container */}
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Logo and Brand Name Section */}
       
          {/* Hero Heading with gradient text effect */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{
              transform: `translate3d(${mx * 4}px, ${my * 4}px, 0)`,
              transition: "transform 220ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight">
              <span className="font-bold">Creating</span> a Secure
              <br />
              <span className="font-bold">World</span>{" "}
              <span className="font-extralight text-gray-300">Today</span>
            </h1>
          </motion.div>

          {/* Description text with stagger animation */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{
              transform: `translate3d(${mx * 2}px, ${my * 2}px, 0)`,
              transition: "transform 220ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
              Welcome to our world of endless imagination and boundless creativity. 
              Together, let's embark on a remarkable journey where dreams become tangible realities. 
              Through innovation, vigilance, and collaboration, we build strong foundations that 
              safeguard our future. Every step we take now strengthens communities and empowers 
              individuals to thrive safely. Security isn't just a goal—it's a commitment we make 
              together, starting today.
            </p>
          </motion.div>

          {/* Interactive mesh pattern background */}
          <div 
            className="absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translate3d(${mx * -10}px, ${my * -10}px, 0)`,
              transition: "transform 220ms cubic-bezier(.2,.8,.2,1)",
            }}
          />

        </div>

        {/* Subtle character pulse for the macron letter */}
        <style jsx>{`
          .special-e {
            display: inline-block;
            transition: transform 220ms ease, color 220ms ease;
          }
          .group:hover .special-e {
            transform: translateY(-2px) scale(1.06);
            color: rgb(99 102 241);
          }
        `}</style>
      </div>
    </section>
  );
}
