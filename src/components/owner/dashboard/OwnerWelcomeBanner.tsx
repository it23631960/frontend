import React from 'react';
import { motion } from 'framer-motion';

interface OwnerWelcomeBannerProps {
  ownerName: string;
  salonName: string;
  todayAppointments: number;
  weekBookings: number;
}

const OwnerWelcomeBanner: React.FC<OwnerWelcomeBannerProps> = ({
  ownerName,
  salonName,
  todayAppointments,
  weekBookings
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {ownerName}!
          </h1>
          <p className="text-xl text-purple-200 mb-4">
            {salonName} • {currentDate}
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">All systems operational</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-400">{todayAppointments}</span>
              <span>appointments today</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-pink-400">{weekBookings}</span>
              <span>bookings this week</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl opacity-20"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerWelcomeBanner;
