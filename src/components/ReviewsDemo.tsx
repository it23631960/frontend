import React from 'react';
import { motion } from 'framer-motion';
import { SalonReviewsList } from '../components/reviews';

/**
 * Reviews Demo Page
 * 
 * Demonstrates the complete review system with all components.
 * Use this page to test and preview the reviews UI.
 * 
 * To use this page, add it to your routing:
 * In app/routes.ts or your router config, add:
 * { path: '/reviews-demo', component: ReviewsDemo }
 */
const ReviewsDemo: React.FC = () => {
  const salonId = 'salon-123'; // Using mock data for this salon ID

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-pink-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header - Glassmorphism Style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 rounded-full blur-2xl" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent relative z-10"
            >
              Salon Reviews System
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-white/80 max-w-2xl mx-auto mb-6 relative z-10"
            >
              Complete ratings and reviews UI with interactive components,
              smooth animations, and full validation.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 flex flex-wrap justify-center gap-3 relative z-10"
            >
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-white/90">
                ⭐ Interactive Stars
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-white/90">
                📊 Rating Statistics
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-white/90">
                ✍️ Review Submission
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-white/90">
                🔄 Sort & Pagination
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Reviews Component */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <SalonReviewsList 
            salonId={salonId}
            initialSort="recent"
            pageSize={5}
            showAddFormInitially={false}
          />
        </motion.div>

        {/* Footer Info - Glassmorphism Style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 relative overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-2xl" />
            
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">
              🎯 Features Included
            </h2>
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-3">
                <h3 className="font-semibold text-white/90">Components:</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>✅ StarRating - Interactive star selector</li>
                  <li>✅ ReviewCard - Beautiful review display</li>
                  <li>✅ RatingSummary - Statistics overview</li>
                  <li>✅ AddReviewForm - Validated submission form</li>
                  <li>✅ SalonReviewsList - Main container</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-white/90">Features:</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>✅ Sort by recent, highest, lowest rating</li>
                  <li>✅ Pagination with "Load More"</li>
                  <li>✅ Expandable long reviews</li>
                  <li>✅ Helpful vote system</li>
                  <li>✅ Empty states & loading states</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
              <h3 className="font-semibold text-white/90 mb-2">
                📚 Documentation
              </h3>
              <p className="text-sm text-white/70 mb-3">
                Complete documentation available in: 
                <code className="ml-2 px-2 py-1 bg-white/10 rounded text-purple-200 border border-white/20">
                  frontend/REVIEWS_SYSTEM_DOCUMENTATION.md
                </code>
              </p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Check REVIEWS_SYSTEM_DOCUMENTATION.md');
                  }}
                  className="text-sm px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  📖 View Documentation
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Components location:', 'src/components/reviews/');
                  }}
                  className="text-sm px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  📦 View Components
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Types location:', 'src/types/review.ts');
                  }}
                  className="text-sm px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  📝 View Types
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
              <h3 className="font-semibold text-white/90 mb-2">
                🚀 Quick Start
              </h3>
              <pre className="bg-black/30 backdrop-blur-sm text-gray-100 p-4 rounded-lg text-xs overflow-x-auto border border-white/10">
{`import { SalonReviewsList } from './components/reviews';

function SalonPage({ salonId }) {
  const handleSubmit = async (reviewData) => {
    // Your API call here
    await api.post('/reviews', { ...reviewData, salonId });
  };

  return (
    <SalonReviewsList 
      salonId={salonId}
      onSubmitReview={handleSubmit}
    />
  );
}`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsDemo;
