import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  viewMode: 'list' | 'grid';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ viewMode }) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
  };

  const Shimmer = () => (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`
        ${viewMode === 'list' 
          ? 'flex flex-col md:flex-row gap-6' 
          : 'flex flex-col'
        }
      `}>
        {/* Image Skeleton */}
        <div className={`
          relative overflow-hidden rounded-xl bg-purple-900/20
          ${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : 'w-full'}
          ${viewMode === 'grid' ? 'h-48' : 'h-48 md:h-full'}
        `}>
          <Shimmer />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Title and Rating */}
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="relative h-6 bg-purple-900/20 rounded overflow-hidden">
                <Shimmer />
              </div>
              <div className="relative h-4 bg-purple-900/20 rounded w-3/4 overflow-hidden">
                <Shimmer />
              </div>
            </div>
            <div className="relative h-5 w-20 bg-purple-900/20 rounded ml-4 overflow-hidden">
              <Shimmer />
            </div>
          </div>

          {/* Location */}
          <div className="relative h-4 bg-purple-900/20 rounded w-1/2 overflow-hidden">
            <Shimmer />
          </div>

          {/* Services */}
          <div className="flex gap-2">
            {Array.from({ length: viewMode === 'grid' ? 3 : 4 }).map((_, i) => (
              <div key={i} className="relative h-6 bg-purple-900/20 rounded-full w-20 overflow-hidden">
                <Shimmer />
              </div>
            ))}
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <div className="relative h-3 bg-purple-900/20 rounded w-16 overflow-hidden">
              <Shimmer />
            </div>
            <div className="relative h-4 bg-purple-900/20 rounded w-3/4 overflow-hidden">
              <Shimmer />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <div className="relative flex-1 h-10 bg-purple-900/20 rounded-lg overflow-hidden">
              <Shimmer />
            </div>
            <div className="relative flex-1 h-10 bg-purple-900/20 rounded-lg overflow-hidden">
              <Shimmer />
            </div>
            <div className="relative w-10 h-10 bg-purple-900/20 rounded-lg overflow-hidden">
              <Shimmer />
            </div>
            <div className="relative w-10 h-10 bg-purple-900/20 rounded-lg overflow-hidden">
              <Shimmer />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;