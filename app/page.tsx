"use client"

// import HeroSection from "../hero-section"
import HeroSection from "../components/dynamic-hero"
import Aurora from "../app/AuroraHero"
import SmoothScrollHero2 from "../app/SmoothScrollHero"

import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import "./globals.css"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"
import Chatbot from "../components/chatbot"

// import TestimonialsCarousel from "@/components/testimonials-carousel"
import TestimonialsCarousel from "./TestimonialSection3"

import ContactForm from "../app/ContactForm4"


import Navbar from "./Navbar"


export default function Page() {
  const missionStatement =
    "Our mission is to empower businesses through technology-driven innovation. At Wesibl Technologies, we design and deliver next-generation software products that simplify complexity, enhance performance, and create real-world impact. Every product we develop begins with a clear purpose — to make processes smarter, decisions faster, and experiences seamless. We are deeply committed to understanding our clients’ goals and aligning our solutions with their vision to deliver measurable value and sustainable success. Our approach is grounded in innovation, quality, and integrity, ensuring that every product we build contributes to long-term growth and digital transformation. Beyond technology, our mission is to empower people, transform industries, and drive the future of digital excellence."

  const timelineEntries = [
    {
      id: 1,
      image: "/timeline/Seed of an Idea.jpg",
      alt: "Woman runner in artistic motion blur",
      title: "Seed of an Idea",
      description:
        "In 2018, a spark of inspiration ignited — the beginning of our vision to redefine imagination, creativity, and security. What started as a simple idea soon evolved into a mission to turn dreams into reality and build a safer, stronger future together.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "/timeline/Roots of planning.jpg",
      alt: "Male runner with determination and focus",
      title: "Roots of planning",
      description:
        "By 2023, our vision found clarity and purpose. The idea that once sparked in imagination was refined, structured, and brought to life — marking the moment our dream transformed into a defined mission for innovation, collaboration, and security.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "/timeline/pic99.jpg",
      alt: "Runner in dynamic motion showing strength and grace",
      title: "Growth in Action",
      description:
        "In 2024, our concept evolved into a concrete plan. With every detail mapped out, the blueprint laid the foundation for turning our vision into action — guiding us toward innovation, strength, and a secure future.",
      layout: "left" as const,
    },
    {
      id: 4,
      image: "/timeline/Bloom into Reality.png",
      alt: "Runner in dynamic motion showing strength and grace",
      title: "Bloom into Reality",
      description:
        "In 2025, we turned plans into action. With dedication and purpose, our work officially began — transforming ideas and blueprints into real impact, marking the start of a new chapter in innovation and security.",
      layout: "right" as const,
    },
  ]

  return (


    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <HeroSection /> */}

      <Navbar />
      <Aurora />
      <SmoothScrollHero2 />


      {/* Mission Statement Section with Grid Background */}
      <section id="intro" className="relative min-h-screen flex items-center justify-center py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-gray-900">OUR MISSION</h2> */}
            <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-12 bg-gradient-to-r from-[#e91e8c] to-[#5b4bff] bg-clip-text text-transparent">
              OUR MISSION
            </h2>

            <TextGradientScroll
              text={missionStatement}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-gray-800"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="community" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 bg-gradient-to-r from-[#e91e8c] to-[#5b4bff] bg-clip-text text-transparent">
                How It All Started
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                It all started with a vision to use technology to make life simpler, smarter, and more connected
              </p>
            </div>
          </div>


          <Timeline entries={timelineEntries} />
        </div>
      </section>

      {/* <TestimonialStack/> */}
      <div id="testimonial">
        <TestimonialsCarousel />
      </div>


      <div id="contact">
        <ContactForm />
      </div>

      {/* Smooth Scroll Hero with CTA Overlay */}
      {/* <section id="join" className="relative">
        <SmoothScrollHero
          scrollHeight={2500}
          desktopImage="/images/runners-motion-blur.png"
          mobileImage="/images/runners-motion-blur.png"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section> */}
      {/* <Chatbot /> */}


    </div>
  )
}
