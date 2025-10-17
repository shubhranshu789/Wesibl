'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

export default function Navbar() {
  const [sound, setSound] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true); // Track if navbar is over dark section

  useEffect(() => {
    // Initialize sound
    const enterSfx = new Howl({
      src: ["/sounds/tracknew.mp3"],
      volume: 0.6,
      preload: true,
      loop: true,
    });

    setSound(enterSfx);
    enterSfx.play();
    setIsPlaying(true);

    return () => {
      enterSfx.stop();
    };
  }, []);

  // Detect background color on scroll
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
          setIsDarkSection(luminance < 0.5); // Dark if luminance < 0.5
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: "intro", label: "Our Mission" },
    { id: "community", label: "Our Journey" },
    { id: "testimonial", label: "Testimonial" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300 ${isDarkSection
          ? 'bg-black/20 border-b border-white/5'
          : 'bg-white/80 border-b border-gray-200 shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">

          {/* Logo - Left */}
          <div className="flex items-start gap-4 group cursor-pointer flex-shrink-0 relative">
            {/* Logo container - positioned first to get center reference */}
            <div className="relative">
              {/* Sparkle/Cracker particles - centered on logo */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{
                    background: i % 3 === 0
                      ? '#FFD700'
                      : i % 3 === 1
                        ? '#FF6B35'
                        : '#e91e8c',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-2px',
                    marginTop: '-2px',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 30 * Math.PI) / 180) * 60],
                    y: [0, Math.sin((i * 30 * Math.PI) / 180) * 60],
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut",
                    repeatDelay: 2,
                  }}
                />
              ))}

              {/* Additional burst particles - centered on logo */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute w-0.5 h-4 rounded-full pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, ${i % 2 === 0 ? '#FFD700' : '#FF6B35'
                      }, transparent)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-1px',
                    marginTop: '-8px',
                    transformOrigin: 'center center',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 45 * Math.PI) / 180) * 55],
                    y: [0, Math.sin((i * 45 * Math.PI) / 180) * 55],
                    rotate: [0, (i * 45) + 90],
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: 0.5 + i * 0.08,
                    ease: "easeOut",
                    repeatDelay: 2,
                  }}
                />
              ))}

              {/* Glowing ring effect - centered on logo */}
              <motion.div
                className="absolute rounded-full border-2 pointer-events-none"
                style={{
                  borderColor: '#FFD700',
                  left: '50%',
                  top: '50%',
                  width: '80px',
                  height: '80px',
                  marginLeft: '-40px',
                  marginTop: '-40px',
                }}
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.8, 0],
                  borderWidth: ['2px', '0px'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  repeatDelay: 2,
                }}
              />

              {/* Logo container - much larger to match text height */}
              <motion.div
                className="w-20 h-20 relative z-10 transform transition-transform duration-300 group-hover:scale-110"
                animate={{
                  filter: [
                    'drop-shadow(0 0 5px #FFD700) drop-shadow(0 0 10px #FF6B35)',
                    'drop-shadow(0 0 15px #FFD700) drop-shadow(0 0 25px #FF6B35)',
                    'drop-shadow(0 0 5px #FFD700) drop-shadow(0 0 10px #FF6B35)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/logo.png"
                  alt="WēSIBL Logo"
                  className="w-full h-full object-contain relative z-10"
                />
              </motion.div>
            </div>

            {/* Text with festive glow and styled ē */}
            <div className="flex flex-col justify-center relative h-20">
              <motion.div
                className="text-2xl font-semibold relative leading-tight"
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
                <span className={isDarkSection ? 'text-white' : 'text-gray-900'}>W</span>
                <span className="bg-gradient-to-r from-[#e91e8c] to-[#5b4bff] bg-clip-text text-transparent font-bold">ē</span>
                <span className={isDarkSection ? 'text-white' : 'text-gray-900'}>SIBL</span>

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

              {/* Technologies subtitle */}
              <span className={`text-xs font-medium tracking-[0.25em] uppercase ${isDarkSection ? 'text-gray-400' : 'text-gray-600'
                }`}>
                TECHNOLOGIES
              </span>
            </div>
          </div>


          {/* Sound Control - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={togglePlay}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-300 ${isDarkSection ? 'hover:bg-white/5' : 'hover:bg-gray-200/50'
                }`}
            >
              <span className={`text-sm font-semibold ${isDarkSection ? 'text-white' : 'text-gray-900'
                }`}>
                Sound
              </span>
              <div className="flex items-center gap-1 h-5">
                {isPlaying ? (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 rounded-full"
                        style={{
                          height: `${Math.random() * 14 + 10}px`,
                          animation: `pulse 0.8s ease-in-out infinite`,
                          animationDelay: `${i * 0.15}s`,
                          background: `linear-gradient(to top, #e91e8c, #5b4bff, #e91e8c)`,
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {[8, 12, 16, 12, 8].map((height, i) => (
                      <div
                        key={i}
                        className={`w-0.5 rounded-full transition-all duration-300 ${isDarkSection ? 'bg-gray-500' : 'bg-gray-400'
                          }`}
                        style={{
                          height: `${height}px`,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Hamburger Menu Button with Dropdown */}
          <div className="relative">
            <button
              className={`relative w-10 h-10 flex items-center justify-center transition-colors z-50 group ${isDarkSection ? 'text-white' : 'text-gray-900'
                }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out group-hover:bg-purple-500 ${menuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out group-hover:bg-purple-500 ${menuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out group-hover:bg-purple-500 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                />
              </div>
            </button>

            {/* Small Dropdown Menu */}
            <div
              className={`absolute top-full right-0 mt-4 w-56 backdrop-blur-lg bg-gradient-to-br from-slate-900/95 via-blue-950/95 to-slate-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-right ${menuOpen
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
              <div className="py-3 px-2">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 rounded-lg transition-all duration-200 transform ${menuOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-2 opacity-0'
                      }`}
                    style={{
                      transitionDelay: menuOpen ? `${index * 50 + 100}ms` : '0ms',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Decorative gradient at bottom */}
              <div className="h-1 bg-gradient-to-r from-[#e91e8c] via-[#5b4bff] to-[#e91e8c]" />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scaleY(0.5);
            opacity: 0.7;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
}
