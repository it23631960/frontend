import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Clock, 
  Heart,
  Calendar,
  Eye
} from 'lucide-react';
import { Salon } from './HairSalonListing';

interface SalonCardProps {
  salon: Salon;
  viewMode: 'list' | 'grid';
}

const SalonCard: React.FC<SalonCardProps> = ({ salon, viewMode }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-400" />
      );
    }

    return stars;
  };

  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'text-green-400';
      case '$$': return 'text-yellow-400';
      case '$$$': return 'text-orange-400';
      case '$$$$': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const cardContent = (
    <div className={`
      ${viewMode === 'list' 
        ? 'flex flex-col md:flex-row gap-6' 
        : 'flex flex-col'
      }
    `}>
      {/* Image Section */}
      <div className={`
        relative overflow-hidden rounded-xl
        ${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : 'w-full'}
        ${viewMode === 'grid' ? 'h-48' : 'h-48 md:h-full'}
      `}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-purple-900/20 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <img
          src={salon.image}
          alt={salon.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${
            salon.isOpen 
              ? 'bg-green-500/20 text-green-300 border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border-red-500/30'
          }`}>
            {salon.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>

        {/* Favorite Button */}
        <motion.button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-4 h-4 ${
            isFavorited ? 'fill-pink-500 text-pink-500' : 'text-white'
          }`} />
        </motion.button>

        {/* Price Range Badge */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className={`px-2 py-1 rounded-md text-sm font-bold backdrop-blur-md bg-black/40 border border-white/20 ${getPriceColor(salon.priceRange)}`}>
            {salon.priceRange}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              {salon.name}
            </h3>
            <div className="flex items-center space-x-1 ml-4">
              {renderStars(salon.rating)}
              <span className="text-sm text-gray-300 ml-1">
                ({salon.reviewCount})
              </span>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center text-gray-300 mb-3">
            <MapPin className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm">{salon.address}</span>
            <span className="mx-2">•</span>
            <span className="text-sm text-purple-300">{salon.distance}</span>
          </div>

          {/* Hours */}
          <div className="flex items-center text-gray-300 mb-4">
            <Clock className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm">{salon.hours}</span>
          </div>

          {/* Services */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {salon.services.slice(0, viewMode === 'grid' ? 3 : 5).map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
                >
                  {service}
                </span>
              ))}
              {salon.services.length > (viewMode === 'grid' ? 3 : 5) && (
                <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs border border-gray-500/30">
                  +{salon.services.length - (viewMode === 'grid' ? 3 : 5)} more
                </span>
              )}
            </div>
          </div>

          {/* Specialties */}
          {salon.specialties.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-purple-300 mb-1">Specialties:</p>
              <p className="text-sm text-gray-300">
                {salon.specialties.slice(0, 2).join(', ')}
                {salon.specialties.length > 2 && '...'}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {/* Primary Actions */}
          <div className="flex gap-3 flex-1">
            <motion.button
              onClick={() => navigate(`/salon/${salon.id}/book`)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </motion.button>

            <motion.button
              className="flex-1 px-4 py-2 border border-purple-500/50 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </motion.button>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            <motion.button
              className="p-2 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Call salon"
            >
              <Phone className="w-4 h-4" />
            </motion.button>

            {salon.website && (
              <motion.button
                className="p-2 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Visit website"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 40px rgba(168, 85, 247, 0.2)"
      }}
      layout
    >
      {cardContent}
    </motion.div>
  );
};

export default SalonCard;