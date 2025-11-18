import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';
import { ReviewFormData } from '../../types/review';

export interface AddReviewFormProps {
  /** Salon ID for the review */
  salonId: string;
  /** Callback when review is submitted */
  onSubmit: (reviewData: ReviewFormData) => Promise<void>;
  /** Callback when form is cancelled */
  onCancel?: () => void;
  /** Whether user is logged in (hides name/email fields) */
  isLoggedIn?: boolean;
  /** Pre-filled user name (if logged in) */
  userName?: string;
  /** Pre-filled user email (if logged in) */
  userEmail?: string;
}

interface FormErrors {
  rating?: string;
  comment?: string;
  userName?: string;
  userEmail?: string;
}

/**
 * AddReviewForm Component
 * 
 * Form for submitting a new review with validation.
 * Shows different fields based on authentication status.
 * 
 * @example
 * <AddReviewForm 
 *   salonId="salon-123"
 *   onSubmit={handleSubmitReview}
 *   onCancel={() => setShowForm(false)}
 *   isLoggedIn={false}
 * />
 */
const AddReviewForm: React.FC<AddReviewFormProps> = ({
  salonId: _salonId, // Will be used when integrating with API
  onSubmit,
  onCancel,
  isLoggedIn = false,
  userName = '',
  userEmail = ''
}) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
    userName: userName,
    userEmail: userEmail
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const MAX_COMMENT_LENGTH = 500;
  const MIN_COMMENT_LENGTH = 10;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate rating
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    // Validate comment
    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (formData.comment.trim().length < MIN_COMMENT_LENGTH) {
      newErrors.comment = `Review must be at least ${MIN_COMMENT_LENGTH} characters`;
    } else if (formData.comment.length > MAX_COMMENT_LENGTH) {
      newErrors.comment = `Review must not exceed ${MAX_COMMENT_LENGTH} characters`;
    }

    // Validate name and email if not logged in
    if (!isLoggedIn) {
      if (!formData.userName?.trim()) {
        newErrors.userName = 'Please enter your name';
      } else if (formData.userName.trim().length < 2) {
        newErrors.userName = 'Name must be at least 2 characters';
      } else if (formData.userName.trim().length > 50) {
        newErrors.userName = 'Name must not exceed 50 characters';
      }

      if (!formData.userEmail?.trim()) {
        newErrors.userEmail = 'Please enter your email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
        newErrors.userEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(formData);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          rating: 0,
          comment: '',
          userName: '',
          userEmail: ''
        });
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
    if (errors.rating) {
      setErrors({ ...errors, rating: undefined });
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    if (comment.length <= MAX_COMMENT_LENGTH) {
      setFormData({ ...formData, comment });
      if (errors.comment) {
        setErrors({ ...errors, comment: undefined });
      }
    }
  };

  const handleInputChange = (field: keyof ReviewFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

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
      
      <h3 className="text-xl font-bold text-white mb-6 relative z-10">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Rating Selection */}
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2">
            Your Rating <span className="text-pink-400">*</span>
          </label>
          <div className="flex items-center gap-2">
            <StarRating
              rating={formData.rating}
              interactive={true}
              onChange={handleRatingChange}
              size="large"
            />
            {formData.rating > 0 && (
              <motion.span
                className="text-sm text-white/70 ml-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                ({formData.rating} {formData.rating === 1 ? 'star' : 'stars'})
              </motion.span>
            )}
          </div>
          {errors.rating && (
            <motion.p
              className="mt-1 text-sm text-pink-300"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.rating}
            </motion.p>
          )}
        </div>

        {/* Name Input (if not logged in) */}
        {!isLoggedIn && (
          <div>
            <label htmlFor="userName" className="block text-sm font-semibold text-white/90 mb-2">
              Your Name <span className="text-pink-400">*</span>
            </label>
            <input
              id="userName"
              type="text"
              value={formData.userName || ''}
              onChange={handleInputChange('userName')}
              className={`w-full px-4 py-2 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 ${
                errors.userName ? 'border-pink-400' : 'border-white/30'
              }`}
              placeholder="Enter your name"
            />
            {errors.userName && (
              <motion.p
                className="mt-1 text-sm text-pink-300"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.userName}
              </motion.p>
            )}
          </div>
        )}

        {/* Email Input (if not logged in) */}
        {!isLoggedIn && (
          <div>
            <label htmlFor="userEmail" className="block text-sm font-semibold text-white/90 mb-2">
              Your Email <span className="text-pink-400">*</span>
            </label>
            <input
              id="userEmail"
              type="email"
              value={formData.userEmail || ''}
              onChange={handleInputChange('userEmail')}
              className={`w-full px-4 py-2 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 ${
                errors.userEmail ? 'border-pink-400' : 'border-white/30'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.userEmail && (
              <motion.p
                className="mt-1 text-sm text-pink-300"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.userEmail}
              </motion.p>
            )}
          </div>
        )}

        {/* Comment Textarea */}
        <div>
          <label htmlFor="comment" className="block text-sm font-semibold text-white/90 mb-2">
            Your Review <span className="text-pink-400">*</span>
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={handleCommentChange}
            rows={5}
            className={`w-full px-4 py-2 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none ${
              errors.comment ? 'border-pink-400' : 'border-white/30'
            }`}
            placeholder="Share your experience with this salon..."
          />
          <div className="flex justify-between items-center mt-1">
            <div>
              {errors.comment ? (
                <motion.p
                  className="text-sm text-pink-300"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.comment}
                </motion.p>
              ) : (
                <p className="text-sm text-white/60">
                  Minimum {MIN_COMMENT_LENGTH} characters
                </p>
              )}
            </div>
            <span
              className={`text-sm ${
                formData.comment.length > MAX_COMMENT_LENGTH * 0.9
                  ? 'text-pink-300 font-semibold'
                  : 'text-white/60'
              }`}
            >
              {formData.comment.length}/{MAX_COMMENT_LENGTH}
            </span>
          </div>
        </div>

        {/* Submit Error */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              className="p-3 bg-pink-500/20 border border-pink-400/50 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-sm text-pink-200">{submitError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              className="p-3 bg-green-500/20 border border-green-400/50 rounded-lg flex items-center gap-2 backdrop-blur-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-green-200 font-medium">
                Review submitted successfully!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Review'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddReviewForm;
