import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

import { useRef } from "react";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  useScroll,
  useTransform,
  useSpring
} from "framer-motion";

import BrandHero from "./BrandHero";


const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];


export default function AuroraHero() {
  const color = useMotionValue(COLORS_TOP[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);



  // useEffect(() => {
  //   // Initialize sound
  //   const enterSfx = new Howl({
  //     src: ["/sounds/track.mp3"],
  //     volume: 0.6,
  //     preload: true,
  //     loop: true, // optional: loop background music
  //   });

  //   setSound(enterSfx);

  //   // auto-play when loaded (optional)
  //   enterSfx.play();
  //   setIsPlaying(true);

  //   return () => {
  //     enterSfx.stop();
  //   };
  // }, []);

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






  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  // const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, ${color}, #020617 50%)`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;



  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated button */}
    


        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            padding: "20px 26px",
          }}
        >

          <BrandHero />

        </div>
      </div>


      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>



    </motion.section>
  );
};