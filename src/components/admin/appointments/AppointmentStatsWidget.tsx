import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, DollarSign, Star, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  trend?: string;
  icon: React.ReactNode;
  color: 'purple' | 'pink' | 'green' | 'blue';
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, trend, icon, color, delay }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600'
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:shadow-xl hover:shadow-purple-500/30 transition-all cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
          {icon}
        </div>
        {trend && (
          <motion.div
            className="flex items-center text-green-400 text-sm font-semibold"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </motion.div>
        )}
      </div>
      
      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
        {value}
      </div>
      
      <div className="text-white font-semibold mb-1">{title}</div>
      <div className="text-gray-400 text-sm">{subtitle}</div>
    </motion.div>
  );
};

interface AppointmentStatistics {
  todayCount: number;
  pendingCount: number;
  completedThisWeek: number;
  weeklyRevenue: number;
  averageRating: number;
  busiestHour: string;
}

interface AppointmentStatsWidgetProps {
  statistics: AppointmentStatistics;
}

export const AppointmentStatsWidget: React.FC<AppointmentStatsWidgetProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Today"
        value={statistics.todayCount}
        subtitle="Appointments"
        trend="+2 from yesterday"
        icon={<Calendar className="w-6 h-6 text-white" />}
        color="purple"
        delay={0}
      />
      
      <StatCard
        title="Pending"
        value={statistics.pendingCount}
        subtitle="Confirmations"
        icon={<Clock className="w-6 h-6 text-white" />}
        color="pink"
        delay={0.1}
      />
      
      <StatCard
        title="Completed"
        value={statistics.completedThisWeek}
        subtitle="This Week"
        trend="+3 from last week"
        icon={<CheckCircle className="w-6 h-6 text-white" />}
        color="green"
        delay={0.2}
      />
      
      <StatCard
        title="Revenue"
        value={`Rs. ${statistics.weeklyRevenue.toLocaleString()}`}
        subtitle="This Week"
        trend="+8.5% growth"
        icon={<DollarSign className="w-6 h-6 text-white" />}
        color="blue"
        delay={0.3}
      />
      
      <StatCard
        title="Avg Rating"
        value={`${statistics.averageRating}/5.0`}
        subtitle="124 Reviews"
        trend="↑ +0.3 from month"
        icon={<Star className="w-6 h-6 text-white" />}
        color="purple"
        delay={0.4}
      />
      
      <StatCard
        title="Peak Hours"
        value={statistics.busiestHour}
        subtitle="Most Booked"
        icon={<TrendingUp className="w-6 h-6 text-white" />}
        color="pink"
        delay={0.5}
      />
    </div>
  );
};
