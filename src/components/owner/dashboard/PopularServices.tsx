import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface Service {
  name: string;
  bookings: number;
  revenue: number;
  percentage: number;
}

interface PopularServicesProps {
  services: Service[];
}

const PopularServices: React.FC<PopularServicesProps> = ({ services }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🎯 Top Services
        </h2>
        <span className="text-xs text-gray-400">This Week</span>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white">
                  {index + 1}.
                </span>
                <span className="text-sm font-medium text-gray-200">{service.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-purple-400">
                  Rs. {(service.revenue / 1000).toFixed(1)}K
                </div>
                <div className="text-xs text-gray-400">{service.bookings} bookings</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${service.percentage}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
              />
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">{service.percentage}% of total</span>
              <TrendingUp className="w-3 h-3 text-green-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No service data available</p>
        </div>
      )}
    </motion.div>
  );
};

export default PopularServices;
