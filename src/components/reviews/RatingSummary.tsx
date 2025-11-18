import React from 'react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';
import { RatingSummary as RatingSummaryType } from '../../types/review';

export interface RatingSummaryProps {
  /** Rating summary data */
  summary: RatingSummaryType;
  /** Callback when "Write a Review" button is clicked */
  onWriteReview?: () => void;
  /** Show write review button */
  showWriteButton?: boolean;
}

/**
 * RatingSummary Component
 * 
 * Displays overall rating statistics including average rating,
 * total reviews, and rating distribution with progress bars.
 * 
 * @example
 * <RatingSummary 
 *   summary={ratingSummary}
 *   onWriteReview={() => setShowReviewForm(true)}
 *   showWriteButton={true}
 * />
 */
const RatingSummary: React.FC<RatingSummaryProps> = ({
  summary,
  onWriteReview,
  showWriteButton = true
}) => {
  const { averageRating, totalReviews, distribution } = summary;

  const getPercentage = (count: number): number => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  const ratingLevels = [5, 4, 3, 2, 1] as const;

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Gradient orbs */}
      <div className="absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-2xl" />
      
      {/* Header */}
      <h3 className="text-xl font-bold text-white mb-6 relative z-10">
        Rating Summary
      </h3>

      {/* Average Rating Display */}
      <div className="text-center pb-6 border-b border-white/20 relative z-10">
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white mb-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-xs opacity-90">out of 5</div>
          </div>
        </motion.div>

        <div className="flex justify-center mb-2">
          <StarRating rating={averageRating} size="large" />
        </div>

        <p className="text-sm text-white/70">
          Based on <span className="font-semibold text-white">{totalReviews}</span> review{totalReviews !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="py-6 space-y-3 relative z-10">
        {ratingLevels.map((level, index) => {
          const count = distribution[level];
          const percentage = getPercentage(count);

          return (
            <motion.div
              key={level}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {/* Star Label */}
              <div className="flex items-center gap-1 w-16 flex-shrink-0">
                <span className="text-sm font-medium text-white">
                  {level}
                </span>
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.3 + 0.1 * index, duration: 0.6 }}
                />
              </div>

              {/* Percentage and Count */}
              <div className="w-24 text-right flex-shrink-0">
                <span className="text-sm font-medium text-white">
                  {percentage.toFixed(0)}%
                </span>
                <span className="text-xs text-white/60 ml-1">
                  ({count})
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Write Review Button */}
      {showWriteButton && (
        <motion.button
          onClick={onWriteReview}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 relative z-10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Write a Review
        </motion.button>
      )}
    </motion.div>
  );
};

export default RatingSummary;
