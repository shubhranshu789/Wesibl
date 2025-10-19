import React, { useEffect } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('nav');
            if (!navbar) return;

            const navbarRect = navbar.getBoundingClientRect();
            const centerY = navbarRect.top + navbarRect.height / 2;

            // Get element at navbar center position
            const elementBelow = document.elementFromPoint(window.innerWidth / 2, centerY + 1);

            if (elementBelow) {
                const bgColor = window.getComputedStyle(elementBelow).backgroundColor;
                const rgb = bgColor.match(/\d+/g);

                if (rgb) {
                    const [r, g, b] = rgb.map(Number);
                    // Calculate luminance to determine if background is dark or light
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <footer className="w-full bg-black text-white min-h-screen flex items-center justify-center px-4 md:px-8 py-16">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-40">

                {/* Left Section - Newsletter */}
                <div className="flex flex-col justify-start" style={{ display: "flex", flexDirection: "column", gap: "145px" }}>
                    <div className="flex flex-col justify-center relative h-20">
                        <motion.div
                            className="text-4xl relative leading-tight tracking-wider"
                            animate={{
                                filter: [
                                    'drop-shadow(0 0 5px rgba(255, 215, 0, 0.3))',
                                    'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 15px rgba(255, 107, 53, 0.4))',
                                    'drop-shadow(0 0 5px rgba(255, 215, 0, 0.3))',
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <span >W</span>
                            <span className="bg-gradient-to-r from-[#e91e8c] to-[#5b4bff] bg-clip-text text-transparent font-bold">ē</span>
                            <span >SIBL</span>

                            {/* Small sparkles around text */}
                            {[...Array(3)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute text-yellow-400 text-xs pointer-events-none"
                                    style={{
                                        right: i === 0 ? '-10px' : i === 1 ? '10px' : '50%',
                                        top: i === 0 ? '-5px' : i === 1 ? '-8px' : '-10px',
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0],
                                        rotate: [0, 180],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.4,
                                        repeatDelay: 1.5,
                                    }}
                                >
                                    ✨
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Technologies subtitle with smaller size */}
                        <span
                            className={`text-[14.5px] font-medium tracking-[0.20em] uppercase `}
                            style={{ marginRight: '-0.48em' }}
                        >
                            TECHNOLOGIES
                        </span>
                    </div>



                    {/* Social Icons */}
                    <div className="flex gap-4 mb-8">
                        <a href="http://instagram.com/wesibltechnologies" className="text-white hover:text-purple-500 transition-colors">
                            <FaInstagram size={24} />
                        </a>
                        {/* <a href="#" className="text-white hover:text-purple-500 transition-colors">
                            <FaTwitter size={24} />
                        </a> */}
                        <a href="https://www.linkedin.com/company/wesibltechnologies" className="text-white hover:text-purple-500 transition-colors">
                            <FaLinkedin size={24} />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div>
                        <p className="text-gray-500 text-sm">
                            © Copyright 2025 - Wesibl Technologies. All Rights Reserved.
                        </p>
                    </div>
                </div>

                {/* Middle Section - Navigation Links */}
                <div className="flex flex-col">
                    <nav className="space-y-6">
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <a onClick={() => window.scrollTo({ top: 10, behavior: 'smooth' })} href="#" className="block text-white hover:text-purple-300 transition-colors text-4xl">
                                Home
                            </a>
                            <a onClick={() => scrollToSection("community")} href="#" className="block text-white hover:text-purple-400 transition-colors text-4xl">
                                Who We Are
                            </a>
                            <a onClick={() => scrollToSection("intro")} href="#" className="block text-white hover:text-purple-400 transition-colors text-4xl">
                                Services
                            </a>
                            <a onClick={() => scrollToSection("intro")} href="#" className="block text-white hover:text-purple-400 transition-colors text-4xl">
                                Contact Us
                            </a>
                        </div>

                        <div style={{ marginTop: "120px" }}>
                            <h3 className="text-white font-semibold mb-3">India</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Candor Techspace, Noida-<br />
                                Greater Noida Expy, Sector<br />
                                135, Noida, Uttar Pradesh,<br />
                                201304
                            </p>
                        </div>
                    </nav>
                </div>

                {/* Right Section - Legal & Locations */}
                <div className="flex flex-col">
                    {/* Legal Links */}
                    <div className="mb-12">
                        <a href="#" className="block text-gray-400 hover:text-white transition-colors mb-3">
                            Privacy Policy
                        </a>
                        <a href="#" className="block text-gray-400 hover:text-white transition-colors mb-3">
                            Terms and conditions
                        </a>
                        <a href="#" className="block text-gray-400 hover:text-white transition-colors mb-3">
                            Cookie Policy
                        </a>
                        <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                            Careers
                        </a>
                    </div>

                    {/* Locations */}
                    <div className="space-y-8">


                        <div style={{ marginTop: "161px" }}>
                            <h3 className="text-white font-semibold mb-3">US</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                473, Mundet Place, Ste<br />
                                US706128, Hillside, New<br />
                                Jersey, 07205
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 text-white hover:text-purple-400 transition-colors text-sm tracking-widest"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
                BACK TO TOP
            </button>
        </footer>
    );
}
