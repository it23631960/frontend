import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Phone, 
  Clock, 
  Users, 
  Target, 
  User
} from 'lucide-react';

interface QuickOwnerActionsProps {
  pendingCount: number;
  salonName: string;
}

const QuickOwnerActions: React.FC<QuickOwnerActionsProps> = ({ 
  pendingCount, 
  salonName 
}) => {
  const actions = [
    {
      icon: Plus,
      label: 'New Booking',
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
      badge: null
    },
    {
      icon: Phone,
      label: 'Pending Calls',
      color: 'pink',
      bgGradient: 'from-pink-500 to-pink-600',
      badge: pendingCount
    },
    {
      icon: Clock,
      label: 'Manage Hours',
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      badge: null
    },
    {
      icon: Users,
      label: 'Add Staff',
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
      badge: null
    },
    {
      icon: Target,
      label: 'Services',
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-600',
      badge: null
    },
    {
      icon: User,
      label: 'View Customers',
      color: 'indigo',
      bgGradient: 'from-indigo-500 to-indigo-600',
      badge: null
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">⚡ Quick Actions</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
            >
              {action.badge && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {action.badge}
                </span>
              )}
              
              <div className={`p-4 bg-gradient-to-br ${action.bgGradient} rounded-xl group-hover:shadow-lg group-hover:shadow-${action.color}-500/50 transition-all`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <span className="text-gray-300 text-sm text-center font-medium group-hover:text-white transition-colors">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Salon Info */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Managing</p>
            <p className="text-white font-semibold">{salonName}</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl text-purple-300 hover:text-white font-medium transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickOwnerActions;
