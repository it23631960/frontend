import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { VideoBackground } from "./VideoBackground";
export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const scrollToNext = () => {
    const nextSection = document.getElementById("hair");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <motion.section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        scale,
      }}
    >
      <VideoBackground
        videoSrc="/videos/hero-salon-overview.mp4"
        priority={true}
      />
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        style={{
          opacity,
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          >
            Discover Your Perfect Beauty Experience
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
            className="text-lg md:text-xl text-white/80 mb-8"
          >
            Explore our curated selection of premium salons for every beauty
            need
          </motion.p>
          <motion.button
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={scrollToNext}
          >
            Explore Services
          </motion.button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: 1.5,
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNext}
        >
          <ChevronDownIcon size={32} className="text-white/80" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
