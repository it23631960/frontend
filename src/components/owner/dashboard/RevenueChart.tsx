import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface RevenueData {
  day: string;
  revenue: number;
}

interface RevenueChartProps {
  revenueData: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ revenueData }) => {
  const totalRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0);
  const avgDaily = Math.round(totalRevenue / revenueData.length);
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const bestDay = revenueData.find(d => d.revenue === maxRevenue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          💰 This Week's Revenue
        </h2>
        <div className="flex items-center gap-2 text-green-400">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">+8.5%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between gap-2 h-48">
          {revenueData.map((day, index) => {
            const heightPercentage = (day.revenue / maxRevenue) * 100;
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-purple-500 to-pink-600 rounded-t-lg relative group cursor-pointer"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Rs. {day.revenue.toLocaleString()}
                  </div>
                </motion.div>
                <span className="text-xs text-gray-400 font-medium">{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">
            Rs. {totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            Rs. {avgDaily.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Average/Day</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-400 mb-1">
            {bestDay?.day}
          </div>
          <div className="text-xs text-gray-400">Best Day (Rs. {maxRevenue.toLocaleString()})</div>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;
