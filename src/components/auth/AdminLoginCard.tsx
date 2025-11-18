import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, Loader, AlertTriangle } from 'lucide-react';

interface AdminLoginCardProps {
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

const AdminLoginCard: React.FC<AdminLoginCardProps> = ({
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
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 shadow-xl shadow-red-500/10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="w-12 h-12 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50"
        >
          <Shield className="w-6 h-6 text-white" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Administrator Portal</h2>
          <p className="text-gray-400 text-base">Access platform management and controls</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email/Username Input */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email/Username
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@beautysalon.com"
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
                placeholder="Enter admin password"
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
              to="/admin/forgot-password"
              className="text-purple-400 hover:text-pink-400 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-xs leading-relaxed">
              All admin activities are logged and monitored for security purposes.
            </p>
          </motion.div>

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

          {/* Access Admin Panel Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-red-600 to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Access Admin Panel
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Admin Note */}
          <p className="text-center text-gray-400 text-xs mt-6">
            Administrator accounts are invite-only
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLoginCard;
