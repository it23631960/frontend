import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewCard from './ReviewCard';
import AddReviewForm from './AddReviewForm';
import RatingSummary from './RatingSummary';
import { Review, SortOption, ReviewFormData, RatingSummary as RatingSummaryType } from '../../types/review';
import reviewAPI from '../../services/reviewApiService';

export interface SalonReviewsListProps {
  /** Salon ID to fetch reviews for */
  salonId: string;
  /** Initial sort option */
  initialSort?: SortOption;
  /** Number of reviews to load per page */
  pageSize?: number;
  /** Whether to show the add review form initially */
  showAddFormInitially?: boolean;
}

/**
 * SalonReviewsList Component
 * 
 * Main container for the review system. Displays rating summary,
 * review form, and list of reviews with sorting and pagination.
 * 
 * @example
 * <SalonReviewsList 
 *   salonId="salon-123"
 *   initialSort="recent"
 *   pageSize={5}
 *   onSubmitReview={handleSubmitReview}
 * />
 */
const SalonReviewsList: React.FC<SalonReviewsListProps> = ({
  salonId,
  initialSort = 'recent',
  pageSize = 10,
  showAddFormInitially = false
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingSummary, setRatingSummary] = useState<RatingSummaryType | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [showAddForm, setShowAddForm] = useState(showAddFormInitially);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load reviews and summary on mount and when dependencies change
  useEffect(() => {
    loadReviews();
    loadSummary();
  }, [salonId, sortBy, currentPage]);

  /**
   * Load reviews from API
   */
  const loadReviews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await reviewAPI.getSalonReviews(salonId, {
        sort: sortBy,
        page: currentPage,
        size: pageSize
      });
      
      setReviews(response.content);
      setTotalPages(response.totalPages);
      setTotalReviews(response.totalElements);
    } catch (err: any) {
      console.error('Error loading reviews:', err);
      setError(err.message || 'Failed to load reviews. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load rating summary from API
   */
  const loadSummary = async () => {
    try {
      const summary = await reviewAPI.getRatingSummary(salonId);
      setRatingSummary(summary);
    } catch (err) {
      console.error('Error loading rating summary:', err);
    }
  };

  /**
   * Handle review submission
   */
  const handleSubmitReview = async (reviewData: ReviewFormData) => {
    try {
      await reviewAPI.submitReview({
        ...reviewData,
        salonId
      });
      
      // Close form and reload data
      setShowAddForm(false);
      setCurrentPage(0); // Reset to first page
      await loadReviews();
      await loadSummary();
    } catch (err: any) {
      // Re-throw error to be handled by AddReviewForm
      throw new Error(err.message || 'Failed to submit review');
    }
  };

  /**
   * Handle helpful click
   */
  const handleHelpfulClick = async (reviewId: string) => {
    try {
      const response = await reviewAPI.markReviewHelpful(reviewId);
      
      // Update review in state
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: response.helpfulCount }
          : review
      ));
    } catch (err) {
      console.error('Error marking review as helpful:', err);
    }
  };

  /**
   * Handle sort change
   */
  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(0); // Reset to first page when sorting changes
  };

  /**
   * Handle pagination
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Rating Summary */}
      {ratingSummary && (
        <RatingSummary
          summary={ratingSummary}
          onWriteReview={() => setShowAddForm(true)}
          showWriteButton={!showAddForm}
        />
      )}

      {/* Add Review Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddReviewForm
              salonId={salonId}
              onSubmit={handleSubmitReview}
              onCancel={() => setShowAddForm(false)}
              isLoggedIn={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Section */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-2xl" />
        
        {/* Header with Sort */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-xl font-bold text-white">
            Customer Reviews
            {reviews.length > 0 && (
              <span className="text-white/60 font-normal ml-2">
                ({totalReviews})
              </span>
            )}
          </h3>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm text-white/80">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
              >
                <option value="recent" className="bg-purple-900">Most Recent</option>
                <option value="highest" className="bg-purple-900">Highest Rating</option>
                <option value="lowest" className="bg-purple-900">Lowest Rating</option>
              </select>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            className="p-4 bg-pink-500/20 border border-pink-400/50 rounded-lg mb-4 relative z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-pink-200">{error}</p>
            <button
              onClick={loadReviews}
              className="mt-2 text-sm text-white hover:text-pink-200 underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4 relative z-10">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white/10 rounded-lg p-4 h-32"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && reviews.length === 0 && !error && (
          <motion.div
            className="text-center py-12 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              No reviews yet
            </h4>
            <p className="text-white/70 mb-4">
              Be the first to share your experience with this salon!
            </p>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Write the First Review
              </button>
            )}
          </motion.div>
        )}

        {/* Reviews List */}
        {!isLoading && reviews.length > 0 && (
          <div className="space-y-4 relative z-10">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ReviewCard
                  review={review}
                  showHelpful={true}
                  onHelpful={handleHelpfulClick}
                />
              </motion.div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  className="px-6 py-2 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white/80 font-medium">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className="px-6 py-2 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonReviewsList;
