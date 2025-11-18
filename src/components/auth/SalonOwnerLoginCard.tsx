import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight, Loader } from 'lucide-react';

interface SalonOwnerLoginCardProps {
  form: {
    email: string;
    password: string;
    rememberDevice: boolean;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

const SalonOwnerLoginCard: React.FC<SalonOwnerLoginCardProps> = ({
  form,
  setForm,
  loading,
  error,
  onSubmit
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="w-12 h-12 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50"
        >
          <Building2 className="w-6 h-6 text-white" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Salon Owner Portal</h2>
          <p className="text-gray-400 text-base">Manage your salon and appointments</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="salon.owner@example.com"
                className="w-full bg-white/5 border border-purple-400/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full bg-white/5 border border-purple-400/30 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 focus:outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Device & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.rememberDevice}
                onChange={(e) => setForm({ ...form, rememberDevice: e.target.checked })}
                className="w-4 h-4 rounded border-purple-400/30 bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-0"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                Remember this device
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-purple-400 hover:text-pink-400 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Access Dashboard Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Accessing Dashboard...
              </>
            ) : (
              <>
                Access Dashboard
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Register Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have a salon yet?{' '}
            <Link
              to="/register-salon"
              className="text-purple-400 hover:text-pink-400 font-medium transition-colors"
            >
              Register Your Salon
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default SalonOwnerLoginCard;
