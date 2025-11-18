import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-appointments' | 'no-results' | 'no-filter-results';
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, onReset }) => {
  const config = {
    'no-appointments': {
      icon: Calendar,
      title: 'No Appointments Yet',
      description: 'Your appointment list is empty. New appointments will appear here.',
      action: null
    },
    'no-results': {
      icon: Search,
      title: 'No Results Found',
      description: 'We couldn\'t find any appointments matching your search.',
      action: { label: 'Clear Search', onClick: onReset }
    },
    'no-filter-results': {
      icon: Filter,
      title: 'No Matching Appointments',
      description: 'Try adjusting your filters to see more results.',
      action: { label: 'Reset Filters', onClick: onReset }
    }
  };

  const current = config[type];
  const Icon = current.icon;

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-full p-6 mb-6">
        <Icon className="w-16 h-16 text-purple-400" strokeWidth={1.5} />
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">
        {current.title}
      </h3>

      <p className="text-gray-400 text-center max-w-md mb-6">
        {current.description}
      </p>

      {current.action && (
        <motion.button
          onClick={current.action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {current.action.label}
        </motion.button>
      )}
    </motion.div>
  );
};
