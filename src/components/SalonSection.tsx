import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoBackground } from './VideoBackground';
import { GlassCard } from './GlassCard';

interface SalonSectionProps {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  videoSrc: string;
  align: 'left' | 'right' | 'center';
  services: string[];
  onButtonClick?: () => void;
}

export const SalonSection: React.FC<SalonSectionProps> = ({
  id,
  title,
  description,
  buttonText,
  videoSrc,
  align,
  services,
  onButtonClick
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const alignmentClasses = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center'
  };

  return (
    <motion.section 
      id={id} 
      ref={sectionRef} 
      className="relative h-screen flex items-center overflow-hidden"
    >
      <VideoBackground videoSrc={videoSrc} />
      <div className={`relative z-10 container mx-auto px-4 flex ${alignmentClasses[align]}`}>
        <motion.div style={{ y }} className="w-full max-w-lg">
          <GlassCard 
            title={title} 
            description={description} 
            buttonText={buttonText} 
            services={services}
            onButtonClick={onButtonClick}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};