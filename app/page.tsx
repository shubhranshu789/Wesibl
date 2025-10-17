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

import ContactForm from "../app/ContactForm"


import Navbar from "./Navbar"


export default function Page() {
  const missionStatement =
    "At Wadada Run Club, we believe movement isn't an option, it's a lifestyle. Born from the vibrant spirit of Jamaica, we unite runners from every corner of the globe who share our passion for pushing boundaries. Whether you're chasing sunrise through Kingston streets or conquering mountain trails, we're here to fuel your journey. Our community thrives on the rhythm of footsteps, the power of perseverance, and the joy of shared victories. Join us as we run not just for fitness, but for freedom, friendship, and the pure love of movement."

  const timelineEntries = [
    {
      id: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RJ3iTXUn5SUexF6nHMZYhMoQLNCboK.png",
      alt: "Woman runner in artistic motion blur",
      title: "Idea start",
      description:
        "In 2018, a spark of inspiration ignited — the beginning of our vision to redefine imagination, creativity, and security. What started as a simple idea soon evolved into a mission to turn dreams into reality and build a safer, stronger future together.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LN9OPh9hw0b9rwSPRSslHoejcfoKHe.png",
      alt: "Male runner with determination and focus",
      title: "The Idea Took Shape",
      description:
        "By 2023, our vision found clarity and purpose. The idea that once sparked in imagination was refined, structured, and brought to life — marking the moment our dream transformed into a defined mission for innovation, collaboration, and security.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1FdGyjVpWQANGzsDWpoPIvF5SVI2za.png",
      alt: "Runner in dynamic motion showing strength and grace",
      title: "The Blueprint Was Ready",
      description:
        "In 2024, our concept evolved into a concrete plan. With every detail mapped out, the blueprint laid the foundation for turning our vision into action — guiding us toward innovation, strength, and a secure future.",
      layout: "left" as const,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1723664150982-ff23e5f1deb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      alt: "Runner in dynamic motion showing strength and grace",
      title: "The Vision Came to Life",
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
                ALL RUNNERS WELCOME
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Every runner has a unique journey. Here are just a few stories from our inclusive community.
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
