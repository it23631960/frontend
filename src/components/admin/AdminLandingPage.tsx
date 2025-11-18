import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  Users,
  Building2,
  BarChart3,
  Settings,
  Shield,
  Bell,
  LogOut,
  ChevronDown,
  TrendingUp,
  Calendar,
  DollarSign,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  MessageSquare,
  FileText,
  Plus,
  Mail
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock data
  const stats = {
    totalUsers: 2847,
    usersTrend: 12,
    totalSalons: 156,
    newSalonsThisWeek: 8,
    platformRevenue: 124500,
    revenueTrend: 18,
    activeBookings: 384,
    todayBookings: 47
  };

  const recentActivities = [
    { id: 1, type: 'user', icon: Users, text: 'New user registration: Jane Smith', time: '5 min ago', color: 'purple' },
    { id: 2, type: 'salon', icon: Building2, text: 'Salon "Glamour Studio" pending approval', time: '12 min ago', color: 'pink' },
    { id: 3, type: 'booking', icon: Calendar, text: '15 new bookings completed', time: '28 min ago', color: 'blue' },
    { id: 4, type: 'payment', icon: DollarSign, text: 'Revenue milestone: $125K reached', time: '1 hour ago', color: 'green' },
    { id: 5, type: 'report', icon: AlertCircle, text: 'New report flagged for review', time: '2 hours ago', color: 'yellow' }
  ];

  const pendingActions = [
    { title: '5 Salons awaiting approval', icon: Building2, count: 5, link: '/admin/salons?filter=pending', color: 'purple' },
    { title: '12 Reports to review', icon: FileText, count: 12, link: '/admin/reports', color: 'pink' },
    { title: '3 Support tickets unresolved', icon: MessageSquare, count: 3, link: '/admin/support', color: 'blue' },
    { title: '2 Payment disputes', icon: DollarSign, count: 2, link: '/admin/disputes', color: 'yellow' }
  ];

  const recentUsers = [
    { id: 1, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2025-10-05', bookings: 3, status: 'active' },
    { id: 2, name: 'John Doe', email: 'john@example.com', joinDate: '2025-10-04', bookings: 7, status: 'active' },
    { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2025-10-03', bookings: 2, status: 'active' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2025-10-02', bookings: 12, status: 'active' },
    { id: 5, name: 'Emily Brown', email: 'emily@example.com', joinDate: '2025-10-01', bookings: 5, status: 'active' }
  ];

  const recentSalons = [
    { id: 1, name: 'Glamour Studio', owner: 'Alice Williams', type: 'Hair Salon', status: 'pending', rating: 0, bookings: 0 },
    { id: 2, name: 'Classic Cuts', owner: 'Bob Martinez', type: 'Barber Shop', status: 'active', rating: 4.8, bookings: 156 },
    { id: 3, name: 'Nail Artistry', owner: 'Carol Davis', type: 'Nail Salon', status: 'active', rating: 4.9, bookings: 203 },
    { id: 4, name: 'Bridal Beauty', owner: 'David Lee', type: 'Bridal Salon', status: 'active', rating: 5.0, bookings: 89 },
    { id: 5, name: 'Urban Style', owner: 'Emma Garcia', type: 'Hair Salon', status: 'pending', rating: 0, bookings: 0 }
  ];

  const systemHealth = [
    { name: 'Server Status', status: 'online', icon: CheckCircle, color: 'green' },
    { name: 'Database', status: 'operational', icon: CheckCircle, color: 'green' },
    { name: 'Payment Gateway', status: 'connected', icon: CheckCircle, color: 'green' },
    { name: 'Email Service', status: 'active', icon: CheckCircle, color: 'green' },
    { name: 'API Response', status: '45ms avg', icon: Activity, color: 'green' }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
    { id: 'salons', label: 'Salons', icon: Building2, path: '/admin/salons' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
    { id: 'security', label: 'Security', icon: Shield, path: '/admin/security' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-950">
      {/* Admin Navigation Header */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Badge */}
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl"
                />
                <div>
                  <span className="text-white font-bold text-xl">BeautySalon</span>
                  <span className="ml-3 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-xs text-purple-300 font-semibold">
                    Admin Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                      isActive ? 'text-pink-400' : 'text-gray-400 hover:text-purple-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
              </button>

              {/* Admin Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">Admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl"
                  >
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section - Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Admin</h1>
              <p className="text-gray-300 mb-4">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">All systems operational</span>
              </div>
            </div>
            <div className="hidden md:block">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl opacity-20"
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Total Users', 
              value: stats.totalUsers.toLocaleString(), 
              trend: `+${stats.usersTrend}%`, 
              icon: Users, 
              color: 'purple',
              link: '/admin/users'
            },
            { 
              title: 'Total Salons', 
              value: stats.totalSalons.toLocaleString(), 
              trend: `${stats.newSalonsThisWeek} new`, 
              icon: Building2, 
              color: 'pink',
              link: '/admin/salons'
            },
            { 
              title: 'Platform Revenue', 
              value: `$${(stats.platformRevenue / 1000).toFixed(1)}K`, 
              trend: `+${stats.revenueTrend}%`, 
              icon: DollarSign, 
              color: 'green',
              link: '/admin/analytics'
            },
            { 
              title: 'Active Bookings', 
              value: stats.activeBookings.toLocaleString(), 
              trend: `${stats.todayBookings} today`, 
              icon: Calendar, 
              color: 'blue',
              link: '/admin/bookings'
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <Link 
                  to={stat.link}
                  className="text-purple-400 hover:text-pink-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View Details →
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Health Monitor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">System Health</h2>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div className="space-y-4">
              {systemHealth.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 text-${item.color}-400`} />
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <span className={`text-${item.color}-400 text-sm font-medium`}>
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <button className="text-purple-400 hover:text-pink-400 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                    <div className={`p-2 bg-${activity.color}-500/20 rounded-lg`}>
                      <Icon className={`w-4 h-4 text-${activity.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-200 text-sm">{activity.text}</p>
                      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Pending Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Pending Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pendingActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 bg-${action.color}-500/20 rounded-lg`}>
                      <Icon className={`w-5 h-5 text-${action.color}-400`} />
                    </div>
                    <span className={`text-2xl font-bold text-${action.color}-400`}>
                      {action.count}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{action.title}</p>
                  <span className="text-purple-400 group-hover:text-pink-400 text-xs font-medium">
                    Review Now →
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* User & Salon Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Users Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Users</h2>
              <Link to="/admin/users" className="text-purple-400 hover:text-pink-400 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">{user.bookings} bookings</span>
                    <button className="p-1 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl text-purple-300 hover:text-white font-medium transition-all">
              Export User Data
            </button>
          </motion.div>

          {/* Recent Salons Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Salons</h2>
              <Link to="/admin/salons" className="text-purple-400 hover:text-pink-400 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentSalons.slice(0, 5).map((salon) => (
                <div key={salon.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{salon.name}</p>
                      <p className="text-gray-400 text-xs">{salon.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {salon.status === 'pending' ? (
                      <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-xs">
                        Pending
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">⭐ {salon.rating}</span>
                    )}
                    <button className="p-1 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl text-purple-300 hover:text-white font-medium transition-all">
              Manually Add Salon
            </button>
          </motion.div>
        </div>

        {/* Quick Actions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Mail, label: 'Send Announcement', color: 'purple' },
              { icon: Users, label: 'Create Admin', color: 'pink' },
              { icon: Building2, label: 'Add Salon', color: 'blue' },
              { icon: FileText, label: 'Generate Report', color: 'green' },
              { icon: Settings, label: 'Platform Settings', color: 'yellow' },
              { icon: Plus, label: 'Manage Categories', color: 'purple' }
            ].map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                >
                  <div className={`p-3 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl group-hover:shadow-lg group-hover:shadow-${action.color}-500/50 transition-all`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-300 text-xs text-center font-medium group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
