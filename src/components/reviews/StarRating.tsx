import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface StarRatingProps {
  /** Current rating value (0-5) */
  rating: number;
  /** Maximum rating value (default: 5) */
  maxRating?: number;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Enable interactive mode for user input */
  interactive?: boolean;
  /** Callback when rating changes (interactive mode only) */
  onChange?: (rating: number) => void;
  /** Show half stars */
  showHalfStars?: boolean;
  /** Custom color for filled stars */
  color?: string;
  /** Show rating number next to stars */
  showNumber?: boolean;
}

/**
 * StarRating Component
 * 
 * A reusable star rating component that can be used for both display and input.
 * 
 * @example
 * // Display mode
 * <StarRating rating={4.5} />
 * 
 * @example
 * // Interactive mode
 * <StarRating 
 *   rating={rating}
 *   interactive={true}
 *   onChange={setRating}
 * />
 */
const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  interactive = false,
  onChange,
  showHalfStars = true,
  color = 'text-yellow-400',
  showNumber = false
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const getStarFillPercentage = (index: number): number => {
    const currentRating = hoverRating !== null ? hoverRating : rating;
    
    if (currentRating >= index + 1) {
      return 100;
    } else if (showHalfStars && currentRating > index && currentRating < index + 1) {
      return (currentRating - index) * 100;
    }
    return 0;
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const fillPercentage = getStarFillPercentage(index);
    const isHovered = hoverRating !== null && index < hoverRating;

    return (
      <motion.div
        key={index}
        className={`relative ${interactive ? 'cursor-pointer' : ''}`}
        onClick={() => handleClick(index)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        whileHover={interactive ? { scale: 1.1 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
        transition={{ duration: 0.15 }}
      >
        {/* Background star (empty) */}
        <svg
          className={`${sizeClasses[size]} text-gray-300 transition-colors duration-200`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>

        {/* Foreground star (filled) */}
        {fillPercentage > 0 && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <svg
              className={`${sizeClasses[size]} ${color} ${
                interactive && isHovered ? 'brightness-110' : ''
              } transition-all duration-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </motion.div>
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-medium text-gray-700 ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
