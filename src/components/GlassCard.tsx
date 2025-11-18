import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  title: string;
  description: string;
  buttonText: string;
  services: string[];
  onButtonClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  description,
  buttonText,
  services,
  onButtonClick
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.8, delay: 0.2 }} 
      viewport={{ once: false, amount: 0.3 }} 
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 overflow-hidden relative"
    >
      <div className="absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
      <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 rounded-full blur-2xl" />
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }} 
        viewport={{ once: false, amount: 0.3 }} 
        className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }} 
        viewport={{ once: false, amount: 0.3 }} 
        className="text-lg text-white/80 mb-6"
      >
        {description}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.5 }} 
        viewport={{ once: false, amount: 0.3 }} 
        className="flex flex-wrap gap-2 mb-8"
      >
        {services.map((service, index) => (
          <motion.span 
            key={service} 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }} 
            viewport={{ once: false, amount: 0.3 }} 
            className="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm backdrop-blur-sm border border-white/10"
          >
            {service}
          </motion.span>
        ))}
      </motion.div>
      
      <motion.button 
        onClick={onButtonClick}
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.7 }} 
        viewport={{ once: false, amount: 0.3 }} 
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' 
        }} 
        whileTap={{ scale: 0.95 }} 
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
};