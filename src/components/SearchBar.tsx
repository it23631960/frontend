import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation, ChevronDown } from 'lucide-react';

interface SearchBarProps {
  location: string;
  onLocationChange: (location: string) => void;
  searchRadius: number;
  onRadiusChange: (radius: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  location,
  onLocationChange,
  searchRadius,
  onRadiusChange
}) => {
  const [isRadiusOpen, setIsRadiusOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const radiusOptions = [
    { value: 1, label: '1 mile' },
    { value: 5, label: '5 miles' },
    { value: 10, label: '10 miles' },
    { value: 25, label: '25 miles' },
    { value: 50, label: '50 miles' }
  ];

  const getCurrentLocation = () => {
    setIsLocating(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (_position) => {
          // In a real app, you'd reverse geocode these coordinates
          // For now, we'll simulate with a placeholder
          setTimeout(() => {
            onLocationChange('Current Location');
            setIsLocating(false);
          }, 1000);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setIsLocating(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.3 }}
    >
      <div className="p-6 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
        {/* Main Search Bar */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          {/* Location Input */}
          <div className="relative flex-1">
            <div className="relative">
              <MapPin className="absolute w-5 h-5 text-purple-300 transform -translate-y-1/2 left-4 top-1/2" />
              <input
                type="text"
                placeholder="Enter city, neighborhood, or zip code"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full py-4 pl-12 pr-4 text-white placeholder-purple-200 transition-all border bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              {/* GPS Button */}
              <motion.button
                onClick={getCurrentLocation}
                disabled={isLocating}
                className="absolute p-2 text-white transition-all transform -translate-y-1/2 rounded-lg right-2 top-1/2 bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </div>

          {/* Search Radius Selector */}
          <div className="relative">
            <motion.button
              onClick={() => setIsRadiusOpen(!isRadiusOpen)}
              className="flex items-center space-x-2 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all min-w-[140px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Within {searchRadius} mile{searchRadius !== 1 ? 's' : ''}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isRadiusOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Radius Dropdown */}
            {isRadiusOpen && (
              <motion.div
                className="absolute left-0 right-0 z-10 mt-2 overflow-hidden border top-full bg-white/10 backdrop-blur-md border-white/20 rounded-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {radiusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onRadiusChange(option.value);
                      setIsRadiusOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-colors ${
                      searchRadius === option.value ? 'bg-purple-500/30' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Search Button */}
          <motion.button
            className="flex items-center px-8 py-4 space-x-2 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl hover:shadow-xl"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </motion.button>
        </div>

        {/* Quick Filter Buttons */}
        <motion.div 
          className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm font-medium text-purple-200">Quick filters:</span>
          {['Open Now', 'Highly Rated', 'Accepts Walk-ins', 'Bridal Services'].map((filter) => (
            <motion.button
              key={filter}
              className="px-4 py-2 text-sm text-purple-300 transition-all border rounded-lg bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchBar;