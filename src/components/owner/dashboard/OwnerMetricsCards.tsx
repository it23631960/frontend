import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, Star, TrendingUp } from 'lucide-react';

interface OwnerMetricsCardsProps {
  stats: {
    todayAppointments: number;
    todayTrend: string;
    pendingConfirmations: number;
    weekRevenue: number;
    revenueTrend: string;
    rating: number;
    totalReviews: number;
    ratingChange: string;
  };
}

const OwnerMetricsCards: React.FC<OwnerMetricsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      label: 'Appointments',
      trend: stats.todayTrend,
      icon: Calendar,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Pending Confirmations',
      value: stats.pendingConfirmations,
      label: 'Action needed',
      trend: 'Requires attention',
      icon: Clock,
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-600',
      urgent: true
    },
    {
      title: 'My Revenue',
      value: `Rs. ${(stats.weekRevenue / 1000).toFixed(1)}K`,
      label: 'This Week',
      trend: `${stats.revenueTrend} growth`,
      icon: DollarSign,
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Salon Rating',
      value: `${stats.rating}/5.0`,
      label: `${stats.totalReviews} Reviews`,
      trend: `↑ ${stats.ratingChange} from last month`,
      icon: Star,
      color: 'pink',
      bgGradient: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-white/10 backdrop-blur-md border ${
              card.urgent ? 'border-yellow-500/40' : 'border-white/20'
            } rounded-2xl p-6 cursor-pointer group relative overflow-hidden`}
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${card.bgGradient} rounded-xl shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {!card.urgent && (
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                )}
                {card.urgent && (
                  <span className="animate-pulse text-yellow-400 text-2xl">⚠️</span>
                )}
              </div>
              
              <h3 className="text-gray-400 text-sm mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
              <p className="text-gray-500 text-xs mb-2">{card.label}</p>
              <p className={`text-sm font-medium ${
                card.urgent ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {card.trend}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OwnerMetricsCards;
