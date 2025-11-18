import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';
import { Review, formatRelativeTime } from '../../types/review';

export interface ReviewCardProps {
  /** Review data */
  review: Review;
  /** Show helpful button */
  showHelpful?: boolean;
  /** Callback when helpful button clicked */
  onHelpful?: (reviewId: string) => void;
  /** Maximum characters to show before "Read more" */
  maxLength?: number;
}

/**
 * ReviewCard Component
 * 
 * Displays a single review with user info, rating, comment, and date.
 * Long reviews are truncated with "Read more" functionality.
 * 
 * @example
 * <ReviewCard 
 *   review={reviewData}
 *   showHelpful={true}
 *   onHelpful={(id) => handleHelpful(id)}
 * />
 */
const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showHelpful = false,
  onHelpful,
  maxLength = 200
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const needsTruncation = review.comment.length > maxLength;
  const displayedComment = isExpanded || !needsTruncation
    ? review.comment
    : `${review.comment.slice(0, maxLength)}...`;

  const handleHelpfulClick = () => {
    if (!hasVoted && onHelpful) {
      onHelpful(review.id);
      setHasVoted(true);
    }
  };

  const getUserInitials = (name: string): string => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/30">
              {getUserInitials(review.userName)}
            </div>
          )}
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-white text-sm">
                {review.userName}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rating} size="small" />
                <span className="text-xs text-white/60">
                  {formatRelativeTime(review.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Review Comment */}
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? 'expanded' : 'collapsed'}
              className="text-white/80 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {displayedComment}
            </motion.p>
          </AnimatePresence>

          {/* Read More/Less Button */}
          {needsTruncation && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-300 hover:text-purple-200 text-sm font-medium mt-1 transition-colors duration-200"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}

          {/* Helpful Section */}
          {showHelpful && (
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
              <button
                onClick={handleHelpfulClick}
                disabled={hasVoted}
                className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                  hasVoted
                    ? 'text-purple-300 cursor-not-allowed'
                    : 'text-white/70 hover:text-purple-300'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${hasVoted ? 'fill-current' : ''}`}
                  fill={hasVoted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span className="font-medium">
                  {hasVoted ? 'Helpful' : 'Was this helpful?'}
                </span>
                {review.helpful !== undefined && review.helpful > 0 && (
                  <span className="text-white/50">
                    ({review.helpful + (hasVoted ? 1 : 0)})
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
