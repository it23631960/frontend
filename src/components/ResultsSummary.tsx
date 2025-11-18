import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Grid, List } from 'lucide-react';

interface ResultsSummaryProps {
  totalCount: number;
  location: string;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  totalCount,
  location,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}) => {
  const sortOptions = [
    { value: 'distance', label: 'Distance' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'availability', label: 'Availability' },
    { value: 'newest', label: 'Newest First' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Distance';
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Results Count */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">
            Found {totalCount} hair salon{totalCount !== 1 ? 's' : ''} near{' '}
            <span className="text-purple-300">{location}</span>
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            Showing the best options in your area
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all">
              <span className="text-sm">Sort by: {getCurrentSortLabel()}</span>
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/20 ${
                    sortBy === option.value 
                      ? 'bg-purple-500/30 text-purple-300' 
                      : 'text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle - Mobile Hidden */}
          <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
            <motion.button
              onClick={() => onViewModeChange('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <List className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile View Toggle */}
      <div className="sm:hidden mt-4 flex justify-center">
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
          <motion.button
            onClick={() => onViewModeChange('list')}
            className={`px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
              viewMode === 'list' 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </motion.button>
          <motion.button
            onClick={() => onViewModeChange('grid')}
            className={`px-4 py-2 text-sm transition-colors flex items-center space-x-2 ${
              viewMode === 'grid' 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-300 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Grid className="w-4 h-4" />
            <span>Grid</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsSummary;