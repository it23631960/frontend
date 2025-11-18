import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface VideoBackgroundProps {
  videoSrc: string;
  priority?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  priority = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up" | null>(
    null
  );
  const lastScrollY = useRef(0);
  const scrollSpeed = useRef(0);
  const reverseInterval = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll detection and direction
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      const speed = Math.abs(currentScrollY - lastScrollY.current);

      setIsScrolling(true);
      setScrollDirection(direction);
      scrollSpeed.current = speed;
      lastScrollY.current = currentScrollY;

      // Clear existing timer
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      // Set new timer to detect when scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
        setScrollDirection(null);
        scrollSpeed.current = 0;
      }, 200); // Increased delay for smoother experience
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, []);

  // Control video playback based on scroll direction and visibility
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Clear any existing reverse interval
    if (reverseInterval.current) {
      clearInterval(reverseInterval.current);
      reverseInterval.current = null;
    }

    if (inView && isScrolling && scrollDirection) {
      if (scrollDirection === "down") {
        // Normal forward playback
        videoElement.playbackRate = Math.min(1 + scrollSpeed.current * 0.01, 2);

        // Only play if not already playing
        if (videoElement.paused) {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              // Ignore AbortError which happens when switching directions quickly
              if (error.name !== "AbortError") {
                console.error("Video play failed:", error);
              }
            });
          }
        }
      } else if (scrollDirection === "up") {
        // For reverse effect, pause the video and manually step backwards
        if (!videoElement.paused) {
          videoElement.pause();
        }

        // Create interval to continuously step backwards
        reverseInterval.current = setInterval(() => {
          const currentTime = videoElement.currentTime;
          const duration = videoElement.duration;
          const stepBack = 0.033; // About 30fps backwards

          // Check if duration is valid before using it
          if (isFinite(duration) && duration > 0) {
            if (currentTime > stepBack) {
              videoElement.currentTime = currentTime - stepBack;
            } else {
              // Loop to end when reaching beginning
              videoElement.currentTime = duration - stepBack;
            }
          }
        }, 33); // 30fps interval
      }
    } else {
      // Pause video when not scrolling OR not in view
      videoElement.pause();
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
      }
      if (reverseInterval.current) {
        clearInterval(reverseInterval.current);
        reverseInterval.current = null;
      }
    };
  }, [inView, isScrolling, scrollDirection]);
  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-900/40 to-pink-900/40 mix-blend-multiply" />

      {/* Subtle backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] z-[5]" />

      <video
        ref={videoRef}
        className="absolute object-cover w-full h-full"
        playsInline
        muted
        loop
        preload={priority ? "auto" : "metadata"}
        poster="/videos/placeholder.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Visual indicator for scroll direction */}
      {inView && isScrolling && scrollDirection && (
        <motion.div
          className="absolute z-20 bottom-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="p-3 border rounded-full bg-black/40 backdrop-blur-md border-purple-500/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
              <span className="text-sm font-medium text-white">
                {scrollDirection === "down" ? "▼" : "▲"}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
