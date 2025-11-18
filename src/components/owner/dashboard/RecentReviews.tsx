import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  verified: boolean;
}

interface RecentReviewsProps {
  reviews: Review[];
  rating: number;
}

const RecentReviews: React.FC<RecentReviewsProps> = ({ reviews, rating }) => {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
            ⭐ Recent Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(Math.round(rating))}</div>
            <span className="text-xl font-bold text-yellow-400">{rating}</span>
            <span className="text-gray-400 text-sm">/ 5.0</span>
          </div>
        </div>
        <Link
          to="/owner/reviews"
          className="text-purple-400 hover:text-pink-400 text-sm font-medium transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {review.customerName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{review.customerName}</span>
                    {review.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-2 leading-relaxed">
              "{review.comment}"
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                {review.service}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No reviews yet</p>
        </div>
      )}
    </motion.div>
  );
};

export default RecentReviews;
