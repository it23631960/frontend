import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader, Chrome, Facebook, Apple } from "lucide-react";

interface CustomerLoginCardProps {
  form: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

const CustomerLoginCard: React.FC<CustomerLoginCardProps> = ({
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
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl shadow-purple-500/20">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50"
        >
          <User className="w-8 h-8 text-white" />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-lg">Access your beauty appointments</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
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
                placeholder="your.email@example.com"
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.rememberMe}
                onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })}
                className="w-4 h-4 rounded border-purple-400/30 bg-white/5 text-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-0"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                Remember me
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

          {/* Sign In Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-semibold py-3 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex items-center justify-center transition-all"
            >
              <Chrome className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex items-center justify-center transition-all"
            >
              <Facebook className="w-6 h-6 text-blue-400" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex items-center justify-center transition-all"
            >
              <Apple className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-400 hover:text-pink-400 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default CustomerLoginCard;
